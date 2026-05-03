import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS FES — イベントLPテンプレート
   技術: ネオングラデ + 日付カウントダウン風タイポ
        + ラインナップグリッド + チケットセクション
   テイスト: 音楽フェス・ナイトイベント
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=85',
  s1: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=85',
  s2: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85',
  s3: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1400&q=85',
  a1: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=85',
  a2: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&w=600&q=85',
  a3: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=85',
  a4: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=85',
  a5: 'https://images.unsplash.com/photo-1571266028243-d220bc561ae9?auto=format&fit=crop&w=600&q=85',
  a6: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85',
}

export default function EventPremiumDemo() {
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
    document.querySelectorAll('.ev-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="ev-root">
      <style>{cssText}</style>

      <div className="ev-warning">
        <div className="ev-warning-row">
          <span className="ev-warning-pill">SAMPLE</span>
          <span className="ev-warning-text">
            ⚠️ <b>POLARIS FES</b> は<b className="ev-warning-emph">実在しない仮想イベント</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="ev-warning-back">← 戻る</a>
        </div>
        <div className="ev-warning-strip">
          ⚠️ 注意：イベント名・日程・出演アーティスト・チケット価格などはすべて<u>架空</u>です。
        </div>
      </div>

      <header className="ev-header">
        <a href="#" className="ev-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <strong>POLARIS</strong>
          <span>FES 2026（架空）</span>
        </a>
        <nav className={`ev-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#lineup" onClick={() => setMenuOpen(false)}>LINEUP</a>
          <a href="#stages" onClick={() => setMenuOpen(false)}>STAGES</a>
          <a href="#venue" onClick={() => setMenuOpen(false)}>VENUE</a>
          <a href="#ticket" onClick={() => setMenuOpen(false)}>TICKET</a>
        </nav>
        <a href="#ticket" className="ev-cta-btn">TICKET（仮）</a>
        <button className="ev-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      {/* Hero */}
      <section className="ev-hero">
        <div className="ev-hero-img" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
        <div className="ev-hero-overlay"/>
        <div className="ev-img-stamp">SAMPLE</div>

        {/* Glitch megatype */}
        <div className="ev-hero-content">
          <div className="ev-hero-eyebrow">— ELECTRIC NIGHT FESTIVAL（架空） —</div>
          <h1 className="ev-hero-title">
            <span className="ev-glow">POLARIS</span>
            <span className="ev-stroke">FES</span>
          </h1>
          <div className="ev-hero-date">
            <span>20</span><span className="ev-date-accent">26</span>
            <small>.〇〇.〇〇 SAT（架空）</small>
          </div>
          <p className="ev-hero-desc">
            海と空、最高の音楽が交差する1日。<br/>
            その夜、世界が踊り出す（架空）。<br/>
            <span className="ev-fake">※ このページは仮想イベントのデザイン見本です。</span>
          </p>
          <div className="ev-hero-cta">
            <a href="#ticket" className="ev-btn ev-btn-fill">TICKET（仮）→</a>
            <a href="#lineup" className="ev-btn ev-btn-ghost">LINEUP ↓</a>
          </div>
        </div>

        <div className="ev-hero-marquee">
          <div className="ev-marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>POLARIS FES 2026 ★ NEVER STOP DANCING ★ 〇〇.〇〇.〇〇 ★ 架空 ★ </span>
            ))}
          </div>
        </div>

        <div className="ev-hero-badge">※ これは架空のデザイン見本です</div>
      </section>

      {/* About */}
      <section id="about" className="ev-about">
        <div className="ev-about-content ev-reveal">
          <span className="ev-eyebrow">— ABOUT —</span>
          <h2 className="ev-h2">
            <em>ひと夏の、</em><br/>
            特別な記憶を。
          </h2>
          <p>
            日が沈み、夜が始まる。<br/>
            海風と、星と、最高のビート（架空）。<br/>
            「POLARIS FES」は、音楽と自然が出会う、夢のような1日です。<br/>
            <span className="ev-fake">※ 実際の開催予定はありません。デザイン見本用の架空イベントです。</span>
          </p>
        </div>
        <div className="ev-about-stats">
          {[
            { num: '50+', label: 'ARTISTS' },
            { num: '3', label: 'STAGES' },
            { num: '12H', label: 'NON-STOP' },
            { num: '20K', label: 'AUDIENCE' },
          ].map((s) => (
            <div key={s.label} className="ev-stat ev-reveal">
              <span className="ev-stat-num">{s.num}</span>
              <span className="ev-stat-label">{s.label}</span>
              <small>（架空）</small>
            </div>
          ))}
        </div>
      </section>

      {/* Lineup */}
      <section id="lineup" className="ev-lineup">
        <div className="ev-lineup-head ev-reveal">
          <span className="ev-eyebrow">— LINEUP —</span>
          <h2 className="ev-h2">出演アーティスト</h2>
          <p className="ev-fake-pill">※ 出演アーティストはすべて架空のサンプル表示です</p>
        </div>
        <div className="ev-lineup-grid">
          {[
            { img: IMG.a1, name: 'NOVA STARS', tag: 'HEADLINER', color: 'pink' },
            { img: IMG.a2, name: 'NIGHT WAVE', tag: 'MAIN', color: 'cyan' },
            { img: IMG.a3, name: 'CYBER LIGHT', tag: 'MAIN', color: 'pink' },
            { img: IMG.a4, name: 'SOLAR ECHO', tag: 'MAIN', color: 'cyan' },
            { img: IMG.a5, name: 'DJ MARS', tag: 'GUEST', color: 'pink' },
            { img: IMG.a6, name: 'AURORA', tag: 'GUEST', color: 'cyan' },
          ].map((a, i) => (
            <article key={i} className={`ev-artist ev-artist-${a.color} ev-reveal`}>
              <div className="ev-artist-img" style={{ backgroundImage: `url("${a.img}")` }}>
                <div className="ev-img-stamp">SAMPLE</div>
              </div>
              <div className="ev-artist-info">
                <span className="ev-artist-tag">{a.tag}</span>
                <h3>{a.name}</h3>
                <p>架空アーティスト</p>
              </div>
            </article>
          ))}
        </div>
        <p className="ev-lineup-more">…and more（架空ラインナップ）</p>
      </section>

      {/* Stages */}
      <section id="stages" className="ev-stages">
        <div className="ev-stages-head ev-reveal">
          <span className="ev-eyebrow ev-eyebrow-cyan">— STAGES —</span>
          <h2 className="ev-h2">
            <em>3つのステージ。</em><br/>
            それぞれの夜。
          </h2>
          <p className="ev-fake-pill">※ ステージ・タイムテーブルはすべて架空のサンプル表示です</p>
        </div>
        <div className="ev-stages-list">
          {[
            { num: '01', img: IMG.s1, name: 'MAIN STAGE', jp: 'メインステージ', body: 'ヘッドライナーを含む15組がパフォーマンス。一夜限りのスペシャルセッションも（架空）。', time: '14:00 - 23:00' },
            { num: '02', img: IMG.s2, name: 'BEACH STAGE', jp: 'ビーチステージ', body: '波の音と夕焼けと音楽。チルアウトな時間を、海辺で（架空）。', time: '12:00 - 21:00' },
            { num: '03', img: IMG.s3, name: 'FOREST STAGE', jp: 'フォレストステージ', body: '森の中、深夜まで踊れる。EDM・ハウス・テクノの多彩なDJが集結（架空）。', time: '15:00 - 翌5:00' },
          ].map((s, i) => (
            <article key={s.num} className={`ev-stage ${i % 2 === 1 ? 'ev-stage-rev' : ''} ev-reveal`}>
              <div className="ev-stage-img" style={{ backgroundImage: `url("${s.img}")` }}>
                <span className="ev-stage-num">{s.num}</span>
                <div className="ev-img-stamp">SAMPLE</div>
              </div>
              <div className="ev-stage-info">
                <span className="ev-stage-en">{s.name}</span>
                <h3>{s.jp}<small>（架空）</small></h3>
                <p>{s.body}</p>
                <div className="ev-stage-time">⏰ {s.time}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Venue */}
      <section id="venue" className="ev-venue">
        <div className="ev-venue-content ev-reveal">
          <span className="ev-eyebrow">— VENUE —</span>
          <h2 className="ev-h2">会場</h2>
          <div className="ev-venue-card">
            <div className="ev-venue-info">
              <h3>POLARIS BEACH PARK<small>（架空）</small></h3>
              <ul>
                <li><span>所在地</span>千葉県〇〇市〇〇 0-0-0（架空）</li>
                <li><span>アクセス</span>〇〇駅より無料シャトルバス約20分（架空）</li>
                <li><span>収容人数</span>20,000人（架空）</li>
                <li><span>開催日</span>2026.〇〇.〇〇 SAT 12:00 OPEN（架空）</li>
              </ul>
            </div>
            <div className="ev-venue-map">
              <div className="ev-map-placeholder">
                <span>🗺️</span>
                <p>MAP（架空）</p>
                <small>※ デザイン見本のためマップは表示されません</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket */}
      <section id="ticket" className="ev-ticket">
        <div className="ev-ticket-head ev-reveal">
          <span className="ev-eyebrow ev-eyebrow-cyan">— TICKET —</span>
          <h2 className="ev-h2 ev-h2-light">
            <em>チケット情報</em>
          </h2>
          <p className="ev-fake-pill">※ チケット価格・販売情報はすべて架空のサンプル表示です</p>
        </div>
        <div className="ev-ticket-grid">
          {[
            { name: '1DAY PASS', en: 'GENERAL', price: '¥9,800', body: '通常入場チケット', color: 'pink' },
            { name: 'VIP PASS', en: 'PREMIUM', price: '¥19,800', body: '専用ラウンジ・最前エリア入場', color: 'gold', featured: true },
            { name: 'EARLY BIRD', en: 'LIMITED', price: '¥7,800', body: '〇月〇日まで限定販売', color: 'cyan' },
          ].map((t) => (
            <article key={t.name} className={`ev-ticket-card ev-ticket-${t.color} ${t.featured ? 'ev-ticket-featured' : ''} ev-reveal`}>
              {t.featured && <div className="ev-ticket-ribbon">RECOMMENDED</div>}
              <span className="ev-ticket-en">{t.en}</span>
              <h3>{t.name}</h3>
              <div className="ev-ticket-price">{t.price}<small>（架空）</small></div>
              <p>{t.body}</p>
              <a href="#" className="ev-btn ev-btn-fill ev-ticket-btn">購入する（仮）→</a>
            </article>
          ))}
        </div>
      </section>

      <footer className="ev-footer">
        <div className="ev-footer-content">
          <p className="ev-footer-logo">POLARIS FES 2026<small>（架空）</small></p>
          <p className="ev-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS FES」という<u>実在しない仮想イベント</u>のデザイン見本です。<br/>
            イベント名・日程・出演アーティスト・チケット価格などはすべて<u>架空</u>です。
          </p>
          <p className="ev-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="ev-floating-warning">
        <span className="ev-floating-warning-icon">!</span>
        <span>このサイトは架空のイベントLPです</span>
      </div>
    </div>
  )
}

const cssText = `
.ev-root {
  --ev-bg: #0f0533;
  --ev-bg-2: #1a0a4a;
  --ev-fg: #ffffff;
  --ev-fg-soft: rgba(255,255,255,0.7);
  --ev-pink: #ff2da0;
  --ev-cyan: #00e0ff;
  --ev-gold: #ffd966;
  --ev-line: rgba(255,255,255,0.15);
  --ev-warn-pink: #ec4899;
  background: var(--ev-bg);
  color: var(--ev-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.ev-root *, .ev-root *::before, .ev-root *::after { box-sizing: border-box; }

.ev-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--ev-warn-pink);
}
.ev-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.ev-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.ev-warning-text { flex: 1; min-width: 0; }
.ev-warning-emph { color: var(--ev-warn-pink); }
.ev-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.ev-warning-back:hover { background: var(--ev-warn-pink); color: #fff; }
.ev-warning-strip {
  background: var(--ev-warn-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

.ev-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 14px 32px;
  background: rgba(15,5,51,0.92); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--ev-line);
}
.ev-logo { display: flex; flex-direction: column; text-decoration: none; color: var(--ev-fg); }
.ev-logo strong {
  font-family: "Inter", sans-serif; font-size: 16px; font-weight: 900;
  letter-spacing: 0.2em; line-height: 1;
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ev-logo span { font-size: 9px; color: var(--ev-fg-soft); margin-top: 4px; letter-spacing: 0.1em; }
.ev-nav {
  display: flex; gap: 28px; margin: 0 auto;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.15em;
}
.ev-nav a {
  color: var(--ev-fg); text-decoration: none; padding: 6px 0;
  position: relative; transition: color .2s;
}
.ev-nav a:hover { color: var(--ev-pink); }
.ev-cta-btn {
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  color: #fff;
  padding: 10px 22px; border-radius: 999px;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: 0.2em; text-decoration: none;
  box-shadow: 0 0 24px rgba(255,45,160,0.3);
}
.ev-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.ev-burger span { width: 22px; height: 2px; background: var(--ev-fg); transition: all .3s; }
.ev-burger span.is-open:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.ev-burger span.is-open:nth-child(2) { transform: translateY(-3px) rotate(-45deg); }

.ev-hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background: radial-gradient(ellipse at center, var(--ev-bg-2), var(--ev-bg) 70%);
}
.ev-hero-img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  opacity: 0.5; mix-blend-mode: luminosity;
}
.ev-hero-overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 30%, rgba(255,45,160,0.25), transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(0,224,255,0.25), transparent 50%),
    linear-gradient(180deg, rgba(15,5,51,0.4), rgba(15,5,51,0.85));
}
.ev-img-stamp {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 2px; letter-spacing: 0.2em;
  z-index: 3;
}
.ev-hero-content {
  position: relative; z-index: 2;
  text-align: center; padding: 80px 32px 120px;
  max-width: 1000px;
}
.ev-hero-eyebrow {
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: 0.4em; color: var(--ev-cyan);
  margin-bottom: 20px;
}
.ev-hero-title {
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: clamp(70px, 14vw, 220px); line-height: 0.85;
  margin: 0 0 32px; letter-spacing: -0.04em;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.ev-glow {
  background: linear-gradient(180deg, var(--ev-pink) 0%, var(--ev-cyan) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(255,45,160,0.5));
}
.ev-stroke {
  -webkit-text-stroke: 2px var(--ev-cyan);
  color: transparent;
  filter: drop-shadow(0 0 16px rgba(0,224,255,0.4));
}
.ev-hero-date {
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: clamp(40px, 8vw, 90px); line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ev-fg);
  margin-bottom: 24px;
}
.ev-date-accent { color: var(--ev-pink); }
.ev-hero-date small {
  display: block;
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: 700; letter-spacing: 0.3em;
  color: var(--ev-fg-soft);
  margin-top: 12px;
}
.ev-hero-desc {
  font-size: 14px; line-height: 1.9;
  color: rgba(255,255,255,0.85); margin: 0 0 32px;
}
.ev-fake { color: var(--ev-warn-pink); font-weight: 700; font-size: 11px; }
.ev-hero-cta { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.ev-hero-marquee {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  padding: 12px 0; overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.2);
}
.ev-marquee-track {
  display: flex; gap: 32px; white-space: nowrap;
  font-family: "Inter", sans-serif; font-size: 13px; font-weight: 800;
  letter-spacing: 0.2em; color: #fff;
  animation: ev-scroll 30s linear infinite;
}
.ev-marquee-track span { padding: 0 16px; }
@keyframes ev-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ev-hero-badge {
  position: absolute; top: 24px; left: 24px; z-index: 5;
  background: var(--ev-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}

.ev-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 999px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 800;
  letter-spacing: 0.2em; text-decoration: none;
  cursor: pointer; transition: all .25s ease;
}
.ev-btn-fill {
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  color: #fff;
  box-shadow: 0 8px 24px rgba(255,45,160,0.35);
}
.ev-btn-fill:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,45,160,0.5); }
.ev-btn-ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.4); }
.ev-btn-ghost:hover { border-color: var(--ev-cyan); color: var(--ev-cyan); }

