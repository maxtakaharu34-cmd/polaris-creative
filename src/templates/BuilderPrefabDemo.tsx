import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS BLOCK HOUSE — プレハブ・規格住宅
   カラフル / カード式 / 3Dティルト / フラット
   ============================================================ */

const PLANS = [
  { id: 'A', name: 'BLOCK A', sub: '1LDK / 28㎡', price: '498', tag: 'COMPACT', color: '#ff6b6b', img: 'photo-1600585154340-be6161a56a0c' },
  { id: 'B', name: 'BLOCK B', sub: '2LDK / 56㎡', price: '798', tag: 'STANDARD', color: '#4ecdc4', img: 'photo-1493809842364-78817add7ffb' },
  { id: 'C', name: 'BLOCK C', sub: '3LDK / 78㎡', price: '1,098', tag: 'FAMILY', color: '#ffe66d', img: 'photo-1600566753190-17f0baa2a6c3' },
  { id: 'D', name: 'BLOCK D', sub: '4LDK / 112㎡', price: '1,498', tag: 'LARGE', color: '#a8e6cf', img: 'photo-1564540583246-934409427776' },
]

export default function BuilderPrefabDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState('B')

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.pf-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // 3D tilt
  const tilt = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`
  }
  const reset = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <div className="pf-root">
      <style>{cssText}</style>

      <div className="pf-warning">
        <div className="pf-warning-row">
          <span className="pf-warning-pill">SAMPLE</span>
          <span className="pf-warning-text">⚠️ <b>POLARIS BLOCK HOUSE</b> は<b className="pf-warning-emph">実在しない仮想プレハブ住宅会社</b>です。デザイン見本。</span>
          <a href="#hp" className="pf-warning-back">← 戻る</a>
        </div>
        <div className="pf-warning-strip">⚠️ 注意：会社名・プラン・価格・住所はすべて<u>架空</u>です。</div>
      </div>

      <header className="pf-header">
        <a href="#" className="pf-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="pf-logo-mark" aria-hidden>
            <rect x="6" y="6" width="12" height="12" fill="#ff6b6b"/>
            <rect x="22" y="6" width="12" height="12" fill="#4ecdc4"/>
            <rect x="6" y="22" width="12" height="12" fill="#ffe66d"/>
            <rect x="22" y="22" width="12" height="12" fill="#a8e6cf"/>
          </svg>
          <div className="pf-logo-text">
            <strong>POLARIS BLOCK</strong>
            <span>ポラリスブロックハウス（架空）</span>
          </div>
        </a>
        <nav className={`pf-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#blocks" onClick={() => setMenuOpen(false)}>ブロック</a>
          <a href="#flow" onClick={() => setMenuOpen(false)}>建つまで</a>
          <a href="#price" onClick={() => setMenuOpen(false)}>価格</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>相談する</a>
        </nav>
        <button className="pf-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="pf-cta-btn">無料相談（仮）✦</a>
      </header>

      <section className="pf-hero">
        <div className="pf-hero-blocks">
          <span className="pf-block pf-block-1"/>
          <span className="pf-block pf-block-2"/>
          <span className="pf-block pf-block-3"/>
          <span className="pf-block pf-block-4"/>
        </div>
        <div className="pf-hero-badge">※ 架空のデザイン見本</div>
        <div className="pf-hero-content">
          <div className="pf-hero-tag">★ 工期60日（架空） / 価格固定 / カスタマイズOK</div>
          <h1 className="pf-hero-title">
            <span>家を、</span>
            <span className="pf-hero-em">ブロックを<br/>組むように。</span>
          </h1>
          <p className="pf-hero-sub">
            4種類のサイズと、無数のカスタマイズ（架空）。<br/>
            <b>498万円〜</b>、規格化された高品質住宅。
          </p>
          <div className="pf-hero-btns">
            <a href="#blocks" className="pf-btn pf-btn-primary">ブロックを選ぶ →</a>
            <a href="#price" className="pf-btn pf-btn-secondary">価格表を見る</a>
          </div>
        </div>
      </section>

      <section id="blocks" className="pf-blocks">
        <div className="pf-section-head pf-reveal">
          <span className="pf-eyebrow">◆ BLOCKS — 4つの規格</span>
          <h2 className="pf-h2">あなたに合う、<br/><em>1ブロック。</em></h2>
          <p className="pf-fake-pill">※ プラン・価格はすべて架空のサンプル表示です</p>
        </div>
        <div className="pf-blocks-grid">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`pf-block-card pf-reveal ${selected === p.id ? 'is-selected' : ''}`}
              onMouseMove={tilt}
              onMouseLeave={reset}
              onClick={() => setSelected(p.id)}
              style={{ '--c': p.color } as React.CSSProperties}
            >
              <div className="pf-block-tag">{p.tag}<small>※架空</small></div>
              <div className="pf-block-id">{p.id}</div>
              <div className="pf-block-img">
                <img src={`https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1200&q=80`} alt="" />
              </div>
              <div className="pf-block-meta">
                <h3>{p.name}</h3>
                <span>{p.sub}（架空）</span>
              </div>
              <div className="pf-block-price">
                <small>FROM</small>
                <strong>{p.price}<em>万円〜</em></strong>
                <small className="pf-block-price-fake">※価格も架空</small>
              </div>
              <div className="pf-block-select">{selected === p.id ? '✓ SELECTED' : 'SELECT →'}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="flow" className="pf-flow">
        <div className="pf-section-head pf-reveal">
          <span className="pf-eyebrow">◆ HOW IT WORKS</span>
          <h2 className="pf-h2">3ステップで、<br/>家が建つ。</h2>
        </div>
        <div className="pf-flow-grid">
          {[
            { n: '01', i: '📐', t: '選ぶ', d: '4つのサイズから1つ、外装・内装を選びます（架空）' },
            { n: '02', i: '🏗️', t: '建てる', d: '工場で部材を作り、現場で<b>60日</b>で組み立て（架空）' },
            { n: '03', i: '🏡', t: '住む', d: 'お引き渡し後10年保証、定期点検サービス付き（架空）' },
          ].map((s) => (
            <div key={s.n} className="pf-flow-card pf-reveal">
              <div className="pf-flow-n">{s.n}</div>
              <div className="pf-flow-i">{s.i}</div>
              <h3>{s.t}<small>※架空</small></h3>
              <p dangerouslySetInnerHTML={{ __html: s.d }}/>
            </div>
          ))}
        </div>
      </section>

      <section id="price" className="pf-price">
        <div className="pf-price-content pf-reveal">
          <span className="pf-eyebrow pf-eyebrow-light">◆ TRANSPARENT PRICING</span>
          <h2 className="pf-h2 pf-h2-light">価格は、<br/><em>正直に。</em></h2>
          <p>追加費用なし、明朗会計（架空）。土地以外、これ以上はかかりません。</p>
          <div className="pf-price-table">
            {PLANS.map((p) => (
              <div key={p.id} className="pf-price-row" style={{ '--c': p.color } as React.CSSProperties}>
                <span className="pf-price-id">BLOCK {p.id}</span>
                <span className="pf-price-spec">{p.sub}（架空）</span>
                <strong>¥{p.price}万円〜<small>※架空</small></strong>
              </div>
            ))}
          </div>
          <p className="pf-fake">※ 上記の価格・スペックはすべて架空のサンプル表示です。</p>
        </div>
      </section>

      <section id="contact" className="pf-cta">
        <div className="pf-cta-inner pf-reveal">
          <h2 className="pf-cta-h">あなたの<br/><em>1ブロック</em>を、<br/>選びませんか。</h2>
          <p>無料カタログ請求・モデルハウス見学・オンライン相談はこちらから。<br/><span className="pf-fake">※ 動作しません。仮想プレハブ住宅会社のデザイン見本です。</span></p>
          <div className="pf-cta-btns">
            <a href="#" className="pf-btn pf-btn-primary">カタログ請求（仮）→</a>
            <a href="#" className="pf-btn pf-btn-secondary">モデルハウス予約（仮）</a>
          </div>
        </div>
      </section>

      <footer className="pf-footer">
        <p className="pf-footer-logo">POLARIS BLOCK HOUSE（架空）</p>
        <div className="pf-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS BLOCK HOUSE」という<u>実在しない仮想プレハブ住宅会社</u>のデザイン見本です。<br/>
          会社名・住所・電話・プラン・価格はすべて<u>架空</u>です。
        </div>
        <p className="pf-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="pf-floating-warning">
        <span className="pf-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想プレハブ住宅会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.pf-root { --pf-bg: #fffceb; --pf-bg2: #1a1a2e; --pf-fg: #1a1a2e; --pf-pink: #d4506a; --pf-yellow: #ffe66d; --pf-coral: #ff6b6b; --pf-mint: #4ecdc4; --pf-green: #a8e6cf; background: var(--pf-bg); color: var(--pf-fg); font-family: "Helvetica Neue", "Noto Sans JP", sans-serif; min-height: 100vh; }
