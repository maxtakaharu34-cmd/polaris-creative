import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS CLINIC — クリニックテンプレート
   技術: SVG パスストロークアニメーション
        + IntersectionObserver
        + 心電図のような波形アニメ (CSS animation)
        + 数字カウントアップ
   テイスト: 清潔・信頼・静謐な動き
   ============================================================ */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=2400&q=85',
  doctor: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=85',
  reception: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85',
  exam: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=85',
  staff1: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85',
  staff2: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=85',
  staff3: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=85',
}

function CountUp({ to, suffix = '', duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(to * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

export default function ClinicPremiumDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  /* SVG パスをスクロール位置に応じて描画 */
  useEffect(() => {
    const paths = document.querySelectorAll<SVGPathElement>('.cl-stroke-path')
    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })
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
    document.querySelectorAll('.cl-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="cl-root">
      <style>{cssText}</style>

      {/* 警告 */}
      <div className="cl-warning">
        <div className="cl-warning-row">
          <span className="cl-warning-pill">SAMPLE</span>
          <span className="cl-warning-text">
            ⚠️ <b>POLARIS CLINIC</b> は<b className="cl-warning-emph">実在しない仮想クリニック</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="cl-warning-back">← 戻る</a>
        </div>
        <div className="cl-warning-strip">
          ⚠️ 注意：クリニック名・住所・電話番号・医師名・診療内容などはすべて<u>架空</u>です。
        </div>
      </div>

      {/* Header */}
      <header className="cl-header">
        <a href="#" className="cl-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="cl-logo-mark" aria-hidden>
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M20 10 L20 30 M10 20 L30 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div className="cl-logo-text">
            <strong>POLARIS CLINIC</strong>
            <span>ポラリスクリニック（架空）</span>
          </div>
        </a>
        <nav className={`cl-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>はじめての方へ</a>
          <a href="#dept" onClick={() => setMenuOpen(false)}>診療科目</a>
          <a href="#staff" onClick={() => setMenuOpen(false)}>医師紹介</a>
          <a href="#access" onClick={() => setMenuOpen(false)}>アクセス</a>
        </nav>
        <button className="cl-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#book" className="cl-book-btn">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="12" height="11" rx="1"/>
            <path d="M2 6 L14 6 M5 1 L5 4 M11 1 L11 4"/>
          </svg>
          WEB予約（仮）
        </a>
      </header>

      {/* Hero */}
      <section className="cl-hero">
        <div className="cl-hero-bg" style={{ backgroundImage: `url("${IMG.hero}")` }}/>
        <div className="cl-hero-overlay"/>

        <div className="cl-hero-grid">
          <div className="cl-hero-grid-inner">
            {Array.from({ length: 6 * 8 }).map((_, i) => (
              <span key={i} className="cl-grid-dot" style={{ animationDelay: `${(i % 8) * 0.05}s` }}/>
            ))}
          </div>
        </div>

        <div className="cl-hero-watermark">SAMPLE 仮想</div>
        <div className="cl-hero-badge">※ これは架空のデザイン見本です</div>

        <div className="cl-hero-content">
          <p className="cl-hero-eyebrow">— Family Medical Care —</p>
          <h1 className="cl-hero-title">
            <span>心と身体に、</span>
            <span>寄り添う医療を。</span>
          </h1>
          <p className="cl-hero-sub">
            ※架空クリニック｜内科・小児科・皮膚科<br/>
            お子様からご年配の方まで、地域の皆さまの健康を支えます。
          </p>

          {/* 心電図ライン */}
          <svg viewBox="0 0 600 60" className="cl-pulse" aria-hidden>
            <path
              d="M0 30 L100 30 L120 30 L130 10 L145 50 L160 20 L175 30 L260 30 L280 30 L290 5 L305 55 L320 30 L600 30"
              stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>

          <div className="cl-hero-cta">
            <a href="#book" className="cl-btn cl-btn-fill">
              <span>WEB予約（仮）</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="tel:0300000000" className="cl-btn cl-btn-ghost">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              03-0000-0000（架空）
            </a>
          </div>
        </div>

        {/* Quick info card */}
        <div className="cl-hero-info">
          <h3>診療時間（架空）</h3>
          <table>
            <thead>
              <tr><th></th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th><th>日</th></tr>
            </thead>
            <tbody>
              <tr><td>9:00 - 12:30</td><td>●</td><td>●</td><td>●</td><td>—</td><td>●</td><td>●</td><td>—</td></tr>
              <tr><td>15:00 - 18:30</td><td>●</td><td>●</td><td>●</td><td>—</td><td>●</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
          <p className="cl-fake">※ 診療時間は架空のサンプル表示です</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="cl-about">
        <div className="cl-about-grid">
          <div className="cl-about-text cl-reveal">
            <span className="cl-eyebrow">— About —</span>
            <h2 className="cl-h2">
              いつも、<br/>
              <em>安心できる場所へ。</em>
            </h2>
            <p className="cl-about-body">
              POLARIS CLINIC は、地域に根ざしたかかりつけ医として、<br/>
              <u>「丁寧な診察」「分かりやすい説明」「相談しやすい空間」</u>を大切にしています。<br/>
              <span className="cl-fake">※このページは仮想クリニックのデザイン見本です。</span>
            </p>

            <div className="cl-stats">
              <div className="cl-stat">
                <strong><CountUp to={45000} suffix="+" /></strong>
                <span>累計来院数（架空）</span>
              </div>
              <div className="cl-stat">
                <strong><CountUp to={15} suffix="年" /></strong>
                <span>地域での実績（架空）</span>
              </div>
              <div className="cl-stat">
                <strong><CountUp to={98} suffix="%" /></strong>
                <span>患者満足度（架空）</span>
              </div>
            </div>
          </div>
          <div className="cl-about-img cl-reveal">
            <img src={IMG.reception} alt="" loading="lazy"/>
            <div className="cl-img-stamp">SAMPLE</div>
          </div>
        </div>
      </section>

      {/* Department */}
      <section id="dept" className="cl-dept">
        <div className="cl-dept-head cl-reveal">
          <span className="cl-eyebrow">— Department —</span>
          <h2 className="cl-h2">診療科目</h2>
          <p className="cl-fake-pill">※ 診療科目はすべて架空のサンプル表示です</p>
        </div>
        <div className="cl-dept-grid">
          {[
            {
              name: '内科', en: 'Internal Medicine',
              desc: '一般内科・生活習慣病・予防接種など、幅広い内科疾患に対応します。',
              icon: (
                <svg viewBox="0 0 60 60" className="cl-dept-icon" aria-hidden>
                  <circle className="cl-stroke-path" cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path className="cl-stroke-path" d="M20 30 Q25 22 30 30 T40 30" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              ),
            },
            {
              name: '小児科', en: 'Pediatrics',
              desc: '0歳からのお子様の風邪・予防接種・発育相談に対応します。',
              icon: (
                <svg viewBox="0 0 60 60" className="cl-dept-icon" aria-hidden>
                  <circle className="cl-stroke-path" cx="30" cy="22" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path className="cl-stroke-path" d="M15 50 Q30 36 45 50" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              ),
            },
            {
              name: '皮膚科', en: 'Dermatology',
              desc: '湿疹・アトピー・ニキビ・ほくろなど、皮膚のお悩みに対応します。',
              icon: (
                <svg viewBox="0 0 60 60" className="cl-dept-icon" aria-hidden>
                  <path className="cl-stroke-path" d="M15 30 Q15 15 30 15 Q45 15 45 30 Q45 45 30 45 Q15 45 15 30 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle className="cl-stroke-path" cx="25" cy="28" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle className="cl-stroke-path" cx="35" cy="32" r="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              ),
            },
            {
              name: 'アレルギー科', en: 'Allergy',
              desc: '花粉症・食物アレルギー・喘息など、アレルギー全般を診療します。',
              icon: (
                <svg viewBox="0 0 60 60" className="cl-dept-icon" aria-hidden>
                  <path className="cl-stroke-path" d="M30 10 L30 50 M10 30 L50 30 M16 16 L44 44 M44 16 L16 44" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <circle className="cl-stroke-path" cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              ),
            },
            {
              name: '健康診断', en: 'Health Check',
              desc: '企業健診・人間ドック・特定健診などに対応します。',
              icon: (
                <svg viewBox="0 0 60 60" className="cl-dept-icon" aria-hidden>
                  <rect className="cl-stroke-path" x="14" y="10" width="32" height="40" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path className="cl-stroke-path" d="M22 22 L38 22 M22 30 L38 30 M22 38 L32 38" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              name: '予防接種', en: 'Vaccination',
              desc: 'インフルエンザ・各種定期予防接種に対応します。',
              icon: (
                <svg viewBox="0 0 60 60" className="cl-dept-icon" aria-hidden>
                  <path className="cl-stroke-path" d="M40 10 L50 20 M35 15 L45 25 M15 50 L30 35 L25 30 L40 15 L45 20 L30 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
                </svg>
              ),
            },
          ].map((d) => (
            <div key={d.name} className="cl-dept-card cl-reveal">
              <div className="cl-dept-card-icon">{d.icon}</div>
              <h3>{d.name}<small>（架空）</small></h3>
              <p className="cl-dept-card-en">{d.en}</p>
              <p className="cl-dept-card-desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="cl-staff">
        <div className="cl-staff-head cl-reveal">
          <span className="cl-eyebrow">— Doctors —</span>
          <h2 className="cl-h2">医師紹介</h2>
          <p className="cl-fake-pill">※ 医師情報はすべて架空のサンプル表示です</p>
        </div>
        <div className="cl-staff-grid">
          {[
            { name: 'Dr. 田中（架空）', role: '院長 / 内科', img: IMG.staff1, bio: '日本内科学会認定医・総合診療指導医（架空）。地域医療に20年従事。' },
            { name: 'Dr. 佐藤（架空）', role: '小児科', img: IMG.staff2, bio: '日本小児科学会専門医（架空）。お子様の発達や育児相談も。' },
            { name: 'Dr. 鈴木（架空）', role: '皮膚科', img: IMG.staff3, bio: '日本皮膚科学会専門医（架空）。アトピー・美容皮膚科対応。' },
          ].map((s) => (
            <div key={s.name} className="cl-staff-card cl-reveal">
              <div className="cl-staff-img" style={{ backgroundImage: `url("${s.img}")` }}>
                <div className="cl-img-stamp">SAMPLE</div>
              </div>
              <p className="cl-staff-role">{s.role}</p>
              <h3 className="cl-staff-name">{s.name}</h3>
              <p className="cl-staff-bio">{s.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Access */}
      <section id="access" className="cl-access">
        <div className="cl-access-grid">
          <div className="cl-access-text cl-reveal">
            <span className="cl-eyebrow">— Access —</span>
            <h2 className="cl-h2">アクセス</h2>
            <dl className="cl-access-info">
              <dt>住所（架空）</dt>
              <dd>〒000-0000<br/>東京都〇〇区〇〇 0-0-0（実在しません）</dd>
              <dt>電話（架空）</dt>
              <dd>03-0000-0000</dd>
              <dt>診療時間（架空）</dt>
              <dd>午前 9:00〜12:30 / 午後 15:00〜18:30<br/>休診日：木曜・日曜・祝日</dd>
              <dt>アクセス（架空）</dt>
              <dd>JR〇〇駅 北口より徒歩〇分</dd>
            </dl>
          </div>
          <div className="cl-access-map cl-reveal">
            <div className="cl-access-map-fake">
              <span>※ 地図はサンプル表示</span>
              <span className="cl-fake-small">実在の場所ではありません</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="cl-cta">
        <div className="cl-cta-content cl-reveal">
          <span className="cl-eyebrow">— Booking —</span>
          <h2 className="cl-cta-h">ご予約は、<br/>WEB／お電話で。</h2>
          <p className="cl-cta-sub">※ ボタンは動作しません。仮想クリニックのデザイン見本です。</p>
          <div className="cl-cta-btns">
            <a href="#" className="cl-btn cl-btn-fill cl-btn-large">WEB予約（仮）</a>
            <a href="#" className="cl-btn cl-btn-ghost cl-btn-large">03-0000-0000（架空）</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="cl-footer">
        <div className="cl-footer-content">
          <div className="cl-footer-logo">
            <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden>
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M20 10 L20 30 M10 20 L30 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <strong>POLARIS CLINIC</strong>
          </div>
          <p className="cl-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「POLARIS CLINIC」という<u>実在しない仮想クリニック</u>のデザイン見本です。<br/>
            クリニック名・住所・電話番号・医師名・診療時間・実績数値などはすべて<u>架空</u>です。
          </p>
          <p className="cl-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
        </div>
      </footer>

      <div className="cl-floating-warning">
        <span className="cl-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想クリニックです</span>
      </div>
    </div>
  )
}

const cssText = `
.cl-root {
  --cl-bg: #ffffff;
  --cl-bg-soft: #f4f9fc;
  --cl-fg: #1f3a5f;
  --cl-fg-soft: rgba(31, 58, 95, 0.7);
  --cl-accent: #06b6d4;
  --cl-accent-dark: #0891b2;
  --cl-pink: #ec4899;
  background: var(--cl-bg);
  color: var(--cl-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
  overflow-x: hidden;
}
.cl-root *, .cl-root *::before, .cl-root *::after { box-sizing: border-box; }

/* Warning */
.cl-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--cl-pink);
}
.cl-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.cl-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.cl-warning-text { flex: 1; min-width: 0; }
.cl-warning-emph { color: var(--cl-pink); }
.cl-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.cl-warning-back:hover { background: var(--cl-pink); color: #fff; }
.cl-warning-strip {
  background: var(--cl-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Header */
.cl-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 16px 32px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(31,58,95,0.08);
}
.cl-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--cl-fg); }
.cl-logo-mark { width: 36px; height: 36px; color: var(--cl-accent); }
.cl-logo-text strong {
  display: block; font-family: "Inter", sans-serif; font-size: 14px; font-weight: 800;
  letter-spacing: 0.05em; line-height: 1.2;
}
.cl-logo-text span {
  display: block; font-size: 10px; color: var(--cl-fg-soft); margin-top: 2px;
}
.cl-nav {
  display: flex; gap: 28px; margin-left: auto;
  font-size: 13px; font-weight: 600;
}
.cl-nav a {
  color: var(--cl-fg); text-decoration: none; padding: 8px 0;
  position: relative; transition: color .3s;
}
.cl-nav a::after {
  content: ''; position: absolute; left: 0; right: 100%; bottom: 0;
  height: 2px; background: var(--cl-accent); transition: right .3s;
}
.cl-nav a:hover { color: var(--cl-accent-dark); }
.cl-nav a:hover::after { right: 0; }

.cl-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer; margin-left: auto;
}
.cl-burger span {
  width: 22px; height: 2px; background: var(--cl-fg); transition: all .3s;
}
.cl-burger span.is-open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
.cl-burger span.is-open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

.cl-book-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--cl-accent); color: #fff;
  padding: 12px 22px; border-radius: 999px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
  text-decoration: none; transition: all .3s;
}
.cl-book-btn:hover { background: var(--cl-accent-dark); transform: translateY(-2px); }

/* Hero */
.cl-hero {
  position: relative; min-height: 100vh;
  display: grid; place-items: center;
  padding: 80px 64px 220px;
  overflow: hidden;
  background: linear-gradient(180deg, #eaf5fa 0%, #ffffff 100%);
}
.cl-hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  opacity: 0.18; filter: saturate(0.9) hue-rotate(180deg);
}
.cl-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(244,249,252,0.95));
}
.cl-hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  display: flex; align-items: center; justify-content: center;
}
.cl-hero-grid-inner {
  display: grid; grid-template-columns: repeat(8, 1fr); gap: 80px;
  width: 80%; max-width: 1200px;
}
.cl-grid-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--cl-accent);
  opacity: 0.3;
  animation: cl-pulse-dot 3s ease-in-out infinite;
}
@keyframes cl-pulse-dot { 0%, 100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.4); } }

