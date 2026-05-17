import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS GLASS — 超高層・ガラス建築（落ち着いた大手ゼネコン風）
   薄灰×藍×真鍮 / 大判写真 + 余白 + Noto Serif JP
   SOM・日建設計風の重厚で誇張のない作り。
   ============================================================ */

export default function BuilderGlassDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [heroIdx, setHeroIdx] = useState(0)

  const heroImgs = [
    'photo-1545324418-cc1a3fa10c00',
    'photo-1486325212027-8081e485255e',
    'photo-1448630360428-65456885c650',
  ]

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImgs.length), 6500)
    return () => clearInterval(t)
  }, [])

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
          p.style.transition = 'stroke-dashoffset 3.2s ease-out'
          p.style.strokeDashoffset = '0'
        })
        ioStroke.unobserve(p)
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.gl-draw path').forEach((el) => ioStroke.observe(el))

    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } })
    }, { threshold: 0.18 })
    document.querySelectorAll('.gl-fade').forEach((el) => io.observe(el))
    return () => { ioStroke.disconnect(); io.disconnect() }
  }, [])

  return (
    <div className="gl-root">
      <style>{cssText}</style>

      <div className="gl-warn">
        <span className="gl-warn-pill">DEMO</span>
        <span className="gl-warn-text">本サイトは<b>架空の大手建築会社</b>のデザイン見本です。プロジェクト・社名・実績はすべて架空。</span>
        <a href="#hp" className="gl-warn-back">← 戻る</a>
      </div>

      {/* Header */}
      <header className="gl-header">
        <div className="gl-header-inner">
          <a href="#" className="gl-logo">
            <span className="gl-logo-en">POLARIS GLASS</span>
            <span className="gl-logo-ja">株式会社ポラリス建築（架空）</span>
          </a>
          <nav className={`gl-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about">私たちについて</a>
            <a href="#projects">プロジェクト</a>
            <a href="#capability">技術と体制</a>
            <a href="#sustainability">持続可能性</a>
            <a href="#access">本社案内</a>
            <a href="#contact" className="gl-nav-cta">お問い合わせ（仮）</a>
          </nav>
          <button className={`gl-burger ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero — quiet, large photo */}
      <section className="gl-hero">
        <div className="gl-hero-bg">
          {heroImgs.map((id, i) => (
            <div
              key={id}
              className={`gl-hero-slide ${heroIdx === i ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85)` }}
            />
          ))}
        </div>
        <div className="gl-hero-vertical">
          空に近づくほど、地に近づく。<span>※架空</span>
        </div>
        <div className="gl-hero-content">
          <p className="gl-hero-eyebrow">ARCHITECTURE & ENGINEERING</p>
          <h1 className="gl-hero-title">
            <span>街と、</span>
            <span>空をつくる。</span>
          </h1>
          <p className="gl-hero-sub">
            ポラリス建築は、超高層オフィス・複合用途・文化施設を手がける<br />
            架空の設計施工会社です。都市と人の関係を、建築の側から問い直します。
          </p>
        </div>
        <div className="gl-hero-meta">
          <div className="gl-hero-meta-item">
            <span className="gl-hero-meta-num">240</span>
            <span className="gl-hero-meta-label">m / 自社最高棟（架空）</span>
          </div>
          <div className="gl-hero-meta-item">
            <span className="gl-hero-meta-num">68</span>
            <span className="gl-hero-meta-label">プロジェクト / 直近10年（架空）</span>
          </div>
          <div className="gl-hero-meta-item">
            <span className="gl-hero-meta-num">12</span>
            <span className="gl-hero-meta-label">国際的なデザイン賞（架空）</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="gl-section gl-about">
        <svg className="gl-draw gl-draw-1" viewBox="0 0 1920 765" preserveAspectRatio="none">
          <path d="M2620,998s-490.977,448-967.983,594S700,1762,700,1762" transform="translate(-700 -997.6)" fill="none" stroke="#a08951" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="gl-container">
          <h2 className="gl-title gl-fade">
            <span className="gl-title-en">ABOUT</span>
            <span className="gl-title-ja">建築は、街の一部である。</span>
          </h2>
          <div className="gl-about-grid">
            <div className="gl-about-text gl-fade">
              <h3>
                高さを誇るためではなく、<br />
                人の暮らしを支えるために。
              </h3>
              <p>
                超高層建築は、長く都市と関わり続けます。<br />
                建てた瞬間の話題よりも、五十年・百年と立ち続けたあとに<br />
                街がどう変わったかを、私たちは大切にしています。
              </p>
              <p>
                眺望・採光・風の流れ。<br />
                足元の広場が、子どもの居場所になるかどうか。<br />
                ガラスの一枚一枚にも、そうした考えを織り込んでいます。
              </p>
            </div>
            <div className="gl-about-img gl-fade">
              <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1000&q=85" alt="" />
              <span className="gl-about-img-cap">※架空のプロジェクトイメージ</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="gl-section gl-projects">
        <div className="gl-container">
          <h2 className="gl-title gl-fade">
            <span className="gl-title-en">SELECTED PROJECTS</span>
            <span className="gl-title-ja">主要プロジェクト（架空）</span>
          </h2>
          <ul className="gl-projects-list">
            {[
              { img: 'photo-1486325212027-8081e485255e', t: '〇〇シティタワー（架空）', loc: '東京・〇〇区', year: '2024', use: 'オフィス / 商業', h: '240m / 47階', },
              { img: 'photo-1448630360428-65456885c650', t: '〇〇クロスゲート（架空）', loc: '大阪・〇〇区', year: '2023', use: '複合用途',       h: '180m / 38階', },
              { img: 'photo-1545324418-cc1a3fa10c00',    t: '〇〇国際会議場（架空）', loc: '京都府',     year: '2022', use: '文化施設',     h: '32m / 5階',   },
              { img: 'photo-1565008447742-97f6f38c985c', t: '〇〇市役所新庁舎（架空）', loc: '神奈川県',   year: '2021', use: '庁舎',         h: '64m / 12階',  },
            ].map((p, i) => (
              <li key={i} className="gl-projects-item gl-fade">
                <div className="gl-projects-img">
                  <img src={`https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1200&q=85`} alt="" />
                </div>
                <div className="gl-projects-meta">
                  <p className="gl-projects-year">{p.year} — {p.use}</p>
                  <h3>{p.t}</h3>
                  <dl>
                    <div><dt>所在地</dt><dd>{p.loc}</dd></div>
                    <div><dt>規模</dt><dd>{p.h}</dd></div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CAPABILITY */}
      <section id="capability" className="gl-section gl-cap">
        <div className="gl-container">
          <h2 className="gl-title gl-fade">
            <span className="gl-title-en">CAPABILITY</span>
            <span className="gl-title-ja">私たちの体制と技術</span>
          </h2>
          <div className="gl-cap-grid">
            {[
              { n: '01', t: '設計と施工をひとつに', s: '意匠・構造・設備、そして施工。各部門の責任者が、初期段階から同じ図面を見ます。' },
              { n: '02', t: '長期視点の構造計画', s: '免震・制振、メンテナンス性まで含めて、五十年単位で考える構造計画です。' },
              { n: '03', t: 'ファサードへの集中', s: '光・風・人の視線を制御するガラスの設計を、ファサード専門チームが担います。' },
              { n: '04', t: '地域と歩むプロセス', s: '工事中の騒音・粉塵・搬入動線まで、近隣の方と合意しながら進めます。' },
            ].map((c) => (
              <div key={c.n} className="gl-cap-item gl-fade">
                <span className="gl-cap-num">{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section id="sustainability" className="gl-section gl-sus">
        <div className="gl-container">
          <h2 className="gl-title gl-title-light gl-fade">
            <span className="gl-title-en">SUSTAINABILITY</span>
            <span className="gl-title-ja">建ててからの、長い責任</span>
          </h2>
          <div className="gl-sus-grid">
            <div className="gl-sus-text gl-fade">
              <p>
                建物は、つくる時間より、使われる時間のほうが、はるかに長い。<br />
                エネルギー、空気、街との関係。<br />
                建てたあとに関わり続けることが、私たちの本来の仕事だと考えています。
              </p>
              <p>
                既存建物の改修・用途転換・長期保全契約。<br />
                新築の半分以上のリソースを、すでに建っている建物に向けています（架空）。
              </p>
            </div>
            <ul className="gl-sus-list gl-fade">
              {[
                { n: '54', u: '%', l: '改修・保全事業の売上比率（架空）' },
                { n: '−42', u: '%', l: '自社CO₂排出量・対2015年比（架空）' },
                { n: '100', u: '%', l: '再生可能エネルギーで運営する事務所（架空）' },
              ].map((s, i) => (
                <li key={i}>
                  <div className="gl-sus-num"><span>{s.n}</span><small>{s.u}</small></div>
                  <p>{s.l}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gl-section gl-faq">
        <div className="gl-container">
          <h2 className="gl-title gl-fade">
            <span className="gl-title-en">FAQ</span>
            <span className="gl-title-ja">よくいただくご質問</span>
          </h2>
          <ul className="gl-faq-list">
            {[
              { q: '個人住宅の設計は依頼できますか？', a: '当社は超高層・大型複合用途を専門としています。住宅は提携の設計事務所（架空）をご紹介します。' },
              { q: '海外プロジェクトにも対応していますか？', a: 'アジア圏を中心に、現地パートナー（架空）と協働で進めています。' },
              { q: '設計コンペには参加できますか？', a: 'プロポーザル方式・指名コンペとも対応しております（架空）。' },
              { q: '採用情報はどこにありますか？', a: '新卒・キャリア採用ともに、別途採用サイト（架空）をご案内します。' },
            ].map((f, i) => (
              <li key={i} className={`gl-faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i />
                </button>
                <div className="gl-faq-ans"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="gl-section gl-access">
        <svg className="gl-draw gl-draw-2" viewBox="0 0 1920 825" preserveAspectRatio="none">
          <path d="M704,3316s298,170,582,214,1266,250,1338,610" transform="translate(-704 -3315.5)" fill="none" stroke="#a08951" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="gl-container">
          <h2 className="gl-title gl-fade">
            <span className="gl-title-en">HEADQUARTERS</span>
            <span className="gl-title-ja">本社のご案内</span>
          </h2>
          <div className="gl-access-grid gl-fade">
            <dl>
              <dt>本社</dt><dd>〒000-0000 東京都〇〇区〇〇 0-0-0 ポラリスタワー（実在しません）</dd>
              <dt>支店</dt><dd>大阪・名古屋・福岡・札幌・仙台（すべて架空）</dd>
              <dt>創業</dt><dd>1962年（架空）</dd>
              <dt>建設業許可</dt><dd>国土交通大臣許可（般-00）第00000号（※架空）</dd>
            </dl>
            <div className="gl-access-map">
              <iframe title="地図（架空）" src="https://www.openstreetmap.org/export/embed.html?bbox=139.6,35.65,139.8,35.75&layer=mapnik" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="gl-section gl-contact">
        <div className="gl-container gl-contact-inner gl-fade">
          <h2 className="gl-title gl-title-light">
            <span className="gl-title-en">CONTACT</span>
            <span className="gl-title-ja">プロジェクトのご相談</span>
          </h2>
          <p>
            事業ご検討中の案件・コンペへのご招聘、いずれもお気軽にどうぞ。<br />
            ご担当窓口より、改めてご連絡を差し上げます（架空）。
          </p>
          <div className="gl-contact-cta">
            <a href="#" className="gl-btn gl-btn-brass">プロジェクトを相談する（仮） →</a>
            <a href="#" className="gl-btn gl-btn-outline">採用情報を見る（仮） →</a>
          </div>
        </div>
      </section>

      <footer className="gl-footer">
        <div className="gl-container">
          <div className="gl-footer-grid">
            <div>
              <p className="gl-footer-logo">POLARIS GLASS（架空）</p>
              <p className="gl-footer-addr">〒000-0000 東京都〇〇区〇〇 0-0-0 ポラリスタワー<br />Tel. 03-0000-0000（※架空）</p>
            </div>
            <nav>
              <a href="#about">私たちについて</a>
              <a href="#projects">プロジェクト</a>
              <a href="#capability">技術と体制</a>
              <a href="#sustainability">持続可能性</a>
              <a href="#access">本社案内</a>
            </nav>
          </div>
          <p className="gl-footer-copy">© POLARIS GLASS (Fictional Demo) — Designed by Polaris Creative</p>
        </div>
      </footer>
    </div>
  )
}

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Noto+Serif+JP:wght@200;300;400;500;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');

.gl-root { --ink:#161a22; --bg:#f4f4f1; --bg2:#e6e6e0; --blue:#1c3354; --brass:#a08951; --brass-dark:#85703f; --sub:rgba(22,26,34,.62); --line:rgba(22,26,34,.14);
  font-family:'Zen Kaku Gothic New','Noto Serif JP',serif; color:var(--ink); background:var(--bg); line-height:1.85; overflow-x:hidden; }
.gl-root img { display:block; max-width:100%; }
.gl-container { max-width:1280px; margin:0 auto; padding:0 24px; }
.gl-section { padding:140px 0; position:relative; }
@media(max-width:768px){ .gl-section{ padding:80px 0; } }

.gl-fade { opacity:0; transform:translateY(40px); transition:opacity .9s ease-out, transform .9s ease-out; }
.gl-fade.is-in { opacity:1; transform:none; }

.gl-warn { position:sticky; top:0; z-index:60; display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; padding:8px 20px; background:#161a22; color:#f4f4f1; font-size:11px; letter-spacing:.05em; }
.gl-warn-pill { background:var(--brass); color:#161a22; padding:2px 10px; border-radius:999px; font-weight:700; font-family:'Libre Baskerville',serif; }
.gl-warn-text b { color:var(--brass); }
.gl-warn-back { color:#f4f4f1; text-decoration:none; opacity:.7; }
.gl-warn-back:hover { opacity:1; }

.gl-header { position:sticky; top:36px; z-index:50; background:rgba(244,244,241,.94); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.gl-header-inner { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; max-width:1320px; margin:0 auto; }
.gl-logo { display:flex; flex-direction:column; line-height:1.15; text-decoration:none; color:var(--ink); }
.gl-logo-en { font-family:'Libre Baskerville',serif; font-size:18px; letter-spacing:.18em; font-weight:700; }
.gl-logo-ja { font-size:10px; color:var(--sub); letter-spacing:.18em; margin-top:4px; }
.gl-nav { display:flex; align-items:center; gap:32px; }
.gl-nav a { color:var(--ink); text-decoration:none; font-size:13px; letter-spacing:.08em; }
.gl-nav a:hover { color:var(--brass-dark); }
.gl-nav-cta { background:var(--blue); color:#f4f4f1 !important; padding:10px 22px; border-radius:0; font-size:12px !important; }
.gl-nav-cta:hover { background:var(--ink); }
.gl-burger { display:none; background:none; border:0; width:32px; height:24px; flex-direction:column; justify-content:space-between; cursor:pointer; }
.gl-burger span { display:block; height:1.5px; background:var(--ink); transition:.3s; }
.gl-burger.is-open span:first-child { transform:translateY(11px) rotate(45deg); }
.gl-burger.is-open span:last-child  { transform:translateY(-11px) rotate(-45deg); }
@media(max-width:1000px){
  .gl-burger { display:flex; }
  .gl-nav { position:fixed; inset:0; background:rgba(22,26,34,.97); flex-direction:column; justify-content:center; align-items:center; gap:32px; transform:translateX(100%); transition:.5s; }
  .gl-nav.is-open { transform:none; }
  .gl-nav a { color:#f4f4f1; font-size:18px; }
}

/* Hero */
.gl-hero { position:relative; height:100vh; min-height:720px; overflow:hidden; color:#fff; }
.gl-hero-bg { position:absolute; inset:0; }
.gl-hero-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 2.6s ease-in-out; transform:scale(1.04); animation:gl-ken 20s ease-in-out infinite; }
.gl-hero-slide.is-active { opacity:1; }
@keyframes gl-ken { 0%,100%{ transform:scale(1.04); } 50%{ transform:scale(1.14); } }
.gl-hero-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(22,26,34,.25) 0%, rgba(22,26,34,.55) 70%, rgba(22,26,34,.78) 100%); }
.gl-hero-vertical { position:absolute; top:130px; right:32px; writing-mode:vertical-rl; font-family:'Noto Serif JP',serif; font-size:14px; letter-spacing:.4em; color:rgba(244,244,241,.82); z-index:2; }
.gl-hero-vertical span { display:inline-block; margin-top:24px; font-size:10px; color:var(--brass); }
.gl-hero-content { position:relative; height:calc(100% - 120px); display:flex; flex-direction:column; justify-content:center; padding:0 24px; max-width:1280px; margin:0 auto; z-index:2; }
.gl-hero-eyebrow { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.3em; color:var(--brass); margin-bottom:24px; }
.gl-hero-title { font-family:'Noto Serif JP',serif; font-weight:200; font-size:clamp(48px,7vw,108px); line-height:1.15; margin:0 0 32px; letter-spacing:.02em; }
.gl-hero-title span { display:block; }
.gl-hero-sub { font-size:15px; line-height:2.1; max-width:560px; color:rgba(244,244,241,.92); }
.gl-hero-meta { position:absolute; bottom:0; left:0; right:0; z-index:2; display:grid; grid-template-columns:repeat(3,1fr); padding:0 24px; max-width:1280px; margin:0 auto; }
.gl-hero-meta-item { padding:32px 0; border-top:1px solid rgba(244,244,241,.2); }
.gl-hero-meta-item:not(:last-child) { border-right:1px solid rgba(244,244,241,.12); padding-right:24px; }
.gl-hero-meta-item:not(:first-child) { padding-left:24px; }
.gl-hero-meta-num { display:block; font-family:'Libre Baskerville',serif; font-size:clamp(36px,4.2vw,52px); color:var(--brass); line-height:1; }
.gl-hero-meta-label { display:block; font-size:11px; color:rgba(244,244,241,.78); margin-top:8px; letter-spacing:.1em; }
@media(max-width:700px){ .gl-hero-meta{ grid-template-columns:1fr; } .gl-hero-meta-item{ padding:20px 0; border-right:0 !important; padding-left:0 !important; padding-right:0 !important; } }

.gl-btn { display:inline-flex; align-items:center; gap:14px; padding:18px 36px; font-size:13px; letter-spacing:.1em; text-decoration:none; transition:.35s; border-radius:0; }
.gl-btn-brass { background:var(--brass); color:#161a22; }
.gl-btn-brass:hover { background:var(--brass-dark); color:#fff; }
.gl-btn-outline { background:transparent; color:var(--brass); border:1px solid var(--brass); }
.gl-btn-outline:hover { background:var(--brass); color:#161a22; }

.gl-title { margin:0 0 72px; }
.gl-title-en { display:block; font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; letter-spacing:.35em; color:var(--brass-dark); margin-bottom:14px; }
.gl-title-ja { display:block; font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(26px,3.2vw,40px); letter-spacing:.04em; line-height:1.5; }
.gl-title-light .gl-title-en { color:var(--brass); }
.gl-title-light .gl-title-ja { color:#f4f4f1; }

.gl-draw { position:absolute; pointer-events:none; }
.gl-draw-1 { top:6%; left:0; width:100%; height:60%; }
.gl-draw-2 { bottom:0; left:0; width:100%; height:50%; }

/* About */
.gl-about-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:80px; align-items:center; }
@media(max-width:900px){ .gl-about-grid{ grid-template-columns:1fr; gap:40px; } }
.gl-about-text h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(28px,3.4vw,46px); line-height:1.5; margin:0 0 32px; }
.gl-about-text p { font-size:15px; margin:0 0 24px; color:rgba(22,26,34,.85); }
.gl-about-img { position:relative; }
.gl-about-img img { aspect-ratio:4/5; object-fit:cover; }
.gl-about-img-cap { position:absolute; bottom:12px; left:12px; background:rgba(22,26,34,.78); color:#f4f4f1; padding:4px 12px; font-size:10px; letter-spacing:.15em; }

/* Projects */
.gl-projects { background:var(--bg2); }
.gl-projects-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:96px; }
.gl-projects-item { display:grid; grid-template-columns:1.4fr 1fr; gap:64px; align-items:center; }
.gl-projects-item:nth-child(even) { grid-template-columns:1fr 1.4fr; }
.gl-projects-item:nth-child(even) .gl-projects-img { order:2; }
@media(max-width:900px){ .gl-projects-item, .gl-projects-item:nth-child(even){ grid-template-columns:1fr; gap:24px; } .gl-projects-item:nth-child(even) .gl-projects-img{ order:0; } }
.gl-projects-img img { aspect-ratio:16/10; object-fit:cover; }
.gl-projects-year { font-family:'Libre Baskerville',serif; font-style:italic; font-size:12px; color:var(--brass-dark); letter-spacing:.2em; margin:0 0 14px; }
.gl-projects-meta h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(24px,2.8vw,34px); margin:0 0 24px; line-height:1.4; }
.gl-projects-meta dl { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:0; padding-top:24px; border-top:1px solid var(--line); }
.gl-projects-meta dt { font-family:'Libre Baskerville',serif; font-style:italic; font-size:11px; color:var(--brass-dark); letter-spacing:.2em; }
.gl-projects-meta dd { margin:4px 0 0; font-size:14px; }

/* Capability */
.gl-cap-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; }
@media(max-width:768px){ .gl-cap-grid{ grid-template-columns:1fr; gap:40px; } }
.gl-cap-item { padding-top:32px; border-top:1px solid var(--line); }
.gl-cap-num { font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; color:var(--brass-dark); letter-spacing:.2em; }
.gl-cap-item h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:24px; margin:12px 0 16px; }
.gl-cap-item p { margin:0; font-size:14px; color:var(--sub); line-height:2; }

/* Sustainability */
.gl-sus { background:var(--blue); color:#f4f4f1; }
.gl-sus-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:64px; align-items:center; }
@media(max-width:900px){ .gl-sus-grid{ grid-template-columns:1fr; gap:40px; } }
.gl-sus-text p { font-size:15px; line-height:2.1; margin:0 0 24px; color:rgba(244,244,241,.88); }
.gl-sus-list { list-style:none; padding:0; margin:0; }
.gl-sus-list li { padding:24px 0; border-bottom:1px solid rgba(244,244,241,.18); display:grid; grid-template-columns:auto 1fr; gap:32px; align-items:center; }
.gl-sus-num { font-family:'Libre Baskerville',serif; line-height:1; min-width:140px; }
.gl-sus-num span { font-size:clamp(40px,5vw,60px); color:var(--brass); }
.gl-sus-num small { font-size:16px; color:rgba(244,244,241,.78); margin-left:6px; }
.gl-sus-list p { margin:0; font-size:13px; color:rgba(244,244,241,.78); letter-spacing:.05em; }

/* FAQ */
.gl-faq-list { list-style:none; padding:0; margin:0; max-width:920px; margin:0 auto; }
.gl-faq-item { border-bottom:1px solid var(--line); }
.gl-faq-item button { width:100%; background:none; border:0; display:flex; justify-content:space-between; align-items:center; padding:24px 0; font-family:'Noto Serif JP',serif; font-size:16px; color:var(--ink); cursor:pointer; text-align:left; }
.gl-faq-item button i { display:block; width:20px; height:20px; position:relative; flex-shrink:0; }
.gl-faq-item button i::before, .gl-faq-item button i::after { content:''; position:absolute; background:var(--brass-dark); }
.gl-faq-item button i::before { top:50%; left:0; right:0; height:1.5px; transform:translateY(-50%); }
.gl-faq-item button i::after  { left:50%; top:0; bottom:0; width:1.5px; transform:translateX(-50%); transition:.3s; }
.gl-faq-item.is-open button i::after { transform:translateX(-50%) scaleY(0); }
.gl-faq-ans { max-height:0; overflow:hidden; transition:max-height .4s ease; }
.gl-faq-item.is-open .gl-faq-ans { max-height:240px; }
.gl-faq-ans p { padding:0 0 24px; color:var(--sub); font-size:14px; margin:0; line-height:2; }

/* Access */
.gl-access { background:var(--bg2); }
.gl-access-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:64px; }
@media(max-width:900px){ .gl-access-grid{ grid-template-columns:1fr; gap:32px; } }
.gl-access dl { display:grid; grid-template-columns:auto 1fr; gap:18px 28px; margin:0; }
.gl-access dt { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--brass-dark); font-size:12px; letter-spacing:.15em; padding-top:4px; }
.gl-access dd { margin:0; font-size:14px; }
.gl-access-map { aspect-ratio:4/3; background:#fff; overflow:hidden; }
.gl-access-map iframe { width:100%; height:100%; border:0; filter:grayscale(.4); }

/* Contact */
.gl-contact { background:var(--ink); color:#f4f4f1; text-align:center; }
.gl-contact-inner { max-width:760px; }
.gl-contact p { font-size:15px; color:rgba(244,244,241,.85); margin:0 0 40px; }
.gl-contact-cta { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

/* Footer */
.gl-footer { background:#0e1219; color:rgba(244,244,241,.7); padding:64px 0 32px; }
.gl-footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-bottom:32px; border-bottom:1px solid rgba(244,244,241,.1); }
@media(max-width:768px){ .gl-footer-grid{ grid-template-columns:1fr; } }
.gl-footer-logo { font-family:'Libre Baskerville',serif; letter-spacing:.18em; color:#f4f4f1; margin:0 0 12px; }
.gl-footer-addr { font-size:12px; margin:0; line-height:1.9; }
.gl-footer nav { display:flex; flex-wrap:wrap; gap:18px 28px; }
.gl-footer nav a { color:rgba(244,244,241,.65); text-decoration:none; font-size:12px; letter-spacing:.1em; }
.gl-footer nav a:hover { color:var(--brass); }
.gl-footer-copy { margin:32px 0 0; font-size:11px; letter-spacing:.1em; text-align:center; }
`