.pf-root *, .pf-root *::before, .pf-root *::after { box-sizing: border-box; }
.pf-warning { position: sticky; top: 0; z-index: 50; background: var(--pf-bg2); color: #fff; border-bottom: 2px solid var(--pf-pink); }
.pf-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.pf-warning-pill { background: var(--pf-pink); color: #fff; padding: 2px 10px; border-radius: 999px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.pf-warning-text { flex: 1; min-width: 0; } .pf-warning-emph { color: var(--pf-pink); }
.pf-warning-back { background: #fff; color: var(--pf-bg2); padding: 4px 12px; border-radius: 999px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.pf-warning-strip { background: var(--pf-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.pf-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 16px 28px; background: rgba(255,252,235,0.96); backdrop-filter: blur(12px); border-bottom: 3px solid var(--pf-bg2); }
.pf-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--pf-fg); }
.pf-logo-mark { width: 40px; height: 40px; }
.pf-logo-text strong { display: block; font-size: 15px; font-weight: 900; letter-spacing: 0.05em; }
.pf-logo-text span { display: block; font-size: 10px; color: rgba(26,26,46,0.55); }
.pf-nav { display: none; gap: 24px; margin-left: auto; }
.pf-nav a { color: var(--pf-fg); text-decoration: none; font-size: 13px; font-weight: 800; transition: color .2s; }
.pf-nav a:hover { color: var(--pf-coral); }
.pf-cta-btn { display: none; padding: 12px 22px; background: var(--pf-bg2); color: var(--pf-yellow); font-weight: 900; font-size: 13px; text-decoration: none; border-radius: 999px; transition: all .25s; box-shadow: 0 4px 0 var(--pf-coral); }
.pf-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 0 var(--pf-coral); }
.pf-burger { margin-left: auto; background: var(--pf-bg2); border: none; width: 40px; height: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; cursor: pointer; border-radius: 8px; }
.pf-burger span { display: block; width: 18px; height: 2px; background: var(--pf-yellow); transition: transform .25s; }
.pf-burger span.is-open:first-child { transform: translateY(3px) rotate(45deg); }
.pf-burger span.is-open:last-child { transform: translateY(-3px) rotate(-45deg); }
@media (min-width: 900px) { .pf-nav { display: flex; } .pf-cta-btn { display: inline-flex; } .pf-burger { display: none; } }
.pf-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--pf-bg); padding: 24px; display: flex; }

