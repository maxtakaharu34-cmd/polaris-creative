import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS SCHOOL — 教室テンプレート
   技術: SVG モーフ＆バウンスアニメ
        + CSS keyframes 浮遊パーティクル
        + IntersectionObserver で順次出現
        + チェッカーパターン背景
   テイスト: ポップ・明るい・カラフル・親しみやすい
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85',
  class1: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=85',
  class2: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=85',
  class3: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85',
  class4: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85',
  teacher1: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=600&q=85',
  teacher2: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=600&q=85',
  teacher3: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=85',
}

export default function SchoolPremiumDemo() {
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
    document.querySelectorAll('.sc-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="sc-root">
      <style>{cssText}</style>

      {/* 警告 */}
      <div className="sc-warning">
        <div className="sc-warning-row">
          <span className="sc-warning-pill">SAMPLE</span>
          <span className="sc-warning-text">
            ⚠️ <b>POLARIS SCHOOL</b> は<b className="sc-warning-emph">実在しない仮想スクール</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="sc-warning-back">← 戻る</a>
        </div>
        <div className="sc-warning-strip">
          ⚠️ 注意：教室名・住所・電話番号・講師名・受講料・お客様の声などはすべて<u>架空</u>です。
        </div>
      </div>

      {/* Header */}
      <header className="sc-header">
        <a href="#" className="sc-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="sc-logo-mark">
            <svg viewBox="0 0 40 40" aria-hidden>
              <circle cx="20" cy="20" r="16" fill="#fbbf24"/>
              <path d="M12 16 L20 22 L28 16 L28 26 L20 30 L12 26 Z" fill="#1d1d1f"/>
            </svg>
          </span>
          <div className="sc-logo-text">
            <strong>POLARIS SCHOOL</strong>
            <span>ポラリススクール（架空）</span>
          </div>
        </a>
        <nav className={`sc-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>about</a>
          <a href="#course" onClick={() => setMenuOpen(false)}>course</a>
          <a href="#teacher" onClick={() => setMenuOpen(false)}>teacher</a>
          <a href="#voice" onClick={() => setMenuOpen(false)}>voice</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>contact</a>
        </nav>
        <button className="sc-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="sc-cta-btn">体験予約（仮）</a>
      </header>

      {/* Hero */}
      <section className="sc-hero">
        <div className="sc-hero-checker"/>
        <div className="sc-hero-particles" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`sc-particle sc-p-${i % 6}`} style={{ left: `${(i * 5.5) % 100}%`, top: `${(i * 7) % 100}%`, animationDelay: `${i * 0.3}s` }}/>
          ))}
        </div>
        <div className="sc-hero-watermark">SAMPLE</div>

        <div className="sc-hero-content">
          <span className="sc-hero-eyebrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 Z"/></svg>
            こども・大人の習いごとサロン（架空）
          </span>
          <h1 className="sc-hero-title">
            <span className="sc-bounce">す</span>
            <span className="sc-bounce">き</span>
            <span className="sc-bounce">を</span>
            <span className="sc-bounce">、</span>
            <br/>
            <span className="sc-bounce sc-color-1">き</span>
            <span className="sc-bounce sc-color-2">ら</span>
            <span className="sc-bounce sc-color-3">い</span>
            <span className="sc-bounce sc-color-4">に</span>
            <span className="sc-bounce">。</span>
          </h1>
          <p className="sc-hero-sub">
            ※架空スクール｜英語・プログラミング・ピアノ・絵画・書道<br/>
            <u>3歳から大人まで</u>。学ぶことが、もっと楽しくなる場所。
          </p>
          <div className="sc-hero-cta">
            <a href="#contact" className="sc-btn sc-btn-fill">無料体験申込（仮）</a>
            <a href="#course" className="sc-btn sc-btn-ghost">コース一覧 →</a>
          </div>

          <div className="sc-hero-tags">
            <span>#英語</span>
            <span>#プログラミング</span>
            <span>#ピアノ</span>
            <span>#絵画</span>
            <span>#書道</span>
          </div>
        </div>

        <div className="sc-hero-img-wrap">
          <div className="sc-hero-img" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
          <div className="sc-hero-img-stamp">SAMPLE</div>
          <svg className="sc-hero-blob" viewBox="0 0 200 200" aria-hidden>
            <path d="M44.7,-67.3C58.8,-58.2,72.6,-47.3,77.9,-33.4C83.3,-19.4,80.2,-2.4,75.1,12.7C69.9,27.7,62.7,40.8,52.1,51.4C41.6,62.1,27.7,70.3,12.6,72.1C-2.4,73.9,-18.7,69.3,-32.5,61.4C-46.3,53.4,-57.5,42.1,-65.8,28.5C-74.1,14.8,-79.4,-1.2,-77.5,-16.8C-75.5,-32.3,-66.4,-47.3,-53.4,-57.2C-40.4,-67.1,-23.6,-71.9,-7.4,-66C8.7,-60,30.6,-76.3,44.7,-67.3Z" transform="translate(100 100)" fill="#fbbf24"/>
          </svg>
        </div>

        <div className="sc-hero-badge">※ これは架空のデザイン見本です</div>
      </section>

      {/* About */}
      <section id="about" className="sc-about">
        <div className="sc-about-grid">
          <div className="sc-about-text sc-reveal">
            <span className="sc-eyebrow">— About us —</span>
            <h2 className="sc-h2">
              "学ぶ" を、<br/>
              <em>もっと、もっと、たのしく。</em>
            </h2>
            <p className="sc-about-body">
              POLARIS SCHOOL は、3歳のお子様から大人まで、<br/>
              <u>「すきになる」</u>ことを大切にする習いごとサロンです。<br/>
              丁寧な少人数制レッスン、明るく開放的な教室、<br/>
              そして"先生"と"生徒"を超えた、温かなコミュニティ。<br/>
              <span className="sc-fake">※ このページは仮想スクールのデザイン見本です。</span>
            </p>
            <div className="sc-about-features">
              <div className="sc-about-feat">
                <span className="sc-feat-emoji" aria-hidden>★</span>
                <h3>少人数制（架空）</h3>
                <p>1クラス最大6名で、一人ひとりに目が届きます。</p>
              </div>
              <div className="sc-about-feat">
                <span className="sc-feat-emoji" aria-hidden>♪</span>
                <h3>振替自由（架空）</h3>
                <p>お休みも翌月までなら自由に振替OK。</p>
              </div>
              <div className="sc-about-feat">
                <span className="sc-feat-emoji" aria-hidden>♥</span>
                <h3>家族割引（架空）</h3>
                <p>ご兄弟・親子で受講なら受講料20%OFF。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course */}
      <section id="course" className="sc-course">
        <div className="sc-course-head sc-reveal">
          <span className="sc-eyebrow">— Course —</span>
          <h2 className="sc-h-mega">COURSE</h2>
          <p className="sc-fake-pill">※ コース・受講料はすべて架空のサンプル表示です</p>
        </div>
        <div className="sc-course-grid">
          {[
            { tag: 'KIDS', emoji: 'A', title: '英語コース', en: 'English', img: IMG.class1, color: '#fbbf24', age: '3歳〜', price: '月¥8,800〜（架空）' },
            { tag: 'KIDS', emoji: '</>', title: 'プログラミング', en: 'Programming', img: IMG.class2, color: '#34d399', age: '小学生〜', price: '月¥11,000〜（架空）' },
            { tag: 'ALL', emoji: '♪', title: 'ピアノコース', en: 'Piano', img: IMG.class3, color: '#f472b6', age: '4歳〜大人', price: '月¥9,900〜（架空）' },
            { tag: 'KIDS', emoji: '✦', title: '絵画コース', en: 'Art', img: IMG.class4, color: '#60a5fa', age: '4歳〜', price: '月¥7,700〜（架空）' },
          ].map((c, i) => (
            <article key={i} className="sc-course-card sc-reveal" style={{ '--card-color': c.color } as React.CSSProperties}>
              <div className="sc-course-card-img" style={{ backgroundImage: `url("${c.img}")` }}>
                <span className="sc-course-card-tag">{c.tag}</span>
                <span className="sc-course-card-emoji">{c.emoji}</span>
                <span className="sc-course-card-stamp">SAMPLE</span>
              </div>
              <div className="sc-course-card-info">
                <p className="sc-course-card-en">{c.en}</p>
                <h3>{c.title}<small>（架空）</small></h3>
                <div className="sc-course-card-meta">
                  <span>対象 <strong>{c.age}</strong></span>
                  <span>{c.price}</span>
                </div>
                <a href="#" className="sc-course-card-btn">体験を予約する（仮）→</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Teacher */}
      <section id="teacher" className="sc-teacher">
        <div className="sc-teacher-head sc-reveal">
          <span className="sc-eyebrow">— Teacher —</span>
          <h2 className="sc-h2">講師紹介</h2>
          <p className="sc-fake-pill">※ 講師情報はすべて架空のサンプル表示です</p>
        </div>
        <div className="sc-teacher-grid">
          {[
            { name: 'Hannah（架空）', role: '英語講師', img: IMG.teacher1, color: '#fbbf24', bio: 'カナダ出身。日本での指導歴10年。子どもの心をつかむ授業が得意（架空）。' },
            { name: '田中 先生（架空）', role: 'プログラミング講師', img: IMG.teacher2, color: '#34d399', bio: '元IT企業エンジニア。Scratch・Pythonを楽しく教えます（架空）。' },
            { name: '佐藤 先生（架空）', role: 'ピアノ講師', img: IMG.teacher3, color: '#f472b6', bio: '音大卒。コンクール入賞経験多数。基礎から丁寧に（架空）。' },
          ].map((t) => (
            <div key={t.name} className="sc-teacher-card sc-reveal" style={{ '--t-color': t.color } as React.CSSProperties}>
              <div className="sc-teacher-img" style={{ backgroundImage: `url("${t.img}")` }}>
                <div className="sc-img-stamp">SAMPLE</div>
              </div>
              <p className="sc-teacher-role">{t.role}</p>
              <h3 className="sc-teacher-name">{t.name}</h3>
              <p className="sc-teacher-bio">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voice */}
      <section id="voice" className="sc-voice">
        <div className="sc-voice-head sc-reveal">
          <span className="sc-eyebrow">— Voice —</span>
          <h2 className="sc-h2">受講生の声</h2>
          <p className="sc-fake-pill">※ お客様の声はすべて架空のサンプル表示です</p>
        </div>
        <div className="sc-voice-grid">
          {[
            { name: '小1のお子さんの保護者様（架空）', course: '英語コース', text: '楽しい先生のおかげで、毎週レッスンを楽しみにしています。すっかり英語が大好きに。' },
            { name: '小4 男の子の保護者様（架空）', course: 'プログラミングコース', text: '自分でゲームを作れるようになって、本人もびっくり！自信がついたようです。' },
            { name: '40代女性 K.S.様（架空）', course: 'ピアノコース', text: '大人になってからの趣味として始めましたが、先生が優しくて、毎週通うのが楽しみです。' },
          ].map((v, i) => (
            <article key={i} className="sc-voice-card sc-reveal">
              <span className="sc-voice-quote">"</span>
              <p>{v.text}</p>
              <footer>
                <strong>{v.name}</strong>
                <span>{v.course}（架空）</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="sc-cta">
        <div className="sc-cta-bg-shapes" aria-hidden>
          <span/><span/><span/><span/>
        </div>
        <div className="sc-cta-content sc-reveal">
          <h2 className="sc-cta-h">
            まずは、<br/>
            <em>無料体験から。</em>
          </h2>
          <p className="sc-cta-sub">
            45分のレッスンを実際に受けていただけます（架空）。<br/>
            <span className="sc-fake">※ ボタンは動作しません。仮想スクールのデザイン見本です。</span>
          </p>
          <div className="sc-cta-btns">
            <a href="#" className="sc-btn sc-btn-fill sc-btn-large">無料体験を予約する（仮）</a>
            <a href="#" className="sc-btn sc-btn-ghost sc-btn-large">資料請求（仮）</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sc-footer">
        <div className="sc-footer-content">
          <div className="sc-footer-logo">
            <span className="sc-logo-mark">
              <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden>
                <circle cx="20" cy="20" r="16" fill="#fbbf24"/>
                <path d="M12 16 L20 22 L28 16 L28 26 L20 30 L12 26 Z" fill="#1d1d1f"/>
              </svg>
            </span>
            <strong>POLARIS SCHOOL</strong>
          </div>
          <p className="sc-footer-addr">
            〒000-0000 東京都〇〇区〇〇 0-0-0（実在しません）<br/>
            TEL: 03-0000-0000（架空）<br/>
            開校時間: 火〜土 10:00 - 21:00（架空）
          </p>
          <p className="sc-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS SCHOOL」という<u>実在しない仮想スクール</u>のデザイン見本です。<br/>
            教室名・講師名・住所・電話番号・受講料・お客様の声などはすべて<u>架空</u>です。
          </p>
          <p className="sc-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="sc-floating-warning">
        <span className="sc-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想スクールです</span>
      </div>
    </div>
  )
}

const cssText = `
.sc-root {
  --sc-bg: #fff8e8;
  --sc-fg: #1d1d1f;
  --sc-fg-soft: rgba(29,29,31,0.7);
  --sc-yellow: #fbbf24;
  --sc-green: #34d399;
  --sc-pink: #f472b6;
  --sc-blue: #60a5fa;
  --sc-warn-pink: #ec4899;
  background: var(--sc-bg);
  color: var(--sc-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.sc-root *, .sc-root *::before, .sc-root *::after { box-sizing: border-box; }

/* Warning */
.sc-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--sc-warn-pink);
}
.sc-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.sc-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.sc-warning-text { flex: 1; min-width: 0; }
.sc-warning-emph { color: var(--sc-warn-pink); }
.sc-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.sc-warning-back:hover { background: var(--sc-warn-pink); color: #fff; }
.sc-warning-strip {
  background: var(--sc-warn-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Header */
.sc-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 16px 32px;
  background: rgba(255,248,232,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 3px dashed var(--sc-yellow);
}
.sc-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--sc-fg); }
.sc-logo-mark { display: inline-flex; }
.sc-logo-mark svg { width: 36px; height: 36px; }
.sc-logo-text strong {
  display: block; font-family: "Inter", sans-serif; font-size: 14px; font-weight: 900;
  letter-spacing: 0.05em; line-height: 1.2;
}
.sc-logo-text span { display: block; font-size: 10px; color: var(--sc-fg-soft); margin-top: 2px; }
.sc-nav {
  display: flex; gap: 24px; margin-left: auto;
  font-family: "Inter", sans-serif; font-size: 13px; font-weight: 700;
  letter-spacing: 0.05em;
}
.sc-nav a {
  color: var(--sc-fg); text-decoration: none; padding: 8px 12px;
  border-radius: 999px; transition: all .3s;
}
.sc-nav a:hover { background: var(--sc-yellow); transform: rotate(-2deg); }

.sc-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.sc-burger span {
  width: 22px; height: 3px; background: var(--sc-fg); transition: all .3s; border-radius: 2px;
}
.sc-burger span.is-open:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.sc-burger span.is-open:nth-child(2) { transform: translateY(-4px) rotate(-45deg); }

.sc-cta-btn {
  background: var(--sc-fg); color: #fff;
  padding: 12px 22px; border-radius: 999px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
  text-decoration: none; transition: all .3s;
  border: 3px solid var(--sc-fg);
}
.sc-cta-btn:hover {
  background: var(--sc-yellow); color: var(--sc-fg);
  transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--sc-fg);
}

/* Hero */
.sc-hero {
  position: relative; padding: 60px 64px 100px; min-height: 90vh;
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; align-items: center;
  overflow: hidden;
}
.sc-hero-checker {
  position: absolute; inset: 0; opacity: 0.4; pointer-events: none;
  background-image:
    linear-gradient(45deg, rgba(251,191,36,0.15) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(251,191,36,0.15) 25%, transparent 25%);
  background-size: 32px 32px;
}
.sc-hero-particles { position: absolute; inset: 0; pointer-events: none; }
.sc-particle {
  position: absolute; width: 12px; height: 12px; border-radius: 50%;
  animation: sc-float 6s ease-in-out infinite;
}
.sc-p-0 { background: var(--sc-yellow); }
.sc-p-1 { background: var(--sc-green); border-radius: 4px; transform: rotate(45deg); }
.sc-p-2 { background: var(--sc-pink); }
.sc-p-3 { background: var(--sc-blue); border-radius: 4px; }
.sc-p-4 { background: var(--sc-yellow); width: 8px; height: 8px; }
.sc-p-5 { background: var(--sc-green); width: 16px; height: 16px; border-radius: 50%; }
@keyframes sc-float {
  0%, 100% { transform: translate(0,0) rotate(0); }
  50% { transform: translate(20px, -30px) rotate(15deg); }
}

.sc-hero-watermark {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 22vw;
  color: rgba(251,191,36,0.1); letter-spacing: 0.05em;
  white-space: nowrap; pointer-events: none; z-index: 0;
}

.sc-hero-content { position: relative; z-index: 2; }
.sc-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--sc-yellow); color: var(--sc-fg);
  padding: 8px 16px; border-radius: 999px;
  font-size: 12px; font-weight: 700; margin-bottom: 24px;
  border: 3px solid var(--sc-fg);
}

.sc-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(44px, 7vw, 110px); line-height: 1.05;
  margin: 0 0 28px; letter-spacing: -0.04em;
}
.sc-bounce {
  display: inline-block;
  animation: sc-bounce 2.4s cubic-bezier(.5,0,.5,1) infinite;
}
.sc-bounce:nth-child(1) { animation-delay: 0s; }
.sc-bounce:nth-child(2) { animation-delay: .1s; }
.sc-bounce:nth-child(3) { animation-delay: .2s; }
.sc-bounce:nth-child(4) { animation-delay: .3s; }
.sc-bounce:nth-child(5) { animation-delay: .4s; }
.sc-bounce:nth-child(6) { animation-delay: .5s; }
.sc-bounce:nth-child(7) { animation-delay: .6s; }
.sc-bounce:nth-child(8) { animation-delay: .7s; }
.sc-bounce:nth-child(9) { animation-delay: .8s; }
.sc-color-1 { color: var(--sc-yellow); -webkit-text-stroke: 2px var(--sc-fg); }
.sc-color-2 { color: var(--sc-green); -webkit-text-stroke: 2px var(--sc-fg); }
.sc-color-3 { color: var(--sc-pink); -webkit-text-stroke: 2px var(--sc-fg); }
.sc-color-4 { color: var(--sc-blue); -webkit-text-stroke: 2px var(--sc-fg); }
@keyframes sc-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8%); } }

