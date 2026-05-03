import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS CAREERS — 採用LPテンプレート
   技術: 縦書きキャッチコピー（writing-mode: vertical-rl）
        + シネマティックフルブリードヒーロー
        + 社員ピックアップカード（番号付き）
        + 大型タイポ + 赤アクセント
   テイスト: インパクト系・ベンチャー採用
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=85',
  m1: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=900&q=85',
  m2: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=900&q=85',
  m3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85',
  c1: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=85',
  c2: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85',
  c3: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85',
  office: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
}

export default function RecruitPremiumDemo() {
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
    document.querySelectorAll('.rc-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="rc-root">
      <style>{cssText}</style>

      <div className="rc-warning">
        <div className="rc-warning-row">
          <span className="rc-warning-pill">SAMPLE</span>
          <span className="rc-warning-text">
            ⚠️ <b>POLARIS CAREERS</b> は<b className="rc-warning-emph">実在しない仮想採用LP</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="rc-warning-back">← 戻る</a>
        </div>
        <div className="rc-warning-strip">
          ⚠️ 注意：会社名・社員名・募集要項・給与・社員インタビューなどはすべて<u>架空</u>です。
        </div>
      </div>

      <header className="rc-header">
        <a href="#" className="rc-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <strong>POLARIS</strong>
          <span>CAREERS（架空）</span>
        </a>
        <nav className={`rc-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#message" onClick={() => setMenuOpen(false)}>MESSAGE</a>
          <a href="#people" onClick={() => setMenuOpen(false)}>PEOPLE</a>
          <a href="#culture" onClick={() => setMenuOpen(false)}>CULTURE</a>
          <a href="#position" onClick={() => setMenuOpen(false)}>POSITION</a>
          <a href="#entry" onClick={() => setMenuOpen(false)}>ENTRY</a>
        </nav>
        <a href="#entry" className="rc-cta-btn">ENTRY（仮）</a>
        <button className="rc-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      {/* Hero */}
      <section className="rc-hero">
        <div className="rc-hero-img" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
        <div className="rc-hero-overlay"/>
        <div className="rc-img-stamp">SAMPLE</div>

        <div className="rc-hero-content">
          <h1 className="rc-hero-title-vert">
            <span>本</span><span>気</span><span>を</span><span>、</span>
            <span>試</span><span>し</span><span>に</span><span>。</span>
          </h1>
          <div className="rc-hero-side">
            <p className="rc-hero-en">— DEDICATE YOURSELF —</p>
            <p className="rc-hero-sub">
              何かを変えたい人。本気で挑戦したい人。<br/>
              POLARIS は、そんな仲間を待っています（架空）。<br/>
              <span className="rc-fake">※ このページは仮想採用LPのデザイン見本です。</span>
            </p>
            <div className="rc-hero-cta">
              <a href="#entry" className="rc-btn rc-btn-fill">ENTRY（仮）→</a>
              <a href="#message" className="rc-btn rc-btn-ghost">スクロール ↓</a>
            </div>
          </div>
        </div>

        <div className="rc-hero-mega" aria-hidden>
          <span>2026 / NEW GRADUATE & MID-CAREER（架空）</span>
        </div>

        <div className="rc-hero-badge">※ これは架空のデザイン見本です</div>
      </section>

      {/* Message */}
      <section id="message" className="rc-message">
        <div className="rc-message-content rc-reveal">
          <span className="rc-eyebrow">— MESSAGE —</span>
          <h2 className="rc-h2">
            ここで、<br/>
            <em>世界を、変えよう。</em>
          </h2>
          <p>
            私たちは "本気で挑戦したい人" にだけ、ドアを開いています（架空）。<br/>
            年齢・経歴・性別、すべては関係ない。<br/>
            "やる" と決めた人にこそ、託したい仕事があります。<br/>
            <span className="rc-fake">※ 上記は架空のメッセージです。</span>
          </p>
          <p className="rc-signature">代表取締役 〇〇 〇〇（架空）</p>
        </div>
        <div className="rc-message-mega" aria-hidden>MESSAGE</div>
      </section>

      {/* People */}
      <section id="people" className="rc-people">
        <div className="rc-people-head rc-reveal">
          <span className="rc-eyebrow">— PEOPLE —</span>
          <h2 className="rc-h2">
            ここで働く、<br/>
            <em>仲間たち。</em>
          </h2>
          <p className="rc-fake-pill">※ 社員インタビューはすべて架空のサンプル表示です</p>
        </div>
        <div className="rc-people-grid">
          {[
            { num: '01', name: 'Y.K.（架空）', role: 'エンジニア / 入社2年目', img: IMG.m1, q: '"つくる" を楽しめる場所。', body: '"これ、自分で考えていいんですか？" 入社直後、戸惑いと共に与えられた裁量。それが、今の自分を作っています（架空）。' },
            { num: '02', name: 'M.S.（架空）', role: 'デザイナー / 入社4年目', img: IMG.m2, q: '"なぜ" を、突き詰める。', body: '見た目だけじゃない。本質的なユーザー価値まで踏み込めるのが、ここの面白さ（架空）。' },
            { num: '03', name: 'T.H.（架空）', role: 'ビジネス / 入社1年目', img: IMG.m3, q: '"裁量" がある、ということ。', body: '入社1年目から、新規事業のリーダーに。怖さ以上に、ワクワクが勝ちました（架空）。' },
          ].map((p) => (
            <article key={p.num} className="rc-people-card rc-reveal">
              <div className="rc-people-img" style={{ backgroundImage: `url("${p.img}")` }}>
                <span className="rc-people-num">{p.num}</span>
                <div className="rc-img-stamp">SAMPLE</div>
              </div>
              <p className="rc-people-role">{p.role}</p>
              <h3>{p.q}</h3>
              <p className="rc-people-body">{p.body}</p>
              <p className="rc-people-name">— {p.name}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Culture */}
      <section id="culture" className="rc-culture">
        <div className="rc-culture-head rc-reveal">
          <span className="rc-eyebrow rc-eyebrow-light">— CULTURE —</span>
          <h2 className="rc-h2 rc-h2-light">
            私たちが、<br/>
            <em>大切にしていること。</em>
          </h2>
          <p className="rc-fake-pill">※ カルチャー・制度はすべて架空のサンプル表示です</p>
        </div>
        <div className="rc-culture-grid">
          {[
            { num: '01', title: 'OWNERSHIP', jp: '当事者であれ', body: '誰かの仕事ではなく、自分の仕事として、最後までやりきる（架空）。' },
            { num: '02', title: 'CHALLENGE', jp: '挑戦を称えあう', body: '失敗を責めず、挑戦しないことを問題視する文化（架空）。' },
            { num: '03', title: 'SPEED', jp: '判断は、はやく', body: '完璧な90点より、走りながらの70点。スピードを最優先します（架空）。' },
            { num: '04', title: 'TEAM', jp: '個より、チーム', body: '一人の天才より、強いチーム。多様な仲間で、より遠くへ（架空）。' },
          ].map((c) => (
            <div key={c.num} className="rc-culture-card rc-reveal">
              <span className="rc-culture-num">{c.num}</span>
              <p className="rc-culture-en">{c.title}</p>
              <h3>{c.jp}<small>（架空）</small></h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
        <div className="rc-culture-img" style={{ backgroundImage: `url("${IMG.office}")` }}>
          <div className="rc-img-stamp">SAMPLE</div>
        </div>
      </section>

      {/* Position */}
      <section id="position" className="rc-position">
        <div className="rc-position-head rc-reveal">
          <span className="rc-eyebrow">— POSITIONS —</span>
          <h2 className="rc-h2">募集職種</h2>
          <p className="rc-fake-pill">※ 募集職種・給与はすべて架空のサンプル表示です</p>
        </div>
        <div className="rc-position-grid">
          {[
            { num: '01', img: IMG.c1, title: 'エンジニア（架空）', en: 'ENGINEER', body: 'フルスタック / モバイル / インフラ', salary: '年収 600万〜1,200万（架空）' },
            { num: '02', img: IMG.c2, title: 'デザイナー（架空）', en: 'DESIGNER', body: 'UI/UX・ブランディング・グラフィック', salary: '年収 550万〜1,000万（架空）' },
            { num: '03', img: IMG.c3, title: 'ビジネス（架空）', en: 'BUSINESS', body: '営業・マーケ・コーポレート', salary: '年収 500万〜900万（架空）' },
          ].map((p) => (
            <article key={p.num} className="rc-position-card rc-reveal">
              <div className="rc-position-img" style={{ backgroundImage: `url("${p.img}")` }}>
                <span className="rc-position-num">{p.num}</span>
                <div className="rc-img-stamp">SAMPLE</div>
              </div>
              <div className="rc-position-info">
                <p className="rc-position-en">{p.en}</p>
                <h3>{p.title}</h3>
                <p className="rc-position-body">{p.body}</p>
                <p className="rc-position-salary">{p.salary}</p>
                <a href="#entry" className="rc-link-arrow">詳細を見る →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Entry CTA */}
      <section id="entry" className="rc-entry">
        <div className="rc-entry-content rc-reveal">
          <span className="rc-eyebrow rc-eyebrow-accent">— ENTRY —</span>
          <h2 className="rc-entry-h">
            さあ、<br/>
            <em>動き出そう。</em>
          </h2>
          <p>
            数分のエントリーから、すべてが始まります（架空）。<br/>
            <span className="rc-fake">※ ボタンは動作しません。仮想採用LPのデザイン見本です。</span>
          </p>
          <div className="rc-entry-btns">
            <a href="#" className="rc-btn rc-btn-light">新卒エントリー（仮）</a>
            <a href="#" className="rc-btn rc-btn-light-outline">中途エントリー（仮）</a>
          </div>
        </div>
      </section>

      <footer className="rc-footer">
        <div className="rc-footer-content">
          <p className="rc-footer-logo">POLARIS CAREERS<small>（架空）</small></p>
          <p className="rc-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS CAREERS」という<u>実在しない仮想採用LP</u>のデザイン見本です。<br/>
            会社名・募集要項・給与・社員インタビューなどはすべて<u>架空</u>です。
          </p>
          <p className="rc-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="rc-floating-warning">
        <span className="rc-floating-warning-icon">!</span>
        <span>このサイトは架空の採用LPです</span>
      </div>
    </div>
  )
}

const cssText = `
.rc-root {
  --rc-bg: #0d0d0d;
  --rc-fg: #ffffff;
  --rc-fg-soft: rgba(255,255,255,0.65);
  --rc-accent: #e60039;
  --rc-line: rgba(255,255,255,0.12);
  --rc-warn-pink: #ec4899;
  background: var(--rc-bg);
  color: var(--rc-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.rc-root *, .rc-root *::before, .rc-root *::after { box-sizing: border-box; }

.rc-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--rc-warn-pink);
}
.rc-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.rc-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.rc-warning-text { flex: 1; min-width: 0; }
.rc-warning-emph { color: var(--rc-warn-pink); }
.rc-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.rc-warning-back:hover { background: var(--rc-warn-pink); color: #fff; }
.rc-warning-strip {
  background: var(--rc-warn-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

.rc-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 16px 32px;
  background: rgba(13,13,13,0.92); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--rc-line);
}
.rc-logo { display: flex; flex-direction: column; text-decoration: none; color: var(--rc-fg); }
.rc-logo strong {
  font-family: "Inter", sans-serif; font-size: 16px; font-weight: 900;
  letter-spacing: 0.2em; line-height: 1;
}
.rc-logo span { font-size: 9px; color: var(--rc-fg-soft); margin-top: 4px; letter-spacing: 0.1em; }
.rc-nav {
  display: flex; gap: 28px; margin: 0 auto;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.15em;
}
.rc-nav a {
  color: var(--rc-fg); text-decoration: none; padding: 6px 0;
  position: relative;
}
.rc-nav a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0;
  height: 2px; background: var(--rc-accent); transform: scaleX(0);
  transform-origin: left; transition: transform .3s;
}
.rc-nav a:hover::after { transform: scaleX(1); }
.rc-cta-btn {
  background: var(--rc-accent); color: #fff;
  padding: 12px 24px;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: 0.2em; text-decoration: none;
}
.rc-cta-btn:hover { background: #fff; color: var(--rc-accent); }
.rc-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.rc-burger span { width: 22px; height: 2px; background: var(--rc-fg); transition: all .3s; }
.rc-burger span.is-open:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.rc-burger span.is-open:nth-child(2) { transform: translateY(-3px) rotate(-45deg); }

.rc-hero {
  position: relative; height: 100vh; min-height: 700px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.rc-hero-img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  animation: rc-zoom 20s ease-in-out infinite alternate;
}
@keyframes rc-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
.rc-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.3) 50%, rgba(13,13,13,0.85) 100%);
}
.rc-img-stamp {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 2px; letter-spacing: 0.2em;
  z-index: 3;
}
.rc-hero-content {
  position: relative; z-index: 2;
  display: flex; gap: 48px; align-items: center;
  padding: 0 32px;
}
.rc-hero-title-vert {
  writing-mode: vertical-rl;
  font-family: "Noto Serif JP", serif;
  font-weight: 900;
  font-size: clamp(60px, 9vw, 140px); line-height: 1.05;
  margin: 0; letter-spacing: 0.05em;
  color: #fff;
}
.rc-hero-title-vert span:nth-child(4) { color: var(--rc-accent); }
.rc-hero-side { max-width: 360px; }
.rc-hero-en {
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  color: var(--rc-accent); letter-spacing: 0.3em;
  margin: 0 0 16px;
}
.rc-hero-sub {
  font-size: 14px; line-height: 2;
  color: rgba(255,255,255,0.85); margin: 0 0 28px;
}
.rc-fake { color: var(--rc-warn-pink); font-weight: 700; font-size: 11px; }
.rc-hero-cta { display: flex; flex-direction: column; gap: 12px; }

.rc-hero-mega {
  position: absolute; bottom: 32px; left: 0; right: 0;
  display: flex; gap: 32px; padding: 0 32px;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.4em; color: rgba(255,255,255,0.5);
  z-index: 2;
}
.rc-hero-mega span { padding-left: 16px; border-left: 2px solid var(--rc-accent); }

.rc-hero-badge {
  position: absolute; top: 24px; left: 24px; z-index: 5;
  background: var(--rc-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}

.rc-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 800;
  letter-spacing: 0.2em; text-decoration: none;
  cursor: pointer; transition: all .25s ease;
}
.rc-btn-fill { background: var(--rc-accent); color: #fff; }
.rc-btn-fill:hover { background: #fff; color: var(--rc-accent); }
.rc-btn-ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.4); }
.rc-btn-ghost:hover { border-color: #fff; }
.rc-btn-light { background: #fff; color: var(--rc-bg); }
.rc-btn-light:hover { background: var(--rc-accent); color: #fff; }
.rc-btn-light-outline { background: transparent; color: #fff; border: 2px solid #fff; }
.rc-btn-light-outline:hover { background: #fff; color: var(--rc-bg); }

.rc-eyebrow {
  display: inline-block;
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.3em;
  color: var(--rc-accent); font-weight: 800;
}
.rc-eyebrow-light { color: rgba(255,255,255,0.6); }
.rc-eyebrow-accent { color: var(--rc-accent); }
.rc-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(36px, 5vw, 72px); line-height: 1.25;
  margin: 16px 0 24px; letter-spacing: -0.02em; color: #fff;
}
.rc-h2 em { font-style: normal; color: var(--rc-accent); }
.rc-h2-light { color: #fff; }
.rc-fake-pill {
  display: inline-block; padding: 4px 12px;
  background: rgba(236,72,153,0.12); border: 1px solid rgba(236,72,153,0.3);
  color: var(--rc-warn-pink); border-radius: 999px;
  font-size: 11px; font-weight: 700; margin: 4px 0 0;
}

.rc-reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.rc-reveal.is-visible { opacity: 1; transform: translateY(0); }

.rc-message {
  position: relative; padding: 160px 64px;
  max-width: 1200px; margin: 0 auto;
  overflow: hidden;
}
.rc-message-content { max-width: 700px; position: relative; z-index: 2; }
.rc-message p {
  font-size: 15px; line-height: 2.1; color: rgba(255,255,255,0.85);
  margin: 0 0 24px;
}
.rc-signature {
  font-family: "Noto Serif JP", serif; font-size: 14px;
  color: var(--rc-fg-soft); font-style: italic;
}
.rc-message-mega {
  position: absolute; bottom: 0; right: 0;
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 30vw; line-height: 0.8;
  color: rgba(255,255,255,0.04);
  letter-spacing: -0.05em; pointer-events: none;
  white-space: nowrap;
}

.rc-people {
  padding: 120px 64px;
  background: #1a1a1a;
}
.rc-people-head { text-align: center; margin-bottom: 60px; }
.rc-people-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
  max-width: 1300px; margin: 0 auto;
}
.rc-people-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--rc-line);
  padding: 32px;
}
.rc-people-img {
  position: relative; aspect-ratio: 4/5;
  background-size: cover; background-position: center;
  margin-bottom: 24px;
}
.rc-people-num {
  position: absolute; top: 16px; left: 16px;
  font-family: "Inter", sans-serif; font-size: 16px; font-weight: 900;
  background: var(--rc-accent); color: #fff;
  padding: 6px 14px; letter-spacing: 0.1em;
}
.rc-people-role {
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.15em; color: var(--rc-accent);
  font-weight: 700; margin: 0 0 8px;
}
.rc-people-card h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 900;
  margin: 0 0 16px; line-height: 1.4;
}
.rc-people-body {
  font-size: 13px; line-height: 1.9; color: rgba(255,255,255,0.7); margin: 0 0 16px;
}
.rc-people-name {
  font-size: 12px; color: var(--rc-fg-soft); margin: 0;
  font-family: "Inter", sans-serif; letter-spacing: 0.1em;
}

.rc-culture {
  padding: 120px 64px;
  background: var(--rc-bg);
  position: relative;
}
.rc-culture-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.rc-culture-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  max-width: 1300px; margin: 0 auto 80px;
}
.rc-culture-card {
  background: rgba(255,255,255,0.03);
  border-top: 3px solid var(--rc-accent);
  padding: 32px;
}
.rc-culture-num {
  display: inline-block;
  font-family: "Inter", sans-serif; font-weight: 900;
  font-size: 40px; color: var(--rc-accent);
  letter-spacing: -0.05em; margin-bottom: 12px; line-height: 1;
}
.rc-culture-en {
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.2em; color: rgba(255,255,255,0.6);
  font-weight: 700; margin: 0 0 8px;
}
.rc-culture-card h3 {
  font-family: "Noto Serif JP", serif; font-size: 20px; font-weight: 900;
  margin: 0 0 12px;
}
.rc-culture-card h3 small { font-size: 11px; color: var(--rc-warn-pink); font-weight: 600; }
.rc-culture-card p {
  font-size: 12px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;
}
.rc-culture-img {
  position: relative; height: 400px;
  background-size: cover; background-position: center;
  max-width: 1300px; margin: 0 auto;
  filter: grayscale(0.3);
}

.rc-position {
  padding: 120px 64px;
  background: #1a1a1a;
}
.rc-position-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.rc-position-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  max-width: 1300px; margin: 0 auto;
}
.rc-position-card {
  background: var(--rc-bg);
  border: 1px solid var(--rc-line);
  display: flex; flex-direction: column;
}
.rc-position-img {
  position: relative; aspect-ratio: 16/10;
  background-size: cover; background-position: center;
  border-bottom: 3px solid var(--rc-accent);
}
.rc-position-num {
  position: absolute; bottom: -22px; left: 24px;
  font-family: "Inter", sans-serif; font-size: 14px; font-weight: 900;
  background: var(--rc-accent); color: #fff;
  padding: 8px 14px; letter-spacing: 0.1em;
}
.rc-position-info { padding: 32px 24px 24px; }
.rc-position-en {
  font-family: "Inter", sans-serif; font-size: 11px;
  letter-spacing: 0.2em; color: var(--rc-accent);
  font-weight: 800; margin: 0 0 8px;
}
.rc-position-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 900;
  margin: 0 0 12px;
}
.rc-position-body { font-size: 13px; color: var(--rc-fg-soft); margin: 0 0 12px; line-height: 1.7; }
.rc-position-salary {
  font-family: "Inter", sans-serif; font-size: 14px; font-weight: 700;
  color: #fff; margin: 0 0 16px;
  padding: 12px 0; border-top: 1px solid var(--rc-line); border-bottom: 1px solid var(--rc-line);
}
.rc-link-arrow {
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  color: var(--rc-accent); text-decoration: none; letter-spacing: 0.1em;
}
.rc-link-arrow:hover { color: #fff; }

.rc-entry {
  padding: 140px 32px; text-align: center;
  background: var(--rc-accent); color: #fff;
}
.rc-entry-content { max-width: 800px; margin: 0 auto; }
.rc-entry-h {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(48px, 8vw, 100px); line-height: 1.15;
  margin: 24px 0 24px;
}
.rc-entry-h em { font-style: normal; color: #fff; -webkit-text-stroke: 2px var(--rc-bg); }
.rc-entry p { font-size: 14px; line-height: 1.9; margin: 0 0 36px; opacity: 0.95; }
.rc-entry-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.rc-footer { padding: 60px 32px 40px; background: #050505; color: #fff; text-align: center; }
.rc-footer-content { max-width: 800px; margin: 0 auto; }
.rc-footer-logo {
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 900;
  letter-spacing: 0.2em; margin: 0 0 24px;
}
.rc-footer-logo small { font-size: 10px; color: rgba(255,255,255,0.5); margin-left: 8px; font-weight: 400; }
.rc-footer-disclaimer {
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.12); border: 1px solid rgba(236,72,153,0.3);
  padding: 14px 20px; border-radius: 4px; margin: 0 0 20px;
}
.rc-footer-disclaimer strong { color: var(--rc-warn-pink); }
.rc-footer-cr { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }

.rc-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--rc-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.rc-floating-warning-icon {
  background: #fff; color: var(--rc-warn-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 1024px) {
  .rc-people-grid { grid-template-columns: 1fr; }
  .rc-culture-grid { grid-template-columns: repeat(2, 1fr); }
  .rc-position-grid { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .rc-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .rc-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--rc-bg);
    padding: 0; max-height: 0; overflow: hidden; margin: 0;
    transition: max-height .4s, padding .4s;
  }
  .rc-nav.is-open { max-height: 500px; padding: 16px 0; }
  .rc-nav a { padding: 14px 24px; }
  .rc-burger { display: flex; }
  .rc-cta-btn { display: none; }
  .rc-hero-content { flex-direction: column; gap: 32px; padding: 0 24px; }
  .rc-hero-title-vert { writing-mode: horizontal-tb; font-size: clamp(40px, 12vw, 80px); }
  .rc-message { padding: 80px 24px; }
  .rc-people, .rc-culture, .rc-position { padding: 80px 24px; }
  .rc-culture-img { height: 240px; }
  .rc-entry { padding: 80px 24px; }
  .rc-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .rc-warning-row { flex-wrap: wrap; }
}
`
