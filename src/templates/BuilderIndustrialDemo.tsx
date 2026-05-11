import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS HEAVY — インダストリアル・重機系
   テイスト: オレンジ×黒 / 重厚・力強い / 施工現場感
   技術: マーキー流れ、カウンター数字、斜めストライプ、ステンシル
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2400&q=85',
  hero2: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=85',
  w1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
  w2: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85',
  w3: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=85',
  w4: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=1600&q=85',
}

export default function BuilderIndustrialDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [counts, setCounts] = useState({ works: 0, years: 0, crew: 0, area: 0 })

  useEffect(() => {
    const targets = { works: 12480, years: 58, crew: 142, area: 47 }
    const dur = 1800
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCounts({
        works: Math.floor(targets.works * ease),
        years: Math.floor(targets.years * ease),
        crew: Math.floor(targets.crew * ease),
        area: Math.floor(targets.area * ease),
      })
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.bi-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="bi-root">
      <style>{cssText}</style>

      <div className="bi-warning">
        <div className="bi-warning-row">
          <span className="bi-warning-pill">SAMPLE</span>
          <span className="bi-warning-text">⚠️ <b>POLARIS HEAVY</b> は<b className="bi-warning-emph">実在しない仮想建設会社</b>です。デザイン見本としてポラリスクリエイティブが作成。</span>
          <a href="#hp" className="bi-warning-back">← 戻る</a>
        </div>
        <div className="bi-warning-strip">⚠️ 注意：会社名・住所・電話番号・施工事例・お客様の声などは<u>すべて架空</u>です。</div>
      </div>

      <header className="bi-header">
        <a href="#" className="bi-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="bi-logo-mark" aria-hidden>
            <polygon points="6,34 20,8 34,34" fill="currentColor"/>
            <polygon points="13,34 20,20 27,34" fill="#0a0a0a"/>
          </svg>
          <div className="bi-logo-text">
            <strong>POLARIS HEAVY</strong>
            <span>ポラリス重建（架空）</span>
          </div>
        </a>
        <nav className={`bi-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>サービス</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>施工実績</a>
          <a href="#equip" onClick={() => setMenuOpen(false)}>保有機材</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>問い合わせ</a>
        </nav>
        <button className="bi-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="tel:000" className="bi-cta-btn">24時間 緊急対応（仮）</a>
      </header>

      {/* Marquee */}
      <div className="bi-marquee">
        <div className="bi-marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              <b>★</b> 24/7 EMERGENCY <b>★</b> コアボーリング <b>★</b> ウォールソー <b>★</b> 道路カッター <b>★</b> 解体・斫り <b>★</b> 創業1968（架空）
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="bi-hero">
        <div className="bi-hero-img" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
        <div className="bi-hero-stripes"/>
        <div className="bi-hero-overlay"/>
        <div className="bi-hero-badge">※ これは架空のデザイン見本です</div>

        <div className="bi-hero-content">
          <div className="bi-hero-tag">
            <span className="bi-dot"/>OPERATING NOW — 関東全域
          </div>
          <h1 className="bi-hero-title">
            <span>BUILD</span>
            <span className="bi-stroke">HARD.</span>
            <span>BUILD</span>
            <span className="bi-orange">RIGHT.</span>
          </h1>
          <p className="bi-hero-sub">
            創業56年（架空）、関東圏12,000件以上の施工実績。<br/>
            コンクリート切断・穿孔・解体の<u>"とにかく早く、確実に"</u>のプロ集団。
          </p>
          <div className="bi-hero-btns">
            <a href="#contact" className="bi-btn bi-btn-orange">無料見積もり（仮）→</a>
            <a href="#works" className="bi-btn bi-btn-outline">施工実績を見る（仮）</a>
          </div>
        </div>

        <div className="bi-hero-side">
          <div className="bi-hero-side-no">No.<br/>01</div>
          <div className="bi-hero-side-l">関東圏 SPECIAL CONSTRUCTION</div>
        </div>
      </section>

      {/* Counter */}
      <section className="bi-counter">
        <div className="bi-counter-item">
          <div className="bi-counter-num">{counts.works.toLocaleString()}</div>
          <div className="bi-counter-label">件 — 累計施工実績<small>（架空）</small></div>
        </div>
        <div className="bi-counter-item">
          <div className="bi-counter-num">{counts.years}</div>
          <div className="bi-counter-label">年 — 創業<small>（架空）</small></div>
        </div>
        <div className="bi-counter-item">
          <div className="bi-counter-num">{counts.crew}</div>
          <div className="bi-counter-label">名 — 技術者<small>（架空）</small></div>
        </div>
        <div className="bi-counter-item">
          <div className="bi-counter-num">{counts.area}</div>
          <div className="bi-counter-label">都道府県 — 対応エリア<small>（架空）</small></div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bi-services">
        <div className="bi-section-head bi-reveal">
          <span className="bi-eyebrow">/ 01 — SERVICES</span>
          <h2 className="bi-mega">事業内容</h2>
          <p className="bi-fake-pill">※ サービス内容はすべて架空のサンプル表示です</p>
        </div>
        <div className="bi-services-list">
          {[
            { num: '01', t: 'ダイヤモンドコアボーリング', en: 'CORE BORING', d: 'コンクリートに精密な円形の穴を空ける専門工法。配管・配線・設備の貫通工事に最適。φ20mm〜φ800mmまで対応。' },
            { num: '02', t: 'ウォールソー切断', en: 'WALL SAWING', d: '壁面・床面の大規模切断工事。建物の解体・改修・開口部新設に対応。最大厚600mmまで対応可能。' },
            { num: '03', t: '道路カッター施工', en: 'ROAD CUTTING', d: 'アスファルト・コンクリート舗装の精密切断。道路工事・配管埋設・補修工事に。緊急対応可。' },
            { num: '04', t: '解体・斫り工事', en: 'DEMOLITION', d: 'ハンドブレーカー・大型重機による解体工事。RC造・S造・コンクリート建造物の安全な解体。' },
          ].map((s) => (
            <div key={s.num} className="bi-service bi-reveal">
              <div className="bi-service-l">
                <div className="bi-service-num">{s.num}</div>
                <div className="bi-service-en">— {s.en}</div>
              </div>
              <div className="bi-service-r">
                <h3>{s.t}<small>（架空）</small></h3>
                <p>{s.d}</p>
                <a href="#" className="bi-service-link">詳しく見る →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Works */}
      <section id="works" className="bi-works">
        <div className="bi-section-head bi-reveal" style={{ color: '#fff' }}>
          <span className="bi-eyebrow" style={{ color: '#ff6b1a' }}>/ 02 — WORKS</span>
          <h2 className="bi-mega">施工実績</h2>
          <p className="bi-fake-pill">※ 施工事例はすべて架空のサンプル表示です</p>
        </div>
        <div className="bi-works-grid">
          {[
            { img: IMG.w1, name: '都市再開発プロジェクト（架空）', tag: 'コアボーリング', y: '2024' },
            { img: IMG.w2, name: 'トンネル改修工事（架空）', tag: 'ウォールソー', y: '2024' },
            { img: IMG.w3, name: '高速道路リニューアル（架空）', tag: '道路カッター', y: '2023' },
            { img: IMG.w4, name: '工場解体工事（架空）', tag: '解体・斫り', y: '2023' },
          ].map((w) => (
            <article key={w.name} className="bi-work bi-reveal">
              <div className="bi-work-img" style={{ backgroundImage: `url("${w.img}")` }}>
                <div className="bi-work-tag">{w.tag}</div>
                <div className="bi-work-stamp">SAMPLE</div>
              </div>
              <div className="bi-work-info">
                <span className="bi-work-y">— {w.y}</span>
                <h3>{w.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Equipment */}
      <section id="equip" className="bi-equip">
        <div className="bi-section-head bi-reveal">
          <span className="bi-eyebrow">/ 03 — EQUIPMENT</span>
          <h2 className="bi-mega">保有機材</h2>
          <p className="bi-fake-pill">※ 機材一覧は架空のサンプル表示です</p>
        </div>
        <ul className="bi-equip-list">
          {[
            { n: '12', l: 'コアドリル', s: 'φ800mm対応' },
            { n: '08', l: 'ウォールソー', s: '最大厚600mm' },
            { n: '15', l: 'ロードカッター', s: '深さ500mm' },
            { n: '24', l: '油圧ブレーカー', s: '0.3t〜2.0t' },
            { n: '06', l: 'ミニショベル', s: '0.8t〜3.0t' },
            { n: '04', l: '集塵機', s: '湿式・乾式対応' },
          ].map((e) => (
            <li key={e.l} className="bi-equip-item bi-reveal">
              <div className="bi-equip-n">{e.n}</div>
              <div>
                <div className="bi-equip-l">{e.l}<small>（架空）</small></div>
                <div className="bi-equip-s">{e.s}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section id="contact" className="bi-cta">
        <div className="bi-cta-img" style={{ backgroundImage: `url("${IMG.hero2}")` }}/>
        <div className="bi-cta-overlay"/>
        <div className="bi-cta-content bi-reveal">
          <span className="bi-eyebrow" style={{ color: '#ff6b1a' }}>/ 04 — CONTACT</span>
          <h2 className="bi-cta-h">急ぎの現場、<br/>まず<em>電話一本</em>。</h2>
          <p>24時間365日、緊急対応。関東全域、最短即日対応。<br/><span className="bi-fake">※ 動作しません。仮想建設会社のデザイン見本です。</span></p>
          <div className="bi-cta-phone">
            <span>緊急ダイヤル（架空）</span>
            <strong>0120-000-000</strong>
          </div>
          <div className="bi-hero-btns">
            <a href="#" className="bi-btn bi-btn-orange">見積もり依頼（仮）→</a>
            <a href="#" className="bi-btn bi-btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>資料請求（仮）</a>
          </div>
        </div>
      </section>

      <footer className="bi-footer">
        <h2 className="bi-footer-mega">POLARIS HEAVY</h2>
        <p className="bi-footer-tag">— BUILD HARD. BUILD RIGHT. —</p>
        <div className="bi-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS HEAVY」という<u>実在しない仮想建設会社</u>のデザイン見本です。<br/>
          会社名・住所・電話番号・施工事例・お客様の声・実績数値などはすべて<u>架空</u>です。
        </div>
        <p className="bi-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="bi-floating-warning">
        <span className="bi-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想建設会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.bi-root {
  --bi-bg: #0a0a0a;
  --bi-bg2: #1a1a1a;
  --bi-fg: #f5f5f0;
  --bi-fg-soft: rgba(245,245,240,0.65);
  --bi-orange: #ff6b1a;
  --bi-yellow: #ffd400;
  --bi-pink: #ec4899;
  background: var(--bi-bg);
  color: var(--bi-fg);
  font-family: "Inter", "Noto Sans JP", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.bi-root *, .bi-root *::before, .bi-root *::after { box-sizing: border-box; }

.bi-warning { position: sticky; top: 0; z-index: 50; background: #1d1d1f; color: #fff; border-bottom: 2px solid var(--bi-pink); }
.bi-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.bi-warning-pill { background: linear-gradient(90deg,#ec4899,#06b6d4); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0; }
.bi-warning-text { flex: 1; min-width: 0; }
.bi-warning-emph { color: var(--bi-pink); }
.bi-warning-back { background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.bi-warning-strip { background: var(--bi-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.bi-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 16px 32px;
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 2px solid var(--bi-orange);
}
.bi-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--bi-fg); }
.bi-logo-mark { width: 36px; height: 36px; color: var(--bi-orange); }
.bi-logo-text strong { display: block; font-size: 14px; font-weight: 900; letter-spacing: 0.08em; line-height: 1.2; }
.bi-logo-text span { display: block; font-size: 10px; color: var(--bi-fg-soft); margin-top: 2px; font-family: "Noto Sans JP", sans-serif; }
.bi-nav { display: flex; gap: 28px; margin-left: auto; font-family: "Noto Sans JP", sans-serif; font-size: 13px; font-weight: 700; }
.bi-nav a { color: var(--bi-fg); text-decoration: none; padding: 8px 0; transition: color .3s; }
.bi-nav a:hover { color: var(--bi-orange); }
.bi-burger { display: none; flex-direction: column; gap: 5px; background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto; }
.bi-burger span { width: 22px; height: 2px; background: var(--bi-fg); transition: all .3s; }
.bi-burger span.is-open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
.bi-burger span.is-open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }
.bi-cta-btn {
  background: var(--bi-orange); color: #000;
  padding: 12px 18px; font-size: 12px; font-weight: 900; letter-spacing: 0.05em;
  text-decoration: none; transition: all .3s;
  font-family: "Noto Sans JP", sans-serif;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
}
.bi-cta-btn:hover { background: var(--bi-yellow); }

/* Marquee */
.bi-marquee { overflow: hidden; background: var(--bi-orange); color: #000; padding: 10px 0; border-bottom: 2px solid #000; }
.bi-marquee-track { display: flex; gap: 40px; white-space: nowrap; animation: bi-marquee 30s linear infinite; font-weight: 900; font-size: 13px; letter-spacing: 0.1em; }
.bi-marquee-track span b { color: #fff; padding: 0 8px; }
@keyframes bi-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* Hero */
.bi-hero { position: relative; min-height: 90vh; overflow: hidden; padding: 80px 40px; display: flex; align-items: center; }
.bi-hero-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: grayscale(0.4) contrast(1.2); }
.bi-hero-stripes { position: absolute; inset: 0; background: repeating-linear-gradient(135deg, transparent 0, transparent 40px, rgba(255,107,26,0.08) 40px, rgba(255,107,26,0.08) 42px); }
.bi-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.3) 100%); }
.bi-hero-badge { position: absolute; top: 24px; right: 24px; z-index: 5; background: var(--bi-pink); color: #fff; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px; }
.bi-hero-content { position: relative; z-index: 2; max-width: 1100px; }
.bi-hero-tag { display: inline-flex; align-items: center; gap: 10px; font-size: 11px; letter-spacing: 0.2em; color: var(--bi-orange); font-weight: 800; margin-bottom: 24px; padding: 8px 14px; border: 1px solid var(--bi-orange); }
.bi-dot { width: 8px; height: 8px; background: var(--bi-orange); border-radius: 50%; animation: bi-blink 1.2s ease-in-out infinite; }
@keyframes bi-blink { 50% { opacity: 0.3; } }
.bi-hero-title { font-family: "Inter", "Anton", sans-serif; font-weight: 900; font-size: clamp(56px, 11vw, 180px); line-height: 0.92; letter-spacing: -0.04em; margin: 0 0 32px; text-transform: uppercase; }
.bi-hero-title span { display: block; }
.bi-hero-title .bi-stroke { color: transparent; -webkit-text-stroke: 3px var(--bi-fg); }
.bi-hero-title .bi-orange { color: var(--bi-orange); }
.bi-hero-sub { font-family: "Noto Sans JP", sans-serif; font-size: 16px; line-height: 2; color: var(--bi-fg-soft); margin: 0 0 32px; max-width: 600px; }
.bi-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.bi-btn { display: inline-flex; align-items: center; padding: 16px 28px; font-size: 13px; font-weight: 800; text-decoration: none; transition: all .3s; font-family: "Noto Sans JP", sans-serif; letter-spacing: 0.05em; }
.bi-btn-orange { background: var(--bi-orange); color: #000; clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 100%); padding: 16px 32px; }
.bi-btn-orange:hover { background: var(--bi-yellow); }
.bi-btn-outline { background: transparent; color: var(--bi-fg); border: 2px solid var(--bi-fg); }
.bi-btn-outline:hover { background: var(--bi-fg); color: #000; }

.bi-hero-side { position: absolute; right: 40px; top: 50%; transform: translateY(-50%) rotate(180deg); writing-mode: vertical-rl; z-index: 2; display: flex; align-items: center; gap: 24px; }
.bi-hero-side-no { font-family: "Inter", serif; font-weight: 900; font-size: 56px; line-height: 1; color: var(--bi-orange); transform: rotate(180deg); writing-mode: horizontal-tb; }
.bi-hero-side-l { font-size: 11px; letter-spacing: 0.4em; color: var(--bi-fg-soft); }

/* Counter */
.bi-counter { display: grid; grid-template-columns: repeat(4, 1fr); background: var(--bi-bg2); border-top: 2px solid var(--bi-orange); border-bottom: 2px solid var(--bi-orange); }
.bi-counter-item { padding: 50px 32px; border-right: 1px solid rgba(255,255,255,0.08); }
.bi-counter-item:last-child { border-right: 0; }
.bi-counter-num { font-family: "Inter", sans-serif; font-weight: 900; font-size: clamp(48px, 6vw, 88px); line-height: 1; color: var(--bi-orange); letter-spacing: -0.03em; }
.bi-counter-label { font-family: "Noto Sans JP", sans-serif; font-size: 13px; color: var(--bi-fg-soft); margin-top: 12px; }
.bi-counter-label small { font-size: 10px; color: var(--bi-pink); margin-left: 4px; }

/* Common */
.bi-section-head { margin-bottom: 60px; }
.bi-eyebrow { font-family: "Inter", sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 0.25em; color: var(--bi-orange); }
.bi-mega { font-family: "Inter", sans-serif; font-weight: 900; font-size: clamp(56px, 9vw, 140px); line-height: 0.95; letter-spacing: -0.04em; margin: 8px 0 16px; }
.bi-fake-pill { display: inline-block; padding: 5px 14px; background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4); color: var(--bi-pink); border-radius: 999px; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700; }
.bi-fake { font-size: 11px; color: var(--bi-pink); font-weight: 700; }
.bi-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s ease, transform 1s ease; }
.bi-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Services */
.bi-services { padding: 120px 40px; }
.bi-services-list { display: flex; flex-direction: column; }
.bi-service { display: grid; grid-template-columns: 200px 1fr; gap: 60px; padding: 60px 0; border-top: 1px solid rgba(255,255,255,0.1); align-items: start; transition: background .3s; }
.bi-service:hover { background: rgba(255,107,26,0.04); }
.bi-service:last-child { border-bottom: 1px solid rgba(255,255,255,0.1); }
.bi-service-num { font-family: "Inter", serif; font-weight: 900; font-size: 80px; line-height: 1; color: var(--bi-orange); letter-spacing: -0.03em; }
.bi-service-en { font-size: 11px; font-weight: 800; letter-spacing: 0.2em; color: var(--bi-fg-soft); margin-top: 12px; }
.bi-service-r h3 { font-family: "Noto Sans JP", sans-serif; font-size: 28px; font-weight: 800; margin: 0 0 16px; }
.bi-service-r h3 small { font-size: 12px; color: var(--bi-pink); font-weight: 600; margin-left: 8px; }
.bi-service-r p { font-family: "Noto Sans JP", sans-serif; font-size: 14px; line-height: 2; color: var(--bi-fg-soft); margin: 0 0 16px; }
.bi-service-link { font-family: "Noto Sans JP", sans-serif; font-size: 13px; font-weight: 700; color: var(--bi-orange); text-decoration: none; }

/* Works */
.bi-works { padding: 120px 40px; background: var(--bi-bg2); }
.bi-works-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.bi-work { position: relative; }
.bi-work-img { position: relative; aspect-ratio: 16/10; background-size: cover; background-position: center; overflow: hidden; }
.bi-work-tag { position: absolute; bottom: 12px; left: 12px; background: var(--bi-orange); color: #000; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 900; padding: 4px 10px; }
.bi-work-stamp { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.8); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; letter-spacing: 0.15em; }
.bi-work-info { padding: 16px 0; }
.bi-work-y { font-size: 11px; letter-spacing: 0.2em; color: var(--bi-fg-soft); }
.bi-work-info h3 { font-family: "Noto Sans JP", sans-serif; font-size: 18px; font-weight: 800; margin: 6px 0 0; }

/* Equipment */
.bi-equip { padding: 120px 40px; }
.bi-equip-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }
.bi-equip-item { display: flex; gap: 20px; align-items: center; padding: 32px; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); }
.bi-equip-n { font-family: "Inter", sans-serif; font-weight: 900; font-size: 56px; line-height: 1; color: var(--bi-orange); }
.bi-equip-l { font-family: "Noto Sans JP", sans-serif; font-size: 16px; font-weight: 800; }
.bi-equip-l small { font-size: 10px; color: var(--bi-pink); font-weight: 600; margin-left: 4px; }
.bi-equip-s { font-size: 11px; color: var(--bi-fg-soft); margin-top: 4px; }

/* CTA */
.bi-cta { position: relative; padding: 140px 40px; overflow: hidden; }
.bi-cta-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: grayscale(0.5); }
.bi-cta-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,107,26,0.85) 0%, rgba(10,10,10,0.85) 100%); }
.bi-cta-content { position: relative; max-width: 900px; margin: 0 auto; text-align: center; color: #fff; }
.bi-cta-h { font-family: "Noto Sans JP", sans-serif; font-weight: 900; font-size: clamp(40px, 6vw, 80px); line-height: 1.2; margin: 16px 0 24px; }
.bi-cta-h em { font-style: normal; color: var(--bi-orange); background: #000; padding: 0 12px; }
.bi-cta-content p { font-family: "Noto Sans JP", sans-serif; font-size: 14px; line-height: 1.9; margin: 0 0 32px; }
.bi-cta-phone { display: inline-flex; flex-direction: column; align-items: center; padding: 24px 40px; background: #000; border: 2px solid var(--bi-orange); margin: 0 0 32px; }
.bi-cta-phone span { font-size: 11px; letter-spacing: 0.2em; color: var(--bi-orange); font-weight: 800; }
.bi-cta-phone strong { font-family: "Inter", sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 900; letter-spacing: 0.05em; margin-top: 4px; }
.bi-cta .bi-hero-btns { justify-content: center; }

/* Footer */
.bi-footer { background: #000; padding: 80px 40px 40px; text-align: center; border-top: 2px solid var(--bi-orange); }
.bi-footer-mega { font-family: "Inter", sans-serif; font-weight: 900; font-size: clamp(40px, 7vw, 120px); line-height: 1; letter-spacing: -0.04em; margin: 0 0 16px; color: var(--bi-orange); }
.bi-footer-tag { font-size: 11px; letter-spacing: 0.3em; color: var(--bi-fg-soft); margin: 0 0 32px; font-weight: 800; }
.bi-footer-disclaimer { font-family: "Noto Sans JP", sans-serif; font-size: 12px; line-height: 1.7; background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4); padding: 16px 22px; margin: 0 auto 24px; max-width: 720px; color: #fff; }
.bi-footer-disclaimer strong { color: var(--bi-pink); }
.bi-footer-cr { font-size: 11px; opacity: 0.5; margin: 0; }

.bi-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 60; background: var(--bi-pink); color: #fff; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px; display: flex; align-items: center; gap: 8px; box-shadow: 0 12px 32px rgba(236,72,153,0.4); }
.bi-floating-warning-icon { background: #fff; color: var(--bi-pink); width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; }

@media (max-width: 900px) {
  .bi-header { padding: 12px 16px; gap: 12px; }
  .bi-nav { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--bi-bg); padding: 0; max-height: 0; overflow: hidden; transition: max-height .4s, padding .4s; }
  .bi-nav.is-open { max-height: 400px; padding: 16px 0; }
  .bi-nav a { padding: 14px 24px; }
  .bi-burger { display: flex; }
  .bi-cta-btn { display: none; }
  .bi-hero { padding: 60px 20px; min-height: 80vh; }
  .bi-hero-side { display: none; }
  .bi-counter { grid-template-columns: repeat(2, 1fr); }
  .bi-counter-item { padding: 32px 20px; }
  .bi-counter-item:nth-child(2n) { border-right: 0; }
  .bi-counter-item:nth-child(-n+2) { border-bottom: 1px solid rgba(255,255,255,0.08); }
  .bi-services { padding: 60px 20px; }
  .bi-service { grid-template-columns: 1fr; gap: 16px; padding: 32px 0; }
  .bi-works { padding: 60px 20px; }
  .bi-works-grid { grid-template-columns: 1fr; gap: 24px; }
  .bi-equip { padding: 60px 20px; }
  .bi-equip-list { grid-template-columns: 1fr; }
  .bi-cta { padding: 80px 20px; }
  .bi-footer { padding: 60px 20px 32px; }
}
`