.sc-hero-sub { font-size: 14px; line-height: 1.9; color: var(--sc-fg-soft); margin: 0 0 28px; max-width: 500px; }
.sc-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.sc-hero-tags {
  display: flex; flex-wrap: wrap; gap: 8px;
  font-family: "Inter", sans-serif; font-size: 12px;
}
.sc-hero-tags span {
  background: #fff; border: 2px solid var(--sc-fg);
  padding: 6px 12px; border-radius: 999px; font-weight: 700;
}

.sc-hero-img-wrap { position: relative; aspect-ratio: 4/5; }
.sc-hero-img {
  position: absolute; inset: 0; background-size: cover; background-position: center;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  border: 4px solid var(--sc-fg);
  z-index: 2;
  animation: sc-morph 8s ease-in-out infinite;
}
@keyframes sc-morph {
  0%, 100% { border-radius: 60% 40% 50% 50% / 60% 60% 40% 40%; }
  50% { border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%; }
}
.sc-hero-img-stamp {
  position: absolute; top: 24px; right: 24px; z-index: 3;
  background: rgba(0,0,0,0.8); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 4px; letter-spacing: 0.15em;
}
.sc-hero-blob {
  position: absolute; inset: -10%; z-index: 1;
  animation: sc-spin 24s linear infinite;
}
@keyframes sc-spin { to { transform: rotate(360deg); } }

