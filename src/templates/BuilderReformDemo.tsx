import { useEffect, useRef, useState } from 'react'

/* ============================================================
   ポラリス住まいの相談所 — リフォーム・住宅（和の制作会社風）
   ベージュ×オリーブ / 明朝 / 縦書き / 手描きSVG / マルキー
   Inspired by Japanese 工務店 production sites (Hygge / kunimatsu).
   ============================================================ */

export default function BuilderReformDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [beforeAfter, setBeforeAfter] = useState(50)
  const baRef = useRef<HTMLDivElement | null>(null)

  const heroImgs = [
    'photo-1600585154340-be6161a56a0c',
    'photo-1600210492493-0946911123ea',
    'photo-1556909114-f6e7ad7d3136',
  ]

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImgs.length), 5500)
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
    document.querySelectorAll('.rf-draw path').forEach((el) => ioStroke.observe(el))

    const ioFade = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); ioFade.unobserve(e.target) } })
    }, { threshold: 0.18 })
    document.querySelectorAll('.rf-fade').forEach((el) => ioFade.observe(el))
    return () => { ioStroke.disconnect(); ioFade.disconnect() }
  }, [])

  // Before/After drag
  useEffect(() => {
    const el = baRef.current; if (!el) return
    let dragging = false
    const move = (clientX: number) => {
      const rect = el.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 100
      setBeforeAfter(Math.max(2, Math.min(98, x)))
    }
    const onDown = (e: MouseEvent) => { dragging = true; move(e.clientX) }
    const onMove = (e: MouseEvent) => { if (dragging) move(e.clientX) }
    const onUp = () => { dragging = false }
    const onTouchStart = (e: TouchEvent) => { if (e.touches[0]) move(e.touches[0].clientX) }
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) move(e.touches[0].clientX) }
    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onTouchStart)
    el.addEventListener('touchmove', onTouchMove)
    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div className="rf-root">
      <style>{cssText}</style>

      <div className="rf-warn">
        <span className="rf-warn-pill">DEMO</span>
        <span className="rf-warn-text">本サイトは<b>架空のリフォーム会社</b>のデザイン見本です。住所・電話・施工事例はすべて架空。</span>
        <a href="#hp" className="rf-warn-back">← 戻る</a>
      </div>

      {/* Header */}
      <header className="rf-header">
        <div className="rf-header-inner">
          <a href="#" className="rf-logo">
            <span className="rf-logo-en">POLARIS HOUSE</span>
            <span className="rf-logo-ja">ポラリス住まいの相談所（架空）</span>
          </a>
          <nav className={`rf-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about">想い</a>
            <a href="#reform">リフォーム</a>
            <a href="#voice">お客様の声</a>
            <a href="#flow">家づくりの流れ</a>
            <a href="#access">アクセス</a>
            <a href="#contact" className="rf-nav-cta">無料相談（仮）</a>
          </nav>
          <button className={`rf-burger ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="rf-hero">
        <div className="rf-hero-bg">
          {heroImgs.map((id, i) => (
            <div
              key={id}
              className={`rf-hero-slide ${heroIdx === i ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80)` }}
            />
          ))}
        </div>
        <div className="rf-hero-vertical">
          住みなれた家を、もう少し、好きに。<span>※架空</span>
        </div>
        <div className="rf-hero-content">
          <p className="rf-hero-eyebrow">RENOVATION FOR DAILY LIFE</p>
          <h1 className="rf-hero-title">
            <span>あと十年、</span>
            <span>あの家で。</span>
          </h1>
          <p className="rf-hero-sub">
            ポラリス住まいの相談所は、地域に根ざした架空のリフォーム会社です。<br />
            キッチンの一角から、水まわり一式、フルリノベまで──。<br />
            まずは、お茶を飲みながらお話を聞かせてください。
          </p>
          <div className="rf-hero-cta">
            <a href="#contact" className="rf-btn rf-btn-olive">無料相談を申し込む（仮） <i>→</i></a>
            <a href="#reform" className="rf-btn rf-btn-ghost">施工メニューを見る <i>→</i></a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="rf-section rf-about">
        <svg className="rf-draw rf-draw-1" viewBox="0 0 1920 765" preserveAspectRatio="none">
          <path d="M2620,998s-490.977,448-967.983,594S700,1762,700,1762" transform="translate(-700 -997.6)" fill="none" stroke="#6b8e4e" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">ABOUT</span>
            <span className="rf-title-ja">家を、もう一度好きになる。</span>
          </h2>
          <div className="rf-about-grid">
            <div className="rf-about-text rf-fade">
              <h3>
                建て替えなくても、<br />
                できることがあります。
              </h3>
              <p>
                築20年、30年。雨漏りや段差が気になるけれど、<br />
                思い出のある家を、できれば残したい──。<br />
                そんなご相談から、家づくりが始まることがほとんどです。
              </p>
              <p>
                ポラリス住まいの相談所は、まず「今の家を測り直す」ことから始めます。<br />
                断熱・耐震・動線・家計。それぞれの目線で見直して、<br />
                ご家族にちょうどよい一手をご提案します。
              </p>
            </div>
            <div className="rf-about-img rf-fade">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" alt="" />
              <span className="rf-about-img-cap">※架空のイメージ写真</span>
            </div>
          </div>
        </div>
      </section>

      {/* REFORM MENU */}
      <section id="reform" className="rf-section rf-reform">
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">MENU</span>
            <span className="rf-title-ja">リフォームメニュー（架空）</span>
          </h2>
          <ul className="rf-reform-list">
            {[
              { n: '01', img: 'photo-1556909114-f6e7ad7d3136', t: 'キッチン', s: '使いやすく、お手入れしやすく。設備の入れ替えから、間取り変更を伴う本格的なものまで。', p: '¥80万〜' },
              { n: '02', img: 'photo-1552321554-5fefe8c9ef14', t: '浴室・洗面所', s: 'ヒートショック対策・バリアフリー化を含めて。冬の朝も、子育てにもやさしい水まわりに。',     p: '¥60万〜' },
              { n: '03', img: 'photo-1600607687939-ce8a6c25118c', t: 'フルリノベーション', s: '間取り変更・耐震補強・断熱改修まで一括で。引き渡しまで、専属担当がご一緒します。',     p: '¥800万〜' },
              { n: '04', img: 'photo-1600210492493-0946911123ea', t: '外構・エクステリア',     s: 'カーポート、ウッドデッキ、目隠しフェンスなど。外まわりの「もう少し」を整えます。',         p: '¥30万〜' },
            ].map((m) => (
              <li key={m.n} className="rf-reform-item rf-fade">
                <div className="rf-reform-img">
                  <img src={`https://images.unsplash.com/${m.img}?auto=format&fit=crop&w=900&q=80`} alt="" />
                  <span className="rf-reform-num">{m.n}</span>
                </div>
                <div className="rf-reform-body">
                  <h3>{m.t}</h3>
                  <p>{m.s}</p>
                  <div className="rf-reform-price">{m.p}（架空・税抜）</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="rf-section rf-ba">
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">BEFORE / AFTER</span>
            <span className="rf-title-ja">スライドで見る、リフォーム事例（架空）</span>
          </h2>
          <p className="rf-ba-lead rf-fade">中央のつまみを左右に動かしてください。</p>
          <div className="rf-ba-wrap rf-fade" ref={baRef}>
            <img className="rf-ba-img" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" alt="after" />
            <div className="rf-ba-before" style={{ clipPath: `inset(0 ${100 - beforeAfter}% 0 0)` }}>
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80&sat=-100" alt="before" />
            </div>
            <div className="rf-ba-handle" style={{ left: `${beforeAfter}%` }}>
              <span>‹ ›</span>
            </div>
            <span className="rf-ba-tag rf-ba-tag-l">BEFORE</span>
            <span className="rf-ba-tag rf-ba-tag-r">AFTER</span>
          </div>
        </div>
      </section>

      {/* VOICE */}
      <section id="voice" className="rf-section rf-voice">
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">VOICE</span>
            <span className="rf-title-ja">お客様の声（架空）</span>
          </h2>
          <div className="rf-voice-grid">
            {[
              { name: '架空のK様 ご家族', area: '東京都・〇〇区 / キッチン改修', text: 'キッチンが見違えるほど明るくなって、料理が楽しくなりました。担当の方が「奥さんが立つ位置」までしっかり測ってくれたのが嬉しかったです。' },
              { name: '架空のS様',         area: '神奈川県・〇〇市 / 浴室改修',   text: '冬場の脱衣所が寒くてつらかったのですが、提案いただいた断熱と床暖で、朝の支度が苦になりません。' },
              { name: '架空のT様 ご夫妻',  area: '埼玉県・〇〇市 / フルリノベ',   text: '築40年の家を「壊さずに残したい」とお願いしました。設計士さんと棟梁が、何度も現地で打合せをしてくださり、納得して進められました。' },
            ].map((v, i) => (
              <div key={i} className="rf-voice-item rf-fade">
                <div className="rf-voice-mark">「</div>
                <p className="rf-voice-text">{v.text}</p>
                <div className="rf-voice-meta">
                  <div className="rf-voice-name">— {v.name}</div>
                  <div className="rf-voice-area">{v.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="rf-section rf-flow">
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">FLOW</span>
            <span className="rf-title-ja">ご相談からお引き渡しまで</span>
          </h2>
          <ol className="rf-flow-list">
            {[
              { t: 'まずはお話を', s: 'お電話・フォームから。「どこから手をつければ…」という段階でも大丈夫です。' },
              { t: '現地調査', s: '建物を実測し、図面と写真を残します。立ち会いはご家族の都合に合わせて。' },
              { t: 'ご提案・お見積もり', s: '概算と詳細、二段階でお出しします。比較していただける形で。' },
              { t: 'ご契約・工事', s: '専属の現場監督がご担当。工事中も、進捗を写真でお届けします。' },
              { t: 'お引き渡し・アフター', s: '引渡しの日から、長いお付き合いの始まり。年次点検にお伺いします。' },
            ].map((f, i) => (
              <li key={i} className="rf-flow-item rf-fade">
                <div className="rf-flow-step">STEP <span>0{i + 1}</span></div>
                <div className="rf-flow-body">
                  <h3>{f.t}</h3>
                  <p>{f.s}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="rf-section rf-faq">
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">FAQ</span>
            <span className="rf-title-ja">よくいただくご質問</span>
          </h2>
          <ul className="rf-faq-list">
            {[
              { q: '見積りだけでもお願いできますか？', a: 'はい。概算見積もりまでは無料です。詳細図面を伴うお見積もりからは設計料を申し受けます（架空）。' },
              { q: '工事中は家に住めますか？', a: '部分リフォームは住みながらが可能です。フルリノベの場合は、仮住まいのご相談も承ります（架空）。' },
              { q: 'マンションでも依頼できますか？', a: '管理規約をご確認のうえ、専有部のリフォームに対応しています（架空）。' },
              { q: '補助金は使えますか？', a: '断熱改修・耐震改修・子育て世帯向けなど、対象となる補助金をご案内します（架空）。' },
            ].map((f, i) => (
              <li key={i} className={`rf-faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i />
                </button>
                <div className="rf-faq-ans"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="rf-section rf-access">
        <svg className="rf-draw rf-draw-2" viewBox="0 0 1920 825" preserveAspectRatio="none">
          <path d="M704,3316s298,170,582,214,1266,250,1338,610" transform="translate(-704 -3315.5)" fill="none" stroke="#6b8e4e" strokeWidth="1" style={{ visibility: 'hidden' }} />
        </svg>
        <div className="rf-container">
          <h2 className="rf-title rf-fade">
            <span className="rf-title-en">ACCESS</span>
            <span className="rf-title-ja">事務所のご案内</span>
          </h2>
          <div className="rf-access-grid rf-fade">
            <dl>
              <dt>所在地</dt><dd>〒000-0000 東京都〇〇市〇〇 0-0-0（実在しません）</dd>
              <dt>電話</dt><dd>0120-000-000（※架空）</dd>
              <dt>営業時間</dt><dd>9:00 – 19:00 年中無休（盆暮れ除く）（架空）</dd>
              <dt>建設業許可</dt><dd>東京都知事許可（般-00）第00000号（※架空）</dd>
            </dl>
            <div className="rf-access-map">
              <iframe title="地図（架空）" src="https://www.openstreetmap.org/export/embed.html?bbox=139.6,35.65,139.8,35.75&layer=mapnik" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="rf-section rf-contact">
        <div className="rf-container rf-contact-inner rf-fade">
          <h2 className="rf-title rf-title-light">
            <span className="rf-title-en">CONTACT</span>
            <span className="rf-title-ja">まずはお茶でも飲みながら。</span>
          </h2>
          <p>
            ご相談は無料です。電話・フォーム、お好みの方法で。<br />
            営業のおしかけはいたしません（架空）。
          </p>
          <div className="rf-contact-cta">
            <a href="#" className="rf-btn rf-btn-olive">無料相談を申し込む（仮） →</a>
            <a href="tel:0120-000-000" className="rf-btn rf-btn-outline">0120-000-000（※架空）</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="rf-footer">
        <div className="rf-container">
          <div className="rf-footer-grid">
            <div>
              <p className="rf-footer-logo">POLARIS HOUSE（架空）</p>
              <p className="rf-footer-addr">〒000-0000 東京都〇〇市〇〇 0-0-0<br />Tel. 0120-000-000（※架空）</p>
            </div>
            <nav>
              <a href="#about">想い</a>
              <a href="#reform">リフォーム</a>
              <a href="#voice">お客様の声</a>
              <a href="#flow">家づくりの流れ</a>
              <a href="#access">アクセス</a>
            </nav>
          </div>
          <p className="rf-footer-copy">© POLARIS HOUSE (Fictional Demo) — Designed by Polaris Creative</p>
        </div>
      </footer>
    </div>
  )
}

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Noto+Serif+JP:wght@300;400;500;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');

.rf-root { --ink:#3a2e1f; --bg:#faf7f1; --bg2:#f1eadb; --olive:#6b8e4e; --olive-dark:#557139; --gold:#c6a647; --sub:rgba(58,46,31,.65); --line:rgba(58,46,31,.14);
  font-family:'Zen Kaku Gothic New','Noto Serif JP',serif; color:var(--ink); background:var(--bg); line-height:1.85; overflow-x:hidden; }
.rf-root img { display:block; max-width:100%; }
.rf-container { max-width:1200px; margin:0 auto; padding:0 24px; }
.rf-section { padding:120px 0; position:relative; }
@media(max-width:768px){ .rf-section{ padding:72px 0; } }

.rf-fade { opacity:0; transform:translateY(40px); transition:opacity .9s ease-out, transform .9s ease-out; }
.rf-fade.is-in { opacity:1; transform:none; }

.rf-warn { position:sticky; top:0; z-index:60; display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; padding:8px 20px; background:#3a2e1f; color:#faf7f1; font-size:11px; letter-spacing:.05em; }
.rf-warn-pill { background:var(--olive); color:#faf7f1; padding:2px 10px; border-radius:999px; font-weight:700; font-family:'Libre Baskerville',serif; }
.rf-warn-text b { color:var(--gold); }
.rf-warn-back { color:#faf7f1; text-decoration:none; opacity:.7; }
.rf-warn-back:hover { opacity:1; }

.rf-header { position:sticky; top:36px; z-index:50; background:rgba(250,247,241,.93); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.rf-header-inner { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; max-width:1280px; margin:0 auto; }
.rf-logo { display:flex; flex-direction:column; line-height:1.15; text-decoration:none; color:var(--ink); }
.rf-logo-en { font-family:'Libre Baskerville',serif; font-size:17px; letter-spacing:.18em; font-weight:700; }
.rf-logo-ja { font-size:10px; color:var(--sub); letter-spacing:.18em; margin-top:4px; }
.rf-nav { display:flex; align-items:center; gap:28px; }
.rf-nav a { color:var(--ink); text-decoration:none; font-size:13px; letter-spacing:.08em; }
.rf-nav a:hover { color:var(--olive-dark); }
.rf-nav-cta { background:var(--olive); color:#faf7f1 !important; padding:10px 22px; border-radius:999px; font-size:12px !important; }
.rf-nav-cta:hover { background:var(--olive-dark); }
.rf-burger { display:none; background:none; border:0; width:32px; height:24px; flex-direction:column; justify-content:space-between; cursor:pointer; }
.rf-burger span { display:block; height:1.5px; background:var(--ink); transition:.3s; }
.rf-burger.is-open span:first-child { transform:translateY(11px) rotate(45deg); }
.rf-burger.is-open span:last-child  { transform:translateY(-11px) rotate(-45deg); }
@media(max-width:900px){
  .rf-burger{ display:flex; }
  .rf-nav { position:fixed; inset:0; background:rgba(58,46,31,.96); flex-direction:column; justify-content:center; align-items:center; gap:32px; transform:translateX(100%); transition:.5s; }
  .rf-nav.is-open { transform:none; }
  .rf-nav a { color:#faf7f1; font-size:18px; }
  .rf-nav-cta { color:var(--ink) !important; background:var(--gold); }
}

/* Hero */
.rf-hero { position:relative; height:92vh; min-height:640px; overflow:hidden; color:#fff; }
.rf-hero-bg { position:absolute; inset:0; }
.rf-hero-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity 2.4s ease-in-out; transform:scale(1.05); animation:rf-ken 16s ease-in-out infinite; }
.rf-hero-slide.is-active { opacity:1; }
@keyframes rf-ken { 0%,100%{ transform:scale(1.05); } 50%{ transform:scale(1.15); } }
.rf-hero-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(58,46,31,.2) 0%, rgba(58,46,31,.55) 75%, rgba(58,46,31,.78) 100%); }
.rf-hero-vertical { position:absolute; top:120px; right:32px; writing-mode:vertical-rl; font-family:'Noto Serif JP',serif; font-size:14px; letter-spacing:.4em; color:rgba(250,247,241,.8); z-index:2; }
.rf-hero-vertical span { display:inline-block; margin-top:24px; font-size:10px; color:var(--gold); }
.rf-hero-content { position:relative; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 24px; max-width:1200px; margin:0 auto; z-index:2; }
.rf-hero-eyebrow { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.3em; color:var(--gold); margin-bottom:24px; }
.rf-hero-title { font-family:'Noto Serif JP',serif; font-weight:300; font-size:clamp(40px,6vw,84px); line-height:1.3; margin:0 0 32px; }
.rf-hero-title span { display:block; }
.rf-hero-sub { font-size:15px; line-height:2.1; max-width:540px; margin-bottom:40px; color:rgba(250,247,241,.92); }
.rf-hero-cta { display:flex; gap:16px; flex-wrap:wrap; }

.rf-btn { display:inline-flex; align-items:center; gap:14px; padding:16px 32px; font-size:13px; letter-spacing:.1em; text-decoration:none; transition:.35s; border-radius:0; }
.rf-btn i { font-style:normal; transition:transform .35s; }
.rf-btn:hover i { transform:translateX(6px); }
.rf-btn-olive { background:var(--olive); color:#faf7f1; }
.rf-btn-olive:hover { background:var(--olive-dark); }
.rf-btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.5); }
.rf-btn-ghost:hover { background:rgba(255,255,255,.1); }
.rf-btn-outline { background:transparent; color:var(--gold); border:1px solid var(--gold); }
.rf-btn-outline:hover { background:var(--gold); color:var(--ink); }

.rf-title { margin:0 0 64px; }
.rf-title-en { display:block; font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; letter-spacing:.35em; color:var(--olive-dark); margin-bottom:14px; }
.rf-title-ja { display:block; font-family:'Noto Serif JP',serif; font-weight:500; font-size:clamp(24px,3vw,38px); letter-spacing:.04em; line-height:1.5; }
.rf-title-light .rf-title-en { color:var(--gold); }
.rf-title-light .rf-title-ja { color:#faf7f1; }

.rf-draw { position:absolute; pointer-events:none; }
.rf-draw-1 { top:6%; left:0; width:100%; height:60%; }
.rf-draw-2 { bottom:0; left:0; width:100%; height:50%; }

/* About */
.rf-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
@media(max-width:900px){ .rf-about-grid{ grid-template-columns:1fr; gap:40px; } }
.rf-about-text h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(28px,3.4vw,44px); line-height:1.5; margin:0 0 32px; }
.rf-about-text p { font-size:15px; margin:0 0 24px; color:rgba(58,46,31,.85); }
.rf-about-img { position:relative; }
.rf-about-img img { aspect-ratio:4/5; object-fit:cover; }
.rf-about-img-cap { position:absolute; bottom:12px; left:12px; background:rgba(58,46,31,.78); color:#faf7f1; padding:4px 12px; font-size:10px; letter-spacing:.15em; }

/* Reform menu */
.rf-reform { background:var(--bg2); }
.rf-reform-list { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:64px 56px; }
@media(max-width:768px){ .rf-reform-list{ grid-template-columns:1fr; gap:48px; } }
.rf-reform-img { position:relative; overflow:hidden; margin-bottom:24px; }
.rf-reform-img img { aspect-ratio:5/3; object-fit:cover; transition:transform .8s; }
.rf-reform-item:hover .rf-reform-img img { transform:scale(1.06); }
.rf-reform-num { position:absolute; left:16px; bottom:12px; font-family:'Libre Baskerville',serif; font-style:italic; color:#faf7f1; font-size:28px; letter-spacing:.15em; }
.rf-reform-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:22px; margin:0 0 12px; }
.rf-reform-body p { font-size:14px; color:var(--sub); margin:0 0 16px; line-height:2; }
.rf-reform-price { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--olive-dark); font-size:14px; letter-spacing:.1em; }

/* Before/After */
.rf-ba { background:var(--bg); }
.rf-ba-lead { text-align:center; color:var(--sub); margin:-40px 0 32px; font-size:13px; }
.rf-ba-wrap { position:relative; max-width:900px; margin:0 auto; aspect-ratio:16/9; overflow:hidden; cursor:ew-resize; user-select:none; }
.rf-ba-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.rf-ba-before { position:absolute; inset:0; }
.rf-ba-before img { width:100%; height:100%; object-fit:cover; filter:grayscale(.5); }
.rf-ba-handle { position:absolute; top:0; bottom:0; width:2px; background:#faf7f1; transform:translateX(-50%); }
.rf-ba-handle span { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:48px; height:48px; border-radius:50%; background:var(--olive); color:#faf7f1; display:flex; align-items:center; justify-content:center; font-size:18px; letter-spacing:-2px; }
.rf-ba-tag { position:absolute; top:16px; padding:4px 14px; background:rgba(58,46,31,.78); color:#faf7f1; font-family:'Libre Baskerville',serif; font-size:11px; letter-spacing:.2em; }
.rf-ba-tag-l { left:16px; }
.rf-ba-tag-r { right:16px; }

/* Voice */
.rf-voice { background:var(--bg2); }
.rf-voice-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; }
@media(max-width:900px){ .rf-voice-grid{ grid-template-columns:1fr; } }
.rf-voice-item { background:#faf7f1; padding:36px 28px; position:relative; }
.rf-voice-mark { position:absolute; top:-16px; left:24px; font-family:'Noto Serif JP',serif; font-size:84px; line-height:1; color:var(--olive); opacity:.5; }
.rf-voice-text { font-family:'Noto Serif JP',serif; font-size:15px; line-height:2; margin:0 0 24px; }
.rf-voice-meta { border-top:1px solid var(--line); padding-top:16px; }
.rf-voice-name { font-size:13px; font-weight:500; color:var(--ink); }
.rf-voice-area { font-size:11px; color:var(--sub); margin-top:4px; letter-spacing:.1em; }

/* Flow */
.rf-flow-list { list-style:none; padding:0; margin:0; }
.rf-flow-item { display:flex; gap:32px; padding:32px 0; border-bottom:1px dashed var(--line); }
.rf-flow-step { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.2em; color:var(--olive-dark); flex-shrink:0; padding-top:4px; min-width:90px; }
.rf-flow-step span { font-size:32px; font-style:normal; color:var(--olive); display:block; margin-top:6px; }
.rf-flow-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0 0 8px; }
.rf-flow-body p { color:var(--sub); margin:0; font-size:14px; line-height:2; }
@media(max-width:768px){ .rf-flow-item{ flex-direction:column; gap:8px; } }

/* FAQ */
.rf-faq-list { list-style:none; padding:0; margin:0; }
.rf-faq-item { border-bottom:1px solid var(--line); }
.rf-faq-item button { width:100%; background:none; border:0; display:flex; justify-content:space-between; align-items:center; padding:24px 0; font-family:'Noto Serif JP',serif; font-size:16px; color:var(--ink); cursor:pointer; text-align:left; }
.rf-faq-item button i { display:block; width:20px; height:20px; position:relative; flex-shrink:0; }
.rf-faq-item button i::before, .rf-faq-item button i::after { content:''; position:absolute; background:var(--olive-dark); }
.rf-faq-item button i::before { top:50%; left:0; right:0; height:1.5px; transform:translateY(-50%); }
.rf-faq-item button i::after  { left:50%; top:0; bottom:0; width:1.5px; transform:translateX(-50%); transition:.3s; }
.rf-faq-item.is-open button i::after { transform:translateX(-50%) scaleY(0); }
.rf-faq-ans { max-height:0; overflow:hidden; transition:max-height .4s ease; }
.rf-faq-item.is-open .rf-faq-ans { max-height:240px; }
.rf-faq-ans p { padding:0 0 24px; color:var(--sub); font-size:14px; margin:0; line-height:2; }

/* Access */
.rf-access { background:var(--bg2); }
.rf-access-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:64px; }
@media(max-width:900px){ .rf-access-grid{ grid-template-columns:1fr; gap:32px; } }
.rf-access dl { display:grid; grid-template-columns:auto 1fr; gap:18px 28px; margin:0; }
.rf-access dt { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--olive-dark); font-size:12px; letter-spacing:.15em; padding-top:4px; }
.rf-access dd { margin:0; font-size:14px; }
.rf-access-map { aspect-ratio:4/3; background:#fff; overflow:hidden; }
.rf-access-map iframe { width:100%; height:100%; border:0; filter:grayscale(.4); }

/* Contact */
.rf-contact { background:#3a2e1f; color:#faf7f1; text-align:center; }
.rf-contact-inner { max-width:760px; }
.rf-contact p { font-size:15px; color:rgba(250,247,241,.85); margin:0 0 40px; }
.rf-contact-cta { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

/* Footer */
.rf-footer { background:#2a2117; color:rgba(250,247,241,.7); padding:64px 0 32px; }
.rf-footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-bottom:32px; border-bottom:1px solid rgba(250,247,241,.1); }
@media(max-width:768px){ .rf-footer-grid{ grid-template-columns:1fr; } }
.rf-footer-logo { font-family:'Libre Baskerville',serif; letter-spacing:.18em; color:#faf7f1; margin:0 0 12px; }
.rf-footer-addr { font-size:12px; margin:0; line-height:1.9; }
.rf-footer nav { display:flex; flex-wrap:wrap; gap:18px 28px; }
.rf-footer nav a { color:rgba(250,247,241,.65); text-decoration:none; font-size:12px; letter-spacing:.1em; }
.rf-footer nav a:hover { color:var(--gold); }
.rf-footer-copy { margin:32px 0 0; font-size:11px; letter-spacing:.1em; text-align:center; }
`
