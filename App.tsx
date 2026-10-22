import { useMemo, useState } from 'react';
import {
  Phone, ShoppingCart, MessageCircle, MapPin, Mail, Globe,
  Plus, Minus, X, Snowflake, Store, ArrowRight,
} from 'lucide-react';
import { Pack, IceCube, Kind } from './Pack';
import shopPhoto from './shop.jpg';

const BUSINESS = {
  name: 'Muhammad Nawaz Enterprises',
  category: 'Cold Drinks Wholesale Dealer and Beverage Distributor',
  address: 'New Noor Market, Saada, District Kurram, Khyber Pakhtunkhwa, Pakistan',
  phone: '+92 302 8840988',
  phone2: '+92 300 5834843',
  whatsapp: '923337373948',
  whatsappDisplay: '+92 333 7373948',
  email: 'muhammad.nawaz8840@gmail.com',
};

interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  flavour: string;
  category: string;
  unitSize: string;
  cartonPack: string;
  price: number | null;
  moq: number;
  brand?: string;
  kind: Kind;
  color: string;
  accent: string;
  /** Put a real product photo URL here (e.g. '/photos/cola-1-5l.jpg') to replace the illustration. */
  photo?: string;
}

const PRODUCTS: Product[] = [
  { id: 't1', brand: 'Tipka', name: 'Tipka Orange Juice Drink', nameUrdu: 'ٹپکا اورنج جوس ڈرنک', flavour: 'Orange', category: 'Tipka', unitSize: 'PET Bottle', cartonPack: 'Carton — ask for pack size', price: null, moq: 5, kind: 'pet', color: '#ff8a1f', accent: '#d92b2b' },
  { id: 't2', brand: 'Tipka', name: 'Tipka Pomegranate Juice Drink', nameUrdu: 'ٹپکا انار جوس ڈرنک', flavour: 'Pomegranate', category: 'Tipka', unitSize: 'PET Bottle', cartonPack: 'Carton — ask for pack size', price: null, moq: 5, kind: 'pet', color: '#5a1230', accent: '#d92b2b' },
  { id: '1', name: 'Cola Soda 1.5 Litre PET', nameUrdu: 'کولا سوڈا 1.5 لیٹر بوتل', flavour: 'Cola', category: 'Cola', unitSize: '1.5 Litre PET', cartonPack: '6 Bottles / Carton', price: 1220, moq: 10, kind: 'pet', color: '#3a1a0c', accent: '#e8432e' },
  { id: '8', name: 'Cola Soda 345ml Bottle', nameUrdu: 'کولا سوڈا 345 ملی لٹر', flavour: 'Cola', category: 'Cola', unitSize: '345ml Bottle', cartonPack: '12 Bottles / Carton', price: null, moq: 10, kind: 'glass', color: '#3a1a0c', accent: '#e8432e' },
  { id: '2', name: 'Lemon Lime Soda 250ml Can', nameUrdu: 'لیمن لائم سوڈا 250 ملی لٹر کین', flavour: 'Lemon-Lime', category: 'Lemon-Lime & Orange', unitSize: '250ml Can', cartonPack: '24 Cans / Carton', price: 2650, moq: 5, kind: 'can', color: '#8fc31f', accent: '#1f8f4e' },
  { id: '9', name: 'Lemon Lime Soda 1.5 Litre PET', nameUrdu: 'لیمن لائم سوڈا 1.5 لیٹر', flavour: 'Lemon-Lime', category: 'Lemon-Lime & Orange', unitSize: '1.5 Litre PET', cartonPack: '6 Bottles / Carton', price: null, moq: 10, kind: 'pet', color: '#8fc31f', accent: '#1f8f4e' },
  { id: '7', name: 'Orange Soda 1.5 Litre PET', nameUrdu: 'اورنج سوڈا 1.5 لیٹر', flavour: 'Orange', category: 'Lemon-Lime & Orange', unitSize: '1.5 Litre PET', cartonPack: '6 Bottles / Carton', price: null, moq: 10, kind: 'pet', color: '#ff8a1f', accent: '#d94e00' },
  { id: '4', name: 'Mango Nectar Drink 200ml Tetra', nameUrdu: 'مینگو جوس 200 ملی ٹیٹرا پیک', flavour: 'Mango', category: 'Juices', unitSize: '200ml Tetra Pack', cartonPack: '24 Packs / Carton', price: 1450, moq: 5, kind: 'tetra', color: '#ffb400', accent: '#e86a00' },
  { id: '5', name: 'Energy Drink 250ml Can', nameUrdu: 'انرجی ڈرنک 250 ملی لٹر کین', flavour: 'Energy', category: 'Energy', unitSize: '250ml Can', cartonPack: '24 Cans / Carton', price: 3800, moq: 5, kind: 'can', color: '#1b2a6b', accent: '#e6b800' },
  { id: '3', name: 'Mineral Water 500ml', nameUrdu: 'منرل واٹر 500 ملی لٹر', flavour: 'Water', category: 'Water', unitSize: '500ml Bottle', cartonPack: '24 Bottles / Shrink', price: 980, moq: 15, kind: 'water', color: '#8fd3f4', accent: '#1e6bff' },
  { id: '10', name: 'Mineral Water 1.5 Litre', nameUrdu: 'منرل واٹر 1.5 لیٹر', flavour: 'Water', category: 'Water', unitSize: '1.5 Litre PET', cartonPack: '6 Bottles / Carton', price: null, moq: 15, kind: 'water', color: '#8fd3f4', accent: '#1e6bff' },
  { id: '6', name: 'Non-Alcoholic Malt Beverage 330ml', nameUrdu: 'مالٹ بیوریج 330 ملی لٹر', flavour: 'Malt', category: 'Malt', unitSize: '330ml Bottle', cartonPack: '12 Bottles / Crate', price: null, moq: 10, kind: 'glass', color: '#6b3e12', accent: '#c98a2b' },
];

