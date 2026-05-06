# =============================================================================
# 🌸 植物 (ネモフィラなど) 検出モデル — Windows WSL (Ubuntu) 学習スクリプト
# =============================================================================
# bee_detector_training_wsl.py の植物版。iNaturalist + Open Images から
# 花/植物画像を収集し、TFLite モデル (plant_detector.tflite) を出力する。
#
# -----------------------------------------------------------------------------
# 想定する階層 (bee_project と並列に plant_project を作る)
# -----------------------------------------------------------------------------
#   /home/mi0203x/plant_project/
#       ├── plant_env/               ← 仮想環境 (使い回す場合は bee_env でも可)
#       └── train_plant.py           ← このスクリプト
#
# -----------------------------------------------------------------------------
# 配置 & 実行 (bee と同じ手順)
# -----------------------------------------------------------------------------
#   mkdir -p ~/plant_project && cd ~/plant_project
#   cp /mnt/c/Users/mi020/OneDrive/Desktop/書類/Webデザイン/mia-0203/colab/plant_detector_training_wsl.py \
#      ~/plant_project/train_plant.py
#
#   # bee で作った venv を使い回す場合:
#   source ~/bee_project/bee_env/bin/activate
#   # 新規に作る場合:
#   #   python3.10 -m venv plant_env && source plant_env/bin/activate
#   #   pip install --upgrade pip
#   #   pip install "tensorflow[and-cuda]==2.15.0" "ml-dtypes==0.2.0" \
#   #               "mediapipe==0.10.14" "mediapipe-model-maker==0.2.1.4" \
#   #               pycocotools fiftyone albumentations pillow numpy matplotlib
#   #   pip uninstall -y jax jaxlib
#
#   python train_plant.py
#
#   # 完了後 Windows 側 mia-0203/models/ に配置
#   cp ~/plant_project/exported_model/plant_detector.tflite \
#      /mnt/c/Users/mi020/OneDrive/Desktop/書類/Webデザイン/mia-0203/models/
#
# -----------------------------------------------------------------------------
# CLI オプション
# -----------------------------------------------------------------------------
#   --workdir PATH       作業ディレクトリ (default: ~/plant_project)
#   --inat-taxon-id N    iNaturalist の taxon_id (default: 47125 = 維管束植物)
#                        例: ネモフィラ属 = 64152 / フィールド花 = 47604
#   --inat-pages N       APIページ数 (default: 5)
#   --inat-limit N       最大ダウンロード枚数 (default: 200)
#   --oi-class NAME      Open Images クラス名 (default: Flower)
#   --oi-samples N       Open Images から取得 (default: 300)
#   --epochs N           default: 50
#   --batch-size N       default: 8
#   --skip-download / --skip-augment / --no-show
# =============================================================================

from __future__ import annotations

import argparse
import glob
import json
import os
import shutil
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="植物検出モデル学習 (WSL)")
    parser.add_argument("--workdir", type=Path, default=Path.home() / "plant_project")
    # iNaturalist の taxon_id
    #   47125 = 維管束植物 (Tracheophyta) — 広く植物全般
    #   64152 = Nemophila (ネモフィラ属)
    #   53197 = Boraginaceae (ムラサキ科 — ネモフィラを含む)
    #   47604 = フィールドフラワー
    parser.add_argument("--inat-taxon-id", type=int, default=47125)
    parser.add_argument("--inat-pages", type=int, default=5)
    parser.add_argument("--inat-limit", type=int, default=200)
    parser.add_argument("--oi-class", type=str, default="Flower")
    parser.add_argument("--oi-samples", type=int, default=300)
    parser.add_argument("--class-name", type=str, default="plant",
                        help="モデルが返すクラス名 (default: plant)")
    parser.add_argument("--output-name", type=str, default="plant_detector.tflite")
    parser.add_argument("--epochs", type=int, default=50)
    parser.add_argument("--batch-size", type=int, default=8)
    parser.add_argument("--learning-rate", type=float, default=0.01)
    parser.add_argument("--skip-download", action="store_true")
    parser.add_argument("--skip-augment", action="store_true")
    parser.add_argument("--no-show", action="store_true")
    return parser.parse_args()


