import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS GLASS — 超高層ビル・ガラス建築
   技術: WebGL風 conic-gradient + backdrop-filter + 視差スクロール
   テイスト: ガラス・空・上昇感
   ============================================================ */

export default function BuilderGlassDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onS = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onS, { passive: true })
    return () => window.removeEventListener('scroll', onS)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.gl-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="gl-root" ref={ref}>
      <style>{cssText}</style>

      <div className="gl-warning">
        <div className="gl-warning-row">
          <span className="gl-warning-pill">SAMPLE</span>
          <span className="gl-warning-text">⚠️ <b>POLARIS GLASS</b> は<b className="gl-warning-emph">実在しない仮想のガラス建築会社</b>です。デザイン見本。</span>
          <a href="#hp" className="gl-warning-back">← 戻る</a>
        </div>
        <div className="gl-warning-strip">⚠️ 注意：会社名・住所・電話・施工実績はすべて<u>架空</u>です。</div>
      </div>

      <header className="gl-header">
        <a href="#" className="gl-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="gl-logo-mark" aria-hidden>
            <path d="M20 4 L34 14 L34 30 L20 36 L6 30 L6 14 Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M20 4 V36 M6 14 L34 14" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          </svg>
          <div className="gl-logo-text">
            <strong>POLARIS GLASS</strong>
            <span>ポラリス・グラス（架空）</span>
          </div>
        </a>
        <nav className={`gl-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#vision" onClick={() => setMenuOpen(false)}>VISION</a>
          <a href="#towers" onClick={() => setMenuOpen(false)}>TOWERS</a>
          <a href="#tech" onClick={() => setMenuOpen(false)}>TECHNOLOGY</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>INQUIRY</a>
        </nav>
        <button className="gl-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      <section className="gl-hero">
        <div className="gl-sky"/>
        <div className="gl-aurora gl-aurora-1"/>
        <div className="gl-aurora gl-aurora-2"/>
        <div className="gl-clouds" style={{ transform: `translateY(${scrollY * 0.3}px)` }}/>
        <div className="gl-tower-far" style={{ transform: `translateY(${scrollY * -0.2}px)` }}>
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="gl-hero-badge">※ 架空のデザイン見本</div>
        <div className="gl-hero-content">
          <div className="gl-glass-card gl-reveal">
            <span className="gl-tag">— EST. 2008 / 47 TOWERS BUILT（架空）—</span>
            <h1 className="gl-hero-title">
              <span>SKYLINE</span>
              <span className="gl-italic">redefined.</span>
            </h1>
            <p className="gl-hero-sub">
              超高層ビル・ガラスファサード・カーテンウォール設計施工（架空）。<br/>
              都市の輪郭を、再定義する建築会社。
            </p>
            <div className="gl-hero-btns">
              <a href="#towers" className="gl-btn gl-btn-glass">VIEW PROJECTS →</a>
              <a href="#contact" className="gl-btn gl-btn-outline">CONTACT</a>
            </div>
          </div>
        </div>
        <div className="gl-hero-bottom">
          <div className="gl-bottom-line"/>
          <div className="gl-bottom-stats">
            {[
              { v: '47', l: 'TOWERS' },
              { v: '320m', l: 'TALLEST' },
              { v: '15', l: 'CITIES' },
              { v: '2008', l: 'EST.' },
            ].map((s) => (
              <div key={s.l}><strong>{s.v}</strong><span>{s.l}<small>※架空</small></span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="gl-vision">
        <div className="gl-section-head gl-reveal">
          <span className="gl-eyebrow">— VISION —</span>
          <h2 className="gl-h2"><em>Light, Glass,</em><br/>and the City.</h2>
          <p>都市の上空を、光の彫刻として再構成する。<br/>ガラスとスチール、そして空気を、建築マテリアルとして扱う。<br/><span className="gl-fake">※ 上記は架空のビジョン文です。</span></p>
        </div>
        <div className="gl-vision-grid">
          {[
            { n: '01', t: 'LIGHT', d: '時間とともに表情を変える、光と影の建築。' },
            { n: '02', t: 'TRANSPARENCY', d: '内と外を分けない、視線が通り抜ける構造。' },
            { n: '03', t: 'VERTICALITY', d: '重力を意識させない、上昇する空間。' },
          ].map((v) => (
            <div key={v.n} className="gl-vision-card gl-reveal">
              <div className="gl-vision-n">{v.n}</div>
              <h3>{v.t}<small>※架空</small></h3>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="towers" className="gl-towers">
        <div className="gl-section-head gl-reveal">
          <span className="gl-eyebrow">— TOWERS —</span>
          <h2 className="gl-h2">Built<br/><em>to the sky.</em></h2>
          <p className="gl-fake-pill">※ 以下の施工事例はすべて<b>架空</b>のサンプル表示です。</p>
        </div>
        <div className="gl-towers-list">
          {[
            { id: 'T01', n: 'AURORA TOWER', loc: 'TOKYO · MARUNOUCHI', h: '320m', y: '2024', img: 'photo-1486325212027-8081e485255e' },
            { id: 'T02', n: 'CRYSTAL ONE', loc: 'OSAKA · UMEDA', h: '285m', y: '2023', img: 'photo-1487958449943-2429e8be8625' },
            { id: 'T03', n: 'PRISM TWIN', loc: 'YOKOHAMA · MM21', h: '240m', y: '2023', img: 'photo-1448630360428-65456885c650' },
            { id: 'T04', n: 'SKY CUBE', loc: 'NAGOYA · SAKAE', h: '210m', y: '2022', img: 'photo-1486406146926-c627a92ad1ab' },
          ].map((t) => (
            <article key={t.id} className="gl-tower gl-reveal">
              <div className="gl-tower-img">
                <img src={`https://images.unsplash.com/${t.img}?auto=format&fit=crop&w=1400&q=80`} alt="" />
                <span className="gl-tower-fake">SAMPLE</span>
              </div>
              <div className="gl-tower-info">
                <span className="gl-tower-id">— {t.id}</span>
                <h3>{t.n}<small>※架空</small></h3>
                <dl>
                  <div><dt>LOCATION</dt><dd>{t.loc}（架空）</dd></div>
                  <div><dt>HEIGHT</dt><dd>{t.h}（架空）</dd></div>
                  <div><dt>COMPLETED</dt><dd>{t.y}（架空）</dd></div>
                </dl>
                <a href="#" className="gl-tower-btn">PROJECT DETAILS →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tech" className="gl-tech">
        <div className="gl-section-head gl-reveal">
          <span className="gl-eyebrow">— TECHNOLOGY —</span>
          <h2 className="gl-h2">Engineering<br/><em>the impossible.</em></h2>
        </div>
        <div className="gl-tech-grid">
          {[
            { i: '◇', t: 'Double Skin Facade', d: '二重ガラスファサードによる断熱・遮音性能の最大化（架空）' },
            { i: '◆', t: 'BIPV Glass', d: '発電するガラス。建物自体がエネルギーを生む（架空）' },
            { i: '◈', t: 'Seismic Damper', d: '300mを超える超高層でも揺れを78%削減（架空）' },
            { i: '◇', t: 'Smart Glass', d: 'AI制御で日射・温度・照度を自動調整（架空）' },
          ].map((t) => (
            <div key={t.t} className="gl-tech-card gl-reveal">
              <div className="gl-tech-i">{t.i}</div>
              <h3>{t.t}<small>※架空</small></h3>
              <p>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="gl-cta">
        <div className="gl-cta-bg-aurora"/>
        <div className="gl-cta-inner gl-reveal">
          <div className="gl-glass-card gl-glass-card-large">
            <span className="gl-eyebrow">— INQUIRY —</span>
            <h2 className="gl-cta-h">Build with us,<br/><em>reach the sky.</em></h2>
            <p>超高層・大型再開発・ファサード設計のお問い合わせはこちらから。<br/><span className="gl-fake">※ 動作しません。仮想のガラス建築会社のデザイン見本です。</span></p>
            <div className="gl-cta-btns">
              <a href="#" className="gl-btn gl-btn-fill">PROJECT INQUIRY（仮）</a>
              <a href="#" className="gl-btn gl-btn-outline">DOWNLOAD PORTFOLIO（仮）</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="gl-footer">
        <p className="gl-footer-logo">POLARIS GLASS<em>（架空）</em></p>
        <p className="gl-footer-tag">— SKYLINE redefined. —</p>
        <div className="gl-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS GLASS」という<u>実在しない仮想ガラス建築会社</u>のデザイン見本です。<br/>
          会社名・施工実績・住所・電話はすべて<u>架空</u>です。
        </div>
        <p className="gl-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="gl-floating-warning">
        <span className="gl-floating-warning-icon">!</span>
        <span>このサイトは架空のガラス建築会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.gl-root { --gl-bg: #060d1c; --gl-glass: rgba(255,255,255,0.06); --gl-line: rgba(255,255,255,0.15); --gl-cyan: #7dd3fc; --gl-purple: #a78bfa; --gl-fg: #e8eef7; --gl-pink: #ec4899; background: var(--gl-bg); color: var(--gl-fg); font-family: "Inter", "Helvetica Neue", sans-serif; min-height: 100vh; overflow-x: hidden; }
.gl-root *, .gl-root *::before, .gl-root *::after { box-sizing: border-box; }
.gl-warning { position: sticky; top: 0; z-index: 50; background: #000; color: #fff; border-bottom: 2px solid var(--gl-pink); }
.gl-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.gl-warning-pill { background: var(--gl-pink); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.gl-warning-text { flex: 1; min-width: 0; } .gl-warning-emph { color: var(--gl-pink); }
.gl-warning-back { background: #fff; color: #000; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.gl-warning-strip { background: var(--gl-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.gl-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 16px 28px; background: rgba(6,13,28,0.6); backdrop-filter: blur(20px) saturate(180%); border-bottom: 1px solid var(--gl-line); }
.gl-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--gl-fg); }
.gl-logo-mark { width: 32px; height: 32px; color: var(--gl-cyan); }
.gl-logo-text strong { display: block; font-size: 14px; letter-spacing: 0.2em; font-weight: 800; }
.gl-logo-text span { display: block; font-size: 10px; color: rgba(232,238,247,0.55); }
.gl-nav { display: none; gap: 32px; margin-left: auto; }
.gl-nav a { color: var(--gl-fg); text-decoration: none; font-size: 12px; letter-spacing: 0.25em; font-weight: 600; transition: color .2s; }
.gl-nav a:hover { color: var(--gl-cyan); }
.gl-burger { margin-left: auto; background: var(--gl-glass); border: 1px solid var(--gl-line); width: 40px; height: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; backdrop-filter: blur(8px); }
.gl-burger span { display: block; width: 18px; height: 2px; background: var(--gl-fg); transition: transform .25s; }
.gl-burger span.is-open:first-child { transform: translateY(3.5px) rotate(45deg); }
.gl-burger span.is-open:last-child { transform: translateY(-3.5px) rotate(-45deg); }
@media (min-width: 900px) { .gl-nav { display: flex; } .gl-burger { display: none; } }
.gl-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: rgba(6,13,28,0.92); backdrop-filter: blur(20px); padding: 24px; display: flex; }

.gl-hero { position: relative; min-height: 100vh; padding: 80px 32px 200px; display: flex; align-items: center; overflow: hidden; background: linear-gradient(180deg, #0a1933 0%, #1a3a6e 40%, #4a7fc4 80%, #f0c0a8 100%); }
.gl-sky { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 0%, rgba(167,139,250,0.4), transparent 60%); pointer-events: none; }
.gl-aurora { position: absolute; pointer-events: none; filter: blur(80px); opacity: 0.55; }
.gl-aurora-1 { top: 10%; left: -10%; width: 60%; height: 60%; background: conic-gradient(from 0deg, #7dd3fc, #a78bfa, transparent, #7dd3fc); border-radius: 50%; animation: gl-spin 25s linear infinite; }
.gl-aurora-2 { bottom: 0; right: -10%; width: 55%; height: 55%; background: conic-gradient(from 90deg, #f0abfc, #fb923c, transparent, #f0abfc); border-radius: 50%; animation: gl-spin 30s linear infinite reverse; opacity: 0.4; }
@keyframes gl-spin { to { transform: rotate(360deg); } }
.gl-clouds { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 60%, rgba(255,255,255,0.4), transparent 30%), radial-gradient(ellipse at 80% 40%, rgba(255,255,255,0.3), transparent 35%); pointer-events: none; will-change: transform; }
.gl-tower-far { position: absolute; right: 0; bottom: 0; width: 50%; height: 100%; opacity: 0.5; will-change: transform; }
.gl-tower-far img { width: 100%; height: 100%; object-fit: cover; object-position: top; filter: brightness(0.6) saturate(0.5); mask-image: linear-gradient(to top, transparent, black 30%); }
.gl-hero-badge { position: absolute; top: 24px; right: 24px; background: var(--gl-pink); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 10px; font-weight: 800; z-index: 5; }
.gl-hero-content { position: relative; z-index: 10; max-width: 760px; width: 100%; }

.gl-glass-card { padding: 48px 40px; background: var(--gl-glass); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); border: 1px solid var(--gl-line); border-radius: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15); }
.gl-glass-card-large { padding: 64px 48px; max-width: 760px; margin: 0 auto; }
.gl-tag { display: inline-block; font-size: 11px; letter-spacing: 0.3em; color: var(--gl-cyan); margin-bottom: 24px; font-weight: 600; }
.gl-hero-title { font-size: clamp(48px, 9vw, 124px); font-weight: 200; line-height: 1; letter-spacing: -0.04em; margin: 0 0 28px; }
.gl-hero-title span { display: block; opacity: 0; transform: translateY(40px); animation: gl-rise 1.2s cubic-bezier(.2,.7,.2,1) forwards; }
.gl-hero-title span:nth-child(2) { animation-delay: .25s; padding-left: clamp(40px, 10vw, 120px); }
.gl-italic { font-style: italic; font-weight: 300; background: linear-gradient(90deg, var(--gl-cyan), var(--gl-purple)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-family: "Times New Roman", serif; }
.gl-hero-sub { font-size: clamp(14px, 1.5vw, 17px); line-height: 1.9; color: rgba(232,238,247,0.85); margin: 0 0 32px; }
.gl-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.gl-btn { display: inline-flex; align-items: center; padding: 14px 28px; font-weight: 700; font-size: 12px; letter-spacing: 0.2em; text-decoration: none; transition: all .25s; border-radius: 999px; }
.gl-btn-glass { background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.3); color: var(--gl-fg); }
.gl-btn-glass:hover { background: rgba(255,255,255,0.25); }
.gl-btn-outline { color: var(--gl-fg); border: 1px solid var(--gl-line); }
.gl-btn-outline:hover { background: var(--gl-glass); }
.gl-btn-fill { background: linear-gradient(90deg, var(--gl-cyan), var(--gl-purple)); color: #0a1933; }
.gl-btn-fill:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(125,211,252,0.4); }

.gl-hero-bottom { position: absolute; left: 0; right: 0; bottom: 0; z-index: 10; padding: 32px 32px 24px; background: rgba(6,13,28,0.5); backdrop-filter: blur(20px); border-top: 1px solid var(--gl-line); }
.gl-bottom-line { display: none; }
.gl-bottom-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
.gl-bottom-stats > div { text-align: center; }
.gl-bottom-stats strong { display: block; font-size: clamp(28px, 4vw, 48px); font-weight: 200; color: var(--gl-cyan); line-height: 1; letter-spacing: -0.02em; font-family: "Times New Roman", serif; }
.gl-bottom-stats span { display: block; font-size: 10px; letter-spacing: 0.2em; color: rgba(232,238,247,0.6); margin-top: 8px; font-weight: 600; }
.gl-bottom-stats span small { font-size: 9px; color: var(--gl-pink); margin-left: 4px; font-weight: 500; letter-spacing: 0.1em; }

.gl-vision, .gl-towers, .gl-tech, .gl-cta { padding: 120px 32px; position: relative; }
.gl-vision { background: linear-gradient(180deg, var(--gl-bg) 0%, #0a1933 100%); }
.gl-section-head { text-align: center; max-width: 820px; margin: 0 auto 64px; }
.gl-eyebrow { display: inline-block; font-size: 11px; letter-spacing: 0.35em; color: var(--gl-cyan); margin-bottom: 16px; font-weight: 600; }
.gl-h2 { font-size: clamp(36px, 6vw, 84px); font-weight: 200; line-height: 1.05; letter-spacing: -0.03em; margin: 0; color: var(--gl-fg); }
.gl-h2 em { font-style: italic; font-weight: 300; font-family: "Times New Roman", serif; background: linear-gradient(90deg, var(--gl-cyan), var(--gl-purple)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.gl-section-head p { font-size: 14px; line-height: 1.9; color: rgba(232,238,247,0.7); margin: 24px 0 0; }
.gl-fake { color: var(--gl-pink); font-weight: 700; }
.gl-fake-pill { display: inline-block; padding: 5px 16px; background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4); color: var(--gl-pink); border-radius: 999px; font-size: 11px; font-weight: 700; margin-top: 16px; }
.gl-fake-pill b { color: var(--gl-pink); }

.gl-vision-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.gl-vision-card { padding: 40px 32px; background: var(--gl-glass); backdrop-filter: blur(20px); border: 1px solid var(--gl-line); border-radius: 20px; transition: all .3s; }
.gl-vision-card:hover { border-color: var(--gl-cyan); transform: translateY(-4px); }
.gl-vision-n { font-family: "Times New Roman", serif; font-size: 64px; font-style: italic; font-weight: 200; color: var(--gl-cyan); line-height: 1; margin-bottom: 24px; }
.gl-vision-card h3 { font-size: 22px; font-weight: 400; margin: 0 0 16px; letter-spacing: 0.05em; }
.gl-vision-card h3 small { font-size: 10px; color: var(--gl-pink); margin-left: 6px; font-weight: 500; letter-spacing: 0; }
.gl-vision-card p { font-size: 13px; line-height: 1.9; color: rgba(232,238,247,0.7); margin: 0; }

.gl-towers { background: linear-gradient(180deg, #0a1933 0%, var(--gl-bg) 100%); }
.gl-towers-list { display: grid; gap: 80px; max-width: 1280px; margin: 0 auto; }
.gl-tower { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.gl-tower:nth-child(even) { direction: rtl; }
.gl-tower:nth-child(even) > * { direction: ltr; }
@media (max-width: 800px) { .gl-tower, .gl-tower:nth-child(even) { grid-template-columns: 1fr; gap: 32px; direction: ltr; } }
.gl-tower-img { position: relative; aspect-ratio: 3/4; overflow: hidden; border-radius: 16px; border: 1px solid var(--gl-line); }
.gl-tower-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85) contrast(1.1); transition: transform 1s; }
.gl-tower:hover .gl-tower-img img { transform: scale(1.04); }
.gl-tower-fake { position: absolute; top: 12px; right: 12px; background: var(--gl-pink); color: #fff; padding: 4px 10px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; border-radius: 4px; }
.gl-tower-id { font-family: monospace; font-size: 12px; color: var(--gl-cyan); letter-spacing: 0.3em; }
.gl-tower-info h3 { font-size: clamp(32px, 4vw, 56px); font-weight: 200; margin: 8px 0 28px; letter-spacing: -0.02em; }
.gl-tower-info h3 small { font-size: 11px; color: var(--gl-pink); margin-left: 8px; font-weight: 500; letter-spacing: 0; }
.gl-tower-info dl { margin: 0 0 28px; }
.gl-tower-info dl > div { display: grid; grid-template-columns: 120px 1fr; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--gl-line); }
.gl-tower-info dt { font-size: 11px; letter-spacing: 0.2em; color: var(--gl-cyan); font-weight: 600; }
.gl-tower-info dd { margin: 0; font-size: 14px; color: var(--gl-fg); }
.gl-tower-btn { font-size: 12px; letter-spacing: 0.25em; color: var(--gl-cyan); text-decoration: none; font-weight: 700; padding-bottom: 4px; border-bottom: 1px solid var(--gl-cyan); }

.gl-tech { background: var(--gl-bg); }
.gl-tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; max-width: 1280px; margin: 0 auto; }
.gl-tech-card { padding: 36px 28px; background: var(--gl-glass); backdrop-filter: blur(16px); border: 1px solid var(--gl-line); border-radius: 16px; transition: all .3s; }
.gl-tech-card:hover { border-color: var(--gl-cyan); }
.gl-tech-i { font-size: 32px; color: var(--gl-cyan); margin-bottom: 16px; }
.gl-tech-card h3 { font-size: 18px; font-weight: 400; margin: 0 0 12px; }
.gl-tech-card h3 small { font-size: 10px; color: var(--gl-pink); margin-left: 6px; font-weight: 500; }
.gl-tech-card p { font-size: 13px; line-height: 1.8; color: rgba(232,238,247,0.7); margin: 0; }

.gl-cta { background: linear-gradient(180deg, var(--gl-bg) 0%, #1a3a6e 100%); position: relative; overflow: hidden; }
.gl-cta-bg-aurora { position: absolute; inset: 0; background: conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(125,211,252,0.15) 90deg, rgba(167,139,250,0.15) 180deg, transparent 360deg); filter: blur(80px); animation: gl-spin 40s linear infinite; pointer-events: none; }
.gl-cta-inner { position: relative; max-width: 900px; margin: 0 auto; }
.gl-cta-h { font-size: clamp(40px, 7vw, 88px); font-weight: 200; line-height: 1.1; letter-spacing: -0.03em; margin: 24px 0; }
.gl-cta-h em { font-style: italic; font-weight: 300; font-family: "Times New Roman", serif; background: linear-gradient(90deg, var(--gl-cyan), var(--gl-purple)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.gl-cta p { font-size: 15px; line-height: 1.9; color: rgba(232,238,247,0.8); margin: 0 0 32px; }
.gl-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }

.gl-footer { padding: 64px 32px 32px; background: #02060f; text-align: center; }
.gl-footer-logo { font-size: 18px; letter-spacing: 0.2em; font-weight: 800; margin: 0 0 8px; }
.gl-footer-logo em { font-size: 11px; color: rgba(232,238,247,0.5); margin-left: 8px; font-style: normal; font-weight: 400; }
.gl-footer-tag { font-size: 13px; color: var(--gl-cyan); font-style: italic; margin: 0 0 28px; font-family: "Times New Roman", serif; }
.gl-footer-disclaimer { max-width: 720px; margin: 0 auto 24px; padding: 16px; background: rgba(236,72,153,0.12); border: 1px solid var(--gl-pink); color: rgba(232,238,247,0.85); font-size: 12px; line-height: 1.8; border-radius: 8px; }
.gl-footer-disclaimer strong { color: var(--gl-pink); }
.gl-footer-cr { font-size: 11px; color: rgba(232,238,247,0.35); }

.gl-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--gl-pink); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(236,72,153,0.4); max-width: 260px; }
.gl-floating-warning-icon { background: #fff; color: var(--gl-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.gl-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1); }
.gl-reveal.is-visible { opacity: 1; transform: translateY(0); }
@keyframes gl-rise { to { opacity: 1; transform: translateY(0); } }
`