.cl-hero-watermark {
  position: absolute; right: 5%; top: 50%; transform: translateY(-50%) rotate(90deg);
  font-family: "Inter", sans-serif; font-weight: 900; font-size: 12vw;
  color: rgba(6, 182, 212, 0.06); letter-spacing: 0.3em;
  white-space: nowrap; pointer-events: none; z-index: 1;
}
.cl-hero-badge {
  position: absolute; top: 24px; right: 24px; z-index: 4;
  background: var(--cl-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}
.cl-hero-content { position: relative; z-index: 2; max-width: 1200px; text-align: center; }
.cl-hero-eyebrow {
  font-family: "Inter", serif; font-style: italic;
  font-size: 14px; letter-spacing: 0.2em; color: var(--cl-accent-dark);
  margin: 0 0 24px;
}
.cl-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(40px, 6vw, 96px); line-height: 1.2;
  margin: 0 0 32px; letter-spacing: -0.02em;
}
.cl-hero-title span {
  display: inline-block;
  background: linear-gradient(110deg, var(--cl-fg) 0%, var(--cl-accent-dark) 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: cl-rise 1.2s cubic-bezier(.2,.8,.3,1) both;
}
.cl-hero-title span:nth-child(2) { animation-delay: .2s; }
@keyframes cl-rise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.cl-hero-sub {
  font-size: 14px; line-height: 2; color: var(--cl-fg-soft); margin: 0 0 32px;
}
.cl-pulse {
  width: 100%; max-width: 600px; height: 60px; margin: 0 auto;
  color: var(--cl-accent); display: block;
}
.cl-pulse path {
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: cl-pulse-line 2.4s ease-out forwards 1s, cl-pulse-pulse 2.5s ease-in-out 3.5s infinite;
}
@keyframes cl-pulse-line { to { stroke-dashoffset: 0; } }
@keyframes cl-pulse-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

.cl-hero-cta {
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 32px;
}
.cl-hero-info {
  position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%);
  background: #fff; border-radius: 12px; padding: 24px 32px;
  box-shadow: 0 24px 60px rgba(31,58,95,0.12);
  border: 1px solid rgba(6,182,212,0.15);
  z-index: 3; min-width: 600px;
}
.cl-hero-info h3 {
  font-size: 13px; font-weight: 700; margin: 0 0 12px;
  color: var(--cl-accent-dark); letter-spacing: 0.1em;
}
.cl-hero-info table { width: 100%; border-collapse: collapse; font-size: 12px; }
.cl-hero-info th, .cl-hero-info td {
  padding: 8px 6px; text-align: center; border-bottom: 1px solid rgba(31,58,95,0.08);
}
.cl-hero-info th { font-weight: 600; color: var(--cl-fg-soft); }
.cl-hero-info td:first-child { text-align: left; font-weight: 600; }
.cl-fake { font-size: 10px; color: var(--cl-pink); font-weight: 700; margin-top: 8px; display: block; }

