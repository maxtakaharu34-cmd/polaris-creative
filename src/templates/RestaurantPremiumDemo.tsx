import { useEffect, useRef, useState } from 'react'

/* ============================================================
   ポラリス食堂 — 先進的な飲食店テンプレート
   参考: シーサイドイタリアン カンティーナ (PixiJS + GSAP)
   実装: GSAP + ScrollTrigger (CDN), CSS, SVG, React のみ
   ============================================================ */

declare global {
  interface Window {
    gsap?: any
    ScrollTrigger?: any
  }
}

/* GSAP を CDN から動的に読み込む */
function useGsap() {
  const [ready, setReady] = useState(!!window.gsap && !!window.ScrollTrigger)
  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) { setReady(true); return }
    const load = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const exists = document.querySelector(`script[src="${src}"]`)
        if (exists) { exists.addEventListener('load', () => resolve()); return }
        const s = document.createElement('script')
        s.src = src; s.async = false
        s.onload = () => resolve(); s.onerror = () => reject(new Error(src))
        document.head.appendChild(s)
      })
    ;(async () => {
      try {
        await load('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
        await load('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js')
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger)
          setReady(true)
        }
      } catch (e) { console.warn('GSAP load failed', e) }
    })()
  }, [])
  return ready
}

/* 一文字スプリット用 */
function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`split-text inline-block ${className}`} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ animationDelay: `${delay + i * 0.04}s` }}
          aria-hidden="true"
        >
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  )
}

/* 画像（実在確認済みの Unsplash ID。失敗時はピカソ風プレースホルダにフォールバック） */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85',
  hero2: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2400&q=85',
  hero3: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2400&q=85',
  concept1: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
  concept2: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85',
  menuLunch: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85',
  menuDinner: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1600&q=85',
  menuDrink: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=85',
  party1: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=1200&q=85',
  party2: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=1200&q=85',
  party3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85',
  scene1: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85',
  scene2: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2400&q=85',
  scene3: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=2400&q=85',
}

const NEWS = [
  { date: '2026.04.07', title: '春のシーズンメニュースタート（架空）', body: '春の訪れを感じさせる旬の味わいを、ぜひお楽しみください。' },
  { date: '2026.01.14', title: '冬のシーズンメニュースタート（架空）', body: '冬の味覚をふんだんに取り入れた全8品をご用意致しました。' },
  { date: '2025.12.10', title: 'クリスマス プレミアムコース 先行予約（架空）', body: '席が埋まり次第、受付終了となります。お早目のご連絡をお待ちしております。' },
  { date: '2025.10.31', title: '秋のシーズンメニュースタート（架空）', body: '大好評の素材をふんだんに使った5品をご用意致しました。' },
]

