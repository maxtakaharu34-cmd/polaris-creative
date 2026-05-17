import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS EMERGENCY — 災害復旧・24h対応
   赤×黒 / conic-gradient / パルスリング / 警告灯
   ============================================================ */

export default function BuilderEmergencyDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.em-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const hh = time.getHours().toString().padStart(2, '0')
  const mm = time.getMinutes().toString().padStart(2, '0')
  const ss = time.getSeconds().toString().padStart(2, '0')

  return (
    <div className="em-root">
      <style>{cssText}</style>

      <div className="em-warning">
        <div className="em-warning-row">
          <span className="em-warning-pill">SAMPLE</span>
          <span className="em-warning-text">⚠️ <b>POLARIS EMERGENCY</b> は<b className="em-warning-emph">実在しない仮想の災害復旧会社</b>です。ポラリスクリエイティブ作成のデザイン見本。</span>
          <a href="#hp" className="em-warning-back">← 戻る</a>
        </div>
        <div className="em-warning-strip">⚠️ 注意：会社名・住所・電話・出動実績・対応エリアはすべて<u>架空</u>です。</div>
      </div>

      <div className="em-status-bar">
        <span className="em-status-dot"/>
        <strong>STATUS: OPERATIONAL</strong>
        <span className="em-status-time">{hh}:{mm}:<i>{ss}</i> JST</span>
        <span className="em-status-sep"/>
        <strong>UNITS ON STANDBY: 24 / 24</strong>
        <span className="em-status-sep"/>
        <strong>RESPONSE TIME: 18 min avg</strong>
        <span className="em-status-fake">※架空</span>
      </div>

      <header className="em-header">
        <a href="#" className="em-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <div className="em-logo-mark">
            <span className="em-logo-pulse"/>
            <svg viewBox="0 0 40 40" aria-hidden>
              <polygon points="20,4 36,30 4,30" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
              <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="currentColor">!</text>
            </svg>
          </div>
          <div className="em-logo-text">
            <strong>POLARIS EMERGENCY</strong>
            <span>ポラリス災害復旧（架空）</span>
          </div>
        </a>
        <nav className={`em-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>対応業務</a>
          <a href="#dispatch" onClick={() => setMenuOpen(false)}>出動実績</a>
          <a href="#flow" onClick={() => setMenuOpen(false)}>出動の流れ</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>緊急受付</a>
        </nav>
        <button className="em-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="tel:0120000000" className="em-cta-btn">
          <span className="em-cta-dot"/>
          24h 緊急ダイヤル（仮）
        </a>
      </header>

      <section className="em-hero">
        <div className="em-hero-bg">
          <img src="https://images.unsplash.com/photo-1547149540-89dc66c34c34?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="em-hero-stripes"/>
        <div className="em-hero-grid"/>
        <div className="em-hero-badge">※ 架空のデザイン見本</div>

        <div className="em-hero-content">
          <div className="em-hero-alert">
            <span className="em-alert-light"/>
            ALERT — 24時間365日 緊急出動体制（架空）
          </div>
          <h1 className="em-hero-title">
            <span><em>その</em>とき、</span>
            <span>真っ先に、</span>
            <span><em>駆けつける。</em></span>
          </h1>
          <p className="em-hero-sub">
            地震・水害・火災・台風——<br/>
            <b>被害発生から1時間以内に現地着</b>（架空）を約束する、災害復旧の専門集団。
          </p>
          <div className="em-hero-btns">
            <a href="tel:0120000000" className="em-btn em-btn-red">
              <span className="em-btn-pulse"/>
              📞 緊急受付（仮）0120-000-000
            </a>
            <a href="#services" className="em-btn em-btn-ghost">対応業務を見る →</a>
          </div>
        </div>

        <div className="em-hero-radar" aria-hidden>
          <div className="em-radar-sweep"/>
          <div className="em-radar-ring em-ring-1"/>
          <div className="em-radar-ring em-ring-2"/>
          <div className="em-radar-ring em-ring-3"/>
          <div className="em-radar-center"/>
          <span className="em-radar-label">SCAN<br/>ACTIVE</span>
        </div>
      </section>

      <section id="services" className="em-services">
        <div className="em-section-head em-reveal">
          <span className="em-eyebrow">▶ EMERGENCY SERVICES — 対応業務（架空）</span>
          <h2 className="em-h2">あらゆる、<em>非常事態に。</em></h2>
        </div>
        <div className="em-services-grid">
          {[
            { code: 'EQ-01', i: '🏚️', t: '地震被害対応', d: '応急危険度判定、瓦礫撤去、応急仮設、構造補強。' },
            { code: 'FL-02', i: '🌊', t: '水害・浸水', d: '排水ポンプ、土嚢設置、汚泥撤去、消毒作業。' },
            { code: 'FR-03', i: '🔥', t: '火災後復旧', d: '焼損部材撤去、煤煙消臭、構造再建、内装復旧。' },
            { code: 'TY-04', i: '🌪️', t: '台風・強風被害', d: '屋根応急処置、ブルーシート展張、倒木撤去。' },
            { code: 'SN-05', i: '❄️', t: '雪害・凍結', d: '雪降ろし、屋根破損対応、凍結配管復旧。' },
            { code: 'EM-06', i: '🚨', t: '事故・緊急時', d: '崩落・崩壊事故、ライフライン障害の緊急対応。' },
          ].map((s) => (
            <div key={s.code} className="em-service em-reveal">
              <div className="em-service-corner"/>
              <div className="em-service-head">
                <span className="em-service-code">{s.code}</span>
                <span className="em-service-ic">{s.i}</span>
              </div>
              <h3>{s.t}<small>※架空</small></h3>
              <p>{s.d}</p>
              <div className="em-service-tag">▶ 24h DISPATCH</div>
            </div>
          ))}
        </div>
      </section>

      <section id="dispatch" className="em-dispatch">
        <div className="em-section-head em-reveal">
          <span className="em-eyebrow em-eyebrow-light">▶ DISPATCH RECORDS — 出動実績（架空）</span>
          <h2 className="em-h2 em-h2-light">直近の、<em>出動記録。</em></h2>
        </div>
        <div className="em-dispatch-table em-reveal">
          <div className="em-table-head">
            <span>CODE</span><span>DATE</span><span>LOCATION</span><span>TYPE</span><span>STATUS</span>
          </div>
          {[
            { c: 'DSP-2026-018', d: '2026.04.10', l: '熊本県・益城町', t: '地震復旧', s: 'COMPLETED' },
            { c: 'DSP-2026-014', d: '2026.03.28', l: '岩手県・宮古市', t: '津波被害', s: 'COMPLETED' },
            { c: 'DSP-2026-009', d: '2026.03.05', l: '静岡県・浜松市', t: '台風被害', s: 'COMPLETED' },
            { c: 'DSP-2026-003', d: '2026.01.22', l: '新潟県・長岡市', t: '雪害', s: 'COMPLETED' },
            { c: 'DSP-2026-001', d: '2026.01.05', l: '東京都・足立区', t: '火災復旧', s: 'COMPLETED' },
          ].map((r) => (
            <div key={r.c} className="em-table-row em-reveal">
              <span className="em-row-code">{r.c}</span>
              <span>{r.d}</span>
              <span>{r.l}</span>
              <span className="em-row-type">{r.t}</span>
              <span className="em-row-status">● {r.s}</span>
            </div>
          ))}
          <p className="em-table-fake">※ 以上の出動記録はすべて<b>架空</b>のサンプル表示です。</p>
        </div>
      </section>

      <section id="flow" className="em-flow">
        <div className="em-section-head em-reveal">
          <span className="em-eyebrow">▶ DISPATCH FLOW — 出動の流れ（架空）</span>
          <h2 className="em-h2">通報から、<em>復旧まで。</em></h2>
        </div>
        <div className="em-flow-steps">
          {[
            { t: '00:00', l: '通報受付', d: '24h オペレーターが直接対応' },
            { t: '00:15', l: '出動指令', d: '最寄り班に即座に指令' },
            { t: '01:00', l: '現地到着', d: '被害状況確認・初期対応' },
            { t: '03:00', l: '応急処置完了', d: '二次被害防止のための処置' },
            { t: '24:00', l: '本格復旧着手', d: '計画立案・本格復旧工事へ' },
          ].map((s, i) => (
            <div key={s.t} className="em-flow-step em-reveal">
              <div className="em-flow-time">{s.t}<small>※架空</small></div>
              <div className="em-flow-dot">{i + 1}</div>
              <h3>{s.l}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="em-cta">
        <div className="em-cta-bg-grid"/>
        <div className="em-cta-inner em-reveal">
          <div className="em-cta-alert">
            <span className="em-alert-light em-alert-large"/>
            <span>EMERGENCY HOTLINE — 24/7</span>
          </div>
          <h2 className="em-cta-h"><em>1コール</em>で、<br/>動きます。</h2>
          <p>状況だけ教えてください。あとはこちらで判断・出動します。<br/><span className="em-fake">※ 動作しません。仮想の災害復旧会社のデザイン見本です。</span></p>
          <a href="tel:0120000000" className="em-cta-phone">
            <span className="em-cta-phone-pulse"/>
            <strong>0120-000-000</strong>
            <span>緊急ダイヤル<small>※架空</small></span>
          </a>
          <dl className="em-cta-info">
            <div><dt>RESPONSE AREA（架空）</dt><dd>全国47都道府県 / 海外連携可</dd></div>
            <div><dt>UNITS（架空）</dt><dd>24時間 / 8拠点 / 班員240名</dd></div>
            <div><dt>EMAIL（架空）</dt><dd>dispatch@polaris-emergency.example</dd></div>
          </dl>
        </div>
      </section>

      <footer className="em-footer">
        <div className="em-footer-mark">
          <svg viewBox="0 0 40 40" className="em-footer-logo" aria-hidden>
            <polygon points="20,4 36,30 4,30" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
            <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="currentColor">!</text>
          </svg>
          <strong>POLARIS EMERGENCY</strong>
        </div>
        <p className="em-footer-tag">— その時、真っ先に駆けつける。 —</p>
        <div className="em-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS EMERGENCY」という<u>実在しない仮想災害復旧会社</u>のデザイン見本です。<br/>
          会社名・住所・電話番号・出動実績・対応エリア・班員数はすべて<u>架空</u>です。<br/>
          <b>実際に災害に遭遇した際は、各自治体や110/119にご連絡ください。</b>
        </div>
        <p className="em-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="em-floating-warning">
        <span className="em-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想災害復旧会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.em-root {
  --em-bg: #0a0a0a;
  --em-bg2: #181816;
  --em-red: #e63946;
  --em-red-bright: #ff4b56;
  --em-yellow: #f4d03f;
  --em-fg: #e8e8e8;
  --em-pink: #ec4899;
  background: var(--em-bg);
  color: var(--em-fg);
  font-family: "Helvetica Neue", "Noto Sans JP", sans-serif;
  min-height: 100vh;
}
.em-root *, .em-root *::before, .em-root *::after { box-sizing: border-box; }

.em-warning { position: sticky; top: 0; z-index: 50; background: #000; color: #fff; border-bottom: 2px solid var(--em-pink); }
.em-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.em-warning-pill { background: var(--em-pink); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.em-warning-text { flex: 1; min-width: 0; }
.em-warning-emph { color: var(--em-pink); }
.em-warning-back { background: #fff; color: #000; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.em-warning-strip { background: var(--em-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.em-status-bar { position: sticky; top: 76px; z-index: 49; display: flex; align-items: center; gap: 16px; padding: 8px 24px; background: var(--em-red); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; font-family: "JetBrains Mono", monospace; overflow-x: auto; white-space: nowrap; }
.em-status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--em-yellow); animation: em-blink 1s ease-in-out infinite; flex-shrink: 0; }
.em-status-time i { font-style: normal; color: var(--em-yellow); }
.em-status-sep { width: 1px; height: 12px; background: rgba(255,255,255,0.4); }
.em-status-fake { color: var(--em-yellow); font-size: 10px; }
@keyframes em-blink { 50% { opacity: 0.3; } }

.em-header { position: sticky; top: 114px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 16px 28px; background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--em-red); }
.em-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--em-fg); }
.em-logo-mark { position: relative; width: 40px; height: 40px; color: var(--em-red); }
.em-logo-mark svg { position: relative; z-index: 2; }
.em-logo-pulse { position: absolute; inset: 0; border-radius: 50%; background: var(--em-red); opacity: 0.4; animation: em-pulse 2s ease-out infinite; }
.em-logo-text strong { display: block; font-size: 15px; font-weight: 800; letter-spacing: 0.08em; }
.em-logo-text span { display: block; font-size: 10px; color: rgba(232,232,232,0.55); }
.em-nav { display: none; gap: 28px; margin-left: auto; }
.em-nav a { color: var(--em-fg); text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; transition: color .2s; }
.em-nav a:hover { color: var(--em-red-bright); }
.em-cta-btn { display: none; align-items: center; gap: 10px; padding: 12px 22px; background: var(--em-red); color: #fff; font-weight: 800; font-size: 12px; letter-spacing: 0.1em; text-decoration: none; clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%); padding-left: 32px; padding-right: 32px; transition: all .25s; }
.em-cta-btn:hover { background: var(--em-red-bright); }
.em-cta-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--em-yellow); animation: em-blink 1s ease-in-out infinite; }
.em-burger { margin-left: auto; background: var(--em-red); border: none; width: 40px; height: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; }
.em-burger span { display: block; width: 18px; height: 2px; background: #fff; transition: transform .25s; }
.em-burger span.is-open:first-child { transform: translateY(3.5px) rotate(45deg); }
.em-burger span.is-open:last-child { transform: translateY(-3.5px) rotate(-45deg); }
@media (min-width: 900px) {
  .em-nav { display: flex; }
  .em-cta-btn { display: inline-flex; }
  .em-burger { display: none; }
}
.em-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--em-bg); padding: 24px; display: flex; border-bottom: 1px solid var(--em-red); }

.em-hero { position: relative; min-height: 88vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; background: var(--em-bg); }
.em-hero-bg { position: absolute; inset: 0; }
.em-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.6) brightness(0.3); }
.em-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(10,10,10,0.95), rgba(10,10,10,0.6)); }
.em-hero-stripes { position: absolute; inset: 0; background: repeating-linear-gradient(135deg, transparent 0 40px, rgba(230,57,70,0.05) 40px 42px); }
.em-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(230,57,70,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.06) 1px, transparent 1px); background-size: 50px 50px; mask: radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%); }
.em-hero-badge { position: absolute; top: 24px; right: 24px; background: var(--em-pink); color: #fff; padding: 6px 14px; font-size: 10px; font-weight: 800; z-index: 5; }
.em-hero-content { position: relative; z-index: 10; max-width: 800px; }
.em-hero-alert { display: inline-flex; align-items: center; gap: 12px; padding: 8px 18px; background: rgba(230,57,70,0.15); border: 1px solid var(--em-red); color: var(--em-red-bright); font-size: 11px; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 28px; font-family: "JetBrains Mono", monospace; }
.em-alert-light { width: 10px; height: 10px; border-radius: 50%; background: var(--em-red); box-shadow: 0 0 12px var(--em-red); animation: em-blink 0.8s ease-in-out infinite; }
.em-alert-large { width: 16px; height: 16px; box-shadow: 0 0 20px var(--em-red); }
.em-hero-title { font-size: clamp(48px, 9vw, 128px); font-weight: 900; line-height: 1; letter-spacing: -0.03em; margin: 0 0 28px; color: #fff; }
.em-hero-title span { display: block; opacity: 0; transform: translateY(40px); animation: em-rise 1s cubic-bezier(.2,.7,.2,1) forwards; }
.em-hero-title span:nth-child(2) { animation-delay: .2s; }
.em-hero-title span:nth-child(3) { animation-delay: .4s; }
.em-hero-title em { font-style: normal; color: var(--em-red-bright); }
.em-hero-sub { font-size: clamp(15px, 1.5vw, 18px); line-height: 1.9; color: rgba(232,232,232,0.85); margin: 0 0 36px; max-width: 600px; }
.em-hero-sub b { color: var(--em-yellow); }
.em-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.em-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 28px; font-weight: 800; font-size: 13px; letter-spacing: 0.1em; text-decoration: none; transition: all .25s; font-family: "Helvetica Neue", sans-serif; }
.em-btn-red { background: var(--em-red); color: #fff; clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 100%); padding-left: 36px; padding-right: 36px; position: relative; }
.em-btn-red:hover { background: var(--em-red-bright); }
.em-btn-pulse { position: absolute; inset: 0; clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 100%); border: 2px solid var(--em-red-bright); animation: em-pulse-border 1.5s ease-out infinite; }
.em-btn-ghost { color: var(--em-fg); border: 2px solid var(--em-fg); }
.em-btn-ghost:hover { background: var(--em-fg); color: #000; }

.em-hero-radar { position: absolute; bottom: 40px; right: 40px; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%); border: 1px solid rgba(230,57,70,0.3); z-index: 5; }
.em-radar-sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg, rgba(230,57,70,0.6) 60deg, transparent 90deg); animation: em-spin 3.5s linear infinite; }
.em-radar-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(230,57,70,0.3); }
.em-ring-1 { inset: 25%; }
.em-ring-2 { inset: 12%; }
.em-ring-3 { inset: 38%; }
.em-radar-center { position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; background: var(--em-red-bright); border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 16px var(--em-red); }
.em-radar-label { position: absolute; bottom: -6px; right: -6px; font-size: 9px; color: var(--em-red-bright); font-weight: 800; letter-spacing: 0.2em; text-align: right; line-height: 1.3; font-family: monospace; }
@media (max-width: 700px) { .em-hero-radar { width: 140px; height: 140px; bottom: 24px; right: 24px; } }

.em-services, .em-dispatch, .em-flow, .em-cta { padding: 110px 32px; }
.em-section-head { text-align: center; max-width: 800px; margin: 0 auto 56px; }
.em-eyebrow { display: inline-block; font-size: 11px; letter-spacing: 0.25em; color: var(--em-red-bright); font-weight: 800; margin-bottom: 16px; font-family: monospace; }
.em-eyebrow-light { color: var(--em-yellow); }
.em-h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; line-height: 1.2; letter-spacing: -0.02em; margin: 0; color: #fff; }
.em-h2 em { font-style: normal; color: var(--em-red-bright); }
.em-h2-light { color: #fff; }
.em-fake { color: var(--em-yellow); font-weight: 700; }

.em-services { background: var(--em-bg); }
.em-services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; max-width: 1280px; margin: 0 auto; }
.em-service { position: relative; padding: 32px 24px; background: var(--em-bg2); border: 1px solid rgba(230,57,70,0.25); transition: all .3s; }
.em-service:hover { border-color: var(--em-red); background: rgba(230,57,70,0.05); transform: translateY(-4px); }
.em-service-corner { position: absolute; top: 0; right: 0; width: 24px; height: 24px; border-top: 2px solid var(--em-red); border-right: 2px solid var(--em-red); }
.em-service-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.em-service-code { font-family: monospace; font-size: 10px; color: var(--em-red-bright); letter-spacing: 0.2em; font-weight: 800; }
.em-service-ic { font-size: 32px; }
.em-service h3 { font-size: 18px; font-weight: 800; margin: 0 0 10px; color: #fff; }
.em-service h3 small { font-size: 10px; color: var(--em-pink); margin-left: 6px; font-weight: 500; }
.em-service p { font-size: 13px; line-height: 1.8; color: rgba(232,232,232,0.7); margin: 0 0 16px; }
.em-service-tag { font-family: monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--em-yellow); padding-top: 12px; border-top: 1px solid rgba(230,57,70,0.2); }

.em-dispatch { background: linear-gradient(180deg, var(--em-bg) 0%, var(--em-bg2) 100%); }
.em-dispatch-table { max-width: 1100px; margin: 0 auto; background: var(--em-bg); border: 1px solid rgba(230,57,70,0.3); padding: 0; }
.em-table-head, .em-table-row { display: grid; grid-template-columns: 1.2fr 1fr 1.4fr 1fr 1fr; gap: 16px; padding: 16px 24px; font-size: 12px; font-family: monospace; letter-spacing: 0.1em; }
.em-table-head { background: var(--em-red); color: #fff; font-weight: 800; font-size: 11px; }
.em-table-row { border-bottom: 1px solid rgba(230,57,70,0.15); transition: background .2s; }
.em-table-row:hover { background: rgba(230,57,70,0.06); }
.em-row-code { color: var(--em-red-bright); font-weight: 800; }
.em-row-type { color: var(--em-yellow); }
.em-row-status { color: #4ade80; font-weight: 800; }
.em-table-fake { padding: 16px 24px; margin: 0; font-size: 12px; color: var(--em-yellow); border-top: 1px solid rgba(230,57,70,0.3); }
.em-table-fake b { color: var(--em-pink); }
@media (max-width: 700px) {
  .em-table-head { display: none; }
  .em-table-row { grid-template-columns: 1fr; gap: 4px; padding: 12px 16px; font-size: 11px; }
}

.em-flow { background: var(--em-bg); }
.em-flow-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; max-width: 1280px; margin: 0 auto; position: relative; }
.em-flow-step { position: relative; padding: 28px 20px; background: var(--em-bg2); border-left: 4px solid var(--em-red); text-align: center; }
.em-flow-time { font-family: monospace; font-size: 28px; font-weight: 900; color: var(--em-red-bright); letter-spacing: -0.02em; line-height: 1; }
.em-flow-time small { display: block; font-size: 9px; color: var(--em-pink); margin-top: 4px; letter-spacing: 0.1em; }
.em-flow-dot { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: var(--em-red); color: #fff; font-weight: 900; font-size: 13px; margin: 16px 0 12px; }
.em-flow-step h3 { font-size: 15px; font-weight: 800; margin: 0 0 8px; color: #fff; }
.em-flow-step p { font-size: 12px; color: rgba(232,232,232,0.7); line-height: 1.7; margin: 0; }

.em-cta { background: linear-gradient(135deg, var(--em-red) 0%, #8b1a25 100%); color: #fff; text-align: center; position: relative; overflow: hidden; }
.em-cta-bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 40px 40px; }
.em-cta-inner { position: relative; max-width: 800px; margin: 0 auto; }
.em-cta-alert { display: inline-flex; align-items: center; gap: 14px; padding: 10px 20px; background: rgba(0,0,0,0.4); border: 1px solid #fff; color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.25em; margin-bottom: 28px; font-family: monospace; }
.em-cta-h { font-size: clamp(40px, 7vw, 96px); font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; margin: 0 0 24px; color: #fff; }
.em-cta-h em { font-style: normal; color: var(--em-yellow); }
.em-cta p { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.9); margin: 0 0 40px; }
.em-cta-phone { position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: 4px; padding: 32px 56px; background: #000; color: #fff; text-decoration: none; margin-bottom: 48px; transition: all .25s; }
.em-cta-phone:hover { background: var(--em-bg2); transform: scale(1.04); }
.em-cta-phone-pulse { position: absolute; inset: 0; border: 2px solid var(--em-yellow); animation: em-pulse-border 1.6s ease-out infinite; }
.em-cta-phone strong { font-family: monospace; font-size: clamp(32px, 5vw, 56px); font-weight: 900; letter-spacing: 0.05em; color: var(--em-yellow); }
.em-cta-phone span { font-size: 12px; letter-spacing: 0.2em; font-weight: 700; }
.em-cta-phone small { color: var(--em-pink); margin-left: 8px; font-size: 10px; }
.em-cta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.3); margin: 0; text-align: left; }
.em-cta-info dt { font-size: 10px; color: var(--em-yellow); letter-spacing: 0.2em; margin-bottom: 6px; font-family: monospace; font-weight: 800; }
.em-cta-info dd { margin: 0; font-size: 14px; color: rgba(255,255,255,0.9); }

.em-footer { padding: 64px 32px 32px; background: #000; color: #f5f5f5; text-align: center; border-top: 2px solid var(--em-red); }
.em-footer-mark { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 12px; color: var(--em-red); }
.em-footer-logo { width: 32px; height: 32px; }
.em-footer-mark strong { font-size: 18px; font-weight: 900; letter-spacing: 0.1em; color: #fff; }
.em-footer-tag { font-size: 13px; color: var(--em-yellow); margin: 0 0 28px; font-family: monospace; letter-spacing: 0.1em; }
.em-footer-disclaimer { max-width: 720px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.15); border: 1px solid var(--em-pink); color: rgba(255,255,255,0.9); font-size: 12px; line-height: 1.8; }
.em-footer-disclaimer strong { color: var(--em-pink); }
.em-footer-disclaimer b { color: var(--em-yellow); }
.em-footer-cr { font-size: 11px; color: rgba(245,245,245,0.4); font-family: monospace; }

.em-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--em-pink); color: #fff; padding: 10px 16px; border-radius: 4px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(236,72,153,0.4); max-width: 260px; }
.em-floating-warning-icon { background: #fff; color: var(--em-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.em-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.em-reveal.is-visible { opacity: 1; transform: translateY(0); }

@keyframes em-rise { to { opacity: 1; transform: translateY(0); } }
@keyframes em-pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
@keyframes em-pulse-border { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.1); } }
@keyframes em-spin { to { transform: rotate(360deg); } }
`