/* Buttons */
.cl-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 26px; border-radius: 999px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
  text-decoration: none; cursor: pointer; border: 1px solid transparent;
  transition: all .3s ease;
}
.cl-btn-fill { background: var(--cl-accent); color: #fff; box-shadow: 0 12px 32px rgba(6,182,212,0.3); }
.cl-btn-fill:hover { background: var(--cl-accent-dark); transform: translateY(-2px); }
.cl-btn-ghost { background: #fff; color: var(--cl-fg); border-color: rgba(31,58,95,0.2); }
.cl-btn-ghost:hover { border-color: var(--cl-accent); color: var(--cl-accent-dark); }
.cl-btn-large { padding: 18px 36px; font-size: 13px; }

/* Common */
.cl-eyebrow {
  font-family: "Inter", serif; font-style: italic;
  font-size: 13px; letter-spacing: 0.2em; color: var(--cl-accent-dark);
}
.cl-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(36px, 5vw, 72px); line-height: 1.3;
  margin: 12px 0 32px; letter-spacing: -0.02em;
}
.cl-h2 em { font-style: normal; color: var(--cl-accent-dark); }
.cl-fake-pill {
  display: inline-block; padding: 5px 14px;
  background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4);
  color: var(--cl-pink); border-radius: 999px;
  font-size: 11px; font-weight: 700; margin: 4px 0 0;
}
.cl-img-stamp {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-size: 10px; font-weight: 800; padding: 3px 8px;
  border-radius: 3px; letter-spacing: 0.15em;
}

