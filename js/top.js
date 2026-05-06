/*
======================================================================
【MIA Portfolio '26 — top.js FINAL UNABRIDGED + PHYSICS】
- Particle-based Video Mask with CPU Spring Physics
- Hybrid AI Detection (Bee / Plant / Face / Person)
- Recurrence Velocity & Golden Spiral Trajectory
- Glassmorphism UI & Blob Data Stream (Auto-DOM Generation)
======================================================================
*/

window.isModelReady = false;

/* ============================================================================
 * 1. VideoTextMask (動画のテキスト切り抜きと波打ちエフェクト)
 * ============================================================================ */
class VideoTextMask {
    constructor() {
        this.accentWord = document.querySelector('.intro__title-word--accent');
        this.accentAmp = document.querySelector('.intro__title-amp');
        if (!this.accentWord) return;

        this.time = 0;
        this.mouse = { x: 0.5, y: 0.5 };
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
            this.video.play().catch(() => {});
        });
        this.video.addEventListener('loadeddata', () => {
            this.videoReady = true;
            this.video.play().catch(() => {});
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
        const gl = this.canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: true });
        if (!gl) return;
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
            }`;

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
                vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m * m; m = m * m;
                vec3 x_ = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x_) - 0.5;
                vec3 ox = floor(x_ + 0.5); vec3 a0 = x_ - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }
            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
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

                float n1 = fbm(uv * 3.5 + t * 0.2);
                float n2 = fbm(uv * 3.5 + vec2(5.2, 1.3) + t * 0.18);
                vec2 displacement = vec2(n1 * 0.015, n2 * 0.015);
                vec2 distortedUv = clamp(uv + displacement, 0.001, 0.999);
                vec4 videoColor = texture(uVideo, distortedUv);

                float luma = dot(videoColor.rgb, vec3(0.299, 0.587, 0.114));
                luma = clamp(luma * 1.1, 0.0, 1.0);

                float shimmer = fbm(uv * 6.0 + t * 0.3);
                float highlight = pow(shimmer * 0.5 + 0.5, 3.0) * 0.2;
                vec3 color = vec3(luma) + highlight * 0.06;

                float solidMask = smoothstep(0.1, 0.6, mask);
                fragColor = vec4(clamp(color, 0.0, 1.0) * solidMask, solidMask);
            }`;

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

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setTimeout(() => {
                    this._updateSize();
                    this._updateMask();
                }, 100);
            });
        }
        
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
            try {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.video);
            } catch (e) {}
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
        if (this.wrapper && this.wrapper.parentNode) {
            this.wrapper.parentNode.removeChild(this.wrapper);
        }
    }
}

/* ============================================================================
 * 2. UI スクリプト (ローディング、メニュー、スクロール等)
 * ============================================================================ */
const initUI = () => {
    'use strict';
    
    const loader = document.getElementById('loader');
    const loaderNum = document.getElementById('loaderNum');
    const loaderBar = document.getElementById('loaderBar');

    if (loader && loaderNum && loaderBar) {
        let current = 0;
        const target = 100;
        document.body.style.overflow = 'hidden';
        
        const startTime = Date.now(); // ★追加: ローディング開始時間を記録

        const finishLoader = () => {
            current = target;
            loaderNum.textContent = current;
            loaderBar.style.width = '100%';
            setTimeout(() => {
                loader.classList.add('is-done');
                document.body.style.overflow = '';
            }, 500);
        };

        const updateLoader = () => {
            const elapsedTime = Date.now() - startTime; // ★追加: 経過時間を計算
            const isTimeout = elapsedTime > 8000; // ★追加: 8秒でタイムアウトとする

            if (current >= 99 && !window.isModelReady && !isTimeout) {
                setTimeout(updateLoader, 100);
                return;
            }
            
            // ★追加: タイムアウトで突破した場合はフラグをtrueにしておく
            if (current >= 99 && isTimeout) {
                window.isModelReady = true;
            }
            
            const increment = current < 90 ? 2 : 1;
            current += increment;
            
            if (current > target) current = target;
            
            loaderNum.textContent = current;
            loaderBar.style.width = current + '%';

            if (current < target) {
                setTimeout(updateLoader, 30);
            } else {
                finishLoader();
            }
        };
        updateLoader();
    }

    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let mx = -100, my = -100, rx = -100, ry = -100;
        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
        }, { passive: true });
        
        const tick = () => {
            cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
            rx += (mx - rx) * 0.14;
            ry += (my - ry) * 0.14;
            cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        };
        tick();
    }

    const localTime = document.getElementById('localTime');
    const footerTime = document.getElementById('footerTime');
    const updateTime = () => {
        const now = new Date();
        const jst = new Date(now.getTime() + (now.getTimezoneOffset() + 9 * 60) * 60000);
        const str = `${String(jst.getHours()).padStart(2, '0')}:${String(jst.getMinutes()).padStart(2, '0')}:${String(jst.getSeconds()).padStart(2, '0')}`;
        if (localTime) localTime.textContent = str;
        if (footerTime) footerTime.textContent = str;
    };
    updateTime();
    setInterval(updateTime, 1000);

    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const closeBtn = document.getElementById('closeBtn');

    const closeMenu = () => {
        if (navOverlay) navOverlay.classList.remove('is-open');
        if (menuBtn) menuBtn.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    };

    if (menuBtn && navOverlay) {
        menuBtn.addEventListener('click', () => {
            if (navOverlay.classList.contains('is-open')) {
                closeMenu();
            } else {
                navOverlay.classList.add('is-open');
                menuBtn.classList.add('is-open');
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMenu, 100);
        });
    });

    const header = document.getElementById('header');
    const onScroll = () => {
        if (header) {
            if (window.scrollY > 10) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq__q');
        if (btn) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', isOpen);
            });
        }
    });

    const filterBtns = document.querySelectorAll('.works__filter-btn');
    const workCards = document.querySelectorAll('.work');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const filterValue = btn.getAttribute('data-filter');
            
            workCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('is-hidden');
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('is-hidden');
                    } else {
                        card.classList.add('is-hidden');
                    }
                }
            });
        });
    });

    const fadeTargets = document.querySelectorAll('.section__head, .about__lead, .about__body, .about__stats, .process__intro, .process__item, .works__intro, .work, .works__more, .price__block, .price__note, .mia-table-wrap, .faq__item, .contact__aside, .contact__form');
    fadeTargets.forEach(el => el.classList.add('fade-in'));
    
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    fadeTargets.forEach(el => io.observe(el));

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
            textNodes.forEach(n => { n.node.nodeValue = ''; });
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
            setTimeout(playSequence, 8000);
        };
        
        const typeObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(playSequence, 900);
                typeObserver.disconnect();
            }
        }, { threshold: 0.1 });
        typeObserver.observe(titleEl);
    }

    const tl = document.querySelector('.process__list');
    if (tl) {
        const updateTL = () => {
            const rect = tl.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const center = viewportHeight / 2;
            let progress = (center - rect.top) / rect.height;
            progress = Math.max(0, Math.min(1, progress));
            tl.style.setProperty('--timeline-black', `${progress * 100}%`);
        };
        window.addEventListener('scroll', updateTL);
        updateTL();
    }
};