.sc-hero-badge {
  position: absolute; top: 24px; right: 24px; z-index: 4;
  background: var(--sc-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}

/* Buttons */
.sc-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 24px; border-radius: 999px;
  font-size: 13px; font-weight: 700;
  text-decoration: none; cursor: pointer; border: 3px solid var(--sc-fg);
  transition: all .25s ease;
}
.sc-btn-fill { background: var(--sc-fg); color: #fff; }
.sc-btn-fill:hover {
  background: var(--sc-yellow); color: var(--sc-fg);
  transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--sc-fg);
}
.sc-btn-ghost { background: transparent; color: var(--sc-fg); }
.sc-btn-ghost:hover {
  background: var(--sc-fg); color: #fff;
  transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--sc-yellow);
}
.sc-btn-large { padding: 18px 36px; font-size: 14px; }

/* Common */
.sc-eyebrow {
  display: inline-block;
  font-family: "Inter", sans-serif; font-weight: 800;
  font-size: 12px; letter-spacing: 0.2em; color: var(--sc-fg);
  background: var(--sc-yellow);
  padding: 4px 14px; border-radius: 999px; border: 2px solid var(--sc-fg);
}
.sc-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(36px, 5vw, 72px); line-height: 1.3;
  margin: 16px 0 24px; letter-spacing: -0.02em;
}
.sc-h2 em {
  font-style: normal; color: var(--sc-yellow);
  -webkit-text-stroke: 2px var(--sc-fg);
}
.sc-h-mega {
  font-family: "Inter", serif; font-weight: 900;
  font-size: clamp(72px, 11vw, 200px); line-height: 1;
  margin: 12px 0 24px; letter-spacing: -0.04em;
  color: var(--sc-yellow); -webkit-text-stroke: 3px var(--sc-fg);
}
.sc-fake { font-size: 11px; color: var(--sc-warn-pink); font-weight: 700; }
.sc-fake-pill {
  display: inline-block; padding: 5px 14px;
  background: rgba(236,72,153,0.1); border: 2px solid rgba(236,72,153,0.4);
  color: var(--sc-warn-pink); border-radius: 999px;
  font-size: 11px; font-weight: 700; margin: 4px 0 0;
}
.sc-img-stamp {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.8); color: #fff;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 3px; letter-spacing: 0.15em;
}

