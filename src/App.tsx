import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Menu, X, ChevronRight, ChevronLeft, ArrowUpRight, Phone, MapPin,
  Megaphone, Smartphone, Hammer, Globe, Cpu, Check, ArrowRight,
} from 'lucide-react'

/* ============================================================
   Inline SVGs (lucide-react v1.14 lacks Instagram/Twitter)
   ============================================================ */
const IconYouTube = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M21.6 7.2c-.2-.8-.9-1.5-1.8-1.7C18.3 5 12 5 12 5s-6.3 0-7.8.4c-.9.2-1.6.9-1.8 1.7C2 8.7 2 12 2 12s0 3.3.4 4.8c.2.8.9 1.5 1.8 1.7C5.7 19 12 19 12 19s6.3 0 7.8-.4c.9-.2 1.6-.9 1.8-1.7.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM10 15V9l5 3-5 3z" />
  </svg>
)
const IconTikTok = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19.6 8.4a6.4 6.4 0 0 1-3.7-1.2v6.7a5.5 5.5 0 1 1-5.5-5.5v2.7a2.8 2.8 0 1 0 2.8 2.8V2h2.7a3.7 3.7 0 0 0 3.7 3.7v2.7z" />
  </svg>
)
const IconInstagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)
const IconX = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2H21l-6.51 7.44L22 22h-6.844l-4.74-6.215L4.8 22H2.04l6.96-7.96L2 2h6.91l4.27 5.65L18.244 2zm-2.4 18h1.51L7.27 4H5.66l10.184 16z" />
  </svg>
)
const IconLine = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C6.5 2 2 5.6 2 10c0 4 3.5 7.3 8.3 8 .3.1.7.2.8.5.1.3 0 .7 0 1l-.1.7c0 .2-.2.8.7.5.9-.4 4.8-2.8 6.5-4.8 1.2-1.3 1.8-2.7 1.8-4.4 0-4.4-4.5-8-10-8z" />
  </svg>
)

/* ============================================================
   Constants
   ============================================================ */
const COMPANY = {
  name: '株式会社ポラリスクリエイティブ',
  nameEn: 'POLARIS CREATIVE Inc.',
  corpNumber: '9012401041381',
  zip: '〒183-0035',
  addr: '東京都府中市四谷3丁目30番地の8 – 2F',
  tel: '042-365-5532',
  telSales: '080-4796-3797',
  email: 'tenchosan346@gmail.com',
  director: '取締役社長　斉藤 誓良（ちから）',
  founded: '2024年2月',
}

const NAV: { label: string; href: string }[] = [
  { label: 'ホーム', href: '#home' },
  { label: '事業内容', href: '#business' },
  { label: 'SNS', href: '#sns' },
  { label: 'アプリ', href: '#app' },
  { label: '建設', href: '#construction' },
  { label: 'HP制作', href: '#hp' },
  { label: 'AI導入', href: '#ai' },
  { label: '会社案内', href: '#company' },
]

const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'POLARIS CREATIVE',
    title: 'テクノロジーで、\n未来を創る。',
    desc: 'SNS・アプリ・建設・HP制作・AI導入。\n5つの事業を内製でつなぐ、総合カンパニー。',
  },
  {
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'SNS MARKETING',
    title: '届けたい人に、\n届ける運用を。',
    desc: 'YouTube・TikTok を起点に、ブランドの接点を広げる。',
  },
  {
    img: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'WEB DEVELOPMENT',
    title: '営業の現場で、\n戦えるHPを。',
    desc: 'ヒアリングから運用まで、ワンストップで責任を持つ。',
  },
  {
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'CONSTRUCTION',
    title: '街と人の暮らしを、\n確かな技術で。',
    desc: 'ダイヤモンドコア・ウォールソー・道路カッター施工。',
  },
  {
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'AI CONSULTING',
    title: 'AIを、業務の中心に。',
    desc: '導入から運用定着まで、現場目線で伴走するコンサル。',
  },
]

const BUSINESSES = [
  { id: 'sns',           icon: Megaphone,  jp: 'SNS事業',         en: 'SNS', desc: 'YouTube・TikTok 運用代行' },
  { id: 'app',           icon: Smartphone, jp: 'アプリ開発',       en: 'APP', desc: '事業企画から実装まで（準備中）' },
  { id: 'construction',  icon: Hammer,     jp: '建設事業',         en: 'CONSTRUCTION', desc: '特殊施工・コアボーリング' },
  { id: 'hp',            icon: Globe,      jp: 'HP制作',           en: 'WEB', desc: '制作・運用・テンプレート' },
  { id: 'ai',            icon: Cpu,        jp: 'AI導入コンサル',   en: 'AI', desc: '業務自動化・チャットボット' },
]

