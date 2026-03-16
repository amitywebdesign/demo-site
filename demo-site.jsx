const { useState, useEffect, useRef } = React;

// ========== CONFIGURATION ==========
const BUSINESS = {
  name: "Evergreen & Co.",
  tagline: "Crafted experiences for your community",
  phone: "(203) 555-0172",
  email: "hello@evergreenco.com",
  address: "142 Main Street, Suite 200",
  city: "New Haven, CT 06510",
  hours: {
    "Monday – Friday": "9:00 AM – 6:00 PM",
    Saturday: "10:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

const SERVICES = [
  { id: 1, icon: "✦", title: "Strategy & Consulting", desc: "We listen first, then build a plan tailored to your goals and your market.", price: "From $500", details: "Our consulting process starts with a deep-dive discovery session where we learn everything about your business, your customers, and your competitive landscape. From there, we develop a comprehensive strategy document with clear milestones and measurable outcomes." },
  { id: 2, icon: "◈", title: "Design & Branding", desc: "Visual identity that tells your story at a glance — logos, palettes, and more.", price: "From $750", details: "Great branding is more than a logo. We create complete visual identity systems including typography, color palettes, iconography, brand voice guidelines, and collateral templates that keep your brand consistent across every touchpoint." },
  { id: 3, icon: "△", title: "Web Development", desc: "Fast, responsive, beautiful websites built for real people and real results.", price: "From $1,200", details: "Every site we build is mobile-first, lightning fast, and designed to convert visitors into customers. We handle everything from single-page landing sites to full e-commerce platforms, all with clean code and SEO best practices baked in." },
  { id: 4, icon: "○", title: "Photography", desc: "Professional photo and video that captures the feeling of your brand.", price: "From $300", details: "Whether you need product shots, team portraits, event coverage, or lifestyle imagery, we bring the right equipment and creative eye to every shoot. All photos are professionally edited and delivered in multiple formats." },
  { id: 5, icon: "□", title: "Marketing & SEO", desc: "Get found by the right people with campaigns that actually move the needle.", price: "From $400/mo", details: "We combine local SEO, content marketing, social media management, and targeted ad campaigns to build a marketing engine that delivers consistent, measurable growth month over month." },
  { id: 6, icon: "◇", title: "Ongoing Support", desc: "Maintenance, updates, and a partner you can call when things change.", price: "From $150/mo", details: "Websites need care. Our support plans include regular updates, security monitoring, performance optimization, content changes, and priority response times so you never have to worry about your online presence." },
];

const TEAM = [
  { name: "Jordan Ellis", role: "Founder & Lead Strategist", bio: "15 years helping local businesses find their voice.", img: "JE" },
  { name: "Maya Chen", role: "Creative Director", bio: "Former agency designer who chose community over corporate.", img: "MC" },
  { name: "Sam Okoro", role: "Lead Developer", bio: "Full-stack engineer obsessed with performance and clean code.", img: "SO" },
  { name: "Alex Rivera", role: "Marketing Manager", bio: "Data-driven marketer with a knack for storytelling.", img: "AR" },
];

const TESTIMONIALS = [
  { name: "Rebecca Torres", business: "Torres Family Bakery", text: "They completely transformed our online presence. We went from invisible to the first result on Google in our area. The phone hasn't stopped ringing.", rating: 5 },
  { name: "David Park", business: "Park Dental Associates", text: "Professional, responsive, and genuinely invested in our success. The website they built us looks like it belongs to a practice ten times our size.", rating: 5 },
  { name: "Lisa Moreau", business: "Moreau Interiors", text: "The gallery they designed for our portfolio is stunning. Clients constantly comment on how polished our site looks. Worth every penny.", rating: 5 },
  { name: "James Whitfield", business: "Whitfield Auto", text: "Finally a team that actually listens. They understood our customers and built something that speaks directly to them. Booking is up 40%.", rating: 5 },
  { name: "Priya Sharma", business: "Namaste Yoga Studio", text: "From branding to website to ongoing support — they handle everything so I can focus on teaching. Couldn't run my business without them.", rating: 5 },
  { name: "Tom Brannigan", business: "Brannigan's Pub", text: "The photography alone was worth it. They captured exactly who we are. The website just ties it all together beautifully.", rating: 4 },
];

const GALLERY_ITEMS = [
  { id: 1, cat: "branding", label: "Torres Bakery — Brand Identity", h: 280 },
  { id: 2, cat: "web", label: "Park Dental — Website Redesign", h: 340 },
  { id: 3, cat: "photo", label: "Brannigan's Pub — Photo Shoot", h: 260 },
  { id: 4, cat: "web", label: "Namaste Yoga — Booking Site", h: 320 },
  { id: 5, cat: "branding", label: "Whitfield Auto — Logo Suite", h: 290 },
  { id: 6, cat: "photo", label: "Moreau Interiors — Portfolio Shoot", h: 350 },
  { id: 7, cat: "web", label: "Elm City Coffee — E-commerce", h: 270 },
  { id: 8, cat: "branding", label: "Rivera Law — Stationery System", h: 310 },
  { id: 9, cat: "photo", label: "Park Dental — Team Portraits", h: 280 },
];

const PRICING = [
  { tier: "Starter", price: "$1,200", period: "one-time", desc: "Perfect for new businesses that need a professional online presence.", features: ["5-page responsive website", "Basic SEO setup", "Contact form integration", "Mobile optimization", "2 rounds of revisions", "1 month of support"], highlight: false },
  { tier: "Growth", price: "$2,800", period: "one-time", desc: "For businesses ready to invest in real growth and visibility.", features: ["10-page custom website", "Advanced SEO & analytics", "Booking system integration", "Photo gallery with lightbox", "Brand style guide", "Social media setup", "3 months of support"], highlight: true },
  { tier: "Enterprise", price: "$5,500+", period: "one-time", desc: "Full-service partnership for ambitious brands.", features: ["Unlimited pages", "E-commerce functionality", "Custom photography session", "Full brand identity design", "Marketing strategy & execution", "Priority ongoing support", "Quarterly performance reviews"], highlight: false },
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Most websites take 3–6 weeks from kickoff to launch. Branding projects run 2–4 weeks. We'll give you a clear timeline during our first call." },
  { q: "Do I own the final product?", a: "Absolutely. Once the project is complete and paid for, everything — code, designs, photos — belongs to you." },
  { q: "Can you work with my existing branding?", a: "Of course. We're happy to build within your existing brand guidelines, or we can refine and evolve them if you'd like a refresh." },
  { q: "What if I need changes after launch?", a: "All our packages include a support period. After that, we offer affordable monthly plans or one-off change requests." },
  { q: "Do you only work with local businesses?", a: "We specialize in local and small businesses, but we've worked with clients across the country. If we're a good fit, geography doesn't matter." },
  { q: "What platform do you build on?", a: "We build custom — no page builders or cookie-cutter templates. Every site is hand-coded for speed, security, and flexibility." },
];

const BLOG_POSTS = [
  { id: 1, title: "Why Your Website Is Losing You Customers (And How to Fix It)", date: "March 10, 2026", cat: "Web Design", excerpt: "Most small business websites make the same five mistakes. Here's how to spot them and what to do about it.", readTime: "6 min read" },
  { id: 2, title: "The Local SEO Checklist Every Small Business Needs", date: "February 24, 2026", cat: "Marketing", excerpt: "Showing up on Google Maps isn't magic. It's a system. Here's the exact checklist we use with every client.", readTime: "8 min read" },
  { id: 3, title: "Investing in Branding: When It's Worth It and When It's Not", date: "February 10, 2026", cat: "Branding", excerpt: "Not every business needs a $10,000 brand overhaul. Here's a framework for deciding what level of branding investment makes sense for you.", readTime: "5 min read" },
  { id: 4, title: "How We Helped Torres Bakery Triple Their Online Orders", date: "January 28, 2026", cat: "Case Study", excerpt: "A local bakery was struggling to compete online. Here's what we did and the results that followed.", readTime: "7 min read" },
];

const PAGES = {
  home: "Home",
  about: "About",
  services: "Services",
  gallery: "Gallery",
  testimonials: "Reviews",
  pricing: "Pricing",
  faq: "FAQ",
  blog: "Blog",
  contact: "Contact",
};

// ========== STYLES ==========
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --charcoal: #1a1a1a; --ink: #2d2d2d; --warm-gray: #6b6560; --stone: #a39e98;
    --cream: #f5f0eb; --warm-white: #faf8f5; --accent: #c45d3e; --accent-light: #e8734f;
    --accent-bg: #fdf0ec; --serif: 'DM Serif Display', Georgia, serif;
    --sans: 'Outfit', system-ui, sans-serif; --radius: 12px;
    --shadow: 0 4px 24px rgba(0,0,0,0.06); --shadow-lg: 0 12px 48px rgba(0,0,0,0.1);
  }
  body, #root { font-family: var(--sans); color: var(--charcoal); background: var(--warm-white); }
  .fade-in { animation: fadeIn 0.5s ease both; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .stagger > * { animation: fadeIn 0.5s ease both; }
  .stagger > *:nth-child(1) { animation-delay: 0.05s; } .stagger > *:nth-child(2) { animation-delay: 0.1s; }
  .stagger > *:nth-child(3) { animation-delay: 0.15s; } .stagger > *:nth-child(4) { animation-delay: 0.2s; }
  .stagger > *:nth-child(5) { animation-delay: 0.25s; } .stagger > *:nth-child(6) { animation-delay: 0.3s; }
  .stagger > *:nth-child(7) { animation-delay: 0.35s; } .stagger > *:nth-child(8) { animation-delay: 0.4s; }
  .stagger > *:nth-child(9) { animation-delay: 0.45s; }
  .pw { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .sec { padding: 80px 0; }
  .sl { font-family: var(--sans); font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .st { font-family: var(--serif); font-size: clamp(28px, 4vw, 44px); line-height: 1.15; color: var(--charcoal); margin-bottom: 16px; }
  .ss { font-size: 17px; color: var(--warm-gray); line-height: 1.6; max-width: 560px; }
  a { color: inherit; text-decoration: none; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 50px; font-family: var(--sans); font-size: 15px; font-weight: 500; cursor: pointer; border: none; transition: all 0.25s ease; }
  .btn-p { background: var(--accent); color: white; }
  .btn-p:hover { background: var(--accent-light); transform: translateY(-2px); box-shadow: var(--shadow); }
  .btn-o { background: transparent; border: 1.5px solid var(--charcoal); color: var(--charcoal); }
  .btn-o:hover { background: var(--charcoal); color: white; }
  .btn-g { background: transparent; color: var(--accent); padding: 8px 0; }
  .btn-g:hover { gap: 12px; }
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(250,248,245,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,0.05); }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 68px; }
  .nav-logo { font-family: var(--serif); font-size: 22px; cursor: pointer; }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 28px; align-items: center; }
  .nl { font-size: 14px; font-weight: 500; color: var(--warm-gray); cursor: pointer; transition: color 0.2s; position: relative; }
  .nl:hover, .nl.act { color: var(--charcoal); }
  .nl.act::after { content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 2px; background: var(--accent); border-radius: 1px; }
  .nav-cta { font-size: 13px; font-weight: 600; background: var(--accent); color: white; padding: 10px 22px; border-radius: 50px; cursor: pointer; transition: all 0.2s; }
  .nav-cta:hover { background: var(--accent-light); }
  .mt { display: none; cursor: pointer; font-size: 24px; background: none; border: none; color: var(--charcoal); }
  @media (max-width: 800px) {
    .nav-links { display: none; }
    .nav-links.open { display: flex; flex-direction: column; position: absolute; top: 68px; left: 0; right: 0; background: var(--warm-white); padding: 24px; gap: 16px; border-bottom: 1px solid rgba(0,0,0,0.08); box-shadow: var(--shadow); }
    .mt { display: block; }
  }
  .hero { padding: 100px 0 80px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -120px; right: -200px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, var(--accent-bg) 0%, transparent 70%); pointer-events: none; }
  .hero-c { position: relative; z-index: 1; max-width: 680px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-bg); color: var(--accent); font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 50px; margin-bottom: 24px; }
  .hero-t { font-family: var(--serif); font-size: clamp(40px, 6vw, 64px); line-height: 1.08; color: var(--charcoal); margin-bottom: 20px; }
  .hero-t em { color: var(--accent); font-style: italic; }
  .hero-d { font-size: 18px; color: var(--warm-gray); line-height: 1.65; max-width: 520px; margin-bottom: 36px; }
  .hero-a { display: flex; gap: 16px; flex-wrap: wrap; }
  .hero-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 40px; border-top: 1px solid rgba(0,0,0,0.06); }
  .hs-n { font-family: var(--serif); font-size: 36px; color: var(--charcoal); }
  .hs-l { font-size: 13px; color: var(--stone); margin-top: 4px; }
  .card { background: white; border-radius: var(--radius); padding: 32px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; }
  .card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); border-color: transparent; }
  .ci { font-size: 28px; color: var(--accent); margin-bottom: 16px; display: block; }
  .ct { font-family: var(--serif); font-size: 20px; margin-bottom: 8px; }
  .cx { font-size: 15px; color: var(--warm-gray); line-height: 1.6; }
  .g2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
  .g3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .gf { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
  .gfb { padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: 1.5px solid rgba(0,0,0,0.1); background: transparent; color: var(--warm-gray); font-family: var(--sans); }
  .gfb.act { background: var(--charcoal); color: white; border-color: var(--charcoal); }
  .gg { columns: 3; column-gap: 16px; }
  @media (max-width: 800px) { .gg { columns: 2; } }
  @media (max-width: 500px) { .gg { columns: 1; } }
  .gi { break-inside: avoid; margin-bottom: 16px; border-radius: var(--radius); overflow: hidden; position: relative; cursor: pointer; }
  .gi:hover .go { opacity: 1; }
  .go { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.65)); color: white; font-size: 14px; font-weight: 500; opacity: 0; transition: opacity 0.3s; border-radius: 0 0 var(--radius) var(--radius); }
  .tc { background: white; border-radius: var(--radius); padding: 36px; border: 1px solid rgba(0,0,0,0.05); position: relative; }
  .tq { font-size: 32px; color: var(--accent); opacity: 0.3; position: absolute; top: 20px; right: 24px; font-family: var(--serif); }
  .ts { color: #f5a623; font-size: 14px; margin-bottom: 16px; letter-spacing: 2px; }
  .tt { font-size: 16px; line-height: 1.7; color: var(--ink); margin-bottom: 20px; font-style: italic; }
  .ta { font-weight: 600; font-size: 15px; }
  .tb { font-size: 13px; color: var(--stone); }
  .tmc { text-align: center; }
  .tma { width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 16px; background: var(--cream); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 28px; color: var(--accent); border: 3px solid white; box-shadow: var(--shadow); }
  .tmn { font-family: var(--serif); font-size: 19px; margin-bottom: 4px; }
  .tmr { font-size: 13px; color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .tmb { font-size: 14px; color: var(--warm-gray); line-height: 1.5; }
  .pc { background: white; border-radius: var(--radius); padding: 40px 32px; border: 1px solid rgba(0,0,0,0.06); text-align: center; display: flex; flex-direction: column; transition: all 0.3s; }
  .pc.hl { background: var(--charcoal); color: white; border-color: transparent; box-shadow: var(--shadow-lg); transform: scale(1.03); }
  .pt { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
  .pc.hl .pt { color: var(--accent-light); }
  .pp { font-family: var(--serif); font-size: 42px; margin-bottom: 4px; }
  .ppd { font-size: 13px; color: var(--stone); margin-bottom: 16px; }
  .pc.hl .ppd { color: rgba(255,255,255,0.5); }
  .pds { font-size: 15px; margin-bottom: 28px; line-height: 1.5; }
  .pc:not(.hl) .pds { color: var(--warm-gray); }
  .pc.hl .pds { color: rgba(255,255,255,0.75); }
  .pf { list-style: none; text-align: left; margin-bottom: 32px; flex: 1; }
  .pf li { padding: 10px 0; font-size: 14px; border-bottom: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; gap: 10px; }
  .pc.hl .pf li { border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); }
  .pck { color: var(--accent); font-weight: 700; }
  .fi { border-bottom: 1px solid rgba(0,0,0,0.06); padding: 20px 0; cursor: pointer; }
  .fiq { display: flex; justify-content: space-between; align-items: center; font-size: 17px; font-weight: 500; gap: 16px; }
  .fit { font-size: 20px; color: var(--accent); transition: transform 0.3s; flex-shrink: 0; }
  .fit.op { transform: rotate(45deg); }
  .fia { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; font-size: 15px; color: var(--warm-gray); line-height: 1.7; }
  .fia.op { max-height: 200px; padding-top: 12px; }
  .bc { background: white; border-radius: var(--radius); overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s; cursor: pointer; }
  .bc:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
  .bth { height: 180px; background: var(--cream); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 48px; color: var(--stone); opacity: 0.3; }
  .bbd { padding: 24px; }
  .bm { font-size: 12px; color: var(--stone); display: flex; gap: 12px; margin-bottom: 10px; }
  .bmc { color: var(--accent); font-weight: 600; }
  .btc { font-family: var(--serif); font-size: 19px; margin-bottom: 8px; line-height: 1.3; }
  .bex { font-size: 14px; color: var(--warm-gray); line-height: 1.6; }
  .ph { padding: 80px 0 40px; max-width: 720px; margin: 0 auto; }
  .pbk { font-size: 14px; color: var(--accent); cursor: pointer; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 6px; }
  .ptl { font-family: var(--serif); font-size: clamp(28px, 4vw, 40px); line-height: 1.2; margin-bottom: 16px; }
  .pcn { max-width: 720px; margin: 0 auto; padding-bottom: 80px; font-size: 17px; line-height: 1.8; color: var(--ink); }
  .pcn p { margin-bottom: 24px; }
  .pcn h2 { font-family: var(--serif); font-size: 24px; margin: 40px 0 16px; }
  .cg { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  @media (max-width: 800px) { .cg { grid-template-columns: 1fr; } }
  .fg { margin-bottom: 20px; }
  .fl { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
  .fin, .fta { width: 100%; padding: 14px 16px; border: 1.5px solid rgba(0,0,0,0.1); border-radius: 10px; font-family: var(--sans); font-size: 15px; transition: border-color 0.2s; background: white; color: var(--charcoal); }
  .fin:focus, .fta:focus { outline: none; border-color: var(--accent); }
  .fta { min-height: 140px; resize: vertical; }
  .fsl { width: 100%; padding: 14px 16px; border: 1.5px solid rgba(0,0,0,0.1); border-radius: 10px; font-family: var(--sans); font-size: 15px; background: white; color: var(--charcoal); appearance: none; cursor: pointer; }
  .cib { margin-bottom: 28px; }
  .cil { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
  .civ { font-size: 16px; color: var(--ink); line-height: 1.5; }
  .hr { display: flex; justify-content: space-between; font-size: 15px; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
  .hrd { color: var(--ink); font-weight: 500; }
  .hrt { color: var(--warm-gray); }
  .footer { background: var(--charcoal); color: rgba(255,255,255,0.7); padding: 64px 0 32px; }
  .fgrid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  @media (max-width: 800px) { .fgrid { grid-template-columns: 1fr 1fr; } }
  .fbr { font-family: var(--serif); font-size: 24px; color: white; margin-bottom: 12px; }
  .fbr span { color: var(--accent-light); }
  .fds { font-size: 14px; line-height: 1.6; max-width: 300px; }
  .fh { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: white; margin-bottom: 16px; }
  .flink { display: block; font-size: 14px; margin-bottom: 10px; cursor: pointer; transition: color 0.2s; }
  .flink:hover { color: white; }
  .fbot { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; font-size: 13px; text-align: center; }
  .ag { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  @media (max-width: 800px) { .ag { grid-template-columns: 1fr; } }
  .ai { aspect-ratio: 4/3; background: var(--cream); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 80px; color: var(--stone); opacity: 0.2; }
  .av { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px; }
  .avn { font-family: var(--serif); font-size: 28px; color: var(--accent); }
  .avl { font-size: 13px; color: var(--warm-gray); margin-top: 4px; }
  .sdh { padding: 80px 0 40px; background: var(--cream); }
  .sdb { font-size: 14px; color: var(--accent); cursor: pointer; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 6px; }
  .sdi { font-size: 48px; color: var(--accent); margin-bottom: 16px; display: block; }
  .sdp { font-size: 15px; color: var(--accent); font-weight: 600; margin-top: 12px; }
  .sdc { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; font-size: 17px; line-height: 1.8; color: var(--ink); }
  .sdc p { margin-bottom: 24px; }
  .lb { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 200; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; cursor: pointer; animation: fadeIn 0.3s ease; }
  .lbi { background: white; border-radius: var(--radius); padding: 24px; max-width: 600px; width: 90%; text-align: center; }
  .lbimg { width: 100%; height: 300px; background: var(--cream); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 40px; color: var(--stone); opacity: 0.3; margin-bottom: 16px; }
  .lbl { font-family: var(--serif); font-size: 20px; }
  .toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: var(--charcoal); color: white; padding: 14px 28px; border-radius: 50px; font-size: 14px; font-weight: 500; z-index: 300; animation: toastIn 0.4s ease, toastOut 0.4s ease 2.6s forwards; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } }
  @keyframes toastOut { to { opacity: 0; transform: translateX(-50%) translateY(20px); } }
`;

export default function DemoSite() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [postId, setPostId] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [toast, setToast] = useState(null);
  const scrollRef = useRef(null);

  const go = (p, extra) => {
    setPage(p);
    setMenuOpen(false);
    if (extra?.sid) setServiceId(extra.sid);
    if (extra?.pid) setPostId(extra.pid);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const clrs = ["#c45d3e","#3e8c7a","#5a6abf","#bf8c3e","#8c3e6b","#3e6b8c","#7a8c3e","#6b3e8c","#3e8c5a"];
  const gc = (id) => clrs[(id-1) % clrs.length];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{css}</style>

      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go("home")}>Evergreen <span>&</span> Co.</div>
          <button className="mt" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {Object.entries(PAGES).map(([k,v]) => (
              <span key={k} className={`nl ${page === k ? "act" : ""}`} onClick={() => go(k)}>{v}</span>
            ))}
            <span className="nav-cta" onClick={() => go("contact")}>Get a Quote</span>
          </div>
        </div>
      </nav>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>

        {page === "home" && (
          <div className="fade-in">
            <div className="pw">
              <section className="hero">
                <div className="hero-c">
                  <div className="hero-badge">✦ Now booking Q2 projects</div>
                  <h1 className="hero-t">We build websites that <em>actually work</em> for your business.</h1>
                  <p className="hero-d">Design, development, and strategy for local businesses who are tired of templates and ready for something real.</p>
                  <div className="hero-a">
                    <button className="btn btn-p" onClick={() => go("contact")}>Start a Project →</button>
                    <button className="btn btn-o" onClick={() => go("gallery")}>See Our Work</button>
                  </div>
                  <div className="hero-stats">
                    <div><div className="hs-n">120+</div><div className="hs-l">Projects Delivered</div></div>
                    <div><div className="hs-n">4.9★</div><div className="hs-l">Average Rating</div></div>
                    <div><div className="hs-n">6</div><div className="hs-l">Years Running</div></div>
                  </div>
                </div>
              </section>
            </div>
            <div style={{ background: "var(--cream)", padding: "1px 0" }}>
              <div className="pw sec">
                <div className="sl">What We Do</div>
                <div className="st">Services built around your needs</div>
                <p className="ss" style={{ marginBottom: 40 }}>Every business is different. Here's how we help.</p>
                <div className="g3 stagger">
                  {SERVICES.map(s => (
                    <div className="card" key={s.id} onClick={() => go("serviceDetail", {sid: s.id})}>
                      <span className="ci">{s.icon}</span>
                      <h3 className="ct">{s.title}</h3>
                      <p className="cx">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pw sec">
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div className="sl">Testimonials</div>
                <div className="st">Trusted by local businesses</div>
              </div>
              <div className="g3 stagger">
                {TESTIMONIALS.slice(0,3).map((t,i) => (
                  <div className="tc" key={i}>
                    <div className="tq">"</div>
                    <div className="ts">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</div>
                    <p className="tt">"{t.text}"</p>
                    <div className="ta">{t.name}</div>
                    <div className="tb">{t.business}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 32 }}>
                <button className="btn btn-g" onClick={() => go("testimonials")}>Read all reviews →</button>
              </div>
            </div>
            <div style={{ background: "var(--charcoal)", color: "white", padding: "64px 0", textAlign: "center" }}>
              <div className="pw">
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 4vw, 36px)", marginBottom: 12 }}>Ready to stand out online?</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 28, fontSize: 17 }}>Let's talk about what you need. No pressure, no jargon.</p>
                <button className="btn btn-p" onClick={() => go("contact")}>Book a Free Consultation →</button>
              </div>
            </div>
          </div>
        )}

        {page === "about" && (
          <div className="fade-in">
            <div className="pw sec">
              <div className="ag">
                <div>
                  <div className="sl">Our Story</div>
                  <div className="st">We started because local businesses deserve better.</div>
                  <p className="ss" style={{ maxWidth: "100%", marginBottom: 20 }}>Evergreen & Co. was founded in 2020 with a simple idea: small businesses shouldn't have to choose between affordable and professional when it comes to their online presence.</p>
                  <p style={{ fontSize: 15, color: "var(--warm-gray)", lineHeight: 1.7 }}>We've worked with over 120 businesses across Connecticut and beyond — bakeries, law firms, yoga studios, auto shops, dental practices, and everything in between. Every project starts with listening and ends with something the client is genuinely proud of.</p>
                </div>
                <div className="ai">E</div>
              </div>
              <div className="av">
                <div><div className="avn">120+</div><div className="avl">Happy Clients</div></div>
                <div><div className="avn">98%</div><div className="avl">Retention Rate</div></div>
                <div><div className="avn">4.9★</div><div className="avl">Average Review</div></div>
                <div><div className="avn">3 wk</div><div className="avl">Avg. Turnaround</div></div>
              </div>
            </div>
            <div style={{ background: "var(--cream)", padding: "1px 0" }}>
              <div className="pw sec">
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                  <div className="sl">The Team</div>
                  <div className="st">The people behind the pixels</div>
                </div>
                <div className="g2 stagger" style={{ maxWidth: 800, margin: "0 auto" }}>
                  {TEAM.map((m,i) => (
                    <div className="tmc" key={i}>
                      <div className="tma">{m.img}</div>
                      <div className="tmn">{m.name}</div>
                      <div className="tmr">{m.role}</div>
                      <div className="tmb">{m.bio}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {page === "services" && (
          <div className="fade-in">
            <div className="pw sec">
              <div className="sl">Services</div>
              <div className="st">Everything your business needs online</div>
              <p className="ss" style={{ marginBottom: 48 }}>From first impression to ongoing growth — we've got you covered.</p>
              <div className="g3 stagger">
                {SERVICES.map(s => (
                  <div className="card" key={s.id} onClick={() => go("serviceDetail", {sid: s.id})}>
                    <span className="ci">{s.icon}</span>
                    <h3 className="ct">{s.title}</h3>
                    <p className="cx">{s.desc}</p>
                    <div style={{ marginTop: 16, fontSize: 14, color: "var(--accent)", fontWeight: 600 }}>{s.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "serviceDetail" && (() => {
          const s = SERVICES.find(x => x.id === serviceId) || SERVICES[0];
          return (
            <div className="fade-in">
              <div className="sdh"><div className="pw">
                <span className="sdb" onClick={() => go("services")}>← Back to Services</span>
                <span className="sdi">{s.icon}</span>
                <h1 className="st">{s.title}</h1>
                <p className="ss">{s.desc}</p>
                <div className="sdp">{s.price}</div>
              </div></div>
              <div className="sdc">
                <p>{s.details}</p>
                <p>We approach every engagement with a clear process: discovery, planning, execution, and refinement. You'll never be left guessing where things stand — we keep you in the loop at every step with regular check-ins and transparent timelines.</p>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, margin: "40px 0 16px" }}>What's Included</h2>
                <p>Every {s.title.toLowerCase()} engagement includes an initial consultation, a detailed project brief, dedicated project management, and post-delivery support. We don't disappear after handoff.</p>
                <div style={{ marginTop: 40 }}><button className="btn btn-p" onClick={() => go("contact")}>Get Started →</button></div>
              </div>
            </div>
          );
        })()}

        {page === "gallery" && (
          <div className="fade-in">
            <div className="pw sec">
              <div className="sl">Portfolio</div>
              <div className="st">Work we're proud of</div>
              <p className="ss" style={{ marginBottom: 32 }}>A selection of recent projects across branding, web, and photography.</p>
              <div className="gf">
                {["all","branding","web","photo"].map(f => (
                  <button key={f} className={`gfb ${galleryFilter === f ? "act" : ""}`} onClick={() => setGalleryFilter(f)}>
                    {f === "all" ? "All Work" : f === "photo" ? "Photography" : f.charAt(0).toUpperCase()+f.slice(1)}
                  </button>
                ))}
              </div>
              <div className="gg stagger">
                {GALLERY_ITEMS.filter(g => galleryFilter === "all" || g.cat === galleryFilter).map(g => (
                  <div className="gi" key={g.id} onClick={() => setLightbox(g)}>
                    <div style={{ height: g.h, background: `linear-gradient(135deg, ${gc(g.id)}22, ${gc(g.id)}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, color: gc(g.id), opacity: 0.3, fontFamily: "var(--serif)" }}>
                      {g.cat === "branding" ? "◈" : g.cat === "web" ? "△" : "○"}
                    </div>
                    <div className="go">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {lightbox && (
              <div className="lb" onClick={() => setLightbox(null)}>
                <div className="lbi" onClick={e => e.stopPropagation()}>
                  <div className="lbimg" style={{ background: `linear-gradient(135deg, ${gc(lightbox.id)}22, ${gc(lightbox.id)}44)` }}>
                    {lightbox.cat === "branding" ? "◈" : lightbox.cat === "web" ? "△" : "○"}
                  </div>
                  <div className="lbl">{lightbox.label}</div>
                  <p style={{ color: "var(--warm-gray)", fontSize: 14, marginTop: 8 }}>{lightbox.cat.charAt(0).toUpperCase()+lightbox.cat.slice(1)} Project</p>
                  <button className="btn btn-o" style={{ marginTop: 16 }} onClick={() => setLightbox(null)}>Close</button>
                </div>
              </div>
            )}
          </div>
        )}

        {page === "testimonials" && (
          <div className="fade-in">
            <div className="pw sec">
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="sl">Reviews</div>
                <div className="st">What our clients say</div>
                <p className="ss" style={{ margin: "0 auto" }}>Real feedback from real businesses we've worked with.</p>
              </div>
              <div className="g2 stagger">
                {TESTIMONIALS.map((t,i) => (
                  <div className="tc" key={i}>
                    <div className="tq">"</div>
                    <div className="ts">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</div>
                    <p className="tt">"{t.text}"</p>
                    <div className="ta">{t.name}</div>
                    <div className="tb">{t.business}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "pricing" && (
          <div className="fade-in">
            <div className="pw sec">
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="sl">Pricing</div>
                <div className="st">Simple, honest pricing</div>
                <p className="ss" style={{ margin: "0 auto" }}>No hidden fees. No surprises. Just clear packages that grow with you.</p>
              </div>
              <div className="g3 stagger">
                {PRICING.map((p,i) => (
                  <div className={`pc ${p.highlight ? "hl" : ""}`} key={i}>
                    <div className="pt">{p.tier}</div>
                    <div className="pp">{p.price}</div>
                    <div className="ppd">{p.period}</div>
                    <div className="pds">{p.desc}</div>
                    <ul className="pf">
                      {p.features.map((f,j) => <li key={j}><span className="pck">✓</span> {f}</li>)}
                    </ul>
                    <button className={`btn ${p.highlight ? "btn-p" : "btn-o"}`} style={{ width: "100%", justifyContent: "center" }} onClick={() => go("contact")}>Get Started</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "faq" && (
          <div className="fade-in">
            <div className="pw sec" style={{ maxWidth: 720, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="sl">FAQ</div>
                <div className="st">Common questions</div>
              </div>
              {FAQS.map((f,i) => (
                <div className="fi" key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="fiq">{f.q}<span className={`fit ${openFaq === i ? "op" : ""}`}>+</span></div>
                  <div className={`fia ${openFaq === i ? "op" : ""}`}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "blog" && (
          <div className="fade-in">
            <div className="pw sec">
              <div className="sl">Blog</div>
              <div className="st">Insights & updates</div>
              <p className="ss" style={{ marginBottom: 40 }}>Practical advice for small businesses, from the people who build for them.</p>
              <div className="g2 stagger">
                {BLOG_POSTS.map(p => (
                  <div className="bc" key={p.id} onClick={() => go("blogPost", {pid: p.id})}>
                    <div className="bth">✎</div>
                    <div className="bbd">
                      <div className="bm"><span className="bmc">{p.cat}</span><span>{p.date}</span><span>{p.readTime}</span></div>
                      <h3 className="btc">{p.title}</h3>
                      <p className="bex">{p.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "blogPost" && (() => {
          const p = BLOG_POSTS.find(x => x.id === postId) || BLOG_POSTS[0];
          return (
            <div className="fade-in">
              <div className="pw">
                <div className="ph">
                  <span className="pbk" onClick={() => go("blog")}>← Back to Blog</span>
                  <div className="bm" style={{ marginBottom: 16 }}><span className="bmc">{p.cat}</span><span>{p.date}</span><span>{p.readTime}</span></div>
                  <h1 className="ptl">{p.title}</h1>
                </div>
                <div className="pcn">
                  <p>{p.excerpt}</p>
                  <p>If you're running a local business in 2026, your website isn't just a digital brochure — it's your storefront, your sales team, and your first impression all rolled into one. And yet, most small business websites are still making the same fundamental mistakes that drive potential customers away.</p>
                  <h2>The Problem Most People Miss</h2>
                  <p>It's not about having the fanciest design or the most pages. It's about clarity. When someone lands on your site, they need to know within five seconds: who you are, what you do, and how to take the next step. If any of those three things are unclear, you're losing people.</p>
                  <p>We've audited hundreds of small business websites, and the pattern is consistent. The businesses that invest in clear messaging, fast load times, and mobile-first design see measurably better results — more calls, more bookings, more revenue.</p>
                  <h2>What You Can Do About It</h2>
                  <p>Start with the basics. Load your site on your phone. Time how long it takes. Read your homepage headline out loud. If it doesn't immediately communicate value, rewrite it. These small changes compound.</p>
                  <div style={{ marginTop: 40, padding: 32, background: "var(--cream)", borderRadius: "var(--radius)" }}>
                    <p style={{ margin: 0, fontStyle: "italic" }}>Want a free audit of your website? <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }} onClick={() => go("contact")}>Get in touch →</span></p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {page === "contact" && (
          <div className="fade-in">
            <div className="pw sec">
              <div className="sl">Contact</div>
              <div className="st" style={{ marginBottom: 48 }}>Let's talk about your project</div>
              <div className="cg">
                <div>
                  <div className="fg"><label className="fl">Full Name</label><input className="fin" placeholder="Jane Smith" /></div>
                  <div className="fg"><label className="fl">Email</label><input className="fin" type="email" placeholder="jane@example.com" /></div>
                  <div className="fg"><label className="fl">Phone (optional)</label><input className="fin" type="tel" placeholder="(203) 555-0100" /></div>
                  <div className="fg"><label className="fl">Service Interested In</label>
                    <select className="fsl"><option>Select a service...</option>{SERVICES.map(s => <option key={s.id}>{s.title}</option>)}<option>Not sure yet</option></select>
                  </div>
                  <div className="fg"><label className="fl">Tell us about your project</label><textarea className="fta" placeholder="What are you looking for? What's your timeline? Any details help." /></div>
                  <button className="btn btn-p" onClick={() => notify("✓ Message sent! We'll be in touch within 24 hours.")}>Send Message →</button>
                </div>
                <div>
                  <div className="cib"><div className="cil">Address</div><div className="civ">{BUSINESS.address}<br/>{BUSINESS.city}</div></div>
                  <div className="cib"><div className="cil">Phone</div><div className="civ">{BUSINESS.phone}</div></div>
                  <div className="cib"><div className="cil">Email</div><div className="civ">{BUSINESS.email}</div></div>
                  <div className="cib"><div className="cil">Hours</div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {Object.entries(BUSINESS.hours).map(([d,t]) => (
                        <div className="hr" key={d}><span className="hrd">{d}</span><span className="hrt">{t}</span></div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 32, padding: 24, background: "var(--cream)", borderRadius: "var(--radius)" }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 18, marginBottom: 8 }}>Free consultation</div>
                    <p style={{ fontSize: 14, color: "var(--warm-gray)", lineHeight: 1.6 }}>Not sure what you need? Book a free 30-minute call and we'll help you figure out the right next step. No sales pitch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          <div className="pw">
            <div className="fgrid">
              <div>
                <div className="fbr">Evergreen <span>&</span> Co.</div>
                <p className="fds">{BUSINESS.tagline}. Design, development, and strategy for businesses that care.</p>
              </div>
              <div>
                <div className="fh">Pages</div>
                {Object.entries(PAGES).slice(0,5).map(([k,v]) => <span className="flink" key={k} onClick={() => go(k)}>{v}</span>)}
              </div>
              <div>
                <div className="fh">More</div>
                {Object.entries(PAGES).slice(5).map(([k,v]) => <span className="flink" key={k} onClick={() => go(k)}>{v}</span>)}
              </div>
              <div>
                <div className="fh">Contact</div>
                <span className="flink">{BUSINESS.phone}</span>
                <span className="flink">{BUSINESS.email}</span>
                <span className="flink">{BUSINESS.address}</span>
                <span className="flink">{BUSINESS.city}</span>
              </div>
            </div>
            <div className="fbot">© 2026 Evergreen & Co. All rights reserved. — Built with care in New Haven, CT.</div>
          </div>
        </footer>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