/* Reveal */
.sc-reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s cubic-bezier(.5,1.5,.5,1); }
.sc-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* About */
.sc-about { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.sc-about-grid { display: grid; grid-template-columns: 1fr; gap: 60px; }
.sc-about-text { text-align: center; max-width: 800px; margin: 0 auto; }
.sc-about-body { font-size: 14px; line-height: 2; color: var(--sc-fg-soft); margin: 24px 0 48px; }
.sc-about-features {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: left;
}
.sc-about-feat {
  background: #fff; padding: 28px;
  border-radius: 24px; border: 3px solid var(--sc-fg);
  box-shadow: 6px 6px 0 var(--sc-fg);
}
.sc-feat-emoji {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; border-radius: 50%; background: var(--sc-yellow);
  font-size: 22px; font-weight: 900; margin-bottom: 16px;
  border: 3px solid var(--sc-fg);
}
.sc-about-feat h3 {
  font-family: "Noto Serif JP", serif; font-size: 20px; font-weight: 900;
  margin: 0 0 8px;
}
.sc-about-feat p {
  font-size: 13px; line-height: 1.7; color: var(--sc-fg-soft); margin: 0;
}

/* Course */
.sc-course { padding: 140px 64px; background: #fff; }
.sc-course-head { text-align: center; max-width: 800px; margin: 0 auto 60px; }
.sc-course-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;
  max-width: 1100px; margin: 0 auto;
}
.sc-course-card {
  background: var(--sc-bg);
  border-radius: 24px; border: 3px solid var(--sc-fg);
  overflow: hidden;
  transition: transform .3s, box-shadow .3s;
}
.sc-course-card:hover {
  transform: translate(-4px,-4px) rotate(-1deg);
  box-shadow: 8px 8px 0 var(--sc-fg);
}
.sc-course-card-img {
  position: relative; aspect-ratio: 16/10;
  background-size: cover; background-position: center;
  border-bottom: 3px solid var(--sc-fg);
}
.sc-course-card-tag {
  position: absolute; top: 16px; left: 16px;
  background: var(--card-color); color: var(--sc-fg);
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 5px 12px; border-radius: 999px;
  border: 2px solid var(--sc-fg); letter-spacing: 0.1em;
}
.sc-course-card-emoji {
  position: absolute; bottom: 20px; right: 20px;
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--card-color); color: var(--sc-fg);
  display: flex; align-items: center; justify-content: center;
  font-family: "Inter", serif; font-size: 32px; font-weight: 900;
  border: 3px solid var(--sc-fg);
  box-shadow: 4px 4px 0 var(--sc-fg);
}
.sc-course-card-stamp {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.8); color: #fff;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 3px; letter-spacing: 0.15em;
}
.sc-course-card-info { padding: 28px; }
.sc-course-card-en {
  font-family: "Inter", serif; font-style: italic; font-size: 13px;
  color: var(--card-color); margin: 0 0 4px;
  text-shadow: 1px 1px 0 var(--sc-fg);
}
.sc-course-card-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 24px; font-weight: 900;
  margin: 0 0 16px;
}
.sc-course-card-info h3 small { font-size: 11px; color: var(--sc-warn-pink); font-weight: 600; }
.sc-course-card-meta {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0; border-top: 2px dashed var(--sc-fg);
  border-bottom: 2px dashed var(--sc-fg);
  font-size: 12px; margin-bottom: 16px;
}
.sc-course-card-meta strong { font-size: 16px; color: var(--card-color); }
.sc-course-card-btn {
  display: inline-block; font-size: 13px; font-weight: 700;
  color: var(--sc-fg); text-decoration: none;
}
.sc-course-card-btn:hover { color: var(--card-color); }

