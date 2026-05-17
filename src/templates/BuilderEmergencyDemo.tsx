import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS EMERGENCY — 災害復旧・24h（漆黒×ゴールド×明朝）
   重厚で誠実な「災害に向き合う会社」のたたずまい。
   Inspired by Japanese production sites (Hygge / kunimatsu).
   ============================================================ */

export default function BuilderEmergencyDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const heroImgs = [
    'photo-1547149540-89dc66c34c34',
    'photo-1503387762-592deb58ef4e',
    'photo-1541888946425-d81bb19240f5',
  ]

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImgs.length), 6000)
    return () => clearInterval(t)
  }, [])

  // Stroke draw + fade up
  useEffect(() => {
    const ioStroke = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return
        const p = e.target as SVGPathElement
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
        p.style.visibility = 'visible'
        requestAnimationFrame(() => {
          p.style.transition = 'stroke-dashoffset 3s ease-out'
          p.style.strokeDashoffset = '0'
        })
        ioStroke.unobserve(p)
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.em-draw path').forEach((el) => ioStroke.observe(el))

    const ioFade = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); ioFade.unobserve(e.target) } })
    }, { threshold: 0.18 })
    document.querySelectorAll('.em-fade').forEach((el) => ioFade.observe(el))
    return () => { ioStroke.disconnect(); ioFade.disconnect() }
  }, [])

  return (
    <div className="em-root">
      <style>{cssText}</style>

      <div className="em-warn">
        <span className="em-warn-pill">DEMO</span>
        <span className="em-warn-text">本サイトは<b>架空の災害復旧会社</b>のデザイン見本です。住所・電話・実績はすべて架空。</span>
        <a href="#hp" className="em-warn-back">← 戻る</a>
      </div>

      {/* Header */}
      <header className="em-header">
        <div className="em-header-inner">
          <a href="#" className="em-logo">
            <span className="em-logo-en">POLARIS EMERGENCY</span>
            <span className="em-logo-ja">株式会社ポラリス災害復旧（架空）</span>
          </a>
          <div className="em-header-tel">
            <span>24時間 緊急受付（架空）</span>
            <a href="tel:0120-000-000">0120-000-000</a>
          </div>
          <nav className={`em-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about">私たちの仕事</a>
            <a href="#services">対応業務</a>
            <a href="#records">出動実績</a>
            <a href="#flow">出動の流れ</a>
            <a href="#access">拠点案内</a>
          </nav>
          <button className={`em-burger ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="em-hero">
        <div className="em-hero-bg">
          {heroImgs.map((id, i) => (
            <div
              key={id}
              className={`em-hero-slide ${heroIdx === i ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80)` }}
            />
          ))}
        </div>
        <div className="em-hero-vertical">
          そのとき、真っ先に。<span>※架空</span>
        </div>
        <div className="em-hero-content">
          <p className="em-hero-eyebrow">DISASTER RECOVERY & RESTORATION</p>
          <h1 className="em-hero-title">
            <span>その時、</span>
            <span>誰よりも早く。</span>
          </h1>
          <p className="em-hero-sub">
            地震、水害、火災──。<br />
            被災現場の片づけ、応急復旧、再建まで。<br />
            全国八拠点（架空）から、二十四時間体制で出動する仮想会社です。
          </p>
          <div className="em-hero-cta">
            <a href="tel:0120-000-000" className="em-btn em-btn-gold">
              24h 緊急受付 0120-000-000 <i>→</i>
            </a>
            <a href="#services" className="em-btn em-btn-ghost">対応業務を見る <i>→</i></a>
          </div>
          <p className="em-hero-note">※ 上記電話番号・拠点はすべて架空のものです。</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="em-section em-about">
        <svg className="em-draw em-draw-1" viewBox="0 0 1920 765" preserveAspectRatio="none">
          <path d="M2620,998s-490.977,448-967.983,594S700,1762,700,1762" transform="translate(-700 -997.6)" fill="none" stroke="#c9a45c" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="em-container">
          <h2 className="em-title em-fade">
            <span className="em-title-en">ABOUT</span>
            <span className="em-title-ja">私たちの仕事について</span>
          </h2>
          <div className="em-about-grid">
            <div className="em-about-text em-fade">
              <h3>
                慌てず、騒がず、<br />
                ただ、現場に向かう。
              </h3>
              <p>
                災害が起きたあと、現場でいちばん必要とされるのは、<br />
                派手な道具でも、声の大きい人でもありません。<br />
                その土地を知り、淡々と手を動かす職人です。
              </p>
              <p>
                ポラリス災害復旧は、平時から地域の建設会社・自治体・<br />
                ボランティア団体と関係をつくり、有事に静かに動ける体制を<br />
                整えている、架空の会社です。
              </p>
            </div>
            <div className="em-about-img em-fade">
              <img src="https://images.unsplash.com/photo-1547149540-89dc66c34c34?auto=format&fit=crop&w=900&q=80" alt="" />
              <span className="em-about-img-cap">※架空のイメージ写真</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="em-section em-services">
        <div className="em-container">
          <h2 className="em-title em-fade">
            <span className="em-title-en">SERVICES</span>
            <span className="em-title-ja">対応業務（架空）</span>
          </h2>
          <ul className="em-services-list">
            {[
              { n: '一', t: '地震被害の応急復旧', s: '応急危険度判定・倒壊家屋の解体・瓦礫撤去・応急仮設の設営。被災自治体との連携も。' },
              { n: '二', t: '水害・浸水の復旧', s: '排水ポンプ、汚泥撤去、床下乾燥、消毒。再発に備えた防水改修もご提案します。' },
              { n: '三', t: '火災後の解体・再建',     s: '焼損部材の撤去、煤煙の消臭、構造の再構築。罹災証明の取得サポートも。' },
              { n: '四', t: '台風・倒木・屋根応急',     s: 'ブルーシート展張、瓦の応急留め、倒木伐採。雨が止む前に手を打ちます。' },
              { n: '五', t: '土砂・斜面の応急処置',     s: '斜面の崩落止め、土留め、流出物の整理。重機・人員の確保もまとめて。' },
              { n: '六', t: '原状回復・引き渡し',         s: '生活が戻る瞬間まで、清掃・点検・記録までを一括で。' },
            ].map((x) => (
              <li key={x.n} className="em-services-item em-fade">
                <div className="em-services-num">{x.n}</div>
                <div className="em-services-body">
                  <h3>{x.t}</h3>
                  <p>{x.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="em-marquee">
        <div className="em-marquee-row">
          <div className="em-marquee-track">
            {[
              'photo-1547149540-89dc66c34c34', 'photo-1503387762-592deb58ef4e',
              'photo-1541888946425-d81bb19240f5', 'photo-1486325212027-8081e485255e',
              'photo-1565008447742-97f6f38c985c', 'photo-1487958449943-2429e8be8625',
              'photo-1547149540-89dc66c34c34', 'photo-1503387762-592deb58ef4e',
              'photo-1541888946425-d81bb19240f5', 'photo-1486325212027-8081e485255e',
            ].map((id, i) => (
              <div key={i} className="em-marquee-item">
                <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECORDS */}
      <section id="records" className="em-section em-records">
        <div className="em-container">
          <h2 className="em-title em-fade">
            <span className="em-title-en">RECORDS</span>
            <span className="em-title-ja">出動実績（架空）</span>
          </h2>
          <ul className="em-records-list">
            {[
              { y: '2024.09', t: '台風による広域水害・〇〇県（架空）', s: '排水ポンプ32台、職人154名で参集。発災から3日で生活再開エリアを設定。' },
              { y: '2024.01', t: '地震による倒壊家屋の応急処置・〇〇県（架空）', s: '自治体と連携し、危険度判定と並行して72戸の応急仮処置を実施。' },
              { y: '2023.07', t: '集中豪雨による土砂崩れ復旧・〇〇市（架空）', s: '町内会・建設組合と連携し、生活道路の啓開を1週間で完了。' },
              { y: '2023.03', t: '住宅火災の解体・再建着工・〇〇区（架空）', s: '罹災証明取得から仮住まいの段取りまで、ご家族の窓口を一本化。' },
            ].map((r, i) => (
              <li key={i} className="em-records-item em-fade">
                <div className="em-records-y">{r.y}</div>
                <div className="em-records-body">
                  <h3>{r.t}</h3>
                  <p>{r.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="em-section em-flow">
        <div className="em-container">
          <h2 className="em-title em-fade">
            <span className="em-title-en">FLOW</span>
            <span className="em-title-ja">出動の流れ</span>
          </h2>
          <ol className="em-flow-list">
            {[
              { t: 'お電話を受ける', s: '24時間、専属のオペレーターが対応します（架空）。まずは状況を、わかる範囲で。' },
              { t: '一次出動・現地確認', s: '最寄り拠点から、原則6時間以内に現地入り（架空・状況により前後）。' },
              { t: '応急処置・記録', s: '二次被害を防ぐ処置と、罹災証明に必要な写真・図面の記録をいたします。' },
              { t: '復旧・再建', s: 'ご家族・自治体・保険会社との橋渡しを担いながら、復旧と再建を進めます。' },
            ].map((f, i) => (
              <li key={i} className="em-flow-item em-fade">
                <div className="em-flow-step">STEP <span>0{i + 1}</span></div>
                <div className="em-flow-body">
                  <h3>{f.t}</h3>
                  <p>{f.s}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="em-section em-faq">
        <div className="em-container">
          <h2 className="em-title em-fade">
            <span className="em-title-en">FAQ</span>
            <span className="em-title-ja">よくいただくご質問</span>
          </h2>
          <ul className="em-faq-list">
            {[
              { q: '夜間や祝日でも出動してもらえますか？', a: 'はい、24時間365日、緊急受付を行っています（架空）。一次出動は最寄りの拠点から手配します。' },
              { q: '個人でも依頼できますか？', a: '個人のお客様、自治会、自治体、企業様まで幅広く承ります（架空）。' },
              { q: '保険の手続きは手伝ってもらえますか？', a: '罹災証明取得・写真記録・損害見積りの作成まで、保険請求に必要な書類作成をご支援します（架空）。' },
              { q: '対応エリアはどこまでですか？', a: '全国8拠点（架空）から出動可能です。遠方の場合は連携会社を介してご対応します。' },
            ].map((f, i) => (
              <li key={i} className={`em-faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i />
                </button>
                <div className="em-faq-ans"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACCESS / BASES */}
      <section id="access" className="em-section em-access">
        <svg className="em-draw em-draw-2" viewBox="0 0 1920 825" preserveAspectRatio="none">
          <path d="M704,3316s298,170,582,214,1266,250,1338,610" transform="translate(-704 -3315.5)" fill="none" stroke="#c9a45c" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="em-container">
          <h2 className="em-title em-fade">
            <span className="em-title-en">BASES</span>
            <span className="em-title-ja">全国八拠点のご案内（架空）</span>
          </h2>
          <ul className="em-access-list em-fade">
            {[
              { city: '札幌', area: '北海道全域' },
              { city: '仙台', area: '東北エリア' },
              { city: '東京（本社）', area: '関東一円' },
              { city: '名古屋', area: '中部エリア' },
              { city: '大阪', area: '近畿エリア' },
              { city: '広島', area: '中国エリア' },
              { city: '福岡', area: '九州・沖縄' },
              { city: '那覇', area: '沖縄離島' },
            ].map((b) => (
              <li key={b.city} className="em-access-item">
                <span className="em-access-city">{b.city}</span>
                <span className="em-access-area">{b.area}</span>
              </li>
            ))}
          </ul>
          <p className="em-access-note">※ 上記拠点はすべて架空のデザイン見本用情報です。</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="em-section em-contact">
        <div className="em-container em-contact-inner em-fade">
          <h2 className="em-title em-title-light">
            <span className="em-title-en">CONTACT</span>
            <span className="em-title-ja">緊急のご連絡</span>
          </h2>
          <p>
            電話・フォーム、どちらでも構いません。<br />
            ただ、緊急時は電話のほうが早くお応えできます（架空）。
          </p>
          <div className="em-contact-tel">
            <span>24時間 緊急受付</span>
            <a href="tel:0120-000-000">0120-000-000</a>
            <small>※架空</small>
          </div>
          <div className="em-contact-cta">
            <a href="#" className="em-btn em-btn-outline">フォームから連絡 →</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="em-footer">
        <div className="em-container">
          <div className="em-footer-grid">
            <div>
              <p className="em-footer-logo">POLARIS EMERGENCY（架空）</p>
              <p className="em-footer-addr">本社 〒000-0000 東京都〇〇区〇〇 0-0-0<br />24h Tel. 0120-000-000（※架空）</p>
            </div>
            <nav>
              <a href="#about">私たちの仕事</a>
              <a href="#services">対応業務</a>
              <a href="#records">出動実績</a>
              <a href="#flow">出動の流れ</a>
              <a href="#access">拠点案内</a>
            </nav>
          </div>
          <p className="em-footer-copy">© POLARIS EMERGENCY (Fictional Demo) — Designed by Polaris Creative</p>
        </div>
      </footer>
    </div>
  )
}

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Noto+Serif+JP:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');

.em-root { --ink:#0a0a0a; --bg:#0a0a0a; --bg2:#141414; --gold:#c9a45c; --gold-dark:#a8843f; --text:#e8e3d8; --sub:rgba(232,227,216,.6); --line:rgba(232,227,216,.14);
  font-family:'Zen Kaku Gothic New','Noto Serif JP',serif; color:var(--text); background:var(--bg); line-height:1.85; overflow-x:hidden; }
.em-root img { display:block; max-width:100%; }
.em-container { max-width:1200px; margin:0 auto; padding:0 24px; }
.em-section { padding:120px 0; position:relative; }
@media(max-width:768px){ .em-section{ padding:72px 0; } }

.em-fade { opacity:0; transform:translateY(40px); transition:opacity .9s ease-out, transform .9s ease-out; }
.em-fade.is-in { opacity:1; transform:none; }

.em-warn { position:sticky; top:0; z-index:60; display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; padding:8px 20px; background:#000; color:#e8e3d8; font-size:11px; letter-spacing:.05em; border-bottom:1px solid var(--gold); }
.em-warn-pill { background:var(--gold); color:#0a0a0a; padding:2px 10px; border-radius:999px; font-weight:700; font-family:'Libre Baskerville',serif; }
.em-warn-text b { color:var(--gold); }
.em-warn-back { color:#e8e3d8; text-decoration:none; opacity:.7; }
.em-warn-back:hover { opacity:1; }

.em-header { position:sticky; top:36px; z-index:50; background:rgba(10,10,10,.93); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.em-header-inner { display:grid; grid-template-columns:auto 1fr auto auto; align-items:center; gap:32px; padding:18px 24px; max-width:1280px; margin:0 auto; }
@media(max-width:900px){ .em-header-inner { grid-template-columns:1fr auto; } .em-header-tel { display:none !important; } }
.em-logo { display:flex; flex-direction:column; line-height:1.15; text-decoration:none; color:var(--text); }
.em-logo-en { font-family:'Libre Baskerville',serif; font-size:17px; letter-spacing:.18em; font-weight:700; color:var(--gold); }
.em-logo-ja { font-size:10px; color:var(--sub); letter-spacing:.18em; margin-top:4px; }
.em-header-tel { display:flex; flex-direction:column; align-items:flex-end; line-height:1.1; }
.em-header-tel span { font-size:10px; letter-spacing:.2em; color:var(--sub); }
.em-header-tel a { font-family:'Libre Baskerville',serif; font-size:22px; color:var(--gold); text-decoration:none; font-weight:700; margin-top:4px; }
.em-nav { display:flex; gap:24px; }
.em-nav a { color:var(--text); text-decoration:none; font-size:13px; letter-spacing:.08em; }
.em-nav a:hover { color:var(--gold); }
.em-burger { display:none; background:none; border:0; width:32px; height:24px; flex-direction:column; justify-content:space-between; cursor:pointer; }
.em-burger span { display:block; height:1.5px; background:var(--text); transition:.3s; }
.em-burger.is-open span:first-child { transform:translateY(11px) rotate(45deg); }
.em-burger.is-open span:last-child  { transform:translateY(-11px) rotate(-45deg); }
@media(max-width:900px){
  .em-burger{ display:flex; }
  .em-nav { position:fixed; inset:0; background:rgba(10,10,10,.97); flex-direction:column; justify-content:center; align-items:center; gap:32px; transform:translateX(100%); transition:.5s; }
  .em-nav.is-open { transform:none; }
  .em-nav a { font-size:18px; }
}

/* Hero */
.em-hero { position:relative; height:92vh; min-height:680px; overflow:hidden; color:#fff; }
.em-hero-bg { position:absolute; inset:0; }
.em-hero-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 2.4s ease-in-out; transform:scale(1.05); animation:em-ken 18s ease-in-out infinite; filter:grayscale(.3) contrast(1.05); }
.em-hero-slide.is-active { opacity:1; }
@keyframes em-ken { 0%,100%{ transform:scale(1.05); } 50%{ transform:scale(1.15); } }
.em-hero-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(10,10,10,.55) 0%, rgba(10,10,10,.75) 70%, rgba(10,10,10,.92) 100%); }
.em-hero-vertical { position:absolute; top:130px; right:32px; writing-mode:vertical-rl; font-family:'Noto Serif JP',serif; font-size:14px; letter-spacing:.4em; color:rgba(232,227,216,.78); z-index:2; }
.em-hero-vertical span { display:inline-block; margin-top:24px; font-size:10px; color:var(--gold); }
.em-hero-content { position:relative; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 24px; max-width:1200px; margin:0 auto; z-index:2; }
.em-hero-eyebrow { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.3em; color:var(--gold); margin-bottom:24px; }
.em-hero-title { font-family:'Noto Serif JP',serif; font-weight:300; font-size:clamp(40px,6vw,88px); line-height:1.3; margin:0 0 32px; color:#fff; }
.em-hero-title span { display:block; }
.em-hero-sub { font-size:15px; line-height:2.1; max-width:560px; margin-bottom:40px; color:rgba(232,227,216,.92); }
.em-hero-cta { display:flex; gap:16px; flex-wrap:wrap; }
.em-hero-note { margin:16px 0 0; font-size:11px; color:rgba(232,227,216,.55); letter-spacing:.1em; }

.em-btn { display:inline-flex; align-items:center; gap:14px; padding:18px 36px; font-size:14px; letter-spacing:.1em; text-decoration:none; transition:.35s; border-radius:0; font-weight:500; }
.em-btn i { font-style:normal; transition:transform .35s; }
.em-btn:hover i { transform:translateX(6px); }
.em-btn-gold { background:var(--gold); color:#0a0a0a; }
.em-btn-gold:hover { background:var(--gold-dark); color:#fff; }
.em-btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.4); }
.em-btn-ghost:hover { background:rgba(255,255,255,.08); border-color:#fff; }
.em-btn-outline { background:transparent; color:var(--gold); border:1px solid var(--gold); }
.em-btn-outline:hover { background:var(--gold); color:#0a0a0a; }

.em-title { margin:0 0 64px; }
.em-title-en { display:block; font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; letter-spacing:.35em; color:var(--gold); margin-bottom:14px; }
.em-title-ja { display:block; font-family:'Noto Serif JP',serif; font-weight:500; font-size:clamp(24px,3vw,38px); letter-spacing:.04em; line-height:1.5; color:var(--text); }
.em-title-light .em-title-en { color:var(--gold); }
.em-title-light .em-title-ja { color:#fff; }

.em-draw { position:absolute; pointer-events:none; }
.em-draw-1 { top:6%; left:0; width:100%; height:60%; }
.em-draw-2 { bottom:0; left:0; width:100%; height:50%; }

/* About */
.em-about { background:var(--bg); }
.em-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
@media(max-width:900px){ .em-about-grid{ grid-template-columns:1fr; gap:40px; } }
.em-about-text h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(28px,3.4vw,44px); line-height:1.5; margin:0 0 32px; color:#fff; }
.em-about-text p { font-size:15px; margin:0 0 24px; color:rgba(232,227,216,.82); }
.em-about-img { position:relative; }
.em-about-img img { aspect-ratio:4/5; object-fit:cover; filter:grayscale(.2); }
.em-about-img-cap { position:absolute; bottom:12px; left:12px; background:rgba(0,0,0,.78); color:var(--text); padding:4px 12px; font-size:10px; letter-spacing:.15em; }

/* Services */
.em-services { background:var(--bg2); }
.em-services-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:48px 64px; }
@media(max-width:768px){ .em-services-list{ grid-template-columns:1fr; gap:32px; } }
.em-services-item { display:flex; gap:24px; align-items:flex-start; }
.em-services-num { font-family:'Noto Serif JP',serif; font-size:48px; line-height:1; color:var(--gold); font-weight:300; flex-shrink:0; min-width:48px; text-align:center; }
.em-services-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0 0 12px; color:#fff; }
.em-services-body p { font-size:14px; color:var(--sub); margin:0; line-height:2; }

/* Marquee */
.em-marquee { padding:32px 0; background:#000; overflow:hidden; }
.em-marquee-row { overflow:hidden; }
.em-marquee-track { display:flex; gap:16px; animation:em-marq 55s linear infinite; width:max-content; }
.em-marquee-item { flex-shrink:0; width:240px; aspect-ratio:4/3; overflow:hidden; filter:grayscale(.5); }
.em-marquee-item img { width:100%; height:100%; object-fit:cover; }
@keyframes em-marq { from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

/* Records */
.em-records { background:var(--bg); }
.em-records-list { list-style:none; padding:0; margin:0; }
.em-records-item { display:flex; gap:48px; padding:36px 0; border-bottom:1px solid var(--line); align-items:flex-start; }
@media(max-width:768px){ .em-records-item { flex-direction:column; gap:8px; } }
.em-records-y { font-family:'Libre Baskerville',serif; font-size:18px; color:var(--gold); letter-spacing:.1em; min-width:110px; flex-shrink:0; padding-top:4px; }
.em-records-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:19px; margin:0 0 10px; color:#fff; }
.em-records-body p { color:var(--sub); margin:0; font-size:14px; }

/* Flow */
.em-flow { background:var(--bg2); }
.em-flow-list { list-style:none; padding:0; margin:0; }
.em-flow-item { display:flex; gap:32px; padding:32px 0; border-bottom:1px dashed var(--line); }
.em-flow-step { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.2em; color:var(--gold); flex-shrink:0; padding-top:4px; min-width:90px; }
.em-flow-step span { font-size:32px; font-style:normal; color:var(--gold); display:block; margin-top:6px; }
.em-flow-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0 0 8px; color:#fff; }
.em-flow-body p { color:var(--sub); margin:0; font-size:14px; line-height:2; }
@media(max-width:768px){ .em-flow-item{ flex-direction:column; gap:8px; } }

/* FAQ */
.em-faq-list { list-style:none; padding:0; margin:0; }
.em-faq-item { border-bottom:1px solid var(--line); }
.em-faq-item button { width:100%; background:none; border:0; display:flex; justify-content:space-between; align-items:center; padding:24px 0; font-family:'Noto Serif JP',serif; font-size:16px; color:var(--text); cursor:pointer; text-align:left; }
.em-faq-item button i { display:block; width:20px; height:20px; position:relative; flex-shrink:0; }
.em-faq-item button i::before, .em-faq-item button i::after { content:''; position:absolute; background:var(--gold); }
.em-faq-item button i::before { top:50%; left:0; right:0; height:1.5px; transform:translateY(-50%); }
.em-faq-item button i::after  { left:50%; top:0; bottom:0; width:1.5px; transform:translateX(-50%); transition:.3s; }
.em-faq-item.is-open button i::after { transform:translateX(-50%) scaleY(0); }
.em-faq-ans { max-height:0; overflow:hidden; transition:max-height .4s ease; }
.em-faq-item.is-open .em-faq-ans { max-height:200px; }
.em-faq-ans p { padding:0 0 24px; color:var(--sub); font-size:14px; margin:0; line-height:2; }

/* Access (bases) */
.em-access { background:var(--bg2); }
.em-access-list { list-style:none; padding:0; margin:0 0 24px; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
@media(max-width:768px){ .em-access-list{ grid-template-columns:1fr 1fr; } }
.em-access-item { background:#0a0a0a; border:1px solid var(--line); padding:24px 20px; display:flex; flex-direction:column; gap:6px; transition:.3s; }
.em-access-item:hover { border-color:var(--gold); }
.em-access-city { font-family:'Noto Serif JP',serif; font-size:20px; color:#fff; font-weight:500; }
.em-access-area { font-size:12px; color:var(--sub); letter-spacing:.1em; }
.em-access-note { font-size:11px; color:var(--sub); margin:24px 0 0; }

/* Contact */
.em-contact { background:#000; text-align:center; }
.em-contact-inner { max-width:760px; }
.em-contact p { font-size:15px; color:rgba(232,227,216,.85); margin:0 0 40px; }
.em-contact-tel { display:flex; flex-direction:column; align-items:center; margin:0 auto 40px; padding:32px; border:1px solid var(--gold); max-width:520px; }
.em-contact-tel span { font-size:11px; letter-spacing:.3em; color:var(--gold); }
.em-contact-tel a { font-family:'Libre Baskerville',serif; font-size:clamp(36px,5vw,56px); color:#fff; text-decoration:none; margin-top:12px; letter-spacing:.05em; }
.em-contact-tel small { font-size:11px; color:var(--sub); margin-top:8px; letter-spacing:.1em; }
.em-contact-cta { display:flex; justify-content:center; }

/* Footer */
.em-footer { background:#000; color:rgba(232,227,216,.65); padding:64px 0 32px; border-top:1px solid var(--line); }
.em-footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-bottom:32px; border-bottom:1px solid var(--line); }
@media(max-width:768px){ .em-footer-grid{ grid-template-columns:1fr; } }
.em-footer-logo { font-family:'Libre Baskerville',serif; letter-spacing:.18em; color:var(--gold); margin:0 0 12px; }
.em-footer-addr { font-size:12px; margin:0; line-height:1.9; }
.em-footer nav { display:flex; flex-wrap:wrap; gap:18px 28px; align-content:flex-start; }
.em-footer nav a { color:rgba(232,227,216,.6); text-decoration:none; font-size:12px; letter-spacing:.1em; }
.em-footer nav a:hover { color:var(--gold); }
.em-footer-copy { margin:32px 0 0; font-size:11px; letter-spacing:.1em; text-align:center; }
`