const HP_TEMPLATES = [
  { name: '飲食店向け',     img: 'photo-1414235077428-338989a2e8c0' },
  { name: '美容院・サロン', img: 'photo-1560066984-138dadb4c035' },
  { name: 'クリニック',     img: 'photo-1576091160550-2173dba999ef' },
  { name: '工務店・建築',   img: 'photo-1503387762-592deb58ef4e' },
  { name: '士業',           img: 'photo-1450101499163-c8848c66ca85' },
  { name: '教室・スクール', img: 'photo-1523240795612-9a054b0db644' },
  { name: 'EC・ショップ',   img: 'photo-1556742049-0cfed4f6a45d' },
  { name: 'コーポレート',   img: 'photo-1497366216548-37526070297c' },
  { name: '採用LP',         img: 'photo-1521737711867-e3b97375f902' },
  { name: 'イベント',       img: 'photo-1492684223066-81342ee5ff30' },
]

const HP_OPTIONS = [
  { name: '追加ページ',                   price: '¥7,500〜 / 1ページ',   market: '相場 ¥15,000' },
  { name: 'ロゴ制作',                     price: '¥15,000〜',            market: '相場 ¥30,000' },
  { name: '撮影（スチール）',             price: '¥25,000〜 / 半日',     market: '相場 ¥50,000' },
  { name: '撮影（動画）',                 price: '¥50,000〜 / 半日',     market: '相場 ¥100,000' },
  { name: 'SEO対策（基本セット）',        price: '¥25,000〜',            market: '相場 ¥50,000' },
  { name: '多言語対応（1言語追加）',      price: '¥25,000〜',            market: '相場 ¥50,000' },
  { name: 'お問い合わせフォーム拡張',     price: '¥15,000〜',            market: '相場 ¥30,000' },
  { name: 'ブログ・お知らせCMS導入',      price: '¥25,000〜',            market: '相場 ¥50,000' },
  { name: '予約システム連携',             price: '¥40,000〜',            market: '相場 ¥80,000' },
  { name: 'EC（Shopify / Stripe）連携',   price: '¥50,000〜',            market: '相場 ¥100,000' },
]

const REASONS = [
  { num: '01', title: '相場の半額',     desc: 'HP制作の追加料金は業界相場のおよそ半額。明朗会計でコストを抑えます。' },
  { num: '02', title: '完全内製ワンストップ', desc: '企画・撮影・実装・運用まで全て内製。複数業者を挟まないから速い・安い・責任が明確。' },
  { num: '03', title: '建設×IT のクロス事業', desc: '建設施工とWeb・SNS・AIを横断する稀有な総合企業。業種を超えた提案が可能。' },
  { num: '04', title: '最短1週間納品',   desc: 'HP制作は最短1週間で公開可能。SNSも即日始動。営業のスピードに追従します。' },
  { num: '05', title: '経営者目線で提案', desc: '「作って終わり」ではなく、売上と運用に直結する提案。経営課題を一緒に解きます。' },
]

const NEWS_ITEMS = [
  { date: '2026.05.01', cat: 'NEWS',    title: '株式会社ポラリスクリエイティブ コーポレートサイトをリリース' },
  { date: '2026.04.15', cat: 'WORKS',   title: '飲食チェーン様 公式HP・採用LP を納品しました' },
  { date: '2026.04.01', cat: 'TOPICS',  title: 'AI導入コンサルティングサービス 提供開始' },
]

/* ============================================================
   Logo
   ============================================================ */
const Logo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <svg viewBox="0 0 40 40" className="w-10 h-10">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path d="M20 3 L24.7 14.5 L37 15.5 L27.5 23.6 L30.5 35.5 L20 29 L9.5 35.5 L12.5 23.6 L3 15.5 L15.3 14.5 Z" fill="url(#logoGrad)" />
    </svg>
    <div className={`leading-tight ${dark ? 'text-white' : 'text-[var(--color-pc-ink)]'}`}>
      <div className="text-[15px] font-bold tracking-tight">{COMPANY.name}</div>
      <div className="text-[9px] tracking-[0.25em] text-[var(--color-pc-sub)]" style={{ fontFamily: 'Inter, sans-serif' }}>
        {COMPANY.nameEn}
      </div>
    </div>
  </div>
)

/* ============================================================
   Header
   ============================================================ */