.pf-hero { position: relative; min-height: 88vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; }
.pf-hero-blocks { position: absolute; inset: 0; pointer-events: none; }
.pf-block { position: absolute; border-radius: 12px; opacity: 0.7; animation: pf-float 6s ease-in-out infinite; }
.pf-block-1 { top: 12%; right: 8%; width: 180px; height: 180px; background: var(--pf-coral); }
.pf-block-2 { top: 50%; right: 25%; width: 120px; height: 120px; background: var(--pf-mint); animation-delay: -1.5s; }
.pf-block-3 { bottom: 18%; right: 12%; width: 140px; height: 100px; background: var(--pf-yellow); animation-delay: -3s; }
.pf-block-4 { top: 22%; right: 38%; width: 80px; height: 80px; background: var(--pf-green); animation-delay: -4.5s; border-radius: 50%; }
@keyframes pf-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-24px) rotate(8deg); } }
.pf-hero-badge { position: absolute; top: 24px; right: 24px; background: var(--pf-pink); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 10px; font-weight: 800; z-index: 5; }
.pf-hero-content { position: relative; z-index: 10; max-width: 720px; }
.pf-hero-tag { display: inline-block; padding: 8px 18px; background: var(--pf-bg2); color: var(--pf-yellow); border-radius: 999px; font-size: 12px; font-weight: 800; margin-bottom: 28px; }
.pf-hero-title { font-size: clamp(48px, 8vw, 112px); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; margin: 0 0 28px; }
.pf-hero-title span { display: block; opacity: 0; transform: translateY(30px); animation: pf-rise 1s cubic-bezier(.2,.7,.2,1) forwards; }
.pf-hero-title span:nth-child(2) { animation-delay: .2s; }
.pf-hero-em { color: var(--pf-coral); }
.pf-hero-sub { font-size: clamp(15px, 1.5vw, 18px); line-height: 1.9; color: rgba(26,26,46,0.75); margin: 0 0 36px; }
.pf-hero-sub b { background: var(--pf-yellow); padding: 2px 8px; font-weight: 900; }
.pf-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.pf-btn { display: inline-flex; align-items: center; padding: 16px 30px; font-weight: 800; font-size: 14px; text-decoration: none; border-radius: 999px; transition: all .25s; }
.pf-btn-primary { background: var(--pf-bg2); color: var(--pf-yellow); box-shadow: 0 4px 0 var(--pf-coral); }
.pf-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 0 var(--pf-coral); }
.pf-btn-secondary { background: #fff; color: var(--pf-bg2); border: 2px solid var(--pf-bg2); }
.pf-btn-secondary:hover { background: var(--pf-yellow); }

.pf-blocks, .pf-flow, .pf-price, .pf-cta { padding: 110px 32px; }
.pf-section-head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
.pf-eyebrow { display: inline-block; padding: 6px 14px; background: var(--pf-coral); color: #fff; font-size: 12px; font-weight: 800; letter-spacing: 0.1em; border-radius: 999px; margin-bottom: 20px; }
.pf-eyebrow-light { background: var(--pf-yellow); color: var(--pf-bg2); }
.pf-h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; line-height: 1.2; letter-spacing: -0.02em; margin: 0 0 16px; }
.pf-h2 em { font-style: normal; color: var(--pf-coral); }
.pf-h2-light { color: var(--pf-bg); }
.pf-h2-light em { color: var(--pf-yellow); }
.pf-section-head p, .pf-price-content > p { font-size: 14px; line-height: 1.9; margin: 0 auto; }
.pf-fake { color: var(--pf-pink); font-weight: 700; }
.pf-fake-pill { display: inline-block; padding: 6px 18px; background: rgba(212,80,106,0.1); color: var(--pf-pink); border: 1px solid var(--pf-pink); border-radius: 999px; font-size: 12px; font-weight: 700; margin-top: 12px; }

.pf-blocks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.pf-block-card { position: relative; background: #fff; padding: 24px 20px; border-radius: 20px; border: 3px solid var(--pf-bg2); cursor: pointer; transition: transform .25s, box-shadow .25s; will-change: transform; transform-style: preserve-3d; }
.pf-block-card:hover { box-shadow: 0 16px 40px rgba(26,26,46,0.15); }
.pf-block-card.is-selected { border-color: var(--c); box-shadow: 0 12px 30px color-mix(in srgb, var(--c) 40%, transparent); }
.pf-block-tag { position: absolute; top: 16px; left: 16px; background: var(--c); color: var(--pf-bg2); padding: 4px 12px; border-radius: 999px; font-size: 10px; font-weight: 900; letter-spacing: 0.1em; }
.pf-block-tag small { font-size: 8px; opacity: 0.7; margin-left: 4px; }
.pf-block-id { position: absolute; top: 16px; right: 20px; font-size: 64px; font-weight: 900; color: var(--c); line-height: 1; letter-spacing: -0.04em; }
.pf-block-img { aspect-ratio: 1; overflow: hidden; border-radius: 14px; margin: 56px 0 16px; background: var(--c); }
.pf-block-img img { width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; }
.pf-block-meta h3 { font-size: 20px; font-weight: 900; margin: 0; }
.pf-block-meta span { font-size: 12px; color: rgba(26,26,46,0.6); }
.pf-block-price { margin-top: 16px; padding-top: 16px; border-top: 2px dashed var(--pf-bg2); }
.pf-block-price small { font-size: 10px; font-weight: 800; letter-spacing: 0.2em; color: rgba(26,26,46,0.5); }
.pf-block-price strong { display: block; font-size: 28px; font-weight: 900; color: var(--pf-coral); line-height: 1.1; }
.pf-block-price strong em { font-size: 14px; font-style: normal; color: var(--pf-bg2); margin-left: 4px; }
.pf-block-price-fake { display: block; color: var(--pf-pink) !important; margin-top: 4px; }
.pf-block-select { margin-top: 16px; text-align: center; padding: 10px; background: var(--pf-bg2); color: #fff; border-radius: 999px; font-size: 12px; font-weight: 900; letter-spacing: 0.15em; transition: background .25s; }
.pf-block-card.is-selected .pf-block-select { background: var(--c); color: var(--pf-bg2); }

.pf-flow { background: #fff; }
.pf-flow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; max-width: 1100px; margin: 0 auto; }
.pf-flow-card { padding: 32px 24px; background: var(--pf-bg); border-radius: 20px; border: 3px solid var(--pf-bg2); text-align: center; }
.pf-flow-n { font-size: 36px; font-weight: 900; color: var(--pf-coral); line-height: 1; margin-bottom: 12px; }
.pf-flow-i { font-size: 64px; margin-bottom: 12px; }
.pf-flow-card h3 { font-size: 22px; font-weight: 900; margin: 0 0 12px; }
.pf-flow-card h3 small { font-size: 10px; color: var(--pf-pink); margin-left: 6px; font-weight: 500; }
.pf-flow-card p { font-size: 13px; line-height: 1.8; color: rgba(26,26,46,0.7); margin: 0; }
.pf-flow-card p b { background: var(--pf-yellow); padding: 1px 6px; font-weight: 900; color: var(--pf-bg2); }

.pf-price { background: var(--pf-bg2); color: #fff; text-align: center; }
.pf-price-content { max-width: 820px; margin: 0 auto; }
.pf-price-content > p { color: rgba(255,255,255,0.8); margin-bottom: 36px; }
.pf-price-table { display: grid; gap: 12px; margin-bottom: 24px; }
.pf-price-row { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 16px; align-items: center; padding: 20px 24px; background: rgba(255,255,255,0.05); border-left: 6px solid var(--c); border-radius: 12px; text-align: left; }
.pf-price-id { font-size: 18px; font-weight: 900; color: var(--c); letter-spacing: 0.05em; }
.pf-price-spec { font-size: 14px; color: rgba(255,255,255,0.75); }
.pf-price-row strong { font-size: 24px; font-weight: 900; color: var(--pf-yellow); text-align: right; }
.pf-price-row strong small { font-size: 9px; color: var(--pf-pink); margin-left: 4px; display: block; text-align: right; font-weight: 500; }
@media (max-width: 700px) { .pf-price-row { grid-template-columns: 1fr; gap: 4px; } .pf-price-row strong { text-align: left; } }

.pf-cta { background: var(--pf-coral); color: #fff; text-align: center; }
.pf-cta-h { font-size: clamp(40px, 7vw, 88px); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 24px; }
.pf-cta-h em { font-style: normal; background: var(--pf-yellow); color: var(--pf-bg2); padding: 0 12px; }
.pf-cta p { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.95); margin: 0 0 36px; }
.pf-cta-inner { max-width: 800px; margin: 0 auto; }
.pf-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.pf-cta .pf-btn-primary { background: var(--pf-bg2); }
.pf-cta .pf-btn-secondary { background: #fff; border-color: #fff; }

.pf-footer { padding: 56px 32px 32px; background: var(--pf-bg2); color: #fff; text-align: center; }
.pf-footer-logo { font-size: 18px; font-weight: 900; margin: 0 0 24px; color: var(--pf-yellow); }
.pf-footer-disclaimer { max-width: 700px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.15); border: 1px solid var(--pf-pink); color: rgba(255,255,255,0.9); font-size: 12px; line-height: 1.8; border-radius: 12px; }
.pf-footer-disclaimer strong { color: var(--pf-pink); }
.pf-footer-cr { font-size: 11px; color: rgba(255,255,255,0.4); }

.pf-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--pf-pink); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; }
.pf-floating-warning-icon { background: #fff; color: var(--pf-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.pf-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.pf-reveal.is-visible { opacity: 1; transform: translateY(0); }
@keyframes pf-rise { to { opacity: 1; transform: translateY(0); } }
`
