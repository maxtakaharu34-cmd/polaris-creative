import { useEffect, useState } from 'react'

/* ============================================================
   POLARIS LAW — 法律事務所テンプレート
   技術: テキスト垂直切替 (CSS keyframes ステップ)
        + IntersectionObserver で順次リビール
        + マスクスライドアップ
        + Marquee (流れるテキスト)
   テイスト: 重厚・権威・黒×ゴールド・セリフ
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2400&q=85',
  office: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=85',
  meeting: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85',
  attorney1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
  attorney2: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=85',
  attorney3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
  books: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=85',
}

export default function LawPremiumDemo() {
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
    document.querySelectorAll('.lw-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="lw-root">
      <style>{cssText}</style>

      {/* 警告 */}
      <div className="lw-warning">
        <div className="lw-warning-row">
          <span className="lw-warning-pill">SAMPLE</span>
          <span className="lw-warning-text">
            ⚠️ <b>POLARIS LAW</b> は<b className="lw-warning-emph">実在しない仮想法律事務所</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="lw-warning-back">← 戻る</a>
        </div>
        <div className="lw-warning-strip">
          ⚠️ 注意：事務所名・弁護士名・住所・電話番号・解決事例などはすべて<u>架空</u>です。
        </div>
      </div>

      {/* Header */}
      <header className="lw-header">
        <a href="#" className="lw-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="lw-logo-mark" aria-hidden>
            <path d="M20 5 L20 35 M8 12 L32 12 M12 18 L12 26 M28 18 L28 26 M5 30 L19 30 M21 30 L35 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
          <div className="lw-logo-text">
            <strong>POLARIS LAW</strong>
            <span>ポラリス法律事務所（架空）</span>
          </div>
        </a>
        <nav className={`lw-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>事務所紹介</a>
          <a href="#service" onClick={() => setMenuOpen(false)}>取扱業務</a>
          <a href="#attorney" onClick={() => setMenuOpen(false)}>弁護士紹介</a>
          <a href="#case" onClick={() => setMenuOpen(false)}>解決事例</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>ご相談</a>
        </nav>
        <button className="lw-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="lw-cta-btn">無料相談（仮）</a>
      </header>

      {/* Hero */}
      <section className="lw-hero">
        <div className="lw-hero-bg" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
        <div className="lw-hero-overlay"/>
        <div className="lw-hero-watermark">SAMPLE</div>

        <div className="lw-hero-content">
          <span className="lw-hero-eyebrow">EST. 1985 · TOKYO（架空）</span>
          <h1 className="lw-hero-title">
            <span className="lw-mask"><i>あなたの</i></span>
            <span className="lw-mask">
              <i className="lw-cycle">
                <em>権利</em>
                <em>未来</em>
                <em>生活</em>
                <em>会社</em>
              </i>
              <i>を、</i>
            </span>
            <span className="lw-mask"><i>守りぬく。</i></span>
          </h1>
          <p className="lw-hero-sub">
            ※架空法律事務所｜企業法務・労働問題・離婚・相続・刑事弁護<br/>
            <u>40年の経験</u>と<u>ご依頼者様への誠実さ</u>で、最善の解決を。
          </p>
          <div className="lw-hero-cta">
            <a href="#contact" className="lw-btn lw-btn-fill">初回無料相談（仮）</a>
            <a href="tel:0300000000" className="lw-btn lw-btn-ghost">03-0000-0000（架空）</a>
          </div>
        </div>

        <div className="lw-hero-meta">
          <div><strong>40<small>年</small></strong><span>EXPERIENCE（架空）</span></div>
          <div><strong>3,200<small>+</small></strong><span>CASES（架空）</span></div>
          <div><strong>12</strong><span>ATTORNEYS（架空）</span></div>
        </div>

        <div className="lw-hero-badge">※ これは架空のデザイン見本です</div>
      </section>

      {/* Marquee */}
      <div className="lw-marquee" aria-hidden>
        <div className="lw-marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              CORPORATE LAW · LABOR · DIVORCE · INHERITANCE · CRIMINAL · COMPLIANCE · M&amp;A · IP ·
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="lw-about">
        <div className="lw-about-grid">
          <div className="lw-about-img lw-reveal">
            <img src={IMG.office} alt="" loading="lazy"/>
            <div className="lw-img-stamp">SAMPLE</div>
          </div>
          <div className="lw-about-text lw-reveal">
            <span className="lw-eyebrow">— About —</span>
            <h2 className="lw-h2">
              法は、<br/>
              <em>人を救う道具。</em>
            </h2>
            <p className="lw-about-body">
              POLARIS LAW は、企業法務から個人のお悩みまで、<br/>
              <u>「ご依頼者様の人生に寄り添う法律事務所」</u>として、<br/>
              丁寧で透明性のある弁護活動を行っております。<br/>
              <span className="lw-fake">※ このページは仮想法律事務所のデザイン見本です。</span>
            </p>
            <ul className="lw-about-list">
              <li><strong>01</strong><span>透明な料金体系（架空）</span></li>
              <li><strong>02</strong><span>初回ご相談無料（架空）</span></li>
              <li><strong>03</strong><span>分野別の専門チーム（架空）</span></li>
              <li><strong>04</strong><span>オンライン相談対応（架空）</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Service */}
      <section id="service" className="lw-service">
        <div className="lw-service-head lw-reveal">
          <span className="lw-eyebrow">— Practice Area —</span>
          <h2 className="lw-h-mega">PRACTICE</h2>
          <p className="lw-fake-pill">※ 取扱業務はすべて架空のサンプル表示です</p>
        </div>
        <div className="lw-service-list">
          {[
            { num: '01', title: '企業法務', en: 'Corporate Law', desc: '契約書レビュー・法務顧問・コンプライアンス・M&A・IPOサポートなど。' },
            { num: '02', title: '労働問題', en: 'Labor Disputes', desc: '残業代請求・不当解雇・ハラスメント・労働審判・団体交渉。' },
            { num: '03', title: '離婚・男女問題', en: 'Divorce', desc: '離婚協議・調停・親権・養育費・財産分与・慰謝料請求。' },
            { num: '04', title: '相続', en: 'Inheritance', desc: '遺産分割・遺言書作成・相続放棄・遺留分侵害額請求。' },
            { num: '05', title: '刑事弁護', en: 'Criminal Defense', desc: '逮捕直後の対応・示談交渉・公判弁護・少年事件。' },
            { num: '06', title: '交通事故', en: 'Traffic Accident', desc: '示談交渉・後遺障害認定・損害賠償請求。' },
          ].map((s) => (
            <a key={s.num} href="#" className="lw-service-row lw-reveal">
              <span className="lw-service-num">{s.num}</span>
              <div className="lw-service-text">
                <h3>{s.title}<small>（架空）</small></h3>
                <p className="lw-service-en">{s.en}</p>
                <p className="lw-service-desc">{s.desc}</p>
              </div>
              <span className="lw-service-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Attorney */}
      <section id="attorney" className="lw-attorney">
        <div className="lw-attorney-head lw-reveal">
          <span className="lw-eyebrow">— Attorneys —</span>
          <h2 className="lw-h2">弁護士紹介</h2>
          <p className="lw-fake-pill">※ 弁護士情報はすべて架空のサンプル表示です</p>
        </div>
        <div className="lw-attorney-grid">
          {[
            { name: '田中 一郎（架空）', role: '代表弁護士 / Partner', img: IMG.attorney1, no: '登録番号 00000', bio: '東京弁護士会所属（架空）。企業法務・M&Aを中心に40年の経験。' },
            { name: '佐藤 美咲（架空）', role: 'パートナー弁護士', img: IMG.attorney2, no: '登録番号 00000', bio: '労働問題・離婚問題を中心に活動。著書多数（架空）。' },
            { name: '鈴木 健太（架空）', role: 'アソシエイト弁護士', img: IMG.attorney3, no: '登録番号 00000', bio: '刑事弁護・少年事件を中心に活動。元検察官（架空）。' },
          ].map((a) => (
            <div key={a.name} className="lw-attorney-card lw-reveal">
              <div className="lw-attorney-img" style={{ backgroundImage: `url("${a.img}")` }}>
                <div className="lw-img-stamp">SAMPLE</div>
              </div>
              <span className="lw-attorney-role">{a.role}</span>
              <h3 className="lw-attorney-name">{a.name}</h3>
              <p className="lw-attorney-no">{a.no}（架空）</p>
              <p className="lw-attorney-bio">{a.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case */}
      <section id="case" className="lw-case">
        <div className="lw-case-head lw-reveal">
          <span className="lw-eyebrow">— Cases —</span>
          <h2 className="lw-h-mega">RESULTS</h2>
          <p className="lw-fake-pill">※ 解決事例はすべて架空のサンプル表示です</p>
        </div>
        <div className="lw-case-grid">
          {[
            { tag: '労働問題', title: '残業代 1,200万円の支払いを実現（架空）', desc: '長年の未払い残業代について、訴訟により全額の支払いを実現しました。' },
            { tag: '離婚', title: '親権・養育費の獲得に成功（架空）', desc: '相手方との粘り強い交渉により、希望条件での解決に至りました。' },
            { tag: '相続', title: '遺留分の確保（5,000万円）（架空）', desc: '兄弟間の相続争いにおいて、依頼者の遺留分を確保しました。' },
            { tag: '企業法務', title: 'M&Aの完全合意成立（架空）', desc: '中小企業のM&Aを6ヶ月でクロージング。スムーズな統合を実現。' },
          ].map((c, i) => (
            <article key={i} className="lw-case-card lw-reveal">
              <span className="lw-case-tag">{c.tag}（架空）</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="lw-case-stamp">SAMPLE</span>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="lw-cta">
        <div className="lw-cta-bg" style={{ backgroundImage: `url("${IMG.books}")` }}/>
        <div className="lw-cta-overlay"/>
        <div className="lw-cta-content lw-reveal">
          <span className="lw-eyebrow">— Contact —</span>
          <h2 className="lw-cta-h">
            お悩みは、ひとりで<br/>
            抱え込まないで。
          </h2>
          <p className="lw-cta-sub">
            初回ご相談は無料です（架空）。<br/>
            <span className="lw-fake">※ ボタンは動作しません。仮想事務所のデザイン見本です。</span>
          </p>
          <div className="lw-cta-btns">
            <a href="#" className="lw-btn lw-btn-fill lw-btn-large">無料相談予約（仮）</a>
            <a href="#" className="lw-btn lw-btn-ghost lw-btn-large">03-0000-0000（架空）</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lw-footer">
        <div className="lw-footer-content">
          <div className="lw-footer-top">
            <div>
              <div className="lw-footer-logo">
                <strong>POLARIS LAW</strong>
                <span>ポラリス法律事務所（架空）</span>
              </div>
              <p className="lw-footer-addr">
                〒000-0000 東京都〇〇区〇〇 0-0-0（実在しません）<br/>
                TEL: 03-0000-0000（架空）<br/>
                営業時間: 平日 9:00 - 18:00（架空）
              </p>
            </div>
            <ul className="lw-footer-nav">
              <li><a href="#about">事務所紹介</a></li>
              <li><a href="#service">取扱業務</a></li>
              <li><a href="#attorney">弁護士紹介</a></li>
              <li><a href="#case">解決事例</a></li>
              <li><a href="#contact">ご相談</a></li>
            </ul>
          </div>
          <div className="lw-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS LAW」という<u>実在しない仮想法律事務所</u>のデザイン見本です。<br/>
            事務所名・弁護士名・登録番号・住所・電話番号・解決事例・実績数値などはすべて<u>架空</u>です。
          </div>
          <p className="lw-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="lw-floating-warning">
        <span className="lw-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想法律事務所です</span>
      </div>
    </div>
  )
}

const cssText = `
.lw-root {
  --lw-bg: #0d0d0d;
  --lw-bg-soft: #1a1a1a;
  --lw-fg: #f5f1e8;
  --lw-fg-soft: rgba(245, 241, 232, 0.7);
  --lw-gold: #c8a96a;
  --lw-gold-dark: #a78850;
  --lw-pink: #ec4899;
  background: var(--lw-bg);
  color: var(--lw-fg);
  font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif;
  position: relative;
  overflow-x: hidden;
}
.lw-root *, .lw-root *::before, .lw-root *::after { box-sizing: border-box; }

/* Warning */
.lw-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--lw-pink);
  font-family: "Noto Sans JP", sans-serif;
}
.lw-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.lw-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.lw-warning-text { flex: 1; min-width: 0; }
.lw-warning-emph { color: var(--lw-pink); }
.lw-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.lw-warning-back:hover { background: var(--lw-pink); color: #fff; }
.lw-warning-strip {
  background: var(--lw-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Header */
.lw-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 18px 40px;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(200, 169, 106, 0.15);
}
.lw-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--lw-fg); }
.lw-logo-mark { width: 32px; height: 32px; color: var(--lw-gold); }
.lw-logo-text strong {
  display: block; font-family: "Inter", serif; font-size: 14px; font-weight: 800;
  letter-spacing: 0.1em; line-height: 1.2; color: var(--lw-gold);
}
.lw-logo-text span {
  display: block; font-family: "Noto Sans JP", sans-serif;
  font-size: 10px; color: var(--lw-fg-soft); margin-top: 2px;
}
.lw-nav {
  display: flex; gap: 28px; margin-left: auto;
  font-family: "Noto Sans JP", sans-serif; font-size: 12px; font-weight: 600;
  letter-spacing: 0.08em;
}
.lw-nav a {
  color: var(--lw-fg); text-decoration: none; padding: 8px 0;
  position: relative; transition: color .3s;
}
.lw-nav a::after {
  content: ''; position: absolute; left: 0; right: 100%; bottom: 0;
  height: 1px; background: var(--lw-gold); transition: right .3s;
}
.lw-nav a:hover { color: var(--lw-gold); }
.lw-nav a:hover::after { right: 0; }