.ev-eyebrow {
  display: inline-block;
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.4em;
  color: var(--ev-pink); font-weight: 800;
}
.ev-eyebrow-cyan { color: var(--ev-cyan); }
.ev-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(36px, 5vw, 64px); line-height: 1.25;
  margin: 16px 0 24px; letter-spacing: -0.02em; color: #fff;
}
.ev-h2 em {
  font-style: normal;
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ev-h2-light { color: #fff; }
.ev-fake-pill {
  display: inline-block; padding: 4px 12px;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4);
  color: var(--ev-warn-pink); border-radius: 999px;
  font-size: 11px; font-weight: 700; margin: 0;
}

.ev-reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.ev-reveal.is-visible { opacity: 1; transform: translateY(0); }

.ev-about {
  padding: 120px 64px;
  max-width: 1300px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
  align-items: center;
}
.ev-about-content p {
  font-size: 15px; line-height: 2.1; color: rgba(255,255,255,0.85);
  margin: 16px 0 0;
}
.ev-about-stats {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.ev-stat {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--ev-line);
  padding: 32px 24px; text-align: center;
  border-radius: 16px;
}
.ev-stat:nth-child(odd) { border-color: var(--ev-pink); }
.ev-stat:nth-child(even) { border-color: var(--ev-cyan); }
.ev-stat-num {
  display: block;
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 56px; line-height: 1;
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.04em;
}
.ev-stat-label {
  display: block;
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.3em; color: var(--ev-fg-soft);
  font-weight: 800; margin-top: 8px;
}
.ev-stat small { font-size: 10px; color: var(--ev-warn-pink); }

.ev-lineup {
  padding: 120px 64px;
  background: var(--ev-bg-2);
  position: relative;
}
.ev-lineup-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.ev-lineup-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  max-width: 1300px; margin: 0 auto;
}
.ev-artist {
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--ev-line);
  border-radius: 16px;
  overflow: hidden;
  transition: transform .3s, box-shadow .3s;
}
.ev-artist:hover { transform: translateY(-4px); }
.ev-artist-pink { border-color: rgba(255,45,160,0.4); }
.ev-artist-pink:hover { box-shadow: 0 16px 48px rgba(255,45,160,0.3); }
.ev-artist-cyan { border-color: rgba(0,224,255,0.4); }
.ev-artist-cyan:hover { box-shadow: 0 16px 48px rgba(0,224,255,0.3); }
.ev-artist-img {
  position: relative; aspect-ratio: 1/1;
  background-size: cover; background-position: center;
}
.ev-artist-info { padding: 24px; }
.ev-artist-tag {
  font-family: "Inter", sans-serif; font-size: 10px; letter-spacing: 0.3em;
  font-weight: 800; padding: 4px 10px; border-radius: 4px;
  display: inline-block; margin-bottom: 12px;
}
.ev-artist-pink .ev-artist-tag { background: var(--ev-pink); color: #fff; }
.ev-artist-cyan .ev-artist-tag { background: var(--ev-cyan); color: var(--ev-bg); }
.ev-artist-info h3 {
  font-family: "Inter", sans-serif; font-size: 22px; font-weight: 900;
  margin: 0 0 6px; letter-spacing: 0.05em;
}
.ev-artist-info p {
  font-size: 12px; color: var(--ev-fg-soft); margin: 0;
}
.ev-lineup-more {
  text-align: center; margin-top: 40px;
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 700;
  color: var(--ev-fg-soft); letter-spacing: 0.2em;
}

.ev-stages {
  padding: 120px 64px;
  background: var(--ev-bg);
}
.ev-stages-head { text-align: center; max-width: 700px; margin: 0 auto 80px; }
.ev-stages-list { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 80px; }
.ev-stage {
  display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;
}
.ev-stage-rev { direction: rtl; }
.ev-stage-rev > * { direction: ltr; }
.ev-stage-img {
  position: relative; aspect-ratio: 4/3;
  background-size: cover; background-position: center;
  border-radius: 16px; overflow: hidden;
  border: 2px solid var(--ev-pink);
  box-shadow: 0 16px 48px rgba(255,45,160,0.2);
}
.ev-stage-rev .ev-stage-img { border-color: var(--ev-cyan); box-shadow: 0 16px 48px rgba(0,224,255,0.2); }
.ev-stage-num {
  position: absolute; top: 20px; left: 20px;
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 900;
  background: rgba(0,0,0,0.7); color: #fff;
  padding: 8px 16px; border-radius: 4px; letter-spacing: 0.1em;
  z-index: 2;
}
.ev-stage-en {
  font-family: "Inter", sans-serif; font-size: 12px; letter-spacing: 0.3em;
  color: var(--ev-pink); font-weight: 800; display: block; margin-bottom: 8px;
}
.ev-stage-rev .ev-stage-en { color: var(--ev-cyan); }
.ev-stage-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 32px; font-weight: 900;
  margin: 0 0 16px;
}
.ev-stage-info h3 small { font-size: 14px; color: var(--ev-warn-pink); font-weight: 600; }
.ev-stage-info p {
  font-size: 14px; line-height: 1.9; color: rgba(255,255,255,0.8); margin: 0 0 16px;
}
.ev-stage-time {
  font-family: "Inter", sans-serif; font-size: 14px; font-weight: 700;
  color: var(--ev-cyan); padding: 12px 0;
  border-top: 1px solid var(--ev-line);
  display: inline-block; padding-right: 32px;
}

