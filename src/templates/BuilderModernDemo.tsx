import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS ARCHITECT — モダン建築・ミニマル
   テイスト: 安藤忠雄風 / 白×黒コンクリート / 大判建築写真 / 巨大タイポ
   技術: scroll-driven image reveal、グリッド分割、フェード+スライド
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=85',
  hero2: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85',
  w1: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85',
  w2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
  w3: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
  w4: 'https://images.unsplash.com/photo-1564540583246-934409427776?auto=format&fit=crop&w=1600&q=85',
  w5: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  w6: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=85',
  detail: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=85',
}

export default function BuilderModernDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      { threshold: 0.12 },
    )
    document.querySelectorAll('.bm-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="bm-root">
      <style>{cssText}</style>

      {/* Warning bar */}
      <div className="bm-warning">
        <div className="bm-warning-row">
          <span className="bm-warning-pill">SAMPLE</span>
          <span className="bm-warning-text">
            ⚠️ <b>POLARIS ARCHITECT</b> は<b className="bm-warning-emph">実在しない仮想建築事務所</b>です。デザイン見本としてポラリスクリエイティブが作成。
          </span>
          <a href="#hp" className="bm-warning-back">← 戻る</a>
        </div>
        <div className="bm-warning-strip">
          ⚠️ 注意：会社名・住所・電話番号・施工事例・お客様の声などは<u>すべて架空</u>です。
        </div>
      </div>

      {/* Header */}
      <header className="bm-header">
        <a href="#" className="bm-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="bm-logo-mark" aria-hidden>
            <rect x="6" y="6" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="14" width="12" height="12" fill="currentColor"/>
          </svg>
          <div className="bm-logo-text">
            <strong>POLARIS ARCHITECT</strong>
            <span>ポラリス・アーキテクト（架空）</span>
          </div>
        </a>
        <nav className={`bm-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#works" onClick={() => setMenuOpen(false)}>01 WORKS</a>
          <a href="#philosophy" onClick={() => setMenuOpen(false)}>02 PHILOSOPHY</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>03 PROCESS</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>04 CONTACT</a>
        </nav>
        <button className="bm-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="bm-cta-btn">CONTACT（仮）</a>
      </header>

      {/* Hero — large architectural image with mega type overlay */}
      <section className="bm-hero" ref={heroRef}>
        <div className="bm-hero-img" style={{
          backgroundImage: `url("${IMG.hero}")`,
          transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
        }}/>
        <div className="bm-hero-grid">
          <div/><div/><div/><div/><div/>
        </div>
        <div className="bm-hero-badge">※ これは架空のデザイン見本です</div>

        <div className="bm-hero-mega">
          <span className="bm-line"><i>SPACE</i></span>
          <span className="bm-line bm-line-r"><i>SHAPES</i></span>
          <span className="bm-line"><i>LIFE.</i></span>
        </div>

        <div className="bm-hero-foot">
          <div className="bm-hero-foot-l">
            <span className="bm-tick"/>
            <span>EST. 2008（架空）— TOKYO / OSAKA / KYOTO</span>
          </div>
          <div className="bm-hero-foot-r">
            <span>住宅・店舗・公共建築の意匠設計</span>
          </div>
        </div>

        <div className="bm-hero-scroll">
          <span>SCROLL</span>
          <div className="bm-hero-scroll-line"/>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bm-stats">
        {[
          { n: '180+', l: 'PROJECTS（架空）' },
          { n: '17', l: 'AWARDS（架空）' },
          { n: '4', l: 'OFFICES（架空）' },
          { n: '2008', l: 'FOUNDED（架空）' },
        ].map((s) => (
          <div key={s.l} className="bm-stat">
            <strong>{s.n}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="bm-philosophy">
        <div className="bm-philosophy-l bm-reveal">
          <span className="bm-eyebrow">02 — PHILOSOPHY</span>
          <h2 className="bm-h2">
            余白が、<br/>
            <em>空間を</em><br/>
            生かす。
          </h2>
          <p className="bm-body">
            建築は、線でも面でもなく、<b>そこに流れる空気</b>のことだと考えています。
            光・風・素材の質感——人の暮らしに寄り添う"余白"を、徹底的に設計する。<br/>
            <span className="bm-fake">※ このページは仮想建築事務所のデザイン見本です。</span>
          </p>
          <a href="#" className="bm-link">More about us ↗</a>
        </div>
        <div className="bm-philosophy-r bm-reveal">
          <img src={IMG.detail} alt="" loading="lazy"/>
          <div className="bm-img-stamp">SAMPLE</div>
        </div>
      </section>

      {/* Works — asymmetric grid */}
      <section id="works" className="bm-works">
        <div className="bm-works-head bm-reveal">
          <span className="bm-eyebrow">01 — SELECTED WORKS</span>
          <h2 className="bm-mega">WORKS</h2>
          <p className="bm-fake-pill">※ 施工事例はすべて架空のサンプル表示です</p>
        </div>

        <div className="bm-works-grid">
          {[
            { num: '01', name: '光の家（架空）', loc: '東京都・港区 / 2024', img: IMG.w1, big: true },
            { num: '02', name: 'コンクリートの庵（架空）', loc: '京都府・東山 / 2023', img: IMG.w2 },
            { num: '03', name: '海辺の別荘（架空）', loc: '神奈川県・葉山 / 2023', img: IMG.w3 },
            { num: '04', name: '壁の家（架空）', loc: '東京都・世田谷 / 2022', img: IMG.w4, big: true },
            { num: '05', name: 'カフェ"白"（架空）', loc: '大阪府・北区 / 2022', img: IMG.w5 },
            { num: '06', name: '美術館計画（架空）', loc: '長野県・軽井沢 / 2021', img: IMG.w6 },
          ].map((w) => (
            <article key={w.num} className={`bm-work ${w.big ? 'bm-work-big' : ''} bm-reveal`}>
              <div className="bm-work-img" style={{ backgroundImage: `url("${w.img}")` }}>
                <div className="bm-img-stamp">SAMPLE</div>
              </div>
              <div className="bm-work-meta">
                <span className="bm-work-num">— {w.num}</span>
                <h3>{w.name}</h3>
                <p>{w.loc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Big full-bleed quote */}
      <section className="bm-quote bm-reveal">
        <div className="bm-quote-img" style={{ backgroundImage: `url("${IMG.hero2}")` }}/>
        <div className="bm-quote-overlay"/>
        <blockquote>
          <p>"建築は、住む人の<em>10年後</em>を設計することだ。"</p>
          <cite>— 架空のキャッチコピー / SAMPLE</cite>
        </blockquote>
      </section>

      {/* Process */}
      <section id="process" className="bm-process">
        <div className="bm-process-head bm-reveal">
          <span className="bm-eyebrow">03 — PROCESS</span>
          <h2 className="bm-mega">PROCESS</h2>
          <p className="bm-fake-pill">※ プロセスは架空のサンプル表示です</p>
        </div>
        <ol className="bm-process-list">
          {[
            { n: '01', t: 'INQUIRY', jp: 'お問い合わせ', d: '土地・予算・暮らしの理想をじっくり伺います。' },
            { n: '02', t: 'CONCEPT', jp: 'コンセプト設計', d: '敷地特性を踏まえ、最適な空間構成を提案。' },
            { n: '03', t: 'DESIGN', jp: '設計・図面', d: '実施設計・構造計算・申請までを一貫対応。' },
            { n: '04', t: 'CONSTRUCTION', jp: '施工監理', d: '熟練の協力会社と、設計意図を貫く施工管理を。' },
            { n: '05', t: 'DELIVERY', jp: 'お引渡し', d: '完成後10年の点検・メンテナンスまで責任を持ちます。' },
          ].map((p) => (
            <li key={p.n} className="bm-process-row bm-reveal">
              <div className="bm-process-n">{p.n}</div>
              <div className="bm-process-en">{p.t}<small>（架空）</small></div>
              <div className="bm-process-jp">{p.jp}</div>
              <div className="bm-process-d">{p.d}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact */}
      <section id="contact" className="bm-contact">
        <div className="bm-contact-grid">
          <div className="bm-contact-l bm-reveal">
            <span className="bm-eyebrow">04 — CONTACT</span>
            <h2 className="bm-h2">
              はじめに、<br/>
              <em>対話を。</em>
            </h2>
            <p className="bm-body">
              設計のご相談・お見積もり・モデルハウス見学のご予約はこちらから。<br/>
              <span className="bm-fake">※ 動作しません。仮想建築事務所のデザイン見本です。</span>
            </p>
            <div className="bm-contact-btns">
              <a href="#" className="bm-btn bm-btn-fill">CONTACT（仮）</a>
              <a href="#" className="bm-btn bm-btn-ghost">DOWNLOAD PORTFOLIO（仮）</a>
            </div>
          </div>
          <div className="bm-contact-r bm-reveal">
            <dl>
              <dt>OFFICE（架空）</dt>
              <dd>〒000-0000 東京都〇〇区〇〇 0-0-0（実在しません）</dd>
              <dt>TEL（架空）</dt>
              <dd>03-0000-0000</dd>
              <dt>EMAIL（架空）</dt>
              <dd>info@polaris-architect.example</dd>
              <dt>HOURS（架空）</dt>
              <dd>MON-FRI 10:00 - 18:00</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bm-footer">
        <h2 className="bm-footer-mega">POLARIS<br/>ARCHITECT</h2>
        <p className="bm-footer-tag">— Architecture &amp; Design Office —</p>
        <div className="bm-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS ARCHITECT」という<u>実在しない仮想建築事務所</u>のデザイン見本です。<br/>
          会社名・住所・電話番号・施工事例・お客様の声・実績数値などはすべて<u>架空</u>です。
        </div>
        <p className="bm-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="bm-floating-warning">
        <span className="bm-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想建築事務所です</span>
      </div>
    </div>
  )
}

const cssText = `
.bm-root {
  --bm-bg: #fafaf8;
  --bm-fg: #0a0a0a;
  --bm-fg-soft: rgba(10,10,10,0.6);
  --bm-accent: #0a0a0a;
  --bm-line: rgba(10,10,10,0.12);
  --bm-pink: #ec4899;
  background: var(--bm-bg);
  color: var(--bm-fg);
  font-family: "Inter", "Noto Sans JP", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.bm-root *, .bm-root *::before, .bm-root *::after { box-sizing: border-box; }

/* Warning */
.bm-warning { position: sticky; top: 0; z-index: 50; background: #1d1d1f; color: #fff; border-bottom: 2px solid var(--bm-pink); }
.bm-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.bm-warning-pill { background: linear-gradient(90deg,#ec4899,#06b6d4); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0; }
.bm-warning-text { flex: 1; min-width: 0; }
.bm-warning-emph { color: var(--bm-pink); }
.bm-warning-back { background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.bm-warning-back:hover { background: var(--bm-pink); color: #fff; }
.bm-warning-strip { background: var(--bm-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

/* Header */
.bm-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 20px 40px;
  background: rgba(250,250,248,0.92);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--bm-line);
}
.bm-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--bm-fg); }
.bm-logo-mark { width: 32px; height: 32px; color: var(--bm-fg); }
.bm-logo-text strong { display: block; font-size: 13px; font-weight: 800; letter-spacing: 0.12em; line-height: 1.2; }
.bm-logo-text span { display: block; font-size: 10px; color: var(--bm-fg-soft); margin-top: 2px; font-family: "Noto Sans JP", sans-serif; }
.bm-nav { display: flex; gap: 32px; margin-left: auto; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; }
.bm-nav a { color: var(--bm-fg); text-decoration: none; padding: 8px 0; position: relative; transition: opacity .3s; }
.bm-nav a:hover { opacity: 0.5; }
.bm-burger { display: none; flex-direction: column; gap: 5px; background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto; }
.bm-burger span { width: 22px; height: 2px; background: var(--bm-fg); transition: all .3s; }
.bm-burger span.is-open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
.bm-burger span.is-open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }
.bm-cta-btn { background: var(--bm-fg); color: var(--bm-bg); padding: 12px 22px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-decoration: none; transition: all .3s; }
.bm-cta-btn:hover { background: var(--bm-pink); }

/* Hero */
.bm-hero { position: relative; height: 100vh; min-height: 720px; overflow: hidden; background: #000; }
.bm-hero-img { position: absolute; inset: -10%; background-size: cover; background-position: center; filter: grayscale(0.3) brightness(0.7); will-change: transform; }
.bm-hero-grid { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(5, 1fr); pointer-events: none; z-index: 2; }
.bm-hero-grid > div { border-right: 1px solid rgba(255,255,255,0.06); }
.bm-hero-grid > div:last-child { border-right: 0; }
.bm-hero-mega {
  position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);
  text-align: center; z-index: 3; color: #fff; pointer-events: none;
}
.bm-line {
  display: block; overflow: hidden;
  font-family: "Inter", serif; font-weight: 900;
  font-size: clamp(60px, 14vw, 220px); line-height: 0.9;
  letter-spacing: -0.04em;
}
.bm-line i {
  display: block; font-style: normal;
  animation: bm-rise 1.4s cubic-bezier(.7,0,.3,1) both;
}
.bm-line:nth-child(2) i { animation-delay: .2s; }
.bm-line:nth-child(3) i { animation-delay: .4s; }
.bm-line-r i { color: transparent; -webkit-text-stroke: 2px #fff; }
@keyframes bm-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }

.bm-hero-badge { position: absolute; top: 24px; right: 24px; z-index: 5; background: var(--bm-pink); color: #fff; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px; box-shadow: 0 8px 24px rgba(236,72,153,0.4); }

.bm-hero-foot { position: absolute; left: 0; right: 0; bottom: 60px; padding: 0 40px; z-index: 4; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.7); font-size: 11px; letter-spacing: 0.15em; }
.bm-hero-foot-l { display: flex; align-items: center; gap: 12px; }
.bm-tick { display: inline-block; width: 8px; height: 8px; background: #fff; border-radius: 50%; }
.bm-hero-scroll { position: absolute; left: 40px; bottom: 20px; z-index: 4; color: rgba(255,255,255,0.6); font-size: 9px; letter-spacing: 0.3em; display: flex; align-items: center; gap: 10px; }
.bm-hero-scroll-line { width: 60px; height: 1px; background: rgba(255,255,255,0.3); position: relative; overflow: hidden; }
.bm-hero-scroll-line::after { content: ''; position: absolute; top: 0; left: -30px; width: 30px; height: 100%; background: #fff; animation: bm-scroll 2s ease-in-out infinite; }
@keyframes bm-scroll { 0% { left: -30px; } 100% { left: 60px; } }

/* Stats */
.bm-stats { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--bm-line); }
.bm-stat { padding: 60px 40px; text-align: left; border-right: 1px solid var(--bm-line); }
.bm-stat:last-child { border-right: 0; }
.bm-stat strong { display: block; font-size: clamp(40px, 5vw, 64px); font-weight: 900; line-height: 1; letter-spacing: -0.03em; }
.bm-stat span { display: block; font-size: 10px; letter-spacing: 0.2em; color: var(--bm-fg-soft); margin-top: 12px; }

/* Common */
.bm-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; color: var(--bm-fg); }
.bm-h2 { font-family: "Inter", serif; font-weight: 900; font-size: clamp(40px, 5vw, 80px); line-height: 1.05; letter-spacing: -0.04em; margin: 16px 0 32px; }
.bm-h2 em { font-style: normal; color: var(--bm-fg-soft); }
.bm-mega { font-family: "Inter", serif; font-weight: 900; font-size: clamp(80px, 14vw, 240px); line-height: 0.9; letter-spacing: -0.05em; margin: 16px 0 24px; }
.bm-body { font-family: "Noto Sans JP", sans-serif; font-size: 14px; line-height: 2; color: var(--bm-fg-soft); margin: 0 0 32px; }
.bm-fake { font-size: 11px; color: var(--bm-pink); font-weight: 700; }
.bm-fake-pill { display: inline-block; padding: 5px 14px; background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4); color: var(--bm-pink); border-radius: 999px; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700; }
.bm-img-stamp { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.7); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; letter-spacing: 0.15em; }
.bm-link { font-size: 12px; letter-spacing: 0.15em; color: var(--bm-fg); text-decoration: none; padding-bottom: 4px; border-bottom: 1px solid var(--bm-fg); }
.bm-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s ease, transform 1s ease; }
.bm-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Philosophy */
.bm-philosophy { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; padding: 160px 40px; max-width: 1400px; margin: 0 auto; align-items: center; }
.bm-philosophy-r { position: relative; aspect-ratio: 4/5; overflow: hidden; }
.bm-philosophy-r img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.5); }

