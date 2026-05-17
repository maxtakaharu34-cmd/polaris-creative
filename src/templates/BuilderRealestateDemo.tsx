import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS ESTATE — 不動産×建設・投資家向け
   黒×金 / 物件カード / 数字スピン / 富裕層
   ============================================================ */

export default function BuilderRealestateDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<'ALL' | 'MANSION' | 'OFFICE' | 'HOTEL'>('ALL')

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.re-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const props = [
    { id: 'PE-2026-018', cat: 'MANSION', t: '六本木スカイレジデンス（架空）', loc: '東京都・港区', y: '1.45億円〜', spec: '4LDK / 145㎡' },
    { id: 'PE-2026-014', cat: 'OFFICE', t: 'ポラリスタワー丸の内（架空）', loc: '東京都・千代田区', y: '坪 8.5万円', spec: 'A級オフィス / 320坪' },
    { id: 'PE-2026-009', cat: 'HOTEL', t: '軽井沢リゾートホテル（架空）', loc: '長野県・軽井沢', y: '12.8億円', spec: '48室 / 利回り7%' },
    { id: 'PE-2026-005', cat: 'MANSION', t: '麻布グランドハウス（架空）', loc: '東京都・港区', y: '2.85億円〜', spec: '3LDK / 188㎡' },
    { id: 'PE-2026-002', cat: 'OFFICE', t: 'シーフロント大手町（架空）', loc: '東京都・千代田区', y: '坪 7.8万円', spec: 'A級 / 480坪' },
    { id: 'PE-2025-091', cat: 'HOTEL', t: '京都町家ブティック（架空）', loc: '京都府・東山', y: '6.4億円', spec: '12室 / 利回り8.2%' },
  ]
  const filtered = filter === 'ALL' ? props : props.filter((p) => p.cat === filter)

  return (
    <div className="re-root">
      <style>{cssText}</style>

      <div className="re-warning">
        <div className="re-warning-row">
          <span className="re-warning-pill">SAMPLE</span>
          <span className="re-warning-text">⚠️ <b>POLARIS ESTATE</b> は<b className="re-warning-emph">実在しない仮想の不動産・建設会社</b>です。ポラリスクリエイティブ作成のデザイン見本。</span>
          <a href="#hp" className="re-warning-back">← 戻る</a>
        </div>
        <div className="re-warning-strip">⚠️ 注意：会社名・物件・住所・価格・利回りはすべて<u>架空</u>です。投資勧誘ではありません。</div>
      </div>

      <header className="re-header">
        <a href="#" className="re-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="re-logo-mark" aria-hidden>
            <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="currentColor" fontFamily="serif">P</text>
          </svg>
          <div className="re-logo-text">
            <strong>POLARIS ESTATE</strong>
            <span>ポラリス不動産（架空）</span>
          </div>
        </a>
        <nav className={`re-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#properties" onClick={() => setMenuOpen(false)}>PROPERTIES</a>
          <a href="#numbers" onClick={() => setMenuOpen(false)}>NUMBERS</a>
          <a href="#service" onClick={() => setMenuOpen(false)}>SERVICE</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <button className="re-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="re-cta-btn">PRIVATE TOUR（仮）</a>
      </header>

      <section className="re-hero">
        <div className="re-hero-bg">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="re-hero-gold-line"/>
        <div className="re-hero-badge">※ 架空のデザイン見本</div>
        <div className="re-hero-content">
          <div className="re-hero-tag">— PRIVATE PROPERTY INVESTMENT —</div>
          <h1 className="re-hero-title">
            <span><em>Premier</em></span>
            <span>Real Estate</span>
            <span><em>Investment.</em></span>
          </h1>
          <p className="re-hero-sub">
            東京・関西・リゾート地の<b>選び抜かれた優良物件</b>を、<br/>
            富裕層・法人投資家へ非公開で提供（架空）。
          </p>
          <div className="re-hero-btns">
            <a href="#properties" className="re-btn re-btn-gold">物件一覧（仮）→</a>
            <a href="#contact" className="re-btn re-btn-ghost">非公開資料請求（仮）</a>
          </div>
        </div>
      </section>

      <section id="numbers" className="re-numbers">
        {[
          { v: '2,850', u: '億円', l: '累計取扱高（架空）' },
          { v: '420', u: '件', l: '優良物件保有数（架空）' },
          { v: '7.2', u: '%', l: '平均利回り（架空）' },
          { v: '38', u: '年', l: '不動産投資歴（架空）' },
        ].map((s) => (
          <div key={s.l} className="re-num re-reveal">
            <strong>{s.v}<em>{s.u}</em></strong>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <section id="properties" className="re-properties">
        <div className="re-section-head re-reveal">
          <span className="re-eyebrow">— EXCLUSIVE PROPERTIES —</span>
          <h2 className="re-h2">非公開、<em>厳選物件。</em></h2>
          <p>会員様にのみ公開している優良物件（架空）。<br/><span className="re-fake">※ 以下の物件・価格はすべて架空のサンプルです。投資勧誘ではありません。</span></p>
        </div>
        <div className="re-filter re-reveal">
          {(['ALL', 'MANSION', 'OFFICE', 'HOTEL'] as const).map((f) => (
            <button key={f} className={`re-filter-btn ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="re-props-grid">
          {filtered.map((p, i) => (
            <article key={p.id} className="re-prop re-reveal">
              <div className="re-prop-img">
                <img src={`https://images.unsplash.com/photo-${1545324418 + i * 7}-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80`} alt="" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' }}/>
                <span className="re-prop-cat">{p.cat}</span>
                <span className="re-prop-fake">架空</span>
              </div>
              <div className="re-prop-meta">
                <span className="re-prop-id">{p.id}</span>
                <h3>{p.t}<small>※架空</small></h3>
                <div className="re-prop-info">
                  <div><dt>LOCATION</dt><dd>{p.loc}（架空）</dd></div>
                  <div><dt>PRICE</dt><dd>{p.y}<small>※架空</small></dd></div>
                  <div><dt>SPEC</dt><dd>{p.spec}（架空）</dd></div>
                </div>
                <a href="#" className="re-prop-btn">VIEW DETAILS →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="service" className="re-service">
        <div className="re-section-head re-reveal">
          <span className="re-eyebrow">— SERVICES —</span>
          <h2 className="re-h2">あらゆる、<em>資産戦略を。</em></h2>
        </div>
        <div className="re-service-grid">
          {[
            { n: 'I',   t: '優良物件仕入', d: '富裕層・法人向け非公開物件を月間50件以上仕入（架空）' },
            { n: 'II',  t: '建築・開発', d: '土地活用から自社開発まで、建設機能を内製（架空）' },
            { n: 'III', t: '資産運用相談', d: '不動産税理士・弁護士と連携した総合資産戦略（架空）' },
            { n: 'IV',  t: '海外不動産', d: 'シンガポール・ハワイ・バンコクの優良物件（架空）' },
          ].map((s) => (
            <div key={s.n} className="re-service-card re-reveal">
              <div className="re-service-num">{s.n}</div>
              <h3>{s.t}<small>※架空</small></h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="re-cta">
        <div className="re-cta-inner re-reveal">
          <span className="re-eyebrow">— PRIVATE CONSULTATION —</span>
          <h2 className="re-cta-h">非公開物件は、<br/><em>会員様限定。</em></h2>
          <p>会員登録（無料・審査あり・架空）で、毎月の優良物件情報をご覧いただけます。<br/><span className="re-fake">※ 動作しません。仮想不動産会社のデザイン見本です。</span></p>
          <div className="re-cta-btns">
            <a href="#" className="re-btn re-btn-gold">会員登録 申請（仮）→</a>
            <a href="#" className="re-btn re-btn-ghost-light">プライベート相談（仮）</a>
          </div>
          <dl className="re-cta-info">
            <div><dt>HEAD OFFICE（架空）</dt><dd>東京都港区六本木 0-0-0 ※実在しません</dd></div>
            <div><dt>TEL（架空）</dt><dd>03-0000-0000</dd></div>
            <div><dt>HOURS（架空）</dt><dd>平日 10:00〜19:00 / 完全予約制</dd></div>
            <div><dt>免許（架空）</dt><dd>東京都知事(0)第00000号</dd></div>
          </dl>
        </div>
      </section>

      <footer className="re-footer">
        <div className="re-footer-mark"><strong>POLARIS ESTATE</strong><em>株式会社ポラリス不動産（架空）</em></div>
        <p className="re-footer-tag">— Premier Real Estate Investment —</p>
        <div className="re-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS ESTATE」という<u>実在しない仮想不動産会社</u>のデザイン見本です。<br/>
          会社名・物件・住所・電話・価格・利回り・免許番号などはすべて<u>架空</u>です。<b>投資勧誘ではありません。</b>
        </div>
        <p className="re-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="re-floating-warning">
        <span className="re-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想不動産会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.re-root { --re-bg: #0c0c0c; --re-bg2: #181410; --re-gold: #c9a45c; --re-gold-bright: #e8c97f; --re-fg: #e8e3d8; --re-pink: #d4506a; background: var(--re-bg); color: var(--re-fg); font-family: "Helvetica Neue", "Noto Serif JP", serif; min-height: 100vh; }
.re-root *, .re-root *::before, .re-root *::after { box-sizing: border-box; }
.re-warning { position: sticky; top: 0; z-index: 50; background: #000; color: #fff; border-bottom: 2px solid var(--re-pink); }
.re-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.re-warning-pill { background: var(--re-pink); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.re-warning-text { flex: 1; min-width: 0; } .re-warning-emph { color: var(--re-pink); }
.re-warning-back { background: #fff; color: #000; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.re-warning-strip { background: var(--re-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.re-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 16px 28px; background: rgba(12,12,12,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--re-gold); }
.re-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--re-fg); }
.re-logo-mark { width: 40px; height: 40px; color: var(--re-gold); }
.re-logo-text strong { display: block; font-size: 15px; font-weight: 700; letter-spacing: 0.18em; color: var(--re-gold); }
.re-logo-text span { display: block; font-size: 10px; color: rgba(232,227,216,0.55); }
.re-nav { display: none; gap: 28px; margin-left: auto; }
.re-nav a { color: var(--re-fg); text-decoration: none; font-size: 12px; letter-spacing: 0.2em; font-weight: 600; transition: color .2s; }
.re-nav a:hover { color: var(--re-gold); }
.re-cta-btn { display: none; padding: 12px 22px; background: var(--re-gold); color: #000; font-weight: 800; font-size: 12px; letter-spacing: 0.15em; text-decoration: none; transition: all .25s; }
.re-cta-btn:hover { background: var(--re-gold-bright); }
.re-burger { margin-left: auto; background: var(--re-gold); border: none; width: 38px; height: 38px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; cursor: pointer; }
.re-burger span { display: block; width: 18px; height: 2px; background: #000; transition: transform .25s; }
.re-burger span.is-open:first-child { transform: translateY(3px) rotate(45deg); }
.re-burger span.is-open:last-child { transform: translateY(-3px) rotate(-45deg); }
@media (min-width: 900px) { .re-nav { display: flex; } .re-cta-btn { display: inline-flex; } .re-burger { display: none; } }
.re-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--re-bg); padding: 24px; display: flex; border-bottom: 1px solid var(--re-gold); }

.re-hero { position: relative; min-height: 90vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; }
.re-hero-bg { position: absolute; inset: 0; }
.re-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.45) saturate(0.9); }
.re-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(12,12,12,0.92) 0%, rgba(12,12,12,0.5) 60%, transparent 100%); }
.re-hero-gold-line { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: linear-gradient(90deg, transparent, var(--re-gold), transparent); }
.re-hero-badge { position: absolute; top: 24px; right: 24px; background: var(--re-pink); color: #fff; padding: 6px 14px; font-size: 10px; font-weight: 800; z-index: 5; }
.re-hero-content { position: relative; z-index: 10; max-width: 900px; }
.re-hero-tag { display: inline-block; font-size: 11px; letter-spacing: 0.4em; color: var(--re-gold); margin-bottom: 28px; padding-bottom: 8px; border-bottom: 1px solid var(--re-gold); }
.re-hero-title { font-size: clamp(48px, 8vw, 124px); font-weight: 400; line-height: 1; letter-spacing: -0.03em; margin: 0 0 32px; font-family: "Times New Roman", serif; }
.re-hero-title span { display: block; opacity: 0; transform: translateY(40px); animation: re-rise 1.1s cubic-bezier(.2,.7,.2,1) forwards; color: var(--re-fg); }
.re-hero-title span:nth-child(2) { animation-delay: .2s; padding-left: clamp(40px, 12vw, 200px); }
.re-hero-title span:nth-child(3) { animation-delay: .4s; }
.re-hero-title em { font-style: italic; color: var(--re-gold); }
.re-hero-sub { font-size: clamp(15px, 1.5vw, 18px); line-height: 1.9; color: rgba(232,227,216,0.85); margin: 0 0 36px; max-width: 600px; }
.re-hero-sub b { color: var(--re-gold); }
.re-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.re-btn { display: inline-flex; align-items: center; padding: 16px 28px; font-weight: 700; font-size: 12px; letter-spacing: 0.2em; text-decoration: none; transition: all .25s; }
.re-btn-gold { background: var(--re-gold); color: #000; }
.re-btn-gold:hover { background: var(--re-gold-bright); }
.re-btn-ghost { color: var(--re-fg); border: 1px solid var(--re-fg); }
.re-btn-ghost:hover { border-color: var(--re-gold); color: var(--re-gold); }
.re-btn-ghost-light { color: #fff; border: 1px solid #fff; }
.re-btn-ghost-light:hover { background: #fff; color: #000; }

.re-numbers { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0; background: var(--re-bg2); border-top: 1px solid var(--re-gold); border-bottom: 1px solid var(--re-gold); }
.re-num { padding: 56px 32px; border-right: 1px solid rgba(201,164,92,0.15); text-align: center; }
.re-num:last-child { border-right: none; }
.re-num strong { display: block; font-size: clamp(40px, 5vw, 64px); font-weight: 400; color: var(--re-gold); font-family: "Times New Roman", serif; line-height: 1; letter-spacing: -0.02em; }
.re-num strong em { font-size: 0.4em; font-style: italic; margin-left: 6px; }
.re-num span { display: block; font-size: 11px; color: rgba(232,227,216,0.6); letter-spacing: 0.15em; margin-top: 12px; }

.re-properties, .re-service, .re-cta { padding: 110px 32px; }
.re-section-head { text-align: center; max-width: 800px; margin: 0 auto 56px; }
.re-eyebrow { display: inline-block; font-size: 11px; letter-spacing: 0.35em; color: var(--re-gold); margin-bottom: 16px; font-family: "Times New Roman", serif; font-style: italic; }
.re-h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 400; line-height: 1.2; letter-spacing: -0.02em; margin: 0; font-family: "Times New Roman", serif; }
.re-h2 em { font-style: italic; color: var(--re-gold); }
.re-section-head p { font-size: 14px; line-height: 1.9; color: rgba(232,227,216,0.7); margin: 16px 0 0; }
.re-fake { color: var(--re-pink); font-weight: 700; }

.re-filter { display: flex; justify-content: center; gap: 8px; margin-bottom: 48px; flex-wrap: wrap; }
.re-filter-btn { background: transparent; border: 1px solid rgba(232,227,216,0.3); color: var(--re-fg); padding: 10px 22px; font-size: 11px; letter-spacing: 0.2em; font-weight: 700; cursor: pointer; transition: all .25s; font-family: "Helvetica Neue", sans-serif; }
.re-filter-btn:hover { border-color: var(--re-gold); color: var(--re-gold); }
.re-filter-btn.is-active { background: var(--re-gold); color: #000; border-color: var(--re-gold); }

.re-props-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.re-prop { background: var(--re-bg2); border: 1px solid rgba(201,164,92,0.2); transition: all .3s; }
.re-prop:hover { border-color: var(--re-gold); transform: translateY(-4px); }
.re-prop-img { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #333; }
.re-prop-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85); transition: transform .8s; }
.re-prop:hover .re-prop-img img { transform: scale(1.05); filter: brightness(1); }
.re-prop-cat { position: absolute; top: 12px; left: 12px; background: var(--re-gold); color: #000; padding: 4px 12px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; }
.re-prop-fake { position: absolute; top: 12px; right: 12px; background: var(--re-pink); color: #fff; padding: 3px 10px; font-size: 10px; font-weight: 700; }
.re-prop-meta { padding: 24px; }
.re-prop-id { font-family: monospace; font-size: 11px; color: var(--re-gold); letter-spacing: 0.2em; }
.re-prop h3 { font-size: 20px; font-weight: 400; margin: 6px 0 16px; font-family: "Times New Roman", serif; color: var(--re-fg); }
.re-prop h3 small { font-size: 10px; color: var(--re-pink); margin-left: 6px; font-weight: 500; font-family: "Helvetica Neue", sans-serif; }
.re-prop-info { margin-bottom: 20px; }
.re-prop-info > div { display: grid; grid-template-columns: 80px 1fr; gap: 12px; padding: 8px 0; border-bottom: 1px solid rgba(201,164,92,0.15); }
.re-prop-info dt { font-size: 10px; letter-spacing: 0.15em; color: var(--re-gold); font-weight: 700; font-family: "Helvetica Neue", sans-serif; }
.re-prop-info dd { margin: 0; font-size: 13px; color: var(--re-fg); }
.re-prop-info dd small { font-size: 9px; color: var(--re-pink); margin-left: 4px; }
.re-prop-btn { font-family: "Helvetica Neue", sans-serif; font-size: 11px; letter-spacing: 0.2em; color: var(--re-gold); text-decoration: none; font-weight: 700; border-bottom: 1px solid var(--re-gold); padding-bottom: 4px; }

.re-service { background: var(--re-bg2); }
.re-service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.re-service-card { padding: 36px 28px; background: var(--re-bg); border-top: 2px solid var(--re-gold); transition: all .3s; }
.re-service-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(201,164,92,0.15); }
.re-service-num { font-family: "Times New Roman", serif; font-size: 48px; color: var(--re-gold); line-height: 1; font-style: italic; margin-bottom: 16px; }
.re-service-card h3 { font-size: 20px; font-weight: 400; margin: 0 0 12px; font-family: "Times New Roman", serif; color: var(--re-fg); }
.re-service-card h3 small { font-size: 10px; color: var(--re-pink); margin-left: 6px; font-weight: 500; font-family: "Helvetica Neue", sans-serif; }
.re-service-card p { font-size: 13px; line-height: 1.8; color: rgba(232,227,216,0.7); margin: 0; }

.re-cta { background: linear-gradient(135deg, var(--re-bg) 0%, var(--re-bg2) 100%); text-align: center; }
.re-cta-h { font-size: clamp(36px, 6vw, 80px); font-weight: 400; line-height: 1.2; letter-spacing: -0.02em; margin: 0 0 24px; font-family: "Times New Roman", serif; }
.re-cta-h em { font-style: italic; color: var(--re-gold); }
.re-cta p { font-size: 15px; line-height: 1.9; color: rgba(232,227,216,0.7); margin: 0 0 36px; }
.re-cta-inner { max-width: 820px; margin: 0 auto; }
.re-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
.re-cta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; padding-top: 32px; border-top: 1px solid var(--re-gold); margin: 0; text-align: left; }
.re-cta-info dt { font-size: 10px; color: var(--re-gold); letter-spacing: 0.2em; margin-bottom: 6px; font-family: "Helvetica Neue", sans-serif; font-weight: 700; }
.re-cta-info dd { margin: 0; font-size: 14px; color: rgba(232,227,216,0.9); }

.re-footer { padding: 64px 32px 32px; background: #000; text-align: center; border-top: 1px solid var(--re-gold); }
.re-footer-mark { margin-bottom: 12px; }
.re-footer-mark strong { display: block; font-size: 22px; letter-spacing: 0.2em; font-weight: 700; color: var(--re-gold); }
.re-footer-mark em { display: block; font-size: 11px; color: rgba(232,227,216,0.5); margin-top: 4px; font-style: normal; }
.re-footer-tag { font-size: 13px; color: var(--re-gold); font-style: italic; margin: 8px 0 28px; font-family: "Times New Roman", serif; }
.re-footer-disclaimer { max-width: 720px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.12); border: 1px solid var(--re-pink); color: rgba(232,227,216,0.85); font-size: 12px; line-height: 1.8; font-family: "Helvetica Neue", sans-serif; }
.re-footer-disclaimer strong { color: var(--re-pink); }
.re-footer-disclaimer b { color: var(--re-gold); }
.re-footer-cr { font-size: 11px; color: rgba(232,227,216,0.35); font-family: "Helvetica Neue", sans-serif; }

.re-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--re-pink); color: #fff; padding: 10px 16px; border-radius: 4px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; font-family: "Helvetica Neue", sans-serif; }
.re-floating-warning-icon { background: #fff; color: var(--re-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.re-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.re-reveal.is-visible { opacity: 1; transform: translateY(0); }
@keyframes re-rise { to { opacity: 1; transform: translateY(0); } }
`