const CATEGORIES = ['All', 'Tipka', 'Cola', 'Lemon-Lime & Orange', 'Juices', 'Energy', 'Water', 'Malt'];

const T = {
  EN: {
    nav: ['Home', 'Products', 'How to order', 'Contact'],
    h1: 'Cold drinks for every shop in Kurram.',
    sub: 'Soft drinks, juices and water at wholesale carton rates, straight from our Saada warehouse.',
    cta1: 'Order on WhatsApp',
    cta2: 'See products',
    catTitle: 'Wholesale catalogue',
    catSub: 'Prices are per carton. Each product has a minimum order.',
    search: 'Search drinks',
    add: 'Add',
    cartons: 'cartons',
    call: 'Price on call',
    cart: 'Your order',
    send: 'Send order on WhatsApp',
    howTitle: 'How to order',
    steps: [
      ['Pick your cartons', 'Add drinks to your order. The minimum order is already set for each product.'],
      ['Send it on WhatsApp', 'Your order opens in WhatsApp with your shop details, ready to send.'],
      ['We confirm and deliver', 'We confirm the price and stock, then arrange delivery from Saada.'],
    ],
    contactTitle: 'Visit or call us',
    shopTitle: 'Visit our shop in Saada',
    shopBody: 'Stacked with cartons of soft drinks, juices and water. Come in, or send your order on WhatsApp and we will have it ready.',
  },
  UR: {
    nav: ['ہوم', 'مصنوعات', 'آرڈر کا طریقہ', 'رابطہ'],
    h1: 'کرم کی ہر دکان کے لیے ٹھنڈے مشروبات',
    sub: 'سوڈا، جوس اور پانی تھوک کارٹن ریٹ پر، ہمارے سدہ گودام سے۔',
    cta1: 'واٹس ایپ پر آرڈر کریں',
    cta2: 'مصنوعات دیکھیں',
    catTitle: 'تھوک کیٹلاگ',
    catSub: 'قیمتیں فی کارٹن ہیں۔ ہر پروڈکٹ کی کم از کم مقدار مقرر ہے۔',
    search: 'مشروب تلاش کریں',
    add: 'شامل کریں',
    cartons: 'کارٹن',
    call: 'قیمت کال پر',
    cart: 'آپ کا آرڈر',
    send: 'واٹس ایپ پر آرڈر بھیجیں',
    howTitle: 'آرڈر کا طریقہ',
    steps: [
      ['کارٹن منتخب کریں', 'مشروبات آرڈر میں شامل کریں۔ کم از کم مقدار پہلے سے مقرر ہے۔'],
      ['واٹس ایپ پر بھیجیں', 'آپ کا آرڈر دکان کی تفصیل کے ساتھ واٹس ایپ میں کھل جائے گا۔'],
      ['ہم تصدیق کر کے ڈیلیور کرتے ہیں', 'ہم قیمت اور اسٹاک کی تصدیق کر کے سدہ سے ڈیلیوری کا بندوبست کرتے ہیں۔'],
    ],
    contactTitle: 'ہم سے ملیں یا کال کریں',
    shopTitle: 'سدہ میں ہماری دکان پر آئیں',
    shopBody: 'سوڈا، جوس اور پانی کے کارٹن ہر وقت دستیاب۔ دکان پر آئیں یا واٹس ایپ پر آرڈر بھیجیں، ہم تیار رکھیں گے۔',
  },
};