.lw-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.lw-burger span {
  width: 22px; height: 2px; background: var(--lw-fg); transition: all .3s;
}
.lw-burger span.is-open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
.lw-burger span.is-open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

.lw-cta-btn {
  background: var(--lw-gold); color: var(--lw-bg);
  padding: 12px 22px; border-radius: 0;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
  text-decoration: none; transition: all .3s;
}
.lw-cta-btn:hover { background: var(--lw-gold-dark); }

/* Hero */
.lw-hero {
  position: relative; min-height: 100vh; overflow: hidden;
  display: grid; align-items: center;
  padding: 80px 64px;
}
.lw-hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.35) saturate(0.8);
}
.lw-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(110deg, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.55) 100%);
}
.lw-hero-watermark {
  position: absolute; right: 5%; top: 50%; transform: translateY(-50%) rotate(90deg);
  font-family: "Inter", serif; font-weight: 900; font-size: 14vw;
  color: rgba(200, 169, 106, 0.06); letter-spacing: 0.3em;
  white-space: nowrap; pointer-events: none;
}
.lw-hero-content { position: relative; z-index: 2; max-width: 1200px; }
.lw-hero-eyebrow {
  display: inline-block; font-family: "Inter", serif; font-style: italic;
  font-size: 14px; letter-spacing: 0.3em; color: var(--lw-gold);
  margin-bottom: 32px; padding-left: 60px; position: relative;
}
.lw-hero-eyebrow::before {
  content: ''; position: absolute; left: 0; top: 50%; width: 40px; height: 1px;
  background: var(--lw-gold);
}
.lw-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(48px, 8vw, 130px); line-height: 1.15;
  margin: 0 0 32px; letter-spacing: -0.02em;
}
.lw-mask { display: block; overflow: hidden; }
.lw-mask > i {
  display: inline-block; font-style: normal;
  animation: lw-rise 1.4s cubic-bezier(.7,0,.3,1) both;
}
.lw-mask:nth-child(2) > i { animation-delay: .2s; }
.lw-mask:nth-child(3) > i { animation-delay: .4s; }
@keyframes lw-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }

.lw-cycle {
  display: inline-block; vertical-align: top;
  height: 1.15em; line-height: 1.15em; overflow: hidden;
  position: relative; min-width: 4em;
}
.lw-cycle em {
  display: block; font-style: normal;
  color: var(--lw-gold);
  animation: lw-cycle 8s steps(1) infinite;
  height: 1.15em;
}
.lw-cycle em:nth-child(1) { animation-delay: 0s; }
.lw-cycle em:nth-child(2) { margin-top: -1.15em; animation-delay: -2s; }
.lw-cycle em:nth-child(3) { margin-top: -1.15em; animation-delay: -4s; }
.lw-cycle em:nth-child(4) { margin-top: -1.15em; animation-delay: -6s; }
@keyframes lw-cycle {
  0% { transform: translateY(0); opacity: 1; }
  20% { opacity: 1; }
  25% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(-100%); opacity: 0; }
}

.lw-hero-sub {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 14px; line-height: 2; color: var(--lw-fg-soft); margin: 0 0 36px;
  max-width: 600px;
}
.lw-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.lw-hero-meta {
  position: absolute; right: 64px; bottom: 64px; z-index: 2;
  display: flex; gap: 40px; font-family: "Inter", sans-serif;
}
.lw-hero-meta strong {
  display: block; font-size: 40px; font-weight: 900; line-height: 1; color: var(--lw-gold);
}
.lw-hero-meta strong small { font-size: 16px; margin-left: 2px; }
.lw-hero-meta span {
  display: block; font-size: 10px; letter-spacing: 0.15em; margin-top: 6px;
  color: var(--lw-fg-soft);
}
.lw-hero-badge {
  position: absolute; top: 24px; right: 24px; z-index: 4;
  background: var(--lw-pink); color: #fff;
  font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}

