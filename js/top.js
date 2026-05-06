/*
======================================================================
【JavaScript初心者向け詳細ガイド＆目次】

◆ JavaScript（JS）とは？
JavaScript（ジャバスクリプト）は、Webページに「動き」や「仕掛け」を追加するためのプログラミング言語です。
HTMLが「骨組み」、CSSが「デザイン」なら、JSは「筋肉」や「脳」のような働きをします。
例えば、「ローディング画面の数字を0から100に増やす」「メニューボタンを押したら画面を開く」「画面をスクロールしたら要素をフワッと表示する」といった動的な処理をすべてこのファイルで行っています。

◆ このファイル（top.js）の役割
このファイルは、MIA Portfolioに動きとインタラクティブな機能を与えています。
大きく分けて、画面全体の機能（UI）の制御と、Three.jsやMediaPipeを使った高度な描画（動画に重なる波打ち効果や、AIによる人物認識エフェクト）を行っています。

◆ JSコードの基本的な見方
- 「/ *」と「* /」（※実際は間のスペースなし）で囲まれた部分、または // から始まる行は「コメント」です。
- const, let は変数（データを入れる箱）を宣言する言葉です。
- function() や () => {} は「関数（決められた処理のまとまり）」を作ります。
- document.getElementById や document.querySelector は、HTMLの中の特定の要素を探し出して操作するための命令です。

======================================================================
【目次 (Table of Contents)】

1. VideoTextMask クラス (動画のテキスト切り抜きと波打ちエフェクト)
   - "Design & Capture" の文字の形に沿って動画を切り抜き、マウスや時間に合わせて文字の輪郭が揺らぐ（水面のような）WebGLエフェクトを実装しています。

2. initUI 関数 (UI・画面機能の初期化)
   - 2-1. Loader (ローディング): 0%から100%までのカウントアップとプログレスバーのアニメーション。
   - 2-2. Custom Cursor (カスタムカーソル): マウスの動きに追従する黒い点と輪っかの動き。
   - 2-3. Local Time (現在時刻): ヘッダーの時計を1秒ごとに日本時間で更新。
   - 2-4. Menu Overlay (メニュー開閉): メニューボタンをクリックした時の全画面ナビゲーションの開閉処理。
   - 2-5. Header Scroll (ヘッダースクロール): スクロールした時にヘッダーに枠線をつける処理。
   - 2-6. FAQ (よくある質問): 質問をクリックして回答を開閉するアコーディオン機能。
   - 2-7. Works Filter (作品フィルター): 「All」「Web」などのボタンで表示する作品を絞り込む機能。
   - 2-8. IntersectionObserver (スクロールアニメーション): 要素が画面に入ってきた時にフワッと表示する（fade-in）処理。
   - 2-9. Typewriter Animation (タイピングアニメーション): メインタイトルの文字がランダムな記号から徐々に正しい文字に変わるエフェクト。
   - 2-10. Timeline Update (タイムライン): Processセクションの縦線の進み具合をスクロールに連動させる処理。

3. initWebGL 関数 (Three.js + MediaPipe 姿勢推定)
   - ブラウザ上でAI（MediaPipe）を使ってカメラや動画の人物の姿勢（骨格）を検知し、Three.jsという3Dライブラリを使って、メディアアート風の緑の枠線や関節マーカーを描画する高度な処理です。

4. initTable 関数 (Skills テーブルの制御)
   - 「できること」一覧表の並び替え（ソート）機能や、検索窓で文字を打った時に行を絞り込む機能、チェックボックスの全選択機能などを実装しています。

5. 実行トリガー
   - HTMLが読み込まれた直後に、上記の機能（initUI, initWebGL, initTableなど）を順番に実行するための命令が一番最後に書かれています。

======================================================================
*/

/**
 * ============================================================================
 * MIA Portfolio '26 — main.js (完全・軽量化・ローダー修正版)
 * ----------------------------------------------------------------------------
 * 1. VideoTextMask (DPR上限設定・シェーダー負荷軽減)
 * 2. UI機能 (DOM読み込み完了後に確実に実行されるよう修正)
 * 3. MediaPipe + Three.js (推論インターバル拡大・Canvasコピーの間引き)
 * 4. Data Table (省略なし)
 * 5. Footer Logo (WebGLからCSSマーキーへ変更し負荷を劇的に改善)
 * ============================================================================
 */

/* ============================================================================
 * 1. VideoTextMask (shimmer.js)
 * ============================================================================ */

// グローバルフラグの初期化
window.isModelReady = false;

class VideoTextMask {
    constructor() {
        this.accentWord = document.querySelector('.intro__title-word--accent');
        this.accentAmp = document.querySelector('.intro__title-amp');

        if (!this.accentWord) return;

        this.time = 0;
        this.mouse = { x: 0.5, y: 0.5 };
        // 軽量化: 解像度の上限を2から1.5に制限してピクセル描画負荷を低減
        this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        this._initVideo();
        this._initElements();
        this._initWebGL();
        this._initMaskCanvas();
        this._bindEvents();
        this._animate();
    }

    _initVideo() {
        this.video = document.createElement('video');
        this.video.src = 'video/hero.mp4';
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.loop = true;
        this.video.playsInline = true;
        this.video.crossOrigin = 'anonymous';
        this.video.setAttribute('playsinline', '');
        this.videoReady = false;

        this.video.addEventListener('canplaythrough', () => {
            this.videoReady = true;
            this.video.play().catch(() => { });
        });
        this.video.addEventListener('loadeddata', () => {
            this.videoReady = true;
            this.video.play().catch(() => { });
        });
        this.video.load();
    }

    _initElements() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'video-text-mask';
        this.wrapper.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 3;
            overflow: visible;
        `;

        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            display: block;
            width: 100%;
            height: 100%;
        `;
        this.wrapper.appendChild(this.canvas);

        const titleEl = document.querySelector('.intro__title');
        if (titleEl) {
            titleEl.style.position = 'relative';
            titleEl.appendChild(this.wrapper);
        }