/* Teacher */
.sc-teacher { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.sc-teacher-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.sc-teacher-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.sc-teacher-card { text-align: center; }
.sc-teacher-img {
  position: relative; aspect-ratio: 1; overflow: hidden;
  background-size: cover; background-position: center;
  border-radius: 50%; border: 4px solid var(--sc-fg);
  margin: 0 auto 16px; max-width: 200px;
  box-shadow: 6px 6px 0 var(--t-color);
}
.sc-teacher-role {
  display: inline-block;
  font-family: "Inter", sans-serif; font-size: 11px;
  font-weight: 800; letter-spacing: 0.15em;
  background: var(--t-color); color: var(--sc-fg);
  padding: 4px 12px; border-radius: 999px;
  border: 2px solid var(--sc-fg);
  margin: 0 0 8px;
}
.sc-teacher-name {
  font-family: "Noto Serif JP", serif; font-size: 20px; font-weight: 900;
  margin: 0 0 8px;
}
.sc-teacher-bio { font-size: 12px; color: var(--sc-fg-soft); line-height: 1.7; margin: 0; }

/* Voice */
.sc-voice { padding: 140px 64px; background: #fff; }
.sc-voice-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.sc-voice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
.sc-voice-card {
  position: relative;
  background: var(--sc-bg); padding: 36px 28px 28px;
  border-radius: 20px; border: 3px solid var(--sc-fg);
  box-shadow: 6px 6px 0 var(--sc-yellow);
}
.sc-voice-card:nth-child(2) { box-shadow: 6px 6px 0 var(--sc-pink); transform: translateY(20px); }
.sc-voice-card:nth-child(3) { box-shadow: 6px 6px 0 var(--sc-green); }
.sc-voice-quote {
  position: absolute; top: -20px; left: 24px;
  font-family: "Inter", serif; font-weight: 900; font-size: 80px; line-height: 1;
  color: var(--sc-yellow); -webkit-text-stroke: 3px var(--sc-fg);
}
.sc-voice-card p {
  font-size: 14px; line-height: 1.9; margin: 0 0 20px;
}
.sc-voice-card footer {
  border-top: 2px dashed var(--sc-fg); padding-top: 14px;
}
.sc-voice-card footer strong { display: block; font-size: 13px; font-weight: 700; }
.sc-voice-card footer span {
  display: block; font-family: "Inter", sans-serif;
  font-size: 11px; color: var(--sc-fg-soft); margin-top: 4px;
}

/* CTA */
.sc-cta {
  position: relative; padding: 140px 32px; text-align: center; overflow: hidden;
  background: var(--sc-yellow);
  border-block: 6px solid var(--sc-fg);
}
.sc-cta-bg-shapes {
  position: absolute; inset: 0; pointer-events: none;
}
.sc-cta-bg-shapes span {
  position: absolute; border: 4px solid var(--sc-fg);
}
.sc-cta-bg-shapes span:nth-child(1) {
  top: 10%; left: 8%; width: 120px; height: 120px; border-radius: 50%;
  background: var(--sc-pink);
  animation: sc-float 7s ease-in-out infinite;
}
.sc-cta-bg-shapes span:nth-child(2) {
  bottom: 15%; right: 10%; width: 100px; height: 100px;
  background: var(--sc-green); transform: rotate(15deg);
  animation: sc-float 9s ease-in-out infinite reverse;
}
.sc-cta-bg-shapes span:nth-child(3) {
  top: 50%; right: 20%; width: 60px; height: 60px;
  background: var(--sc-blue); border-radius: 50%;
  animation: sc-float 5s ease-in-out infinite;
}
.sc-cta-bg-shapes span:nth-child(4) {
  bottom: 25%; left: 18%; width: 80px; height: 80px;
  background: #fff; transform: rotate(45deg);
  animation: sc-float 11s ease-in-out infinite;
}
.sc-cta-content { position: relative; max-width: 800px; margin: 0 auto; z-index: 2; }
.sc-cta-h {
  font-family: "Noto Serif JP", serif; font-weight: 900;
  font-size: clamp(40px, 6vw, 80px); line-height: 1.3; margin: 0 0 20px;
}
.sc-cta-h em { font-style: normal; color: #fff; -webkit-text-stroke: 3px var(--sc-fg); }
.sc-cta-sub { font-size: 14px; margin: 0 0 36px; }
.sc-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* Footer */
.sc-footer {
  padding: 60px 32px 40px; background: var(--sc-fg); color: #fff; text-align: center;
}
.sc-footer-content { max-width: 800px; margin: 0 auto; }
.sc-footer-logo {
  display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;
}
.sc-footer-logo strong {
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 900;
  letter-spacing: 0.05em; color: var(--sc-yellow);
}
.sc-footer-addr {
  font-size: 12px; line-height: 1.9; color: rgba(255,255,255,0.7); margin: 0 0 20px;
}
.sc-footer-disclaimer {
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4);
  padding: 14px 20px; border-radius: 4px; margin: 0 0 20px;
}
.sc-footer-disclaimer strong { color: var(--sc-warn-pink); }
.sc-footer-cr { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }

/* Floating warning */
.sc-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--sc-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.sc-floating-warning-icon {
  background: #fff; color: var(--sc-warn-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 900px) {
  .sc-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .sc-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--sc-bg);
    box-shadow: 0 12px 32px rgba(0,0,0,0.1);
    padding: 0; max-height: 0; overflow: hidden;
    transition: max-height .4s, padding .4s;
  }
  .sc-nav.is-open { max-height: 500px; padding: 16px 0; }
  .sc-nav a { padding: 14px 24px; }
  .sc-burger { display: flex; }
  .sc-cta-btn { display: none; }
  .sc-hero { grid-template-columns: 1fr; padding: 60px 24px 80px; gap: 40px; min-height: auto; }
  .sc-hero-img-wrap { max-width: 360px; margin: 0 auto; }
  .sc-about, .sc-course, .sc-teacher, .sc-voice { padding: 80px 24px; }
  .sc-about-features { grid-template-columns: 1fr; }
  .sc-course-grid { grid-template-columns: 1fr; }
  .sc-teacher-grid, .sc-voice-grid { grid-template-columns: 1fr; gap: 32px; }
  .sc-voice-card:nth-child(2) { transform: none; }
  .sc-cta { padding: 80px 24px; }
  .sc-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .sc-warning-row { flex-wrap: wrap; }
}
`