.ev-venue {
  padding: 120px 64px;
  background: var(--ev-bg-2);
}
.ev-venue-content { max-width: 1100px; margin: 0 auto; text-align: center; }
.ev-venue-card {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
  margin-top: 40px; text-align: left;
  background: rgba(0,0,0,0.3); padding: 40px; border-radius: 16px;
  border: 1px solid var(--ev-line);
}
.ev-venue-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 28px; font-weight: 900;
  margin: 0 0 24px;
}
.ev-venue-info h3 small { font-size: 13px; color: var(--ev-warn-pink); font-weight: 600; }
.ev-venue-info ul { list-style: none; padding: 0; margin: 0; }
.ev-venue-info li {
  display: grid; grid-template-columns: 100px 1fr; gap: 16px;
  padding: 14px 0; border-bottom: 1px solid var(--ev-line);
  font-size: 13px; color: rgba(255,255,255,0.85);
}
.ev-venue-info li:last-child { border-bottom: 0; }
.ev-venue-info li span {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: var(--ev-pink); font-weight: 800;
}
.ev-venue-map {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  min-height: 240px;
  border: 1px dashed var(--ev-line);
}
.ev-map-placeholder { text-align: center; }
.ev-map-placeholder span { font-size: 48px; }
.ev-map-placeholder p {
  font-family: "Inter", sans-serif; font-size: 14px; font-weight: 800;
  letter-spacing: 0.3em; margin: 8px 0;
}
.ev-map-placeholder small { font-size: 11px; color: var(--ev-warn-pink); }