export default function RestaurantPremiumDemo() {
  const ready = useGsap()
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const rootRef = useRef<HTMLDivElement | null>(null)

  /* ローディング表示（2.2秒） */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [])

  /* ヒーロースライドショー */
  useEffect(() => {
    if (loading) return
    const it = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 6000)
    return () => clearInterval(it)
  }, [loading])

  /* GSAP ScrollTrigger アニメーション */
  useEffect(() => {
    if (!ready || loading || !rootRef.current) return
    const gsap = window.gsap
    const ST = window.ScrollTrigger
    const ctx = gsap.context(() => {
      // パララックス画像
      ;(gsap.utils.toArray as (s: string) => HTMLElement[])('.parallax-img').forEach((el) => {
        gsap.fromTo(el, { y: -60 }, {
          y: 60, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
        })
      })
      // フェードアップ
      ;(gsap.utils.toArray as (s: string) => HTMLElement[])('.fade-up').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        })
      })
      // セクションヘディング 一文字ずつ
      ;(gsap.utils.toArray as (s: string) => HTMLElement[])('.scroll-split').forEach((el) => {
        const chars = el.querySelectorAll('.split-char')
        gsap.fromTo(chars, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        })
      })
      // メニュー画像のホバー以外でゆっくり拡大
      ;(gsap.utils.toArray as (s: string) => HTMLElement[])('.kenburn').forEach((el) => {
        gsap.fromTo(el, { scale: 1.05 }, {
          scale: 1.2, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
        })
      })
      // News 行のスライドイン
      ;(gsap.utils.toArray as (s: string) => HTMLElement[])('.news-item').forEach((el, i) => {
        gsap.fromTo(el, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, delay: i * 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        })
      })
    }, rootRef)
    return () => { ctx.revert(); ST.killAll?.() }
  }, [ready, loading])

  return (
    <div ref={rootRef} className="rp-root">
      {/* === STYLES === */}
      <style>{cssText}</style>

      {/* === ローディング === */}
      <div className={`rp-loading ${loading ? '' : 'is-hidden'}`}>
        <svg viewBox="0 0 600 80" className="rp-loading-logo" aria-label="Polaris Shokudo">
          <defs>
            <linearGradient id="rp-load-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.25"/>
              <stop offset="50%" stopColor="#fff" stopOpacity="1"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0.25"/>
            </linearGradient>
            <mask id="rp-load-mask">
              <rect className="rp-load-sweep" x="-300" y="0" width="300" height="80" fill="url(#rp-load-grad)"/>
            </mask>
          </defs>
          <text x="50%" y="58" textAnchor="middle" className="rp-loading-text">POLARIS&nbsp;SHOKUDO</text>
          <text x="50%" y="58" textAnchor="middle" className="rp-loading-text rp-loading-text-fill" mask="url(#rp-load-mask)">POLARIS&nbsp;SHOKUDO</text>
        </svg>
      </div>

      {/* === 警告バナー === */}
      <div className="rp-warning">
        <div className="rp-warning-row">
          <span className="rp-warning-pill">SAMPLE</span>
          <span className="rp-warning-text">⚠️ <b>ポラリス食堂</b> は<b className="rp-warning-emph">実在しない仮想店舗</b>です。デザイン見本としてポラリスクリエイティブが作成しました。</span>
          <a href="#hp" className="rp-warning-back">← 戻る</a>
        </div>
        <div className="rp-warning-strip">
          ⚠️ 注意：店舗名・住所・電話番号・お客様の声などは<u>すべて架空</u>です。実在しません。
        </div>
      </div>

      {/* === ヘッダー === */}
      <header className={`rp-header ${menuOpen ? 'is-open' : ''}`}>
        <button className="rp-hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <svg className="rp-wave-svg" viewBox="0 0 60 21" fill="none">
            <g className="rp-wave-group">
              {[0, 7, 14].map((y, i) => (
                <path key={i}
                  d={`M0 ${y + 7}C 10 ${y - 1}, 20 ${y + 15}, 30 ${y + 7}S 50 ${y - 1}, 60 ${y + 7}`}
                  stroke="currentColor" strokeWidth="1.5" fill="none"/>
              ))}
            </g>
          </svg>
          <span className="rp-hamburger-text">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>

        <a href="#" className="rp-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="rp-logo-en">Polaris</span>
          <span className="rp-logo-jp">食堂</span>
        </a>

        <div className="rp-header-cta">
          <a href="#reservation" className="rp-btn rp-btn-ghost">Take out</a>
          <a href="#reservation" className="rp-btn rp-btn-fill">Reservation</a>
        </div>
      </header>

      {/* === グローバルナビ === */}
      <nav className={`rp-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="rp-nav-inner">
          <p className="rp-nav-eyebrow">natural table</p>
          <div className="rp-nav-content">
            <ul className="rp-nav-list">
              {[
                ['Concept', '#concept'],
                ['Menu', '#menu'],
                ['News', '#news'],
                ['Access', '#access'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={() => setMenuOpen(false)}>
                    <SplitText text={label} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="rp-nav-info">
              <p className="rp-nav-info-copy">POLARIS<br/>SHOKUDO</p>
              <p className="rp-nav-info-hours">
                OPEN 11:00〜21:30<br/>
                Lunch 11:00〜17:00<br/>
                Dinner 17:00〜22:00 (L.O. 21:00)
              </p>
              <p className="rp-nav-info-addr">※架空の住所：東京都〇〇区〇〇 0-0-0（実在しません）</p>
              <p className="rp-nav-info-tel">tel : 03-0000-0000（※架空）</p>
            </div>
          </div>
          <p className="rp-nav-copyright">© POLARIS CREATIVE Inc. — このページは仮想店舗のデザイン見本です。</p>
        </div>
        <svg viewBox="0 0 1440 200" className="rp-nav-wave" preserveAspectRatio="none">
          <path d="M0 0V102C480 -236 960 441 1440 102V0H0Z" fill="#1a1410"/>
        </svg>
      </nav>

      {/* === ヒーロー === */}
      <section className="rp-hero">
        <div className="rp-hero-bg">
          {[IMG.hero, IMG.hero2, IMG.hero3].map((src, i) => (
            <div key={i} className={`rp-hero-bg-img ${i === heroIdx ? 'is-active' : ''}`}
                 style={{ backgroundImage: `url("${src}")` }}/>
          ))}
          <div className="rp-hero-overlay"/>
          <div className="rp-hero-grain"/>
        </div>
        {/* 大きな SAMPLE ウォーターマーク */}
        <div className="rp-hero-watermark">SAMPLE / 仮想</div>
        <div className="rp-hero-badge">※ これは架空のデザイン見本です</div>

        <h1 className="rp-hero-title">
          <svg viewBox="0 0 1280 165" className="rp-hero-title-svg" aria-label="POLARIS SHOKUDO">
            <text x="50%" y="120" textAnchor="middle" className="rp-hero-title-text">SHOKUDO</text>
          </svg>
        </h1>
        <p className="rp-hero-text">
          <span>Scroll</span>
          <span>Polaris Shokudo / Natural Japanese</span>
        </p>
      </section>

      {/* === Concept === */}
      <section id="concept" className="rp-concept">
        <div className="rp-concept-inner">
          <div className="rp-concept-text">
            <h2 className="rp-h2 scroll-split"><SplitText text="concept" /></h2>
            <p className="rp-h-large fade-up">Natural<br/>Table</p>
            <p className="rp-concept-message fade-up">
              <span>
                訪れるその場所には、<br/>
                「美味しい料理が食べられる」「時間を忘れてくつろげる」<br/>
                「四季を感じられる空間」というシンプルな幸せを楽しむことができる。
              </span>
              <span>
                世代を超えて楽しんでいただけるように、<br/>
                テーブルコミュニティーを大切にします。
              </span>
              <span className="rp-fake">※ このテキストは架空のデザイン見本用コピーです。</span>
            </p>
          </div>
          <div className="rp-concept-img-1 parallax-img">
            <img src={IMG.concept1} alt="" loading="lazy"/>
          </div>
          <div className="rp-concept-img-2 parallax-img">
            <img src={IMG.concept2} alt="" loading="lazy"/>
          </div>
        </div>
      </section>

      {/* === Menu === */}
      <section id="menu" className="rp-menu">
        <h2 className="rp-h2 scroll-split rp-menu-heading"><SplitText text="menu" /></h2>
        <p className="rp-fake-pill">※ メニュー・価格はすべて架空の表示例です</p>
        <ul className="rp-menu-list">
          {[
            { en: 'lunch', img: IMG.menuLunch, hours: '11:00〜17:00（架空）' },
            { en: 'dinner', img: IMG.menuDinner, hours: '17:00〜22:00（架空）\nFood 21:00 (L.O.) | Drink 21:30 (L.O.)' },
            { en: 'drink', img: IMG.menuDrink, hours: '' },
          ].map((m) => (
            <li key={m.en} className="rp-menu-item">
              <div className="rp-menu-item-link">
                <h3 className="rp-menu-item-text">
                  <span className="rp-menu-item-h">{m.en}</span>
                  {m.hours && <span className="rp-menu-item-hours">{m.hours}</span>}
                </h3>
                <div className="rp-menu-item-label">
                  <span><SplitText text="View Menu PDF" /></span>
                  <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="rp-menu-line">
                    <rect width="100%" height="2" fill="currentColor"/>
                  </svg>
                </div>
                <div className="rp-menu-item-bg kenburn" style={{ backgroundImage: `url("${m.img}")` }}/>
                <div className="rp-menu-item-stamp">SAMPLE</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* === Party === */}
      <section className="rp-party">
        <div className="rp-party-text">
          <h2 className="rp-h2 rp-h2-blue scroll-split"><SplitText text="Party / Buffet" /></h2>
          <p className="rp-party-message fade-up">
            <span>
              ビュッフェスタイルのパーティーも承っております（架空）。<br/>
              お誕生日や結婚式、二次会、歓送迎会、貸切パーティーでご利用いただけます。
            </span>
            <span>
              ご相談は予約フォームより。<br className="rp-pc-show"/>
              お気軽にお問い合わせください。<span className="rp-fake">※ 架空の案内文</span>
            </span>
          </p>
          <div className="rp-party-link fade-up">
            <p>パーティープラン詳細はこちら（仮）</p>
            <a href="#" className="rp-btn rp-btn-fill">View Menu PDF</a>
          </div>
        </div>
        <div className="rp-party-img-1 parallax-img"><img src={IMG.party1} alt="" loading="lazy"/></div>
        <div className="rp-party-img-2 parallax-img"><img src={IMG.party2} alt="" loading="lazy"/></div>
        <div className="rp-party-img-3 parallax-img"><img src={IMG.party3} alt="" loading="lazy"/></div>
      </section>

      {/* === Scene Sticky === */}
      <ul className="rp-scene">
        {[
          { en: 'lunch', img: IMG.scene1 },
          { en: 'dinner', img: IMG.scene2 },
          { en: 'season', img: IMG.scene3 },
        ].map((s) => (
          <li key={s.en} className="rp-scene-item">
            <div className="rp-scene-inner" style={{ backgroundImage: `url("${s.img}")` }}>
              <p className="rp-scene-text">
                <span className="rp-scene-h">{s.en}</span>
                <span className="rp-scene-hours">
                  OPEN 11:00〜21:30<br/>
                  Lunch 11:00〜17:00<br/>
                  Dinner 17:00〜22:00（架空）
                </span>
              </p>
              <p className="rp-scene-scroll">scroll</p>
            </div>
          </li>
        ))}
        <li className="rp-scene-item rp-scene-spacer" aria-hidden/>
      </ul>

      {/* === News === */}
      <section id="news" className="rp-news">
        <h2 className="rp-h2 rp-h2-light scroll-split"><SplitText text="news" /></h2>
        <p className="rp-fake-pill">※ ニュースはすべて架空のデザイン見本用です</p>
        <ul className="rp-news-list">
          {NEWS.map((n) => (
            <li key={n.date} className="news-item rp-news-item">
              <p className="rp-news-date"><time>{n.date}</time></p>
              <p className="rp-news-text">
                {n.title}<br/>
                <span className="rp-news-body">{n.body}</span>
              </p>
              <span className="rp-btn rp-btn-fill rp-btn-small">メニュー・アレルギー情報</span>
            </li>
          ))}
        </ul>
      </section>

      {/* === Access === */}
      <section id="access" className="rp-access">
        <div className="rp-access-text">
          <h2 className="rp-h2 rp-h2-light scroll-split"><SplitText text="access" /></h2>
          <p className="rp-access-detail fade-up">
            <span>
              〒000-0000（架空）<br/>
              ※架空の住所：東京都〇〇区〇〇 0-0-0（実在しません）<br/>
              TEL : <a href="#">03-0000-0000（※架空）</a>
            </span>
            <span>
              JR「〇〇駅」徒歩〇分（架空）<br/>
              地下鉄「〇〇駅」徒歩〇分（架空）
            </span>
            <span className="rp-fake">※ アクセス情報は架空のデザイン見本用です</span>
          </p>
        </div>
        <div className="rp-access-map fade-up">
          <div className="rp-access-map-fake">
            <span>※ 地図はサンプル表示</span>
            <span className="rp-fake-small">実在の場所ではありません</span>
          </div>
          <a href="#" className="rp-btn-line">Google map（架空）</a>
        </div>
      </section>

      {/* === MyCantina 風 会員 === */}
      <section className="rp-membership">
        <div className="rp-membership-content">
          <h2 className="rp-membership-h">My POLARIS</h2>
          <p className="rp-membership-desc">
            My POLARISとは、ポラリス食堂をより楽しむための会員サービス（架空）。<br/>
            会員登録で最新情報や特典をお届けします。<span className="rp-fake">※ 仮想サービス</span>
          </p>
          <div className="rp-membership-links">
            <a href="#" className="rp-btn rp-btn-fill">新規会員登録（仮）</a>
            <a href="#" className="rp-btn rp-btn-fill">登録内容の変更（仮）</a>
            <a href="#" className="rp-btn rp-btn-fill">退会手続き（仮）</a>
          </div>
        </div>
      </section>

      {/* === Contact / CTA === */}
      <section id="reservation" className="rp-contact">
        <ul className="rp-contact-list">
          <li className="rp-contact-item">
            <a className="rp-contact-link" style={{ backgroundImage: `url("${IMG.menuDinner}")` }}>
              <div className="rp-contact-label">
                <span><SplitText text="Take out" /></span>
                <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="rp-menu-line">
                  <rect width="100%" height="2" fill="currentColor"/>
                </svg>
              </div>
              <div className="rp-contact-stamp">SAMPLE</div>
            </a>
          </li>
          <li className="rp-contact-item">
            <a className="rp-contact-link" style={{ backgroundImage: `url("${IMG.hero}")` }}>
              <div className="rp-contact-label">
                <span><SplitText text="Reservation" /></span>
                <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="rp-menu-line">
                  <rect width="100%" height="2" fill="currentColor"/>
                </svg>
              </div>
              <div className="rp-contact-stamp">SAMPLE</div>
            </a>
          </li>
        </ul>
        <div className="rp-contact-disclaimer">
          ⚠️ 上記ボタンは動作しません。仮想店舗のデザイン見本です。
        </div>
      </section>

      {/* === Footer === */}
      <footer className="rp-footer">
        <div className="rp-footer-bg" style={{ backgroundImage: `url("${IMG.hero3}")` }}/>
        <div className="rp-footer-overlay"/>
        <div className="rp-footer-content">
          <h2 className="rp-footer-logo">
            <svg viewBox="0 0 1280 165" className="rp-footer-logo-svg" aria-label="POLARIS SHOKUDO">
              <text x="50%" y="120" textAnchor="middle" className="rp-hero-title-text">SHOKUDO</text>
            </svg>
          </h2>
          <p className="rp-footer-copy">
            <span>polaris shokudo</span><br/>
            <span className="rp-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</span>
          </p>
          <div className="rp-footer-info">
            <p>OPEN 11:00〜21:30<br/>Lunch 11:00〜17:00<br/>Dinner 17:00〜22:00（架空）</p>
            <p>※架空の住所：東京都〇〇区〇〇 0-0-0（実在しません）<br/>TEL : 03-0000-0000（※架空）</p>
          </div>
          <div className="rp-footer-disclaimer">
            <strong>【重要】</strong> このサイトは「ポラリス食堂」という<u>実在しない仮想店舗</u>のデザイン見本です。<br/>
            店舗名・会社名・住所・電話番号・お客様の声・ニュース等はすべて<u>架空</u>です。
          </div>
        </div>
      </footer>

      {/* フローティング警告 */}
      <div className="rp-floating-warning">
        <span className="rp-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想店舗です</span>
      </div>
    </div>
  )
}

/* ============================================================
   CSS — 全部このファイルに閉じ込める
   ============================================================ */
const cssText = `
.rp-root {
  --rp-bg: #1a1410;
  --rp-fg: #f5e6c8;
  --rp-accent: #c9a063;
  --rp-blue: #1a3a5f;
  --rp-blue-light: #cdd9e4;
  --rp-pink: #ec4899;
  background: var(--rp-bg);
  color: var(--rp-fg);
  font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif;
  position: relative;
  overflow-x: hidden;
}
.rp-root *, .rp-root *::before, .rp-root *::after { box-sizing: border-box; }

/* ===== Loading ===== */
.rp-loading {
  position: fixed; inset: 0; z-index: 1000;
  background: var(--rp-bg);
  display: flex; align-items: center; justify-content: center;
  transition: opacity .8s ease, visibility 0s linear .8s;
}
.rp-loading.is-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
.rp-loading-logo { width: min(70vw, 560px); height: auto; }
.rp-loading-text {
  font-family: "Inter", "Noto Serif JP", serif;
  font-weight: 900; font-size: 56px; letter-spacing: 0.04em;
  fill: rgba(245, 230, 200, 0.18);
}
.rp-loading-text-fill { fill: var(--rp-fg); }
.rp-load-sweep {
  animation: rp-sweep 1.6s cubic-bezier(.6,.05,.3,.95) infinite;
}
@keyframes rp-sweep {
  0% { transform: translateX(0); }
  100% { transform: translateX(900px); }
}

/* ===== Warning ===== */
.rp-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1d1d1f; color: #fff;
  border-bottom: 2px solid var(--rp-pink);
  font-family: "Noto Sans JP", sans-serif;
}
.rp-warning-row {
  display: flex; align-items: center; gap: 12px; padding: 10px 16px;
  font-size: 12px;
}
.rp-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.rp-warning-text { flex: 1; min-width: 0; }
.rp-warning-emph { color: var(--rp-pink); }
.rp-warning-back {
  background: #fff; color: #1d1d1f; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
  transition: all .2s;
}
.rp-warning-back:hover { background: var(--rp-pink); color: #fff; }
.rp-warning-strip {
  background: var(--rp-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* ===== Header ===== */
.rp-header {
  position: fixed; top: 60px; left: 0; right: 0; z-index: 40;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 32px; pointer-events: none;
}
.rp-header > * { pointer-events: auto; }
.rp-hamburger {
  display: flex; align-items: center; gap: 12px;
  background: rgba(26,20,16,0.6); backdrop-filter: blur(8px);
  border: 1px solid rgba(245,230,200,0.2); color: var(--rp-fg);
  padding: 12px 18px; border-radius: 999px; cursor: pointer;
  font-family: "Inter", sans-serif; font-size: 13px; font-weight: 700;
  letter-spacing: 0.1em; transition: all .3s;
}
.rp-hamburger:hover { background: var(--rp-fg); color: var(--rp-bg); }
.rp-wave-svg { width: 36px; height: 14px; }
.rp-wave-group { animation: rp-wave 3s ease-in-out infinite; }
@keyframes rp-wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
.rp-logo {
  display: flex; align-items: baseline; gap: 6px;
  text-decoration: none; color: var(--rp-fg);
}
.rp-logo-en {
  font-family: "Inter", serif; font-size: 22px; font-weight: 900;
  letter-spacing: 0.02em;
}
.rp-logo-jp {
  font-family: "Noto Serif JP", serif; font-size: 16px; font-weight: 700;
  color: var(--rp-accent);
}
.rp-header-cta { display: flex; gap: 10px; }

/* ===== Buttons ===== */
.rp-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 22px; border-radius: 999px;
  font-family: "Inter", "Noto Sans JP", sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
  text-decoration: none; cursor: pointer; border: 0;
  transition: all .3s ease;
}
.rp-btn-ghost { background: transparent; color: var(--rp-fg); border: 1px solid rgba(245,230,200,0.3); }
.rp-btn-ghost:hover { background: var(--rp-fg); color: var(--rp-bg); }
.rp-btn-fill { background: var(--rp-accent); color: var(--rp-bg); }
.rp-btn-fill:hover { background: var(--rp-fg); }
.rp-btn-small { padding: 8px 16px; font-size: 11px; }
.rp-btn-line {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.1em; color: var(--rp-fg);
  text-decoration: none; padding-bottom: 4px;
  border-bottom: 1px solid rgba(245,230,200,0.4);
}

/* ===== Nav (overlay) ===== */
.rp-nav {
  position: fixed; inset: 0; z-index: 45;
  background: linear-gradient(180deg, rgba(26,20,16,0.96), rgba(26,20,16,0.99));
  backdrop-filter: blur(12px);
  transform: translateY(-100%); transition: transform .8s cubic-bezier(.7,0,.3,1);
  display: flex; flex-direction: column;
}
.rp-nav.is-open { transform: translateY(0); }
.rp-nav-inner {
  flex: 1; display: flex; flex-direction: column;
  max-width: 1280px; margin: 0 auto; width: 100%;
  padding: 140px 48px 40px; justify-content: space-between;
}
.rp-nav-eyebrow {
  font-family: "Inter", serif; font-size: 14px; letter-spacing: 0.2em;
  font-weight: 600; color: var(--rp-accent); margin: 0 0 32px;
}
.rp-nav-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.rp-nav-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 18px; }
.rp-nav-list a {
  font-family: "Inter", sans-serif; font-size: 48px; font-weight: 700;
  text-transform: capitalize; color: var(--rp-fg); text-decoration: none;
  transition: color .3s, transform .3s; display: inline-block;
}
.rp-nav-list a:hover { color: var(--rp-accent); transform: translateX(8px); }
.rp-nav-info-copy {
  font-family: "Inter", serif; font-size: 56px; font-weight: 900;
  line-height: 0.9; margin: 0 0 24px; color: var(--rp-fg);
}
.rp-nav-info-hours, .rp-nav-info-addr, .rp-nav-info-tel {
  font-size: 13px; line-height: 1.8; color: rgba(245,230,200,0.75); margin: 0 0 12px;
}
.rp-nav-copyright { font-size: 11px; color: rgba(245,230,200,0.4); margin: 24px 0 0; }
.rp-nav-wave {
  position: absolute; bottom: -1px; left: 0; right: 0;
  width: 100%; height: 120px;
}

/* ===== Hero ===== */
.rp-hero {
  position: relative; height: 100vh; min-height: 640px; overflow: hidden;
}
.rp-hero-bg { position: absolute; inset: 0; }
.rp-hero-bg-img {
  position: absolute; inset: 0; background-size: cover; background-position: center;
  opacity: 0; transform: scale(1.08);
  transition: opacity 2s ease, transform 8s ease-out;
}
.rp-hero-bg-img.is-active { opacity: 1; transform: scale(1); }
.rp-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(26,20,16,0.45) 0%,
    rgba(26,20,16,0.25) 40%,
    rgba(26,20,16,0.65) 100%);
}
.rp-hero-grain {
  position: absolute; inset: 0; opacity: 0.18; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
.rp-hero-watermark {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-family: "Inter", sans-serif; font-weight: 900; letter-spacing: 0.3em;
  font-size: 14vw; color: rgba(255,255,255,0.13);
  transform: rotate(-20deg); white-space: nowrap; pointer-events: none;
  z-index: 5; text-shadow: 0 0 40px rgba(0,0,0,0.4);
}
.rp-hero-badge {
  position: absolute; top: 24px; right: 24px; z-index: 10;
  background: var(--rp-pink); color: #fff;
  font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 8px 24px rgba(236,72,153,0.4);
}
.rp-hero-title {
  position: absolute; left: 0; right: 0; bottom: 80px;
  text-align: center; z-index: 10; margin: 0; padding: 0 24px;
  pointer-events: none;
}
.rp-hero-title-svg {
  width: min(85vw, 1100px); height: auto;
  filter: drop-shadow(0 4px 30px rgba(0,0,0,0.5));
}
.rp-hero-title-text {
  font-family: "Inter", "Noto Serif JP", serif;
  font-size: 165px; font-weight: 900; letter-spacing: -0.01em;
  fill: #fff;
  animation: rp-fade-in 1.4s ease-out .8s both;
}
@keyframes rp-fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.rp-hero-text {
  position: absolute; bottom: 28px; right: 32px; z-index: 10;
  display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: rgba(255,255,255,0.85); margin: 0;
}
.rp-hero-text > span:first-child { animation: rp-bounce 1.8s ease-in-out infinite; }
@keyframes rp-bounce { 0%,100% { transform: translateY(0);} 50% { transform: translateY(6px);} }

/* ===== Headings ===== */
.rp-h2 {
  font-family: "Inter", sans-serif; font-size: 16px;
  letter-spacing: 0.4em; text-transform: uppercase; font-weight: 700;
  color: var(--rp-accent); margin: 0;
}
.rp-h2-blue { color: var(--rp-blue); }
.rp-h2-light { color: var(--rp-blue-light); }
.rp-h-large {
  font-family: "Inter", "Noto Serif JP", serif;
  font-size: clamp(56px, 9vw, 140px); font-weight: 900; line-height: 0.95;
  letter-spacing: -0.02em; margin: 24px 0 40px;
}
.rp-fake {
  display: inline-block; margin-top: 8px; font-size: 10px;
  color: var(--rp-pink); font-family: "Noto Sans JP", sans-serif;
  font-weight: 700;
}
.rp-fake-pill {
  display: inline-block; margin: 12px auto 32px; padding: 4px 14px;
  background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4);
  color: var(--rp-pink); border-radius: 999px;
  font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700;
  text-align: center;
}

