import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS WOOD WORKS — 木造SDGs・サステナブル
   木目×グリーン / scroll-timeline / SVGメーター
   ============================================================ */

export default function BuilderWoodDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.wd-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="wd-root">
      <style>{cssText}</style>

      <div className="wd-warning">
        <div className="wd-warning-row">
          <span className="wd-warning-pill">SAMPLE</span>
          <span className="wd-warning-text">⚠️ <b>POLARIS WOOD WORKS</b> は<b className="wd-warning-emph">実在しない仮想木造建設会社</b>です。ポラリスクリエイティブ作成のデザイン見本。</span>
          <a href="#hp" className="wd-warning-back">← 戻る</a>
        </div>
        <div className="wd-warning-strip">⚠️ 注意：会社名・住所・電話・施工事例・環境数値はすべて<u>架空</u>です。</div>
      </div>

      <header className="wd-header">
        <a href="#" className="wd-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="wd-logo-mark" aria-hidden>
            <path d="M20 5 C 12 12, 12 22, 20 35 C 28 22, 28 12, 20 5 Z" fill="currentColor"/>
            <path d="M20 12 V32 M16 18 L20 22 M24 18 L20 22" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
          <div className="wd-logo-text">
            <strong>POLARIS WOOD WORKS</strong>
            <span>ポラリス木工房（架空）</span>
          </div>
        </a>
        <nav className={`wd-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#why" onClick={() => setMenuOpen(false)}>なぜ木造</a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>環境への約束</a>
          <a href="#houses" onClick={() => setMenuOpen(false)}>家づくり</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>お問合せ</a>
        </nav>
        <button className="wd-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="wd-cta-btn">資料請求（仮）→</a>
      </header>

      <section className="wd-hero">
        <div className="wd-hero-bg">
          <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="wd-hero-leaves" aria-hidden>
          {[...Array(8)].map((_, i) => <span key={i} className={`wd-leaf wd-leaf-${i}`}>🌿</span>)}
        </div>
        <div className="wd-hero-badge">※ 架空のデザイン見本</div>
        <div className="wd-hero-content">
          <div className="wd-hero-tag">🌱 SDGs 達成への、住まいから。</div>
          <h1 className="wd-hero-title">
            <span>木と、</span>
            <span><em>地球と、</em></span>
            <span>暮らす。</span>
          </h1>
          <p className="wd-hero-sub">
            国産杉・檜（架空）。CO₂を <b>50年</b> 蓄える家。<br/>
            <u>子どもたちの未来</u>のために、できることを。
          </p>
          <div className="wd-hero-btns">
            <a href="#impact" className="wd-btn wd-btn-primary">環境への約束を見る →</a>
            <a href="#contact" className="wd-btn wd-btn-ghost">家づくり相談（仮）</a>
          </div>
        </div>
      </section>

      <section id="why" className="wd-why">
        <div className="wd-section-head wd-reveal">
          <span className="wd-eyebrow">— なぜ "木" なのか —</span>
          <h2 className="wd-h2">木造建築は、<br/><em>地球の "貯金箱"</em>。</h2>
          <p>木は育つときCO₂を吸収し、建材になってからも50年以上それを蓄え続けます。<br/>木造の家は「炭素を固定する装置」でもあるのです。<br/><span className="wd-fake">※ この解説と数値は架空のデザイン見本です。</span></p>
        </div>
        <div className="wd-why-grid">
          {[
            { ic: '🌳', t: '国産材100%', d: '原木は岐阜・長野の森から（架空）。FSC森林認証取得。' },
            { ic: '🍃', t: 'CO₂固定', d: '1邸あたり約 12t-CO₂（架空）を50年間蓄え続けます。' },
            { ic: '♨️', t: '高気密高断熱', d: 'UA値 0.40（架空）。年間光熱費を約60%削減。' },
            { ic: '🛡️', t: '長期優良住宅', d: '耐震等級3標準（架空）。100年後も住み継げる骨格。' },
          ].map((b) => (
            <div key={b.t} className="wd-why-card wd-reveal">
              <div className="wd-why-ic">{b.ic}</div>
              <h3>{b.t}<small>※架空</small></h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="impact" className="wd-impact">
        <div className="wd-section-head wd-reveal">
          <span className="wd-eyebrow wd-eyebrow-light">— ENVIRONMENTAL IMPACT —</span>
          <h2 className="wd-h2 wd-h2-light">数字で見る、<br/>森への恩返し。</h2>
          <p className="wd-fake-pill">※ 以下の数値はすべて<b>架空</b>のサンプルです。</p>
        </div>
        <div className="wd-meters">
          {[
            { v: 82, max: 100, l: 'カーボン固定率', u: '%', d: '建材として蓄えるCO₂量' },
            { v: 64, max: 100, l: '省エネ率', u: '%', d: '一般住宅比の年間光熱費削減' },
            { v: 95, max: 100, l: '国産材比率', u: '%', d: '構造材・内装材の国産比率' },
            { v: 100, max: 100, l: '産地直送率', u: '%', d: '林業組合との直接取引' },
          ].map((m) => (
            <div key={m.l} className="wd-meter wd-reveal">
              <svg viewBox="0 0 120 120" className="wd-meter-svg">
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none"/>
                <circle
                  cx="60" cy="60" r="50"
                  stroke="url(#wd-grad)" strokeWidth="10" fill="none" strokeLinecap="round"
                  strokeDasharray={`${(m.v / m.max) * 314} 314`}
                  transform="rotate(-90 60 60)"
                  className="wd-meter-arc"
                />
                <defs>
                  <linearGradient id="wd-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a3d977"/>
                    <stop offset="100%" stopColor="#6b8e4e"/>
                  </linearGradient>
                </defs>
                <text x="60" y="64" textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">{m.v}<tspan fontSize="14">{m.u}</tspan></text>
              </svg>
              <h3>{m.l}<small>※架空</small></h3>
              <p>{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="houses" className="wd-houses">
        <div className="wd-section-head wd-reveal">
          <span className="wd-eyebrow">— OUR HOUSES —</span>
          <h2 className="wd-h2">私たちの、家。</h2>
          <p className="wd-fake-pill">※ 以下の施工事例はすべて<b>架空</b>のサンプル表示です。</p>
        </div>
        <div className="wd-houses-scroll">
          {[
            { img: 'photo-1600585154340-be6161a56a0c', t: '森の中の家', l: '岐阜県・郡上市', s: '杉無垢材' },
            { img: 'photo-1493809842364-78817add7ffb', t: '光の家', l: '長野県・茅野市', s: '檜化粧梁' },
            { img: 'photo-1564540583246-934409427776', t: '湖畔の家', l: '山梨県・河口湖', s: '土壁・漆喰' },
            { img: 'photo-1600566753190-17f0baa2a6c3', t: '街の中の家', l: '東京都・三鷹市', s: '都市型木造' },
          ].map((h) => (
            <div key={h.t} className="wd-house wd-reveal">
              <div className="wd-house-img">
                <img src={`https://images.unsplash.com/${h.img}?auto=format&fit=crop&w=1200&q=80`} alt="" />
                <span className="wd-house-fake">架空</span>
              </div>
              <div className="wd-house-meta">
                <span className="wd-house-spec">{h.s}（架空）</span>
                <h3>{h.t}<small>※架空</small></h3>
                <span className="wd-house-loc">📍 {h.l}（架空）</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="wd-cta">
        <div className="wd-cta-inner wd-reveal">
          <span className="wd-eyebrow">— CONTACT —</span>
          <h2 className="wd-cta-h">あなたの家から、<br/><em>未来の森を、育てる。</em></h2>
          <p>展示場見学・無料相談・資料請求はこちらから。<br/><span className="wd-fake">※ 動作しません。仮想木造建設会社のデザイン見本です。</span></p>
          <div className="wd-cta-btns">
            <a href="#" className="wd-btn wd-btn-primary">展示場予約（仮）→</a>
            <a href="#" className="wd-btn wd-btn-ghost">パンフレット請求（仮）</a>
          </div>
          <dl className="wd-cta-info">
            <div><dt>展示場（架空）</dt><dd>岐阜県郡上市〇〇 0-0-0 ※実在しません</dd></div>
            <div><dt>TEL（架空）</dt><dd>0575-00-0000</dd></div>
            <div><dt>定休日（架空）</dt><dd>水曜日</dd></div>
          </dl>
        </div>
      </section>

      <footer className="wd-footer">
        <p className="wd-footer-logo">POLARIS WOOD WORKS（架空）</p>
        <p className="wd-footer-tag">— 木と、地球と、暮らす家。 —</p>
        <div className="wd-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS WOOD WORKS」という<u>実在しない仮想木造建設会社</u>のデザイン見本です。<br/>
          会社名・住所・電話・施工事例・環境数値はすべて<u>架空</u>です。
        </div>
        <p className="wd-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="wd-floating-warning">
        <span className="wd-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想木造建設会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.wd-root {
  --wd-bg: #f8f3e7;
  --wd-bg2: #ede4cd;
  --wd-wood: #b88550;
  --wd-wood-dark: #8a5f30;
  --wd-green: #6b8e4e;
  --wd-green-dark: #3f5a2c;
  --wd-fg: #3a2e1c;
  --wd-pink: #d4506a;
  background: var(--wd-bg);
  color: var(--wd-fg);
  font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;
  min-height: 100vh;
}
.wd-root *, .wd-root *::before, .wd-root *::after { box-sizing: border-box; }