/* Reveal */
.cl-reveal { opacity: 0; transform: translateY(40px); transition: opacity .9s ease, transform .9s ease; }
.cl-reveal.is-visible { opacity: 1; transform: translateY(0); }
.cl-reveal.is-visible .cl-stroke-path {
  animation: cl-stroke 1.4s cubic-bezier(.65,0,.35,1) forwards;
}
@keyframes cl-stroke { to { stroke-dashoffset: 0; } }

/* About */
.cl-about { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.cl-about-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 80px; align-items: center; }
.cl-about-body { font-size: 14px; line-height: 2; color: var(--cl-fg-soft); margin: 0 0 40px; }
.cl-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cl-stat {
  background: var(--cl-bg-soft); padding: 24px;
  border-radius: 8px; border: 1px solid rgba(6,182,212,0.15);
}
.cl-stat strong {
  display: block; font-family: "Inter", serif; font-weight: 900;
  font-size: 36px; color: var(--cl-accent-dark); line-height: 1;
}
.cl-stat span {
  display: block; font-size: 11px; color: var(--cl-fg-soft); margin-top: 8px;
}
.cl-about-img {
  position: relative; aspect-ratio: 4/5; overflow: hidden; border-radius: 12px;
}
.cl-about-img img { width: 100%; height: 100%; object-fit: cover; }