/* ===== Concept ===== */
.rp-concept {
  padding: 140px 48px 160px; max-width: 1280px; margin: 0 auto;
  position: relative;
}
.rp-concept-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 60px 80px; align-items: start;
}
.rp-concept-text { grid-column: 1; grid-row: 1 / span 2; }
.rp-concept-img-1 {
  grid-column: 2; grid-row: 1; aspect-ratio: 4 / 5; overflow: hidden;
  border-radius: 4px; transform: translateY(40px);
}
.rp-concept-img-2 {
  grid-column: 2; grid-row: 2; aspect-ratio: 5 / 4; overflow: hidden;
  border-radius: 4px; margin-left: -120px; margin-top: -80px; z-index: -1; position: relative;
}
.rp-concept-img-1 img, .rp-concept-img-2 img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.rp-concept-message {
  font-family: "Noto Serif JP", serif; font-size: 14px; line-height: 2.2;
  color: rgba(245,230,200,0.85); margin: 0;
}
.rp-concept-message > span { display: block; margin-bottom: 28px; }

/* ===== Menu ===== */
.rp-menu {
  background: linear-gradient(180deg, var(--rp-bg) 0%, #0f0a06 100%);
  padding: 100px 0 140px; text-align: center; position: relative;
}
.rp-menu-heading { display: block; }
.rp-menu-list {
  list-style: none; padding: 0 32px; margin: 0;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 8px; max-width: 1400px; margin: 0 auto;
}
.rp-menu-item-link {
  position: relative; display: block; aspect-ratio: 3 / 4; overflow: hidden;
  text-decoration: none; color: #fff; cursor: pointer;
}
.rp-menu-item-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.65);
  transition: filter .6s, transform .6s;
}
.rp-menu-item-link:hover .rp-menu-item-bg { filter: brightness(0.85); }
.rp-menu-item-text {
  position: absolute; left: 32px; top: 32px; right: 32px; z-index: 2;
  text-align: left; margin: 0;
}
.rp-menu-item-h {
  display: block; font-family: "Inter", serif;
  font-size: clamp(40px, 5vw, 72px); font-weight: 900;
  letter-spacing: -0.01em; line-height: 0.95;
  text-transform: capitalize; color: #fff;
}
.rp-menu-item-hours {
  display: block; margin-top: 12px;
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.85); white-space: pre-line;
}
.rp-menu-item-label {
  position: absolute; left: 32px; right: 32px; bottom: 32px; z-index: 2;
  display: flex; flex-direction: column; gap: 8px;
  font-family: "Inter", sans-serif; font-size: 12px; letter-spacing: 0.15em;
  color: #fff; text-align: left;
}
.rp-menu-line { width: 100%; height: 2px; }
.rp-menu-item-stamp {
  position: absolute; right: 12px; top: 12px; z-index: 3;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 3px; letter-spacing: 0.1em;
}

