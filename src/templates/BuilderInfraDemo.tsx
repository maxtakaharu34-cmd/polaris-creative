import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS INFRA — 土木・公共インフラ
   技術: SVGパス描画アニメ + 日本地図ドット + 重厚タイポ
   テイスト: 公共事業・土木・橋・トンネル・道路
   ============================================================ */

export default function BuilderInfraDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.in-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // 日本47都道府県の主要拠点を表す散在ドット
  const dots = [
    { x: 20, y: 80, n: 1 }, { x: 25, y: 75, n: 2 }, { x: 30, y: 70, n: 3 },
    { x: 22, y: 65, n: 4 }, { x: 28, y: 62, n: 5 }, { x: 35, y: 58, n: 6 },
    { x: 26, y: 55, n: 7 }, { x: 33, y: 50, n: 8 }, { x: 40, y: 48, n: 9 },
    { x: 30, y: 45, n: 10 }, { x: 38, y: 42, n: 11 }, { x: 45, y: 40, n: 12 },
    { x: 36, y: 38, n: 13 }, { x: 42, y: 35, n: 14 }, { x: 50, y: 33, n: 15 },
    { x: 44, y: 30, n: 16 }, { x: 52, y: 28, n: 17 }, { x: 58, y: 26, n: 18 },
    { x: 48, y: 24, n: 19 }, { x: 56, y: 22, n: 20 }, { x: 64, y: 20, n: 21 },
    { x: 52, y: 18, n: 22 }, { x: 60, y: 16, n: 23 }, { x: 68, y: 14, n: 24 },
    { x: 56, y: 14, n: 25 }, { x: 65, y: 12, n: 26 }, { x: 72, y: 10, n: 27 },
    { x: 60, y: 8, n: 28 }, { x: 68, y: 8, n: 29 }, { x: 76, y: 8, n: 30 },
  ]

  return (
    <div className="in-root">
      <style>{cssText}</style>

      <div className="in-warning">
        <div className="in-warning-row">
          <span className="in-warning-pill">SAMPLE</span>
          <span className="in-warning-text">⚠️ <b>POLARIS INFRA</b> は<b className="in-warning-emph">実在しない仮想土木会社</b>です。デザイン見本。</span>
          <a href="#hp" className="in-warning-back">← 戻る</a>
        </div>
        <div className="in-warning-strip">⚠️ 注意：会社名・住所・電話・工事実績はすべて<u>架空</u>です。</div>
      </div>

      <header className="in-header">
        <a href="#" className="in-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="in-logo-mark" aria-hidden>
            <path d="M4 28 L20 14 L36 28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <circle cx="20" cy="14" r="3" fill="currentColor"/>
            <line x1="6" y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <div className="in-logo-text">
            <strong>POLARIS INFRA</strong>
            <span>ポラリス土木（架空）</span>
          </div>
        </a>
        <nav className={`in-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#scope" onClick={() => setMenuOpen(false)}>事業領域</a>
          <a href="#map" onClick={() => setMenuOpen(false)}>拠点</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>実績</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>お問合せ</a>
        </nav>
        <button className="in-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="in-cta-btn">公共入札問合せ（仮）</a>
      </header>

      <section className="in-hero">
        <div className="in-hero-bg">
          <img src="https://images.unsplash.com/photo-1517031350709-19e7df358b75?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="in-hero-overlay"/>
        <div className="in-hero-grid" aria-hidden>
          <span/><span/><span/><span/><span/><span/>
        </div>
        <div className="in-hero-badge">※ 架空のデザイン見本</div>
        <div className="in-hero-content">
          <div className="in-hero-mark">
            <svg viewBox="0 0 60 60" aria-hidden>
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" fill="none"/>
              <text x="30" y="35" textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor" fontFamily="serif">特建</text>
            </svg>
            <span>国土交通大臣許可<br/>特定建設業（土木一式）</span>
          </div>
          <h1 className="in-hero-title">
            <span>道を、</span>
            <span>橋を、</span>
            <span>水を、</span>
            <span><em>未来へ。</em></span>
          </h1>
          <p className="in-hero-sub">
            創業47年（架空）。橋梁・トンネル・河川・道路・港湾。<br/>
            社会インフラを支える<b>総合土木建設</b>。
          </p>
          <div className="in-hero-btns">
            <a href="#works" className="in-btn in-btn-orange">施工実績を見る →</a>
            <a href="#contact" className="in-btn in-btn-ghost">公共入札 問合せ</a>
          </div>
        </div>
      </section>

      <section id="scope" className="in-scope">
        <div className="in-section-head in-reveal">
          <span className="in-eyebrow">▍ 事業領域</span>
          <h2 className="in-h2">社会基盤の、<em>あらゆる現場へ。</em></h2>
        </div>
        <div className="in-scope-grid">
          {[
            { n: '01', t: '橋梁', en: 'BRIDGES', d: '長大橋・高架橋・歩道橋の新設・補修・架替工事（架空）' },
            { n: '02', t: 'トンネル', en: 'TUNNELS', d: 'NATM工法・シールド工法・矩形掘削（架空）' },
            { n: '03', t: '道路', en: 'ROADS', d: '高速道路・国道・市町村道路の舗装・拡幅・補修（架空）' },
            { n: '04', t: '河川', en: 'RIVERS', d: '堤防・護岸・排水機場・浚渫工事（架空）' },
            { n: '05', t: '港湾', en: 'PORTS', d: '岸壁・防波堤・埋立・浚渫（架空）' },
            { n: '06', t: '上下水道', en: 'WATER', d: '管路工事・浄水場・下水処理場（架空）' },
          ].map((s) => (
            <div key={s.n} className="in-scope-card in-reveal">
              <div className="in-scope-num">{s.n}</div>
              <div className="in-scope-en">— {s.en}</div>
              <h3>{s.t}<small>※架空</small></h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="map" className="in-map">
        <div className="in-section-head in-reveal">
          <span className="in-eyebrow">▍ 全国の拠点</span>
          <h2 className="in-h2">全国<em>47都道府県</em>、<br/>稼働中。</h2>
          <p className="in-fake-pill">※ 拠点・施工件数はすべて<b>架空</b>のサンプルです。</p>
        </div>
        <div className="in-map-wrap in-reveal">
          <svg viewBox="0 0 100 90" ref={ref} className="in-map-svg" aria-hidden>
            {dots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r="0.6" fill="#ff8a3d" opacity="0.4" className="in-map-dot-pulse" style={{ animationDelay: `${i * 0.04}s` }}/>
                <circle cx={d.x} cy={d.y} r="0.35" fill="#ff8a3d"/>
              </g>
            ))}
            <path d="M28,62 L36,42 L52,28 L65,16" stroke="#ff8a3d" strokeWidth="0.25" fill="none" opacity="0.6" strokeDasharray="0.5 0.4"/>
          </svg>
          <div className="in-map-stats">
            <div><strong>47</strong><span>都道府県<small>※架空</small></span></div>
            <div><strong>128</strong><span>事業所<small>※架空</small></span></div>
            <div><strong>3,400+</strong><span>累計施工<small>※架空</small></span></div>
            <div><strong>2,180</strong><span>従業員<small>※架空</small></span></div>
          </div>
        </div>
      </section>

      <section id="works" className="in-works">
        <div className="in-section-head in-reveal">
          <span className="in-eyebrow">▍ 施工実績</span>
          <h2 className="in-h2">国の、街の、<em>背骨を担う。</em></h2>
        </div>
        <div className="in-works-table in-reveal">
          <div className="in-works-row in-works-head">
            <span>YEAR</span><span>TYPE</span><span>PROJECT</span><span>LOCATION</span><span>SCALE</span>
          </div>
          {[
            { y: '2024', t: '橋梁', p: '〇〇川大橋 架替（架空）', l: '新潟県', s: '全長 420m' },
            { y: '2024', t: 'トンネル', p: '〇〇高速道路 〇〇トンネル（架空）', l: '長野県', s: '延長 2.8km' },
            { y: '2023', t: '河川', p: '〇〇川 堤防整備（架空）', l: '岩手県', s: '延長 5.6km' },
            { y: '2023', t: '道路', p: '国道〇号 拡幅工事（架空）', l: '熊本県', s: '延長 8.4km' },
            { y: '2022', t: '港湾', p: '〇〇港 岸壁整備（架空）', l: '北海道', s: '延長 320m' },
            { y: '2022', t: 'トンネル', p: '〇〇地下鉄〇号線 延伸（架空）', l: '東京都', s: '延長 4.2km' },
          ].map((r, i) => (
            <div key={i} className="in-works-row">
              <span className="in-row-y">{r.y}</span>
              <span className="in-row-t">{r.t}</span>
              <strong>{r.p}</strong>
              <span>{r.l}</span>
              <span className="in-row-s">{r.s}</span>
            </div>
          ))}
        </div>
        <p className="in-fake-note">※ 以上の施工実績はすべて<b>架空</b>のサンプル表示です。</p>
      </section>

      <section id="contact" className="in-cta">
        <div className="in-cta-inner in-reveal">
          <span className="in-eyebrow">▍ お問い合わせ</span>
          <h2 className="in-cta-h">公共入札・民間工事、<br/><em>承ります。</em></h2>
          <p>橋梁・トンネル・道路・河川・港湾の工事ご相談を、全国の事業所で承ります（架空）。<br/><span className="in-fake">※ 動作しません。仮想土木会社のデザイン見本です。</span></p>
          <div className="in-cta-btns">
            <a href="#" className="in-btn in-btn-orange">公共入札相談（仮）→</a>
            <a href="#" className="in-btn in-btn-ghost-light">資料請求（仮）</a>
          </div>
          <dl className="in-cta-info">
            <div><dt>本社（架空）</dt><dd>東京都中央区〇〇 0-0-0 ※実在しません</dd></div>
            <div><dt>TEL（架空）</dt><dd>03-0000-0000</dd></div>
            <div><dt>建設業許可（架空）</dt><dd>国土交通大臣許可（特-00）第00000号</dd></div>
            <div><dt>事業所数（架空）</dt><dd>全国 128 事業所</dd></div>
          </dl>
        </div>
      </section>

      <footer className="in-footer">
        <p className="in-footer-logo">POLARIS INFRA<em>（架空）</em></p>
        <p className="in-footer-tag">— 道を、橋を、水を、未来へ。 —</p>
        <div className="in-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS INFRA」という<u>実在しない仮想土木会社</u>のデザイン見本です。<br/>
          会社名・住所・電話・施工実績・拠点数・許可番号はすべて<u>架空</u>です。
        </div>
        <p className="in-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="in-floating-warning">
        <span className="in-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想土木会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.in-root { --in-bg: #f5f2ec; --in-bg2: #1c1814; --in-orange: #ff8a3d; --in-fg: #1c1814; --in-fg-soft: rgba(28,24,20,0.65); --in-line: rgba(28,24,20,0.15); --in-pink: #d4506a; background: var(--in-bg); color: var(--in-fg); font-family: "Hiragino Sans", "Yu Gothic", sans-serif; min-height: 100vh; }
.in-root *, .in-root *::before, .in-root *::after { box-sizing: border-box; }
.in-warning { position: sticky; top: 0; z-index: 50; background: var(--in-bg2); color: #fff; border-bottom: 2px solid var(--in-pink); }
.in-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.in-warning-pill { background: var(--in-pink); color: #fff; padding: 2px 10px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.in-warning-text { flex: 1; min-width: 0; } .in-warning-emph { color: var(--in-pink); }
.in-warning-back { background: #fff; color: var(--in-bg2); padding: 4px 12px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.in-warning-strip { background: var(--in-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.in-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 16px 28px; background: rgba(245,242,236,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--in-line); }
.in-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--in-fg); }
.in-logo-mark { width: 38px; height: 38px; color: var(--in-orange); }
.in-logo-text strong { display: block; font-size: 15px; font-weight: 900; letter-spacing: 0.08em; }
.in-logo-text span { display: block; font-size: 10px; color: var(--in-fg-soft); }
.in-nav { display: none; gap: 28px; margin-left: auto; }
.in-nav a { color: var(--in-fg); text-decoration: none; font-size: 13px; font-weight: 800; transition: color .2s; }
.in-nav a:hover { color: var(--in-orange); }
.in-cta-btn { display: none; padding: 12px 22px; background: var(--in-bg2); color: var(--in-orange); font-weight: 800; font-size: 12px; letter-spacing: 0.05em; text-decoration: none; transition: all .25s; clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%); padding-left: 24px; padding-right: 24px; }
.in-cta-btn:hover { background: var(--in-orange); color: var(--in-bg2); }
.in-burger { margin-left: auto; background: var(--in-bg2); border: none; width: 38px; height: 38px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; cursor: pointer; }
.in-burger span { display: block; width: 18px; height: 2px; background: var(--in-orange); transition: transform .25s; }
.in-burger span.is-open:first-child { transform: translateY(3px) rotate(45deg); }
.in-burger span.is-open:last-child { transform: translateY(-3px) rotate(-45deg); }
@media (min-width: 900px) { .in-nav { display: flex; } .in-cta-btn { display: inline-flex; } .in-burger { display: none; } }
.in-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--in-bg); padding: 24px; display: flex; }

.in-hero { position: relative; min-height: 92vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; background: var(--in-bg2); }
.in-hero-bg { position: absolute; inset: 0; }
.in-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.5) brightness(0.45) contrast(1.15); }
.in-hero-overlay { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(28,24,20,0.88) 0%, rgba(28,24,20,0.5) 70%, transparent 100%); }
.in-hero-grid { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(6, 1fr); pointer-events: none; }
.in-hero-grid span { border-right: 1px solid rgba(255,138,61,0.06); }
.in-hero-grid span:last-child { border-right: none; }
.in-hero-badge { position: absolute; top: 24px; right: 24px; background: var(--in-pink); color: #fff; padding: 6px 14px; font-size: 10px; font-weight: 800; z-index: 5; }
.in-hero-content { position: relative; z-index: 10; max-width: 900px; color: #fff; }
.in-hero-mark { display: inline-flex; align-items: center; gap: 14px; padding: 12px 20px; background: rgba(255,138,61,0.08); border: 1px solid var(--in-orange); color: var(--in-orange); margin-bottom: 32px; }
.in-hero-mark svg { width: 52px; height: 52px; flex-shrink: 0; }
.in-hero-mark span { font-size: 11px; line-height: 1.6; font-weight: 700; letter-spacing: 0.05em; }
.in-hero-title { font-size: clamp(48px, 9vw, 140px); font-weight: 900; line-height: 1.05; letter-spacing: 0.02em; margin: 0 0 32px; }
.in-hero-title span { display: inline-block; margin-right: 0.05em; opacity: 0; transform: translateY(40px); animation: in-rise 1s cubic-bezier(.2,.7,.2,1) forwards; }
.in-hero-title span:nth-child(2) { animation-delay: .15s; } .in-hero-title span:nth-child(3) { animation-delay: .3s; } .in-hero-title span:nth-child(4) { animation-delay: .45s; }
.in-hero-title em { font-style: normal; color: var(--in-orange); }
.in-hero-sub { font-size: clamp(14px, 1.5vw, 18px); line-height: 2; color: rgba(255,255,255,0.85); margin: 0 0 36px; max-width: 600px; }
.in-hero-sub b { color: var(--in-orange); border-bottom: 2px solid var(--in-orange); padding-bottom: 2px; }
.in-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.in-btn { display: inline-flex; align-items: center; padding: 16px 30px; font-weight: 800; font-size: 13px; letter-spacing: 0.05em; text-decoration: none; transition: all .25s; }
.in-btn-orange { background: var(--in-orange); color: var(--in-bg2); clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 100%); padding-left: 36px; padding-right: 36px; }
.in-btn-orange:hover { background: #fff; }
.in-btn-ghost { color: var(--in-fg); border: 2px solid var(--in-fg); }
.in-btn-ghost:hover { background: var(--in-fg); color: #fff; }
.in-btn-ghost-light { color: #fff; border: 2px solid #fff; }
.in-btn-ghost-light:hover { background: #fff; color: var(--in-bg2); }

.in-scope, .in-map, .in-works, .in-cta { padding: 110px 32px; }
.in-section-head { text-align: center; max-width: 800px; margin: 0 auto 56px; }
.in-eyebrow { display: inline-block; font-size: 11px; letter-spacing: 0.25em; color: var(--in-orange); font-weight: 800; margin-bottom: 16px; }
.in-h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; line-height: 1.3; letter-spacing: 0.02em; margin: 0; }
.in-h2 em { font-style: normal; color: var(--in-orange); }
.in-section-head p { font-size: 14px; line-height: 1.9; color: var(--in-fg-soft); margin: 16px 0 0; }
.in-fake { color: var(--in-pink); font-weight: 700; }
.in-fake-pill { display: inline-block; padding: 5px 16px; background: rgba(212,80,106,0.1); border: 1px solid var(--in-pink); color: var(--in-pink); font-size: 12px; font-weight: 700; margin-top: 12px; }
.in-fake-pill b { color: var(--in-pink); }
.in-fake-note { text-align: center; font-size: 12px; color: var(--in-pink); font-weight: 700; margin: 24px 0 0; }
.in-fake-note b { color: var(--in-pink); }

.in-scope-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1px; max-width: 1280px; margin: 0 auto; background: var(--in-line); border: 1px solid var(--in-line); }
.in-scope-card { padding: 36px 28px; background: var(--in-bg); transition: all .3s; position: relative; }
.in-scope-card:hover { background: var(--in-bg2); color: #fff; }
.in-scope-card:hover .in-scope-num { color: var(--in-orange); }
.in-scope-card:hover h3 { color: #fff; }
.in-scope-card:hover p { color: rgba(255,255,255,0.75); }
.in-scope-num { font-family: "Times New Roman", serif; font-size: 48px; font-weight: 900; color: var(--in-orange); line-height: 1; }
.in-scope-en { font-size: 11px; letter-spacing: 0.25em; color: var(--in-fg-soft); margin: 8px 0 16px; font-weight: 800; }
.in-scope-card h3 { font-size: 24px; font-weight: 900; margin: 0 0 12px; }
.in-scope-card h3 small { font-size: 11px; color: var(--in-pink); margin-left: 6px; font-weight: 500; }
.in-scope-card p { font-size: 13px; line-height: 1.8; color: var(--in-fg-soft); margin: 0; transition: color .3s; }

.in-map { background: var(--in-bg2); color: #fff; }
.in-map .in-eyebrow { color: var(--in-orange); }
.in-map .in-h2 { color: #fff; }
.in-map-wrap { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
@media (max-width: 800px) { .in-map-wrap { grid-template-columns: 1fr; } }
.in-map-svg { width: 100%; max-width: 480px; height: auto; aspect-ratio: 10/9; margin: 0 auto; display: block; }
.in-map-dot-pulse { transform-origin: center; animation: in-pulse-dot 2s ease-out infinite; transform-box: fill-box; }
@keyframes in-pulse-dot { 0% { r: 0.6; opacity: 0.6; } 100% { r: 3; opacity: 0; } }
.in-map-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.in-map-stats > div { padding: 28px 24px; background: rgba(255,138,61,0.06); border: 1px solid rgba(255,138,61,0.25); }
.in-map-stats strong { display: block; font-size: clamp(36px, 5vw, 56px); font-weight: 900; color: var(--in-orange); line-height: 1; letter-spacing: -0.02em; font-family: "Times New Roman", serif; }
.in-map-stats span { display: block; font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 10px; font-weight: 700; }
.in-map-stats small { font-size: 9px; color: var(--in-pink); margin-left: 4px; font-weight: 500; }

.in-works { background: var(--in-bg); }
.in-works-table { max-width: 1280px; margin: 0 auto; border-top: 2px solid var(--in-fg); border-bottom: 2px solid var(--in-fg); }
.in-works-row { display: grid; grid-template-columns: 80px 100px 1fr 160px 140px; gap: 16px; padding: 20px 24px; align-items: center; border-bottom: 1px solid var(--in-line); transition: background .2s; }
.in-works-row:last-child { border-bottom: none; }
.in-works-row:hover { background: rgba(255,138,61,0.06); }
.in-works-head { background: var(--in-bg2); color: #fff; font-size: 11px; letter-spacing: 0.2em; font-weight: 800; }
.in-works-head:hover { background: var(--in-bg2); }
.in-works-row strong { font-size: 15px; font-weight: 800; }
.in-row-y { font-family: "Times New Roman", serif; font-size: 22px; font-weight: 900; color: var(--in-orange); }
.in-row-t { font-size: 11px; padding: 4px 10px; background: var(--in-fg); color: #fff; font-weight: 800; letter-spacing: 0.05em; justify-self: start; }
.in-row-s { font-size: 13px; color: var(--in-fg-soft); }
@media (max-width: 800px) {
  .in-works-row { grid-template-columns: 60px 1fr; gap: 8px; padding: 16px; }
  .in-works-row > * { grid-column: 2; }
  .in-row-y { grid-column: 1; grid-row: 1 / span 3; font-size: 18px; }
  .in-works-head { display: none; }
}

.in-cta { background: var(--in-bg2); color: #fff; text-align: center; }
.in-cta .in-eyebrow { color: var(--in-orange); }
.in-cta-h { font-size: clamp(36px, 6vw, 72px); font-weight: 900; line-height: 1.3; margin: 16px 0 24px; color: #fff; }
.in-cta-h em { font-style: normal; color: var(--in-orange); }
.in-cta p { font-size: 15px; line-height: 1.9; color: rgba(255,255,255,0.85); margin: 0 0 36px; }
.in-cta-inner { max-width: 820px; margin: 0 auto; }
.in-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
.in-cta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; padding-top: 32px; border-top: 1px solid rgba(255,138,61,0.3); margin: 0; text-align: left; }
.in-cta-info dt { font-size: 11px; color: var(--in-orange); letter-spacing: 0.15em; margin-bottom: 6px; font-weight: 700; }
.in-cta-info dd { margin: 0; font-size: 14px; color: rgba(255,255,255,0.9); }

.in-footer { padding: 56px 32px 32px; background: #0e0c0a; color: #f5f2ec; text-align: center; border-top: 2px solid var(--in-orange); }
.in-footer-logo { font-size: 18px; font-weight: 900; letter-spacing: 0.15em; margin: 0 0 8px; color: #fff; }
.in-footer-logo em { font-size: 11px; color: rgba(245,242,236,0.5); margin-left: 8px; font-style: normal; font-weight: 400; }
.in-footer-tag { font-size: 13px; color: var(--in-orange); margin: 8px 0 28px; font-weight: 700; }
.in-footer-disclaimer { max-width: 720px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.15); border: 1px solid var(--in-pink); color: rgba(255,255,255,0.85); font-size: 12px; line-height: 1.8; }
.in-footer-disclaimer strong { color: var(--in-pink); }
.in-footer-cr { font-size: 11px; color: rgba(245,242,236,0.35); }

.in-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--in-pink); color: #fff; padding: 10px 16px; border-radius: 4px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; }
.in-floating-warning-icon { background: #fff; color: var(--in-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.in-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.in-reveal.is-visible { opacity: 1; transform: translateY(0); }
@keyframes in-rise { to { opacity: 1; transform: translateY(0); } }
`
