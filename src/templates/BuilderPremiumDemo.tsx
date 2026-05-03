import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS BUILDER — 工務店テンプレート
   技術: CSS clip-path マスクリビール
        + scroll-driven horizontal pinning (JSで実装)
        + 大判ヒーロー画像 + Ken Burns
        + マグネティックホバー
   テイスト: 重厚・素材感・建築誌風
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
  hero2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
  work1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85',
  work2: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85',
  work3: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85',
  work4: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  work5: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1600&q=85',
  process1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
  process2: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85',
  process3: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=1200&q=85',
  detail: 'https://images.unsplash.com/photo-1600210492493-0946911123c4?auto=format&fit=crop&w=1800&q=85',
}

export default function BuilderPremiumDemo() {
  const horizontalRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  /* IntersectionObserver でリビール */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.bd-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* 横スクロール pinning */
  useEffect(() => {
    const sec = horizontalRef.current
    const track = trackRef.current
    if (!sec || !track) return
    const onScroll = () => {
      const r = sec.getBoundingClientRect()
      const max = sec.offsetHeight - window.innerHeight
      if (max <= 0) return
      const p = Math.min(Math.max(-r.top / max, 0), 1)
      const trackW = track.scrollWidth
      const visW = sec.offsetWidth
      const moveX = (trackW - visW) * p
      track.style.transform = `translateX(${-moveX}px)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="bd-root">
      <style>{cssText}</style>

      {/* 警告 */}
      <div className="bd-warning">
        <div className="bd-warning-row">
          <span className="bd-warning-pill">SAMPLE</span>
          <span className="bd-warning-text">
            ⚠️ <b>POLARIS BUILDER</b> は<b className="bd-warning-emph">実在しない仮想工務店</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="bd-warning-back">← 戻る</a>
        </div>
        <div className="bd-warning-strip">
          ⚠️ 注意：会社名・住所・電話番号・施工事例・お客様の声などは<u>すべて架空</u>です。
        </div>
      </div>

      {/* Header */}
      <header className="bd-header">
        <a href="#" className="bd-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="bd-logo-mark" aria-hidden>
            <path d="M5 35 L5 15 L20 5 L35 15 L35 35 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M14 35 L14 22 L26 22 L26 35" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <div className="bd-logo-text">
            <strong>POLARIS BUILDER</strong>
            <span>ポラリス工務店（架空）</span>
          </div>
        </a>
        <nav className={`bd-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#works" onClick={() => setMenuOpen(false)}>WORKS</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>STORY</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>PROCESS</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <button className="bd-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="bd-cta-btn">資料請求（仮）</a>
      </header>

      {/* Hero */}
      <section className="bd-hero">
        <div className="bd-hero-bg" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
        <div className="bd-hero-overlay"/>
        <div className="bd-hero-grain"/>
        <div className="bd-hero-watermark">SAMPLE&nbsp;/&nbsp;仮想</div>

        <div className="bd-hero-content">
          <span className="bd-hero-eyebrow">— Architecture &amp; Craft Since 1965（架空）—</span>
          <h1 className="bd-hero-title">
            <span className="bd-mask-line"><i>ふるさとを、</i></span>
            <span className="bd-mask-line"><i>住み継ぐ家へ。</i></span>
          </h1>
          <p className="bd-hero-sub">
            ※架空工務店｜注文住宅・古民家再生・店舗デザイン<br/>
            木と土と石と。<u>素材の声を、丁寧に聴く家づくり</u>を。
          </p>
        </div>

        <div className="bd-hero-meta">
          <div><strong>1965</strong><span>FOUNDED（架空）</span></div>
          <div><strong>320+</strong><span>WORKS（架空）</span></div>
          <div><strong>4</strong><span>OFFICE（架空）</span></div>
        </div>

        <div className="bd-hero-scroll">
          <span>SCROLL</span>
          <div className="bd-hero-scroll-line"/>
        </div>

        <div className="bd-hero-badge">※ これは架空のデザイン見本です</div>
      </section>

      {/* Story */}
      <section id="story" className="bd-story">
        <div className="bd-story-grid">
          <div className="bd-story-text bd-reveal">
            <span className="bd-eyebrow">— Story —</span>
            <h2 className="bd-h2">
              土地と<br/>
              <em>向き合う、</em><br/>
              家づくり。
            </h2>
            <p className="bd-story-body">
              POLARIS BUILDER は、<u>その土地の風土に合った素材と工法</u>で、
              50年・100年と住み継がれる家を建ててきました。
              木、土、石、漆喰、和紙——日本の風土が育んだ素材を、
              現代の暮らしに馴染むかたちで。<br/>
              <span className="bd-fake">※ このページは仮想工務店のデザイン見本です。</span>
            </p>
            <a href="#" className="bd-link">More about us ↗</a>
          </div>
          <div className="bd-story-img-1 bd-reveal">
            <img src={IMG.process1} alt="" loading="lazy"/>
            <div className="bd-img-stamp">SAMPLE</div>
          </div>
          <div className="bd-story-img-2 bd-reveal">
            <img src={IMG.detail} alt="" loading="lazy"/>
            <div className="bd-img-stamp">SAMPLE</div>
          </div>
        </div>
      </section>

      {/* Horizontal Works (pin scroll) */}
      <section id="works" ref={horizontalRef} className="bd-h-section">
        <div className="bd-h-pin">
          <div className="bd-h-head">
            <span className="bd-eyebrow">— Works (Sample) —</span>
            <h2 className="bd-h-mega">WORKS</h2>
            <p className="bd-fake-pill">※ 施工事例はすべて架空のサンプル表示です</p>
          </div>
          <div ref={trackRef} className="bd-h-track">
            {[
              { num: '01', name: '木と漆喰の家（架空）', loc: '長野県・松本市', img: IMG.work1, year: '2024' },
              { num: '02', name: '古民家再生プロジェクト（架空）', loc: '京都府・南丹市', img: IMG.work2, year: '2023' },
              { num: '03', name: '土間のあるカフェ（架空）', loc: '岐阜県・高山市', img: IMG.work3, year: '2023' },
              { num: '04', name: '景色を抱く山荘（架空）', loc: '北海道・ニセコ町', img: IMG.work4, year: '2022' },
              { num: '05', name: '蔵を活かした店舗（架空）', loc: '埼玉県・川越市', img: IMG.work5, year: '2022' },
            ].map((w) => (
              <article key={w.num} className="bd-work-card">
                <div className="bd-work-card-img" style={{ backgroundImage: `url("${w.img}")` }}>
                  <div className="bd-work-card-stamp">SAMPLE</div>
                </div>
                <div className="bd-work-card-info">
                  <div className="bd-work-card-num">{w.num} / {w.year}</div>
                  <h3>{w.name}</h3>
                  <p className="bd-work-card-loc">{w.loc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="bd-h-progress">
            <div className="bd-h-progress-bar"/>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bd-process">
        <div className="bd-process-head bd-reveal">
          <span className="bd-eyebrow">— Process —</span>
          <h2 className="bd-h2">家づくりの<br/>歩み方。</h2>
          <p className="bd-fake-pill">※ プロセスは架空のサンプル表示です</p>
        </div>
        <div className="bd-process-list">
          {[
            { num: '01', t: 'お問い合わせ・初回相談', d: '土地・予算・暮らしの理想をじっくり伺います。', img: IMG.process1 },
            { num: '02', t: 'プランニング・お見積り', d: '土地の特性に合わせた、世界に1つの提案を。', img: IMG.process2 },
            { num: '03', t: '契約・着工', d: '熟練の職人による、確かな施工を。', img: IMG.process3 },
            { num: '04', t: '完成・お引き渡し', d: 'お引き渡し後も、長く寄り添う関係を。', img: IMG.detail },
          ].map((p, i) => (
            <div key={p.num} className={`bd-process-row bd-reveal ${i % 2 ? 'bd-process-row-rev' : ''}`}>
              <div className="bd-process-img" style={{ backgroundImage: `url("${p.img}")` }}>
                <div className="bd-img-stamp">SAMPLE</div>
              </div>
              <div className="bd-process-text">
                <span className="bd-process-num">{p.num}</span>
                <h3>{p.t}<small>（架空）</small></h3>
                <p>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bd-quote bd-reveal">
        <p>
          「100年先まで、<br/>
          住み継がれる家を。」
        </p>
        <span className="bd-fake">※ 架空のキャッチコピーです</span>
      </section>

      {/* Contact */}
      <section id="contact" className="bd-contact">
        <div className="bd-contact-grid">
          <div className="bd-contact-text bd-reveal">
            <span className="bd-eyebrow">— Contact —</span>
            <h2 className="bd-h2">
              家づくりの<br/>
              <em>はじめの一歩を。</em>
            </h2>
            <p className="bd-contact-sub">
              資料請求・施工事例集・モデルハウス見学のご予約はこちらから。<br/>
              <span className="bd-fake">※ 動作しません。仮想工務店のデザイン見本です。</span>
            </p>
            <div className="bd-contact-btns">
              <a href="#" className="bd-btn bd-btn-fill">資料請求（仮）</a>
              <a href="#" className="bd-btn bd-btn-ghost">施工事例集（仮）</a>
            </div>
          </div>
          <div className="bd-contact-info bd-reveal">
            <dl>
              <dt>住所（架空）</dt>
              <dd>〒000-0000 〇〇県〇〇市〇〇 0-0-0（実在しません）</dd>
              <dt>電話（架空）</dt>
              <dd>0000-00-0000</dd>
              <dt>営業時間（架空）</dt>
              <dd>9:00 - 18:00 / 水曜定休</dd>
              <dt>対応エリア（架空）</dt>
              <dd>〇〇県全域・隣接県の一部</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bd-footer">
        <div className="bd-footer-bg" style={{ backgroundImage: `url("${IMG.hero2}")` }}/>
        <div className="bd-footer-overlay"/>
        <div className="bd-footer-content">
          <h2 className="bd-footer-mega">POLARIS<br/>BUILDER</h2>
          <p className="bd-footer-tag">— Architecture &amp; Craft —</p>
          <div className="bd-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS BUILDER」という<u>実在しない仮想工務店</u>のデザイン見本です。<br/>
            会社名・住所・電話番号・施工事例・お客様の声・実績数値などはすべて<u>架空</u>です。
          </div>
          <p className="bd-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="bd-floating-warning">
        <span className="bd-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想工務店です</span>
      </div>
    </div>
  )
}

const cssText = `
.bd-root {
  --bd-bg: #f3f1ec;
  --bd-bg-dark: #1f1d18;
  --bd-fg: #2e3a2c;
  --bd-fg-soft: rgba(46, 58, 44, 0.7);
  --bd-accent: #7a8c5e;
  --bd-accent-dark: #5e6e44;
  --bd-pink: #ec4899;
  background: var(--bd-bg);
  color: var(--bd-fg);
  font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif;
  position: relative;
  overflow-x: hidden;
}
.bd-root *, .bd-root *::before, .bd-root *::after { box-sizing: border-box; }

/* Warning */
.bd-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--bd-pink);
  font-family: "Noto Sans JP", sans-serif;
}
.bd-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.bd-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.bd-warning-text { flex: 1; min-width: 0; }
.bd-warning-emph { color: var(--bd-pink); }
.bd-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.bd-warning-back:hover { background: var(--bd-pink); color: #fff; }
.bd-warning-strip {
  background: var(--bd-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Header */
.bd-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 20px 40px;
  background: rgba(243, 241, 236, 0.92);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(46, 58, 44, 0.08);
  font-family: "Noto Sans JP", sans-serif;
}
.bd-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--bd-fg); }
.bd-logo-mark { width: 36px; height: 36px; color: var(--bd-accent-dark); }
.bd-logo-text strong {
  display: block; font-family: "Inter", sans-serif; font-size: 14px; font-weight: 800;
  letter-spacing: 0.05em; line-height: 1.2;
}
.bd-logo-text span { display: block; font-size: 10px; color: var(--bd-fg-soft); margin-top: 2px; }
.bd-nav {
  display: flex; gap: 32px; margin-left: auto;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.15em;
}
.bd-nav a {
  color: var(--bd-fg); text-decoration: none; padding: 8px 0;
  position: relative; transition: color .3s;
}
.bd-nav a::after {
  content: ''; position: absolute; left: 0; right: 100%; bottom: 0;
  height: 1px; background: var(--bd-accent-dark); transition: right .3s;
}
.bd-nav a:hover { color: var(--bd-accent-dark); }
.bd-nav a:hover::after { right: 0; }

.bd-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.bd-burger span {
  width: 22px; height: 2px; background: var(--bd-fg); transition: all .3s;
}
.bd-burger span.is-open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
.bd-burger span.is-open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

.bd-cta-btn {
  background: var(--bd-fg); color: var(--bd-bg);
  padding: 12px 22px; border-radius: 0;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.15em; text-decoration: none;
  transition: all .3s;
}
.bd-cta-btn:hover { background: var(--bd-accent-dark); }

/* Hero */
.bd-hero {
  position: relative; min-height: 100vh; overflow: hidden;
  display: grid; align-items: end;
  padding: 80px 64px 100px;
}
.bd-hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  animation: bd-kenburn 20s ease-in-out infinite alternate;
}
@keyframes bd-kenburn {
  from { transform: scale(1) translate(0,0); }
  to { transform: scale(1.1) translate(-2%, -2%); }
}
.bd-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(31,29,24,0.3) 0%, rgba(31,29,24,0.4) 50%, rgba(31,29,24,0.85) 100%);
}
.bd-hero-grain {
  position: absolute; inset: 0; opacity: 0.2; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
.bd-hero-watermark {
  position: absolute; left: 50%; top: 30%; transform: translate(-50%, -50%);
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 12vw;
  color: rgba(255,255,255,0.06); letter-spacing: 0.3em;
  white-space: nowrap; pointer-events: none; z-index: 1;
}
.bd-hero-content { position: relative; z-index: 2; max-width: 1280px; color: #fff; }
.bd-hero-eyebrow {
  display: block; font-family: "Inter", serif; font-style: italic;
  font-size: 14px; letter-spacing: 0.2em; color: rgba(255,255,255,0.85);
  margin-bottom: 24px;
}
.bd-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(48px, 8vw, 140px); line-height: 1.1;
  margin: 0 0 32px; letter-spacing: -0.02em; color: #fff;
}
.bd-mask-line {
  display: block; overflow: hidden;
}
.bd-mask-line i {
  display: block; font-style: normal;
  animation: bd-rise 1.4s cubic-bezier(.7,0,.3,1) both;
}
.bd-mask-line:nth-child(2) i { animation-delay: .25s; }
@keyframes bd-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
.bd-hero-sub {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 14px; line-height: 2; color: rgba(255,255,255,0.85); margin: 0 0 32px;
  max-width: 600px;
}
.bd-hero-meta {
  position: absolute; right: 64px; bottom: 100px; z-index: 2; color: #fff;
  display: flex; gap: 40px; font-family: "Inter", sans-serif;
}
.bd-hero-meta strong {
  display: block; font-size: 36px; font-weight: 900; line-height: 1;
}
.bd-hero-meta span {
  display: block; font-size: 10px; letter-spacing: 0.15em; margin-top: 6px;
  color: rgba(255,255,255,0.65);
}
.bd-hero-scroll {
  position: absolute; left: 64px; bottom: 32px; z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.3em;
  color: rgba(255,255,255,0.7); writing-mode: vertical-rl;
}
.bd-hero-scroll span { writing-mode: horizontal-tb; }
.bd-hero-scroll-line {
  width: 1px; height: 60px; background: rgba(255,255,255,0.4); position: relative; overflow: hidden;
}
.bd-hero-scroll-line::after {
  content: ''; position: absolute; top: -30px; left: 0; width: 100%; height: 30px;
  background: #fff; animation: bd-scroll-line 2s ease-in-out infinite;
}
@keyframes bd-scroll-line {
  0% { top: -30px; } 100% { top: 60px; }
}
.bd-hero-badge {
  position: absolute; top: 24px; right: 24px; z-index: 4;
  background: var(--bd-pink); color: #fff;
  font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}

/* Common */
.bd-eyebrow {
  font-family: "Inter", serif; font-style: italic;
  font-size: 13px; letter-spacing: 0.2em; color: var(--bd-accent-dark);
}
.bd-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(40px, 5vw, 84px); line-height: 1.2;
  margin: 12px 0 32px; letter-spacing: -0.02em;
}
.bd-h2 em { font-style: normal; color: var(--bd-accent-dark); }
.bd-h-mega {
  font-family: "Inter", serif; font-weight: 900;
  font-size: clamp(80px, 12vw, 200px); line-height: 1;
  margin: 12px 0 24px; letter-spacing: -0.04em;
  color: var(--bd-fg);
}
.bd-fake { font-size: 11px; color: var(--bd-pink); font-weight: 700; font-family: "Noto Sans JP", sans-serif; }
.bd-fake-pill {
  display: inline-block; padding: 5px 14px;
  background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4);
  color: var(--bd-pink); border-radius: 999px;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 11px; font-weight: 700; margin: 4px 0 0;
}
.bd-img-stamp {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 3px; letter-spacing: 0.15em;
}

/* Reveal */
.bd-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s ease, transform 1s ease; }
.bd-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Story */
.bd-story { padding: 160px 64px; max-width: 1400px; margin: 0 auto; }
.bd-story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 60px 80px;
}
.bd-story-text { grid-column: 1; grid-row: 1 / span 2; padding-top: 60px; }
.bd-story-body {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 14px; line-height: 2.2; color: var(--bd-fg-soft); margin: 0 0 32px;
}
.bd-link {
  font-family: "Inter", sans-serif; font-size: 12px; letter-spacing: 0.15em;
  color: var(--bd-fg); text-decoration: none; padding-bottom: 4px;
  border-bottom: 1px solid var(--bd-fg); transition: color .3s, border-color .3s;
}
.bd-link:hover { color: var(--bd-accent-dark); border-color: var(--bd-accent-dark); }
.bd-story-img-1 {
  grid-column: 2; grid-row: 1; aspect-ratio: 4/5; overflow: hidden;
  position: relative; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.bd-story-img-2 {
  grid-column: 2; grid-row: 2; aspect-ratio: 5/4; overflow: hidden;
  position: relative; margin-left: -120px; margin-top: -80px; z-index: 2;
}
.bd-story-img-1 img, .bd-story-img-2 img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 1.4s ease;
}
.bd-story-img-1:hover img, .bd-story-img-2:hover img { transform: scale(1.04); }

/* Horizontal section */
.bd-h-section {
  position: relative; height: 380vh;
  background: var(--bd-bg-dark); color: #fff;
}
.bd-h-pin {
  position: sticky; top: 0; height: 100vh; overflow: hidden;
  display: flex; flex-direction: column;
}
.bd-h-head {
  padding: 60px 64px 40px;
  flex-shrink: 0;
}
.bd-h-head .bd-h-mega { color: #fff; }
.bd-h-track {
  display: flex; gap: 32px; padding: 0 64px;
  flex: 1; align-items: center;
  will-change: transform;
}
.bd-work-card {
  flex: 0 0 70vh; max-width: 560px; min-width: 320px;
}
.bd-work-card-img {
  position: relative; aspect-ratio: 4/3;
  background-size: cover; background-position: center;
  border-radius: 0;
  overflow: hidden;
  transition: transform .6s;
}
.bd-work-card:hover .bd-work-card-img { transform: scale(1.02); }
.bd-work-card-stamp {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 3px; letter-spacing: 0.15em;
}
.bd-work-card-info { padding: 20px 0; }
.bd-work-card-num {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: rgba(255,255,255,0.6); margin-bottom: 8px;
}
.bd-work-card-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 700;
  margin: 0 0 6px; color: #fff;
}
.bd-work-card-loc {
  font-family: "Noto Sans JP", sans-serif; font-size: 12px;
  color: rgba(255,255,255,0.7); margin: 0;
}
.bd-h-progress {
  position: absolute; left: 64px; bottom: 40px; right: 64px;
  height: 1px; background: rgba(255,255,255,0.15);
}
.bd-h-progress-bar {
  height: 100%; background: var(--bd-accent);
  width: 20%;
}

/* Process */
.bd-process { padding: 160px 64px; max-width: 1280px; margin: 0 auto; }
.bd-process-head { text-align: center; max-width: 700px; margin: 0 auto 80px; }
.bd-process-list { display: flex; flex-direction: column; gap: 80px; }
.bd-process-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
.bd-process-row-rev { grid-template-columns: 1fr 1fr; direction: rtl; }
.bd-process-row-rev > * { direction: ltr; }
.bd-process-img {
  position: relative; aspect-ratio: 4/3; background-size: cover; background-position: center;
  overflow: hidden;
}
.bd-process-num {
  display: block; font-family: "Inter", serif; font-weight: 900;
  font-size: 80px; line-height: 1; color: var(--bd-accent);
  margin-bottom: 16px;
}
.bd-process-text h3 {
  font-family: "Noto Serif JP", serif; font-size: 32px; font-weight: 700;
  margin: 0 0 16px;
}
.bd-process-text h3 small { font-size: 12px; color: var(--bd-pink); font-weight: 600; }
.bd-process-text p {
  font-family: "Noto Sans JP", sans-serif; font-size: 14px;
  line-height: 1.9; color: var(--bd-fg-soft); margin: 0;
}

/* Quote */
.bd-quote {
  padding: 160px 32px; text-align: center;
  background: var(--bd-fg); color: var(--bd-bg);
}
.bd-quote p {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(32px, 5vw, 80px); line-height: 1.5; margin: 0 0 16px;
  letter-spacing: -0.01em;
}

/* Contact */
.bd-contact { padding: 160px 64px; max-width: 1280px; margin: 0 auto; }
.bd-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.bd-contact-sub {
  font-family: "Noto Sans JP", sans-serif; font-size: 14px; line-height: 1.9;
  color: var(--bd-fg-soft); margin: 0 0 32px;
}
.bd-contact-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.bd-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 28px; border-radius: 0;
  font-family: "Inter", "Noto Sans JP", sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.15em;
  text-decoration: none; cursor: pointer; border: 1px solid transparent;
  transition: all .3s ease;
}
.bd-btn-fill { background: var(--bd-fg); color: var(--bd-bg); }
.bd-btn-fill:hover { background: var(--bd-accent-dark); }
.bd-btn-ghost { background: transparent; color: var(--bd-fg); border-color: var(--bd-fg); }
.bd-btn-ghost:hover { background: var(--bd-fg); color: var(--bd-bg); }

.bd-contact-info dl {
  display: grid; grid-template-columns: 110px 1fr; gap: 16px 24px;
  font-family: "Noto Sans JP", sans-serif; margin: 80px 0 0;
}
.bd-contact-info dt {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.15em;
  color: var(--bd-accent-dark); text-transform: uppercase; padding-top: 4px;
}
.bd-contact-info dd { margin: 0; font-size: 14px; line-height: 1.7; }

/* Footer */
.bd-footer {
  position: relative; padding: 160px 32px 60px; min-height: 600px; color: #fff;
  text-align: center; overflow: hidden;
}
.bd-footer-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.4) saturate(0.8);
}
.bd-footer-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(31,29,24,0.6) 0%, rgba(31,29,24,0.95) 100%);
}
.bd-footer-content { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; }
.bd-footer-mega {
  font-family: "Inter", serif; font-weight: 900;
  font-size: clamp(56px, 9vw, 140px); line-height: 0.95;
  margin: 0 0 16px; letter-spacing: -0.03em; color: #fff;
}
.bd-footer-tag {
  font-family: "Inter", serif; font-style: italic;
  font-size: 14px; letter-spacing: 0.2em; color: rgba(255,255,255,0.7);
  margin: 0 0 40px;
}
.bd-footer-disclaimer {
  font-family: "Noto Sans JP", sans-serif; font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4);
  padding: 16px 22px; border-radius: 4px; margin: 0 auto 24px; max-width: 720px;
}
.bd-footer-disclaimer strong { color: var(--bd-pink); }
.bd-footer-cr {
  font-family: "Inter", sans-serif; font-size: 11px;
  color: rgba(255,255,255,0.5); margin: 0;
}

/* Floating warning */
.bd-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--bd-pink); color: #fff;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.bd-floating-warning-icon {
  background: #fff; color: var(--bd-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 900px) {
  .bd-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .bd-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--bd-bg);
    box-shadow: 0 12px 32px rgba(0,0,0,0.1);
    padding: 0; max-height: 0; overflow: hidden;
    transition: max-height .4s, padding .4s;
  }
  .bd-nav.is-open { max-height: 400px; padding: 16px 0; }
  .bd-nav a { padding: 14px 24px; }
  .bd-burger { display: flex; }
  .bd-cta-btn { display: none; }
  .bd-hero { padding: 60px 24px 80px; }
  .bd-hero-meta { right: 24px; bottom: 80px; gap: 20px; }
  .bd-hero-meta strong { font-size: 24px; }
  .bd-hero-scroll { left: 24px; bottom: 20px; }
  .bd-story { padding: 80px 24px; }
  .bd-story-grid { grid-template-columns: 1fr; }
  .bd-story-text { grid-column: 1; grid-row: 1; padding-top: 0; }
  .bd-story-img-1 { grid-column: 1; grid-row: 2; }
  .bd-story-img-2 { grid-column: 1; grid-row: 3; margin: 0; }
  .bd-h-section { height: auto; }
  .bd-h-pin {
    position: relative; top: auto; height: auto;
    padding-bottom: 60px;
  }
  .bd-h-head { padding: 60px 24px 40px; }
  .bd-h-track {
    transform: none !important;
    padding: 0 24px; overflow-x: auto; scroll-snap-type: x mandatory;
  }
  .bd-work-card { flex: 0 0 80%; scroll-snap-align: start; }
  .bd-h-progress { display: none; }
  .bd-process, .bd-contact { padding: 80px 24px; }
  .bd-process-row, .bd-process-row-rev { grid-template-columns: 1fr; gap: 24px; direction: ltr; }
  .bd-quote { padding: 80px 24px; }
  .bd-contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .bd-contact-info dl { margin-top: 0; }
  .bd-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .bd-warning-row { flex-wrap: wrap; }
}
`