.ev-ticket {
  padding: 120px 64px;
  background: linear-gradient(180deg, var(--ev-bg) 0%, var(--ev-bg-2) 100%);
}
.ev-ticket-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.ev-ticket-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  max-width: 1200px; margin: 0 auto;
  align-items: stretch;
}
.ev-ticket-card {
  position: relative;
  background: rgba(0,0,0,0.4);
  border: 1px solid var(--ev-line);
  border-radius: 16px;
  padding: 40px 32px; text-align: center;
  transition: transform .3s;
}
.ev-ticket-card:hover { transform: translateY(-6px); }
.ev-ticket-pink { border-color: var(--ev-pink); }
.ev-ticket-cyan { border-color: var(--ev-cyan); }
.ev-ticket-gold {
  border-color: var(--ev-gold);
  background: linear-gradient(135deg, rgba(255,217,102,0.1), rgba(0,0,0,0.5));
}
.ev-ticket-featured { transform: scale(1.05); box-shadow: 0 24px 64px rgba(255,217,102,0.2); }
.ev-ticket-featured:hover { transform: scale(1.05) translateY(-6px); }
.ev-ticket-ribbon {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: var(--ev-gold); color: var(--ev-bg);
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 900;
  letter-spacing: 0.2em; padding: 6px 16px; border-radius: 999px;
  white-space: nowrap;
}
.ev-ticket-en {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.3em;
  font-weight: 800; color: var(--ev-fg-soft);
}
.ev-ticket-card h3 {
  font-family: "Inter", sans-serif; font-size: 28px; font-weight: 900;
  margin: 8px 0 16px; letter-spacing: 0.05em;
}
.ev-ticket-price {
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 56px; line-height: 1; letter-spacing: -0.04em;
  margin-bottom: 12px;
}
.ev-ticket-pink .ev-ticket-price { color: var(--ev-pink); }
.ev-ticket-cyan .ev-ticket-price { color: var(--ev-cyan); }
.ev-ticket-gold .ev-ticket-price { color: var(--ev-gold); }
.ev-ticket-price small { font-size: 11px; color: var(--ev-warn-pink); font-weight: 600; }
.ev-ticket-card p {
  font-size: 13px; color: var(--ev-fg-soft); margin: 0 0 24px; line-height: 1.7;
}
.ev-ticket-btn { width: 100%; justify-content: center; padding: 14px 20px; }