        this._updateSize();
    }

    _updateSize() {
        const titleEl = document.querySelector('.intro__title');
        if (!titleEl) return;

        const titleRect = titleEl.getBoundingClientRect();
        const w = Math.round(titleRect.width * this.dpr);
        const h = Math.round(titleRect.height * this.dpr);

        this.canvas.width = w;
        this.canvas.height = h;

        this.titleWidth = titleRect.width;
        this.titleHeight = titleRect.height;

        if (this.gl) {
            this.gl.viewport(0, 0, w, h);
        }
    }

    _initMaskCanvas() {
        this.maskCanvas = document.createElement('canvas');
        this.maskCtx = this.maskCanvas.getContext('2d', { willReadFrequently: true });
        this._updateMask();
    }

    _updateMask() {
        const titleEl = document.querySelector('.intro__title');
        if (!titleEl) return;

        const titleRect = titleEl.getBoundingClientRect();
        const w = Math.round(titleRect.width * this.dpr);
        const h = Math.round(titleRect.height * this.dpr);

        this.maskCanvas.width = w;
        this.maskCanvas.height = h;

        const ctx = this.maskCtx;
        ctx.clearRect(0, 0, w, h);

        const elements = [this.accentWord];
        if (this.accentAmp) elements.push(this.accentAmp);

        elements.forEach(el => {
            const elRect = el.getBoundingClientRect();
            const style = getComputedStyle(el);

            const relX = (elRect.left - titleRect.left) * this.dpr;
            const relY = (elRect.top - titleRect.top) * this.dpr;
            const elW = elRect.width * this.dpr;
            const elH = elRect.height * this.dpr;

            const fontSize = parseFloat(style.fontSize) * this.dpr;
            const fontWeight = style.fontWeight;
            const fontFamily = style.fontFamily;
            const fontStyle = style.fontStyle || 'normal';

            const text = el.textContent;

            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

            ctx.textBaseline = 'alphabetic';
            const metrics = ctx.measureText(text);

            const textWidth = metrics.width;
            const xOffset = (elW - textWidth) / 2;

            const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.75;
            const descent = metrics.actualBoundingBoxDescent || fontSize * 0.25;
            const yBaseline = relY + (elH + ascent - descent) / 2;

            ctx.fillText(text, relX + xOffset, yBaseline);
            ctx.restore();
        });

        if (this.gl && this.maskTexture) {
            const gl = this.gl;
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.maskCanvas);
        }
    }

    _initWebGL() {
        const gl = this.canvas.getContext('webgl2', {
            alpha: true,
            antialias: true,
            premultipliedAlpha: true,
        });
        if (!gl) {
            console.warn('WebGL2 not available for VideoTextMask');
            return;
        }
        this.gl = gl;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);

        const vsSrc = `#version 300 es
            precision highp float;
            in vec2 aPos;
            out vec2 vUv;
            void main() {
                vUv = aPos * 0.5 + 0.5;
                gl_Position = vec4(aPos, 0.0, 1.0);
            }
        `;

        const fsSrc = `#version 300 es
            precision mediump float;
            uniform sampler2D uVideo;
            uniform sampler2D uMask;
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec2 uMouse;
            in vec2 vUv;
            out vec4 fragColor;

            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m * m; m = m * m;
                vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x_) - 0.5;
                vec3 ox = floor(x_ + 0.5);
                vec3 a0 = x_ - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            float fbm(vec2 p) {
                float v = 0.0, a = 0.5;
                mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
                // 軽量化: ループを5回から2回に減らしGPU負荷を下げる
                for (int i = 0; i < 2; i++) {
                    v += a * snoise(p);
                    p = rot * p * 2.0;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = vUv;
                float t = uTime;

                float mask = texture(uMask, vec2(uv.x, 1.0 - uv.y)).r;
                if (mask < 0.01) {
                    fragColor = vec4(0.0);
                    return;
                }

                vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
                float n1 = fbm(uv * 3.5 + t * 0.2);
                float n2 = fbm(uv * 3.5 + vec2(5.2, 1.3) + t * 0.18);
                
                vec2 displacement = vec2(n1 * 0.015, n2 * 0.015);
                vec2 distortedUv = clamp(uv + displacement, 0.001, 0.999);
                vec4 videoColor = texture(uVideo, distortedUv);

                // グレースケール変換 (VideoTextMaskは独自WebGLコンテキストのため
                // Three.js側のvideoMatグレースケールは適用されない。ここで変換する)
                float luma = dot(videoColor.rgb, vec3(0.299, 0.587, 0.114));
                // コントラストを少し強めて文字が映えるように
                luma = clamp(luma * 1.1, 0.0, 1.0);

                float shimmer = fbm(uv * 6.0 + t * 0.3);
                float highlight = pow(shimmer * 0.5 + 0.5, 3.0) * 0.2;

                // 白黒ベース + シマーハイライト (白)
                vec3 color = vec3(luma);
                color += highlight * 0.06;

                float solidMask = smoothstep(0.1, 0.6, mask);
                fragColor = vec4(clamp(color, 0.0, 1.0) * solidMask, solidMask);
            }
        `;

        const vs = this._compileShader(gl.VERTEX_SHADER, vsSrc);
        const fs = this._compileShader(gl.FRAGMENT_SHADER, fsSrc);
        if (!vs || !fs) return;

        this.program = gl.createProgram();
        gl.attachShader(this.program, vs);
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);

        const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(this.program, 'aPos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        this.vao = vao;

        this.videoTexture = this._createTexture();
        this.maskTexture = this._createTexture();

        gl.useProgram(this.program);
        this.uniforms = {
            uVideo: gl.getUniformLocation(this.program, 'uVideo'),
            uMask: gl.getUniformLocation(this.program, 'uMask'),
            uTime: gl.getUniformLocation(this.program, 'uTime'),
            uResolution: gl.getUniformLocation(this.program, 'uResolution'),
            uMouse: gl.getUniformLocation(this.program, 'uMouse'),
        };
        gl.uniform1i(this.uniforms.uVideo, 0);
        gl.uniform1i(this.uniforms.uMask, 1);

        this.isReady = true;
        document.body.classList.add('video-text-active');
    }

    _compileShader(type, src) {
        const s = this.gl.createShader(type);
        this.gl.shaderSource(s, src);
        this.gl.compileShader(s);
        return s;
    }

    _createTexture() {
        const tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        return tex;
    }

    _bindEvents() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                this._updateSize();
                this._updateMask();
            }, 150);
        });

        document.addEventListener('mousemove', (e) => {
            const titleEl = document.querySelector('.intro__title');
            if (!titleEl) return;
            const rect = titleEl.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) / rect.width;
            this.mouse.y = (e.clientY - rect.top) / rect.height;
        }, { passive: true });

        document.fonts?.ready?.then(() => {
            setTimeout(() => { this._updateSize(); this._updateMask(); }, 100);
        });
        setTimeout(() => { this._updateSize(); this._updateMask(); }, 2000);
        setTimeout(() => { this._updateSize(); this._updateMask(); }, 4000);
    }

    _animate() {
        const loop = () => {
            this.time += 0.016;
            this._render();
            this.animId = requestAnimationFrame(loop);
        };
        loop();
    }

    _render() {
        if (!this.isReady || !this.gl) return;
        const gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (this.videoReady && this.video.readyState >= 2) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
            try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.video); } catch (e) { }
        }

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);

        gl.useProgram(this.program);
        gl.uniform1f(this.uniforms.uTime, this.time);
        gl.uniform2f(this.uniforms.uResolution, this.canvas.width, this.canvas.height);
        gl.uniform2f(this.uniforms.uMouse, Math.max(0, Math.min(1, this.mouse.x)), Math.max(0, Math.min(1, this.mouse.y)));

        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    destroy() {
        if (this.animId) cancelAnimationFrame(this.animId);
        if (this.video) this.video.pause();
        if (this.wrapper?.parentNode) this.wrapper.parentNode.removeChild(this.wrapper);
    }
}

/* ============================================================================
 * 2. UI スクリプト (安全な初期化)
 * ============================================================================ */
const initUI = () => {
    'use strict';

    // (1) Loader (MediaPipeの読み込みと連動)
    const loader = document.getElementById('loader');
    const loaderNum = document.getElementById('loaderNum');
    const loaderBar = document.getElementById('loaderBar');

    if (loader && loaderNum && loaderBar) {
        let current = 0;
        const target = 100;
        document.body.style.overflow = 'hidden'; // スクロール防止

        // ローダー完了処理
        const finishLoader = () => {
            current = target;
            loaderNum.textContent = current;
            loaderBar.style.width = '100%';
            setTimeout(() => {
                loader.classList.add('is-done');
                document.body.style.overflow = '';
            }, 400);
        };

        // 90%以降、モデル未読込時にゆっくり進むタイマー
        let slowTickTimer = null;
        const startSlowTick = () => {
            slowTickTimer = setInterval(() => {
                if (window.isModelReady) {
                    clearInterval(slowTickTimer);
                    slowTickTimer = null;
                    finishLoader();
                    return;
                }
                if (current < 99) {
                    current += 1;
                    loaderNum.textContent = current;
                    loaderBar.style.width = current + '%';
                }
                // 99に達してもモデルが来なければ99のまま待機
            }, 800);
        };

        const updateLoader = () => {
            // 90%に達した時点でモデル未読込なら、ゆっくりモードへ移行
            if (current >= 90 && !window.isModelReady) {
                loaderNum.textContent = current;
                loaderBar.style.width = current + '%';
                startSlowTick();
                return;
            }

            // 徐々にカウントアップさせる
            const increment = Math.max(1, Math.round((target - current) * 0.12));
            current += increment;

            if (current >= target) {
                finishLoader();
            } else {
                loaderNum.textContent = current;
                loaderBar.style.width = current + '%';
                setTimeout(updateLoader, 30);
            }
        };
        setTimeout(updateLoader, 100);

        // モデルが読み込まれたらスローティックをクリアして完了
        const modelReadyCheck = setInterval(() => {
            if (window.isModelReady) {
                clearInterval(modelReadyCheck);
                if (slowTickTimer) {
                    clearInterval(slowTickTimer);
                    slowTickTimer = null;
                }
                finishLoader();
            }
        }, 200);
    }

    // (2) Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let mx = -100, my = -100, rx = -100, ry = -100;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
        const tick = () => {
            cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
            rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
            cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        };
        tick();
    }

    // (3) Local Time Display
    const localTime = document.getElementById('localTime'), footerTime = document.getElementById('footerTime');
    const updateTime = () => {
        const now = new Date();
        const jst = new Date(now.getTime() + (now.getTimezoneOffset() + 9 * 60) * 60000);
        const str = `${String(jst.getHours()).padStart(2, '0')}:${String(jst.getMinutes()).padStart(2, '0')}:${String(jst.getSeconds()).padStart(2, '0')}`;
        if (localTime) localTime.textContent = str;
        if (footerTime) footerTime.textContent = str;
    };
    updateTime(); setInterval(updateTime, 1000);

    // (4) Menu Overlay
    const menuBtn = document.getElementById('menuBtn'), navOverlay = document.getElementById('navOverlay'), navLinks = document.querySelectorAll('.nav-link');
    const closeMenu = () => { navOverlay?.classList.remove('is-open'); menuBtn?.classList.remove('is-open'); document.body.classList.remove('menu-open'); document.body.style.overflow = ''; };
    menuBtn?.addEventListener('click', () => {
        if (navOverlay.classList.contains('is-open')) closeMenu();
        else { navOverlay?.classList.add('is-open'); menuBtn?.classList.add('is-open'); document.body.classList.add('menu-open'); document.body.style.overflow = 'hidden'; }
    });
    document.getElementById('closeBtn')?.addEventListener('click', closeMenu);
    navLinks.forEach(a => a.addEventListener('click', () => setTimeout(closeMenu, 100)));

    // (5) Header Scroll
    const header = document.getElementById('header');
    const onScroll = () => { if (header) header.classList.toggle('is-scrolled', window.scrollY > 10); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    // (6) FAQ
    document.querySelectorAll('.faq__item').forEach(item => {
        const btn = item.querySelector('.faq__q');
        btn?.addEventListener('click', () => btn.setAttribute('aria-expanded', item.classList.toggle('is-open')));
    });

    // (7) Works Filter
    const filterBtns = document.querySelectorAll('.works__filter-btn'), workCards = document.querySelectorAll('.work');
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        workCards.forEach(card => card.classList.toggle('is-hidden', btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter));
    }));

    // (8) IntersectionObserver
    const fadeTargets = document.querySelectorAll('.section__head, .about__lead, .about__body, .about__stats, .process__intro, .process__item, .works__intro, .work, .works__more, .price__block, .price__note, .mia-table-wrap, .faq__item, .contact__aside, .contact__form');
    fadeTargets.forEach(el => el.classList.add('fade-in'));
    const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    fadeTargets.forEach(el => io.observe(el));

    // (9) Typewriter Animation for intro__title (負荷軽減)
    const titleEl = document.querySelector('.intro__title');
    if (titleEl) {
        const walker = document.createTreeWalker(titleEl, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue.trim() !== '') {
                textNodes.push({ node: node, original: node.nodeValue });
                node.nodeValue = '';
            }
        }

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

        const scrambleNode = (item, delay, onUpdate) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    let charIdx = 0;
                    let resText = "";
                    const targetText = item.original;

                    const typeScramble = () => {
                        if (charIdx >= targetText.length) {
                            item.node.nodeValue = targetText;
                            if (onUpdate) onUpdate();
                            resolve();
                            return;
                        }
                        let count = 0;
                        const int = setInterval(() => {
                            item.node.nodeValue = resText + chars[Math.floor(Math.random() * chars.length)];
                            if (onUpdate) onUpdate();

                            if (++count >= 2) {
                                clearInterval(int);
                                resText += targetText[charIdx++];
                                item.node.nodeValue = resText;
                                if (onUpdate) onUpdate();
                                setTimeout(typeScramble, 30);
                            }
                        }, 40);
                    };
                    typeScramble();
                }, delay);
            });
        };

        const playSequence = async () => {
            titleEl.classList.remove('typing-done');
            titleEl.classList.add('is-typing');

            textNodes.forEach(n => n.node.nodeValue = '');
            if (window.__videoTextMask) window.__videoTextMask._updateMask();

            for (const item of textNodes) {
                await scrambleNode(item, 20, () => {
                    if (window.__videoTextMask) window.__videoTextMask._updateMask();
                });
            }

            setTimeout(() => {
                titleEl.classList.remove('is-typing');
                titleEl.classList.add('typing-done');
            }, 800);

            setTimeout(() => {
                playSequence();
            }, 8000);
        };

        const typeObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(playSequence, 900);
                typeObserver.disconnect();
            }
        }, { threshold: 0.1 });
        typeObserver.observe(titleEl);
    }

    // Timeline Update
    const tl = document.querySelector('.process__list');
    if (tl) {
        const updateTL = () => {
            const rect = tl.getBoundingClientRect();
            tl.style.setProperty('--timeline-black', `${Math.max(0, Math.min(1, ((window.innerHeight / 2) - rect.top) / rect.height)) * 100}%`);
        };
        window.addEventListener('scroll', updateTL); updateTL();
    }
};