const BUBBLES: [number, number, number, number][] = [
  [6, 10, 9, 0], [14, 18, 12, 2], [23, 8, 8, 4], [33, 14, 11, 1], [47, 9, 10, 5], [58, 20, 13, 3],
  [66, 10, 9, 6], [74, 16, 12, 0.5], [83, 8, 8, 2.5], [91, 14, 11, 4.5], [97, 9, 10, 1.5],
];

// [product id, height as a fraction of the scene, rotation in degrees]
const HERO: [string, number, number][] = [
  ['3', 0.6, -7], ['2', 0.5, -3], ['1', 1, 0], ['5', 0.58, 3], ['7', 0.82, 7],
];

const money = (n: number) => `PKR ${n.toLocaleString()}`;

const sizeShort = (p: Product) => {
  const m = p.unitSize.match(/^([\d.]+)\s*(Litre|ml)/i);
  return m ? `${m[1]}${m[2].toLowerCase() === 'ml' ? 'ml' : 'L'}` : undefined;
};

function Art({ p, className }: { p: Product; className?: string }) {
  if (p.photo) return <img src={p.photo} alt={p.name} className={`object-contain ${className ?? ''}`} />;
  return <Pack kind={p.kind} color={p.color} accent={p.accent} label={p.flavour} brand={p.brand} size={sizeShort(p)} className={className} />;
}