/* Department */
.cl-dept {
  padding: 140px 64px; background: var(--cl-bg-soft);
}
.cl-dept-head { text-align: center; max-width: 800px; margin: 0 auto 60px; }
.cl-dept-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  max-width: 1280px; margin: 0 auto;
}
.cl-dept-card {
  background: #fff; padding: 36px 28px; border-radius: 12px;
  border: 1px solid rgba(6,182,212,0.1);
  transition: transform .4s, box-shadow .4s;
}
.cl-dept-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(31,58,95,0.1);
}
.cl-dept-card-icon {
  width: 60px; height: 60px; color: var(--cl-accent); margin-bottom: 20px;
}
.cl-dept-card h3 {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 700;
  margin: 0 0 4px;
}
.cl-dept-card h3 small {
  font-size: 11px; color: var(--cl-pink); font-weight: 600;
}
.cl-dept-card-en {
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 600;
  letter-spacing: 0.15em; color: var(--cl-accent-dark); margin: 0 0 12px;
}
.cl-dept-card-desc {
  font-size: 13px; line-height: 1.8; color: var(--cl-fg-soft); margin: 0;
}

/* Staff */
.cl-staff { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.cl-staff-head { text-align: center; max-width: 800px; margin: 0 auto 60px; }
.cl-staff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.cl-staff-card { text-align: left; }
.cl-staff-img {
  position: relative; aspect-ratio: 4/5; overflow: hidden;
  background-size: cover; background-position: center;
  border-radius: 12px; margin-bottom: 20px;
}
.cl-staff-role {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: var(--cl-accent-dark); margin: 0 0 4px; text-transform: uppercase;
}
.cl-staff-name {
  font-family: "Noto Serif JP", serif; font-size: 22px; font-weight: 700;
  margin: 0 0 8px;
}
.cl-staff-bio { font-size: 12px; color: var(--cl-fg-soft); line-height: 1.7; margin: 0; }

/* Access */
.cl-access { padding: 140px 64px; max-width: 1280px; margin: 0 auto; }
.cl-access-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
.cl-access-info {
  display: grid; grid-template-columns: 100px 1fr; gap: 16px 24px;
  margin: 32px 0 0;
}
.cl-access-info dt {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.15em;
  color: var(--cl-accent-dark); text-transform: uppercase; padding-top: 4px;
}
.cl-access-info dd { margin: 0; font-size: 14px; line-height: 1.7; }
.cl-access-map-fake {
  width: 100%; aspect-ratio: 4/3; border-radius: 12px;
  background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(8,145,178,0.05));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; border: 1px dashed rgba(6,182,212,0.4);
}
.cl-access-map-fake span:first-child {
  font-size: 14px; font-weight: 700; color: var(--cl-fg-soft);
}
.cl-fake-small { font-size: 11px; color: var(--cl-pink) !important; }