/* Buttons */
.lw-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 28px; border-radius: 0;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
  text-decoration: none; cursor: pointer; border: 1px solid transparent;
  transition: all .3s ease;
}
.lw-btn-fill { background: var(--lw-gold); color: var(--lw-bg); }
.lw-btn-fill:hover { background: var(--lw-gold-dark); transform: translateY(-2px); }
.lw-btn-ghost { background: transparent; color: var(--lw-fg); border-color: rgba(245,241,232,0.4); }
.lw-btn-ghost:hover { border-color: var(--lw-gold); color: var(--lw-gold); }
.lw-btn-large { padding: 20px 36px; font-size: 13px; }

/* Marquee */
.lw-marquee {
  background: var(--lw-bg-soft); border-block: 1px solid rgba(200,169,106,0.2);
  padding: 18px 0; overflow: hidden;
}
.lw-marquee-track {
  display: flex; gap: 40px; white-space: nowrap;
  animation: lw-mq 36s linear infinite;
  font-family: "Inter", serif; font-style: italic; font-size: 16px;
  color: var(--lw-gold); letter-spacing: 0.1em;
}
@keyframes lw-mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* Common */
.lw-eyebrow {
  font-family: "Inter", serif; font-style: italic;
  font-size: 13px; letter-spacing: 0.25em; color: var(--lw-gold);
}
.lw-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(40px, 5vw, 80px); line-height: 1.25;
  margin: 16px 0 32px; letter-spacing: -0.02em;
}
.lw-h2 em { font-style: normal; color: var(--lw-gold); }
.lw-h-mega {
  font-family: "Inter", serif; font-weight: 900;
  font-size: clamp(72px, 11vw, 200px); line-height: 1;
  margin: 12px 0 24px; letter-spacing: -0.04em;
  background: linear-gradient(180deg, var(--lw-fg) 0%, var(--lw-gold-dark) 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lw-fake { font-family: "Noto Sans JP", sans-serif; font-size: 11px; color: var(--lw-pink); font-weight: 700; }
.lw-fake-pill {
  display: inline-block; padding: 5px 14px;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4);
  color: var(--lw-pink); border-radius: 999px;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 11px; font-weight: 700; margin: 4px 0 0;
}
.lw-img-stamp {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.8); color: var(--lw-gold);
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 0; letter-spacing: 0.15em;
}