/* ============================================================================
 * 3. WebGL + MediaPipe 姿勢推定 (Glassmorphism・全身トラッキング版)
 * 軽量化対応: インターバルの見直し・Canvasコピーの間引き
 * ============================================================================ */
async function initWebGL() {
    if (typeof THREE === 'undefined') return;
    const container = document.getElementById('heroWebGL'), video = document.getElementById('heroVideo');
    if (!container || !video) return;

    container.classList.add('webgl-active');
    video.play().then(() => { if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'none'; }).catch(e => console.warn(e));

    // モバイル端末では GPU メモリ/帯域が逼迫しやすく、複数の MediaPipe モデル + WebGL 描画
    // を同時に走らせると動画がブラウザ判断で一時停止することがある。
    // 動画が止まったら自動で再生再開を試みる。
    const tryResumeVideo = () => { video.play().catch(() => { }); };
    video.addEventListener('pause', () => {
        // 自分で意図的に止めていない場合だけ再開 (タブ非表示時の自動pauseは無視)
        if (!document.hidden) setTimeout(tryResumeVideo, 100);
    });
    video.addEventListener('stalled', tryResumeVideo);
    video.addEventListener('suspend', tryResumeVideo);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    // モバイルではDPRを抑えてピクセル処理量を軽減（描画負荷の主因のひとつ）
    const _isMobile = window.innerWidth <= 820;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, _isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', zIndex: '10', pointerEvents: 'none' });
    container.appendChild(renderer.domElement);
    video.style.opacity = '0';

    let W = container.clientWidth, H = container.clientHeight, uiScale = 1.0;
    const scene = new THREE.Scene(), camera = new THREE.OrthographicCamera(W / -2, W / 2, H / 2, H / -2, 0.1, 1000); camera.position.z = 100;

    const videoTex = new THREE.VideoTexture(video);
    videoTex.minFilter = THREE.LinearFilter; videoTex.magFilter = THREE.LinearFilter; videoTex.format = THREE.RGBAFormat;
    // 動画plane だけグレースケール化する ShaderMaterial。UI (楕円・緑bbox) は色が残る
    const videoMat = new THREE.ShaderMaterial({
        uniforms: { tVideo: { value: videoTex } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform sampler2D tVideo; varying vec2 vUv; void main() { vec4 c = texture2D(tVideo, vUv); float gray = dot(c.rgb, vec3(0.299, 0.587, 0.114)); gl_FragColor = vec4(vec3(gray * 1.05), c.a); }`
    });
    const videoPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), videoMat);
    scene.add(videoPlane);

    const renderTarget = new THREE.WebGLRenderTarget(W, H, { format: THREE.RGBAFormat });
    const postScene = new THREE.Scene(), postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    // post-process はカラーのまま (UI の緑アクセントを保持)
    const distortionMat = new THREE.ShaderMaterial({ uniforms: { tDiffuse: { value: renderTarget.texture }, time: { value: 0 }, amount: { value: 0.012 }, frequency: { value: 3.5 } }, transparent: true, blending: THREE.NoBlending, vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`, fragmentShader: `uniform sampler2D tDiffuse; uniform float time; uniform float amount; uniform float frequency; varying vec2 vUv; void main() { vec2 p = vUv; p.x += sin(p.y * frequency + time * 1.5) * amount; p.y += cos(p.x * frequency + time * 1.2) * amount; gl_FragColor = texture2D(tDiffuse, clamp(p, 0.0, 1.0)); }` });
    postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), distortionMat));

    const uiGroup = new THREE.Group(); scene.add(uiGroup);
    const lineGeo = new THREE.PlaneGeometry(1, 1);
    function setLineMesh(m, x1, y1, x2, y2, w) { const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 0.001; m.scale.set(len, w, 1); m.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0); m.rotation.z = Math.atan2(dy, dx); }

    // 線画ベースのトラッカー（サイト全体のミニマルな線画スタイル＝コーナーブラケット＋クロスヘアに統一）
    // ── マテリアルはすべてのブロブで共有（オリジナル同様）。ホバー切替は2マテリアルの参照差し替えで行う。
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.92, side: THREE.DoubleSide });
    const dotMatDim = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, side: THREE.DoubleSide });
    const lineMatStrong = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const lineMatHover = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
    const lineMatSoft = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

    // メディアアート風の楕円ワイヤフレーム — 細い線で生き物のような有機的フォルムを描く
    const makeEllipseLoop = (rx, ry, segments = 48) => {
        const p = new Float32Array(segments * 3);
        for (let i = 0; i < segments; i++) {
            const t = (i / segments) * Math.PI * 2;
            p[i * 3] = Math.cos(t) * rx;
            p[i * 3 + 1] = Math.sin(t) * ry;
            p[i * 3 + 2] = 0;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(p, 3));
        return g;
    };
    // 3 段階のサイズの楕円（メイン用）
    const ellipseGeoLg = makeEllipseLoop(22, 14, 56);  // 大: 楕円 (横長)
    const ellipseGeoMd = makeEllipseLoop(14, 18, 48);  // 中: 楕円 (縦長 / 90度回転で交差)
    const ellipseGeoSm = makeEllipseLoop(8, 8, 32);    // 小: 円
    const ellipseGeoLimb = makeEllipseLoop(7, 5, 28);  // 手足用

    // モバイルではブロブ数も減らして GPU 描画を抑える (もともと最大同時数も多くない)
    const MAX_BLOBS = window.innerWidth <= 820 ? 6 : 8;
    const blobs = [], traceLines = [];

    for (let i = 0; i < MAX_BLOBS; i++) {
        const g = new THREE.Group();

        // Eye marker: 3 重の楕円ワイヤフレーム + 中央点
        const eyeGroup = new THREE.Group();
        const dot = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), dotMat);
        // outerRing = 大楕円 (ホバーで拡大), innerRing = 中楕円 (ゆっくり回転), small = 小円
        const outerRing = new THREE.LineLoop(ellipseGeoLg, lineMatStrong);
        const innerRing = new THREE.LineLoop(ellipseGeoMd, lineMatSoft);
        const smallRing = new THREE.LineLoop(ellipseGeoSm, lineMatSoft);
        innerRing.rotation.z = Math.PI / 4; // 斜めに重ねて花弁のような形に
        eyeGroup.add(outerRing, innerRing, smallRing, dot);
        g.add(eyeGroup);

        // Limb marker: 小さな楕円 + 微細な点
        const limbGroup = new THREE.Group();
        const sq = new THREE.LineLoop(ellipseGeoLimb, lineMatSoft);
        const dot2 = new THREE.Mesh(new THREE.CircleGeometry(0.8, 12), dotMatDim);
        limbGroup.add(sq, dot2);
        g.add(limbGroup);

        uiGroup.add(g);
        blobs.push({ g, eyeGroup, limbGroup, innerRing, outerRing, smallRing, sq, tx: 0, ty: 0, cx: 0, cy: 0, label: '', group: '', part: '', conf: 0, hover: 0 });

        // 接続線は破線風 (細く+低不透明度) でメディアアート的なネットワーク感を出す
        const tl = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14, side: THREE.DoubleSide }));
        uiGroup.add(tl); traceLines.push(tl);
    }

    let mx = -9999, my = -9999;
    window.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        mx = e.clientX - rect.left - W / 2; my = -(e.clientY - rect.top - H / 2);
    });

    // Skeleton lines — Float32Arrayを事前確保し、毎フレームのアロケーション(GC圧)を排除
    const POSE_CONNECTIONS = [[0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [27, 29], [29, 31], [31, 27], [24, 26], [26, 28], [28, 30], [30, 32], [32, 28]];
    const SKEL_MAX_VERTS = POSE_CONNECTIONS.length * 2;
    const skelPosArr = new Float32Array(SKEL_MAX_VERTS * 3);
    const skelGeo = new THREE.BufferGeometry();
    skelGeo.setAttribute('position', new THREE.BufferAttribute(skelPosArr, 3));
    skelGeo.setDrawRange(0, 0);
    const skeletonLines = new THREE.LineSegments(skelGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));
    skeletonLines.frustumCulled = false;
    uiGroup.add(skeletonLines);

    // Animal/bounding boxes — メディアアート風に緑のアクセント色で細く描画
    const BOX_VERT_COUNT = 16;
    const animalBoxes = [];
    const boxLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    for (let i = 0; i < 4; i++) {
        const arr = new Float32Array(BOX_VERT_COUNT * 3);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        const line = new THREE.LineSegments(geo, boxLineMat);
        line.frustumCulled = false;
        line.userData.posArr = arr;
        line.visible = false;
        uiGroup.add(line);
        animalBoxes.push(line);
    }

    // Tracking Panel (DOMオーバーレイ) — スキャン風のモノクローム情報パネル
    // グループアイコンと意味のある数値を表示し「今何を追跡しているか」を直感的に把握できる
    const calloutEl = document.createElement('div');
    calloutEl.className = 'hero-callout';
    calloutEl.innerHTML = `
        <div class="hero-callout__card">
            <div class="hero-callout__header">
                <span class="hero-callout__icon" aria-hidden="true">◎</span>
                <span class="hero-callout__label">TRACKING</span>
                <span class="hero-callout__status">LIVE</span>
            </div>
            <div class="hero-callout__divider"></div>
            <div class="hero-callout__body">
                <div class="hero-callout__row">
                    <span class="hero-callout__key">TYPE</span>
                    <span class="hero-callout__type">--</span>
                </div>
                <div class="hero-callout__row">
                    <span class="hero-callout__key">LABEL</span>
                    <span class="hero-callout__species">--</span>
                </div>
                <div class="hero-callout__row">
                    <span class="hero-callout__key">CONF</span>
                    <span class="hero-callout__conf">--%</span>
                </div>
            </div>
            <div class="hero-callout__scan-bar"><span class="hero-callout__scan-line"></span></div>
        </div>
    `;
    container.appendChild(calloutEl);
    const calloutType = calloutEl.querySelector('.hero-callout__type');
    const calloutSpecies = calloutEl.querySelector('.hero-callout__species');
    const calloutConf = calloutEl.querySelector('.hero-callout__conf');
    const calloutIcon = calloutEl.querySelector('.hero-callout__icon');

    // グループ別のアイコン文字
    const GROUP_ICONS = { 'HUMAN': '◉', 'ANIMAL': '◈', 'INSECT': '◆', 'PLANT': '◇', 'TARGET': '◎' };

    // メイン対象の座標・信頼度を示すサブパネル — DOM ベースで GPU 負荷ゼロ
    const dataCloudEl = document.createElement('div');
    dataCloudEl.className = 'hero-data-cloud';
    dataCloudEl.innerHTML = `
        <div class="hero-data-cloud__header">
            <span class="hero-data-cloud__title">SCAN DATA</span>
            <span class="hero-data-cloud__dot"></span>
        </div>
        <span class="hero-data-cloud__row hero-data-cloud__row--1"></span>
        <span class="hero-data-cloud__row hero-data-cloud__row--2"></span>
        <span class="hero-data-cloud__row hero-data-cloud__row--3"></span>
        <span class="hero-data-cloud__row hero-data-cloud__row--4"></span>
    `;
    container.appendChild(dataCloudEl);
    const dataRows = dataCloudEl.querySelectorAll('.hero-data-cloud__row');
    let dataLastRefresh = 0;
    const refreshDataCloud = (mainTarget, now) => {
        // 250ms ごとに数値を更新 (頻繁に変えすぎると読めない)
        if (now - dataLastRefresh < 250) return;
        dataLastRefresh = now;
        const conf = Math.round((mainTarget.conf ?? 0) * 100);
        const xr = ((mainTarget.cx + W / 2) / W).toFixed(2);
        const yr = ((-mainTarget.cy + H / 2) / H).toFixed(2);
        const fps = Math.round(1000 / Math.max(1, now - (refreshDataCloud._lastNow || now - 300)));
        refreshDataCloud._lastNow = now;
        dataRows[0].textContent = `POS  ${xr} / ${yr}`;
        dataRows[1].textContent = `CONF ${conf}%`;
        dataRows[2].textContent = `FPS  ${Math.min(fps, 60).toString().padStart(2, ' ')}`;
        dataRows[3].textContent = `GRP  ${(mainTarget.group || '---').toUpperCase()}`;
    };

    // ===== 初期状態では false にしておく =====
    window.isModelReady = false;

    let poseLandmarker, objectDetector, objectDetectorBee, objectDetectorPlant, isReady = false;

    // モバイル判定 (画面幅 + UA)。モバイルでは Lite モデル + Pose のみに絞り、
    // GPU 帯域を WebGL 描画と動画再生のために確保する。
    const isMobileDevice = (() => {
        if (window.innerWidth <= 820) return true;
        const ua = navigator.userAgent || '';
        return /iPhone|iPod|Android.*Mobile|Mobile.*Firefox|IEMobile/i.test(ua);
    })();

    import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3").then(async mod => {
        const vision = await mod.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");

        // モバイルでは GPU delegate が不安定なケースがあるので CPU にフォールバック可能にする
        const poseModel = isMobileDevice
            ? "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task"
            : "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task";
        const objModel = isMobileDevice
            ? "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite"
            : "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite2/float16/1/efficientdet_lite2.tflite";

        try {
            // --- 1. 姿勢推定 (Pose) ---
            poseLandmarker = await mod.PoseLandmarker.createFromOptions(vision, {
                baseOptions: { modelAssetPath: poseModel, delegate: "GPU" },
                runningMode: "VIDEO", numPoses: 1,
                minPoseDetectionConfidence: 0.45,
                minPosePresenceConfidence: 0.45,
                minTrackingConfidence: 0.45
            });

            // --- 2. 標準モデル (一般用) ---
            // scoreThresholdを0.55に引き上げ: 低信頼度での誤検出(human→insect等)を抑制
            objectDetector = await mod.ObjectDetector.createFromOptions(vision, {
                baseOptions: { modelAssetPath: objModel, delegate: "GPU" },
                runningMode: "VIDEO", maxResults: isMobileDevice ? 2 : 3, scoreThreshold: 0.55
            });

            // ここまで成功すればトラッキングは稼働させる
            isReady = true;
            window.isModelReady = true;
        } catch (e) {
            console.error("Standard MediaPipe models failed to load:", e);
            window.isModelReady = true;
            return; // 致命的エラー
        }

        // --- 3 & 4. カスタムモデル (蜂・植物) はモバイルでは読み込まない ---
        // 理由: 同時に4つのモデルを GPU で動かすとメモリ・帯域が逼迫し、
        // 動画再生がブラウザ判断で一時停止される (特に iOS Safari)。
        if (isMobileDevice) {
            console.log("Mobile detected — skipping custom bee/plant detectors to keep video playing smoothly.");
            objectDetectorBee = null;
            objectDetectorPlant = null;
        } else {
            // GPU 失敗時は CPU にフォールバックする共通ヘルパー
            const loadCustomDetector = async (path, label, maxResults, threshold) => {
                for (const delegate of ["GPU", "CPU"]) {
                    try {
                        const det = await mod.ObjectDetector.createFromOptions(vision, {
                            baseOptions: { modelAssetPath: path, delegate },
                            runningMode: "VIDEO", maxResults, scoreThreshold: threshold
                        });
                        console.log(`✅ ${label} loaded (${delegate}).`);
                        return det;
                    } catch (e) {
                        console.warn(`⚠️ ${label} (${delegate}) failed:`, e.message || e);
                    }
                }
                console.warn(`❌ ${label} could not be loaded with any delegate.`);
                return null;
            };

            objectDetectorBee = await loadCustomDetector(
                "models/bee_detector.tflite", "Bee detector", 2, 0.40
            );
            objectDetectorPlant = await loadCustomDetector(
                "models/plant_detector.tflite", "Plant detector", 2, 0.40
            );
        }

    }).catch(e => {
        console.error("MediaPipe Vision init failed:", e);
        window.isModelReady = true;
    });

    function onResize() {
        W = container.clientWidth; H = container.clientHeight;
        renderer.setSize(W, H); renderTarget.setSize(W, H);
        camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2;
        camera.updateProjectionMatrix();
        // モバイルでは UI を縮小し、画面に収まるよう調整
        const vw = window.innerWidth;
        uiScale = vw <= 480 ? 0.42 : (vw <= 820 ? 0.55 : 1.0);
    }
    window.addEventListener('resize', onResize); onResize();

    // 認識対象のグループ分類（人・動物・虫）— 検出モデルがCOCO以外のクラスを返した場合にも対応
    const HUMAN_CATS = new Set(['person', 'human']);
    const ANIMAL_CATS = new Set([
        'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe',
        'rabbit', 'mouse', 'squirrel', 'fox', 'deer', 'monkey', 'fish', 'turtle', 'lizard', 'snake'
    ]);
    // 自作モデルのラベル名に合わせて幅広くカバー
    const INSECT_CATS = new Set([
        'bee', 'honey-bee', 'honey bee', 'honeybee', 'insect', 'butterfly',
        'wasp', 'bumblebee', 'apis', 'apidae'
    ]);
    const PLANT_CATS = new Set([
        'potted plant', 'plant', 'flower', 'nemophila', 'tree', 'leaf',
        'houseplant', 'flowerpot', 'vegetation', 'flora', 'grass', 'bush',
        'tracheophyta', 'angiosperm'
    ]);
    const classifyTarget = (cat) => {
        if (HUMAN_CATS.has(cat)) return 'HUMAN';
        if (ANIMAL_CATS.has(cat)) return 'ANIMAL';
        if (INSECT_CATS.has(cat)) return 'INSECT';
        if (PLANT_CATS.has(cat)) return 'PLANT';
        // 部分一致でフォールバック（カスタムモデルのラベル名が完全に一致しないケースに対応）
        if (cat.includes('bee') || cat.includes('apis')) return 'INSECT';
        if (cat.includes('plant') || cat.includes('flower') || cat.includes('flora')) return 'PLANT';
        return null;
    };

    let lastTime = -1;
    let lastInferenceTime = 0;
    // PC でも推論間隔を緩めて GPU 余力を WebGL 描画 + 動画に振り分ける
    const INFERENCE_INTERVAL = window.innerWidth <= 820 ? 700 : 360;

    // 自作カスタムモデル (蜂・植物) は GPU 負荷を抑えるためターン制で交互に実行する。
    // 直近の検出結果は次のターンまでキャッシュして表示を継続させる。
    let customDetectorTurn = 0; // 0 = bee, 1 = plant
    let lastBeeRes = { detections: [] };
    let lastPlantRes = { detections: [] };

    let frameCount = 0;

    // 画面外・タブ非表示時はループ本体を停止（重い推論と描画を止めて、ヒーローが見えている時だけ動かす）
    let inView = true;
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            for (const en of entries) inView = en.isIntersecting;
        }, { threshold: 0.05 });
        obs.observe(container);
    }

    function animate() {
        requestAnimationFrame(animate);
        // タブ非表示／ヒーロー外なら早期return（ブラウザがrAFを呼び続けるが、本体処理はスキップ）
        if (document.hidden || !inView) return;

        const now = performance.now();
        frameCount++;

        let dW = W, dH = H;

        if (video.readyState >= 2) {
            const vW = video.videoWidth || 1920, vH = video.videoHeight || 1080, vA = vW / vH, cA = W / H;
            if (cA > vA) dH = W / vA; else dW = H * vA;
            videoPlane.scale.set(dW, dH, 1);

            if (isReady && video.currentTime !== lastTime && (now - lastInferenceTime > INFERENCE_INTERVAL)) {
                lastInferenceTime = now;
                lastTime = video.currentTime;

                const targets = [];
                let skelN = 0; // スケルトン頂点数カウンタ（毎フレームリセット）

                // ========================================
                // A) 検出器を順に実行 — 蜂モデルは人がいない時のみ走らせる
                // ========================================
                const poseRes = poseLandmarker.detectForVideo(video, now);
                const objResStd = objectDetector.detectForVideo(video, now);

                // 確実に人がいる時は蜂モデルを呼ばない (誤検出回避 + 推論コスト削減)
                // Pose検出を最優先: ランドマークが存在すれば即「人あり」と確定
                let humanPresent = false;
                let poseConfirmed = false;
                if (poseRes.landmarks && poseRes.landmarks.length > 0) {
                    const p = poseRes.landmarks[0];
                    // 鼻 / 肩 / 腰 のうち2つ以上が高信頼で見えていれば「人がいる」
                    const keys = [0, 11, 12, 23, 24];
                    const visible = keys.reduce((n, i) => n + ((p[i] && (p[i].visibility ?? 0) > 0.4) ? 1 : 0), 0);
                    if (visible >= 2) { humanPresent = true; poseConfirmed = true; }
                }
                // Poseで確定していなければ標準検出器のperson結果で補完
                if (!humanPresent) {
                    humanPresent = (objResStd.detections || []).some(d =>
                        (d.categories[0]?.categoryName || '').toLowerCase() === 'person' &&
                        (d.categories[0]?.score ?? 0) > 0.6
                    );
                }
                // ターン制で自作モデルを交互実行 (各モデルは2サイクルに1回 ≒ 600ms ごと)
                // 蜂は人がいる時にキャッシュも含めてクリア (古い誤検出が残らないように)
                if (humanPresent) {
                    lastBeeRes = { detections: [] };
                }
                // タイムスタンプを各モデルで 1ms ずつオフセット (MediaPipe内部の重複タイムスタンプ拒否を回避)
                if (customDetectorTurn === 0) {
                    if (objectDetectorBee && !humanPresent) {
                        try {
                            lastBeeRes = objectDetectorBee.detectForVideo(video, now + 1);
                        } catch (e) {
                            // タイムスタンプ系エラーは静かにスキップ
                            if (!String(e).includes('timestamp')) console.warn("Bee detect error:", e);
                            lastBeeRes = { detections: [] };
                        }
                    }
                } else {
                    if (objectDetectorPlant) {
                        try {
                            lastPlantRes = objectDetectorPlant.detectForVideo(video, now + 2);
                        } catch (e) {
                            if (!String(e).includes('timestamp')) console.warn("Plant detect error:", e);
                            lastPlantRes = { detections: [] };
                        }
                    }
                }
                customDetectorTurn = 1 - customDetectorTurn;
                const objResBee = lastBeeRes;
                const objResPlant = lastPlantRes;

                // ========================================
                // B) 姿勢推定（Pose）の解析
                // ========================================
                if (poseRes.landmarks && poseRes.landmarks.length > 0) {
                    const pose = poseRes.landmarks[0]; // 最初の人物

                    // 頭部位置の推定: 正面 → 鼻 / 横顔・後ろ姿 → 耳の重み付き中点 / 完全な後頭部 → 肩の中点から上方外挿
                    const nose = pose[0], lEar = pose[7], rEar = pose[8], lSh = pose[11], rSh = pose[12];
                    let headX = null, headY = null, headConf = 0;
                    if (nose && (nose.visibility ?? 0) > 0.5) {
                        headX = nose.x; headY = nose.y; headConf = nose.visibility;
                    } else {
                        const lv = (lEar && (lEar.visibility ?? 0) > 0.35) ? (lEar.visibility ?? 0) : 0;
                        const rv = (rEar && (rEar.visibility ?? 0) > 0.35) ? (rEar.visibility ?? 0) : 0;
                        if (lv + rv > 0) {
                            headX = (lEar.x * lv + rEar.x * rv) / (lv + rv);
                            headY = (lEar.y * lv + rEar.y * rv) / (lv + rv);
                            headConf = Math.max(lv, rv);
                        } else if (lSh && rSh && (lSh.visibility ?? 0) > 0.4 && (rSh.visibility ?? 0) > 0.4) {
                            // 完全な後ろ姿: 肩の中点から肩幅 × 0.7 だけ上に頭部があると仮定
                            const sx = (lSh.x + rSh.x) / 2, sy = (lSh.y + rSh.y) / 2;
                            const shoulderWidth = Math.hypot(lSh.x - rSh.x, lSh.y - rSh.y);
                            headX = sx;
                            headY = sy - shoulderWidth * 0.7;
                            // 推定値のため、肩のvisibilityを少し割り引いて使う
                            headConf = Math.min(lSh.visibility, rSh.visibility) * 0.85;
                        }
                    }
                    if (headX !== null) {
                        targets.push({ x: headX, y: headY, type: 'person', group: 'HUMAN', part: 'eye', conf: headConf });
                    }

                    // 手足は visibility 閾値を 0.4 に下げて後ろ姿でも捕捉しやすく
                    if (pose[15] && (pose[15].visibility ?? 0) > 0.4) targets.push({ x: pose[15].x, y: pose[15].y, type: 'person', group: 'HUMAN', part: 'hand', conf: pose[15].visibility });
                    if (pose[16] && (pose[16].visibility ?? 0) > 0.4) targets.push({ x: pose[16].x, y: pose[16].y, type: 'person', group: 'HUMAN', part: 'hand', conf: pose[16].visibility });
                    if (pose[27] && (pose[27].visibility ?? 0) > 0.4) targets.push({ x: pose[27].x, y: pose[27].y, type: 'person', group: 'HUMAN', part: 'foot', conf: pose[27].visibility });
                    if (pose[28] && (pose[28].visibility ?? 0) > 0.4) targets.push({ x: pose[28].x, y: pose[28].y, type: 'person', group: 'HUMAN', part: 'foot', conf: pose[28].visibility });

                    // スケルトン線の描画
                    for (let k = 0; k < POSE_CONNECTIONS.length; k++) {
                        const i = POSE_CONNECTIONS[k][0], j = POSE_CONNECTIONS[k][1];
                        const p1 = pose[i], p2 = pose[j];
                        if (p1 && p2 && (p1.visibility ?? 0) > 0.5 && (p2.visibility ?? 0) > 0.5 && skelN + 2 <= SKEL_MAX_VERTS) {
                            const o = skelN * 3;
                            skelPosArr[o] = (p1.x - 0.5) * dW;
                            skelPosArr[o + 1] = -(p1.y - 0.5) * dH;
                            skelPosArr[o + 2] = 0;
                            skelPosArr[o + 3] = (p2.x - 0.5) * dW;
                            skelPosArr[o + 4] = -(p2.y - 0.5) * dH;
                            skelPosArr[o + 5] = 0;
                            skelN += 2;
                        }
                    }
                }
                skelGeo.attributes.position.needsUpdate = true;
                skelGeo.setDrawRange(0, skelN);

                // ========================================
                // C) オブジェクト検出 — 標準モデル＋蜂モデル＋植物モデルの結果をマージ
                // ========================================
                // 蜂モデルは A) で humanPresent==false の時のみ走っているので、
                // ここでは追加フィルタは不要 (低コスト)
                // poseConfirmed==true の場合は objResStd の 'person' 検出を除外
                // (Poseの結果を優先し、objDetector が person → insect 等と誤分類しても上書きされるのを防ぐ)
                const filteredStdDetections = (objResStd.detections || []).filter(d => {
                    if (!poseConfirmed) return true;
                    // Pose確定済みの場合、标準検出器の非動物クラスを無視
                    const c = (d.categories[0]?.categoryName || '').toLowerCase();
                    // HUMAN/ANIMAL/INSECT/PLANT 以外はすでに grp=null でフィルタされるが、
                    // INSECTやANIMALとして検出されたものが実は人物の場合を防ぐため
                    // humanPresent時はINSECTカテゴリの検出を除外する
                    return !INSECT_CATS.has(c);
                });

                const allDetections = [
                    ...filteredStdDetections,
                    ...(objResBee.detections || []),
                    ...(objResPlant.detections || [])
                ];

                let aIdx = 0;
                allDetections.forEach(det => {
                    const cat = (det.categories[0]?.categoryName || '').toLowerCase();
                    const score = det.categories[0]?.score ?? 0;
                    const grp = classifyTarget(cat);

                    if (!grp) return;
                    // poseConfirmed時にHUMAN以外のグループで低信頼度の検出は無視
                    if (poseConfirmed && grp !== 'HUMAN' && grp !== 'PLANT' && score < 0.65) return;

                    const bb = det.boundingBox;
                    const bx = bb.originX;
                    const by = bb.originY;
                    const bw = bb.width;
                    const bh = bb.height;

                    // 中心座標（正規化）
                    const cx = (bx + bw / 2) / vW;
                    const cy = (by + bh / 2) / vH;

                    // メインポイント（動物はやや上、虫は中央など）
                    const eyeY = grp === 'INSECT' ? cy : (by + bh * 0.25) / vH;
                    targets.push({ x: cx, y: eyeY, type: cat, group: grp, part: 'eye', conf: score });

                    // 昆虫グループ（蜂）ならお尻側にもポイントを追加
                    if (grp === 'INSECT') {
                        targets.push({ x: cx, y: (by + bh * 0.8) / vH, type: cat, group: grp, part: 'rear', conf: score });
                    }

                    // 足もとのポイント（人間はPoseで処理済みなのでスキップ）
                    if (grp !== 'HUMAN') {
                        targets.push({ x: (bx + bw * 0.25) / vW, y: (by + bh * 0.85) / vH, type: cat, group: grp, part: 'foot', conf: score });
                        targets.push({ x: (bx + bw * 0.75) / vW, y: (by + bh * 0.85) / vH, type: cat, group: grp, part: 'foot', conf: score });
                    }

                    // Bounding Box (角のブラケット) の描画 — 人間以外のみ
                    if (grp !== 'HUMAN' && aIdx < animalBoxes.length) {
                        const x1 = (bx / vW - 0.5) * dW, y1 = -(by / vH - 0.5) * dH;
                        const x2 = ((bx + bw) / vW - 0.5) * dW, y2 = -((by + bh) / vH - 0.5) * dH;
                        const L = Math.max(20, Math.min(Math.abs(x2 - x1) * 0.25, Math.abs(y1 - y2) * 0.25));
                        const a = animalBoxes[aIdx].userData.posArr;

                        // 頂点データ更新（4隅 × 2本 = 8セグメント × 2頂点 = 16頂点、各3成分）
                        a[0] = x1; a[1] = y1; a[2] = 0;
                        a[3] = x1 + L; a[4] = y1; a[5] = 0;
                        a[6] = x1; a[7] = y1; a[8] = 0;
                        a[9] = x1; a[10] = y1 - L; a[11] = 0;
                        a[12] = x2; a[13] = y1; a[14] = 0;
                        a[15] = x2 - L; a[16] = y1; a[17] = 0;
                        a[18] = x2; a[19] = y1; a[20] = 0;
                        a[21] = x2; a[22] = y1 - L; a[23] = 0;
                        a[24] = x1; a[25] = y2; a[26] = 0;
                        a[27] = x1 + L; a[28] = y2; a[29] = 0;
                        a[30] = x1; a[31] = y2; a[32] = 0;
                        a[33] = x1; a[34] = y2 + L; a[35] = 0;
                        a[36] = x2; a[37] = y2; a[38] = 0;
                        a[39] = x2 - L; a[40] = y2; a[41] = 0;
                        a[42] = x2; a[43] = y2; a[44] = 0;
                        a[45] = x2; a[46] = y2 + L; a[47] = 0;

                        animalBoxes[aIdx].geometry.attributes.position.needsUpdate = true;
                        animalBoxes[aIdx].visible = true; aIdx++;
                    }
                });
                for (; aIdx < animalBoxes.length; aIdx++) animalBoxes[aIdx].visible = false;

                for (let i = 0; i < MAX_BLOBS; i++) {
                    if (targets[i]) {
                        blobs[i].g.visible = true;
                        blobs[i].tx = (targets[i].x - 0.5) * dW;
                        blobs[i].ty = -(targets[i].y - 0.5) * dH;
                        blobs[i].label = targets[i].type;
                        blobs[i].group = targets[i].group || '';
                        blobs[i].part = targets[i].part;
                        blobs[i].conf = targets[i].conf ?? 0;
                    } else {
                        blobs[i].g.visible = false;
                    }
                }
            }
        }

        let mainTarget = null;

        blobs.forEach((b) => {
            if (!b.g.visible) return;

            // スムーズな追従
            b.cx += (b.tx - b.cx) * 0.15;
            b.cy += (b.ty - b.cy) * 0.15;
            b.g.position.set(b.cx, b.cy, 0);

            // 吹き出し(Callout)を表示するターゲットを決定
            if (!mainTarget && b.part === 'eye') mainTarget = b;

            const dist = Math.hypot(b.cx - mx, b.cy - my);
            const isHover = dist < 60 * uiScale;
            b.hover += ((isHover ? 1 : 0) - b.hover) * 0.2;

            // パーツごとの表示切り替え
            if (b.part === 'eye') {
                // メインターゲット: 楕円が緩やかに回転して有機的な動きに
                b.eyeGroup.visible = true;
                b.limbGroup.visible = false;
                b.innerRing.rotation.z += 0.012;
                b.smallRing.rotation.z -= 0.022;
                const s = (1 + b.hover * 0.35) * uiScale;
                b.outerRing.scale.set(s, s, 1);
                b.outerRing.material = isHover ? lineMatHover : lineMatStrong;
            } else {
                // 手足は小さな楕円のみ
                b.eyeGroup.visible = false;
                b.limbGroup.visible = true;
                b.sq.rotation.z += 0.008;
                b.sq.scale.set(uiScale, uiScale, 1);
            }
        });

        if (mainTarget) {
            calloutEl.classList.add('is-visible');
            const isMobile = window.innerWidth <= 820;
            const offX = isMobile ? 14 : 28;
            const offY = isMobile ? 10 : 18;
            const cw = calloutEl.offsetWidth || (isMobile ? 110 : 150);
            const ch = calloutEl.offsetHeight || 56;
            let domX = mainTarget.cx + W / 2 + offX;
            let domY = -mainTarget.cy + H / 2 - offY;
            // コンテナ内に収まるようクランプ（モバイルで吹き出しがはみ出さない）
            domX = Math.max(8, Math.min(W - cw - 8, domX));
            domY = Math.max(8, Math.min(H - ch - 8, domY));
            calloutEl.style.transform = `translate(${domX}px, ${domY}px)`;

            calloutType.textContent = mainTarget.group || 'TARGET';
            calloutSpecies.textContent = (mainTarget.label || '--').toUpperCase();
            // アイコンをグループに合わせて変更
            if (calloutIcon) calloutIcon.textContent = GROUP_ICONS[mainTarget.group] || GROUP_ICONS['TARGET'];
            // AIが推定した「その種類である確率」を％表示（推論サイクル単位で更新）
            const pct = Math.max(0, Math.min(100, Math.round((mainTarget.conf ?? 0) * 100)));
            calloutConf.textContent = `${pct}%`;

            // データクラウド (緑の浮遊数値) をメインターゲットの上方に配置
            dataCloudEl.classList.add('is-visible');
            const cloudX = Math.max(8, Math.min(W - 120, mainTarget.cx + W / 2 - 60));
            const cloudY = Math.max(8, Math.min(H - 80, -mainTarget.cy + H / 2 - 80));
            dataCloudEl.style.transform = `translate(${cloudX}px, ${cloudY}px)`;
            refreshDataCloud(mainTarget, now);
        } else {
            calloutEl.classList.remove('is-visible');
            dataCloudEl.classList.remove('is-visible');
        }

        const activeBlobs = blobs.filter(b => b.g.visible);
        traceLines.forEach(tl => tl.visible = false);
        if (activeBlobs.length > 1) {
            for (let i = 0; i < activeBlobs.length; i++) {
                const a = activeBlobs[i].g.position, b = activeBlobs[(i + 1) % activeBlobs.length].g.position;
                traceLines[i].visible = true;
                setLineMesh(traceLines[i], a.x, a.y, b.x, b.y, 4.0 * uiScale);
            }
        }

        distortionMat.uniforms.time.value = now * 0.001;
        renderer.setRenderTarget(renderTarget); renderer.render(scene, camera);
        renderer.setRenderTarget(null); renderer.render(postScene, postCamera);

        // num-bg-canvas へのコピーは10フレームに1回（drawImage from WebGL canvasは同期的にflushされ重い）
        if (frameCount % 10 === 0) {
            const numCanvases = document.querySelectorAll('.num-bg-canvas');
            if (numCanvases.length > 0) {
                const rw = renderer.domElement.width, rh = renderer.domElement.height;
                for (let i = 0; i < numCanvases.length; i++) {
                    const c = numCanvases[i];
                    if (!c.ctx || c.width !== rw) {
                        c.width = rw;
                        c.height = rh;
                        c.ctx = c.getContext('2d', { alpha: false });
                    }
                    c.ctx.drawImage(renderer.domElement, 0, 0, c.width, c.height);
                }
            }
        }
    } animate();
}