function Header({ onMenu, scrolled }: { onMenu: () => void; scrolled: boolean }) {
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur border-b border-[var(--color-pc-line)]' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 lg:px-8 h-16 lg:h-[72px]">
        <a href="#home" className="block"><Logo /></a>
        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[13px] text-[var(--color-pc-ink)] hover:text-[var(--color-pc-pink)] transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <a href={`tel:${COMPANY.tel}`} className="hidden xl:flex items-center gap-1.5 text-[13px] text-[var(--color-pc-ink)] hover:text-[var(--color-pc-pink)]">
            <Phone className="w-3.5 h-3.5" /> {COMPANY.tel}
          </a>
          <a href="#contact" className="bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white px-5 py-2.5 text-[13px] font-bold transition-colors flex items-center gap-1.5 rounded-full">
            お問い合わせ <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <button onClick={onMenu} className="xl:hidden p-2" aria-label="メニュー">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-white overflow-auto">
          <div className="flex justify-between items-center p-5 border-b border-[var(--color-pc-line)]">
            <Logo />
            <button onClick={onClose} aria-label="閉じる" className="p-2"><X className="w-6 h-6" /></button>
          </div>
          <nav className="p-5 flex flex-col">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={onClose} className="py-4 border-b border-[var(--color-pc-line)] text-base flex justify-between items-center">
                <span>{n.label}</span><ChevronRight className="w-4 h-4 text-[var(--color-pc-sub)]" />
              </a>
            ))}
            <a href="#contact" onClick={onClose} className="mt-6 bg-[var(--color-pc-pink)] text-white text-center py-4 rounded-full font-bold">
              お問い合わせ
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ============================================================
   Hero Carousel
   ============================================================ */