/* Reveal */
.lw-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s ease, transform 1s ease; }
.lw-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* About */
.lw-about { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.lw-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.lw-about-img { position: relative; aspect-ratio: 4/5; overflow: hidden; }
.lw-about-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85); }
.lw-about-body {
  font-family: "Noto Sans JP", sans-serif; font-size: 14px; line-height: 2;
  color: var(--lw-fg-soft); margin: 0 0 32px;
}
.lw-about-list { list-style: none; padding: 0; margin: 0; }
.lw-about-list li {
  display: grid; grid-template-columns: 60px 1fr; gap: 16px; align-items: center;
  padding: 16px 0; border-top: 1px solid rgba(200,169,106,0.2);
  font-family: "Noto Sans JP", sans-serif;
}
.lw-about-list li:last-child { border-bottom: 1px solid rgba(200,169,106,0.2); }
.lw-about-list strong {
  font-family: "Inter", serif; font-weight: 900; font-size: 22px; color: var(--lw-gold);
}
.lw-about-list span { font-size: 14px; }

/* Service */
.lw-service { padding: 140px 64px; background: var(--lw-bg-soft); }
.lw-service-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.lw-service-list { max-width: 1200px; margin: 0 auto; }
.lw-service-row {
  display: grid; grid-template-columns: 100px 1fr 40px; gap: 32px; align-items: center;
  padding: 36px 24px;
  border-top: 1px solid rgba(200,169,106,0.2);
  text-decoration: none; color: var(--lw-fg);
  transition: background .3s, padding .3s;
  position: relative;
}
.lw-service-row:last-child { border-bottom: 1px solid rgba(200,169,106,0.2); }
.lw-service-row::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0;
  background: linear-gradient(90deg, rgba(200,169,106,0.1), transparent);
  transition: width .4s ease;
}
.lw-service-row:hover { padding-left: 48px; }
.lw-service-row:hover::before { width: 100%; }
.lw-service-num {
  font-family: "Inter", serif; font-weight: 900; font-size: 32px;
  color: var(--lw-gold); position: relative;
}
.lw-service-text h3 {
  font-family: "Noto Serif JP", serif; font-size: 28px; font-weight: 700;
  margin: 0 0 4px; position: relative;
}
.lw-service-text h3 small { font-size: 11px; color: var(--lw-pink); font-weight: 600; }
.lw-service-en {
  font-family: "Inter", serif; font-style: italic; font-size: 13px;
  letter-spacing: 0.15em; color: var(--lw-gold); margin: 0 0 8px; position: relative;
}
.lw-service-desc {
  font-family: "Noto Sans JP", sans-serif; font-size: 13px; line-height: 1.8;
  color: var(--lw-fg-soft); margin: 0; position: relative;
}
.lw-service-arrow {
  font-size: 24px; color: var(--lw-gold);
  transition: transform .4s; position: relative;
}
.lw-service-row:hover .lw-service-arrow { transform: translateX(8px); }