/* ===== Party ===== */
.rp-party {
  padding: 160px 48px; max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
  background: #f3f1ec; color: #2c241c; position: relative;
  border-radius: 4px;
}
.rp-party-text { padding: 24px 0; }
.rp-party-message {
  font-family: "Noto Serif JP", serif; font-size: 14px; line-height: 2.2;
  margin: 32px 0;
}
.rp-party-message > span { display: block; margin-bottom: 24px; }
.rp-party-link p {
  font-family: "Noto Sans JP", sans-serif; font-size: 12px;
  margin: 0 0 12px; opacity: 0.7;
}
.rp-party-img-1, .rp-party-img-2, .rp-party-img-3 {
  position: absolute; overflow: hidden; border-radius: 4px;
}
.rp-party-img-1 {
  top: -40px; right: 48px; width: 320px; aspect-ratio: 3 / 4;
}
.rp-party-img-2 {
  bottom: 60px; right: 240px; width: 220px; aspect-ratio: 1;
}
.rp-party-img-3 {
  top: 200px; right: 380px; width: 180px; aspect-ratio: 4 / 5;
}
.rp-party-img-1 img, .rp-party-img-2 img, .rp-party-img-3 img {
  width: 100%; height: 100%; object-fit: cover;
}
.rp-pc-show { display: inline; }