/* ============================================================================
 * 3. Unified Hybrid HUD Engine + CPU Spring Physics + Blob Tracking
 * ============================================================================ */
async function initWebGL() {
    if (typeof THREE === 'undefined') {
        window.isModelReady = true;
        return;
    }

    const container = document.getElementById('heroWebGL');
    const video = document.getElementById('heroVideo');
    
    if (!container || !video) {
        window.isModelReady = true;
        return;
    }

    // --- HTMLを触らずにDOMを動的生成 ---
if (!document.getElementById('blobStreamL')) {
        const bl = document.createElement('div'); bl.id = 'blobStreamL'; bl.className = 'blob-data-stream left'; 
        container.appendChild(bl); // bodyではなくcontainer(動画枠)に追加
    }
    if (!document.getElementById('blobStreamR')) {
        const br = document.createElement('div'); br.id = 'blobStreamR'; br.className = 'blob-data-stream right'; 
        container.appendChild(br); // bodyではなくcontainer(動画枠)に追加
    }
    let syncBtn = document.getElementById('cameraSyncBtn');
    if (!syncBtn) {
        syncBtn = document.createElement('div'); syncBtn.id = 'cameraSyncBtn'; syncBtn.className = 'camera-sync-trigger';
        syncBtn.innerHTML = '<div class="sync-status"></div><span class="sync-text">[ システム同期要求 ]</span>';
        document.body.appendChild(syncBtn);
    }

    const blobStreamL = document.getElementById('blobStreamL');
    const blobStreamR = document.getElementById('blobStreamR');
    const dataRainLeft = document.getElementById('dataRainLeft');
    const dataRainRight = document.getElementById('dataRainRight');
    const monitorPip = document.getElementById('monitorPip');
    const monitorVideo = document.getElementById('webcam-monitor');
    const monitorCanvas = document.getElementById('face-mask');
    const monitorCtx = monitorCanvas ? monitorCanvas.getContext('2d', { alpha: true }) : null;
    
// ★追加: もしHTMLファイル側に直書きされていた場合でも、強制的に動画の枠内へ移動させる
    if (blobStreamL && blobStreamL.parentNode !== container) container.appendChild(blobStreamL);
    if (blobStreamR && blobStreamR.parentNode !== container) container.appendChild(blobStreamR);
    if (dataRainLeft && dataRainLeft.parentNode !== container) container.appendChild(dataRainLeft);
    if (dataRainRight && dataRainRight.parentNode !== container) container.appendChild(dataRainRight);
    
    if (syncBtn) {
        syncBtn.setAttribute('role', 'button');
        syncBtn.setAttribute('tabindex', '0');
    }

    // --- WebGL Core Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    const coreCount = navigator.hardwareConcurrency || 4;
    const pixelRatioCap = window.innerWidth < 820 || coreCount <= 4 ? 1 : 1.1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioCap));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 110;

    // --- ★ CPU Spring Physics Particle System (tech93準拠) ---
    const density = window.innerWidth < 820 ? 84 : (coreCount <= 4 ? 112 : 124);
    const count = density * density;
    
    const geometry = new THREE.BufferGeometry();
    const posArr = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);
    const velArr = new Float32Array(count * 3);
    const uvArr = new Float32Array(count * 2);
    
    for (let i = 0; i < count; i++) {
        const x = (i % density) / density;
        const y = Math.floor(i / density) / density;
        
        const px = (x - 0.5) * 160;
        const py = -(y - 0.5) * 160;
        
        posArr[i * 3] = px; posArr[i * 3 + 1] = py; posArr[i * 3 + 2] = 0;
        basePos[i * 3] = px; basePos[i * 3 + 1] = py; basePos[i * 3 + 2] = 0;
        velArr[i * 3] = 0; velArr[i * 3 + 1] = 0; velArr[i * 3 + 2] = 0;
        uvArr[i * 2] = x; uvArr[i * 2 + 1] = 1.0 - y;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
    const positionAttr = geometry.attributes.position;
    const activeParticleMask = new Uint8Array(count);
    const activeParticles = [];
    const worldToGrid = density / 160;
    let lastPhysicsTime = 0;

    const videoTex = new THREE.VideoTexture(video);
    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;
    videoTex.format = THREE.RGBAFormat;

    const partMat = new THREE.ShaderMaterial({
        uniforms: {
            tVideo: { value: videoTex },
            uHand: { value: new THREE.Vector2(9999, 9999) },
            uHandActive: { value: 0.0 }
        },
        vertexShader: `
            uniform sampler2D tVideo;
            uniform vec2 uHand;
            uniform float uHandActive;
            varying float vLuma;
            varying float vHand;
            
            void main() {
                vec4 c = texture2D(tVideo, uv);
                float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));
                vLuma = luma;
                
                vec3 pos = position;
                vec2 handDelta = pos.xy - uHand;
                float handDistSq = dot(handDelta, handDelta);
                vHand = uHandActive * smoothstep(5476.0, 0.0, handDistSq);
                pos.z += luma * 18.0; 
                pos.z += vHand * (10.0 + sin(handDistSq * 0.0028) * 5.0);
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                /* 手の近くでは粒を大きくして反応を見えやすくする */
                gl_PointSize = (180.0 / -mvPosition.z) * (luma * 1.2 + 0.35 + vHand * 1.15);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying float vLuma;
            varying float vHand;
            void main() {
                vec2 pt = gl_PointCoord - vec2(0.5);
                if (dot(pt, pt) > 0.25) discard;
                vec3 color = vec3(vLuma * 0.85 + 0.12 + vHand * 0.78);
                gl_FragColor = vec4(color, 0.45 + vHand * 0.18);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const particles = new THREE.Points(geometry, partMat);
    scene.add(particles);

    // --- AI Engines Initialization ---
    let handLandmarker, beeDetector, plantDetector, faceDetector, webcamFaceDetector, personDetector;
    const visionPath = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

    async function setupEngines() {
        try {
            const mod = await import(visionPath);
            const vision = await mod.FilesetResolver.forVisionTasks(`${visionPath}/wasm`);

            const createVisionTask = async (label, factory, options) => {
                try {
                    return await factory.createFromOptions(vision, options);
                } catch (gpuError) {
                    try {
                        const cpuOptions = {
                            ...options,
                            baseOptions: { ...options.baseOptions, delegate: "CPU" }
                        };
                        return await factory.createFromOptions(vision, cpuOptions);
                    } catch (cpuError) {
                        console.warn(`${label} loading failed:`, cpuError);
                        return null;
                    }
                }
            };

            const handOptions = {
                baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task", delegate: "GPU" },
                runningMode: "VIDEO", numHands: 1
            };

            const beeOptions = {
                baseOptions: { modelAssetPath: "./models/bee_detector.tflite", delegate: "GPU" },
                runningMode: "VIDEO", scoreThreshold: 0.35, maxResults: 2
            };

            const plantOptions = {
                baseOptions: { modelAssetPath: "./models/plant_detector.tflite", delegate: "GPU" },
                runningMode: "VIDEO", scoreThreshold: 0.35, maxResults: 2
            };

            const faceOptions = {
                baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite", delegate: "GPU" },
                runningMode: "VIDEO", minDetectionConfidence: 0.4
            };

            const personOptions = {
                baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite", delegate: "GPU" },
                runningMode: "VIDEO", scoreThreshold: 0.4, maxResults: 3
            };

            handLandmarker = await createVisionTask("HandLandmarker", mod.HandLandmarker, handOptions);
            webcamFaceDetector = await createVisionTask("Webcam FaceDetector", mod.FaceDetector, faceOptions);
            faceDetector = await createVisionTask("Hero FaceDetector", mod.FaceDetector, faceOptions);
            personDetector = await createVisionTask("PersonDetector", mod.ObjectDetector, personOptions);
            beeDetector = await createVisionTask("BeeDetector", mod.ObjectDetector, beeOptions);
            plantDetector = await createVisionTask("PlantDetector", mod.ObjectDetector, plantOptions);

            window.isModelReady = true;
        } catch (e) {
            console.error("AI Model Loading Error:", e);
            window.isModelReady = true;
        }
    }

    // --- HUD Trackers Setup ---
    const hudGroup = new THREE.Group();
    scene.add(hudGroup);
    
    const hudContainer = document.createElement('div');
    hudContainer.className = 'hud-container';
    container.appendChild(hudContainer);

    const bracketMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const leadMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    const trailMat = new THREE.LineBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    
    const trackers = [];
    const TOTAL_TRACKERS = 8;
    const TRAIL_LENGTH = 15;

    for (let i = 0; i < TOTAL_TRACKERS; i++) {
        const bracketGeo = new THREE.BufferGeometry();
        const bracketPos = new Float32Array(48); 
        bracketGeo.setAttribute('position', new THREE.BufferAttribute(bracketPos, 3));
        const br = new THREE.LineSegments(bracketGeo, bracketMat);
        br.visible = false; hudGroup.add(br);

        const leadGeo = new THREE.BufferGeometry();
        const leadPos = new Float32Array(9); 
        leadGeo.setAttribute('position', new THREE.BufferAttribute(leadPos, 3));
        const leadLine = new THREE.Line(leadGeo, leadMat);
        leadLine.visible = false; hudGroup.add(leadLine);

        const trailGeo = new THREE.BufferGeometry();
        const trailPos = new Float32Array(TRAIL_LENGTH * 3);
        trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
        const trailLine = new THREE.Line(trailGeo, trailMat);
        trailLine.visible = false; hudGroup.add(trailLine);

        const panel = document.createElement('div');
        panel.className = 'hud-panel cyber-hud';
        panel.innerHTML = `
            <div class="hud-panel__header">
                <span class="hud-num">0${i+1}</span>
                <span class="hud-type-label">TGT_SCAN</span>
            </div>
            <div class="hud-panel__body">
                <div>X : <span class="hud-val hud-x">000.00</span></div>
                <div>Y : <span class="hud-val hud-y">000.00</span></div>
                <div>VEL <span class="hud-val hud-vel">00.00</span></div>
                <div>CONF <span class="hud-val hud-conf">00.0</span></div>
            </div>
        `;
        hudContainer.appendChild(panel);

        trackers.push({
            active: false, life: 0,
            tx: 0, ty: 0, tw: 0, th: 0, 
            cx: 0, cy: 0, cw: 0, ch: 0, 
            prevX: 0, prevY: 0, velSmooth: 0, conf: 0, targetType: "UNKNOWN",
            hudVisible: false,
            bracket: br, bracketPos: bracketPos, leadLine: leadLine, leadPos: leadPos,
            trailLine: trailLine, trailPos: trailPos, dom: panel,
            elType: panel.querySelector('.hud-type-label'), elX: panel.querySelector('.hud-x'), 
            elY: panel.querySelector('.hud-y'), elVel: panel.querySelector('.hud-vel'), elConf: panel.querySelector('.hud-conf')
        });
    }

    let webcamVideo = document.createElement('video');
    let webcamReady = false;
    let latestHandPoint = null;
    let latestFaceDetections = [];
    let lastHandInferenceTime = 0;
    let lastMaskInferenceTime = 0;
    const handScrollState = {
        active: false,
        lastX: 0,
        lastY: 0,
        lastTime: 0
    };
    const loggedDetectorErrors = new Set();
    webcamVideo.autoplay = true;
    webcamVideo.muted = true;
    webcamVideo.playsInline = true;
    webcamVideo.setAttribute('autoplay', '');
    webcamVideo.setAttribute('muted', '');
    webcamVideo.setAttribute('playsinline', '');

    function logDetectorErrorOnce(label, error) {
        if (loggedDetectorErrors.has(label)) return;
        loggedDetectorErrors.add(label);
        console.warn(`${label} inference skipped:`, error);
    }

    function syncCanvasSize(canvas) {
        const nextWidth = Math.max(1, Math.round(canvas.clientWidth));
        const nextHeight = Math.max(1, Math.round(canvas.clientHeight));
        if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
            canvas.width = nextWidth;
            canvas.height = nextHeight;
            return true;
        }
        return false;
    }

    function mapVideoBoxToCanvas(box, sourceVideo, canvas) {
        const sourceW = sourceVideo.videoWidth || 1;
        const sourceH = sourceVideo.videoHeight || 1;
        const scale = Math.max(canvas.width / sourceW, canvas.height / sourceH);
        const drawW = sourceW * scale;
        const drawH = sourceH * scale;
        const offsetX = (canvas.width - drawW) / 2;
        const offsetY = (canvas.height - drawH) / 2;

        return {
            x: offsetX + box.originX * scale,
            y: offsetY + box.originY * scale,
            w: box.width * scale,
            h: box.height * scale
        };
    }

    function landmarkToParticlePoint(landmark) {
        return {
            x: ((1.0 - landmark.x) - 0.5) * 160,
            y: -(landmark.y - 0.5) * 160
        };
    }

    function getLandmarkCenter(landmarks, indexes) {
        const center = indexes.reduce((acc, index) => {
            acc.x += landmarks[index].x;
            acc.y += landmarks[index].y;
            return acc;
        }, { x: 0, y: 0 });

        center.x /= indexes.length;
        center.y /= indexes.length;
        return center;
    }

    function buildHandPoint(landmarks, now) {
        const tip = landmarkToParticlePoint(landmarks[8]);
        const palmCenter = getLandmarkCenter(landmarks, [0, 5, 9, 13, 17]);
        const palm = landmarkToParticlePoint(palmCenter);
        const extendedFingers = [
            [8, 6],
            [12, 10],
            [16, 14],
            [20, 18]
        ].reduce((countExtended, [tipIndex, pipIndex]) => {
            return countExtended + (landmarks[tipIndex].y < landmarks[pipIndex].y - 0.025 ? 1 : 0);
        }, 0);

        const previous = latestHandPoint;
        const dt = previous ? Math.max(16, now - previous.time) : 33;
        const vx = previous ? (tip.x - previous.x) / (dt / 16.67) : 0;
        const vy = previous ? (tip.y - previous.y) / (dt / 16.67) : 0;
        const motion = Math.min(48, Math.sqrt(vx * vx + vy * vy));

        return {
            x: tip.x,
            y: tip.y,
            palmX: palm.x,
            palmY: palm.y,
            centerX: palmCenter.x,
            centerY: palmCenter.y,
            extendedFingers,
            scrollActive: extendedFingers >= 3,
            motion,
            time: now,
            effectPoints: [
                { x: tip.x, y: tip.y, strength: 1.15 },
                { x: palm.x, y: palm.y, strength: 0.75 }
            ]
        };
    }

    function canGestureScrollPage() {
        const active = document.activeElement;
        if (!active) return true;
        return !active.isContentEditable && !['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName);
    }

    function updateHandScroll(handPoint, now) {
        if (!handPoint || !handPoint.scrollActive || !canGestureScrollPage()) {
            handScrollState.active = false;
            return;
        }

        if (!handScrollState.active || now - handScrollState.lastTime > 240) {
            handScrollState.active = true;
            handScrollState.lastX = handPoint.centerX;
            handScrollState.lastY = handPoint.centerY;
            handScrollState.lastTime = now;
            return;
        }

        const dx = handPoint.centerX - handScrollState.lastX;
        const dy = handPoint.centerY - handScrollState.lastY;
        const isVerticalGesture = Math.abs(dy) > 0.006 && Math.abs(dy) > Math.abs(dx) * 0.7;

        if (isVerticalGesture) {
            const viewportScale = window.innerHeight || 800;
            const scrollAmount = Math.max(-90, Math.min(90, -dy * viewportScale * 2.6));
            window.scrollBy({ top: scrollAmount, left: 0, behavior: 'auto' });
        }

        handScrollState.lastX = handPoint.centerX;
        handScrollState.lastY = handPoint.centerY;
        handScrollState.lastTime = now;
    }

    function addActiveParticle(index) {
        if (activeParticleMask[index]) return;
        activeParticleMask[index] = 1;
        activeParticles.push(index);
    }

    function activateParticlesAround(point, radius) {
        const centerX = Math.round((point.x + 80) * worldToGrid);
        const centerY = Math.round((80 - point.y) * worldToGrid);
        const radiusCells = Math.ceil(radius * worldToGrid) + 2;
        const minX = Math.max(0, centerX - radiusCells);
        const maxX = Math.min(density - 1, centerX + radiusCells);
        const minY = Math.max(0, centerY - radiusCells);
        const maxY = Math.min(density - 1, centerY + radiusCells);

        for (let gy = minY; gy <= maxY; gy++) {
            const row = gy * density;
            for (let gx = minX; gx <= maxX; gx++) {
                const index = row + gx;
                const i3 = index * 3;
                const dx = basePos[i3] - point.x;
                const dy = basePos[i3 + 1] - point.y;
                if (dx * dx + dy * dy <= radius * radius) {
                    addActiveParticle(index);
                }
            }
        }
    }
    
    const showSyncBtnInterval = setInterval(() => {
        if (window.isModelReady && syncBtn) {
            clearInterval(showSyncBtnInterval);
            setTimeout(() => { syncBtn.classList.add('is-visible'); }, 2000);
        }
    }, 500);

    if (syncBtn) {
        const startCameraSync = async () => {
            if (webcamReady) return;
            const textSpan = syncBtn.querySelector('.sync-text');
            if (textSpan) textSpan.textContent = "[ 同期中... ]";
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error("getUserMedia is not available in this context.");
                }

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        facingMode: "user"
                    },
                    audio: false
                });
                webcamVideo.srcObject = stream;

                // 追加: 右下のビデオにもストリームをアタッチし、PIPを表示
                if (monitorPip && monitorVideo) {
                    monitorVideo.muted = true;
                    monitorVideo.playsInline = true;
                    monitorVideo.srcObject = stream;
                    await Promise.allSettled([webcamVideo.play(), monitorVideo.play()]);
                    monitorPip.classList.add('is-visible');
                } else {
                    await webcamVideo.play();
                }

                webcamReady = true;
                syncBtn.classList.remove('is-visible');
                if (textSpan) textSpan.textContent = "[ 同期完了 ]";
            } catch (e) {
                if (textSpan) textSpan.textContent = "[ 同期エラー ]";
                syncBtn.classList.add('is-visible');
                console.warn("Camera sync failed:", e);
            }
        };

        syncBtn.addEventListener('click', startCameraSync);
        syncBtn.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                startCameraSync();
            }
        });
    }

    setupEngines();

    function updateBracketCoords(arr, x, y, w, h, len) {
        const l = x - w / 2, r = x + w / 2, top = y + h / 2, bottom = y - h / 2;
        let i = 0;
        arr[i++] = l; arr[i++] = top; arr[i++] = 0; arr[i++] = l + len; arr[i++] = top; arr[i++] = 0;
        arr[i++] = l; arr[i++] = top; arr[i++] = 0; arr[i++] = l; arr[i++] = top - len; arr[i++] = 0;
        arr[i++] = r; arr[i++] = top; arr[i++] = 0; arr[i++] = r - len; arr[i++] = top; arr[i++] = 0;
        arr[i++] = r; arr[i++] = top; arr[i++] = 0; arr[i++] = r; arr[i++] = top - len; arr[i++] = 0;
        arr[i++] = l; arr[i++] = bottom; arr[i++] = 0; arr[i++] = l + len; arr[i++] = bottom; arr[i++] = 0;
        arr[i++] = l; arr[i++] = bottom; arr[i++] = 0; arr[i++] = l; arr[i++] = bottom + len; arr[i++] = 0;
        arr[i++] = r; arr[i++] = bottom; arr[i++] = 0; arr[i++] = r - len; arr[i++] = bottom; arr[i++] = 0;
        arr[i++] = r; arr[i++] = bottom; arr[i++] = 0; arr[i++] = r; arr[i++] = bottom + len; arr[i++] = 0;
    }

    let lastInferenceTime = 0;
    let frameCount = 0;
    let inferenceCycle = 0; 
    let heroVisible = true;
    const heroProjectVec = new THREE.Vector3();
    const blobHistoryL = [], blobHistoryR = [];
    const PHI = 1.6180339887, SILVER = 1.4142135623;
    const HERO_INFERENCE_INTERVAL = 140;
    const HAND_INFERENCE_INTERVAL = 55;
    const FACE_MASK_INTERVAL = 140;
    const PHYSICS_INTERVAL = 33;

    function render() {
        requestAnimationFrame(render);
        if (document.hidden) return;

        const now = performance.now();
        frameCount++;

        let W = container.clientWidth, H = container.clientHeight;
        if (frameCount % 15 === 1) {
            const rect = container.getBoundingClientRect();
            heroVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        }

        // --- AI Inference (Round-robin) ---
        if (heroVisible && window.isModelReady && video.readyState >= 2 && now - lastInferenceTime > HERO_INFERENCE_INTERVAL) {
            try {
                trackers.forEach(t => { if (t.life > 0) t.life--; });
                let trackerIdx = 0;

                if (inferenceCycle === 0) {
                    trackerIdx = 0;
                    if (beeDetector) {
                        const beeRes = beeDetector.detectForVideo(video, now);
                        if (beeRes && beeRes.detections) {
                            beeRes.detections.forEach(det => {
                                if (trackerIdx >= 4) return;
                                const t = trackers[trackerIdx++];
                                t.active = true; t.life = 10; t.targetType = "BEE";
                                const bb = det.boundingBox;
                                // 物理空間(-80~+80)へのマッピング
                                t.tx = ((bb.originX + bb.width / 2) / video.videoWidth - 0.5) * 160;
                                t.ty = -((bb.originY + bb.height / 2) / video.videoHeight - 0.5) * 160;
                                t.tw = (bb.width / video.videoWidth) * 160; t.th = (bb.height / video.videoHeight) * 160;
                                t.conf = det.categories[0].score;
                                if (t.cw === 0) { t.cx = t.tx; t.cy = t.ty; t.cw = t.tw; t.ch = t.th; t.prevX = t.tx; t.prevY = t.ty; }
                            });
                        }
                    }
                    if (plantDetector) {
                        const plantRes = plantDetector.detectForVideo(video, now);
                        if (plantRes && plantRes.detections) {
                            plantRes.detections.forEach(det => {
                                if (trackerIdx >= 4) return;
                                const t = trackers[trackerIdx++];
                                t.active = true; t.life = 10; t.targetType = "PLNT";
                                const bb = det.boundingBox;
                                t.tx = ((bb.originX + bb.width / 2) / video.videoWidth - 0.5) * 160;
                                t.ty = -((bb.originY + bb.height / 2) / video.videoHeight - 0.5) * 160;
                                t.tw = (bb.width / video.videoWidth) * 160; t.th = (bb.height / video.videoHeight) * 160;
                                t.conf = det.categories[0].score;
                                if (t.cw === 0) { t.cx = t.tx; t.cy = t.ty; t.cw = t.tw; t.ch = t.th; t.prevX = t.tx; t.prevY = t.ty; }
                            });
                        }
                    }
                    inferenceCycle = 1;
                } else {
                    trackerIdx = 4;
                    if (faceDetector) {
                        const faceRes = faceDetector.detectForVideo(video, now);
                        if (faceRes && faceRes.detections) {
                            faceRes.detections.forEach(det => {
                                if (trackerIdx >= 8) return;
                                const t = trackers[trackerIdx++];
                                t.active = true; t.life = 10; t.targetType = "FACE";
                                const bb = det.boundingBox;
                                t.tx = ((bb.originX + bb.width / 2) / video.videoWidth - 0.5) * 160;
                                t.ty = -((bb.originY + bb.height / 2) / video.videoHeight - 0.5) * 160;
                                t.tw = (bb.width / video.videoWidth) * 160; t.th = (bb.height / video.videoHeight) * 160;
                                t.conf = det.categories ? det.categories[0].score : 0.85; 
                                if (t.cw === 0) { t.cx = t.tx; t.cy = t.ty; t.cw = t.tw; t.ch = t.th; t.prevX = t.tx; t.prevY = t.ty; }
                            });
                        }
                    }
                    if (personDetector) {
                        const personRes = personDetector.detectForVideo(video, now);
                        if (personRes && personRes.detections) {
                            personRes.detections.forEach(det => {
                                if (!det.categories || det.categories[0].categoryName !== "person") return;
                                if (trackerIdx >= 8) return;
                                const t = trackers[trackerIdx++];
                                t.active = true; t.life = 10; t.targetType = "PRSN";
                                const bb = det.boundingBox;
                                t.tx = ((bb.originX + bb.width / 2) / video.videoWidth - 0.5) * 160;
                                t.ty = -((bb.originY + bb.height / 2) / video.videoHeight - 0.5) * 160;
                                t.tw = (bb.width / video.videoWidth) * 160; t.th = (bb.height / video.videoHeight) * 160;
                                t.conf = det.categories[0].score;
                                if (t.cw === 0) { t.cx = t.tx; t.cy = t.ty; t.cw = t.tw; t.ch = t.th; t.prevX = t.tx; t.prevY = t.ty; }
                            });
                        }
                    }
                    inferenceCycle = 0;
                }
            } catch (e) {
                logDetectorErrorOnce("Hero detector", e);
                inferenceCycle = (inferenceCycle + 1) % 2;
            }
            lastInferenceTime = now;
        }

// --- ★ CPU Particle Physics Loop & Face Masking ---
        if (webcamReady && webcamVideo.readyState >= 2) {
            
            // 1. 顔の黒塗り処理 (右下キャンバス)
            if (monitorCanvas && monitorCtx) {
                let shouldRedrawMask = syncCanvasSize(monitorCanvas);

                if (webcamFaceDetector && now - lastMaskInferenceTime > FACE_MASK_INTERVAL) {
                    try {
                        const faceRes = webcamFaceDetector.detectForVideo(webcamVideo, now);
                        latestFaceDetections = faceRes && faceRes.detections ? faceRes.detections : [];
                        lastMaskInferenceTime = now;
                        shouldRedrawMask = true;
                    } catch (e) {
                        latestFaceDetections = [];
                        lastMaskInferenceTime = now;
                        shouldRedrawMask = true;
                        logDetectorErrorOnce("Webcam face detector", e);
                    }
                }

                if (shouldRedrawMask) {
                    monitorCtx.clearRect(0, 0, monitorCanvas.width, monitorCanvas.height);
                }

                if (shouldRedrawMask && latestFaceDetections.length) {
                    monitorCtx.fillStyle = 'black';
                    latestFaceDetections.forEach(det => {
                        const bb = det.boundingBox;
                        const rect = mapVideoBoxToCanvas(bb, webcamVideo, monitorCanvas);
                        
                        // 顔を確実に隠すために少し大きめに塗りつぶす
                        const paddingX = rect.w * 0.15;
                        const paddingY = rect.h * 0.15;
                        monitorCtx.fillRect(rect.x - paddingX, rect.y - paddingY, rect.w + paddingX * 2, rect.h + paddingY * 2);
                    });
                }
            }

            // 2. 手の座標取得とパーティクルの波打ち処理
            if (handLandmarker) {
                if (now - lastHandInferenceTime > HAND_INFERENCE_INTERVAL) {
                    try {
                        const handResults = handLandmarker.detectForVideo(webcamVideo, now);
                        if (handResults && handResults.landmarks && handResults.landmarks.length > 0) {
                            latestHandPoint = buildHandPoint(handResults.landmarks[0], now);
                            updateHandScroll(latestHandPoint, now);
                        } else {
                            latestHandPoint = null;
                            updateHandScroll(null, now);
                        }
                        lastHandInferenceTime = now;
                    } catch (e) {
                        latestHandPoint = null;
                        updateHandScroll(null, now);
                        lastHandInferenceTime = now;
                        logDetectorErrorOnce("HandLandmarker", e);
                    }
                }

                if (latestHandPoint) {
                    partMat.uniforms.uHand.value.set(latestHandPoint.x, latestHandPoint.y);
                    partMat.uniforms.uHandActive.value = 1.0;
                } else {
                    partMat.uniforms.uHandActive.value = 0.0;
                }

                const handEffectPoints = latestHandPoint ? latestHandPoint.effectPoints : [];
                const handMotion = latestHandPoint ? latestHandPoint.motion : 0;

                // 物理シミュレーションのパラメータ
                const influenceRadius = 48.0 + Math.min(18.0, handMotion * 1.15);
                const radiusSq = influenceRadius * influenceRadius;
                const springForce = 0.11;
                const friction = 0.86;
                const time = now * 0.01; // 波の進行スピード

                if (now - lastPhysicsTime > PHYSICS_INTERVAL) {
                    if (handEffectPoints.length) {
                        for (let h = 0; h < handEffectPoints.length; h++) {
                            activateParticlesAround(handEffectPoints[h], influenceRadius);
                        }
                    }
                }

                if (activeParticles.length && now - lastPhysicsTime > PHYSICS_INTERVAL) {
                    lastPhysicsTime = now;
                    let writeIndex = 0;

                    for (let listIndex = 0; listIndex < activeParticles.length; listIndex++) {
                        const particleIndex = activeParticles[listIndex];
                        const i3 = particleIndex * 3;
                        let px = posArr[i3];
                        let py = posArr[i3 + 1];
                        let pz = posArr[i3 + 2];

                        const bx = basePos[i3];
                        const by = basePos[i3 + 1];
                        const bz = basePos[i3 + 2];

                        let vx = velArr[i3];
                        let vy = velArr[i3 + 1];
                        let vz = velArr[i3 + 2];
                        let influenced = false;

                        // 手の座標からの波打ち効果（Ripple Effect）
                        for (let h = 0; h < handEffectPoints.length; h++) {
                            const point = handEffectPoints[h];
                            const dx = px - point.x;
                            const dy = py - point.y;
                            const distSq = dx * dx + dy * dy;
                            if (distSq < radiusSq) {
                                influenced = true;
                                const dist = Math.sqrt(distSq);
                                const safeDist = Math.max(dist, 0.001);
                                const falloff = (1.0 - dist / influenceRadius);
                                const wave = Math.sin(dist * 0.24 - time * 2.2);
                                const pulse = falloff * falloff * point.strength * (1.0 + Math.min(1.2, handMotion * 0.035));
                                const radial = pulse * 2.8;
                                const swirl = Math.cos(time + dist * 0.08) * pulse * 1.5;

                                vx += (dx / safeDist) * radial - (dy / safeDist) * swirl;
                                vy += (dy / safeDist) * radial + (dx / safeDist) * swirl;
                                vz += (18.0 + wave * 20.0) * pulse; // Z軸方向(手前/奥)に大きく波打つ
                            }
                        }

                        // 元の位置に戻るバネの力（Spring）
                        vx += (bx - px) * springForce;
                        vy += (by - py) * springForce;
                        vz += (bz - pz) * springForce;

                        // 摩擦による減衰（Friction）
                        vx *= friction;
                        vy *= friction;
                        vz *= friction;

                        const nx = Math.max(-110, Math.min(110, px + vx));
                        const ny = Math.max(-110, Math.min(110, py + vy));
                        const nz = Math.max(-45, Math.min(45, pz + vz));
                        const settled = !influenced &&
                            Math.abs(vx) + Math.abs(vy) + Math.abs(vz) < 0.018 &&
                            Math.abs(nx - bx) + Math.abs(ny - by) + Math.abs(nz - bz) < 0.08;

                        if (settled) {
                            activeParticleMask[particleIndex] = 0;
                            velArr[i3] = 0; velArr[i3 + 1] = 0; velArr[i3 + 2] = 0;
                            posArr[i3] = bx; posArr[i3 + 1] = by; posArr[i3 + 2] = bz;
                        } else {
                            velArr[i3] = vx; velArr[i3 + 1] = vy; velArr[i3 + 2] = vz;
                            posArr[i3] = nx; posArr[i3 + 1] = ny; posArr[i3 + 2] = nz;
                            activeParticles[writeIndex++] = particleIndex;
                        }
                    }

                    activeParticles.length = writeIndex;
                    positionAttr.needsUpdate = true;
                }
            }
        }
        
        // --- HUD Trackers Visual Update & DOM Projection ---
        trackers.forEach((t, i) => {
            if (t.life > 0) {
                t.bracket.visible = true; t.leadLine.visible = true; t.trailLine.visible = true;
                
                const dx = t.tx - t.prevX, dy = t.ty - t.prevY;
                const instVel = Math.sqrt(dx * dx + dy * dy);
                t.velSmooth = (t.velSmooth * PHI + instVel) / (PHI + 1);
                t.prevX = t.tx; t.prevY = t.ty;

                t.cx = (t.cx * PHI + t.tx) / (PHI + 1);
                t.cy = (t.cy * PHI + t.ty) / (PHI + 1);
                t.cw += (t.tw - t.cw) * 0.15; t.ch += (t.th - t.ch) * 0.15;

                for (let j = (TRAIL_LENGTH - 1) * 3; j >= 3; j -= 3) {
                    t.trailPos[j] = t.trailPos[j - 3]; t.trailPos[j + 1] = t.trailPos[j - 2]; t.trailPos[j + 2] = t.trailPos[j - 1];
                }
                t.trailPos[0] = t.cx; t.trailPos[1] = t.cy; t.trailPos[2] = 0;
                t.trailLine.geometry.attributes.position.needsUpdate = true;

                const bLen = Math.max(8, t.cw * 0.1);
                updateBracketCoords(t.bracketPos, t.cx, t.cy, t.cw, t.ch, bLen);
                t.bracket.geometry.attributes.position.needsUpdate = true;

                const signX = (i % 2 === 0) ? 1 : -1, signY = (i < 4) ? 1 : -1;
                const offsetX = (t.cw / 2 + 15) * signX, offsetY = (t.ch / 2 + 10) * signY;
                const p2x = t.cx + offsetX, p3x = t.cx + offsetX, p3y = t.cy + offsetY * SILVER;

                t.leadPos[0] = t.cx; t.leadPos[1] = t.cy; t.leadPos[2] = 0;
                t.leadPos[3] = p2x;  t.leadPos[4] = t.cy; t.leadPos[5] = 0;
                t.leadPos[6] = p3x;  t.leadPos[7] = p3y; t.leadPos[8] = 0;
                t.leadLine.geometry.attributes.position.needsUpdate = true;

                // ★ PerspectiveCamera に基づく完璧なUI追従計算 ★
                const vec = heroProjectVec.set(p3x, p3y, 0);
                vec.project(camera); // 3D座標を2Dのスクリーン座標（-1 ~ +1）に変換
                
                let domX = (vec.x * 0.5 + 0.5) * W + (signX > 0 ? 10 : -130); 
                let domY = (-(vec.y * 0.5) + 0.5) * H - 10;
                
                domX = Math.max(10, Math.min(W - 130, domX)); 
                domY = Math.max(10, Math.min(H - 90, domY));
                
                t.dom.style.transform = `translate(${domX}px, ${domY}px)`;
                if (!t.hudVisible) {
                    t.dom.classList.add('is-visible');
                    t.hudVisible = true;
                }

                if (frameCount % 4 === i % 4) {
                    t.elType.textContent = `TGT_${t.targetType}`; 
                    t.elX.textContent = t.cx.toFixed(2);
                    t.elY.textContent = t.cy.toFixed(2);
                    t.elVel.textContent = (t.velSmooth * 20).toFixed(2);
                    t.elConf.textContent = (t.conf * 100).toFixed(1);
                    
                    if (blobStreamL && blobStreamR) {
                        const hex = Math.random().toString(16).substr(2, 4).toUpperCase();
                        const blobLineHTML = `<div class="blob-line">[${hex}] ${t.targetType} <span class="highlight">${t.cx.toFixed(1)}, ${t.cy.toFixed(1)}</span></div>`;
                        if (signX > 0) {
                            blobHistoryL.push(blobLineHTML);
                            if (blobHistoryL.length > 25) blobHistoryL.shift();
                            blobStreamL.innerHTML = blobHistoryL.join('');
                        } else {
                            blobHistoryR.push(blobLineHTML);
                            if (blobHistoryR.length > 25) blobHistoryR.shift();
                            blobStreamR.innerHTML = blobHistoryR.join('');
                        }
                    }
                }
            } else {
                t.bracket.visible = false; t.leadLine.visible = false; t.trailLine.visible = false;
                if (t.hudVisible) {
                    t.dom.classList.remove('is-visible');
                    t.hudVisible = false;
                }
                t.cw = 0; t.ch = 0;
            }
        });

        renderer.render(scene, camera);
    }
    render();
}

/* ============================================================================
 * 4. Data Table (Skills) のソートとページネーション
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
            let av = a[sortCol];
            let bv = b[sortCol];
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

    if (prevBtn) prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            applyPagination();
        }
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(filtered.length / itemsPerPage)) {
            currentPage++;
            applyPagination();
        }
    });

    applyPagination();
}

/* ============================================================================
 * 5. Footer Logo Marquee & SoundCloud Widget
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
    </svg>`;
    
    let itemHTML = `<div class="footer-marquee-item">${svgCode}</div>`;
    let singleSet = itemHTML.repeat(6);
    track.innerHTML = singleSet + singleSet;
}

function initSoundCloudWidget() {
    const iframe = document.getElementById('heroSCWidget');
    if (!iframe) return;
    
    const loadSC = new Promise((resolve, reject) => {
        if (window.SC) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = "https://w.soundcloud.com/player/api.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
    
    loadSC.then(() => {
        const widget = SC.Widget(iframe);
        const SEEK_TARGET = 102000;
        const TOLERANCE = 3000;
        let hasSeeked = false;
        let pollingTimer = null;
        
        const verifyAndSeek = () => {
            if (hasSeeked) return;
            widget.getPosition((pos) => {
                if (pos >= SEEK_TARGET - TOLERANCE) {
                    hasSeeked = true;
                    if (pollingTimer) {
                        clearInterval(pollingTimer);
                        pollingTimer = null;
                    }
                } else {
                    widget.seekTo(SEEK_TARGET);
                }
            });
        };
        
        widget.bind(SC.Widget.Events.FINISH, () => {
            hasSeeked = false;
        });
        
        widget.bind(SC.Widget.Events.READY, () => {
            widget.seekTo(SEEK_TARGET);
        });
        
        widget.bind(SC.Widget.Events.PLAY, () => {
            widget.getPosition((pos) => {
                if (pos < SEEK_TARGET - TOLERANCE) {
                    hasSeeked = false;
                }
                if (hasSeeked) return;
                
                widget.seekTo(SEEK_TARGET);
                const checkDelays = [50, 100, 200, 400, 600, 1000, 1500, 2000, 3000];
                checkDelays.forEach(delay => {
                    setTimeout(() => {
                        if (!hasSeeked) verifyAndSeek();
                    }, delay);
                });
                
                setTimeout(() => {
                    widget.getPosition((innerPos) => {
                        if (innerPos < SEEK_TARGET - TOLERANCE) {
                            widget.pause();
                            setTimeout(() => {
                                widget.seekTo(SEEK_TARGET);
                                setTimeout(() => {
                                    widget.play();
                                    setTimeout(verifyAndSeek, 500);
                                }, 150);
                            }, 150);
                        }
                    });
                }, 1200);
            });
        });

        widget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
            if (hasSeeked) return;
            if (data.currentPosition < SEEK_TARGET - TOLERANCE) {
                widget.seekTo(SEEK_TARGET);
            } else if (data.currentPosition >= SEEK_TARGET - TOLERANCE) {
                hasSeeked = true;
                if (pollingTimer) {
                    clearInterval(pollingTimer);
                    pollingTimer = null;
                }
            }
        });

        widget.bind(SC.Widget.Events.SEEK, () => {
            widget.getPosition((pos) => {
                if (pos >= SEEK_TARGET - TOLERANCE) {
                    hasSeeked = true;
                    if (pollingTimer) {
                        clearInterval(pollingTimer);
                        pollingTimer = null;
                    }
                }
            });
        });

    }).catch(() => {
        console.warn('SoundCloud Widget API: load failed');
    });
}

function initShimmer() {
    if (window.__videoTextMask) return;
    const mask = new VideoTextMask();
    window.__videoTextMask = mask;
    
    window.addEventListener('beforeunload', () => {
        mask.destroy();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initUI();
    initFooterLogoCSS();
    setTimeout(initShimmer, 300);
});

window.addEventListener('load', () => {
    initSoundCloudWidget();
    initWebGL();
    initMiaTable();
});