/* Attorney */
.lw-attorney { padding: 140px 64px; max-width: 1400px; margin: 0 auto; }
.lw-attorney-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.lw-attorney-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.lw-attorney-card { text-align: left; }
.lw-attorney-img {
  position: relative; aspect-ratio: 3/4; overflow: hidden;
  background-size: cover; background-position: center;
  margin-bottom: 24px; filter: saturate(0.8) contrast(1.05);
}
.lw-attorney-role {
  display: block; font-family: "Inter", serif; font-style: italic;
  font-size: 12px; letter-spacing: 0.2em; color: var(--lw-gold);
  margin-bottom: 6px;
}
.lw-attorney-name {
  font-family: "Noto Serif JP", serif; font-size: 24px; font-weight: 700;
  margin: 0 0 4px;
}
.lw-attorney-no {
  font-family: "Inter", sans-serif; font-size: 11px; color: var(--lw-fg-soft);
  margin: 0 0 12px;
}
.lw-attorney-bio {
  font-family: "Noto Sans JP", sans-serif; font-size: 13px; line-height: 1.8;
  color: var(--lw-fg-soft); margin: 0;
}

/* Case */
.lw-case { padding: 140px 64px; background: var(--lw-bg-soft); }
.lw-case-head { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.lw-case-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
  max-width: 1200px; margin: 0 auto;
}
.lw-case-card {
  position: relative;
  background: var(--lw-bg); padding: 40px;
  border: 1px solid rgba(200,169,106,0.2);
  transition: border-color .3s, transform .3s;
}
.lw-case-card:hover { border-color: var(--lw-gold); transform: translateY(-4px); }
.lw-case-tag {
  display: inline-block; font-family: "Noto Sans JP", sans-serif;
  font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
  color: var(--lw-gold); padding: 4px 12px;
  border: 1px solid var(--lw-gold);
  margin-bottom: 16px;
}
.lw-case-card h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 700;
  margin: 0 0 12px; line-height: 1.5;
}
.lw-case-card p {
  font-family: "Noto Sans JP", sans-serif; font-size: 13px; line-height: 1.8;
  color: var(--lw-fg-soft); margin: 0;
}
.lw-case-stamp {
  position: absolute; top: 16px; right: 16px;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  color: rgba(236,72,153,0.7); letter-spacing: 0.2em;
}