/* ===== Scene Sticky ===== */
.rp-scene { list-style: none; padding: 0; margin: 0; }
.rp-scene-item {
  position: sticky; top: 0; height: 100vh; overflow: hidden;
}
.rp-scene-spacer { height: 50vh; position: static; }
.rp-scene-inner {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  display: flex; align-items: center; justify-content: center;
}
.rp-scene-inner::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3), rgba(26,20,16,0.7));
}
.rp-scene-text { position: relative; text-align: center; color: #fff; margin: 0; }
.rp-scene-h {
  display: block; font-family: "Inter", serif;
  font-size: clamp(80px, 14vw, 200px); font-weight: 900;
  letter-spacing: -0.02em; line-height: 0.9; text-transform: capitalize;
  margin-bottom: 24px;
}
.rp-scene-hours {
  display: block; font-family: "Inter", sans-serif; font-size: 13px;
  letter-spacing: 0.15em; line-height: 1.8;
}
.rp-scene-scroll {
  position: absolute; bottom: 32px; right: 32px; z-index: 2;
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: rgba(255,255,255,0.85); margin: 0;
  animation: rp-bounce 1.8s ease-in-out infinite;
}

/* ===== News ===== */
.rp-news {
  padding: 140px 48px; max-width: 1100px; margin: 0 auto;
  text-align: center;
}
.rp-news-list {
  list-style: none; padding: 0; margin: 32px 0 0;
  display: flex; flex-direction: column; gap: 0;
}
.rp-news-item {
  display: grid; grid-template-columns: 140px 1fr auto; gap: 32px;
  align-items: center; padding: 28px 0;
  border-bottom: 1px solid rgba(245,230,200,0.12);
  text-align: left;
}
.rp-news-date {
  font-family: "Inter", sans-serif; font-size: 13px; letter-spacing: 0.1em;
  color: var(--rp-accent); margin: 0;
}
.rp-news-text {
  font-family: "Noto Serif JP", serif; font-size: 14px;
  line-height: 1.7; color: var(--rp-fg); margin: 0;
}
.rp-news-body { font-size: 12px; color: rgba(245,230,200,0.6); }

/* ===== Access ===== */
.rp-access {
  padding: 140px 48px; max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px;
}
.rp-access-detail {
  font-family: "Noto Sans JP", sans-serif; font-size: 13px; line-height: 2;
  color: rgba(245,230,200,0.85); margin: 32px 0 0;
}
.rp-access-detail > span { display: block; margin-bottom: 20px; }
.rp-access-detail a { color: var(--rp-accent); text-decoration: none; border-bottom: 1px solid; }
.rp-access-map-fake {
  width: 100%; aspect-ratio: 16 / 10; border-radius: 4px;
  background: linear-gradient(135deg, #2a2018, #1a1410);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; border: 1px dashed rgba(245,230,200,0.3); margin-bottom: 16px;
}
.rp-access-map-fake span:first-child {
  font-family: "Noto Sans JP", sans-serif; font-size: 14px; font-weight: 700;
  color: rgba(245,230,200,0.7);
}
.rp-fake-small {
  font-size: 11px; color: var(--rp-pink) !important;
}

/* ===== Membership ===== */
.rp-membership {
  padding: 100px 48px; background: rgba(245,230,200,0.04);
  border-top: 1px solid rgba(245,230,200,0.1);
  border-bottom: 1px solid rgba(245,230,200,0.1);
}
.rp-membership-content { max-width: 1100px; margin: 0 auto; text-align: center; }
.rp-membership-h {
  font-family: "Inter", serif; font-size: clamp(40px, 5vw, 64px);
  font-weight: 900; letter-spacing: -0.01em; margin: 0 0 16px;
  color: var(--rp-fg);
}
.rp-membership-desc {
  font-family: "Noto Sans JP", sans-serif; font-size: 14px;
  line-height: 1.8; color: rgba(245,230,200,0.75); margin: 0 0 32px;
}
.rp-membership-links { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }

/* ===== Contact ===== */
.rp-contact {
  padding: 80px 48px 100px; max-width: 1280px; margin: 0 auto;
}
.rp-contact-list {
  list-style: none; padding: 0; margin: 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.rp-contact-link {
  position: relative; display: block; aspect-ratio: 16 / 9;
  background-size: cover; background-position: center;
  cursor: pointer; overflow: hidden;
  text-decoration: none; color: #fff;
}
.rp-contact-link::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(26,20,16,0.7), rgba(26,20,16,0.3));
  transition: background .4s;
}
.rp-contact-link:hover::before { background: linear-gradient(135deg, rgba(26,20,16,0.4), rgba(26,20,16,0.1)); }
.rp-contact-label {
  position: absolute; left: 40px; bottom: 40px; right: 40px; z-index: 2;
  display: flex; flex-direction: column; gap: 8px;
}
.rp-contact-label span {
  font-family: "Inter", serif; font-size: clamp(32px, 4vw, 56px);
  font-weight: 900; letter-spacing: -0.01em; line-height: 1;
  text-transform: capitalize;
}
.rp-contact-stamp {
  position: absolute; top: 16px; right: 16px; z-index: 3;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 3px; letter-spacing: 0.15em;
}
.rp-contact-disclaimer {
  text-align: center; margin-top: 24px;
  font-family: "Noto Sans JP", sans-serif; font-size: 12px;
  color: var(--rp-pink); font-weight: 700;
  background: rgba(236,72,153,0.08); padding: 14px;
  border: 1px solid rgba(236,72,153,0.25); border-radius: 4px;
}

/* ===== Footer ===== */
.rp-footer {
  position: relative; padding: 140px 48px 80px;
  text-align: center; overflow: hidden;
  min-height: 600px; color: #fff;
}
.rp-footer-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.4) saturate(1.2);
}
.rp-footer-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(26,20,16,0.7), rgba(26,20,16,0.95));
}
.rp-footer-content { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; }
.rp-footer-logo-svg { width: min(85vw, 900px); height: auto; opacity: 0.95; }
.rp-footer-copy {
  font-family: "Inter", sans-serif; font-size: 12px; letter-spacing: 0.2em;
  color: rgba(255,255,255,0.6); margin: 32px 0 24px;
}
.rp-footer-cr { font-size: 11px; opacity: 0.5; }
.rp-footer-info {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
  max-width: 700px; margin: 0 auto 32px;
  font-family: "Noto Sans JP", sans-serif; font-size: 12px; line-height: 1.8;
  color: rgba(255,255,255,0.7); text-align: left;
}
.rp-footer-disclaimer {
  margin: 32px auto 0; max-width: 720px; padding: 16px 20px;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.4);
  border-radius: 4px; font-family: "Noto Sans JP", sans-serif;
  font-size: 12px; line-height: 1.7; color: #fff;
}
.rp-footer-disclaimer strong { color: var(--rp-pink); }