.ev-footer { padding: 60px 32px 40px; background: #050315; color: #fff; text-align: center; }
.ev-footer-content { max-width: 800px; margin: 0 auto; }
.ev-footer-logo {
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 900;
  letter-spacing: 0.2em; margin: 0 0 24px;
  background: linear-gradient(90deg, var(--ev-pink), var(--ev-cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ev-footer-logo small { font-size: 10px; color: rgba(255,255,255,0.5); margin-left: 8px; font-weight: 400; -webkit-text-fill-color: rgba(255,255,255,0.5); }
.ev-footer-disclaimer {
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.12); border: 1px solid rgba(236,72,153,0.3);
  padding: 14px 20px; border-radius: 4px; margin: 0 0 20px;
}
.ev-footer-disclaimer strong { color: var(--ev-warn-pink); }
.ev-footer-cr { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }

.ev-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--ev-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.ev-floating-warning-icon {
  background: #fff; color: var(--ev-warn-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 1024px) {
  .ev-lineup-grid { grid-template-columns: repeat(2, 1fr); }
  .ev-ticket-grid { grid-template-columns: 1fr; max-width: 500px; }
  .ev-ticket-featured { transform: none; }
  .ev-ticket-featured:hover { transform: translateY(-6px); }
  .ev-about { grid-template-columns: 1fr; gap: 40px; padding: 80px 24px; }
  .ev-stage { grid-template-columns: 1fr; gap: 24px; }
  .ev-stage-rev { direction: ltr; }
  .ev-venue-card { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .ev-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .ev-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--ev-bg);
    padding: 0; max-height: 0; overflow: hidden; margin: 0;
    transition: max-height .4s, padding .4s;
  }
  .ev-nav.is-open { max-height: 500px; padding: 16px 0; }
  .ev-nav a { padding: 14px 24px; }
  .ev-burger { display: flex; }
  .ev-cta-btn { display: none; }
  .ev-lineup-grid { grid-template-columns: 1fr; }
  .ev-lineup, .ev-stages, .ev-venue, .ev-ticket { padding: 80px 24px; }
  .ev-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .ev-warning-row { flex-wrap: wrap; }
}
`