.wd-warning { position: sticky; top: 0; z-index: 50; background: #2d2418; color: #fff; border-bottom: 2px solid var(--wd-pink); }
.wd-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.wd-warning-pill { background: var(--wd-pink); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.wd-warning-text { flex: 1; min-width: 0; }
.wd-warning-emph { color: var(--wd-pink); }
.wd-warning-back { background: #fff; color: #2d2418; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.wd-warning-strip { background: var(--wd-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.wd-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 14px 28px; background: rgba(248,243,231,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(58,46,28,0.1); }
.wd-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--wd-fg); }
.wd-logo-mark { width: 36px; height: 36px; color: var(--wd-green-dark); }
.wd-logo-text strong { display: block; font-size: 15px; font-weight: 800; letter-spacing: 0.05em; }
.wd-logo-text span { display: block; font-size: 10px; color: rgba(58,46,28,0.55); }
.wd-nav { display: none; gap: 28px; margin-left: auto; }
.wd-nav a { color: var(--wd-fg); text-decoration: none; font-size: 13px; font-weight: 600; transition: color .2s; }
.wd-nav a:hover { color: var(--wd-green-dark); }
.wd-cta-btn { display: none; padding: 12px 22px; background: var(--wd-green-dark); color: #fff; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 999px; transition: all .25s; box-shadow: 0 4px 16px rgba(63,90,44,0.25); }
.wd-cta-btn:hover { background: var(--wd-green); transform: translateY(-2px); }
.wd-burger { margin-left: auto; background: none; border: 1px solid rgba(58,46,28,0.2); width: 38px; height: 38px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; border-radius: 8px; }
.wd-burger span { display: block; width: 18px; height: 2px; background: var(--wd-fg); transition: transform .25s; border-radius: 1px; }
.wd-burger span.is-open:first-child { transform: translateY(3.5px) rotate(45deg); }
.wd-burger span.is-open:last-child { transform: translateY(-3.5px) rotate(-45deg); }
@media (min-width: 900px) {
  .wd-nav { display: flex; }
  .wd-cta-btn { display: inline-flex; }
  .wd-burger { display: none; }
}
.wd-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--wd-bg); padding: 24px; display: flex; }