/* Works */
.bm-works { padding: 80px 40px 160px; max-width: 1600px; margin: 0 auto; }
.bm-works-head { margin-bottom: 80px; }
.bm-works-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 32px; }
.bm-work { position: relative; }
.bm-work-big { grid-column: span 2; }
.bm-work-img { position: relative; aspect-ratio: 4/3; background-size: cover; background-position: center; filter: grayscale(0.2); transition: filter .6s; }
.bm-work-big .bm-work-img { aspect-ratio: 16/9; }
.bm-work:hover .bm-work-img { filter: grayscale(0); }
.bm-work-meta { padding: 20px 0 0; }
.bm-work-num { font-size: 11px; letter-spacing: 0.2em; color: var(--bm-fg-soft); }
.bm-work-meta h3 { font-size: 20px; font-weight: 700; margin: 8px 0 4px; }
.bm-work-meta p { font-size: 13px; color: var(--bm-fg-soft); margin: 0; }

/* Quote */
.bm-quote { position: relative; height: 80vh; min-height: 600px; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 0 40px; }
.bm-quote-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: grayscale(1) brightness(0.5); }
.bm-quote-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.7)); }
.bm-quote blockquote { position: relative; max-width: 1100px; text-align: center; color: #fff; margin: 0; }
.bm-quote p { font-family: "Inter", serif; font-weight: 900; font-size: clamp(36px, 6vw, 100px); line-height: 1.2; letter-spacing: -0.03em; margin: 0 0 24px; }
.bm-quote em { font-style: italic; font-weight: 400; }
.bm-quote cite { font-style: normal; font-size: 11px; letter-spacing: 0.3em; color: rgba(255,255,255,0.6); }

/* Process */
.bm-process { padding: 160px 40px; max-width: 1400px; margin: 0 auto; }
.bm-process-head { margin-bottom: 80px; }
.bm-process-list { list-style: none; margin: 0; padding: 0; }
.bm-process-row { display: grid; grid-template-columns: 80px 1fr 1.5fr 2fr; gap: 32px; padding: 32px 0; border-top: 1px solid var(--bm-line); align-items: center; }
.bm-process-row:last-child { border-bottom: 1px solid var(--bm-line); }
.bm-process-n { font-family: "Inter", serif; font-weight: 900; font-size: 32px; }
.bm-process-en { font-size: 14px; font-weight: 700; letter-spacing: 0.2em; }
.bm-process-en small { font-size: 10px; color: var(--bm-pink); font-weight: 600; }
.bm-process-jp { font-family: "Noto Sans JP", sans-serif; font-size: 18px; font-weight: 700; }
.bm-process-d { font-family: "Noto Sans JP", sans-serif; font-size: 13px; color: var(--bm-fg-soft); line-height: 1.8; }

/* Contact */
.bm-contact { padding: 160px 40px; max-width: 1400px; margin: 0 auto; }
.bm-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.bm-contact-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.bm-btn { display: inline-flex; align-items: center; padding: 16px 28px; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-decoration: none; transition: all .3s; }
.bm-btn-fill { background: var(--bm-fg); color: var(--bm-bg); }
.bm-btn-fill:hover { background: var(--bm-pink); }
.bm-btn-ghost { background: transparent; color: var(--bm-fg); border: 1px solid var(--bm-fg); }
.bm-btn-ghost:hover { background: var(--bm-fg); color: var(--bm-bg); }
.bm-contact-r dl { display: grid; grid-template-columns: 100px 1fr; gap: 16px 24px; margin: 0; font-family: "Noto Sans JP", sans-serif; }
.bm-contact-r dt { font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.2em; color: var(--bm-fg); font-weight: 700; padding-top: 4px; }
.bm-contact-r dd { margin: 0; font-size: 13px; line-height: 1.7; color: var(--bm-fg-soft); }

/* Footer */
.bm-footer { background: var(--bm-fg); color: var(--bm-bg); padding: 120px 40px 60px; text-align: center; }
.bm-footer-mega { font-family: "Inter", serif; font-weight: 900; font-size: clamp(56px, 10vw, 180px); line-height: 0.9; letter-spacing: -0.05em; margin: 0 0 16px; }
.bm-footer-tag { font-size: 12px; letter-spacing: 0.3em; opacity: 0.6; margin: 0 0 40px; }
.bm-footer-disclaimer { font-family: "Noto Sans JP", sans-serif; font-size: 12px; line-height: 1.7; background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4); padding: 16px 22px; margin: 0 auto 24px; max-width: 720px; }
.bm-footer-disclaimer strong { color: var(--bm-pink); }
.bm-footer-cr { font-size: 11px; opacity: 0.5; margin: 0; }