def check_environment() -> None:
    print("🔍 環境チェック")
    try:
        import tensorflow as tf
        print(f"  TensorFlow: {tf.__version__}")
        gpus = tf.config.list_physical_devices("GPU")
        if gpus:
            print(f"  ✅ GPU 検出: {gpus}")
        else:
            print("  ⚠️ GPU が検出されません (CPU は非常に遅い)")
    except ImportError:
        print("  ❌ TensorFlow が未インストールです")
        sys.exit(1)


def collect_dataset(images_dir: Path, args: argparse.Namespace) -> None:
    images_dir.mkdir(parents=True, exist_ok=True)

    # --- Open Images ---
    oi_dataset = None
    print(f"\n📥 Open Images Dataset から '{args.oi_class}' をダウンロード中...")
    try:
        import fiftyone.zoo as foz
        oi_dataset = foz.load_zoo_dataset(
            "open-images-v7",
            split="train",
            label_types=["detections"],
            classes=[args.oi_class],
            max_samples=args.oi_samples,
            dataset_name=f"plant_oi_v7_{args.oi_class.lower()}",
        )
        print(f"  → Open Images: {len(oi_dataset)} 枚取得")
    except Exception as e:
        print(f"  ⚠️ Open Images の取得に失敗: {e}")

    # --- iNaturalist ---
    print(f"\n📥 iNaturalist API から taxon_id={args.inat_taxon_id} を収集中...")
    INATURALIST_API = "https://api.inaturalist.org/v1/observations"
    collected = []

    for page in range(1, args.inat_pages + 1):
        params = (
            f"?taxon_id={args.inat_taxon_id}"
            f"&quality_grade=research"
            f"&photos=true"
            f"&per_page=100"
            f"&page={page}"
            f"&order=desc"
            f"&order_by=votes"
        )
        try:
            req = urllib.request.Request(
                INATURALIST_API + params,
                headers={"User-Agent": "PlantDetectorTraining/1.0"},
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
            for obs in data.get("results", []):
                for photo in obs.get("photos", []):
                    url = photo.get("url", "").replace("square", "medium")
                    if url:
                        collected.append({"url": url, "id": photo["id"]})
            print(f"  → ページ {page}: {len(data.get('results', []))} 件")
        except Exception as e:
            print(f"  ⚠️ ページ {page} の取得に失敗: {e}")

    print(f"\n  iNaturalist 候補: {len(collected)} 枚")

    inat_count = 0
    for item in collected[: args.inat_limit]:
        fpath = images_dir / f"inat_{item['id']}.jpg"
        if fpath.exists():
            continue
        try:
            urllib.request.urlretrieve(item["url"], fpath)
            with Image.open(fpath) as im:
                im.verify()
            inat_count += 1
        except Exception:
            if fpath.exists():
                fpath.unlink()
    print(f"  → iNaturalist: {inat_count} 枚ダウンロード完了")

    oi_count = 0
    if oi_dataset is not None:
        for sample in oi_dataset:
            src = Path(sample.filepath)
            dst = images_dir / f"oi_{src.name}"
            if not dst.exists():
                try:
                    shutil.copy2(src, dst)
                    oi_count += 1
                except Exception:
                    pass
        print(f"  → Open Images: {oi_count} 枚コピー完了")

    total = len([f for f in images_dir.iterdir() if f.suffix.lower() in {".jpg", ".jpeg", ".png"}])
    print(f"\n📊 データセット合計: {total} 枚")


def augment_and_annotate(images_dir: Path, aug_dir: Path) -> tuple[list, list]:
    import albumentations as A

    aug_data_dir = aug_dir / "images"
    aug_data_dir.mkdir(parents=True, exist_ok=True)

    # 植物用にチューニングしたパイプライン (回転と色相変化を強めに)
    transform = A.Compose(
        [
            A.HorizontalFlip(p=0.5),
            A.RandomRotate90(p=0.4),
            A.RandomBrightnessContrast(brightness_limit=0.3, contrast_limit=0.3, p=0.5),
            A.HueSaturationValue(hue_shift_limit=20, sat_shift_limit=35, val_shift_limit=20, p=0.5),
            A.GaussNoise(var_limit=(10, 50), p=0.3),
            A.RandomShadow(p=0.25),
            A.CLAHE(clip_limit=3.0, p=0.3),
        ],
        bbox_params=A.BboxParams(
            format="coco",
            label_fields=["category_ids"],
            min_visibility=0.3,
        ),
    )

    print("\n🔄 データ拡張を実行中...")

    src_images = (
        glob.glob(str(images_dir / "*.jpg"))
        + glob.glob(str(images_dir / "*.jpeg"))
        + glob.glob(str(images_dir / "*.png"))
    )

    annotations: list = []
    images_meta: list = []
    ann_id = 0
    max_dim = 640

    for img_idx, img_path in enumerate(src_images):
        try:
            img = Image.open(img_path).convert("RGB")
            w, h = img.size
            if max(w, h) > max_dim:
                ratio = max_dim / max(w, h)
                w, h = int(w * ratio), int(h * ratio)
                img = img.resize((w, h), Image.LANCZOS)

            img_np = np.array(img)
            margin_x = int(w * 0.05)
            margin_y = int(h * 0.05)
            bbox = [margin_x, margin_y, w - 2 * margin_x, h - 2 * margin_y]

            orig_fname = f"img_{img_idx:05d}.jpg"
            img.save(aug_data_dir / orig_fname, quality=90)

            images_meta.append({
                "id": img_idx * 3,
                "file_name": orig_fname,
                "width": w,
                "height": h,
            })
            annotations.append({
                "id": ann_id,
                "image_id": img_idx * 3,
                "category_id": 1,
                "bbox": bbox,
                "area": bbox[2] * bbox[3],
                "iscrowd": 0,
            })
            ann_id += 1

            for aug_i in range(2):
                try:
                    augmented = transform(image=img_np, bboxes=[bbox], category_ids=[1])
                    aug_img = Image.fromarray(augmented["image"])
                    aug_fname = f"img_{img_idx:05d}_aug{aug_i}.jpg"
                    aug_img.save(aug_data_dir / aug_fname, quality=90)

                    aug_bbox = list(augmented["bboxes"][0]) if augmented["bboxes"] else bbox
                    aug_w, aug_h = aug_img.size

                    images_meta.append({
                        "id": img_idx * 3 + aug_i + 1,
                        "file_name": aug_fname,
                        "width": aug_w,
                        "height": aug_h,
                    })
                    annotations.append({
                        "id": ann_id,
                        "image_id": img_idx * 3 + aug_i + 1,
                        "category_id": 1,
                        "bbox": [int(v) for v in aug_bbox],
                        "area": int(aug_bbox[2] * aug_bbox[3]),
                        "iscrowd": 0,
                    })
                    ann_id += 1
                except Exception:
                    pass

        except Exception as e:
            print(f"  ⚠️ {os.path.basename(img_path)} をスキップ: {e}")

    print(f"  → 拡張後: {len(images_meta)} 枚, アノテーション: {len(annotations)} 件")
    return images_meta, annotations


def write_coco_labels(aug_dir: Path, images_meta: list, annotations: list, class_name: str) -> Path:
    coco_data = {
        "categories": [{"id": 1, "name": class_name}],
        "images": images_meta,
        "annotations": annotations,
    }
    labels_path = aug_dir / "labels.json"
    with labels_path.open("w") as f:
        json.dump(coco_data, f, indent=2)
    print(f"\n✅ labels.json を生成: {labels_path}")
    print(f"   画像数: {len(images_meta)} / アノテーション: {len(annotations)}")
    return labels_path


def train_model(aug_dir: Path, export_dir: Path, cache_dir: Path, args: argparse.Namespace):
    from mediapipe_model_maker import object_detector

    print("\n🧠 MediaPipe Model Maker で学習を開始します...")

    data = object_detector.Dataset.from_coco_folder(
        str(aug_dir),
        cache_dir=str(cache_dir),
    )

    train_data, rest_data = data.split(0.6)
    validation_data, test_data = rest_data.split(0.5)
    print(f"  学習: {len(train_data)} / 検証: {len(validation_data)} / テスト: {len(test_data)}")

    hparams = object_detector.HParams(
        export_dir=str(export_dir),
        epochs=args.epochs,
        batch_size=args.batch_size,
        learning_rate=args.learning_rate,
    )
    options = object_detector.ObjectDetectorOptions(
        supported_model=object_detector.SupportedModels.MOBILENET_V2,
        hparams=hparams,
    )
    model = object_detector.ObjectDetector.create(
        train_data=train_data,
        validation_data=validation_data,
        options=options,
    )
    print("\n✅ 学習完了!")
    return model, test_data


def evaluate_model(model, test_data, aug_dir: Path, show: bool) -> None:
    print("\n📊 テストデータで評価中...")
    loss, coco_metrics = model.evaluate(test_data)

    def _fmt(v):
        if isinstance(v, (list, tuple)):
            v = v[0]
        return f"{v:.4f}" if isinstance(v, float) else str(v)

    print(f"  Loss: {_fmt(loss)}")
    print(f"  AP   : {_fmt(coco_metrics.get('AP', 'N/A'))}")
    print(f"  AP50 : {_fmt(coco_metrics.get('AP50', 'N/A'))}")
    print(f"  AP75 : {_fmt(coco_metrics.get('AP75', 'N/A'))}")

    if not show:
        return
    try:
        import matplotlib
        matplotlib.use("Agg" if not sys.stdout.isatty() else "TkAgg")
        import matplotlib.pyplot as plt

        sample_paths = sorted((aug_dir / "images").glob("*.jpg"))[:3]
        if not sample_paths:
            return
        fig, axes = plt.subplots(1, len(sample_paths), figsize=(15, 5))
        if len(sample_paths) == 1:
            axes = [axes]
        for ax, p in zip(axes, sample_paths):
            ax.imshow(Image.open(p))
            ax.set_title(p.name, fontsize=8)
            ax.axis("off")
        plt.suptitle("🌸 学習サンプル", fontsize=14)
        plt.tight_layout()
        out = aug_dir / "preview.png"
        plt.savefig(out)
        print(f"  プレビュー画像を保存: {out}")
    except Exception as e:
        print(f"  ⚠️ プレビュー描画に失敗 (無視): {e}")


def export_tflite(model, export_dir: Path, output_name: str) -> Path:
    print("\n📦 TFLite モデルをエクスポート中...")
    model.export_model(model_name=output_name)
    tflite_path = export_dir / output_name
    if tflite_path.exists():
        size_mb = tflite_path.stat().st_size / (1024 * 1024)
        print(f"✅ エクスポート完了: {tflite_path} ({size_mb:.1f} MB)")
    else:
        print(f"⚠️ 期待した場所に TFLite が見つかりません: {tflite_path}")
    return tflite_path


def main() -> None:
    args = parse_args()

    workdir: Path = args.workdir.expanduser().resolve()
    dataset_dir = workdir / "plant_dataset"
    images_dir = dataset_dir / "data"
    aug_dir = dataset_dir / "augmented"
    export_dir = workdir / "exported_model"
    cache_dir = workdir / "cache"

    for d in (dataset_dir, images_dir, aug_dir, export_dir, cache_dir):
        d.mkdir(parents=True, exist_ok=True)

    print(f"📂 作業ディレクトリ: {workdir}")
    print(f"📂 クラス名: {args.class_name} / 出力: {args.output_name}")

    check_environment()

    if args.skip_download:
        print("\n⏭ データ収集をスキップ")
    else:
        collect_dataset(images_dir, args)

    if args.skip_augment and (aug_dir / "labels.json").exists():
        print("\n⏭ 拡張をスキップ")
        with (aug_dir / "labels.json").open() as f:
            coco = json.load(f)
        images_meta = coco["images"]
        annotations = coco["annotations"]
    else:
        images_meta, annotations = augment_and_annotate(images_dir, aug_dir)
        write_coco_labels(aug_dir, images_meta, annotations, args.class_name)

    if not images_meta:
        print("❌ 学習対象の画像がありません。")
        sys.exit(1)

    model, test_data = train_model(aug_dir, export_dir, cache_dir, args)
    evaluate_model(model, test_data, aug_dir, show=not args.no_show)
    tflite_path = export_tflite(model, export_dir, args.output_name)

    print(
        "\n"
        "╔══════════════════════════════════════════════════════╗\n"
        "║  🎉 完了!                                            ║\n"
        "╚══════════════════════════════════════════════════════╝\n"
        f"出力: {tflite_path}\n"
        "Windows 側 models/ にコピーする例:\n"
        f"  cp {tflite_path} \\\n"
        "     /mnt/c/Users/mi020/OneDrive/Desktop/書類/Webデザイン/mia-0203/models/\n"
    )


if __name__ == "__main__":
    main()
