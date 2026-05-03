import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS HAIR — 美容院テンプレート
   技術: Canvas マウス追従グラデーションライト
        + IntersectionObserver でフェードイン
        + CSS clip-path リビール
   テイスト: モダン・洗練・暖色系ベージュ
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=2400&q=85',
  hero2: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2400&q=85',
  hero3: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=2400&q=85',
  style1: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=85',
  style2: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=85',
  style3: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85',
  style4: 'https://images.unsplash.com/photo-1599387737466-29d7b9b82e69?auto=format&fit=crop&w=900&q=85',
  style5: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=85',
  style6: 'https://images.unsplash.com/photo-1580618864180-f6d7d39b8ff6?auto=format&fit=crop&w=900&q=85',
  interior: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1800&q=85',
  staff: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85',
}

export default function SalonPremiumDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  /* ヒーロー切替 */
  useEffect(() => {
    const it = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 5500)
    return () => clearInterval(it)
  }, [])

  /* マウス追従グラデーションライト Canvas */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let cur = { x: 0.5, y: 0.5 }
    let t = 0

    const resize = () => {
      canvas.width = canvas.clientWidth * devicePixelRatio
      canvas.height = canvas.clientHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      // smooth follow
      cur.x += (mouseRef.current.x - cur.x) * 0.06
      cur.y += (mouseRef.current.y - cur.y) * 0.06
      t += 0.005

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#fdf4f0'
      ctx.fillRect(0, 0, W, H)

      // 大きい光1
      const g1 = ctx.createRadialGradient(
        cur.x * W, cur.y * H, 0,
        cur.x * W, cur.y * H, W * 0.6,
      )
      g1.addColorStop(0, 'rgba(212, 163, 115, 0.55)')
      g1.addColorStop(0.4, 'rgba(212, 163, 115, 0.18)')
      g1.addColorStop(1, 'rgba(212, 163, 115, 0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, W, H)

      // 動く光2
      const cx = (0.5 + Math.sin(t * 0.6) * 0.3) * W
      const cy = (0.5 + Math.cos(t * 0.4) * 0.25) * H
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.5)
      g2.addColorStop(0, 'rgba(255, 200, 170, 0.5)')
      g2.addColorStop(1, 'rgba(255, 200, 170, 0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, W, H)

      // 動く光3 (cool accent)
      const cx2 = (0.5 + Math.cos(t * 0.5 + 1) * 0.4) * W
      const cy2 = (0.5 + Math.sin(t * 0.7 + 1) * 0.3) * H
      const g3 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, W * 0.4)
      g3.addColorStop(0, 'rgba(186, 134, 90, 0.35)')
      g3.addColorStop(1, 'rgba(186, 134, 90, 0)')
      ctx.fillStyle = g3
      ctx.fillRect(0, 0, W, H)

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  /* IntersectionObserver でフェードイン */
  useEffect(() => {
    const els = document.querySelectorAll('.sl-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="sl-root">
      <style>{cssText}</style>

      {/* 背景キャンバス（fixed） */}
      <canvas ref={canvasRef} className="sl-bg-canvas" aria-hidden />

      {/* 警告 */}
      <div className="sl-warning">
        <div className="sl-warning-row">
          <span className="sl-warning-pill">SAMPLE</span>
          <span className="sl-warning-text">
            ⚠️ <b>POLARIS HAIR</b> は<b className="sl-warning-emph">実在しない仮想サロン</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="sl-warning-back">← 戻る</a>
        </div>
        <div className="sl-warning-strip">
          ⚠️ 注意：サロン名・住所・電話番号・スタイリスト名・お客様の声などは<u>すべて架空</u>です。
        </div>
      </div>

      {/* Header */}
      <header className="sl-header">
        <a href="#" className="sl-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="sl-logo-mark">P</span>
          <span className="sl-logo-text">POLARIS<small>HAIR</small></span>
        </a>
        <nav className={`sl-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#concept" onClick={() => setMenuOpen(false)}>Concept</a>
          <a href="#style" onClick={() => setMenuOpen(false)}>Style</a>
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#staff" onClick={() => setMenuOpen(false)}>Staff</a>
          <a href="#access" onClick={() => setMenuOpen(false)}>Access</a>
        </nav>
        <button className="sl-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#book" className="sl-book-btn">BOOK NOW（仮）</a>
      </header>

      {/* Hero */}
      <section className="sl-hero">
        <div className="sl-hero-images">
          {[IMG.hero, IMG.hero2, IMG.hero3].map((src, i) => (
            <div key={i} className={`sl-hero-img ${i === heroIdx ? 'is-active' : ''}`}
                 style={{ backgroundImage: `url("${src}")` }}/>
          ))}
        </div>
        <div className="sl-hero-watermark">SAMPLE 仮想</div>

        <div className="sl-hero-content">
          <p className="sl-hero-eyebrow">— Modern Beauty Salon —</p>
          <h1 className="sl-hero-title">
            <span className="sl-hero-line">わたしらしさを</span>
            <span className="sl-hero-line">髪から、つくる</span>
          </h1>
          <p className="sl-hero-sub">
            ※架空サロン｜一人ひとりに合わせた、<br/>
            丁寧なカウンセリングから。
          </p>
          <div className="sl-hero-cta">
            <a href="#book" className="sl-btn sl-btn-fill">BOOK NOW（仮）</a>
            <a href="#style" className="sl-btn sl-btn-ghost">View Style</a>
          </div>
        </div>

        <div className="sl-hero-pager">
          {[0, 1, 2].map((i) => (
            <button key={i} className={i === heroIdx ? 'is-active' : ''}
                    onClick={() => setHeroIdx(i)} aria-label={`Hero ${i + 1}`}/>
          ))}
        </div>
      </section>

      {/* Concept */}
      <section id="concept" className="sl-concept">
        <div className="sl-concept-grid">
          <div className="sl-concept-text sl-reveal">
            <span className="sl-eyebrow">— Concept —</span>
            <h2 className="sl-h-large">
              <span>気分で、</span>
              <span>まとう髪を。</span>
            </h2>
            <p className="sl-concept-body">
              髪は、その日の気分や生き方を映し出すもの。<br/>
              POLARIS HAIRは、<u>あなたの「なりたい」を引き出す</u>美容室です。<br/>
              ※ このページは架空のサロンのデザイン見本です。
            </p>
            <div className="sl-concept-stats">
              <div><strong>2018</strong><span>OPEN（架空）</span></div>
              <div><strong>12</strong><span>STYLISTS（架空）</span></div>
              <div><strong>4.8</strong><span>★ Google（架空）</span></div>
            </div>
          </div>
          <div className="sl-concept-img sl-reveal">
            <img src={IMG.interior} alt="" loading="lazy"/>
            <div className="sl-concept-img-stamp">SAMPLE</div>
          </div>
        </div>
      </section>

      {/* Style Gallery */}
      <section id="style" className="sl-style">
        <div className="sl-style-head sl-reveal">
          <span className="sl-eyebrow">— Style Gallery —</span>
          <h2 className="sl-h-mega">STYLE</h2>
          <p className="sl-fake-pill">※ スタイル写真はすべて架空のサンプル表示です</p>
        </div>
        <div className="sl-style-grid">
          {[
            { src: IMG.style1, tag: 'short', name: 'Natural Short（架空）' },
            { src: IMG.style2, tag: 'medium', name: 'Soft Wave（架空）' },
            { src: IMG.style3, tag: 'long', name: 'Layer Long（架空）' },
            { src: IMG.style4, tag: 'color', name: 'Beige Gradient（架空）' },
            { src: IMG.style5, tag: 'perm', name: 'Digital Perm（架空）' },
            { src: IMG.style6, tag: 'arrange', name: 'Up Style（架空）' },
          ].map((s, i) => (
            <div key={i} className="sl-style-card sl-reveal" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
              <div className="sl-style-card-img" style={{ backgroundImage: `url("${s.src}")` }}>
                <div className="sl-style-card-tag">{s.tag}</div>
                <div className="sl-style-card-stamp">SAMPLE</div>
              </div>
              <div className="sl-style-card-info">
                <p className="sl-style-card-name">{s.name}</p>
                <span className="sl-style-card-cta">View ↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="sl-menu">
        <div className="sl-menu-inner">
          <div className="sl-menu-head sl-reveal">
            <span className="sl-eyebrow">— Menu —</span>
            <h2 className="sl-h-mega">PRICE</h2>
            <p className="sl-fake-pill">※ 価格はすべて架空のデザイン見本用です</p>
          </div>
          <div className="sl-menu-list">
            {[
              { name: 'カット', desc: 'シャンプー・ブロー込み', price: '¥6,600' },
              { name: 'カラー', desc: '髪質改善トリートメント付き', price: '¥10,300〜' },
              { name: 'カラー＋カット', desc: '人気のセットメニュー', price: '¥14,300' },
              { name: 'パーマ＋カット', desc: 'デジタルパーマ対応', price: '¥16,500' },
              { name: 'ヘッドスパ', desc: '極上のリラクゼーション 60分', price: '¥5,500' },
              { name: 'トリートメント', desc: '髪質改善・補修', price: '¥4,400〜' },
            ].map((m) => (
              <div key={m.name} className="sl-menu-row sl-reveal">
                <div className="sl-menu-row-name">{m.name}<span> （架空）</span></div>
                <div className="sl-menu-row-dots"/>
                <div className="sl-menu-row-desc">{m.desc}</div>
                <div className="sl-menu-row-price">{m.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="sl-staff">
        <div className="sl-staff-head sl-reveal">
          <span className="sl-eyebrow">— Stylists —</span>
          <h2 className="sl-h-mega">STAFF</h2>
          <p className="sl-fake-pill">※ スタイリスト情報はすべて架空のサンプルです</p>
        </div>
        <div className="sl-staff-grid">
          {[
            { name: 'YUKI（架空）', role: 'Director', img: IMG.style2 },
            { name: 'AYA（架空）', role: 'Senior Stylist', img: IMG.style3 },
            { name: 'KAEDE（架空）', role: 'Stylist / Color Specialist', img: IMG.style4 },
          ].map((s) => (
            <div key={s.name} className="sl-staff-card sl-reveal">
              <div className="sl-staff-img" style={{ backgroundImage: `url("${s.img}")` }}>
                <div className="sl-style-card-stamp">SAMPLE</div>
              </div>
              <p className="sl-staff-role">{s.role}</p>
              <h3 className="sl-staff-name">{s.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Access */}
      <section id="access" className="sl-access">
        <div className="sl-access-grid">
          <div className="sl-access-text sl-reveal">
            <span className="sl-eyebrow">— Access —</span>
            <h2 className="sl-h-large">ACCESS</h2>
            <dl className="sl-access-info">
              <dt>住所（架空）</dt>
              <dd>〒000-0000 東京都〇〇区〇〇 0-0-0（実在しません）</dd>
              <dt>電話（架空）</dt>
              <dd>03-0000-0000</dd>
              <dt>営業時間（架空）</dt>
              <dd>10:00〜20:00 / 日曜定休</dd>
              <dt>アクセス（架空）</dt>
              <dd>〇〇駅 徒歩〇分</dd>
            </dl>
          </div>
          <div className="sl-access-map sl-reveal">
            <div className="sl-access-map-fake">
              <span>※ 地図はサンプル表示</span>
              <span className="sl-fake-small">実在の場所ではありません</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="sl-cta">
        <div className="sl-cta-content sl-reveal">
          <h2 className="sl-cta-h">あなたの "なりたい" を<br/>叶える、最初の一歩。</h2>
          <p className="sl-cta-sub">※ ボタンは動作しません。仮想サロンのデザイン見本です。</p>
          <div className="sl-cta-btns">
            <a href="#" className="sl-btn sl-btn-fill sl-btn-large">BOOK NOW（仮）</a>
            <a href="#" className="sl-btn sl-btn-ghost sl-btn-large">LINE 予約（仮）</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sl-footer">
        <div className="sl-footer-content">
          <div className="sl-footer-logo">
            <span className="sl-logo-mark">P</span>
            <span className="sl-logo-text">POLARIS<small>HAIR</small></span>
          </div>
          <p className="sl-footer-tag">— Modern Beauty Salon —</p>
          <p className="sl-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS HAIR」という<u>実在しない仮想サロン</u>のデザイン見本です。<br/>
            サロン名・住所・電話番号・スタイリスト名・価格・お客様の声等はすべて<u>架空</u>です。
          </p>
          <p className="sl-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="sl-floating-warning">
        <span className="sl-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想サロンです</span>
      </div>
    </div>
  )
}

const cssText = `
.sl-root {
  --sl-bg: #fdf4f0;
  --sl-fg: #3a2820;
  --sl-accent: #d4a373;
  --sl-accent-dark: #ba865a;
  --sl-pink: #ec4899;
  background: var(--sl-bg);
  color: var(--sl-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.sl-root *, .sl-root *::before, .sl-root *::after { box-sizing: border-box; }

.sl-bg-canvas {
  position: fixed; inset: 0; width: 100%; height: 100%;
  z-index: 0; pointer-events: none;
}
.sl-root > *:not(.sl-bg-canvas) { position: relative; z-index: 1; }

/* Warning */
.sl-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--sl-pink);
  font-family: "Noto Sans JP", sans-serif;
}
.sl-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.sl-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.sl-warning-text { flex: 1; min-width: 0; }
.sl-warning-emph { color: var(--sl-pink); }
.sl-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.sl-warning-back:hover { background: var(--sl-pink); color: #fff; }
.sl-warning-strip {
  background: var(--sl-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Header */
.sl-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 18px 32px;
  background: rgba(253, 244, 240, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(58, 40, 32, 0.08);
}
.sl-logo {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--sl-fg);
}
.sl-logo-mark {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--sl-fg); color: var(--sl-bg);
  display: flex; align-items: center; justify-content: center;
  font-family: "Inter", serif; font-weight: 900; font-size: 18px;
}
.sl-logo-text {
  font-family: "Inter", sans-serif; font-weight: 800; font-size: 16px;
  letter-spacing: 0.05em; line-height: 1;
}
.sl-logo-text small {
  display: block; font-size: 9px; letter-spacing: 0.3em;
  color: var(--sl-accent-dark); margin-top: 2px; font-weight: 600;
}
.sl-nav {
  display: flex; gap: 28px; margin-left: auto;
  font-family: "Inter", sans-serif; font-size: 13px; font-weight: 600;
  letter-spacing: 0.08em;
}
.sl-nav a {
  color: var(--sl-fg); text-decoration: none; padding: 8px 0;
  position: relative; transition: color .3s;
}
.sl-nav a::after {
  content: ''; position: absolute; left: 0; right: 100%; bottom: 0;
  height: 1px; background: var(--sl-accent); transition: right .3s;
}
.sl-nav a:hover { color: var(--sl-accent-dark); }
.sl-nav a:hover::after { right: 0; }

.sl-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.sl-burger span {
  width: 22px; height: 2px; background: var(--sl-fg); transition: all .3s;
}
.sl-burger span.is-open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.sl-burger span.is-open:nth-child(2) { opacity: 0; }
.sl-burger span.is-open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.sl-book-btn {
  background: var(--sl-fg); color: var(--sl-bg);
  padding: 12px 22px; border-radius: 999px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em; text-decoration: none;
  transition: all .3s;
}
.sl-book-btn:hover { background: var(--sl-accent-dark); transform: translateY(-2px); }

/* Hero */
.sl-hero {
  position: relative; min-height: 88vh;
  display: grid; grid-template-columns: 1fr 1fr; align-items: center;
  padding: 60px 64px;
  overflow: hidden;
}
.sl-hero-images {
  position: absolute; right: 0; top: 0; bottom: 0; width: 50%;
  overflow: hidden;
}
.sl-hero-img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  opacity: 0; transform: scale(1.05);
  transition: opacity 1.4s ease, transform 6s ease-out;
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
}
.sl-hero-img.is-active { opacity: 1; transform: scale(1); }
.sl-hero-watermark {
  position: absolute; right: 0; top: 50%; transform: translateY(-50%) rotate(90deg);
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 14vw;
  color: rgba(212, 163, 115, 0.18); letter-spacing: 0.3em;
  white-space: nowrap; pointer-events: none; z-index: 2;
}
.sl-hero-content { position: relative; z-index: 3; padding-right: 60px; }
.sl-hero-eyebrow {
  font-family: "Inter", serif; font-style: italic;
  font-size: 14px; letter-spacing: 0.2em; color: var(--sl-accent-dark);
  margin: 0 0 24px;
}
.sl-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(40px, 5.5vw, 84px); line-height: 1.15;
  margin: 0 0 32px; letter-spacing: -0.02em;
}
.sl-hero-line {
  display: block;
  background: linear-gradient(110deg, var(--sl-fg) 0%, var(--sl-accent-dark) 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: sl-rise 1.2s cubic-bezier(.2,.8,.3,1) both;
}
.sl-hero-line:nth-child(2) { animation-delay: .15s; }
@keyframes sl-rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
.sl-hero-sub {
  font-size: 14px; line-height: 1.9; color: rgba(58, 40, 32, 0.7);
  margin: 0 0 36px;
}
.sl-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.sl-hero-pager {
  position: absolute; left: 64px; bottom: 60px; z-index: 4;
  display: flex; gap: 8px;
}
.sl-hero-pager button {
  width: 28px; height: 3px; border: 0; cursor: pointer;
  background: rgba(58, 40, 32, 0.2); transition: background .3s;
}
.sl-hero-pager button.is-active { background: var(--sl-accent-dark); }

/* Buttons */
.sl-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 999px;
  font-family: "Inter", "Noto Sans JP", sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
  text-decoration: none; cursor: pointer; border: 1px solid transparent;
  transition: all .3s ease;
}
.sl-btn-fill { background: var(--sl-fg); color: var(--sl-bg); }
.sl-btn-fill:hover { background: var(--sl-accent-dark); transform: translateY(-2px); }
.sl-btn-ghost { background: transparent; color: var(--sl-fg); border-color: var(--sl-fg); }
.sl-btn-ghost:hover { background: var(--sl-fg); color: var(--sl-bg); }
.sl-btn-large { padding: 18px 36px; font-size: 13px; }

/* Common */
.sl-eyebrow {
  font-family: "Inter", serif; font-style: italic;
  font-size: 13px; letter-spacing: 0.2em;
  color: var(--sl-accent-dark);
}
.sl-h-large {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(36px, 5vw, 72px); line-height: 1.2;
  margin: 16px 0 32px; letter-spacing: -0.02em;
}
.sl-h-large span { display: block; }
.sl-h-mega {
  font-family: "Inter", serif; font-weight: 900;
  font-size: clamp(64px, 10vw, 160px); line-height: 1;
  margin: 12px 0 24px; letter-spacing: -0.04em;
  background: linear-gradient(180deg, var(--sl-fg) 0%, var(--sl-accent-dark) 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sl-fake-pill {
  display: inline-block; padding: 5px 14px;
  background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4);
  color: var(--sl-pink); border-radius: 999px;
  font-size: 11px; font-weight: 700; margin: 8px 0 32px;
}

/* Reveal */
.sl-reveal { opacity: 0; transform: translateY(40px); transition: opacity .9s ease, transform .9s ease; }
.sl-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Concept */
.sl-concept { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.sl-concept-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.sl-concept-body { font-size: 14px; line-height: 2; color: rgba(58,40,32,0.75); margin: 0 0 40px; }
.sl-concept-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.sl-concept-stats > div {
  padding-top: 16px; border-top: 1px solid rgba(58,40,32,0.15);
}
.sl-concept-stats strong {
  display: block; font-family: "Inter", serif; font-weight: 900;
  font-size: 36px; color: var(--sl-accent-dark);
}
.sl-concept-stats span {
  display: block; font-size: 11px; letter-spacing: 0.1em; margin-top: 4px;
  color: rgba(58,40,32,0.6);
}
.sl-concept-img {
  position: relative; aspect-ratio: 4/5; overflow: hidden; border-radius: 4px;
}
.sl-concept-img img { width: 100%; height: 100%; object-fit: cover; }
.sl-concept-img-stamp {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 3px; letter-spacing: 0.15em;
}

/* Style */
.sl-style { padding: 100px 64px; max-width: 1400px; margin: 0 auto; text-align: center; }
.sl-style-head { margin-bottom: 60px; }
.sl-style-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.sl-style-card {
  text-align: left; cursor: pointer;
}
.sl-style-card-img {
  position: relative; aspect-ratio: 3/4; overflow: hidden; border-radius: 4px;
  background-size: cover; background-position: center;
  transition: transform .6s ease;
}
.sl-style-card:hover .sl-style-card-img { transform: scale(1.02); }
.sl-style-card-tag {
  position: absolute; top: 16px; left: 16px;
  background: rgba(255,255,255,0.9); color: var(--sl-fg);
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 5px 12px; border-radius: 999px;
}
.sl-style-card-stamp {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 3px; letter-spacing: 0.15em;
}
.sl-style-card-info {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 0; border-bottom: 1px solid rgba(58,40,32,0.15);
}
.sl-style-card-name { font-size: 14px; font-weight: 600; margin: 0; }
.sl-style-card-cta {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.15em;
  color: var(--sl-accent-dark); transition: transform .3s;
}
.sl-style-card:hover .sl-style-card-cta { transform: translateX(4px); }

/* Menu */
.sl-menu { padding: 140px 64px; }
.sl-menu-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.sl-menu-head { margin-bottom: 56px; }
.sl-menu-list { text-align: left; }
.sl-menu-row {
  display: grid; grid-template-columns: 200px 1fr 1fr auto; align-items: center; gap: 16px;
  padding: 22px 0; border-bottom: 1px dashed rgba(58,40,32,0.2);
  font-size: 14px;
}
.sl-menu-row-name { font-weight: 700; color: var(--sl-fg); }
.sl-menu-row-name span { font-size: 10px; color: var(--sl-pink); font-weight: 600; }
.sl-menu-row-dots { height: 1px; background: rgba(58,40,32,0.1); }
.sl-menu-row-desc { font-size: 12px; color: rgba(58,40,32,0.6); }
.sl-menu-row-price {
  font-family: "Inter", serif; font-weight: 900; font-size: 18px; color: var(--sl-accent-dark);
}

/* Staff */
.sl-staff { padding: 100px 64px; max-width: 1280px; margin: 0 auto; text-align: center; }
.sl-staff-head { margin-bottom: 60px; }
.sl-staff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.sl-staff-card { text-align: left; }
.sl-staff-img {
  position: relative; aspect-ratio: 3/4; overflow: hidden; border-radius: 4px;
  background-size: cover; background-position: center;
  margin-bottom: 16px;
  transition: transform .6s ease;
}
.sl-staff-card:hover .sl-staff-img { transform: scale(1.02); }
.sl-staff-role {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: var(--sl-accent-dark); margin: 0 0 6px; text-transform: uppercase;
}
.sl-staff-name {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 700;
  margin: 0;
}

/* Access */
.sl-access { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.sl-access-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
.sl-access-info {
  display: grid; grid-template-columns: 100px 1fr; gap: 12px 24px;
  margin: 32px 0 0;
}
.sl-access-info dt {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.15em;
  color: var(--sl-accent-dark); text-transform: uppercase; padding-top: 4px;
}
.sl-access-info dd { margin: 0; font-size: 14px; line-height: 1.6; }
.sl-access-map-fake {
  width: 100%; aspect-ratio: 4/3; border-radius: 4px;
  background: linear-gradient(135deg, rgba(212,163,115,0.2), rgba(186,134,90,0.1));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; border: 1px dashed rgba(58,40,32,0.3);
}
.sl-access-map-fake span:first-child {
  font-size: 14px; font-weight: 700; color: rgba(58,40,32,0.7);
}
.sl-fake-small { font-size: 11px; color: var(--sl-pink) !important; }

/* CTA */
.sl-cta {
  padding: 140px 32px; text-align: center;
  background: linear-gradient(135deg, var(--sl-fg) 0%, #5a4030 100%);
  color: var(--sl-bg);
  position: relative; overflow: hidden;
}
.sl-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(212,163,115,0.3), transparent 50%);
}
.sl-cta-content { position: relative; max-width: 800px; margin: 0 auto; }
.sl-cta-h {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(32px, 5vw, 56px); line-height: 1.4; margin: 0 0 24px;
}
.sl-cta-sub { font-size: 13px; opacity: 0.7; margin: 0 0 40px; }
.sl-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.sl-cta .sl-btn-fill { background: var(--sl-bg); color: var(--sl-fg); }
.sl-cta .sl-btn-ghost { color: var(--sl-bg); border-color: var(--sl-bg); }
.sl-cta .sl-btn-ghost:hover { background: var(--sl-bg); color: var(--sl-fg); }

/* Footer */
.sl-footer {
  padding: 60px 32px 40px; background: var(--sl-bg);
  border-top: 1px solid rgba(58,40,32,0.1); text-align: center;
}
.sl-footer-content { max-width: 800px; margin: 0 auto; }
.sl-footer-logo { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.sl-footer-tag {
  font-family: "Inter", serif; font-style: italic;
  font-size: 13px; color: var(--sl-accent-dark); margin: 0 0 32px;
}
.sl-footer-disclaimer {
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.08); border: 1px solid rgba(236,72,153,0.3);
  padding: 14px 20px; border-radius: 4px; margin: 0 0 20px;
  color: rgba(58,40,32,0.85);
}
.sl-footer-disclaimer strong { color: var(--sl-pink); }
.sl-footer-cr { font-size: 11px; color: rgba(58,40,32,0.5); margin: 0; }

/* Floating warning */
.sl-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--sl-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.sl-floating-warning-icon {
  background: #fff; color: var(--sl-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 900px) {
  .sl-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .sl-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0;
    background: var(--sl-bg);
    box-shadow: 0 12px 32px rgba(0,0,0,0.1);
    padding: 0; max-height: 0; overflow: hidden;
    transition: max-height .4s, padding .4s;
  }
  .sl-nav.is-open { max-height: 400px; padding: 16px 0; }
  .sl-nav a { padding: 14px 24px; }
  .sl-burger { display: flex; }
  .sl-book-btn { display: none; }
  .sl-hero { grid-template-columns: 1fr; padding: 40px 24px 80px; min-height: auto; }
  .sl-hero-images {
    position: relative; width: 100%; height: 50vh; min-height: 320px;
    margin-bottom: 32px;
  }
  .sl-hero-img { clip-path: none; }
  .sl-hero-content { padding-right: 0; }
  .sl-hero-pager { left: 24px; bottom: 24px; }
  .sl-concept, .sl-menu, .sl-staff, .sl-access, .sl-style { padding: 80px 24px; }
  .sl-concept-grid, .sl-access-grid { grid-template-columns: 1fr; gap: 40px; }
  .sl-style-grid, .sl-staff-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .sl-menu-row { grid-template-columns: 1fr auto; gap: 8px; }
  .sl-menu-row-dots, .sl-menu-row-desc { display: none; }
  .sl-cta { padding: 80px 24px; }
  .sl-floating-warning { bottom: 12px; left: 12px; font-size: 10px; max-width: 200px; }
  .sl-warning-row { flex-wrap: wrap; }
}
`
