import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS HEAVY — 建設・重機系（重厚な職人会社風）
   炭墨×レンガ×ベージュ / 縦書き / 明朝
   ネオン色は使わず、現場で働く人の誇りを静かに伝える作り。
   ============================================================ */

export default function BuilderIndustrialDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [heroIdx, setHeroIdx] = useState(0)

  const heroImgs = [
    'photo-1581094794329-c8112a89af12',
    'photo-1541888946425-d81bb19240f5',
    'photo-1503387762-592deb58ef4e',
  ]

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImgs.length), 6000)
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
          p.style.transition = 'stroke-dashoffset 3s ease-out'
          p.style.strokeDashoffset = '0'
        })
        ioStroke.unobserve(p)
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.hv-draw path').forEach((el) => ioStroke.observe(el))

    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } })
    }, { threshold: 0.18 })
    document.querySelectorAll('.hv-fade').forEach((el) => io.observe(el))
    return () => { ioStroke.disconnect(); io.disconnect() }
  }, [])

  return (
    <div className="hv-root">
      <style>{cssText}</style>

      <div className="hv-warn">
        <span className="hv-warn-pill">DEMO</span>
        <span className="hv-warn-text">本サイトは<b>架空の建設会社</b>のデザイン見本です。住所・電話・実績はすべて架空。</span>
        <a href="#hp" className="hv-warn-back">← 戻る</a>
      </div>

      {/* Header */}
      <header className="hv-header">
        <div className="hv-header-inner">
          <a href="#" className="hv-logo">
            <span className="hv-logo-en">POLARIS HEAVY</span>
            <span className="hv-logo-ja">株式会社ポラリス重建（架空）</span>
          </a>
          <nav className={`hv-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about">会社のこと</a>
            <a href="#services">事業内容</a>
            <a href="#works">施工実績</a>
            <a href="#equipment">設備と人</a>
            <a href="#access">本社案内</a>
            <a href="#contact" className="hv-nav-cta">お見積もり（仮）</a>
          </nav>
          <button className={`hv-burger ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hv-hero">
        <div className="hv-hero-bg">
          {heroImgs.map((id, i) => (
            <div
              key={id}
              className={`hv-hero-slide ${heroIdx === i ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85)` }}
            />
          ))}
        </div>
        <div className="hv-hero-vertical">
          建てる前に、壊す仕事がある。<span>※架空</span>
        </div>
        <div className="hv-hero-content">
          <p className="hv-hero-eyebrow">DEMOLITION • CORE BORING • CUTTING</p>
          <h1 className="hv-hero-title">
            <span>壊す、</span>
            <span>削る、</span>
            <span>整える。</span>
          </h1>
          <p className="hv-hero-sub">
            コンクリート切断・コアボーリング・構造物の解体。<br />
            街の建て替えに、欠かせない仕事を引き受ける、<br />
            創業四十年の架空の建設会社です。
          </p>
          <div className="hv-hero-cta">
            <a href="#contact" className="hv-btn hv-btn-brick">お見積もりを依頼（仮） <i>→</i></a>
            <a href="#services" className="hv-btn hv-btn-ghost">事業内容を見る <i>→</i></a>
          </div>
        </div>
      </section>

      {/* Founder voice / About */}
      <section id="about" className="hv-section hv-about">
        <svg className="hv-draw hv-draw-1" viewBox="0 0 1920 765" preserveAspectRatio="none">
          <path d="M2620,998s-490.977,448-967.983,594S700,1762,700,1762" transform="translate(-700 -997.6)" fill="none" stroke="#9c5a3c" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="hv-container">
          <h2 className="hv-title hv-fade">
            <span className="hv-title-en">ABOUT</span>
            <span className="hv-title-ja">会社のことを少し</span>
          </h2>
          <div className="hv-about-grid">
            <div className="hv-about-text hv-fade">
              <h3>
                派手な仕事じゃ、<br />
                ないんです。
              </h3>
              <p>
                ビルが建つ前。橋が架けかえられる前。<br />
                必ず誰かが、コンクリートを切って、削って、運び出す仕事をしています。<br />
                ポラリス重建は、その「目立たない一手目」を引き受ける架空の会社です。
              </p>
              <p>
                早く、確実に、近隣に迷惑をかけずに。<br />
                それだけのことを四十年、淡々と続けてきました（架空）。<br />
                派手な仕事ではないけれど、誰かがやらなきゃならない仕事です。
              </p>
              <p className="hv-about-sign">— 代表（架空）</p>
            </div>
            <div className="hv-about-img hv-fade">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85" alt="" />
              <span className="hv-about-img-cap">※架空のイメージ写真</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="hv-section hv-services">
        <div className="hv-container">
          <h2 className="hv-title hv-fade">
            <span className="hv-title-en">SERVICES</span>
            <span className="hv-title-ja">事業内容（架空）</span>
          </h2>
          <ul className="hv-services-list">
            {[
              { n: '一', t: 'ダイヤモンドコアボーリング', s: 'φ20mm〜φ800mmまで対応。配管・配線用の精密貫通から、構造調査のサンプリングまで。' },
              { n: '二', t: 'ウォールソー切断', s: '壁・床の大規模切断。最大厚600mm（架空）まで、騒音と粉塵を抑えて施工します。' },
              { n: '三', t: '道路カッター施工', s: 'アスファルト・コンクリート舗装の精密切断。夜間・短時間工事にも対応します。' },
              { n: '四', t: '構造物解体・撤去', s: '橋脚・擁壁・基礎の部分解体から、ビル一棟の解体まで。近隣への配慮を最優先に。' },
              { n: '五', t: 'コンクリート破砕', s: '油圧圧砕・大割・小割。鉄筋と分別したうえでリサイクルに回します。' },
              { n: '六', t: '産業廃棄物の処理', s: '建設廃材の運搬・処分。マニフェスト管理まで、書類仕事も一括で。' },
            ].map((x) => (
              <li key={x.n} className="hv-services-item hv-fade">
                <div className="hv-services-num">{x.n}</div>
                <div className="hv-services-body">
                  <h3>{x.t}</h3>
                  <p>{x.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="hv-section hv-works">
        <div className="hv-container">
          <h2 className="hv-title hv-fade">
            <span className="hv-title-en">WORKS</span>
            <span className="hv-title-ja">最近のお仕事から（架空）</span>
          </h2>
          <ul className="hv-works-list">
            {[
              { img: 'photo-1503387762-592deb58ef4e', t: '高速道路高架の橋脚一部撤去（架空）', loc: '関東圏 / 2024 / 夜間工事', tag: '土木' },
              { img: 'photo-1581094794329-c8112a89af12', t: '築40年ビルの解体（架空）', loc: '東京・〇〇区 / 2024', tag: '解体' },
              { img: 'photo-1541888946425-d81bb19240f5', t: 'マンション基礎のコアボーリング（架空）', loc: '神奈川県 / 2023', tag: 'コア' },
              { img: 'photo-1486325212027-8081e485255e', t: '工場床のウォールソー切断（架空）', loc: '埼玉県 / 2023', tag: '切断' },
            ].map((w, i) => (
              <li key={i} className="hv-works-item hv-fade">
                <div className="hv-works-img">
                  <img src={`https://images.unsplash.com/${w.img}?auto=format&fit=crop&w=1200&q=85`} alt="" />
                  <span className="hv-works-tag">{w.tag}</span>
                </div>
                <div className="hv-works-meta">
                  <p className="hv-works-loc">{w.loc}</p>
                  <h3>{w.t}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipment & People */}
      <section id="equipment" className="hv-section hv-eq">
        <div className="hv-container">
          <h2 className="hv-title hv-title-light hv-fade">
            <span className="hv-title-en">EQUIPMENT & PEOPLE</span>
            <span className="hv-title-ja">設備、そして人</span>
          </h2>
          <ul className="hv-eq-list">
            {[
              { num: '120', unit: '台', label: 'コアドリル・カッター類（架空）' },
              { num: '38', unit: '人',   label: '正社員職人（架空）' },
              { num: '24', unit: '時間', label: '緊急対応の問い合わせ受付（架空）' },
              { num: '40', unit: '年',   label: '創業からの歩み（架空）' },
            ].map((e, i) => (
              <li key={i} className="hv-eq-item hv-fade">
                <div className="hv-eq-num"><span>{e.num}</span><small>{e.unit}</small></div>
                <p>{e.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="hv-section hv-faq">
        <div className="hv-container">
          <h2 className="hv-title hv-fade">
            <span className="hv-title-en">FAQ</span>
            <span className="hv-title-ja">よくいただくご質問</span>
          </h2>
          <ul className="hv-faq-list">
            {[
              { q: '夜間や早朝の作業もお願いできますか？', a: '幹線道路や商業施設の工事を中心に、夜間・早朝の対応も行っています（架空）。' },
              { q: '小規模な工事も依頼できますか？', a: '一箇所のコア抜きから、お受けしております。お気軽にお問い合わせください（架空）。' },
              { q: '対応エリアを教えてください', a: '関東一円が中心ですが、案件規模により全国対応も可能です（架空）。' },
              { q: '見積もりは有料ですか？', a: '現地調査・お見積もりは無料です。詳細図面のお預かりも対応します（架空）。' },
            ].map((f, i) => (
              <li key={i} className={`hv-faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i />
                </button>
                <div className="hv-faq-ans"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Access */}
      <section id="access" className="hv-section hv-access">
        <svg className="hv-draw hv-draw-2" viewBox="0 0 1920 825" preserveAspectRatio="none">
          <path d="M704,3316s298,170,582,214,1266,250,1338,610" transform="translate(-704 -3315.5)" fill="none" stroke="#9c5a3c" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="hv-container">
          <h2 className="hv-title hv-fade">
            <span className="hv-title-en">ACCESS</span>
            <span className="hv-title-ja">本社・資材置場のご案内</span>
          </h2>
          <div className="hv-access-grid hv-fade">
            <dl>
              <dt>本社</dt><dd>〒000-0000 東京都〇〇区〇〇 0-0-0（実在しません）</dd>
              <dt>資材置場</dt><dd>埼玉県・千葉県・神奈川県 計3か所（架空）</dd>
              <dt>営業時間</dt><dd>平日 8:00 – 18:00 / 土曜 8:00 – 17:00（架空）</dd>
              <dt>建設業許可</dt><dd>東京都知事許可（般-00）第00000号（※架空）</dd>
            </dl>
            <div className="hv-access-map">
              <iframe title="地図（架空）" src="https://www.openstreetmap.org/export/embed.html?bbox=139.6,35.65,139.8,35.75&layer=mapnik" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="hv-section hv-contact">
        <div className="hv-container hv-contact-inner hv-fade">
          <h2 className="hv-title hv-title-light">
            <span className="hv-title-en">CONTACT</span>
            <span className="hv-title-ja">ご相談・お見積もり</span>
          </h2>
          <p>
            「こんなことお願いできますか」という段階で、まず構いません。<br />
            電話・フォーム、お好みの方法でどうぞ（架空）。
          </p>
          <div className="hv-contact-cta">
            <a href="tel:0120-000-000" className="hv-btn hv-btn-brick">電話 0120-000-000（※架空） →</a>
            <a href="#" className="hv-btn hv-btn-outline">フォームから連絡 →</a>
          </div>
        </div>
      </section>

      <footer className="hv-footer">
        <div className="hv-container">
          <div className="hv-footer-grid">
            <div>
              <p className="hv-footer-logo">POLARIS HEAVY（架空）</p>
              <p className="hv-footer-addr">本社 〒000-0000 東京都〇〇区〇〇 0-0-0<br />Tel. 0120-000-000（※架空）</p>
            </div>
            <nav>
              <a href="#about">会社のこと</a>
              <a href="#services">事業内容</a>
              <a href="#works">施工実績</a>
              <a href="#equipment">設備と人</a>
              <a href="#access">本社案内</a>
            </nav>
          </div>
          <p className="hv-footer-copy">© POLARIS HEAVY (Fictional Demo) — Designed by Polaris Creative</p>
        </div>
      </footer>
    </div>
  )
}

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Noto+Serif+JP:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');

.hv-root { --ink:#1a1614; --bg:#ebe4d8; --bg2:#d8cdb9; --brick:#9c5a3c; --brick-dark:#7a4528; --sub:rgba(26,22,20,.62); --line:rgba(26,22,20,.16);
  font-family:'Zen Kaku Gothic New','Noto Serif JP',serif; color:var(--ink); background:var(--bg); line-height:1.85; overflow-x:hidden; }
.hv-root img { display:block; max-width:100%; }
.hv-container { max-width:1200px; margin:0 auto; padding:0 24px; }
.hv-section { padding:120px 0; position:relative; }
@media(max-width:768px){ .hv-section{ padding:72px 0; } }

.hv-fade { opacity:0; transform:translateY(40px); transition:opacity .9s ease-out, transform .9s ease-out; }
.hv-fade.is-in { opacity:1; transform:none; }

.hv-warn { position:sticky; top:0; z-index:60; display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; padding:8px 20px; background:#1a1614; color:#ebe4d8; font-size:11px; letter-spacing:.05em; }
.hv-warn-pill { background:var(--brick); color:#ebe4d8; padding:2px 10px; border-radius:999px; font-weight:700; font-family:'Libre Baskerville',serif; }
.hv-warn-text b { color:#d4a87a; }
.hv-warn-back { color:#ebe4d8; text-decoration:none; opacity:.7; }
.hv-warn-back:hover { opacity:1; }

.hv-header { position:sticky; top:36px; z-index:50; background:rgba(235,228,216,.94); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.hv-header-inner { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; max-width:1280px; margin:0 auto; }
.hv-logo { display:flex; flex-direction:column; line-height:1.15; text-decoration:none; color:var(--ink); }
.hv-logo-en { font-family:'Libre Baskerville',serif; font-size:18px; letter-spacing:.18em; font-weight:700; }
.hv-logo-ja { font-size:10px; color:var(--sub); letter-spacing:.18em; margin-top:4px; }
.hv-nav { display:flex; align-items:center; gap:28px; }
.hv-nav a { color:var(--ink); text-decoration:none; font-size:13px; letter-spacing:.08em; }
.hv-nav a:hover { color:var(--brick-dark); }
.hv-nav-cta { background:var(--brick); color:#ebe4d8 !important; padding:10px 22px; border-radius:0; font-size:12px !important; }
.hv-nav-cta:hover { background:var(--brick-dark); }
.hv-burger { display:none; background:none; border:0; width:32px; height:24px; flex-direction:column; justify-content:space-between; cursor:pointer; }
.hv-burger span { display:block; height:1.5px; background:var(--ink); transition:.3s; }
.hv-burger.is-open span:first-child { transform:translateY(11px) rotate(45deg); }
.hv-burger.is-open span:last-child  { transform:translateY(-11px) rotate(-45deg); }
@media(max-width:900px){
  .hv-burger { display:flex; }
  .hv-nav { position:fixed; inset:0; background:rgba(26,22,20,.97); flex-direction:column; justify-content:center; align-items:center; gap:32px; transform:translateX(100%); transition:.5s; }
  .hv-nav.is-open { transform:none; }
  .hv-nav a { color:#ebe4d8; font-size:18px; }
}

/* Hero */
.hv-hero { position:relative; height:92vh; min-height:680px; overflow:hidden; color:#fff; }
.hv-hero-bg { position:absolute; inset:0; }
.hv-hero-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 2.4s ease-in-out; transform:scale(1.05); animation:hv-ken 18s ease-in-out infinite; filter:grayscale(.2) contrast(1.05); }
.hv-hero-slide.is-active { opacity:1; }
@keyframes hv-ken { 0%,100%{ transform:scale(1.05); } 50%{ transform:scale(1.15); } }
.hv-hero-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(26,22,20,.35) 0%, rgba(26,22,20,.6) 65%, rgba(26,22,20,.88) 100%); }
.hv-hero-vertical { position:absolute; top:130px; right:32px; writing-mode:vertical-rl; font-family:'Noto Serif JP',serif; font-size:14px; letter-spacing:.4em; color:rgba(235,228,216,.78); z-index:2; }
.hv-hero-vertical span { display:inline-block; margin-top:24px; font-size:10px; color:#d4a87a; }
.hv-hero-content { position:relative; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 24px; max-width:1200px; margin:0 auto; z-index:2; }
.hv-hero-eyebrow { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.3em; color:#d4a87a; margin-bottom:24px; }
.hv-hero-title { font-family:'Noto Serif JP',serif; font-weight:300; font-size:clamp(48px,7vw,108px); line-height:1.15; margin:0 0 32px; }
.hv-hero-title span { display:block; }
.hv-hero-sub { font-size:15px; line-height:2.1; max-width:560px; margin-bottom:40px; color:rgba(235,228,216,.92); }
.hv-hero-cta { display:flex; gap:16px; flex-wrap:wrap; }

.hv-btn { display:inline-flex; align-items:center; gap:14px; padding:18px 36px; font-size:13px; letter-spacing:.1em; text-decoration:none; transition:.35s; border-radius:0; }
.hv-btn i { font-style:normal; transition:transform .35s; }
.hv-btn:hover i { transform:translateX(6px); }
.hv-btn-brick { background:var(--brick); color:#ebe4d8; }
.hv-btn-brick:hover { background:var(--brick-dark); }
.hv-btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.4); }
.hv-btn-ghost:hover { background:rgba(255,255,255,.08); border-color:#fff; }
.hv-btn-outline { background:transparent; color:#d4a87a; border:1px solid #d4a87a; }
.hv-btn-outline:hover { background:#d4a87a; color:var(--ink); }

.hv-title { margin:0 0 64px; }
.hv-title-en { display:block; font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; letter-spacing:.35em; color:var(--brick-dark); margin-bottom:14px; }
.hv-title-ja { display:block; font-family:'Noto Serif JP',serif; font-weight:500; font-size:clamp(24px,3vw,40px); letter-spacing:.04em; line-height:1.5; }
.hv-title-light .hv-title-en { color:#d4a87a; }
.hv-title-light .hv-title-ja { color:#ebe4d8; }

.hv-draw { position:absolute; pointer-events:none; }
.hv-draw-1 { top:6%; left:0; width:100%; height:60%; }
.hv-draw-2 { bottom:0; left:0; width:100%; height:50%; }

/* About */
.hv-about-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:80px; align-items:center; }
@media(max-width:900px){ .hv-about-grid{ grid-template-columns:1fr; gap:40px; } }
.hv-about-text h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(30px,3.8vw,50px); line-height:1.4; margin:0 0 32px; }
.hv-about-text p { font-size:15px; margin:0 0 24px; color:rgba(26,22,20,.85); }
.hv-about-sign { font-family:'Noto Serif JP',serif; font-style:italic; color:var(--brick-dark); margin-top:32px !important; }
.hv-about-img { position:relative; }
.hv-about-img img { aspect-ratio:4/5; object-fit:cover; filter:contrast(1.05); }
.hv-about-img-cap { position:absolute; bottom:12px; left:12px; background:rgba(26,22,20,.78); color:#ebe4d8; padding:4px 12px; font-size:10px; letter-spacing:.15em; }

/* Services */
.hv-services { background:var(--bg2); }
.hv-services-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:48px 64px; }
@media(max-width:768px){ .hv-services-list{ grid-template-columns:1fr; gap:32px; } }
.hv-services-item { display:flex; gap:24px; align-items:flex-start; }
.hv-services-num { font-family:'Noto Serif JP',serif; font-size:54px; line-height:1; color:var(--brick); font-weight:300; flex-shrink:0; min-width:54px; text-align:center; }
.hv-services-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0 0 12px; }
.hv-services-body p { font-size:14px; color:var(--sub); margin:0; line-height:2; }

/* Works */
.hv-works-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:64px 48px; }
@media(max-width:768px){ .hv-works-list{ grid-template-columns:1fr; gap:48px; } }
.hv-works-img { position:relative; overflow:hidden; margin-bottom:20px; }
.hv-works-img img { aspect-ratio:4/3; object-fit:cover; transition:transform .8s ease; filter:contrast(1.05); }
.hv-works-item:hover .hv-works-img img { transform:scale(1.06); }
.hv-works-tag { position:absolute; top:16px; left:16px; background:rgba(235,228,216,.92); color:var(--ink); padding:4px 14px; font-size:11px; letter-spacing:.15em; font-family:'Libre Baskerville',serif; }
.hv-works-loc { font-family:'Libre Baskerville',serif; font-style:italic; font-size:12px; color:var(--brick-dark); letter-spacing:.1em; margin:0 0 8px; }
.hv-works-meta h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0; line-height:1.5; }

/* Equipment */
.hv-eq { background:var(--ink); color:#ebe4d8; }
.hv-eq-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(4,1fr); gap:48px; }
@media(max-width:768px){ .hv-eq-list{ grid-template-columns:1fr 1fr; gap:32px; } }
.hv-eq-item { text-align:center; padding-top:32px; border-top:1px solid rgba(235,228,216,.2); }
.hv-eq-num { font-family:'Libre Baskerville',serif; line-height:1; }
.hv-eq-num span { font-size:clamp(48px,6vw,84px); color:#d4a87a; }
.hv-eq-num small { font-size:18px; margin-left:6px; color:rgba(235,228,216,.7); }
.hv-eq-item p { font-size:13px; color:rgba(235,228,216,.7); margin:14px 0 0; letter-spacing:.1em; }

/* FAQ */
.hv-faq-list { list-style:none; padding:0; margin:0; max-width:920px; margin:0 auto; }
.hv-faq-item { border-bottom:1px solid var(--line); }
.hv-faq-item button { width:100%; background:none; border:0; display:flex; justify-content:space-between; align-items:center; padding:24px 0; font-family:'Noto Serif JP',serif; font-size:16px; color:var(--ink); cursor:pointer; text-align:left; }
.hv-faq-item button i { display:block; width:20px; height:20px; position:relative; flex-shrink:0; }
.hv-faq-item button i::before, .hv-faq-item button i::after { content:''; position:absolute; background:var(--brick-dark); }
.hv-faq-item button i::before { top:50%; left:0; right:0; height:1.5px; transform:translateY(-50%); }
.hv-faq-item button i::after  { left:50%; top:0; bottom:0; width:1.5px; transform:translateX(-50%); transition:.3s; }
.hv-faq-item.is-open button i::after { transform:translateX(-50%) scaleY(0); }
.hv-faq-ans { max-height:0; overflow:hidden; transition:max-height .4s ease; }
.hv-faq-item.is-open .hv-faq-ans { max-height:240px; }
.hv-faq-ans p { padding:0 0 24px; color:var(--sub); font-size:14px; margin:0; line-height:2; }

/* Access */
.hv-access { background:var(--bg2); }
.hv-access-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:64px; }
@media(max-width:900px){ .hv-access-grid{ grid-template-columns:1fr; gap:32px; } }
.hv-access dl { display:grid; grid-template-columns:auto 1fr; gap:18px 28px; margin:0; }
.hv-access dt { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--brick-dark); font-size:12px; letter-spacing:.15em; padding-top:4px; }
.hv-access dd { margin:0; font-size:14px; }
.hv-access-map { aspect-ratio:4/3; background:#fff; overflow:hidden; }
.hv-access-map iframe { width:100%; height:100%; border:0; filter:grayscale(.4); }

/* Contact */
.hv-contact { background:var(--ink); color:#ebe4d8; text-align:center; }
.hv-contact-inner { max-width:760px; }
.hv-contact p { font-size:15px; color:rgba(235,228,216,.85); margin:0 0 40px; }
.hv-contact-cta { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

/* Footer */
.hv-footer { background:#100c0a; color:rgba(235,228,216,.7); padding:64px 0 32px; }
.hv-footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-bottom:32px; border-bottom:1px solid rgba(235,228,216,.1); }
@media(max-width:768px){ .hv-footer-grid{ grid-template-columns:1fr; } }
.hv-footer-logo { font-family:'Libre Baskerville',serif; letter-spacing:.18em; color:#ebe4d8; margin:0 0 12px; }
.hv-footer-addr { font-size:12px; margin:0; line-height:1.9; }
.hv-footer nav { display:flex; flex-wrap:wrap; gap:18px 28px; }
.hv-footer nav a { color:rgba(235,228,216,.65); text-decoration:none; font-size:12px; letter-spacing:.1em; }
.hv-footer nav a:hover { color:#d4a87a; }
.hv-footer-copy { margin:32px 0 0; font-size:11px; letter-spacing:.1em; text-align:center; }
`
