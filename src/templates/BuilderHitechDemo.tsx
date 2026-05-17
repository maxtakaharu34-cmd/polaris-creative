import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS SMART BUILD — スマート建設（和モダン / ネイビー×ベージュ×ゴールド）
   Inspired by Japanese 工務店 production sites (e.g. kunimatsu/Hygge).
   Serif typography, hand-drawn SVG curves, vertical text accents.
   ============================================================ */

export default function BuilderHitechDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Hero crossfade slideshow
  const heroImgs = [
    'photo-1503387762-592deb58ef4e',
    'photo-1486325212027-8081e485255e',
    'photo-1581094794329-c8112a89af12',
  ]
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImgs.length), 6000)
    return () => clearInterval(t)
  }, [])

  // SVG stroke draw + fade up on scroll
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
          p.style.transition = 'stroke-dashoffset 2.8s ease-out'
          p.style.strokeDashoffset = '0'
        })
        ioStroke.unobserve(p)
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.sb-draw path').forEach((el) => ioStroke.observe(el))

    const ioFade = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          ioFade.unobserve(e.target)
        }
      })
    }, { threshold: 0.18 })
    document.querySelectorAll('.sb-fade').forEach((el) => ioFade.observe(el))

    return () => { ioStroke.disconnect(); ioFade.disconnect() }
  }, [])

  return (
    <div className="sb-root">
      <style>{cssText}</style>

      {/* Demo disclaimer */}
      <div className="sb-warn">
        <span className="sb-warn-pill">DEMO</span>
        <span className="sb-warn-text">本サイトは<b>架空のスマート建設会社</b>のデザイン見本です。住所・電話・施工事例はすべて架空。</span>
        <a href="#hp" className="sb-warn-back">← 戻る</a>
      </div>

      {/* Header */}
      <header className="sb-header">
        <div className="sb-header-inner">
          <a href="#" className="sb-logo">
            <span className="sb-logo-en">POLARIS SMART BUILD</span>
            <span className="sb-logo-ja">株式会社ポラリス建設（架空）</span>
          </a>
          <nav className={`sb-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about">私たちについて</a>
            <a href="#tech">技術と設計</a>
            <a href="#works">施工事例</a>
            <a href="#numbers">数字で見る</a>
            <a href="#access">アクセス</a>
            <a href="#contact" className="sb-nav-cta">お問い合わせ（仮）</a>
          </nav>
          <button className={`sb-burger ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="sb-hero">
        <div className="sb-hero-bg">
          {heroImgs.map((id, i) => (
            <div
              key={id}
              className={`sb-hero-slide ${heroIdx === i ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80)` }}
            />
          ))}
          <div className="sb-hero-tint" />
        </div>
        <div className="sb-hero-vertical">創業七十年、図面と現場をつなぐ仕事。<span>※架空</span></div>
        <div className="sb-hero-content">
          <p className="sb-hero-eyebrow">SMART CONSTRUCTION × CRAFTSMANSHIP</p>
          <h1 className="sb-hero-title">
            <span>図面の、その先へ。</span>
            <span>確かな手で、形にする。</span>
          </h1>
          <p className="sb-hero-sub">
            BIM・IoTを使いこなしながらも、最後は職人の手仕事で仕上げる。<br />
            ポラリス建設は、技術と人の両輪で街をつくる仮想会社です。
          </p>
          <div className="sb-hero-cta">
            <a href="#contact" className="sb-btn sb-btn-gold">
              無料相談（仮） <i>→</i>
            </a>
            <a href="#works" className="sb-btn sb-btn-ghost">
              施工事例を見る <i>→</i>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sb-section sb-about">
        <svg className="sb-draw sb-draw-1" viewBox="0 0 1920 765" preserveAspectRatio="none">
          <path d="M2620,998s-490.977,448-967.983,594S700,1762,700,1762" transform="translate(-700 -997.6)" fill="none" stroke="#c6a647" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>

        <div className="sb-container">
          <h2 className="sb-title sb-fade">
            <span className="sb-title-en">ABOUT</span>
            <span className="sb-title-ja">私たちが大切にしていること</span>
          </h2>
          <div className="sb-about-grid">
            <div className="sb-about-text sb-fade">
              <h3>
                データは、<br />
                ものづくりの<br />
                ためにある。
              </h3>
              <p>
                3Dモデル・センサー・現場アプリ──。<br />
                便利な道具は、職人の仕事をもっと丁寧にするためにあります。<br />
                ポラリス建設は、技術を「人の手を補う側」に置くことを大切にしています。
              </p>
              <p className="sb-about-quote">
                「効率」よりも、まず「納得」を。<br />
                住む人と、つくる人。両方の納得が揃ったとき、<br />
                建物ははじめて長く愛される、と私たちは考えます。
              </p>
            </div>
            <div className="sb-about-img sb-fade">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80" alt="" />
              <div className="sb-about-img-caption">※架空のイメージ写真です</div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="tech" className="sb-section sb-tech">
        <div className="sb-container">
          <h2 className="sb-title sb-fade">
            <span className="sb-title-en">TECHNOLOGY</span>
            <span className="sb-title-ja">技術と設計の、四つの取り組み</span>
          </h2>
          <ul className="sb-tech-list">
            {[
              { n: '01', t: 'BIMによる事前の合意', s: '構造・設備・仕上げを3Dで統合。打合せの段階で「あとからの食い違い」を限りなくゼロに近づけます。' },
              { n: '02', t: '現場IoTで品質を可視化', s: '温湿度・コンクリート強度・職人の動線を計測。施工日誌は写真付きでクラウドに残します。' },
              { n: '03', t: 'AI工程予測と職人の経験', s: '工期・コストはAIで予測し、最終判断は現場監督と棟梁が行う。両輪で精度を高めます。' },
              { n: '04', t: '引渡し後30年のデータ伴走', s: '点検記録・修繕履歴をデータで保管。世代を超えて、家の物語を引き継げます。' },
            ].map((x) => (
              <li key={x.n} className="sb-tech-item sb-fade">
                <div className="sb-tech-num">{x.n}</div>
                <div className="sb-tech-body">
                  <h3>{x.t}</h3>
                  <p>{x.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MARQUEE GALLERY */}
      <section className="sb-marquee">
        <div className="sb-marquee-row sb-marquee-row-1">
          <div className="sb-marquee-track">
            {[
              'photo-1486325212027-8081e485255e', 'photo-1503387762-592deb58ef4e',
              'photo-1487958449943-2429e8be8625', 'photo-1565008447742-97f6f38c985c',
              'photo-1581094794329-c8112a89af12', 'photo-1448630360428-65456885c650',
              'photo-1486325212027-8081e485255e', 'photo-1503387762-592deb58ef4e',
              'photo-1487958449943-2429e8be8625', 'photo-1565008447742-97f6f38c985c',
            ].map((id, i) => (
              <div key={i} className="sb-marquee-item">
                <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="sb-section sb-works">
        <div className="sb-container">
          <h2 className="sb-title sb-fade">
            <span className="sb-title-en">WORKS</span>
            <span className="sb-title-ja">最近のお仕事から（架空）</span>
          </h2>
          <ul className="sb-works-list">
            {[
              { img: 'photo-1486325212027-8081e485255e', t: '小さな診療所のリノベーション', loc: '東京都・〇〇区 / 2024', tag: '医療施設' },
              { img: 'photo-1503387762-592deb58ef4e',     t: '海辺の家、木と土壁の家づくり', loc: '神奈川県・〇〇 / 2024', tag: '住宅' },
              { img: 'photo-1565008447742-97f6f38c985c',  t: '築60年の蔵を、地域の食堂へ',     loc: '長野県・〇〇 / 2023', tag: 'リノベ' },
              { img: 'photo-1487958449943-2429e8be8625',  t: '保育園の増築と耐震改修',         loc: '埼玉県・〇〇 / 2023', tag: '公共' },
            ].map((w, i) => (
              <li key={i} className="sb-works-item sb-fade">
                <div className="sb-works-img">
                  <img src={`https://images.unsplash.com/${w.img}?auto=format&fit=crop&w=900&q=80`} alt="" />
                  <span className="sb-works-tag">{w.tag}</span>
                </div>
                <div className="sb-works-meta">
                  <p className="sb-works-loc">{w.loc}</p>
                  <h3>{w.t}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" className="sb-section sb-numbers">
        <div className="sb-container">
          <h2 className="sb-title sb-title-light sb-fade">
            <span className="sb-title-en">NUMBERS</span>
            <span className="sb-title-ja">数字で見る、ポラリス建設（架空）</span>
          </h2>
          <ul className="sb-numbers-list">
            {[
              { num: '70', unit: '年', label: '創業からの歩み' },
              { num: '1,200', unit: '邸', label: '累計施工棟数' },
              { num: '94', unit: '%', label: '紹介・リピート率' },
              { num: '30', unit: '年', label: '引渡し後の伴走期間' },
            ].map((n, i) => (
              <li key={i} className="sb-numbers-item sb-fade">
                <div className="sb-numbers-num">
                  <span>{n.num}</span>
                  <small>{n.unit}</small>
                </div>
                <p>{n.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="sb-section sb-faq">
        <div className="sb-container">
          <h2 className="sb-title sb-fade">
            <span className="sb-title-en">FAQ</span>
            <span className="sb-title-ja">よくいただくご質問</span>
          </h2>
          <ul className="sb-faq-list">
            {[
              { q: '相談だけでも大丈夫ですか？', a: 'はい。土地探しの段階からのご相談も歓迎しています。初回相談は無料です（架空）。' },
              { q: '対応エリアを教えてください', a: '関東一円を中心に、新幹線でアクセスできる範囲を目安にしております（架空）。' },
              { q: '小さな改修工事もお願いできますか？', a: '一部屋のリノベーション、棚一つの造作からご相談を承っております（架空）。' },
              { q: '見積りは有料ですか？', a: 'ヒアリングと概算見積もりは無料、詳細図面を伴うお見積もりからは設計料を申し受けます（架空）。' },
            ].map((f, i) => (
              <li key={i} className={`sb-faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i />
                </button>
                <div className="sb-faq-ans"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="sb-section sb-access">
        <svg className="sb-draw sb-draw-2" viewBox="0 0 1920 825" preserveAspectRatio="none">
          <path d="M704,3316s298,170,582,214,1266,250,1338,610" transform="translate(-704 -3315.5)" fill="none" stroke="#c6a647" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="sb-container">
          <h2 className="sb-title sb-fade">
            <span className="sb-title-en">ACCESS</span>
            <span className="sb-title-ja">事務所のご案内</span>
          </h2>
          <div className="sb-access-grid sb-fade">
            <dl>
              <dt>所在地</dt><dd>〒000-0000 東京都〇〇区〇〇 0-0-0（実在しません）</dd>
              <dt>電話</dt><dd>03-0000-0000（※架空）</dd>
              <dt>営業時間</dt><dd>平日 9:00 – 18:00 / 土曜 10:00 – 17:00 / 日曜・祝日 休（架空）</dd>
              <dt>建設業許可</dt><dd>東京都知事許可（般-00）第00000号（※架空）</dd>
            </dl>
            <div className="sb-access-map">
              <iframe
                title="地図（架空）"
                src="https://www.openstreetmap.org/export/embed.html?bbox=139.6,35.65,139.8,35.75&layer=mapnik"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sb-section sb-contact">
        <div className="sb-container sb-contact-inner sb-fade">
          <h2 className="sb-title sb-title-light">
            <span className="sb-title-en">CONTACT</span>
            <span className="sb-title-ja">まずはお気軽にご相談ください</span>
          </h2>
          <p>
            建物のことも、土地のことも。<br />
            設計士・棟梁・現場監督が、それぞれの目線でお応えします。
          </p>
          <div className="sb-contact-cta">
            <a href="#" className="sb-btn sb-btn-gold">無料相談（仮） →</a>
            <a href="#" className="sb-btn sb-btn-outline">資料請求（仮） →</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sb-footer">
        <div className="sb-container">
          <div className="sb-footer-grid">
            <div>
              <p className="sb-footer-logo">POLARIS SMART BUILD（架空）</p>
              <p className="sb-footer-addr">〒000-0000 東京都〇〇区〇〇 0-0-0<br />Tel. 03-0000-0000（※架空）</p>
            </div>
            <nav>
              <a href="#about">私たちについて</a>
              <a href="#tech">技術と設計</a>
              <a href="#works">施工事例</a>
              <a href="#numbers">数字で見る</a>
              <a href="#access">アクセス</a>
            </nav>
          </div>
          <p className="sb-footer-copy">© POLARIS SMART BUILD (Fictional Demo) — Designed by Polaris Creative</p>
        </div>
      </footer>
    </div>
  )
}

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Noto+Serif+JP:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');

.sb-root { --ink:#14213d; --bg:#f5f1e8; --bg2:#ebe4d3; --gold:#c6a647; --gold-dark:#a8893a; --sub:rgba(20,33,61,.62); --line:rgba(20,33,61,.12);
  font-family:'Zen Kaku Gothic New','Noto Serif JP',serif; color:var(--ink); background:var(--bg); line-height:1.85; overflow-x:hidden; }
.sb-root img { display:block; max-width:100%; }
.sb-container { max-width:1200px; margin:0 auto; padding:0 24px; }
.sb-section { padding:120px 0; position:relative; }
@media(max-width:768px){ .sb-section{ padding:72px 0; } }

/* fade up */
.sb-fade { opacity:0; transform:translateY(40px); transition:opacity .9s ease-out, transform .9s ease-out; }
.sb-fade.is-in { opacity:1; transform:none; }

/* Disclaimer band */
.sb-warn { position:sticky; top:0; z-index:60; display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap;
  padding:8px 20px; background:#14213d; color:#f5f1e8; font-size:11px; letter-spacing:.05em; }
.sb-warn-pill { background:var(--gold); color:#14213d; padding:2px 10px; border-radius:999px; font-weight:700; font-family:'Libre Baskerville',serif; }
.sb-warn-text b { color:var(--gold); }
.sb-warn-back { color:#f5f1e8; text-decoration:none; opacity:.7; }
.sb-warn-back:hover { opacity:1; }

/* Header */
.sb-header { position:sticky; top:36px; z-index:50; background:rgba(245,241,232,.93); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.sb-header-inner { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; max-width:1280px; margin:0 auto; }
.sb-logo { display:flex; flex-direction:column; line-height:1.15; text-decoration:none; color:var(--ink); }
.sb-logo-en { font-family:'Libre Baskerville',serif; font-size:18px; letter-spacing:.16em; font-weight:700; }
.sb-logo-ja { font-size:10px; color:var(--sub); letter-spacing:.18em; margin-top:4px; }
.sb-nav { display:flex; align-items:center; gap:28px; }
.sb-nav a { color:var(--ink); text-decoration:none; font-size:13px; letter-spacing:.08em; transition:color .3s; }
.sb-nav a:hover { color:var(--gold-dark); }
.sb-nav-cta { background:var(--ink); color:var(--bg) !important; padding:10px 22px; border-radius:999px; font-size:12px !important; }
.sb-nav-cta:hover { background:var(--gold-dark); }
.sb-burger { display:none; background:none; border:0; width:32px; height:24px; flex-direction:column; justify-content:space-between; cursor:pointer; }
.sb-burger span { display:block; height:1.5px; background:var(--ink); transition:.3s; }
.sb-burger.is-open span:first-child { transform:translateY(11px) rotate(45deg); }
.sb-burger.is-open span:last-child  { transform:translateY(-11px) rotate(-45deg); }
@media(max-width:900px){
  .sb-burger{ display:flex; }
  .sb-nav { position:fixed; inset:0; background:rgba(20,33,61,.97); flex-direction:column; justify-content:center; align-items:center; gap:32px; transform:translateX(100%); transition:.5s; }
  .sb-nav.is-open { transform:none; }
  .sb-nav a { color:#f5f1e8; font-size:18px; }
  .sb-nav-cta { color:var(--ink) !important; background:var(--gold); }
}

/* Hero */
.sb-hero { position:relative; height:92vh; min-height:640px; overflow:hidden; color:#fff; }
.sb-hero-bg { position:absolute; inset:0; }
.sb-hero-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 2.4s ease-in-out; transform:scale(1.05); animation:sb-ken 16s ease-in-out infinite; }
.sb-hero-slide.is-active { opacity:1; }
.sb-hero-tint { position:absolute; inset:0; background:linear-gradient(180deg, rgba(20,33,61,.35) 0%, rgba(20,33,61,.55) 65%, rgba(20,33,61,.85) 100%); }
@keyframes sb-ken { 0%,100%{ transform:scale(1.05); } 50%{ transform:scale(1.15); } }
.sb-hero-vertical { position:absolute; top:120px; right:32px; writing-mode:vertical-rl; font-family:'Noto Serif JP',serif; font-size:14px; letter-spacing:.4em; color:rgba(245,241,232,.78); }
.sb-hero-vertical span { display:inline-block; margin-top:24px; font-size:10px; color:var(--gold); }
.sb-hero-content { position:relative; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 24px; max-width:1200px; margin:0 auto; z-index:2; }
.sb-hero-eyebrow { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.3em; color:var(--gold); margin-bottom:24px; }
.sb-hero-title { font-family:'Noto Serif JP',serif; font-weight:300; font-size:clamp(36px,5.2vw,72px); line-height:1.35; margin:0 0 32px; }
.sb-hero-title span { display:block; }
.sb-hero-sub { font-size:15px; line-height:2.1; max-width:560px; margin-bottom:40px; color:rgba(245,241,232,.92); }
.sb-hero-cta { display:flex; gap:16px; flex-wrap:wrap; }

/* Buttons */
.sb-btn { display:inline-flex; align-items:center; gap:14px; padding:16px 32px; font-size:13px; letter-spacing:.1em; text-decoration:none; transition:.35s; border-radius:0; }
.sb-btn i { font-style:normal; transition:transform .35s; }
.sb-btn:hover i { transform:translateX(6px); }
.sb-btn-gold { background:var(--gold); color:var(--ink); }
.sb-btn-gold:hover { background:var(--gold-dark); }
.sb-btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.5); }
.sb-btn-ghost:hover { background:rgba(255,255,255,.1); border-color:#fff; }
.sb-btn-outline { background:transparent; color:var(--gold); border:1px solid var(--gold); }
.sb-btn-outline:hover { background:var(--gold); color:var(--ink); }

/* Titles */
.sb-title { margin:0 0 64px; }
.sb-title-en { display:block; font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; letter-spacing:.35em; color:var(--gold-dark); margin-bottom:14px; }
.sb-title-ja { display:block; font-family:'Noto Serif JP',serif; font-weight:500; font-size:clamp(24px,3vw,38px); letter-spacing:.04em; line-height:1.5; }
.sb-title-light .sb-title-en { color:var(--gold); }
.sb-title-light .sb-title-ja { color:#f5f1e8; }

/* SVG draw lines */
.sb-draw { position:absolute; pointer-events:none; }
.sb-draw-1 { top:6%; left:0; width:100%; height:60%; z-index:0; }
.sb-draw-2 { bottom:0; left:0; width:100%; height:50%; z-index:0; }

/* About */
.sb-about { background:var(--bg); }
.sb-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
@media(max-width:900px){ .sb-about-grid{ grid-template-columns:1fr; gap:40px; } }
.sb-about-text h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(28px,3.4vw,44px); line-height:1.5; margin:0 0 32px; }
.sb-about-text p { font-size:15px; margin:0 0 24px; color:rgba(20,33,61,.85); }
.sb-about-quote { padding:24px 0 24px 24px; border-left:2px solid var(--gold); color:var(--ink) !important; font-family:'Noto Serif JP',serif; }
.sb-about-img { position:relative; }
.sb-about-img img { aspect-ratio:4/5; object-fit:cover; }
.sb-about-img-caption { position:absolute; bottom:12px; left:12px; background:rgba(20,33,61,.78); color:#f5f1e8; padding:4px 12px; font-size:10px; letter-spacing:.15em; }

/* Tech */
.sb-tech { background:var(--bg2); }
.sb-tech-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:48px 64px; }
@media(max-width:768px){ .sb-tech-list{ grid-template-columns:1fr; gap:32px; } }
.sb-tech-item { display:flex; gap:24px; align-items:flex-start; }
.sb-tech-num { font-family:'Libre Baskerville',serif; font-size:42px; line-height:1; color:var(--gold); font-style:italic; flex-shrink:0; }
.sb-tech-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0 0 12px; }
.sb-tech-body p { font-size:14px; color:var(--sub); margin:0; line-height:2; }

/* Marquee */
.sb-marquee { padding:48px 0; background:var(--ink); overflow:hidden; }
.sb-marquee-row { overflow:hidden; }
.sb-marquee-track { display:flex; gap:24px; animation:sb-marq 50s linear infinite; width:max-content; }
.sb-marquee-item { flex-shrink:0; width:260px; aspect-ratio:4/3; overflow:hidden; }
.sb-marquee-item img { width:100%; height:100%; object-fit:cover; }
@keyframes sb-marq { from{ transform:translateX(0); } to{ transform:translateX(-50%); } }

/* Works */
.sb-works { background:var(--bg); }
.sb-works-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:64px 48px; }
@media(max-width:768px){ .sb-works-list{ grid-template-columns:1fr; gap:48px; } }
.sb-works-item { cursor:pointer; }
.sb-works-img { position:relative; overflow:hidden; margin-bottom:20px; }
.sb-works-img img { aspect-ratio:4/3; object-fit:cover; transition:transform .8s ease; }
.sb-works-item:hover .sb-works-img img { transform:scale(1.06); }
.sb-works-tag { position:absolute; top:16px; left:16px; background:rgba(245,241,232,.92); color:var(--ink); padding:4px 14px; font-size:11px; letter-spacing:.15em; }
.sb-works-loc { font-family:'Libre Baskerville',serif; font-style:italic; font-size:12px; color:var(--gold-dark); letter-spacing:.1em; margin:0 0 8px; }
.sb-works-meta h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:21px; margin:0; line-height:1.5; }

/* Numbers */
.sb-numbers { background:var(--ink); color:#f5f1e8; }
.sb-numbers-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(4,1fr); gap:48px; }
@media(max-width:768px){ .sb-numbers-list{ grid-template-columns:1fr 1fr; gap:32px; } }
.sb-numbers-item { text-align:center; padding-top:32px; border-top:1px solid rgba(245,241,232,.18); }
.sb-numbers-num { font-family:'Libre Baskerville',serif; line-height:1; }
.sb-numbers-num span { font-size:clamp(48px,6vw,84px); color:var(--gold); }
.sb-numbers-num small { font-size:18px; margin-left:6px; color:rgba(245,241,232,.7); }
.sb-numbers-item p { font-size:13px; color:rgba(245,241,232,.7); margin:14px 0 0; letter-spacing:.1em; }

/* FAQ */
.sb-faq-list { list-style:none; padding:0; margin:0; }
.sb-faq-item { border-bottom:1px solid var(--line); }
.sb-faq-item button { width:100%; background:none; border:0; display:flex; justify-content:space-between; align-items:center; padding:24px 0; font-family:'Noto Serif JP',serif; font-size:16px; color:var(--ink); cursor:pointer; text-align:left; }
.sb-faq-item button i { display:block; width:20px; height:20px; position:relative; flex-shrink:0; }
.sb-faq-item button i::before, .sb-faq-item button i::after { content:''; position:absolute; background:var(--gold-dark); }
.sb-faq-item button i::before { top:50%; left:0; right:0; height:1.5px; transform:translateY(-50%); }
.sb-faq-item button i::after  { left:50%; top:0; bottom:0; width:1.5px; transform:translateX(-50%); transition:.3s; }
.sb-faq-item.is-open button i::after { transform:translateX(-50%) scaleY(0); }
.sb-faq-ans { max-height:0; overflow:hidden; transition:max-height .4s ease; }
.sb-faq-item.is-open .sb-faq-ans { max-height:200px; }
.sb-faq-ans p { padding:0 0 24px; color:var(--sub); font-size:14px; margin:0; line-height:2; }

/* Access */
.sb-access { background:var(--bg2); }
.sb-access-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:64px; }
@media(max-width:900px){ .sb-access-grid{ grid-template-columns:1fr; gap:32px; } }
.sb-access dl { display:grid; grid-template-columns:auto 1fr; gap:18px 28px; margin:0; }
.sb-access dt { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--gold-dark); font-size:12px; letter-spacing:.15em; padding-top:4px; }
.sb-access dd { margin:0; font-size:14px; }
.sb-access-map { aspect-ratio:4/3; background:#fff; overflow:hidden; }
.sb-access-map iframe { width:100%; height:100%; border:0; filter:grayscale(.4) contrast(.95); }

/* Contact */
.sb-contact { background:var(--ink); color:#f5f1e8; text-align:center; }
.sb-contact-inner { max-width:760px; }
.sb-contact p { font-size:15px; color:rgba(245,241,232,.85); margin:0 0 40px; }
.sb-contact-cta { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

/* Footer */
.sb-footer { background:#0c1729; color:rgba(245,241,232,.7); padding:64px 0 32px; }
.sb-footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-bottom:32px; border-bottom:1px solid rgba(245,241,232,.1); }
@media(max-width:768px){ .sb-footer-grid{ grid-template-columns:1fr; } }
.sb-footer-logo { font-family:'Libre Baskerville',serif; letter-spacing:.18em; color:#f5f1e8; margin:0 0 12px; }
.sb-footer-addr { font-size:12px; margin:0; line-height:1.9; }
.sb-footer nav { display:flex; flex-wrap:wrap; gap:18px 28px; align-content:flex-start; }
.sb-footer nav a { color:rgba(245,241,232,.65); text-decoration:none; font-size:12px; letter-spacing:.1em; }
.sb-footer nav a:hover { color:var(--gold); }
.sb-footer-copy { margin:32px 0 0; font-size:11px; letter-spacing:.1em; text-align:center; }
`