/* ============================================================================
 * 4. Data Table (Skills)
 * ============================================================================ */
function initMiaTable() {
    const wrap = document.getElementById("mia-table-wrap");
    if (!wrap) return;

    const table = wrap.querySelector(".mia-table");
    const tbody = wrap.querySelector("#tbl-body");
    const searchEl = wrap.querySelector("#tbl-search");
    const countEl = wrap.querySelector("#tbl-count");
    const pageInfo = wrap.querySelector("#tbl-page-info");
    const prevBtn = wrap.querySelector("#tbl-prev");
    const nextBtn = wrap.querySelector("#tbl-next");
    const controlsContainer = wrap.querySelector(".mia-table-pagination__controls");

    let sortCol = "software";
    let sortDir = "asc";
    let currentPage = 1;
    let itemsPerPage = window.innerWidth <= 768 ? 4 : 6;

    window.addEventListener('resize', () => {
        const newItemsPerPage = window.innerWidth <= 768 ? 4 : 6;
        if (newItemsPerPage !== itemsPerPage) {
            itemsPerPage = newItemsPerPage;
            currentPage = 1;
            applyPagination();
        }
    });

    let rows = Array.from(tbody.querySelectorAll("tr")).map(tr => ({
        el: tr,
        name: tr.querySelector(".mia-table-software__name")?.textContent.trim() || "",
        role: tr.cells[2]?.textContent.trim() || "",
        projects: parseInt(tr.cells[4]?.textContent.trim() || "0", 10),
        score: parseInt(tr.querySelector(".mia-table-score__num")?.textContent.trim() || "0", 10)
    }));

    let filtered = [...rows];

    table.querySelectorAll("thead th[data-col]").forEach(th => {
        th.addEventListener("click", () => {
            const col = th.dataset.col;
            if (sortCol === col) {
                sortDir = sortDir === "asc" ? "desc" : "asc";
            } else {
                sortCol = col;
                sortDir = "asc";
            }
            applySort();
            updateSortUI();
        });
    });

    if (searchEl) {
        searchEl.addEventListener("input", () => {
            const q = searchEl.value.trim().toLowerCase();
            filtered = rows.filter(r => !q || r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q));
            currentPage = 1;
            applyPagination();
            if (countEl) countEl.textContent = `${filtered.length} items`;
        });
    }

    function applySort() {
        filtered.sort((a, b) => {
            let av = a[sortCol], bv = b[sortCol];
            if (typeof av === "string") av = av.toLowerCase();
            if (typeof bv === "string") bv = bv.toLowerCase();
            if (av < bv) return sortDir === "asc" ? -1 : 1;
            if (av > bv) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
        currentPage = 1;
        applyPagination();
    }

    function updateSortUI() {
        table.querySelectorAll("thead th[data-col]").forEach(th => {
            const isSorted = th.dataset.col === sortCol;
            th.classList.toggle("is-sorted", isSorted);
            th.classList.toggle("sort-desc", isSorted && sortDir === "desc");
            const icon = th.querySelector(".mia-table__sort-icon");
            if (icon) icon.textContent = isSorted ? (sortDir === "asc" ? "↑" : "↓") : "↕";
        });
    }

    function applyPagination() {
        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;

        filtered.forEach(r => tbody.appendChild(r.el));
        rows.forEach(r => r.el.style.display = "none");

        const pageRows = filtered.slice(startIdx, endIdx);
        pageRows.forEach(r => r.el.style.display = "");

        updatePaginationUI(totalPages, startIdx, endIdx);
    }

    function updatePaginationUI(totalPages, startIdx, endIdx) {
        if (pageInfo) {
            const actualEnd = Math.min(endIdx, filtered.length);
            const actualStart = filtered.length === 0 ? 0 : startIdx + 1;
            pageInfo.textContent = `Showing ${actualStart}–${actualEnd} of ${filtered.length}`;
        }

        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;

        if (controlsContainer) {
            controlsContainer.querySelectorAll(".page-num-btn").forEach(btn => btn.remove());
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement("button");
                btn.className = "mia-table-page-btn page-num-btn";
                if (i === currentPage) btn.classList.add("is-active");
                btn.textContent = i;
                btn.setAttribute("aria-label", `Page ${i}`);

                btn.addEventListener("click", () => {
                    currentPage = i;
                    applyPagination();
                });
                controlsContainer.insertBefore(btn, nextBtn);
            }
        }
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { if (currentPage > 1) { currentPage--; applyPagination(); } });
    if (nextBtn) nextBtn.addEventListener("click", () => { if (currentPage < Math.ceil(filtered.length / itemsPerPage)) { currentPage++; applyPagination(); } });

    applyPagination();
}


