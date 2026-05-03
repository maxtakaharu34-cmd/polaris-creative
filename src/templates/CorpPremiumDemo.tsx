import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS Inc. — コーポレートテンプレート
   技術: 大型ディスプレイタイポ
        + 水平横スクロール事業領域
        + ニュースティッカーマーキー
        + 数値カウントアップ（IntersectionObserver起動）
        + ダークセクションでコントラスト演出
   テイスト: モダンビジネス・大企業ホームページの密度感
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85',
  biz1: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
  biz2: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85',
  biz3: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=85',
  biz4: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
  biz5: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=85',
  about: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85',
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const [active, setActive] = useState(false)
  const v = useCountUp(value, active)
  return (
    <span
      ref={(el) => {
        if (!el || active) return
        const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(true)), { threshold: 0.5 })
        io.observe(el)
      }}
    >
      {v.toLocaleString()}
      <small>{suffix}</small>
    </span>
  )
}

export default function CorpPremiumDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.cp-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="cp-root">
      <style>{cssText}</style>

      {/* 警告 */}
      <div className="cp-warning">
        <div className="cp-warning-row">
          <span className="cp-warning-pill">SAMPLE</span>
          <span className="cp-warning-text">
            ⚠️ <b>POLARIS Inc.</b> は<b className="cp-warning-emph">実在しない仮想会社</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="cp-warning-back">← 戻る</a>
        </div>
        <div className="cp-warning-strip">
          ⚠️ 注意：会社名・役員名・住所・電話番号・取引先・IR情報などはすべて<u>架空</u>です。
        </div>
      </div>

      {/* News ticker */}
      <div className="cp-ticker">
        <span className="cp-ticker-label">NEWS</span>
        <div className="cp-ticker-track">
          <span>2026.04.10 — 第3四半期決算発表（架空）</span>
          <span>2026.03.28 — 新事業「次世代エネルギー素材」始動（架空）</span>
          <span>2026.03.15 — 米国法人 POLARIS USA, Inc. 設立（架空）</span>
          <span>2026.02.20 — 環境報告書 2025 を公開（架空）</span>
          <span>2026.04.10 — 第3四半期決算発表（架空）</span>
          <span>2026.03.28 — 新事業「次世代エネルギー素材」始動（架空）</span>
        </div>
      </div>

      {/* Header */}
      <header className="cp-header">
        <a href="#" className="cp-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="cp-logo-mark">
            <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden>
              <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" fill="none" stroke="#0a2540" strokeWidth="2.5"/>
              <circle cx="20" cy="20" r="5" fill="#1d4ed8"/>
            </svg>
          </span>
          <div className="cp-logo-text">
            <strong>POLARIS</strong>
            <span>Inc.（架空）</span>
          </div>
        </a>
        <nav className={`cp-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#business" onClick={() => setMenuOpen(false)}>BUSINESS</a>
          <a href="#stats" onClick={() => setMenuOpen(false)}>NUMBERS</a>
          <a href="#sustainability" onClick={() => setMenuOpen(false)}>SUSTAINABILITY</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <div className="cp-header-meta">
          <select className="cp-lang" defaultValue="JP">
            <option>JP</option>
            <option>EN</option>
            <option>ZH</option>
          </select>
          <a href="#contact" className="cp-cta-btn">IR情報（仮）</a>
        </div>
        <button className="cp-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      {/* Hero */}
      <section className="cp-hero">
        <div className="cp-hero-img" style={{ backgroundImage: `url("${IMG.hero}")` }}>
          <div className="cp-hero-overlay"/>
          <div className="cp-img-stamp">SAMPLE</div>
        </div>
        <div className="cp-hero-content">
          <span className="cp-hero-eyebrow">— Mid-term Vision 2030 —</span>
          <h1 className="cp-hero-title">
            <span>つくる</span>で、<br/>
            <em>未来を、ひらく。</em>
          </h1>
          <p className="cp-hero-sub">
            日本のものづくりを牽引する技術力で、世界の "持続可能性" に貢献します。<br/>
            半導体・機能性素材・再生エネルギーの3領域を軸に、グローバルに展開（架空）。<br/>
            <span className="cp-fake">※ このページは仮想会社のデザイン見本です。</span>
          </p>
          <div className="cp-hero-cta">
            <a href="#business" className="cp-btn cp-btn-fill">事業領域を見る（仮）</a>
            <a href="#contact" className="cp-btn cp-btn-ghost">IR情報 →</a>
          </div>
        </div>

        {/* Massive watermark */}
        <div className="cp-hero-mega" aria-hidden>POLARIS</div>

        {/* Hero badge */}
        <div className="cp-hero-badge">※ これは架空のデザイン見本です</div>
      </section>

      {/* Stats bar */}
      <section id="stats" className="cp-stats">
        <div className="cp-stats-head cp-reveal">
          <span className="cp-eyebrow">— By the numbers —</span>
          <h2 className="cp-h2">数字で見る、POLARIS。</h2>
          <p className="cp-fake-pill">※ 数値はすべて架空のサンプル表示です</p>
        </div>
        <div className="cp-stats-grid cp-reveal">
          <div>
            <div className="cp-stat-num"><StatNumber value={4280} suffix="億円"/></div>
            <p>2025年度 連結売上高（架空）</p>
          </div>
          <div>
            <div className="cp-stat-num"><StatNumber value={32} suffix="ヶ国"/></div>
            <p>事業展開エリア（架空）</p>
          </div>
          <div>
            <div className="cp-stat-num"><StatNumber value={12500} suffix="人"/></div>
            <p>連結従業員数（架空）</p>
          </div>
          <div>
            <div className="cp-stat-num"><StatNumber value={1947} suffix=""/></div>
            <p>創業年（架空）</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="cp-about">
        <div className="cp-about-grid">
          <div className="cp-about-img sc-reveal cp-reveal" style={{ backgroundImage: `url("${IMG.about}")` }}>
            <div className="cp-img-stamp">SAMPLE</div>
            <div className="cp-about-img-tag">VISION 2030</div>
          </div>
          <div className="cp-about-text cp-reveal">
            <span className="cp-eyebrow">— About us —</span>
            <h2 className="cp-h2">
              社会を、<br/>
              <em>未来へ運ぶ。</em>
            </h2>
            <p className="cp-about-body">
              POLARIS Inc.（架空）は、1947年の創業以来、<br/>
              "ものづくり" を通じて社会の進化を支えてきました。<br/>
              次世代半導体・機能性素材・再生可能エネルギー分野で、<br/>
              世界の持続可能な未来を共に創ります。<br/>
              <span className="cp-fake">※ 上記は仮想会社のデザイン見本です。</span>
            </p>
            <ul className="cp-about-list">
              <li><strong>1947</strong><span>創業（架空）</span></li>
              <li><strong>1985</strong><span>東証一部上場（架空）</span></li>
              <li><strong>2010</strong><span>海外3拠点へ（架空）</span></li>
              <li><strong>2026</strong><span>米国法人設立（架空）</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Business — horizontal scroll */}
      <section id="business" className="cp-biz">
        <div className="cp-biz-head cp-reveal">
          <span className="cp-eyebrow">— Business —</span>
          <h2 className="cp-h2">事業領域</h2>
          <p className="cp-biz-sub">
            5つの主要事業で、未来を創ります（架空）。<br/>
            <span className="cp-fake">※ 事業領域・実績はすべて架空のサンプル表示です</span>
          </p>
        </div>
        <div className="cp-biz-scroll">
          {[
            { num: '01', title: 'ADVANCED SEMICONDUCTOR', jp: '次世代半導体', img: IMG.biz1, body: '5nm以下の先端プロセス向け素材・装置を開発（架空）。世界シェア25%（架空）。' },
            { num: '02', title: 'FUNCTIONAL MATERIALS', jp: '機能性素材', img: IMG.biz2, body: '軽量・高強度の独自素材で、自動車・航空産業を支えます（架空）。' },
            { num: '03', title: 'RENEWABLE ENERGY', jp: '再生エネルギー', img: IMG.biz3, body: '太陽光発電所運営、蓄電池ソリューションをグローバル展開（架空）。' },
            { num: '04', title: 'BIOTECHNOLOGY', jp: 'バイオテクノロジー', img: IMG.biz4, body: 'ゲノム解析と合成生物学で、医療・農業の未来を切り拓く（架空）。' },
            { num: '05', title: 'SMART INFRA', jp: 'スマートインフラ', img: IMG.biz5, body: 'IoT・AIで都市インフラを再定義する次世代プラットフォーム（架空）。' },
          ].map((b) => (
            <article key={b.num} className="cp-biz-card cp-reveal">
              <div className="cp-biz-card-img" style={{ backgroundImage: `url("${b.img}")` }}>
                <div className="cp-img-stamp">SAMPLE</div>
                <span className="cp-biz-card-num">{b.num}</span>
              </div>
              <div className="cp-biz-card-info">
                <p className="cp-biz-card-en">{b.title}</p>
                <h3>{b.jp}<small>（架空）</small></h3>
                <p>{b.body}</p>
                <a href="#" className="cp-link-arrow">View details →</a>
              </div>
            </article>
          ))}
          <div className="cp-biz-spacer"/>
        </div>
        <div className="cp-biz-hint">← 横にスクロールできます →</div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="cp-sus">
        <div className="cp-sus-head cp-reveal">
          <span className="cp-eyebrow cp-eyebrow-light">— Sustainability —</span>
          <h2 className="cp-h2 cp-h2-light">
            地球と、共に。<br/>
            <em>子どもたちのために。</em>
          </h2>
          <p className="cp-fake-pill">※ サステナ目標はすべて架空のサンプル表示です</p>
        </div>
        <div className="cp-sus-grid">
          {[
            { num: '01', title: 'CARBON NEUTRAL', jp: 'カーボンニュートラル', body: '2030年までに、国内全事業所のCO2排出量を実質ゼロに（架空目標）。' },
            { num: '02', title: 'CIRCULAR ECONOMY', jp: 'サーキュラーエコノミー', body: '2035年までに、製品リサイクル率90%を目指します（架空目標）。' },
            { num: '03', title: 'DIVERSITY', jp: 'ダイバーシティ', body: '管理職に占める女性比率30%、外国籍社員比率20%へ（架空目標）。' },
          ].map((s) => (
            <div key={s.num} className="cp-sus-card cp-reveal">
              <span className="cp-sus-num">{s.num}</span>
              <p className="cp-sus-en">{s.title}</p>
              <h3>{s.jp}<small>（架空）</small></h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="cp-news">
        <div className="cp-news-head cp-reveal">
          <span className="cp-eyebrow">— News & IR —</span>
          <h2 className="cp-h2">最新情報</h2>
          <p className="cp-fake-pill">※ ニュースはすべて架空のサンプル表示です</p>
        </div>
        <ul className="cp-news-list">
          {[
            { date: '2026.04.10', cat: 'IR', title: '2026年3月期 第3四半期決算短信を発表しました（架空）' },
            { date: '2026.03.28', cat: 'NEWS', title: '次世代エネルギー素材プロジェクトを始動（架空）' },
            { date: '2026.03.15', cat: 'PRESS', title: '米国法人 POLARIS USA, Inc. を設立（架空）' },
            { date: '2026.02.20', cat: 'CSR', title: '環境報告書 2025 を公開（架空）' },
            { date: '2026.02.10', cat: 'NEWS', title: 'CES 2026 出展のお知らせ（架空）' },
          ].map((n, i) => (
            <li key={i} className="cp-news-item cp-reveal">
              <time>{n.date}</time>
              <span className={`cp-news-cat cp-cat-${n.cat.toLowerCase()}`}>{n.cat}</span>
              <p>{n.title}</p>
              <span className="cp-news-arrow">→</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section id="contact" className="cp-cta">
        <div className="cp-cta-content cp-reveal">
          <span className="cp-eyebrow cp-eyebrow-accent">— Contact —</span>
          <h2 className="cp-cta-h">
            さあ、ともに<br/>
            <em>未来をつくろう。</em>
          </h2>
          <p>
            事業に関するお問い合わせ、IR・採用、メディア取材、すべてこちらから（架空）。<br/>
            <span className="cp-fake">※ ボタンは動作しません。仮想会社のデザイン見本です。</span>
          </p>
          <div className="cp-cta-btns">
            <a href="#" className="cp-btn cp-btn-light">事業に関するお問い合わせ（仮）</a>
            <a href="#" className="cp-btn cp-btn-light-outline">採用情報（仮）</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="cp-footer">
        <div className="cp-footer-top">
          <div className="cp-footer-logo">
            <span className="cp-logo-mark">
              <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden>
                <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" fill="none" stroke="#fff" strokeWidth="2.5"/>
                <circle cx="20" cy="20" r="5" fill="#1d4ed8"/>
              </svg>
            </span>
            <strong>POLARIS Inc.<small>（架空）</small></strong>
          </div>
          <div className="cp-footer-cols">
            <div>
              <h4>BUSINESS</h4>
              <ul><li>半導体</li><li>機能性素材</li><li>再生エネルギー</li><li>バイオ</li></ul>
            </div>
            <div>
              <h4>COMPANY</h4>
              <ul><li>会社概要</li><li>沿革</li><li>役員一覧</li><li>拠点</li></ul>
            </div>
            <div>
              <h4>IR</h4>
              <ul><li>業績ハイライト</li><li>決算資料</li><li>株主総会</li><li>IRカレンダー</li></ul>
            </div>
            <div>
              <h4>CSR</h4>
              <ul><li>サステナビリティ</li><li>環境</li><li>社会</li><li>ガバナンス</li></ul>
            </div>
          </div>
        </div>
        <p className="cp-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS Inc.」という<u>実在しない仮想会社</u>のデザイン見本です。<br/>
          会社名・役員名・住所・電話番号・財務情報・取引先などはすべて<u>架空</u>です。
        </p>
        <p className="cp-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="cp-floating-warning">
        <span className="cp-floating-warning-icon">!</span>
        <span>このサイトは架空のコーポレートサイトです</span>
      </div>
    </div>
  )
}

const cssText = `
.cp-root {
  --cp-bg: #ffffff;
  --cp-fg: #0a2540;
  --cp-fg-soft: rgba(10,37,64,0.65);
  --cp-line: #e5e9f0;
  --cp-accent: #1d4ed8;
  --cp-dark: #0a2540;
  --cp-warn-pink: #ec4899;
  background: var(--cp-bg);
  color: var(--cp-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.cp-root *, .cp-root *::before, .cp-root *::after { box-sizing: border-box; }

/* Warning */
.cp-warning {
  position: sticky; top: 0; z-index: 50;
  background: #0a2540; color: #fff;
  border-bottom: 2px solid var(--cp-warn-pink);
}
.cp-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.cp-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.cp-warning-text { flex: 1; min-width: 0; }
.cp-warning-emph { color: var(--cp-warn-pink); }
.cp-warning-back {
  background: #fff; color: #0a2540; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.cp-warning-back:hover { background: var(--cp-warn-pink); color: #fff; }
.cp-warning-strip {
  background: var(--cp-warn-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Ticker */
.cp-ticker {
  position: sticky; top: 76px; z-index: 39;
  display: flex; align-items: stretch;
  background: #f3f4f6; border-bottom: 1px solid var(--cp-line);
  font-size: 12px;
}
.cp-ticker-label {
  background: var(--cp-accent); color: #fff;
  padding: 8px 16px; font-family: "Inter", sans-serif;
  font-weight: 800; letter-spacing: 0.15em; flex-shrink: 0;
}
.cp-ticker-track {
  display: flex; gap: 48px; padding: 8px 0;
  white-space: nowrap; overflow: hidden;
  flex: 1;
  animation: cp-marquee 40s linear infinite;
}
.cp-ticker-track span { color: var(--cp-fg-soft); }
@keyframes cp-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Header */
.cp-header {
  position: sticky; top: 113px; z-index: 38;
  display: flex; align-items: center; gap: 24px;
  padding: 16px 32px;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--cp-line);
}
.cp-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--cp-fg); }
.cp-logo-mark { display: inline-flex; }
.cp-logo-text strong {
  display: block; font-family: "Inter", sans-serif; font-size: 18px; font-weight: 800;
  letter-spacing: 0.15em; line-height: 1;
}
.cp-logo-text span { display: block; font-size: 9px; color: var(--cp-fg-soft); margin-top: 4px; }
.cp-nav {
  display: flex; gap: 28px; margin: 0 auto;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em;
}
.cp-nav a { color: var(--cp-fg); text-decoration: none; padding: 6px 0; position: relative; }
.cp-nav a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0;
  height: 2px; background: var(--cp-accent); transform: scaleX(0);
  transform-origin: left; transition: transform .3s;
}
.cp-nav a:hover::after { transform: scaleX(1); }

.cp-header-meta { display: flex; gap: 12px; align-items: center; }
.cp-lang {
  background: transparent; border: 1px solid var(--cp-line);
  padding: 6px 12px; font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.1em; cursor: pointer; color: var(--cp-fg);
}
.cp-cta-btn {
  background: var(--cp-accent); color: #fff;
  padding: 12px 24px;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: 0.15em; text-decoration: none;
  transition: all .25s ease;
}
.cp-cta-btn:hover { background: var(--cp-dark); }

.cp-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer;
}
.cp-burger span {
  width: 22px; height: 2px; background: var(--cp-fg); transition: all .3s;
}
.cp-burger span.is-open:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.cp-burger span.is-open:nth-child(2) { transform: translateY(-3px) rotate(-45deg); }

/* Hero */
.cp-hero {
  position: relative; min-height: 88vh;
  display: grid; grid-template-columns: 1fr 1fr;
  overflow: hidden;
}
.cp-hero-img {
  position: relative; background-size: cover; background-position: center;
  min-height: 600px;
}
.cp-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(10,37,64,0.4) 0%, transparent 60%);
}
.cp-img-stamp {
  position: absolute; top: 16px; right: 16px; z-index: 3;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 2px; letter-spacing: 0.2em;
}
.cp-hero-content {
  padding: 80px 64px; display: flex; flex-direction: column; justify-content: center;
  position: relative; z-index: 2;
}
.cp-hero-eyebrow {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.25em;
  color: var(--cp-accent); font-weight: 700; margin-bottom: 24px;
}
.cp-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(40px, 5.5vw, 92px); line-height: 1.15;
  margin: 0 0 28px; letter-spacing: -0.02em;
}
.cp-hero-title span { color: var(--cp-accent); }
.cp-hero-title em { font-style: normal; }
.cp-hero-sub { font-size: 14px; line-height: 1.9; color: var(--cp-fg-soft); margin: 0 0 32px; max-width: 480px; }
.cp-fake { font-size: 11px; color: var(--cp-warn-pink); font-weight: 700; }
.cp-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }

.cp-hero-mega {
  position: absolute; bottom: -2vw; left: 50%; transform: translateX(-50%);
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 22vw; line-height: 1;
  color: rgba(10,37,64,0.04);
  letter-spacing: -0.04em; pointer-events: none;
  white-space: nowrap;
}
.cp-hero-badge {
  position: absolute; top: 24px; right: 24px; z-index: 5;
  background: var(--cp-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}

/* Buttons */
.cp-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.15em; text-decoration: none;
  cursor: pointer; transition: all .25s ease;
}
.cp-btn-fill { background: var(--cp-accent); color: #fff; }
.cp-btn-fill:hover { background: var(--cp-dark); }
.cp-btn-ghost { background: transparent; color: var(--cp-fg); border-bottom: 2px solid var(--cp-fg); padding: 14px 8px; }
.cp-btn-ghost:hover { color: var(--cp-accent); border-color: var(--cp-accent); }
.cp-btn-light { background: #fff; color: var(--cp-dark); }
.cp-btn-light:hover { background: var(--cp-accent); color: #fff; }
.cp-btn-light-outline { background: transparent; color: #fff; border: 2px solid #fff; }
.cp-btn-light-outline:hover { background: #fff; color: var(--cp-dark); }

/* Common */
.cp-eyebrow {
  display: inline-block;
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.25em;
  color: var(--cp-accent); font-weight: 700;
  padding-bottom: 4px; border-bottom: 2px solid var(--cp-accent);
}
.cp-eyebrow-light { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.7); }
.cp-eyebrow-accent { color: var(--cp-accent); }
.cp-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(36px, 5vw, 72px); line-height: 1.25;
  margin: 16px 0 24px; letter-spacing: -0.02em;
}
.cp-h2 em { font-style: normal; color: var(--cp-accent); }
.cp-h2-light { color: #fff; }
.cp-h2-light em { color: #60a5fa; }
.cp-fake-pill {
  display: inline-block; padding: 4px 12px;
  background: rgba(236,72,153,0.08); border: 1px solid rgba(236,72,153,0.25);
  color: var(--cp-warn-pink); border-radius: 999px;
  font-size: 11px; font-weight: 700; margin: 4px 0 0;
}

/* Reveal */
.cp-reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.cp-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Stats */
.cp-stats { padding: 100px 32px 80px; max-width: 1400px; margin: 0 auto; }
.cp-stats-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.cp-stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0; border-top: 2px solid var(--cp-fg); border-bottom: 2px solid var(--cp-fg);
}
.cp-stats-grid > div {
  padding: 32px 24px; text-align: center;
  border-right: 1px solid var(--cp-line);
}
.cp-stats-grid > div:last-child { border-right: 0; }
.cp-stat-num {
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: clamp(36px, 5vw, 64px); line-height: 1;
  color: var(--cp-accent); letter-spacing: -0.04em;
  margin-bottom: 8px;
}
.cp-stat-num small {
  font-size: 0.4em; color: var(--cp-fg); margin-left: 6px;
  font-weight: 700;
}
.cp-stats-grid p { margin: 0; font-size: 12px; color: var(--cp-fg-soft); }

/* About */
.cp-about { padding: 120px 64px; max-width: 1400px; margin: 0 auto; }
.cp-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.cp-about-img {
  position: relative; aspect-ratio: 4/5;
  background-size: cover; background-position: center;
}
.cp-about-img-tag {
  position: absolute; bottom: 24px; left: 24px;
  background: var(--cp-accent); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: 0.15em; padding: 6px 14px;
}
.cp-about-body { font-size: 14px; line-height: 1.95; color: var(--cp-fg-soft); margin: 24px 0 32px; }
.cp-about-list {
  list-style: none; padding: 0; margin: 0;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
  border-top: 1px solid var(--cp-line); padding-top: 24px;
}
.cp-about-list li {
  display: flex; flex-direction: column; gap: 4px;
}
.cp-about-list strong {
  font-family: "Inter", sans-serif; font-weight: 800;
  font-size: 28px; color: var(--cp-accent);
}
.cp-about-list span { font-size: 11px; color: var(--cp-fg-soft); }

/* Business — horizontal scroll */
.cp-biz { padding: 120px 0 80px; background: #f8fafc; overflow: hidden; }
.cp-biz-head { padding: 0 64px; max-width: 1400px; margin: 0 auto 60px; }
.cp-biz-sub { font-size: 14px; line-height: 1.8; color: var(--cp-fg-soft); margin: 24px 0 0; max-width: 600px; }
.cp-biz-scroll {
  display: flex; gap: 24px; padding: 0 64px;
  overflow-x: auto; scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.cp-biz-scroll::-webkit-scrollbar { height: 4px; }
.cp-biz-scroll::-webkit-scrollbar-track { background: var(--cp-line); }
.cp-biz-scroll::-webkit-scrollbar-thumb { background: var(--cp-accent); }
.cp-biz-card {
  flex: 0 0 380px; background: #fff;
  scroll-snap-align: start;
  display: flex; flex-direction: column;
  border: 1px solid var(--cp-line);
}
.cp-biz-card-img {
  position: relative; aspect-ratio: 4/3;
  background-size: cover; background-position: center;
  border-bottom: 4px solid var(--cp-accent);
}
.cp-biz-card-num {
  position: absolute; bottom: -28px; left: 24px;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--cp-accent); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: "Inter", sans-serif; font-size: 16px; font-weight: 800;
  box-shadow: 0 8px 20px rgba(29,78,216,0.4);
}
.cp-biz-card-info { padding: 40px 24px 24px; }
.cp-biz-card-en {
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.15em; color: var(--cp-accent);
  font-weight: 700; margin: 0 0 6px;
}
.cp-biz-card-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 900;
  margin: 0 0 12px;
}
.cp-biz-card-info h3 small { font-size: 11px; color: var(--cp-warn-pink); font-weight: 600; }
.cp-biz-card-info > p {
  font-size: 13px; line-height: 1.8; color: var(--cp-fg-soft); margin: 0 0 16px;
}
.cp-link-arrow {
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  color: var(--cp-accent); text-decoration: none;
  border-bottom: 1px solid var(--cp-accent); padding-bottom: 2px;
}
.cp-link-arrow:hover { color: var(--cp-dark); border-color: var(--cp-dark); }
.cp-biz-spacer { flex: 0 0 24px; }
.cp-biz-hint {
  text-align: center; margin-top: 32px;
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.2em; color: var(--cp-fg-soft);
}

/* Sustainability */
.cp-sus {
  padding: 120px 64px;
  background: var(--cp-dark); color: #fff;
}
.cp-sus-head { text-align: center; max-width: 800px; margin: 0 auto 60px; }
.cp-sus-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
  max-width: 1200px; margin: 0 auto;
}
.cp-sus-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 40px 32px;
}
.cp-sus-num {
  display: inline-block;
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 56px; color: #60a5fa;
  letter-spacing: -0.04em; line-height: 1;
  margin-bottom: 16px;
}
.cp-sus-en {
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.2em; color: rgba(255,255,255,0.6);
  font-weight: 700; margin: 0 0 8px;
}
.cp-sus-card h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 900;
  margin: 0 0 12px; color: #fff;
}
.cp-sus-card h3 small { font-size: 11px; color: var(--cp-warn-pink); font-weight: 600; }
.cp-sus-card p {
  font-size: 13px; line-height: 1.8; color: rgba(255,255,255,0.75); margin: 0;
}

/* News */
.cp-news { padding: 120px 64px; max-width: 1400px; margin: 0 auto; }
.cp-news-head { margin-bottom: 48px; }
.cp-news-list { list-style: none; padding: 0; margin: 0; }
.cp-news-item {
  display: grid; grid-template-columns: 120px 80px 1fr 32px;
  gap: 24px; align-items: center;
  padding: 24px 0; border-bottom: 1px solid var(--cp-line);
  cursor: pointer; transition: padding .25s;
}
.cp-news-item:hover { padding-left: 12px; }
.cp-news-item time {
  font-family: "Inter", sans-serif; font-size: 13px;
  font-weight: 700; color: var(--cp-fg-soft);
}
.cp-news-cat {
  display: inline-block;
  font-family: "Inter", sans-serif; font-size: 10px;
  font-weight: 800; letter-spacing: 0.15em;
  padding: 4px 10px; text-align: center;
  border: 1px solid var(--cp-fg);
}
.cp-cat-ir { background: var(--cp-accent); color: #fff; border-color: var(--cp-accent); }
.cp-cat-press { background: var(--cp-fg); color: #fff; }
.cp-news-item p { margin: 0; font-size: 14px; }
.cp-news-arrow {
  font-family: "Inter", sans-serif; font-size: 18px; color: var(--cp-fg-soft);
  text-align: right;
}

/* CTA */
.cp-cta {
  padding: 120px 32px;
  background: linear-gradient(135deg, var(--cp-accent), var(--cp-dark));
  color: #fff; text-align: center;
}
.cp-cta-content { max-width: 800px; margin: 0 auto; }
.cp-cta-h {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(40px, 6vw, 80px); line-height: 1.25;
  margin: 24px 0 24px; color: #fff;
}
.cp-cta-h em { font-style: normal; color: #fcd34d; }
.cp-cta p { font-size: 14px; line-height: 1.9; margin: 0 0 36px; color: rgba(255,255,255,0.85); }
.cp-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* Footer */
.cp-footer { padding: 60px 64px 40px; background: #050d1a; color: #fff; }
.cp-footer-top {
  display: grid; grid-template-columns: 1fr 2fr; gap: 60px;
  margin-bottom: 48px; padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.cp-footer-logo {
  display: flex; align-items: center; gap: 12px;
}
.cp-footer-logo strong {
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 800;
  letter-spacing: 0.15em;
}
.cp-footer-logo small { font-size: 10px; color: rgba(255,255,255,0.5); margin-left: 8px; font-weight: 400; letter-spacing: 0.05em; }
.cp-footer-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.cp-footer h4 {
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.2em; color: #fcd34d; margin: 0 0 16px;
}
.cp-footer ul { list-style: none; padding: 0; margin: 0; }
.cp-footer ul li {
  font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 8px;
}
.cp-footer-disclaimer {
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.12); border: 1px solid rgba(236,72,153,0.3);
  padding: 14px 20px; border-radius: 4px; margin: 0 0 20px;
}
.cp-footer-disclaimer strong { color: var(--cp-warn-pink); }
.cp-footer-cr {
  text-align: center; font-size: 11px;
  color: rgba(255,255,255,0.5); margin: 0;
}

/* Floating warning */
.cp-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--cp-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.cp-floating-warning-icon {
  background: #fff; color: var(--cp-warn-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 1024px) {
  .cp-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .cp-stats-grid > div:nth-child(2n) { border-right: 0; }
  .cp-stats-grid > div:nth-child(-n+2) { border-bottom: 1px solid var(--cp-line); }
  .cp-news-item { grid-template-columns: 100px 60px 1fr 24px; gap: 12px; }
  .cp-footer-cols { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .cp-header { padding: 14px 16px; gap: 12px; top: 113px; }
  .cp-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: #fff;
    box-shadow: 0 12px 32px rgba(0,0,0,0.06);
    padding: 0; max-height: 0; overflow: hidden; margin: 0;
    transition: max-height .4s, padding .4s;
  }
  .cp-nav.is-open { max-height: 500px; padding: 16px 0; }
  .cp-nav a { padding: 14px 24px; }
  .cp-burger { display: flex; }
  .cp-header-meta { margin-left: auto; }
  .cp-cta-btn { display: none; }
  .cp-hero { grid-template-columns: 1fr; }
  .cp-hero-img { aspect-ratio: 4/3; min-height: 320px; }
  .cp-hero-content { padding: 60px 24px; }
  .cp-stats { padding: 60px 24px; }
  .cp-about { padding: 80px 24px; }
  .cp-about-grid { grid-template-columns: 1fr; gap: 40px; }
  .cp-biz { padding: 80px 0 60px; }
  .cp-biz-head { padding: 0 24px; }
  .cp-biz-scroll { padding: 0 24px; }
  .cp-biz-card { flex: 0 0 280px; }
  .cp-sus { padding: 80px 24px; }
  .cp-sus-grid { grid-template-columns: 1fr; gap: 16px; }
  .cp-news { padding: 80px 24px; }
  .cp-news-item { grid-template-columns: 80px 1fr; gap: 8px; }
  .cp-news-item .cp-news-cat { grid-column: 2; justify-self: start; }
  .cp-news-item p { grid-column: 1 / -1; }
  .cp-news-item .cp-news-arrow { display: none; }
  .cp-cta { padding: 80px 24px; }
  .cp-footer { padding: 60px 24px 40px; }
  .cp-footer-top { grid-template-columns: 1fr; gap: 32px; }
  .cp-footer-cols { grid-template-columns: repeat(2, 1fr); }
  .cp-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .cp-warning-row { flex-wrap: wrap; }
  .cp-ticker { top: 76px; }
  .cp-ticker-label { padding: 8px 12px; font-size: 11px; }
}
`