/* CTA */
.cl-cta {
  padding: 120px 32px; text-align: center;
  background: linear-gradient(135deg, var(--cl-accent) 0%, var(--cl-accent-dark) 100%);
  color: #fff; position: relative; overflow: hidden;
}
.cl-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2), transparent 50%);
}
.cl-cta-content { position: relative; max-width: 700px; margin: 0 auto; }
.cl-cta .cl-eyebrow { color: rgba(255,255,255,0.7); }
.cl-cta-h {
  font-family: "Noto Serif JP", serif; font-weight: 700;
  font-size: clamp(36px, 5vw, 64px); line-height: 1.4; margin: 12px 0 16px; color: #fff;
}
.cl-cta-sub { font-size: 13px; opacity: 0.85; margin: 0 0 32px; }
.cl-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.cl-cta .cl-btn-fill { background: #fff; color: var(--cl-accent-dark); box-shadow: none; }
.cl-cta .cl-btn-fill:hover { background: var(--cl-fg); color: #fff; }
.cl-cta .cl-btn-ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,0.5); }
.cl-cta .cl-btn-ghost:hover { background: #fff; color: var(--cl-accent-dark); }

/* Footer */
.cl-footer {
  padding: 60px 32px 40px; background: var(--cl-fg); color: #fff;
  text-align: center;
}
.cl-footer-content { max-width: 800px; margin: 0 auto; }
.cl-footer-logo {
  display: inline-flex; align-items: center; gap: 10px;
  margin-bottom: 24px; color: #fff;
}
.cl-footer-logo strong { font-family: "Inter", sans-serif; font-size: 16px; font-weight: 800; }
.cl-footer-disclaimer {
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4);
  padding: 14px 20px; border-radius: 4px; margin: 0 0 24px;
}
.cl-footer-disclaimer strong { color: var(--cl-pink); }
.cl-footer-cr { font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; }