/* CTA */
.lw-cta {
  position: relative; padding: 160px 32px; text-align: center; overflow: hidden;
}
.lw-cta-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.3) saturate(0.6);
}
.lw-cta-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(13,13,13,0.6), rgba(13,13,13,0.95));
}
.lw-cta-content { position: relative; max-width: 800px; margin: 0 auto; z-index: 2; }
.lw-cta-h {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(36px, 5vw, 72px); line-height: 1.4; margin: 16px 0 24px;
  color: var(--lw-fg);
}
.lw-cta-sub {
  font-family: "Noto Sans JP", sans-serif; font-size: 14px;
  color: var(--lw-fg-soft); margin: 0 0 36px;
}
.lw-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* Footer */
.lw-footer {
  padding: 80px 32px 40px; background: var(--lw-bg);
  border-top: 1px solid rgba(200,169,106,0.2);
}
.lw-footer-content { max-width: 1280px; margin: 0 auto; }
.lw-footer-top {
  display: grid; grid-template-columns: 1fr auto; gap: 48px; margin-bottom: 60px;
}
.lw-footer-logo strong {
  display: block; font-family: "Inter", serif; font-size: 20px; font-weight: 800;
  letter-spacing: 0.1em; color: var(--lw-gold); margin-bottom: 6px;
}
.lw-footer-logo span {
  display: block; font-family: "Noto Sans JP", sans-serif; font-size: 12px;
  color: var(--lw-fg-soft);
}
.lw-footer-addr {
  font-family: "Noto Sans JP", sans-serif; font-size: 12px; line-height: 1.9;
  color: var(--lw-fg-soft); margin: 24px 0 0;
}
.lw-footer-nav {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 12px;
  font-family: "Noto Sans JP", sans-serif; font-size: 13px;
}
.lw-footer-nav a {
  color: var(--lw-fg); text-decoration: none; transition: color .3s;
}
.lw-footer-nav a:hover { color: var(--lw-gold); }
.lw-footer-disclaimer {
  font-family: "Noto Sans JP", sans-serif; font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4);
  padding: 16px 20px; border-radius: 4px; margin: 0 0 24px;
}
.lw-footer-disclaimer strong { color: var(--lw-pink); }
.lw-footer-cr {
  font-family: "Inter", sans-serif; font-size: 11px;
  color: rgba(245,241,232,0.5); margin: 0; text-align: center;
}

/* Floating warning */
.lw-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--lw-pink); color: #fff;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.lw-floating-warning-icon {
  background: #fff; color: var(--lw-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 900px) {
  .lw-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .lw-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--lw-bg);
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    padding: 0; max-height: 0; overflow: hidden;
    transition: max-height .4s, padding .4s;
  }
  .lw-nav.is-open { max-height: 500px; padding: 16px 0; }
  .lw-nav a { padding: 14px 24px; }
  .lw-burger { display: flex; }
  .lw-cta-btn { display: none; }
  .lw-hero { padding: 60px 24px 220px; }
  .lw-hero-eyebrow { padding-left: 0; }
  .lw-hero-eyebrow::before { display: none; }
  .lw-hero-meta { right: 24px; left: 24px; bottom: 32px; gap: 20px; justify-content: space-between; }
  .lw-hero-meta strong { font-size: 28px; }
  .lw-about, .lw-service, .lw-attorney, .lw-case, .lw-cta { padding: 80px 24px; }
  .lw-about-grid { grid-template-columns: 1fr; gap: 40px; }
  .lw-attorney-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .lw-case-grid { grid-template-columns: 1fr; }
  .lw-service-row {
    grid-template-columns: 60px 1fr 30px; padding: 24px 16px; gap: 16px;
  }
  .lw-service-row:hover { padding-left: 16px; }
  .lw-service-text h3 { font-size: 20px; }
  .lw-footer-top { grid-template-columns: 1fr; }
  .lw-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .lw-warning-row { flex-wrap: wrap; }
}
`
