import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS HERITAGE CONSTRUCTION — ゼネコン老舗・重厚
   ネイビー×朱赤×アイボリー / 縦タイムライン / カウントアップ
   ============================================================ */

function CountUp({ to, suffix = '', dur = 1800 }: { to: number; suffix?: string; dur?: number }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            setN(Math.floor(eased * to))
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, dur])
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

export default function BuilderHeritageDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.hg-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="hg-root">
      <style>{cssText}</style>

      <div className="hg-warning">
        <div className="hg-warning-row">
          <span className="hg-warning-pill">SAMPLE</span>
          <span className="hg-warning-text">⚠️ <b>POLARIS HERITAGE CONSTRUCTION</b> は<b className="hg-warning-emph">実在しない仮想ゼネコン</b>です。ポラリスクリエイティブ作成のデザイン見本。</span>
          <a href="#hp" className="hg-warning-back">← 戻る</a>
        </div>
        <div className="hg-warning-strip">⚠️ 注意：会社名・住所・電話・沿革・施工事例・実績数はすべて<u>架空</u>です。</div>
      </div>

      <header className="hg-header">
        <a href="#" className="hg-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <div className="hg-logo-emblem">
            <svg viewBox="0 0 60 60" aria-hidden>
              <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="0.7" fill="none"/>
              <text x="30" y="35" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="serif" fill="currentColor">P</text>
            </svg>
          </div>
          <div className="hg-logo-text">
            <span>創業 大正十二年（架空）</span>
            <strong>株式会社 ポラリス建設</strong>
            <em>POLARIS HERITAGE CONSTRUCTION</em>
          </div>
        </a>
        <nav className={`hg-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#history" onClick={() => setMenuOpen(false)}>沿革</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>実績</a>
          <a href="#business" onClick={() => setMenuOpen(false)}>事業</a>
          <a href="#message" onClick={() => setMenuOpen(false)}>社長挨拶</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>お問合せ</a>
        </nav>
        <button className="hg-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      <section className="hg-hero">
        <div className="hg-hero-bg">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="hg-hero-badge">※ 架空のデザイン見本</div>
        <div className="hg-hero-content">
          <div className="hg-hero-frame">
            <span className="hg-hero-eng">Since 1923 · Tokyo Japan</span>
            <h1 className="hg-hero-title">
              <span>百年、</span>
              <span>街に、</span>
              <span>骨を、</span>
              <span>残す。</span>
            </h1>
            <div className="hg-hero-line"/>
            <p className="hg-hero-sub">
              大正十二年創業（架空）。<br/>
              戦後復興・高度成長・震災復旧——時代の節目で、<br/>
              街の<u>骨格</u>を作り続けてきた総合建設会社（架空）。
            </p>
          </div>
        </div>
        <div className="hg-hero-scroll">
          <span>SCROLL</span>
          <div/>
        </div>
      </section>

      <section className="hg-stats">
        <div className="hg-stats-inner">
          {[
            { l: '創業からの年数', v: 103, s: '年', fake: '※架空' },
            { l: '完成建築物', v: 4820, s: '件', fake: '※架空' },
            { l: '従業員数', v: 1240, s: '名', fake: '※架空' },
            { l: '官公庁工事実績', v: 380, s: '件', fake: '※架空' },
          ].map((d) => (
            <div key={d.l} className="hg-stat hg-reveal">
              <div className="hg-stat-label">{d.l}<small>{d.fake}</small></div>
              <div className="hg-stat-value">
                <CountUp to={d.v} />
                <em>{d.s}</em>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="history" className="hg-history">
        <div className="hg-section-head hg-reveal">
          <div className="hg-kanji">沿革</div>
          <span className="hg-eyebrow">— HISTORY —</span>
          <h2 className="hg-h2">百年の、歩み。</h2>
          <p>明治から令和まで。街と共に重ねた歴史を、年表でご紹介します。<br/><span className="hg-fake">※ 以下の沿革・実績はすべて架空です。</span></p>
        </div>
        <div className="hg-timeline">
          <div className="hg-timeline-line"/>
          {[
            { y: '1923', era: '大正12', t: '創業', d: '東京・神田にて石工請負業として創業（架空）。初代「ポラリス石材」' },
            { y: '1948', era: '昭和23', t: '戦後復興', d: '東京都内の公共建築復興工事を多数受注（架空）' },
            { y: '1964', era: '昭和39', t: '東京五輪関連', d: '都内インフラ整備事業に参画（架空）' },
            { y: '1985', era: '昭和60', t: '海外進出', d: 'シンガポール法人を設立、東南アジアに展開（架空）' },
            { y: '1995', era: '平成7',  t: '震災復興支援', d: '阪神大震災の復旧工事に従事（架空）' },
            { y: '2011', era: '平成23', t: '東日本大震災復旧', d: '東北沿岸部の堤防・橋梁復旧（架空）' },
            { y: '2024', era: '令和6',  t: '百周年事業', d: 'カーボンニュートラル建設宣言（架空）' },
          ].map((e, i) => (
            <div key={e.y} className={`hg-timeline-item hg-reveal ${i % 2 === 0 ? 'hg-left' : 'hg-right'}`}>
              <div className="hg-timeline-dot"/>
              <div className="hg-timeline-card">
                <div className="hg-timeline-year">{e.y}<small>（{e.era}）</small></div>
                <h3>{e.t}<small>※架空</small></h3>
                <p>{e.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="works" className="hg-works">
        <div className="hg-section-head hg-reveal">
          <div className="hg-kanji">実績</div>
          <span className="hg-eyebrow">— SELECTED WORKS —</span>
          <h2 className="hg-h2">街の、骨格。</h2>
          <p className="hg-fake-pill">※ 以下の施工事例はすべて<b>架空</b>のサンプルです。</p>
        </div>
        <div className="hg-works-grid">
          {[
            { img: 'photo-1486325212027-8081e485255e', t: '中央区・複合ビル', y: '2023', cat: '建築' },
            { img: 'photo-1503387762-592deb58ef4e', t: '○○県・橋梁架替工事', y: '2022', cat: '土木' },
            { img: 'photo-1448630360428-65456885c650', t: '区立小学校 改築', y: '2022', cat: '公共建築' },
            { img: 'photo-1487958449943-2429e8be8625', t: '△△市・道路拡幅', y: '2021', cat: '土木' },
            { img: 'photo-1494380005750-93f72b4dba1d', t: '本社移転新築工事', y: '2021', cat: '建築' },
            { img: 'photo-1565008447742-97f6f38c985c', t: '都内・高層オフィス', y: '2020', cat: '建築' },
          ].map((w) => (
            <div key={w.t} className="hg-work hg-reveal">
              <div className="hg-work-img">
                <img src={`https://images.unsplash.com/${w.img}?auto=format&fit=crop&w=1200&q=80`} alt="" />
                <span className="hg-work-fake">架空</span>
              </div>
              <div className="hg-work-meta">
                <span className="hg-work-cat">{w.cat}</span>
                <h3>{w.t}<small>（架空）</small></h3>
                <span className="hg-work-year">竣工 {w.y} 年（架空）</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="business" className="hg-business">
        <div className="hg-section-head hg-reveal">
          <div className="hg-kanji">事業</div>
          <span className="hg-eyebrow">— BUSINESS —</span>
          <h2 className="hg-h2">四つの、専門領域。</h2>
        </div>
        <div className="hg-biz-grid">
          {[
            { num: '壱', en: 'I', t: '建築事業', d: '商業施設・オフィス・マンション・公共建築まで、規模を問わず一貫対応。設計から維持管理まで（架空）' },
            { num: '弐', en: 'II', t: '土木事業', d: '橋梁・トンネル・道路・河川・港湾。社会インフラを支える総合土木技術（架空）' },
            { num: '参', en: 'III', t: 'リニューアル事業', d: '既存建物の長寿命化・耐震改修・歴史的建造物の保存修復（架空）' },
            { num: '肆', en: 'IV', t: '海外事業', d: '東南アジア・中東を中心に、インフラ整備プロジェクトに参画（架空）' },
          ].map((b) => (
            <div key={b.num} className="hg-biz-card hg-reveal">
              <div className="hg-biz-num">
                <span className="hg-biz-num-kanji">{b.num}</span>
                <span className="hg-biz-num-en">{b.en}</span>
              </div>
              <h3>{b.t}<small>※架空</small></h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="message" className="hg-message">
        <div className="hg-message-grid">
          <div className="hg-message-photo hg-reveal">
            <div className="hg-photo-frame">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80" alt="" />
              <div className="hg-photo-stamp">P</div>
            </div>
            <div className="hg-message-name">
              <small>代表取締役社長（架空）</small>
              <strong>北極 太郎</strong>
              <em>POLARIS Taro</em>
            </div>
          </div>
          <div className="hg-message-body hg-reveal">
            <div className="hg-kanji-small">挨拶</div>
            <span className="hg-eyebrow">— MESSAGE —</span>
            <h2 className="hg-h2">「建てる」とは、<br/>未来への、約束。</h2>
            <p>創業以来、ポラリス建設（架空）は、<br/>「建てたものが、百年後の街にどう残るか」を問い続けてまいりました。</p>
            <p>大正・昭和・平成・令和——時代の波を超え、変わらず街にあり続けたのは、<br/>地域とお客様に育てていただいたからです。</p>
            <p>これからの百年も、確かな技術と誠実な仕事で、皆さまの<u>未来の風景</u>を作らせていただきます。</p>
            <p className="hg-message-fake">※ この挨拶文は架空の人物による架空のメッセージです。</p>
          </div>
        </div>
      </section>

      <section id="contact" className="hg-contact">
        <div className="hg-section-head hg-reveal">
          <div className="hg-kanji">問合</div>
          <span className="hg-eyebrow">— CONTACT —</span>
          <h2 className="hg-h2">お問い合わせ</h2>
          <p>各種工事のご相談、採用に関するご質問など、お気軽にどうぞ。<br/><span className="hg-fake">※ 動作しません。架空ゼネコンのデザイン見本です。</span></p>
        </div>
        <div className="hg-contact-grid hg-reveal">
          <div className="hg-contact-info">
            <dl>
              <div><dt>本社所在地（架空）</dt><dd>東京都〇〇区〇〇 0-0-0 ポラリスビル ※実在しません</dd></div>
              <div><dt>代表電話（架空）</dt><dd>03-0000-0000</dd></div>
              <div><dt>営業時間（架空）</dt><dd>平日 9:00 〜 17:30</dd></div>
              <div><dt>建設業許可（架空）</dt><dd>国土交通大臣許可（特-00）第00000号</dd></div>
              <div><dt>資本金（架空）</dt><dd>52億円</dd></div>
              <div><dt>従業員数（架空）</dt><dd>1,240名（連結）</dd></div>
            </dl>
          </div>
          <div className="hg-contact-form">
            <h3>お問い合わせフォーム<small>※架空・送信できません</small></h3>
            <label><span>お名前 <i>*</i></span><input type="text" disabled placeholder="架空フォーム"/></label>
            <label><span>会社名</span><input type="text" disabled placeholder="架空フォーム"/></label>
            <label><span>メール <i>*</i></span><input type="email" disabled placeholder="架空フォーム"/></label>
            <label><span>ご相談内容 <i>*</i></span><textarea rows={4} disabled placeholder="架空フォーム — 動作しません"/></label>
            <button type="button" disabled>送信する（※架空・無効）</button>
          </div>
        </div>
      </section>

      <footer className="hg-footer">
        <div className="hg-footer-mark">
          <span>株式会社</span>
          <strong>ポラリス建設</strong>
          <em>POLARIS HERITAGE CONSTRUCTION</em>
        </div>
        <p className="hg-footer-tag">— 百年、街に、骨を、残す。 —</p>
        <div className="hg-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「株式会社ポラリス建設 / POLARIS HERITAGE CONSTRUCTION」という<u>実在しない仮想ゼネコン</u>のデザイン見本です。<br/>
          会社名・住所・電話・沿革・施工事例・代表者・実績数はすべて<u>架空</u>です。
        </div>
        <p className="hg-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="hg-floating-warning">
        <span className="hg-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想ゼネコンです</span>
      </div>
    </div>
  )
}

const cssText = `
.hg-root {
  --hg-navy: #14213d;
  --hg-navy-deep: #0a1428;
  --hg-red: #b8323a;
  --hg-ivory: #f5f1e8;
  --hg-paper: #ebe5d6;
  --hg-fg: #1c1c1c;
  --hg-pink: #d4506a;
  background: var(--hg-ivory);
  color: var(--hg-fg);
  font-family: "Yu Mincho", "Noto Serif JP", serif;
  min-height: 100vh;
}
.hg-root *, .hg-root *::before, .hg-root *::after { box-sizing: border-box; }

.hg-warning { position: sticky; top: 0; z-index: 50; background: var(--hg-navy-deep); color: #fff; border-bottom: 2px solid var(--hg-pink); }
.hg-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.hg-warning-pill { background: var(--hg-pink); color: #fff; padding: 2px 10px; border-radius: 2px; font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0; }
.hg-warning-text { flex: 1; min-width: 0; font-family: "Noto Sans JP", sans-serif; }
.hg-warning-emph { color: #ff8fa6; }
.hg-warning-back { background: #fff; color: var(--hg-navy-deep); padding: 4px 12px; border-radius: 2px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; font-family: sans-serif; }
.hg-warning-strip { background: var(--hg-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; font-family: "Noto Sans JP", sans-serif; }

.hg-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 18px 32px; background: var(--hg-ivory); border-bottom: 1px solid rgba(20,33,61,0.15); }
.hg-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; color: var(--hg-navy); }
.hg-logo-emblem { width: 48px; height: 48px; color: var(--hg-navy); flex-shrink: 0; }
.hg-logo-text { line-height: 1.3; }
.hg-logo-text span { display: block; font-size: 10px; color: var(--hg-red); font-family: "Yu Mincho", serif; }
.hg-logo-text strong { display: block; font-size: 17px; font-weight: 700; }
.hg-logo-text em { display: block; font-size: 9px; color: rgba(20,33,61,0.55); font-style: normal; letter-spacing: 0.15em; font-family: serif; }
.hg-nav { display: none; gap: 32px; margin-left: auto; }
.hg-nav a { color: var(--hg-navy); text-decoration: none; font-size: 14px; font-weight: 600; position: relative; transition: color .2s; }
.hg-nav a::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: var(--hg-red); transition: width .3s; }
.hg-nav a:hover { color: var(--hg-red); }
.hg-nav a:hover::after { width: 100%; }
.hg-burger { margin-left: auto; background: var(--hg-navy); border: none; width: 44px; height: 44px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; cursor: pointer; }
.hg-burger span { display: block; width: 20px; height: 2px; background: var(--hg-ivory); transition: all .25s; }
.hg-burger span.is-open:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hg-burger span.is-open:nth-child(2) { opacity: 0; }
.hg-burger span.is-open:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
@media (min-width: 1000px) {
  .hg-nav { display: flex; }
  .hg-burger { display: none; }
}
.hg-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--hg-ivory); padding: 24px; display: flex; border-bottom: 1px solid rgba(20,33,61,0.15); }

.hg-hero { position: relative; min-height: 92vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; background: var(--hg-navy-deep); }
.hg-hero-bg { position: absolute; inset: 0; }
.hg-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.5) brightness(0.4) contrast(1.2); }
.hg-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.5) 70%, transparent 100%); }
.hg-hero-badge { position: absolute; top: 24px; right: 24px; background: var(--hg-pink); color: #fff; padding: 6px 14px; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; z-index: 5; font-family: "Noto Sans JP", sans-serif; }
.hg-hero-content { position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; width: 100%; }
.hg-hero-frame { max-width: 720px; padding: 48px 56px; background: rgba(245,241,232,0.97); border: 1px solid rgba(184,50,58,0.4); position: relative; }
.hg-hero-frame::before, .hg-hero-frame::after { content: ''; position: absolute; width: 24px; height: 24px; border: 2px solid var(--hg-red); }
.hg-hero-frame::before { top: -6px; left: -6px; border-right: none; border-bottom: none; }
.hg-hero-frame::after { bottom: -6px; right: -6px; border-left: none; border-top: none; }
.hg-hero-eng { display: block; font-size: 11px; letter-spacing: 0.3em; color: var(--hg-red); margin-bottom: 24px; font-family: "Times New Roman", serif; font-style: italic; }
.hg-hero-title { font-size: clamp(48px, 9vw, 120px); font-weight: 800; letter-spacing: 0.05em; line-height: 1.1; margin: 0; color: var(--hg-navy); display: flex; flex-wrap: wrap; gap: 0.1em; }
.hg-hero-title span { display: inline-block; opacity: 0; transform: translateY(40px); animation: hg-rise 1s cubic-bezier(.2,.7,.2,1) forwards; }
.hg-hero-title span:nth-child(1) { animation-delay: .15s; }
.hg-hero-title span:nth-child(2) { animation-delay: .3s; }
.hg-hero-title span:nth-child(3) { animation-delay: .45s; color: var(--hg-red); }
.hg-hero-title span:nth-child(4) { animation-delay: .6s; }
.hg-hero-line { height: 2px; width: 64px; background: var(--hg-red); margin: 32px 0 24px; }
.hg-hero-sub { font-size: clamp(14px, 1.5vw, 17px); line-height: 2; color: rgba(20,33,61,0.85); margin: 0; font-family: "Noto Serif JP", serif; }
.hg-hero-scroll { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 10; color: var(--hg-ivory); text-align: center; }
.hg-hero-scroll span { display: block; font-size: 10px; letter-spacing: 0.3em; opacity: 0.7; margin-bottom: 8px; font-family: serif; }
.hg-hero-scroll div { width: 1px; height: 40px; background: var(--hg-ivory); margin: 0 auto; opacity: 0.4; animation: hg-scroll 2.2s ease-in-out infinite; }

.hg-stats { background: var(--hg-navy); color: var(--hg-ivory); padding: 56px 32px; }
.hg-stats-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0; }
.hg-stat { padding: 24px 28px; border-right: 1px solid rgba(245,241,232,0.15); }
.hg-stat:last-child { border-right: none; }
.hg-stat-label { font-size: 12px; color: rgba(245,241,232,0.7); margin-bottom: 8px; font-family: "Noto Serif JP", serif; }
.hg-stat-label small { font-size: 9px; color: var(--hg-pink); margin-left: 6px; font-family: sans-serif; }
.hg-stat-value { font-size: 48px; font-weight: 700; color: var(--hg-ivory); line-height: 1; letter-spacing: -0.02em; font-family: "Times New Roman", "Yu Mincho", serif; }
.hg-stat-value em { font-size: 18px; font-style: normal; margin-left: 4px; color: var(--hg-red); font-family: "Noto Serif JP", serif; font-weight: 600; }

.hg-history, .hg-works, .hg-business, .hg-message, .hg-contact { padding: 120px 32px; }
.hg-history { background: var(--hg-paper); }
.hg-works { background: var(--hg-ivory); }
.hg-business { background: var(--hg-paper); }
.hg-message { background: var(--hg-ivory); }
.hg-contact { background: var(--hg-paper); }

.hg-section-head { text-align: center; max-width: 800px; margin: 0 auto 80px; position: relative; }
.hg-kanji { font-size: clamp(80px, 14vw, 200px); font-weight: 700; color: rgba(184,50,58,0.06); position: absolute; top: -40px; left: 50%; transform: translateX(-50%); pointer-events: none; line-height: 1; user-select: none; }
.hg-kanji-small { font-size: 80px; font-weight: 700; color: rgba(184,50,58,0.08); margin-bottom: -40px; line-height: 1; }
.hg-eyebrow { display: inline-block; font-size: 11px; letter-spacing: 0.35em; color: var(--hg-red); margin-bottom: 16px; font-family: "Times New Roman", serif; font-style: italic; position: relative; }
.hg-h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 700; line-height: 1.4; margin: 0 0 16px; letter-spacing: 0.03em; color: var(--hg-navy); position: relative; }
.hg-section-head p { font-size: 14px; color: rgba(28,28,28,0.7); line-height: 1.9; margin: 0; font-family: "Noto Serif JP", serif; }
.hg-fake { color: var(--hg-pink); font-weight: 700; }
.hg-fake-pill { display: inline-block; padding: 6px 18px; background: rgba(212,80,106,0.1); color: var(--hg-pink); border: 1px solid rgba(212,80,106,0.3); border-radius: 2px; font-size: 12px; font-weight: 700; margin-top: 12px; font-family: "Noto Sans JP", sans-serif; }

.hg-timeline { position: relative; max-width: 980px; margin: 0 auto; padding: 32px 0; }
.hg-timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--hg-navy); transform: translateX(-50%); }
.hg-timeline-item { position: relative; width: 50%; padding: 16px 48px; }
.hg-timeline-item.hg-left { left: 0; text-align: right; }
.hg-timeline-item.hg-right { left: 50%; }
.hg-timeline-dot { position: absolute; top: 32px; width: 14px; height: 14px; background: var(--hg-red); border: 3px solid var(--hg-paper); border-radius: 50%; z-index: 2; }
.hg-timeline-item.hg-left .hg-timeline-dot { right: -8px; }
.hg-timeline-item.hg-right .hg-timeline-dot { left: -8px; }
.hg-timeline-card { background: var(--hg-ivory); padding: 24px; border: 1px solid rgba(20,33,61,0.15); position: relative; transition: all .3s; }
.hg-timeline-card:hover { border-color: var(--hg-red); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(20,33,61,0.1); }
.hg-timeline-year { font-size: 36px; font-weight: 700; color: var(--hg-red); font-family: "Times New Roman", serif; line-height: 1; }
.hg-timeline-year small { font-size: 13px; color: rgba(20,33,61,0.6); margin-left: 8px; font-family: "Yu Mincho", serif; font-weight: 400; }
.hg-timeline-card h3 { font-size: 20px; font-weight: 700; margin: 8px 0 8px; color: var(--hg-navy); }
.hg-timeline-card h3 small { font-size: 10px; color: var(--hg-pink); margin-left: 6px; font-weight: 600; font-family: "Noto Sans JP", sans-serif; }
.hg-timeline-card p { font-size: 13px; line-height: 1.8; color: rgba(28,28,28,0.75); margin: 0; }
@media (max-width: 700px) {
  .hg-timeline-line { left: 16px; }
  .hg-timeline-item { width: 100%; left: 0 !important; text-align: left !important; padding: 12px 12px 12px 48px; }
  .hg-timeline-item .hg-timeline-dot { left: 10px !important; right: auto !important; }
}

.hg-works-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; max-width: 1280px; margin: 0 auto; }
.hg-work { transition: transform .3s; cursor: pointer; }
.hg-work:hover { transform: translateY(-6px); }
.hg-work-img { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #ccc; }
.hg-work-img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.3); transition: filter .5s, transform .8s; }
.hg-work:hover .hg-work-img img { filter: grayscale(0); transform: scale(1.05); }
.hg-work-fake { position: absolute; top: 12px; right: 12px; background: var(--hg-pink); color: #fff; padding: 4px 10px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; font-family: "Noto Sans JP", sans-serif; }
.hg-work-meta { padding: 16px 0; }
.hg-work-cat { display: inline-block; font-size: 10px; letter-spacing: 0.2em; color: var(--hg-red); margin-bottom: 6px; font-family: "Noto Sans JP", sans-serif; font-weight: 700; }
.hg-work h3 { font-size: 19px; font-weight: 700; margin: 0 0 6px; color: var(--hg-navy); }
.hg-work h3 small { font-size: 10px; color: var(--hg-pink); margin-left: 6px; font-weight: 500; font-family: "Noto Sans JP", sans-serif; }
.hg-work-year { font-size: 12px; color: rgba(28,28,28,0.6); font-family: "Times New Roman", serif; }

.hg-biz-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.hg-biz-card { position: relative; padding: 40px 32px; background: var(--hg-ivory); border: 1px solid rgba(20,33,61,0.2); transition: all .3s; }
.hg-biz-card:hover { border-color: var(--hg-red); background: #fff; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(20,33,61,0.1); }
.hg-biz-num { position: relative; margin-bottom: 24px; }
.hg-biz-num-kanji { font-size: 64px; font-weight: 700; color: var(--hg-red); font-family: "Yu Mincho", serif; line-height: 1; }
.hg-biz-num-en { position: absolute; top: 8px; right: 0; font-size: 12px; letter-spacing: 0.3em; color: rgba(20,33,61,0.4); font-family: "Times New Roman", serif; font-style: italic; }
.hg-biz-card h3 { font-size: 22px; font-weight: 700; margin: 0 0 16px; color: var(--hg-navy); }
.hg-biz-card h3 small { font-size: 10px; color: var(--hg-pink); margin-left: 6px; font-weight: 500; font-family: "Noto Sans JP", sans-serif; }
.hg-biz-card p { font-size: 13px; line-height: 1.9; color: rgba(28,28,28,0.75); margin: 0; font-family: "Noto Serif JP", serif; }

.hg-message-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 64px; max-width: 1100px; margin: 0 auto; align-items: center; }
@media (max-width: 800px) { .hg-message-grid { grid-template-columns: 1fr; gap: 32px; } }
.hg-photo-frame { position: relative; aspect-ratio: 3/4; max-width: 320px; background: #999; }
.hg-photo-frame img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.1); }
.hg-photo-frame::after { content: ''; position: absolute; inset: -6px; border: 1px solid var(--hg-navy); pointer-events: none; }
.hg-photo-stamp { position: absolute; bottom: -16px; right: -16px; width: 60px; height: 60px; background: var(--hg-red); color: var(--hg-ivory); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: "Yu Mincho", serif; font-size: 28px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.hg-message-name { margin-top: 32px; }
.hg-message-name small { display: block; font-size: 11px; color: rgba(28,28,28,0.6); margin-bottom: 4px; }
.hg-message-name strong { display: block; font-size: 24px; font-weight: 700; color: var(--hg-navy); letter-spacing: 0.05em; }
.hg-message-name em { display: block; font-size: 11px; color: rgba(20,33,61,0.5); font-style: italic; letter-spacing: 0.2em; margin-top: 2px; font-family: "Times New Roman", serif; }
.hg-message-body .hg-h2 { text-align: left; }
.hg-message-body .hg-eyebrow { display: block; margin-bottom: 12px; }
.hg-message-body p { font-size: 15px; line-height: 2; color: rgba(28,28,28,0.85); margin: 24px 0 0; font-family: "Noto Serif JP", serif; }
.hg-message-fake { color: var(--hg-pink) !important; font-size: 12px !important; font-weight: 700; }

.hg-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; max-width: 1100px; margin: 0 auto; }
@media (max-width: 800px) { .hg-contact-grid { grid-template-columns: 1fr; } }
.hg-contact-info dl { margin: 0; }
.hg-contact-info dl > div { display: grid; grid-template-columns: 140px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(20,33,61,0.15); }
.hg-contact-info dt { font-size: 12px; font-weight: 700; color: var(--hg-red); font-family: "Noto Serif JP", serif; }
.hg-contact-info dd { margin: 0; font-size: 14px; color: var(--hg-navy); font-family: "Noto Serif JP", serif; }
.hg-contact-form { background: var(--hg-ivory); padding: 32px; border: 1px solid rgba(20,33,61,0.15); }
.hg-contact-form h3 { font-size: 18px; font-weight: 700; color: var(--hg-navy); margin: 0 0 24px; padding-bottom: 12px; border-bottom: 2px solid var(--hg-red); }
.hg-contact-form h3 small { font-size: 10px; color: var(--hg-pink); margin-left: 8px; font-weight: 500; font-family: "Noto Sans JP", sans-serif; }
.hg-contact-form label { display: block; margin-bottom: 16px; }
.hg-contact-form span { display: block; font-size: 12px; font-weight: 700; color: var(--hg-navy); margin-bottom: 6px; font-family: "Noto Sans JP", sans-serif; }
.hg-contact-form i { color: var(--hg-red); font-style: normal; }
.hg-contact-form input, .hg-contact-form textarea { width: 100%; padding: 10px 12px; background: var(--hg-paper); border: 1px solid rgba(20,33,61,0.2); font-size: 13px; font-family: "Noto Sans JP", sans-serif; opacity: 0.5; cursor: not-allowed; }
.hg-contact-form button { width: 100%; padding: 14px; background: var(--hg-navy); color: var(--hg-ivory); border: none; font-size: 13px; font-weight: 700; letter-spacing: 0.15em; opacity: 0.5; cursor: not-allowed; font-family: "Noto Sans JP", sans-serif; }

.hg-footer { padding: 80px 32px 40px; background: var(--hg-navy-deep); color: var(--hg-ivory); text-align: center; }
.hg-footer-mark { margin-bottom: 12px; }
.hg-footer-mark span { display: block; font-size: 11px; color: rgba(245,241,232,0.6); }
.hg-footer-mark strong { display: block; font-size: 28px; font-weight: 700; letter-spacing: 0.08em; margin: 4px 0; }
.hg-footer-mark em { display: block; font-size: 10px; color: rgba(184,50,58,0.8); letter-spacing: 0.3em; font-style: italic; font-family: "Times New Roman", serif; }
.hg-footer-tag { font-size: 14px; color: rgba(245,241,232,0.6); margin: 0 0 32px; font-family: "Noto Serif JP", serif; }
.hg-footer-disclaimer { max-width: 700px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.15); border: 1px solid rgba(212,80,106,0.4); color: rgba(255,255,255,0.85); font-size: 12px; line-height: 1.8; font-family: "Noto Sans JP", sans-serif; }
.hg-footer-disclaimer strong { color: #ff8fa6; }
.hg-footer-cr { font-size: 11px; color: rgba(245,241,232,0.35); font-family: "Noto Sans JP", sans-serif; }

.hg-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--hg-pink); color: #fff; padding: 10px 16px; border-radius: 2px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; font-family: "Noto Sans JP", sans-serif; }
.hg-floating-warning-icon { background: #fff; color: var(--hg-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.hg-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.hg-reveal.is-visible { opacity: 1; transform: translateY(0); }

@keyframes hg-rise { to { opacity: 1; transform: translateY(0); } }
@keyframes hg-scroll { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }
`