.wd-hero { position: relative; min-height: 92vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; }
.wd-hero-bg { position: absolute; inset: 0; }
.wd-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85) brightness(1.05); }
.wd-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(248,243,231,0.95) 0%, rgba(248,243,231,0.65) 60%, transparent 100%); }
.wd-hero-leaves { position: absolute; inset: 0; pointer-events: none; }
.wd-leaf { position: absolute; font-size: 24px; opacity: 0.4; animation: wd-fall linear infinite; }
.wd-leaf-0 { left: 8%; top: -10%; animation-duration: 18s; }
.wd-leaf-1 { left: 22%; top: -10%; animation-duration: 22s; animation-delay: -3s; font-size: 18px; }
.wd-leaf-2 { left: 38%; top: -10%; animation-duration: 16s; animation-delay: -7s; font-size: 28px; }
.wd-leaf-3 { left: 52%; top: -10%; animation-duration: 25s; animation-delay: -12s; font-size: 20px; }
.wd-leaf-4 { left: 66%; top: -10%; animation-duration: 19s; animation-delay: -5s; font-size: 22px; }
.wd-leaf-5 { left: 78%; top: -10%; animation-duration: 24s; animation-delay: -10s; font-size: 16px; }
.wd-leaf-6 { left: 88%; top: -10%; animation-duration: 17s; animation-delay: -2s; font-size: 24px; }
.wd-leaf-7 { left: 96%; top: -10%; animation-duration: 21s; animation-delay: -15s; font-size: 18px; }
@keyframes wd-fall { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(110vh) rotate(540deg); } }
.wd-hero-badge { position: absolute; top: 28px; right: 28px; background: var(--wd-pink); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 10px; font-weight: 800; z-index: 5; }
.wd-hero-content { position: relative; z-index: 10; max-width: 760px; }
.wd-hero-tag { display: inline-block; padding: 6px 14px; background: rgba(107,142,78,0.18); color: var(--wd-green-dark); border-radius: 999px; font-size: 13px; font-weight: 700; margin-bottom: 24px; }
.wd-hero-title { font-size: clamp(40px, 7vw, 96px); font-weight: 700; line-height: 1.2; margin: 0 0 28px; font-family: "Noto Serif JP", serif; color: var(--wd-fg); }
.wd-hero-title span { display: block; opacity: 0; transform: translateY(30px); animation: wd-rise 1s ease forwards; }
.wd-hero-title span:nth-child(2) { animation-delay: .2s; }
.wd-hero-title span:nth-child(3) { animation-delay: .4s; }
.wd-hero-title em { font-style: normal; color: var(--wd-green-dark); border-bottom: 4px solid var(--wd-wood); padding-bottom: 4px; }
.wd-hero-sub { font-size: clamp(15px, 1.6vw, 18px); line-height: 1.9; color: rgba(58,46,28,0.8); margin: 0 0 36px; font-family: "Noto Serif JP", serif; }
.wd-hero-sub b { color: var(--wd-green-dark); font-size: 1.2em; }
.wd-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.wd-btn { display: inline-flex; align-items: center; padding: 16px 28px; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 999px; transition: all .25s; }
.wd-btn-primary { background: var(--wd-green-dark); color: #fff; box-shadow: 0 6px 24px rgba(63,90,44,0.3); }
.wd-btn-primary:hover { background: var(--wd-green); transform: translateY(-2px); }
.wd-btn-ghost { color: var(--wd-fg); border: 2px solid var(--wd-fg); }
.wd-btn-ghost:hover { background: var(--wd-fg); color: #fff; }

.wd-why, .wd-impact, .wd-houses, .wd-cta { padding: 110px 32px; }
.wd-section-head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
.wd-eyebrow { display: inline-block; font-size: 12px; letter-spacing: 0.2em; color: var(--wd-green-dark); font-weight: 700; margin-bottom: 16px; }
.wd-eyebrow-light { color: rgba(255,255,255,0.8); }
.wd-h2 { font-size: clamp(28px, 4.4vw, 56px); font-weight: 700; font-family: "Noto Serif JP", serif; line-height: 1.4; margin: 0 0 16px; }
.wd-h2 em { font-style: normal; color: var(--wd-green-dark); }
.wd-h2-light { color: #fff; }
.wd-h2-light em { color: #a3d977; }
.wd-section-head p { font-size: 14px; color: rgba(58,46,28,0.7); line-height: 1.9; margin: 0; font-family: "Noto Serif JP", serif; }
.wd-fake { color: var(--wd-pink); font-weight: 700; }
.wd-fake-pill { display: inline-block; padding: 6px 18px; background: rgba(212,80,106,0.1); color: var(--wd-pink); border: 1px solid rgba(212,80,106,0.3); border-radius: 999px; font-size: 12px; font-weight: 700; margin-top: 12px; }

.wd-why { background: var(--wd-bg); }
.wd-why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
.wd-why-card { padding: 32px 24px; background: #fff; border-radius: 16px; border: 1px solid rgba(58,46,28,0.08); transition: all .3s; text-align: center; }
.wd-why-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(58,46,28,0.1); border-color: var(--wd-green); }
.wd-why-ic { font-size: 48px; margin-bottom: 12px; }
.wd-why-card h3 { font-size: 18px; font-weight: 700; margin: 0 0 12px; }
.wd-why-card h3 small { font-size: 10px; color: var(--wd-pink); margin-left: 6px; font-weight: 500; }
.wd-why-card p { font-size: 13px; line-height: 1.8; color: rgba(58,46,28,0.7); margin: 0; }

.wd-impact { background: linear-gradient(135deg, var(--wd-green-dark) 0%, #2c4020 100%); color: #fff; position: relative; overflow: hidden; }
.wd-impact::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 20% 30%, rgba(163,217,119,0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(184,133,80,0.1), transparent 50%); pointer-events: none; }
.wd-meters { position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; max-width: 1200px; margin: 0 auto; }
.wd-meter { text-align: center; }
.wd-meter-svg { width: 180px; height: 180px; margin: 0 auto 16px; }
.wd-meter-arc { transition: stroke-dasharray 2s cubic-bezier(.2,.7,.2,1); }
.wd-meter.wd-reveal .wd-meter-arc { stroke-dasharray: 0 314; }
.wd-meter.is-visible .wd-meter-arc { stroke-dasharray: var(--arc, 250 314); }
.wd-meter h3 { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #fff; }
.wd-meter h3 small { font-size: 10px; color: var(--wd-pink); margin-left: 6px; font-weight: 500; }
.wd-meter p { font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0; }

.wd-houses { background: var(--wd-bg2); }
.wd-houses-scroll { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.wd-house { cursor: pointer; transition: transform .3s; }
.wd-house:hover { transform: translateY(-6px); }
.wd-house-img { position: relative; aspect-ratio: 4/5; overflow: hidden; border-radius: 12px; }
.wd-house-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s; }
.wd-house:hover .wd-house-img img { transform: scale(1.06); }
.wd-house-fake { position: absolute; top: 12px; right: 12px; background: var(--wd-pink); color: #fff; padding: 4px 10px; font-size: 10px; font-weight: 700; border-radius: 4px; }
.wd-house-meta { padding: 16px 4px; }
.wd-house-spec { font-size: 11px; color: var(--wd-wood-dark); font-weight: 700; letter-spacing: 0.1em; }
.wd-house h3 { font-size: 18px; font-weight: 700; margin: 6px 0 6px; font-family: "Noto Serif JP", serif; }
.wd-house h3 small { font-size: 10px; color: var(--wd-pink); margin-left: 6px; font-weight: 500; }
.wd-house-loc { font-size: 12px; color: rgba(58,46,28,0.6); }

.wd-cta { background: var(--wd-bg); text-align: center; }
.wd-cta-h { font-size: clamp(32px, 5vw, 64px); font-family: "Noto Serif JP", serif; font-weight: 700; line-height: 1.3; margin: 0 0 16px; }
.wd-cta-h em { font-style: normal; color: var(--wd-green-dark); }
.wd-cta p { font-size: 16px; line-height: 1.8; color: rgba(58,46,28,0.75); margin: 0 0 36px; }
.wd-cta-inner { max-width: 800px; margin: 0 auto; }
.wd-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
.wd-cta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; padding-top: 32px; border-top: 1px solid rgba(58,46,28,0.15); margin: 0; text-align: left; }
.wd-cta-info dt { font-size: 11px; color: var(--wd-green-dark); letter-spacing: 0.15em; margin-bottom: 6px; font-weight: 700; }
.wd-cta-info dd { margin: 0; font-size: 14px; color: var(--wd-fg); }

.wd-footer { padding: 64px 32px 32px; background: var(--wd-green-dark); color: #f8f3e7; text-align: center; }
.wd-footer-logo { font-size: 18px; font-weight: 800; margin: 0 0 8px; }
.wd-footer-tag { font-size: 13px; color: rgba(248,243,231,0.7); font-family: "Noto Serif JP", serif; margin: 0 0 28px; }
.wd-footer-disclaimer { max-width: 700px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.15); border: 1px solid rgba(212,80,106,0.4); color: rgba(255,255,255,0.85); font-size: 12px; line-height: 1.8; }
.wd-footer-disclaimer strong { color: #ff8fa6; }
.wd-footer-cr { font-size: 11px; color: rgba(248,243,231,0.4); }

.wd-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--wd-pink); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; }
.wd-floating-warning-icon { background: #fff; color: var(--wd-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.wd-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.wd-reveal.is-visible { opacity: 1; transform: translateY(0); }
@keyframes wd-rise { to { opacity: 1; transform: translateY(0); } }
`
