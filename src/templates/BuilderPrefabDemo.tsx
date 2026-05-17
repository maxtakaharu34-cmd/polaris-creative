import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS BLOCK HOUSE — プレハブ・規格住宅（カタログ風 / 無印良品系）
   生成り×墨×藍 / Noto Serif JP + Libre Baskerville
   仕様書・図面・型番のように、淡々と並べる。
   ============================================================ */

export default function BuilderPrefabDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeType, setActiveType] = useState<'A' | 'B' | 'C' | 'D'>('A')

  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } })
    }, { threshold: 0.18 })
    document.querySelectorAll('.pf-fade').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const PLANS: Record<'A' | 'B' | 'C' | 'D', { name: string; sub: string; price: string; size: string; rooms: string; img: string; desc: string }> = {
    A: { name: '型番 A', sub: 'コンパクト・平屋',     price: '498', size: '28㎡ / 8.5坪',  rooms: '1LDK',  img: 'photo-1600585154340-be6161a56a0c', desc: 'ひとり、または夫婦ふたりに。土間と縁側を備えた、低く長く伸びる平屋です。' },
    B: { name: '型番 B', sub: '二人暮らし・平屋',    price: '798', size: '56㎡ / 17坪',   rooms: '2LDK',  img: 'photo-1493809842364-78817add7ffb', desc: '本棚と窓辺を中心に据えた間取り。読む・書く・くつろぐが、ひと続きに。' },
    C: { name: '型番 C', sub: '子育て・二階建て',    price: '1,280', size: '92㎡ / 28坪',  rooms: '3LDK',  img: 'photo-1564540583246-934409427776', desc: '吹き抜けの土間玄関と、家族が顔を合わせる回遊動線。' },
    D: { name: '型番 D', sub: '二世帯・二階建て',    price: '1,980', size: '128㎡ / 38坪', rooms: '4LDK+S', img: 'photo-1600210492493-0946911123ea', desc: '玄関は共用、生活はゆるく分離。世代を超えて住み継ぐための間取り。' },
  }
  const active = PLANS[activeType]

  return (
    <div className="pf-root">
      <style>{cssText}</style>

      <div className="pf-warn">
        <span className="pf-warn-pill">DEMO</span>
        <span className="pf-warn-text">本サイトは<b>架空の規格住宅会社</b>のデザイン見本です。価格・型番・図面はすべて架空。</span>
        <a href="#hp" className="pf-warn-back">← 戻る</a>
      </div>

      {/* Header */}
      <header className="pf-header">
        <div className="pf-header-inner">
          <a href="#" className="pf-logo">
            <span className="pf-logo-en">POLARIS BLOCK HOUSE</span>
            <span className="pf-logo-ja">ポラリスの規格住宅（架空）</span>
          </a>
          <nav className={`pf-nav ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about">考え方</a>
            <a href="#plans">型番一覧</a>
            <a href="#detail">仕様詳細</a>
            <a href="#flow">家づくりの流れ</a>
            <a href="#access">展示場</a>
            <a href="#contact" className="pf-nav-cta">カタログ請求（仮）</a>
          </nav>
          <button className={`pf-burger ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero — minimal catalog cover */}
      <section className="pf-hero">
        <div className="pf-hero-grid">
          <div className="pf-hero-text">
            <p className="pf-hero-eyebrow">CATALOGUE 2026 (Fictional)</p>
            <h1 className="pf-hero-title">
              <span>家を、</span>
              <span>選ぶ時代へ。</span>
            </h1>
            <p className="pf-hero-sub">
              四つの型番、決まった素材、見える価格。<br />
              「迷う時間」を引き算した、規格住宅のカタログです。<br />
              （※ このサイトは架空の見本です）
            </p>
            <div className="pf-hero-meta">
              <div><dt>型番</dt><dd>4種類</dd></div>
              <div><dt>価格帯</dt><dd>¥498万 〜 ¥1,980万（架空・税抜）</dd></div>
              <div><dt>納期</dt><dd>ご契約から 4〜6ヶ月</dd></div>
            </div>
            <div className="pf-hero-cta">
              <a href="#plans" className="pf-btn pf-btn-ink">型番を見る <i>→</i></a>
              <a href="#contact" className="pf-btn pf-btn-line">カタログ請求（仮） <i>→</i></a>
            </div>
          </div>
          <div className="pf-hero-img">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" alt="" />
            <div className="pf-hero-img-spec">
              <span>TYPE A</span>
              <span>28㎡ / 1LDK</span>
              <span>¥498万〜（架空）</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pf-section pf-about">
        <div className="pf-container">
          <h2 className="pf-title pf-fade">
            <span className="pf-title-en">PHILOSOPHY</span>
            <span className="pf-title-ja">なぜ、規格にするのか。</span>
          </h2>
          <div className="pf-about-grid">
            <div className="pf-about-text pf-fade">
              <h3>「自由」より、「迷わない」を。</h3>
              <p>
                注文住宅は、ゼロから決められる自由があります。<br />
                その反面、決めごとが多すぎて、本当に大切なことが<br />
                ぼやけてしまうこともあります。
              </p>
              <p>
                規格住宅は、敢えて選択肢を絞ったカタログです。<br />
                構造・断熱・窓・床材・キッチン。<br />
                どれも私たちが「これでいい」と思える素材を、固定にしています。
              </p>
              <p>
                ご家族が決めるのは、四つの間取りから一つだけ。<br />
                残りの時間は、「どこで暮らすか」と「どう暮らすか」に。
              </p>
            </div>
            <div className="pf-about-side pf-fade">
              <ul>
                <li><span>01</span>選択肢を、絞っています。</li>
                <li><span>02</span>素材は、固定です。</li>
                <li><span>03</span>価格は、はじめから見えます。</li>
                <li><span>04</span>納期は、4〜6ヶ月でお約束（架空）。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS catalog */}
      <section id="plans" className="pf-section pf-plans">
        <div className="pf-container">
          <h2 className="pf-title pf-fade">
            <span className="pf-title-en">PLANS</span>
            <span className="pf-title-ja">四つの型番（架空）</span>
          </h2>
          <div className="pf-plans-tabs pf-fade">
            {(['A', 'B', 'C', 'D'] as const).map((k) => (
              <button key={k} className={`pf-plans-tab ${activeType === k ? 'is-active' : ''}`} onClick={() => setActiveType(k)}>
                <span className="pf-plans-tab-en">TYPE</span>
                <span className="pf-plans-tab-key">{k}</span>
              </button>
            ))}
          </div>
          <div className="pf-plans-detail pf-fade" key={activeType}>
            <div className="pf-plans-img">
              <img src={`https://images.unsplash.com/${active.img}?auto=format&fit=crop&w=1200&q=85`} alt="" />
              <span className="pf-plans-img-cap">{active.name}（架空のイメージ写真）</span>
            </div>
            <div className="pf-plans-info">
              <div className="pf-plans-info-head">
                <span className="pf-plans-info-en">TYPE {activeType}</span>
                <h3>{active.name}</h3>
                <p className="pf-plans-info-sub">{active.sub}</p>
              </div>
              <dl className="pf-plans-spec">
                <div><dt>間取り</dt><dd>{active.rooms}</dd></div>
                <div><dt>延床面積</dt><dd>{active.size}</dd></div>
                <div><dt>本体価格</dt><dd>¥{active.price}万〜<small>（架空・税抜）</small></dd></div>
                <div><dt>納期</dt><dd>ご契約から4〜6ヶ月（架空）</dd></div>
              </dl>
              <p className="pf-plans-desc">{active.desc}</p>
              <a href="#contact" className="pf-btn pf-btn-ink">この型番の詳細を請求 <i>→</i></a>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL — fixed materials list, like a spec sheet */}
      <section id="detail" className="pf-section pf-detail">
        <div className="pf-container">
          <h2 className="pf-title pf-fade">
            <span className="pf-title-en">SPECIFICATION</span>
            <span className="pf-title-ja">標準仕様（架空）</span>
          </h2>
          <p className="pf-detail-lead pf-fade">
            すべての型番に、以下の素材・性能を標準で備えています。<br />
            グレードアップによる差額や、追加オプションはありません（架空）。
          </p>
          <ul className="pf-detail-list pf-fade">
            {[
              { label: '構造', value: '在来軸組工法 + 構造用合板による耐力壁（架空）' },
              { label: '断熱', value: '高性能グラスウール 105mm / UA値 0.46 相当（架空）' },
              { label: '窓',   value: 'アルミ樹脂複合サッシ Low-Eペアガラス（架空）' },
              { label: '床',   value: '無垢杉フローリング 厚15mm 自然塗装（架空）' },
              { label: '壁',   value: '珪藻土クロス / 一部 漆喰仕上げ（架空）' },
              { label: 'キッチン', value: '国産メーカー製・ステンレス天板 i 型 2,550mm（架空）' },
              { label: '浴室', value: 'ユニットバス 1,616サイズ / 浴室乾燥機 標準（架空）' },
              { label: '保証', value: '構造躯体30年 / 設備10年 / 定期点検 引渡し後10年（架空）' },
            ].map((d, i) => (
              <li key={i}>
                <span className="pf-detail-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pf-detail-label">{d.label}</span>
                <span className="pf-detail-value">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="pf-section pf-flow">
        <div className="pf-container">
          <h2 className="pf-title pf-fade">
            <span className="pf-title-en">FLOW</span>
            <span className="pf-title-ja">カタログ請求から、お引き渡しまで</span>
          </h2>
          <ol className="pf-flow-list">
            {[
              { t: 'カタログ請求', s: 'ウェブから無料で。型番ごとの図面と価格表をお送りします（架空）。' },
              { t: 'ご相談・展示場見学', s: '型番をお選びいただく前に、実物を歩いていただきます。' },
              { t: '土地のご確認・敷地調査', s: '規格住宅は土地との相性が大切です。現地確認は無料です（架空）。' },
              { t: 'ご契約・着工', s: 'ご契約から着工まで約1ヶ月。工場と現場で並行して進めます。' },
              { t: 'お引き渡し', s: 'ご契約から4〜6ヶ月でお引き渡し。引渡し後10年の定期点検も標準（架空）。' },
            ].map((f, i) => (
              <li key={i} className="pf-flow-item pf-fade">
                <div className="pf-flow-step">STEP <span>0{i + 1}</span></div>
                <div className="pf-flow-body">
                  <h3>{f.t}</h3>
                  <p>{f.s}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="pf-section pf-faq">
        <div className="pf-container">
          <h2 className="pf-title pf-fade">
            <span className="pf-title-en">FAQ</span>
            <span className="pf-title-ja">よくいただくご質問</span>
          </h2>
          <ul className="pf-faq-list">
            {[
              { q: '間取りを少し変えることはできますか？', a: 'いいえ、規格住宅は型番のままお建てします。変更が必要な場合は、注文住宅（架空ブランド別事業）をご案内します。' },
              { q: '色や素材を変えることはできますか？', a: '床材の樹種、外壁の色は3パターンからお選びいただけます。それ以外は固定です（架空）。' },
              { q: '土地探しからお願いできますか？', a: '提携の不動産会社（架空）をご紹介します。規格住宅と相性のよい敷地を中心にご提案します。' },
              { q: '完成見学会はありますか？', a: 'お引き渡し前のお宅をお借りして、年に数回開催しています（架空）。' },
            ].map((f, i) => (
              <li key={i} className={`pf-faq-item ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i />
                </button>
                <div className="pf-faq-ans"><p>{f.a}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="pf-section pf-access">
        <div className="pf-container">
          <h2 className="pf-title pf-fade">
            <span className="pf-title-en">SHOWROOM</span>
            <span className="pf-title-ja">展示場のご案内</span>
          </h2>
          <div className="pf-access-grid pf-fade">
            <dl>
              <dt>所在地</dt><dd>〒000-0000 東京都〇〇市〇〇 0-0-0（実在しません）</dd>
              <dt>展示棟</dt><dd>型番A・型番C の2棟を常設展示（架空）</dd>
              <dt>営業時間</dt><dd>10:00 – 18:00 / 水曜定休（架空）</dd>
              <dt>予約</dt><dd>当日でも歓迎ですが、事前予約のご来場がおすすめです（架空）。</dd>
            </dl>
            <div className="pf-access-map">
              <iframe title="地図（架空）" src="https://www.openstreetmap.org/export/embed.html?bbox=139.6,35.65,139.8,35.75&layer=mapnik" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="pf-section pf-contact">
        <div className="pf-container pf-contact-inner pf-fade">
          <h2 className="pf-title pf-title-light">
            <span className="pf-title-en">CONTACT</span>
            <span className="pf-title-ja">まずは、カタログから。</span>
          </h2>
          <p>
            ご請求は無料、しつこいご連絡はいたしません（架空）。<br />
            ご家族のペースで、ゆっくりお選びください。
          </p>
          <div className="pf-contact-cta">
            <a href="#" className="pf-btn pf-btn-cream">カタログ請求（仮） →</a>
            <a href="#" className="pf-btn pf-btn-outline">展示場の予約（仮） →</a>
          </div>
        </div>
      </section>

      <footer className="pf-footer">
        <div className="pf-container">
          <div className="pf-footer-grid">
            <div>
              <p className="pf-footer-logo">POLARIS BLOCK HOUSE（架空）</p>
              <p className="pf-footer-addr">〒000-0000 東京都〇〇市〇〇 0-0-0<br />Tel. 0120-000-000（※架空）</p>
            </div>
            <nav>
              <a href="#about">考え方</a>
              <a href="#plans">型番一覧</a>
              <a href="#detail">仕様詳細</a>
              <a href="#flow">家づくりの流れ</a>
              <a href="#access">展示場</a>
            </nav>
          </div>
          <p className="pf-footer-copy">© POLARIS BLOCK HOUSE (Fictional Demo) — Designed by Polaris Creative</p>
        </div>
      </footer>
    </div>
  )
}

const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Noto+Serif+JP:wght@300;400;500;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap');

.pf-root { --ink:#2a2622; --bg:#f7f4ed; --bg2:#ece6d6; --line:rgba(42,38,34,.14); --sub:rgba(42,38,34,.62); --indigo:#2b3a55; --accent:#7a6a4f;
  font-family:'Zen Kaku Gothic New','Noto Serif JP',serif; color:var(--ink); background:var(--bg); line-height:1.85; overflow-x:hidden; }
.pf-root img { display:block; max-width:100%; }
.pf-container { max-width:1200px; margin:0 auto; padding:0 24px; }
.pf-section { padding:120px 0; position:relative; }
@media(max-width:768px){ .pf-section{ padding:72px 0; } }

.pf-fade { opacity:0; transform:translateY(40px); transition:opacity .9s ease-out, transform .9s ease-out; }
.pf-fade.is-in { opacity:1; transform:none; }

.pf-warn { position:sticky; top:0; z-index:60; display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; padding:8px 20px; background:#2a2622; color:#f7f4ed; font-size:11px; letter-spacing:.05em; }
.pf-warn-pill { background:#7a6a4f; color:#f7f4ed; padding:2px 10px; border-radius:999px; font-weight:700; font-family:'Libre Baskerville',serif; }
.pf-warn-text b { color:#cdb98c; }
.pf-warn-back { color:#f7f4ed; text-decoration:none; opacity:.7; }
.pf-warn-back:hover { opacity:1; }

.pf-header { position:sticky; top:36px; z-index:50; background:rgba(247,244,237,.94); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.pf-header-inner { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; max-width:1280px; margin:0 auto; }
.pf-logo { display:flex; flex-direction:column; line-height:1.15; text-decoration:none; color:var(--ink); }
.pf-logo-en { font-family:'Libre Baskerville',serif; font-size:17px; letter-spacing:.18em; font-weight:700; }
.pf-logo-ja { font-size:10px; color:var(--sub); letter-spacing:.18em; margin-top:4px; }
.pf-nav { display:flex; align-items:center; gap:28px; }
.pf-nav a { color:var(--ink); text-decoration:none; font-size:13px; letter-spacing:.08em; }
.pf-nav a:hover { color:var(--indigo); }
.pf-nav-cta { background:var(--ink); color:var(--bg) !important; padding:10px 22px; border-radius:999px; font-size:12px !important; }
.pf-nav-cta:hover { background:var(--indigo); }
.pf-burger { display:none; background:none; border:0; width:32px; height:24px; flex-direction:column; justify-content:space-between; cursor:pointer; }
.pf-burger span { display:block; height:1.5px; background:var(--ink); transition:.3s; }
.pf-burger.is-open span:first-child { transform:translateY(11px) rotate(45deg); }
.pf-burger.is-open span:last-child  { transform:translateY(-11px) rotate(-45deg); }
@media(max-width:900px){
  .pf-burger { display:flex; }
  .pf-nav { position:fixed; inset:0; background:rgba(42,38,34,.97); flex-direction:column; justify-content:center; align-items:center; gap:32px; transform:translateX(100%); transition:.5s; }
  .pf-nav.is-open { transform:none; }
  .pf-nav a { color:#f7f4ed; font-size:18px; }
  .pf-nav-cta { color:var(--ink) !important; background:#cdb98c; }
}

/* Hero — catalog cover */
.pf-hero { padding:80px 24px 60px; max-width:1280px; margin:0 auto; }
.pf-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
@media(max-width:900px){ .pf-hero-grid{ grid-template-columns:1fr; gap:48px; } }
.pf-hero-eyebrow { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.3em; color:var(--indigo); margin-bottom:32px; }
.pf-hero-title { font-family:'Noto Serif JP',serif; font-weight:300; font-size:clamp(40px,5.8vw,80px); line-height:1.25; margin:0 0 32px; }
.pf-hero-title span { display:block; }
.pf-hero-sub { font-size:15px; line-height:2; color:var(--sub); margin:0 0 40px; max-width:480px; }
.pf-hero-meta { display:grid; grid-template-columns:repeat(3,auto); gap:32px; margin-bottom:40px; padding:24px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
@media(max-width:600px){ .pf-hero-meta{ grid-template-columns:1fr; gap:14px; padding:20px 0; } }
.pf-hero-meta dt { font-family:'Libre Baskerville',serif; font-style:italic; font-size:10px; color:var(--indigo); letter-spacing:.2em; }
.pf-hero-meta dd { margin:6px 0 0; font-size:13px; font-weight:500; }
.pf-hero-cta { display:flex; gap:16px; flex-wrap:wrap; }
.pf-hero-img { position:relative; }
.pf-hero-img img { aspect-ratio:4/5; object-fit:cover; }
.pf-hero-img-spec { position:absolute; bottom:0; left:0; background:var(--ink); color:var(--bg); padding:16px 20px; display:flex; flex-direction:column; gap:6px; font-size:11px; letter-spacing:.15em; }
.pf-hero-img-spec span:first-child { font-family:'Libre Baskerville',serif; color:#cdb98c; }

.pf-btn { display:inline-flex; align-items:center; gap:14px; padding:16px 32px; font-size:13px; letter-spacing:.1em; text-decoration:none; transition:.35s; border-radius:0; }
.pf-btn i { font-style:normal; transition:transform .35s; }
.pf-btn:hover i { transform:translateX(6px); }
.pf-btn-ink { background:var(--ink); color:var(--bg); }
.pf-btn-ink:hover { background:var(--indigo); }
.pf-btn-line { background:transparent; color:var(--ink); border:1px solid var(--ink); }
.pf-btn-line:hover { background:var(--ink); color:var(--bg); }
.pf-btn-cream { background:#cdb98c; color:var(--ink); }
.pf-btn-cream:hover { background:#b8a071; }
.pf-btn-outline { background:transparent; color:#cdb98c; border:1px solid #cdb98c; }
.pf-btn-outline:hover { background:#cdb98c; color:var(--ink); }

.pf-title { margin:0 0 64px; }
.pf-title-en { display:block; font-family:'Libre Baskerville',serif; font-style:italic; font-size:14px; letter-spacing:.35em; color:var(--indigo); margin-bottom:14px; }
.pf-title-ja { display:block; font-family:'Noto Serif JP',serif; font-weight:500; font-size:clamp(24px,3vw,38px); letter-spacing:.04em; line-height:1.5; }
.pf-title-light .pf-title-en { color:#cdb98c; }
.pf-title-light .pf-title-ja { color:#f7f4ed; }

/* About */
.pf-about { background:var(--bg); }
.pf-about-grid { display:grid; grid-template-columns:1.4fr 1fr; gap:64px; }
@media(max-width:900px){ .pf-about-grid{ grid-template-columns:1fr; gap:40px; } }
.pf-about-text h3 { font-family:'Noto Serif JP',serif; font-weight:400; font-size:clamp(26px,3vw,38px); line-height:1.5; margin:0 0 32px; }
.pf-about-text p { font-size:15px; margin:0 0 24px; color:rgba(42,38,34,.85); }
.pf-about-side ul { list-style:none; padding:0; margin:0; border-top:1px solid var(--line); }
.pf-about-side li { padding:20px 0; border-bottom:1px solid var(--line); font-size:15px; display:flex; align-items:baseline; gap:18px; }
.pf-about-side li span { font-family:'Libre Baskerville',serif; font-style:italic; font-size:12px; color:var(--indigo); letter-spacing:.15em; min-width:28px; }

/* Plans */
.pf-plans { background:var(--bg2); }
.pf-plans-tabs { display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-bottom:48px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.pf-plans-tab { background:none; border:0; padding:28px 16px; border-right:1px solid var(--line); cursor:pointer; transition:.3s; display:flex; flex-direction:column; align-items:center; gap:8px; }
.pf-plans-tab:last-child { border-right:0; }
.pf-plans-tab:hover { background:rgba(42,38,34,.05); }
.pf-plans-tab.is-active { background:var(--ink); color:var(--bg); }
.pf-plans-tab-en { font-family:'Libre Baskerville',serif; font-style:italic; font-size:11px; letter-spacing:.2em; opacity:.7; }
.pf-plans-tab-key { font-family:'Libre Baskerville',serif; font-size:40px; line-height:1; }
.pf-plans-detail { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:flex-start; animation:pf-fadein .6s ease; }
@media(max-width:900px){ .pf-plans-detail{ grid-template-columns:1fr; } }
@keyframes pf-fadein { from{ opacity:0; transform:translateY(20px); } to{ opacity:1; transform:none; } }
.pf-plans-img { position:relative; }
.pf-plans-img img { aspect-ratio:4/5; object-fit:cover; }
.pf-plans-img-cap { position:absolute; bottom:12px; left:12px; background:rgba(42,38,34,.78); color:var(--bg); padding:4px 12px; font-size:10px; letter-spacing:.15em; }
.pf-plans-info-head { padding-bottom:24px; border-bottom:1px solid var(--line); margin-bottom:24px; }
.pf-plans-info-en { font-family:'Libre Baskerville',serif; font-style:italic; font-size:12px; color:var(--indigo); letter-spacing:.25em; }
.pf-plans-info-head h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:32px; margin:8px 0 6px; }
.pf-plans-info-sub { color:var(--sub); margin:0; font-size:13px; letter-spacing:.1em; }
.pf-plans-spec { margin:0 0 24px; display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.pf-plans-spec dt { font-family:'Libre Baskerville',serif; font-style:italic; font-size:11px; color:var(--indigo); letter-spacing:.2em; }
.pf-plans-spec dd { margin:4px 0 0; font-size:14px; font-weight:500; }
.pf-plans-spec dd small { color:var(--sub); font-weight:400; font-size:11px; margin-left:4px; }
.pf-plans-desc { font-family:'Noto Serif JP',serif; font-size:15px; line-height:2; margin:0 0 32px; color:rgba(42,38,34,.88); }

/* Detail / Spec */
.pf-detail-lead { text-align:center; color:var(--sub); margin:-32px 0 48px; font-size:13px; line-height:2; }
.pf-detail-list { list-style:none; padding:0; margin:0; max-width:900px; margin:0 auto; border-top:1px solid var(--line); }
.pf-detail-list li { display:grid; grid-template-columns:60px 120px 1fr; gap:24px; padding:24px 16px; border-bottom:1px solid var(--line); align-items:baseline; }
@media(max-width:600px){ .pf-detail-list li{ grid-template-columns:50px 1fr; } .pf-detail-list li .pf-detail-value{ grid-column:1/-1; } }
.pf-detail-num { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--indigo); font-size:14px; letter-spacing:.15em; }
.pf-detail-label { font-family:'Noto Serif JP',serif; font-size:16px; font-weight:500; }
.pf-detail-value { font-size:13px; color:var(--sub); line-height:1.9; }

/* Flow */
.pf-flow { background:var(--bg2); }
.pf-flow-list { list-style:none; padding:0; margin:0; }
.pf-flow-item { display:flex; gap:32px; padding:32px 0; border-bottom:1px dashed var(--line); }
.pf-flow-step { font-family:'Libre Baskerville',serif; font-style:italic; font-size:13px; letter-spacing:.2em; color:var(--indigo); flex-shrink:0; padding-top:4px; min-width:90px; }
.pf-flow-step span { font-size:32px; font-style:normal; color:var(--ink); display:block; margin-top:6px; }
.pf-flow-body h3 { font-family:'Noto Serif JP',serif; font-weight:500; font-size:20px; margin:0 0 8px; }
.pf-flow-body p { color:var(--sub); margin:0; font-size:14px; line-height:2; }
@media(max-width:768px){ .pf-flow-item{ flex-direction:column; gap:8px; } }

/* FAQ */
.pf-faq-list { list-style:none; padding:0; margin:0; }
.pf-faq-item { border-bottom:1px solid var(--line); }
.pf-faq-item button { width:100%; background:none; border:0; display:flex; justify-content:space-between; align-items:center; padding:24px 0; font-family:'Noto Serif JP',serif; font-size:16px; color:var(--ink); cursor:pointer; text-align:left; }
.pf-faq-item button i { display:block; width:20px; height:20px; position:relative; flex-shrink:0; }
.pf-faq-item button i::before, .pf-faq-item button i::after { content:''; position:absolute; background:var(--indigo); }
.pf-faq-item button i::before { top:50%; left:0; right:0; height:1.5px; transform:translateY(-50%); }
.pf-faq-item button i::after  { left:50%; top:0; bottom:0; width:1.5px; transform:translateX(-50%); transition:.3s; }
.pf-faq-item.is-open button i::after { transform:translateX(-50%) scaleY(0); }
.pf-faq-ans { max-height:0; overflow:hidden; transition:max-height .4s ease; }
.pf-faq-item.is-open .pf-faq-ans { max-height:240px; }
.pf-faq-ans p { padding:0 0 24px; color:var(--sub); font-size:14px; margin:0; line-height:2; }

/* Access */
.pf-access { background:var(--bg2); }
.pf-access-grid { display:grid; grid-template-columns:1fr 1.2fr; gap:64px; }
@media(max-width:900px){ .pf-access-grid{ grid-template-columns:1fr; gap:32px; } }
.pf-access dl { display:grid; grid-template-columns:auto 1fr; gap:18px 28px; margin:0; }
.pf-access dt { font-family:'Libre Baskerville',serif; font-style:italic; color:var(--indigo); font-size:12px; letter-spacing:.15em; padding-top:4px; }
.pf-access dd { margin:0; font-size:14px; }
.pf-access-map { aspect-ratio:4/3; background:#fff; overflow:hidden; }
.pf-access-map iframe { width:100%; height:100%; border:0; filter:grayscale(.4); }

/* Contact */
.pf-contact { background:var(--ink); color:var(--bg); text-align:center; }
.pf-contact-inner { max-width:760px; }
.pf-contact p { font-size:15px; color:rgba(247,244,237,.85); margin:0 0 40px; }
.pf-contact-cta { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

/* Footer */
.pf-footer { background:#1d1a17; color:rgba(247,244,237,.7); padding:64px 0 32px; }
.pf-footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-bottom:32px; border-bottom:1px solid rgba(247,244,237,.1); }
@media(max-width:768px){ .pf-footer-grid{ grid-template-columns:1fr; } }
.pf-footer-logo { font-family:'Libre Baskerville',serif; letter-spacing:.18em; color:var(--bg); margin:0 0 12px; }
.pf-footer-addr { font-size:12px; margin:0; line-height:1.9; }
.pf-footer nav { display:flex; flex-wrap:wrap; gap:18px 28px; }
.pf-footer nav a { color:rgba(247,244,237,.65); text-decoration:none; font-size:12px; letter-spacing:.1em; }
.pf-footer nav a:hover { color:#cdb98c; }
.pf-footer-copy { margin:32px 0 0; font-size:11px; letter-spacing:.1em; text-align:center; }
`