export default function App() {
  const [lang, setLang] = useState<'EN' | 'UR'>('EN');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const t = T[lang];

  const items = useMemo(
    () => PRODUCTS.filter((p) => cart[p.id] > 0).map((p) => ({ p, qty: cart[p.id] })),
    [cart],
  );
  const totalCartons = items.reduce((a, i) => a + i.qty, 0);
  const totalPKR = items.reduce((a, i) => a + (i.p.price ?? 0) * i.qty, 0);
  const hasQuote = items.some((i) => i.p.price === null);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          (p.name + p.flavour + (p.brand ?? '')).toLowerCase().includes(search.toLowerCase()),
      ),
    [category, search],
  );

  const add = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + (c[p.id] ? 1 : p.moq) }));
    setOpen(true);
  };
  const dec = (p: Product) =>
    setCart((c) => {
      const next = (c[p.id] ?? 0) - 1;
      const copy = { ...c };
      if (next < p.moq) delete copy[p.id];
      else copy[p.id] = next;
      return copy;
    });
  const remove = (p: Product) =>
    setCart((c) => {
      const copy = { ...c };
      delete copy[p.id];
      return copy;
    });

  const checkout = (f: { name: string; shop: string; phone: string; location: string }) => {
    let text = `*NEW WHOLESALE ORDER*\n━━━━━━━━━━━━━━\n*Name:* ${f.name}\n*Shop:* ${f.shop || '-'}\n*Phone:* ${f.phone}\n*Location:* ${f.location}\n━━━━━━━━━━━━━━\n`;
    items.forEach(({ p, qty }, i) => {
      text += `${i + 1}. *${p.name}* (${p.cartonPack})\n   ${qty} cartons — ${p.price ? money(p.price * qty) : 'Price on call'}\n`;
    });
    text += `━━━━━━━━━━━━━━\n*Estimated total:* ${money(totalPKR)}${hasQuote ? ' + items on call' : ''}`;
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const heroPacks = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[6], PRODUCTS[5], PRODUCTS[7]];

  return (
    <div dir={lang === 'UR' ? 'rtl' : 'ltr'} className="min-h-screen bg-frost text-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#04202e]/90 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime font-display text-lg font-extrabold text-ink">MN</span>
            <span className="leading-tight">
              <span className="block font-display text-base font-extrabold">Muhammad Nawaz</span>
              <span className="block text-xs text-white/60">Enterprises · Saada, Kurram</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 md:flex">
            {['#home', '#products', '#how', '#contact'].map((h, i) => (
              <a key={h} href={h} className="hover:text-lime">{t.nav[i]}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'EN' ? 'UR' : 'EN')}
              className="flex items-center gap-1 rounded-full border border-white/25 px-3 py-2 text-xs font-bold hover:bg-white/10"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" /> {lang === 'EN' ? 'اردو' : 'English'}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full bg-fizz px-4 py-2 text-sm font-bold text-white hover:brightness-95"
            >
              <ShoppingCart className="h-4 w-4" /> {totalCartons}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden bg-[#04202e] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,#0e6f93_0%,#07374d_40%,#04202e_75%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[34vw] font-extrabold leading-none tracking-tighter text-transparent md:text-[22vw]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.09)' }}>
            THANDA
          </div>
          {BUBBLES.map((b, i) => (
            <span key={i} aria-hidden className="bubble" style={{ left: `${b[0]}%`, width: b[1], height: b[1], animationDuration: `${b[2]}s`, animationDelay: `${b[3]}s` }} />
          ))}

          <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-4 pb-0 pt-12 md:grid-cols-[1fr_1.15fr] md:pt-16">
            <div className="pb-6 md:pb-16">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold ring-1 ring-white/20">
                <Snowflake className="h-4 w-4 text-lime" /> {BUSINESS.category}
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">{t.h1}</h1>
              <p className="mt-5 max-w-md text-lg text-white/75">{t.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Assalam-o-Alaikum, wholesale rates please')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1faa59] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#1faa59]/40 hover:brightness-110"
                >
                  <MessageCircle className="h-5 w-5" /> {t.cta1}
                </a>
                <a href="#products" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-ink hover:bg-lime">
                  {t.cta2} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              </div>
            </div>

            {/* Cold-case scene */}
            <div className="relative mx-auto flex w-full items-end justify-center" style={{ ['--sh' as string]: 'clamp(250px, 31vw, 420px)', height: 'var(--sh)' }}>
              <div className="absolute bottom-0 left-1/2 h-24 w-[90%] -translate-x-1/2 rounded-[50%] bg-[#9fe3f7]/25 blur-2xl" />
              <div className="absolute bottom-2 left-2 h-12 w-12 rotate-[18deg]"><IceCube className="h-full w-full" /></div>
              <div className="absolute bottom-3 right-0 h-14 w-14 -rotate-6"><IceCube className="h-full w-full" /></div>
              {HERO.map(([id, frac, rot], i) => {
                const p = PRODUCTS.find((x) => x.id === id)!;
                return (
                  <div
                    key={id}
                    className="rise relative -mx-2 sm:-mx-1"
                    style={{ ['--r' as string]: `${rot}deg`, ['--d' as string]: `${i * 0.12}s`, height: `calc(var(--sh) * ${frac})`, zIndex: frac > 0.95 ? 2 : 1 }}
                  >
                    <Art p={p} className="h-full w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flavour band */}
        <div className="overflow-hidden bg-lime py-4 text-ink">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 font-display text-2xl font-extrabold sm:text-3xl">
            {['Cola', 'Lemon-Lime', 'Orange', 'Mango', 'Energy', 'Water', 'Malt'].map((f, i) => (
              <span key={f} className="flex items-center gap-6">
                {i > 0 && <Snowflake className="h-5 w-5" aria-hidden />}
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="border-b border-ink/10 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-4 text-sm font-medium">
            <span className="flex items-center gap-2"><Store className="h-4 w-4 text-sky" /> New Noor Market, Saada</span>
            <span className="flex items-center gap-2"><Snowflake className="h-4 w-4 text-sky" /> Wholesale carton rates</span>
            <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#1faa59]" /> Order by WhatsApp</span>
          </div>
        </div>

        {/* Products */}
        <section id="products" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t.catTitle}</h2>
              <p className="mt-1 text-ink/60">{t.catSub}</p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
              aria-label={t.search}
              className="w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-sm outline-none focus:border-sky sm:w-72"
            />
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                  category === c ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-ink/15 hover:bg-glacier'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <article key={p.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl">
                <div
                  className="flex h-72 items-end justify-center pb-4 pt-6"
                  style={{ background: `radial-gradient(circle at 50% 75%, ${p.accent}40, transparent 68%), linear-gradient(#eaf7fd, #ffffff)` }}
                >
                  <Art p={p} className="h-full w-auto drop-shadow-[0_14px_14px_rgba(0,0,0,0.3)] transition group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base font-extrabold leading-snug">{lang === 'UR' ? p.nameUrdu : p.name}</h3>
                  <p className="mt-1 text-xs text-ink/60">{p.cartonPack} · min {p.moq} {t.cartons}</p>
                  <div className="mt-auto pt-4">
                    <p className="font-display text-lg font-extrabold text-sky">{p.price ? money(p.price) : t.call}</p>
                    <button
                      onClick={() => add(p)}
                      className="mt-2 flex w-full items-center justify-center gap-1 rounded-full bg-fizz py-2.5 text-sm font-bold text-white hover:brightness-95"
                    >
                      <Plus className="h-4 w-4" /> {t.add} {p.moq}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How to order */}
        <section id="how" className="scroll-mt-20 bg-ink py-16 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t.howTitle}</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {t.steps.map(([title, body], i) => (
                <li key={title} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime font-display text-lg font-extrabold text-ink">{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-extrabold">{title}</h3>
                  <p className="mt-2 text-white/70">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Our shop */}
        <section id="shop" className="mx-auto max-w-7xl px-4 pt-16">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
            <img
              src={shopPhoto}
              alt="Our wholesale cold drinks shop in New Noor Market, Saada"
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-xl ring-1 ring-ink/10"
            />
            <div>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t.shopTitle}</h2>
              <p className="mt-3 text-lg text-ink/70">{t.shopBody}</p>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1faa59] px-6 py-3.5 text-sm font-bold text-white hover:brightness-110"
              >
                <MessageCircle className="h-5 w-5" /> {t.cta1}
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t.contactTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-3xl bg-white p-6 ring-1 ring-ink/10">
              <p className="font-display text-xl font-extrabold">{BUSINESS.name}</p>
              <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sky" /> {BUSINESS.address}</p>
              <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-sky" /> <a href={`tel:${BUSINESS.phone}`} className="font-bold hover:underline" dir="ltr">{BUSINESS.phone}</a> <span className="text-ink/30">/</span> <a href={`tel:${BUSINESS.phone2}`} className="font-bold hover:underline" dir="ltr">{BUSINESS.phone2}</a></p>
              <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-sky" /> <a href={`mailto:${BUSINESS.email}`} className="hover:underline">{BUSINESS.email}</a></p>
            </div>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col justify-between gap-6 rounded-3xl bg-[#1faa59] p-6 text-white"
            >
              <MessageCircle className="h-10 w-10" />
              <div>
                <p className="font-display text-2xl font-extrabold">{t.cta1}</p>
                <p className="mt-1 text-white/85" dir="ltr">{BUSINESS.whatsappDisplay}</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 bg-white py-6 pb-24 text-center text-xs text-ink/60 md:pb-6">
        © {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.category}
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${BUSINESS.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1faa59] text-white shadow-xl md:flex"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Mobile order bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-ink/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <a
          href={`https://wa.me/${BUSINESS.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1faa59] py-3 text-sm font-bold text-white"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </a>
        <button onClick={() => setOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-fizz py-3 text-sm font-bold text-white">
          <ShoppingCart className="h-5 w-5" /> {totalCartons}
        </button>
      </div>

      {/* Cart drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/50" onClick={() => setOpen(false)}>
          <div dir={lang === 'UR' ? 'rtl' : 'ltr'} className="flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <h2 className="font-display text-xl font-extrabold">{t.cart} ({totalCartons})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-glacier"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {items.length === 0 && <p className="text-sm text-ink/60">Add drinks from the catalogue to start your order.</p>}
              {items.map(({ p, qty }) => (
                <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-frost p-3">
                  <div className="h-16 w-10 shrink-0"><Art p={p} className="h-full w-full" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-ink/60">{p.price ? money(p.price * qty) : t.call}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => dec(p)} aria-label="Fewer" className="rounded-full bg-white p-1.5 ring-1 ring-ink/15"><Minus className="h-4 w-4" /></button>
                    <span className="w-7 text-center text-sm font-bold">{qty}</span>
                    <button onClick={() => add(p)} aria-label="More" className="rounded-full bg-white p-1.5 ring-1 ring-ink/15"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button onClick={() => remove(p)} aria-label="Remove" className="text-ink/40 hover:text-fizz"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const d = new FormData(e.currentTarget);
                checkout({
                  name: String(d.get('name')),
                  shop: String(d.get('shop')),
                  phone: String(d.get('phone')),
                  location: String(d.get('location')),
                });
              }}
              className="space-y-2 border-t border-ink/10 pt-4 text-sm"
            >
              <input required name="name" placeholder="Your name *" className="w-full rounded-xl border border-ink/15 p-3" />
              <input name="shop" placeholder="Shop name" className="w-full rounded-xl border border-ink/15 p-3" />
              <input required name="phone" type="tel" placeholder="Phone number *" className="w-full rounded-xl border border-ink/15 p-3" />
              <select name="location" className="w-full rounded-xl border border-ink/15 bg-white p-3">
                <option>Saada Bazaar</option>
                <option>Sadda Town</option>
                <option>Parachinar</option>
                <option>District Kurram (other)</option>
              </select>
              <div className="flex justify-between pt-2 font-display text-lg font-extrabold">
                <span>Estimated total</span>
                <span className="text-sky">{money(totalPKR)}</span>
              </div>
              {hasQuote && <p className="text-xs text-ink/60">Some items are priced on call and not included in this total.</p>}
              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full rounded-full bg-[#1faa59] py-3.5 font-bold text-white disabled:opacity-40"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