/* Floating warning */
.cl-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--cl-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.cl-floating-warning-icon {
  background: #fff; color: var(--cl-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 900px) {
  .cl-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .cl-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: #fff;
    box-shadow: 0 12px 32px rgba(0,0,0,0.1);
    padding: 0; max-height: 0; overflow: hidden;
    transition: max-height .4s, padding .4s;
  }
  .cl-nav.is-open { max-height: 400px; padding: 16px 0; }
  .cl-nav a { padding: 14px 24px; }
  .cl-burger { display: flex; }
  .cl-book-btn { display: none; }
  .cl-hero { padding: 60px 24px 280px; }
  .cl-hero-info { left: 24px; right: 24px; transform: none; min-width: auto; }
  .cl-hero-info { padding: 16px 18px; }
  .cl-hero-info table { font-size: 11px; }
  .cl-hero-info th, .cl-hero-info td { padding: 6px 4px; }
  .cl-about, .cl-dept, .cl-staff, .cl-access { padding: 80px 24px; }
  .cl-about-grid, .cl-access-grid { grid-template-columns: 1fr; gap: 40px; }
  .cl-dept-grid { grid-template-columns: 1fr; }
  .cl-staff-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .cl-stats { grid-template-columns: 1fr; }
  .cl-cta { padding: 80px 24px; }
  .cl-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .cl-warning-row { flex-wrap: wrap; }
}
`