/* ============================================================================
 * 5. Footer Logo (背景・重複パス削除・完全アウトライン化・シャープ化)
 * ============================================================================ */

function initFooterLogoCSS() {
    const track = document.getElementById('footerMarqueeTrack');
    if (!track) return;

    const svgCode = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="150 240 910 140">
        <g fill-rule="evenodd" stroke-linejoin="miter" stroke-miterlimit="10">
            <path d="M163.211594,259.202240 C177.680054,245.405746 208.871841,245.438049 222.319901,260.639404 C227.666229,266.682800 230.140427,273.613281 230.790146,281.726379 C223.957047,281.726379 217.195236,281.726379 210.434586,281.726379 C206.920593,267.795685 191.728745,261.849304 179.335037,269.535461 C171.148209,274.612701 171.569290,287.395142 180.470001,292.292725 C185.062164,294.819580 190.317154,296.176788 195.330475,297.893616 C200.510529,299.667572 205.835739,301.034241 210.965179,302.935883 C223.262726,307.495026 231.031616,315.743866 231.544922,329.472687 C232.030838,342.469025 226.455856,352.222534 215.422882,358.935242 C198.009003,369.530182 171.043976,365.315613 159.416138,350.175598 C154.881729,344.271606 152.968369,337.548553 153.227264,329.799347 C159.785751,329.799347 166.194183,329.799347 172.711670,329.799347 C172.874176,330.161652 173.146820,330.587830 173.262161,331.053009 C176.790421,345.281799 189.451721,351.575134 203.139145,345.749237 C208.663452,343.397858 211.614807,339.039856 212.070206,332.992096 C212.527679,326.916687 209.894226,322.295746 204.459854,320.227264 C195.171829,316.691925 185.604462,313.886230 176.138168,310.824341 C152.726044,303.251648 146.092422,277.425995 163.211594,259.202240 z"/>
            <path d="M289.222534,306.000549 C289.222473,325.287170 289.222473,344.073730 289.222473,363.200623 C282.717438,363.200623 276.518219,363.200623 270.002472,363.200623 C270.002472,331.258942 270.002472,299.502533 270.002472,267.313995 C260.136993,267.313995 250.569122,267.313995 240.660263,267.313995 C240.660263,261.668884 240.660263,256.445587 240.660263,250.835968 C266.447571,250.835968 292.309296,250.835968 318.483276,250.835968 C318.483276,256.149323 318.483276,261.393860 318.483276,267.188904 C308.974182,267.188904 299.408691,267.188904 289.222626,267.188904 C289.222626,280.315704 289.222626,292.908142 289.222534,306.000549 z"/>
            <path d="M352.815735,360.247803 C338.093781,352.795807 331.362030,340.505615 331.078857,324.957275 C330.630402,300.333740 330.959351,275.696106 330.959351,250.766296 C337.236725,250.766296 343.321747,250.766296 350.037964,250.766296 C350.037964,252.567520 350.037964,254.325684 350.037964,256.083862 C350.037994,276.569366 350.037506,297.054871 350.039124,317.540375 C350.039246,319.039215 350.046967,320.538177 350.063782,322.036926 C350.330872,345.813385 367.249756,349.962555 384.142792,345.547058 C391.265961,343.685211 395.357819,337.921875 396.830536,330.769135 C397.629211,326.889984 397.892426,322.843628 397.911621,318.870361 C398.012817,297.885681 397.959534,276.900269 397.959778,255.915115 C397.959808,254.273346 397.959808,252.631592 397.959808,250.729340 C404.395599,250.729340 410.489014,250.729340 416.827393,250.729340 C416.951843,251.620621 417.155731,252.401459 417.156128,253.182404 C417.167603,275.999512 417.192719,298.816711 417.145508,321.633728 C417.069336,358.456573 386.261322,368.732330 362.612335,363.481598 C359.392365,362.766693 356.307739,361.442200 352.815735,360.247803 z"/>
            <path d="M435.570129,277.999695 C435.570068,268.707367 435.570068,259.915039 435.570068,250.461975 C439.201050,250.461975 442.471344,250.369385 445.734924,250.478134 C459.352722,250.931931 473.071350,250.562378 486.562561,252.131714 C510.842224,254.955963 528.543335,273.874847 531.032898,298.214752 C532.879211,316.265289 530.132080,333.069794 517.082764,346.855957 C507.982849,356.469696 496.457794,361.871216 483.574402,362.649414 C467.852203,363.599121 452.028992,362.875397 435.570221,362.875397 C435.570221,334.960449 435.570221,306.730072 435.570129,277.999695 M465.459961,346.827484 C470.283295,346.621094 475.284576,347.147034 479.886292,346.028717 C486.072296,344.525360 492.816010,342.938965 497.796661,339.301758 C512.492310,328.569977 513.459412,312.772736 510.844635,296.501923 C508.859436,284.148926 502.028351,275.010864 490.089508,270.524872 C478.800812,266.283173 466.977814,267.073029 455.260254,267.323944 C455.260254,294.039612 455.260254,320.269531 455.260254,346.827454 C458.551575,346.827454 461.521851,346.827454 465.459961,346.827484 z"/>
            <path d="M545.023132,329.000000 C545.023132,302.683929 545.023132,276.867859 545.023132,250.758942 C551.399841,250.758942 557.510925,250.758942 563.976562,250.758942 C563.976562,288.104919 563.976562,325.499176 563.976562,363.214691 C557.881287,363.214691 551.807861,363.214691 545.023132,363.214691 C545.023132,351.985535 545.023132,340.742767 545.023132,329.000000 z"/>
            <path d="M594.413208,265.411255 C617.556152,243.275940 653.545105,244.418228 674.256348,265.007446 C692.135620,282.781403 695.465942,304.673401 687.713684,327.793060 C680.495728,349.319458 664.185425,361.318268 641.824158,364.080353 C617.379944,367.099670 595.272217,355.635986 584.790894,335.593994 C573.335266,313.688995 576.015747,287.062286 591.533325,268.665741 C592.391785,267.648041 593.282837,266.657837 594.413208,265.411255 M665.840149,283.779572 C657.443237,270.168610 644.705750,265.519775 629.547913,267.129242 C615.688049,268.600922 605.926331,276.206360 600.659180,289.239380 C597.334961,297.464905 596.936890,306.034912 598.003723,314.736115 C599.831055,329.641693 610.052490,341.892761 623.905701,345.792999 C638.334351,349.855225 654.754517,345.280060 663.049866,333.849976 C674.380798,318.236969 674.389648,301.496765 665.840149,283.779572 z"/>
            
            <path d="M 744,372 L 744,250 L 762,250 L 799.5,332.43 L 799.5,250 L 817.5,250 L 855,332.43 L 855,250 L 873,250 L 873,372 L 855,372 L 817.5,289.57 L 817.5,372 L 799.5,372 L 762,289.57 L 762,372 Z"/>
            
            <path d="M 902,372 L 902,250 L 920,250 L 920,372 Z"/>
            <path d="M 946,372 L 990.5,250 L 1008.5,250 L 1053,372 L 1033,372 L 999.5,280.1 L 966,372 Z"/>
        </g>
    </svg>
    `;

    // 1つの「セット」を生成
    let itemHTML = `<div class="footer-marquee-item">${svgCode}</div>`;
    let singleSet = itemHTML.repeat(6); // 1セット6個（画面幅を十分埋める数）

    // そのセットを2つ繋げることで、-50% 移動したときに完璧に重なる
    track.innerHTML = singleSet + singleSet;
}

/* ============================================================================
   Initialization (確実なDOM読み込み順序の保証)
   ============================================================================ */
function initShimmer() {
    if (window.__videoTextMask) return;
    const mask = new VideoTextMask();
    window.__videoTextMask = mask;
    window.addEventListener('beforeunload', () => mask.destroy());
}

// 初期化実行
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initFooterLogoCSS();
    setTimeout(initShimmer, 300);
});

// ============================================================================
// SoundCloud Widget API — 核攻撃版 seekTo (モバイル強制突破)
// 5段階の同時攻撃で seekTo を無理やり通す。
// ============================================================================
function initSoundCloudWidget() {
    const iframe = document.getElementById('heroSCWidget');
    if (!iframe) return;

    const loadSC = new Promise((resolve, reject) => {
        if (window.SC) { resolve(); return; }
        const script = document.createElement('script');
        script.src = "https://w.soundcloud.com/player/api.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    loadSC.then(() => {
        const widget = SC.Widget(iframe);
        const SEEK_TARGET = 102000; // 1:42 = 102,000ms
        const TOLERANCE = 3000;
        let hasSeeked = false;
        let seekArmed = true;   // シーク処理を有効にするフラグ（ループ毎にtrue）
        let pollingTimer = null;

        // ── hasSeeked をリセットして再シーク可能にする ──
        const resetSeekState = () => {
            hasSeeked = false;
            seekArmed = true;
        };

        // ── 共通: getPosition で検証しつつ seekTo ──
        const verifyAndSeek = () => {
            if (hasSeeked) return;
            widget.getPosition((pos) => {
                if (pos >= SEEK_TARGET - TOLERANCE) {
                    hasSeeked = true;
                    if (pollingTimer) { clearInterval(pollingTimer); pollingTimer = null; }
                } else {
                    widget.seekTo(SEEK_TARGET);
                }
            });
        };

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Strategy 0: FINISH 時にリセット
        // 曲が終了→ループで再生が0:00に戻るとき、hasSeeked を
        // リセットして次の再生でも時間指定が効くようにする
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        widget.bind(SC.Widget.Events.FINISH, () => {
            resetSeekState();
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Strategy 1: READY 時に先行シーク
        // デスクトップでは Play 前でも初期位置がセットされる場合がある
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        widget.bind(SC.Widget.Events.READY, () => {
            widget.seekTo(SEEK_TARGET);
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Strategy 2: PLAY 直後に即座シーク + 段階的リトライ
        // バッファが溜まるのを待って繰り返しシークを叩き込む
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        widget.bind(SC.Widget.Events.PLAY, () => {
            // 再生開始時に位置を確認し、先頭付近なら hasSeeked をリセット
            widget.getPosition((pos) => {
                if (pos < SEEK_TARGET - TOLERANCE) {
                    // 先頭付近から再生 → ループまたは手動リプレイ
                    resetSeekState();
                }

                if (hasSeeked) return;

                // 即座にシーク
                widget.seekTo(SEEK_TARGET);

                // 段階的リトライ (バッファ待ちで間隔を広げる)
                const delays = [50, 100, 200, 400, 600, 1000, 1500, 2000, 3000, 5000, 8000];
                delays.forEach((d) => {
                    setTimeout(() => { if (!hasSeeked) verifyAndSeek(); }, d);
                });

                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                // Strategy 4: pause → seekTo → play 強制シーケンス
                // モバイルで「一時停止中ならシーク可能」な場合がある
                // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                setTimeout(() => {
                    if (hasSeeked) return;
                    widget.getPosition((innerPos) => {
                        if (innerPos < SEEK_TARGET - TOLERANCE) {
                            widget.pause();
                            setTimeout(() => {
                                widget.seekTo(SEEK_TARGET);
                                setTimeout(() => {
                                    widget.play();
                                    // 再開後にもう一度検証
                                    setTimeout(verifyAndSeek, 500);
                                }, 150);
                            }, 150);
                        }
                    });
                }, 1200);
            });
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Strategy 3: PLAY_PROGRESS 監視で位置矯正
        // 再生位置を常時監視し、ターゲット以前なら即座にシーク
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
            if (hasSeeked) return;
            if (data.currentPosition < SEEK_TARGET - TOLERANCE) {
                widget.seekTo(SEEK_TARGET);
            } else if (data.currentPosition >= SEEK_TARGET - TOLERANCE) {
                hasSeeked = true;
                if (pollingTimer) { clearInterval(pollingTimer); pollingTimer = null; }
            }
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Strategy 6: SEEK イベント監視
        // seekTo が実際にイベント発火したかを監視
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        widget.bind(SC.Widget.Events.SEEK, () => {
            widget.getPosition((pos) => {
                if (pos >= SEEK_TARGET - TOLERANCE) {
                    hasSeeked = true;
                    if (pollingTimer) { clearInterval(pollingTimer); pollingTimer = null; }
                }
            });
        });

    }).catch(() => {
        console.warn('SoundCloud Widget API: load failed');
    });
}



// ============================================================================
// 初期化の実行部分 (ファイルの最下部をこちらに差し替えてください)
// ============================================================================
window.addEventListener('load', () => {
    initSoundCloudWidget();
    initWebGL();
    initMiaTable();
});