.bm-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 60; background: var(--bm-pink); color: #fff; font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px; display: flex; align-items: center; gap: 8px; box-shadow: 0 12px 32px rgba(236,72,153,0.4); }
.bm-floating-warning-icon { background: #fff; color: var(--bm-pink); width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; }

@media (max-width: 900px) {
  .bm-header { padding: 14px 16px; }
  .bm-nav { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--bm-bg); padding: 0; max-height: 0; overflow: hidden; transition: max-height .4s, padding .4s; border-bottom: 1px solid var(--bm-line); }
  .bm-nav.is-open { max-height: 400px; padding: 16px 0; }
  .bm-nav a { padding: 14px 24px; }
  .bm-burger { display: flex; }
  .bm-cta-btn { display: none; }
  .bm-hero { min-height: 100vh; }
  .bm-hero-foot { padding: 0 20px; bottom: 40px; flex-direction: column; gap: 8px; align-items: flex-start; }
  .bm-hero-scroll { left: 20px; }
  .bm-stats { grid-template-columns: repeat(2, 1fr); }
  .bm-stat { padding: 32px 20px; border-bottom: 1px solid var(--bm-line); }
  .bm-stat:nth-child(odd) { border-right: 1px solid var(--bm-line); }
  .bm-philosophy { grid-template-columns: 1fr; gap: 60px; padding: 80px 20px; }
  .bm-works { padding: 40px 20px 80px; }
  .bm-works-grid { grid-template-columns: 1fr; gap: 40px; }
  .bm-work-big { grid-column: span 1; }
  .bm-quote { height: auto; min-height: 400px; padding: 80px 20px; }
  .bm-process { padding: 80px 20px; }
  .bm-process-row { grid-template-columns: 60px 1fr; gap: 8px 16px; }
  .bm-process-en, .bm-process-jp { grid-column: 2; }
  .bm-process-d { grid-column: 1 / -1; padding-top: 8px; }
  .bm-contact { padding: 80px 20px; }
  .bm-contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .bm-footer { padding: 80px 20px 40px; }
}
`