/* ===== Floating warning ===== */
.rp-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--rp-pink); color: #fff;
  font-family: "Noto Sans JP", sans-serif; font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
  max-width: 240px;
}
.rp-floating-warning-icon {
  background: #fff; color: var(--rp-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

/* ===== SplitText ===== */
.split-text { display: inline-block; }
.split-char {
  display: inline-block; opacity: 1; transform: translateY(0);
  transition: transform .5s, color .3s;
}
.rp-nav-list a:hover .split-char {
  animation: rp-char-bounce .8s ease;
}
@keyframes rp-char-bounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .rp-header { padding: 12px 16px; top: 56px; }
  .rp-header-cta { display: none; }
  .rp-nav-content { grid-template-columns: 1fr; gap: 32px; }
  .rp-nav-list a { font-size: 32px; }
  .rp-nav-info-copy { font-size: 36px; }
  .rp-concept { padding: 80px 24px; }
  .rp-concept-inner { grid-template-columns: 1fr; gap: 32px; }
  .rp-concept-text { grid-column: 1; grid-row: 1; }
  .rp-concept-img-1 { grid-column: 1; grid-row: 2; transform: none; }
  .rp-concept-img-2 { grid-column: 1; grid-row: 3; margin: 0; }
  .rp-menu-list { grid-template-columns: 1fr; padding: 0 16px; }
  .rp-menu-item-link { aspect-ratio: 16 / 10; }
  .rp-party { padding: 80px 24px; grid-template-columns: 1fr; gap: 40px; }
  .rp-party-img-1, .rp-party-img-2, .rp-party-img-3 {
    position: relative; top: auto; right: auto; bottom: auto; left: auto;
    margin: 0; width: 100%;
  }
  .rp-pc-show { display: none; }
  .rp-news { padding: 80px 16px; }
  .rp-news-item { grid-template-columns: 1fr; gap: 8px; padding: 20px 0; }
  .rp-news-item .rp-btn { justify-self: start; }
  .rp-access { padding: 80px 16px; grid-template-columns: 1fr; gap: 32px; }
  .rp-membership-links { flex-direction: column; }
  .rp-membership-links a { width: 100%; justify-content: center; }
  .rp-contact { padding: 60px 16px; }
  .rp-contact-list { grid-template-columns: 1fr; }
  .rp-footer { padding: 80px 24px 60px; min-height: auto; }
  .rp-footer-info { grid-template-columns: 1fr; gap: 16px; }
  .rp-floating-warning { bottom: 12px; left: 12px; font-size: 10px; max-width: 200px; }
  .rp-warning-row { flex-wrap: wrap; }
  .rp-hero-title { bottom: 60px; }
  .rp-scene-h { font-size: 18vw; }
}
`