function HeroCarousel() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])
  const prev = () => setIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  const next = () => setIdx((i) => (i + 1) % HERO_SLIDES.length)
  const slide = HERO_SLIDES[idx]
  return (
    <section id="home" className="relative w-full h-[88vh] min-h-[640px] overflow-hidden bg-[var(--color-pc-bg)] mt-16 lg:mt-[72px]">
      <AnimatePresence>
        <motion.div key={idx} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }} className="absolute inset-0">
          <img src={slide.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <div className="text-[var(--color-pc-pink)] text-xs lg:text-sm tracking-[0.4em] mb-5 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                {slide.eyebrow}
              </div>
              <h1 className="text-[var(--color-pc-ink)] text-[34px] lg:text-[64px] font-black leading-[1.15] mb-6 whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-[var(--color-pc-ink)]/70 text-sm lg:text-base leading-relaxed mb-8 whitespace-pre-line">
                {slide.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#business" className="bg-[var(--color-pc-ink)] hover:bg-black text-white px-7 py-3.5 text-sm font-bold transition-colors flex items-center gap-2 rounded-full">
                  事業を見る <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white px-7 py-3.5 text-sm font-bold transition-colors flex items-center gap-2 rounded-full">
                  お問い合わせ <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <button onClick={prev} className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-[var(--color-pc-line)] flex items-center justify-center shadow" aria-label="前へ">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-[var(--color-pc-line)] flex items-center justify-center shadow" aria-label="次へ">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1 transition-all rounded-full ${i === idx ? 'w-10 bg-[var(--color-pc-pink)]' : 'w-5 bg-[var(--color-pc-ink)]/30'}`} aria-label={`スライド ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   5 Business Icons (SoftBank-style row)
   ============================================================ */
function BusinessIcons() {
  return (
    <section id="business" className="bg-white border-b border-[var(--color-pc-line)]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-10">
        <ul className="grid grid-cols-5 gap-3 lg:gap-6">
          {BUSINESSES.map((b) => (
            <li key={b.id}>
              <a href={`#${b.id}`} className="group flex flex-col items-center text-center">
                <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-[var(--color-pc-bg)] group-hover:bg-[var(--color-pc-pink)] flex items-center justify-center transition-colors mb-2 lg:mb-3">
                  <b.icon className="w-6 h-6 lg:w-9 lg:h-9 text-[var(--color-pc-ink)] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div className="text-[11px] lg:text-sm font-bold text-[var(--color-pc-ink)] group-hover:text-[var(--color-pc-pink)] transition-colors leading-tight">
                  {b.jp}
                </div>
                <div className="text-[9px] lg:text-[10px] tracking-[0.2em] text-[var(--color-pc-sub)] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {b.en}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================
   Common: SectionHeading
   ============================================================ */
function SectionHeading({ en, jp, sub }: { en: string; jp: string; sub?: string }) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{en}</div>
      <h2 className="text-3xl lg:text-5xl font-black text-[var(--color-pc-ink)] leading-tight">{jp}</h2>
      {sub && <p className="text-[var(--color-pc-sub)] text-sm lg:text-base mt-4 leading-relaxed max-w-3xl">{sub}</p>}
      <div className="w-12 h-[3px] bg-[var(--color-pc-pink)] mt-6" />
    </div>
  )
}

function PriceCard({ unit, price, note, cta = '相談する' }: { unit: string; price: string; note: string; cta?: string }) {
  return (
    <div className="bg-white border-2 border-[var(--color-pc-ink)] p-7 lg:p-9">
      <div className="text-xs tracking-[0.3em] text-[var(--color-pc-sub)] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>PRICE</div>
      <div className="text-sm text-[var(--color-pc-sub)] mb-1">{unit}</div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-5xl lg:text-6xl font-black text-[var(--color-pc-ink)]" style={{ fontFamily: 'Inter, sans-serif' }}>{price}</span>
        <span className="text-base text-[var(--color-pc-ink)]">〜</span>
      </div>
      <div className="text-xs text-[var(--color-pc-sub)] mb-6">{note}</div>
      <a href="#contact" className="block w-full bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white text-center py-3 text-sm font-bold rounded-full transition-colors">
        {cta} →
      </a>
    </div>
  )
}

/* ============================================================
   ① SNS
   ============================================================ */
function SectionSNS() {
  return (
    <section id="sns" className="py-24 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="01 — SNS BUSINESS"
          jp="SNS運用代行"
          sub="YouTube・TikTok を中心に、企画・撮影・編集・投稿・分析までワンストップ。30社以上の運用実績、自社で総フォロワー200万人を抱える運用ノウハウを、御社の集客に。"
        />
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-grad-brand text-white p-5 lg:p-7 text-center rounded-lg">
            <div className="text-[10px] tracking-widest opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>YOUTUBE</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-5xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>150</span>
              <span className="text-base font-bold">万人</span>
            </div>
            <div className="text-[10px] lg:text-xs opacity-90 mt-1">登録者数</div>
          </div>
          <div className="bg-grad-brand text-white p-5 lg:p-7 text-center rounded-lg">
            <div className="text-[10px] tracking-widest opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>TIKTOK</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-5xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>36</span>
              <span className="text-base font-bold">万人</span>
            </div>
            <div className="text-[10px] lg:text-xs opacity-90 mt-1">フォロワー</div>
          </div>
          <div className="bg-[var(--color-pc-ink)] text-white p-5 lg:p-7 text-center rounded-lg">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] mb-2 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>TOTAL REACH</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-5xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>200</span>
              <span className="text-base font-bold">万人</span>
            </div>
            <div className="text-[10px] lg:text-xs opacity-80 mt-1">総フォロワー</div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-[var(--color-pc-bg)] p-7 rounded-lg">
              <IconYouTube className="w-10 h-10 text-[#ff0000] mb-4" />
              <div className="text-xl font-bold mb-1">YouTube 運用</div>
              <div className="text-xs text-[var(--color-pc-sub)] mb-4 tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>SUBSCRIBERS / VIEWS</div>
              <ul className="text-sm space-y-2">
                {['チャンネル設計・初期構築', '台本・構成作成', '撮影・編集（4K対応）', 'サムネイル制作', 'SEO・分析レポート'].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--color-pc-pink)] mt-0.5 flex-shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-[var(--color-pc-line)]">
                <div className="text-xs text-[var(--color-pc-sub)]">自社運用チャンネル登録者</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-2xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>1,500,000</div>
                  <div className="text-sm">名</div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-pc-bg)] p-7 rounded-lg">
              <IconTikTok className="w-10 h-10 text-[var(--color-pc-ink)] mb-4" />
              <div className="text-xl font-bold mb-1">TikTok 運用</div>
              <div className="text-xs text-[var(--color-pc-sub)] mb-4 tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>FOLLOWERS / REACH</div>
              <ul className="text-sm space-y-2">
                {['アカウント戦略立案', 'ショート動画企画', '撮影・編集', 'ハッシュタグ・トレンド分析', '投稿スケジュール運用'].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--color-pc-pink)] mt-0.5 flex-shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-[var(--color-pc-line)]">
                <div className="text-xs text-[var(--color-pc-sub)]">自社運用アカウントフォロワー</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-2xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>360,000</div>
                  <div className="text-sm">名</div>
                </div>
              </div>
            </div>
          </div>
          <PriceCard unit="月額" price="¥100,000" note="運用代行プラン・撮影回数等は要相談" />
        </div>
        <div className="text-center mt-4 text-xs text-[var(--color-pc-sub)]">
          ※ 数値は自社運用アカウント実績。30社以上のクライアント運用経験あり。
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ② App Coming Soon
   ============================================================ */
function SectionApp() {
  return (
    <section id="app" className="relative py-24 lg:py-32 px-5 lg:px-12 bg-[var(--color-pc-ink)] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-[1280px] mx-auto">
        <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>02 — APP DEVELOPMENT</div>
        <h2 className="text-3xl lg:text-5xl font-black mb-6">アプリ開発事業</h2>
        <div className="w-12 h-[3px] bg-[var(--color-pc-pink)] mb-10" />
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-end">
          <div>
            <div className="inline-block bg-[var(--color-pc-pink)] text-white text-xs tracking-[0.3em] font-bold px-4 py-1.5 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              COMING SOON
            </div>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl">
              事業企画・要件定義から、iOS / Android / Web アプリの設計・実装・運用までを内製で完結。
              <br />
              現在、サービス詳細を準備中です。リリースまで今しばらくお待ちください。
            </p>
          </div>
          <div className="text-right">
            <a href="#contact" className="inline-flex items-center gap-2 text-sm tracking-widest border-b border-white/40 pb-1 hover:text-[var(--color-pc-pink)] hover:border-[var(--color-pc-pink)] transition-colors">
              先行相談する <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ③ Construction
   ============================================================ */
function SectionConstruction() {
  const items = [
    { name: 'ダイヤモンドコアボーリング施工', desc: 'コンクリートに精密な円形の穴を空ける専門工法。配管・配線・設備の貫通工事に。', img: 'photo-1503387762-592deb58ef4e' },
    { name: 'ウォールソー施工',           desc: '壁面・床面の大規模切断工事。建物の解体・改修・開口部新設に対応。',           img: 'photo-1541888946425-d81bb19240f5' },
    { name: '道路カッター施工（外注）',     desc: 'アスファルト・コンクリート舗装の精密切断。道路工事・配管埋設・補修工事に。',     img: 'photo-1581094288338-2314dddb7ece' },
  ]
  return (
    <section id="construction" className="py-24 lg:py-32 px-5 lg:px-12 bg-[var(--color-pc-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="03 — CONSTRUCTION BUSINESS"
          jp="建設事業"
          sub="コンクリート切断・穿孔の特殊施工。創業以来 20,000件以上の施工実績。大手公共工事の現場経験で培った精度と安全性で対応します。"
        />

        {/* Construction stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          <div className="bg-white p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>TOTAL WORKS</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>20,000</span>
              <span className="text-sm font-bold">件 +</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">累計施工実績</div>
          </div>
          <div className="bg-white p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-cyan)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>AREA</div>
            <div className="text-2xl lg:text-3xl font-black mt-1">首都圏</div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">関東圏も出張対応可</div>
          </div>
          <div className="bg-white p-5 lg:p-6 text-center col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>MAJOR PROJECT</div>
            <div className="text-sm lg:text-base font-bold leading-tight">大手町駅<br />改修工事</div>
          </div>
          <div className="bg-white p-5 lg:p-6 text-center col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>MAJOR PROJECT</div>
            <div className="text-sm lg:text-base font-bold leading-tight">横浜都営住宅<br />改修工事</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={it.name} className="bg-white overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={`https://images.unsplash.com/${it.img}?auto=format&fit=crop&w=800&q=80`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-[var(--color-pc-pink)] text-xs tracking-widest font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  METHOD 0{i + 1}
                </div>
                <div className="text-lg font-bold text-[var(--color-pc-ink)] mb-2 leading-tight">{it.name}</div>
                <div className="text-sm text-[var(--color-pc-sub)] leading-relaxed">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 bg-[var(--color-pc-ink)] hover:bg-black text-white px-8 py-3.5 text-sm font-bold rounded-full transition-colors">
            施工のご相談・お見積もり <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ④ HP Business (biggest)
   ============================================================ */
function SectionHP() {
  return (
    <section id="hp" className="py-24 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="04 — WEB BUSINESS"
          jp="HP制作・運用"
          sub="ヒアリングから設計・実装・公開・継続運用まで、ワンストップ内製。50社以上の制作実績、最短1週間納品。営業の現場で戦えるHPを、明朗会計でお届けします。"
        />

        {/* HP stats */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <div className="bg-[var(--color-pc-bg)] p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>PRODUCTION</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>50</span>
              <span className="text-sm font-bold">社 +</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">制作実績</div>
          </div>
          <div className="bg-[var(--color-pc-bg)] p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-cyan)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>FASTEST</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>1</span>
              <span className="text-sm font-bold">週間〜</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">最短納品</div>
          </div>
          <div className="bg-[var(--color-pc-bg)] p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>HALF PRICE</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>1/2</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">業界相場の半額</div>
          </div>
        </div>

        {/* Price cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="bg-white border-2 border-[var(--color-pc-ink)] p-7 lg:p-9">
            <div className="text-xs tracking-[0.3em] text-[var(--color-pc-sub)] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>HP CREATION</div>
            <div className="text-sm text-[var(--color-pc-sub)] mb-1">HP制作（基本パッケージ）</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl lg:text-6xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>¥150,000</span>
              <span className="text-base">〜</span>
            </div>
            <div className="text-xs text-[var(--color-pc-sub)] mb-6">5ページ + 基本フォーム + 公開対応込み</div>
            <a href="#contact" className="block w-full bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white text-center py-3 text-sm font-bold rounded-full transition-colors">無料お見積もり →</a>
          </div>
          <div className="bg-[var(--color-pc-ink)] text-white p-7 lg:p-9">
            <div className="text-xs tracking-[0.3em] text-[var(--color-pc-pink)] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>HP MAINTENANCE</div>
            <div className="text-sm text-white/70 mb-1">HP継続管理（月額）</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl lg:text-6xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>¥30,000</span>
              <span className="text-base">〜 / 月</span>
            </div>
            <div className="text-xs text-white/70 mb-6">更新代行・サーバー監視・セキュリティ対応・分析レポート</div>
            <a href="#contact" className="block w-full bg-white hover:bg-[var(--color-pc-pink)] hover:text-white text-[var(--color-pc-ink)] text-center py-3 text-sm font-bold rounded-full transition-colors">運用について相談 →</a>
          </div>
        </div>

        {/* Templates */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>TEMPLATES</div>
              <h3 className="text-2xl lg:text-3xl font-black">10業種のテンプレート</h3>
            </div>
            <div className="text-sm text-[var(--color-pc-sub)] hidden md:block">ベースから選んで、御社用にカスタマイズ。</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {HP_TEMPLATES.map((t, i) => (
              <a key={t.name} href="#contact" className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-[var(--color-pc-bg)] mb-2.5">
                  <img src={`https://images.unsplash.com/${t.img}?auto=format&fit=crop&w=600&q=80`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-[10px] tracking-widest text-[var(--color-pc-sub)]" style={{ fontFamily: 'Inter, sans-serif' }}>TEMPLATE {String(i + 1).padStart(2, '0')}</div>
                <div className="text-sm font-bold text-[var(--color-pc-ink)] group-hover:text-[var(--color-pc-pink)] transition-colors">{t.name}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Options */}
        <div>
          <div className="mb-8">
            <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>ADD-ON</div>
            <h3 className="text-2xl lg:text-3xl font-black">追加オプション料金</h3>
          </div>
          <div className="border-t border-[var(--color-pc-line)]">
            {HP_OPTIONS.map((o) => (
              <div key={o.name} className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_auto] gap-4 items-center border-b border-[var(--color-pc-line)] py-4">
                <div className="text-sm lg:text-base">{o.name}</div>
                <div className="hidden lg:block text-xs text-[var(--color-pc-sub)] line-through" style={{ fontFamily: 'Inter, sans-serif' }}>{o.market}</div>
                <div className="text-sm lg:text-base font-bold text-[var(--color-pc-pink)]" style={{ fontFamily: 'Inter, sans-serif' }}>{o.price}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-[var(--color-pc-sub)] mt-4">
            ※ 業界相場のおよそ <span className="text-[var(--color-pc-pink)] font-bold">半額</span> で提供しています。要件に応じて個別お見積もりいたします。
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ⑤ AI Consulting
   ============================================================ */
function SectionAI() {
  const items = [
    '業務自動化（メール・議事録・データ入力）',
    'AIチャットボット導入・カスタマイズ',
    '営業資料・提案書の自動生成',
    '既存業務のRAG化（社内文書AI検索）',
    'Claude / GPT API の業務組込み',
    '社内勉強会・運用定着支援',
  ]
  return (
    <section id="ai" className="py-24 lg:py-32 px-5 lg:px-12 bg-[var(--color-pc-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="05 — AI CONSULTING"
          jp="AI導入コンサル"
          sub="導入の検討から、ツール選定・実装・社内定着まで伴走。「使ってみたけど続かない」をなくす、現場目線のコンサルティング。"
        />
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          <div className="bg-white p-8 lg:p-10">
            <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>SCOPE OF SUPPORT</div>
            <h3 className="text-xl lg:text-2xl font-bold mb-6">提供内容（一例）</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {items.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[var(--color-pc-pink)] mt-0.5 flex-shrink-0" /><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <PriceCard unit="月額（伴走支援）" price="¥100,000" note="月次ミーティング + Slack 等での随時相談" />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Why Polaris (Stats)
   ============================================================ */
function WhyPolaris() {
  return (
    <section className="py-20 lg:py-28 px-5 lg:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>WHY POLARIS</div>
          <h2 className="text-3xl lg:text-4xl font-black">なぜ、ポラリスが選ばれるのか</h2>
          <div className="w-12 h-[3px] bg-grad-brand mx-auto mt-5" />
          <p className="text-[var(--color-pc-sub)] text-sm lg:text-base mt-6 max-w-2xl mx-auto">
            Web × SNS × AI × 建設をワンストップで内製対応。<br />
            複数業者を間に挟まないから、速い・安い・責任が明確です。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.num} className="bg-[var(--color-pc-bg)] p-7 lg:p-8 hover:shadow-lg transition-shadow group">
              <div className="text-grad-brand text-3xl lg:text-4xl font-black mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{r.num}</div>
              <div className="text-lg lg:text-xl font-bold mb-3 group-hover:text-[var(--color-pc-pink)] transition-colors">{r.title}</div>
              <div className="text-sm text-[var(--color-pc-sub)] leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   News
   ============================================================ */
function News() {
  const cats: Record<string, string> = {
    NEWS:   'お知らせ',
    WORKS:  '実績',
    TOPICS: 'トピック',
  }
  return (
    <section className="py-20 lg:py-28 px-5 lg:px-12 bg-[var(--color-pc-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>INFORMATION</div>
            <h2 className="text-3xl lg:text-4xl font-black">お知らせ・実績</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest border-b border-[var(--color-pc-ink)] pb-1 hover:text-[var(--color-pc-pink)] hover:border-[var(--color-pc-pink)] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            VIEW ALL <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <ul className="bg-white">
          {NEWS_ITEMS.map((n) => (
            <li key={n.title} className="border-b border-[var(--color-pc-line)] last:border-b-0">
              <a href="#" className="grid grid-cols-[100px_90px_1fr] lg:grid-cols-[140px_120px_1fr_auto] gap-4 items-center px-5 lg:px-7 py-5 hover:bg-[var(--color-pc-bg)] transition-colors group">
                <span className="text-xs lg:text-sm text-[var(--color-pc-sub)]" style={{ fontFamily: 'Inter, sans-serif' }}>{n.date}</span>
                <span className="text-[10px] tracking-widest font-bold border border-[var(--color-pc-ink)] text-[var(--color-pc-ink)] px-2 py-1 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {cats[n.cat]}
                </span>
                <span className="text-sm lg:text-base font-medium text-[var(--color-pc-ink)] group-hover:text-[var(--color-pc-pink)] transition-colors">{n.title}</span>
                <ChevronRight className="hidden lg:block w-4 h-4 text-[var(--color-pc-sub)]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================
   Contact (band + form)
   ============================================================ */
function ContactBand() {
  return (
    <section className="py-16 lg:py-20 px-5 lg:px-12 bg-[var(--color-pc-ink)] text-white">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>CONTACT US</div>
          <h2 className="text-3xl lg:text-5xl font-black leading-tight">
            まずは、お気軽に<br />ご相談ください。
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <a href={`tel:${COMPANY.tel}`} className="bg-white text-[var(--color-pc-ink)] hover:bg-[var(--color-pc-pink)] hover:text-white px-6 py-4 text-sm lg:text-base font-bold flex items-center gap-2 rounded-full transition-colors">
            <Phone className="w-4 h-4" />代表 {COMPANY.tel}
          </a>
          <a href={`tel:${COMPANY.telSales}`} className="bg-white text-[var(--color-pc-ink)] hover:bg-[var(--color-pc-cyan)] hover:text-white px-6 py-4 text-sm lg:text-base font-bold flex items-center gap-2 rounded-full transition-colors">
            <Phone className="w-4 h-4" />営業 {COMPANY.telSales}
          </a>
          <a href="#contact" className="bg-grad-brand hover:opacity-90 text-white px-7 py-4 text-sm lg:text-base font-bold flex items-center gap-2 rounded-full transition-opacity">
            お問い合わせフォーム <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section id="contact" className="py-24 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-[900px] mx-auto">
        <SectionHeading en="CONTACT FORM" jp="お問い合わせ" sub="ご相談・お見積もり・採用・取材依頼など、お気軽にお送りください。担当者より24時間以内にご連絡いたします。" />
        {submitted ? (
          <div className="bg-[var(--color-pc-bg)] p-12 text-center">
            <div className="text-3xl font-black mb-3 text-[var(--color-pc-pink)]" style={{ fontFamily: 'Inter, sans-serif' }}>THANK YOU!</div>
            <div className="text-[var(--color-pc-ink)]">お問い合わせありがとうございます。</div>
            <div className="text-sm text-[var(--color-pc-sub)] mt-2">担当者より24時間以内にご連絡いたします。</div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">お名前 <span className="text-[var(--color-pc-pink)]">*</span></label>
                <input required className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="山田 太郎" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">会社名</label>
                <input className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="株式会社○○" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">電話番号 <span className="text-[var(--color-pc-pink)]">*</span></label>
                <input required type="tel" className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="090-0000-0000" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">メール <span className="text-[var(--color-pc-pink)]">*</span></label>
                <input required type="email" className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="example@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 tracking-wider">ご相談内容</label>
              <select className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors">
                <option>SNS運用について</option>
                <option>アプリ開発について</option>
                <option>建設施工について</option>
                <option>HP制作・運用について</option>
                <option>AI導入コンサルについて</option>
                <option>採用について</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 tracking-wider">メッセージ</label>
              <textarea rows={6} className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors resize-y" placeholder="お気軽にどうぞ。" />
            </div>
            <button type="submit" className="bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white py-4 text-sm font-bold tracking-widest rounded-full transition-colors flex items-center justify-center gap-2 mt-4">
              送信する <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  const cols = [
    {
      title: '事業内容',
      links: [
        { label: 'SNS事業', href: '#sns' },
        { label: 'アプリ開発', href: '#app' },
        { label: '建設事業', href: '#construction' },
        { label: 'HP制作・運用', href: '#hp' },
        { label: 'AI導入コンサル', href: '#ai' },
      ],
    },
    {
      title: '会社情報',
      links: [
        { label: '会社概要', href: '#company' },
        { label: 'お問い合わせ', href: '#contact' },
        { label: '採用情報（準備中）', href: '#' },
      ],
    },
    {
      title: 'サポート',
      links: [
        { label: 'プライバシーポリシー', href: '#' },
        { label: '特定商取引法に基づく表記', href: '#' },
        { label: 'サイトマップ', href: '#' },
      ],
    },
  ]
  return (
    <footer id="company" className="bg-white border-t border-[var(--color-pc-line)]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.3fr_2fr] gap-12 mb-12">
          <div>
            <Logo />
            <table className="mt-6 text-xs lg:text-sm text-[var(--color-pc-ink)]">
              <tbody>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">商号</th><td className="pb-2">{COMPANY.name}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">代表者</th><td className="pb-2">{COMPANY.director}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">設立</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.founded}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">法人番号</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.corpNumber}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">所在地</th><td className="pb-2">{COMPANY.zip}<br />{COMPANY.addr}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">電話</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.tel}<br />営業：{COMPANY.telSales}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">メール</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.email}</td></tr>
              </tbody>
            </table>
            <div className="flex gap-2 mt-5">
              {[
                { Icon: IconYouTube,   label: 'YouTube' },
                { Icon: IconTikTok,    label: 'TikTok' },
                { Icon: IconInstagram, label: 'Instagram' },
                { Icon: IconX,         label: 'X' },
                { Icon: IconLine,      label: 'LINE' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full border border-[var(--color-pc-line)] hover:bg-[var(--color-pc-pink)] hover:border-[var(--color-pc-pink)] hover:text-white text-[var(--color-pc-ink)] flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs tracking-[0.3em] text-[var(--color-pc-sub)] font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{c.title.toUpperCase()}</div>
                <ul className="space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}><a href={l.href} className="text-[var(--color-pc-ink)] hover:text-[var(--color-pc-pink)] transition-colors">{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--color-pc-line)] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[var(--color-pc-sub)]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />{COMPANY.zip} {COMPANY.addr}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif' }}>© 2026 {COMPANY.nameEn} All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   App
   ============================================================ */
export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="bg-white text-[var(--color-pc-ink)]">
      <Header onMenu={() => setOpen(true)} scrolled={scrolled} />
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <HeroCarousel />
      <BusinessIcons />
      <SectionSNS />
      <SectionApp />
      <SectionConstruction />
      <SectionHP />
      <SectionAI />
      <WhyPolaris />
      <News />
      <ContactBand />
      <ContactForm />
      <Footer />
    </div>
  )
}
