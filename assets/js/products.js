/* Product data.
   Real products have a `links` object (per platform) and a `prices` object (per platform).
   Placeholder/sample products only have a `links.gumroad` of '#' — they're there to round
   out the catalog visually and aren't wired to a real checkout yet. */

window.HERCULIS_PRODUCTS = [
  // ---------- REAL PRODUCTS ----------
  {
    id: "hd-r01",
    name: "2027 Anxiety & Depression Planner",
    category: "Journals",
    prices: { gumroad: 7.99, payhip: 7.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/2027AnxietyDepressionPlannerPrintableMentalWellnessJournal",
      payhip: "https://payhip.com/b/mjAn5"
    },
    rating: 4.8, reviews: 41, tags: ["printable", "new"], badge: "new",
    image: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=600&q=80",
    desc: "A guided printable wellness journal for tracking mood, anxiety patterns, and daily grounding habits."
  },
  {
    id: "hd-r02",
    name: "Dinosaur Coloring Book for Kids Ages 4–8",
    category: "Coloring Books",
    prices: { gumroad: 3.99, pristify: 5.00, payhip: 3.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/DinosaurColoringBookforKids",
      pristify: "https://pristify.com/products/dinosaur-coloring-book-for-kids-ages-4-8-or-20-fun-printable-dinosaur-coloring-pages",
      payhip: "https://payhip.com/b/86E7W"
    },
    rating: 4.9, reviews: 67, tags: ["printable", "bestseller"], badge: "bestseller",
    image: "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=600&q=80",
    desc: "20 printable dinosaur coloring pages built for early elementary hands and attention spans."
  },
  {
    id: "hd-r03",
    name: "The Complete Wedding Planner Book",
    category: "Wedding Planning",
    prices: { gumroad: 14.99, pristify: 14.99, payhip: 14.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/TheCompleteWeddingPlannerBook",
      pristify: "https://pristify.com/products/the-complete-wedding-planner-book",
      payhip: "https://payhip.com/b/E6W8q"
    },
    rating: 5.0, reviews: 29, tags: ["printable", "bundle"], badge: "",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
    desc: "A full wedding planning workbook covering budget, guest list, vendors, and a day-of timeline."
  },
  {
    id: "hd-r04",
    name: "Wedding Guide Book | Complete Wedding Planner",
    category: "Wedding Planning",
    prices: { gumroad: 14.99, pristify: 14.99, payhip: 14.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/WeddingGuideBook",
      pristify: "https://pristify.com/products/wedding-guide-book-or-complete-wedding-planner",
      payhip: "https://payhip.com/b/kYXw7"
    },
    rating: 4.7, reviews: 18, tags: ["printable"], badge: "",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    desc: "A step-by-step wedding guide with checklists for every stage of planning your day."
  },
  {
    id: "hd-r05",
    name: "Alphabet & Number Writing Tracing Workbook for Kids",
    category: "Teacher Resources",
    prices: { gumroad: 5.99, pristify: 5.99, payhip: 5.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/AlphabetNumberWritingTracingWorkbookforKids",
      pristify: "https://pristify.com/products/alphabet-and-number-writing-tracing-workbook-for-kids",
      payhip: "https://payhip.com/b/Hk3JD"
    },
    rating: 4.8, reviews: 53, tags: ["printable", "bestseller"], badge: "bestseller",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    desc: "Letter and number tracing practice pages built for early handwriting development."
  },
  {
    id: "hd-r06",
    name: "Small Business Planner | 45-Page Printable Business Planner",
    category: "Business Tools",
    prices: { gumroad: 12.99, pristify: 12.99, payhip: 12.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/smallbusinessplanner",
      pristify: "https://pristify.com/products/small-business-planner-or-45-page-printable-business-planner-or-business-binder-or-entrepreneur",
      payhip: "https://payhip.com/b/mrYOI"
    },
    rating: 4.9, reviews: 37, tags: ["printable", "bundle", "bestseller"], badge: "bestseller",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    desc: "A 45-page business binder covering goals, finances, marketing, and day-to-day operations."
  },
  {
    id: "hd-r07",
    name: "Professional Receipt Template",
    category: "Business Tools",
    prices: { gumroad: 3.99, pristify: 4.99, payhip: 4.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/ProfessionalReceiptTemplate",
      pristify: "https://pristify.com/products/professional-receipt-template-or-printable-pdf-editable-file-or-us-letter-small-business-receipt",
      payhip: "https://payhip.com/b/NbuOY"
    },
    rating: 4.6, reviews: 22, tags: ["editable"], badge: "",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80",
    desc: "A clean, editable receipt template ready for a one-person shop or small business."
  },
  {
    id: "hd-r08",
    name: "Master Your Money — Personal Finance eBook",
    category: "Business Tools",
    prices: { gumroad: 7.99, pristify: 7.68, payhip: 7.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/MasterYourMoney",
      pristify: "https://pristify.com/products/master-your-money-printable-and-digital-personal-finance-ebook-or-77-pages-or-instant-download",
      payhip: "https://payhip.com/b/bMRYf"
    },
    rating: 4.7, reviews: 31, tags: ["editable"], badge: "",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    desc: "A 77-page personal finance eBook covering budgeting, saving, and debt payoff basics."
  },
  {
    id: "hd-r09",
    name: "Ultimate Financial Planner — Printable & Digital Budget Planner",
    category: "Business Tools",
    prices: { gumroad: 5.99, pristify: 6.48, payhip: 5.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/UltimateFinancialPlanner",
      pristify: "https://pristify.com/products/ultimate-financial-planner-printable-and-digital-budget-planner-or-31-pages-or-instant-download",
      payhip: "https://payhip.com/b/DQjBR"
    },
    rating: 4.8, reviews: 44, tags: ["printable", "bestseller"], badge: "bestseller",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=60",
    desc: "A 31-page budget planner covering monthly, weekly, and goal-based money tracking."
  },
  {
    id: "hd-r10",
    name: "Fun Color by Number for Kids — 10 Printable Pages",
    category: "Coloring Books",
    prices: { gumroad: 1.99 },
    links: { gumroad: "https://herculis.gumroad.com/l/funcolorbynumbers" },
    rating: 4.7, reviews: 15, tags: ["printable", "free"], badge: "",
    image: "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=600&q=60",
    desc: "10 simple color-by-number pages for younger kids, ages 3–8."
  },
  {
    id: "hd-r11",
    name: "Color by Number for Kids — 40 Fun Printable Pages",
    category: "Coloring Books",
    prices: { gumroad: 3.99, payhip: 4.99 },
    links: {
      gumroad: "https://herculis.gumroad.com/l/color-by-number-40-pages",
      payhip: "https://payhip.com/b/Dej1N"
    },
    rating: 4.9, reviews: 58, tags: ["printable", "bestseller"], badge: "bestseller",
    image: "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=600&q=70",
    desc: "A bigger 40-page color-by-number set covering animals, shapes, and everyday objects."
  },

  // ---------- SAMPLE / PLACEHOLDER PRODUCTS ----------
  {
    id: "hd-s01", name: "Weekly Family Planner", category: "Planners",
    prices: { gumroad: 12 }, links: { gumroad: "#" },
    rating: 4.8, reviews: 214, tags: ["printable", "bestseller"], badge: "bestseller",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80",
    desc: "A clean weekly planner spread built for busy households — meals, chores, and school runs on one page."
  },
  {
    id: "hd-s02", name: "Classroom Behavior Chart", category: "Teacher Resources",
    prices: { gumroad: 8 }, links: { gumroad: "#" },
    rating: 4.9, reviews: 132, tags: ["printable", "new"], badge: "new",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=60",
    desc: "A colorful, editable behavior chart teachers can print or project, with reward tracking built in."
  },
  {
    id: "hd-s03", name: "Content Calendar for Creators", category: "Business Tools",
    prices: { gumroad: 14 }, links: { gumroad: "#" },
    rating: 4.8, reviews: 143, tags: ["editable"], badge: "",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=60",
    desc: "Plan a month of posts across platforms with a calendar built for solo creators."
  },
  {
    id: "hd-s04", name: "Mindfulness Journal Pages", category: "Journals",
    prices: { gumroad: 10 }, links: { gumroad: "#" },
    rating: 4.6, reviews: 176, tags: ["printable"], badge: "",
    image: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=600&q=60",
    desc: "Guided daily prompts for gratitude, reflection, and gentle goal-setting."
  },
  {
    id: "hd-s05", name: "Gratitude Journal — 30 Day Guided Pages", category: "Journals",
    prices: { gumroad: 9 }, links: { gumroad: "#" },
    rating: 4.7, reviews: 89, tags: ["printable"], badge: "",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&q=80",
    desc: "A month of short daily prompts to build a gratitude habit without the overwhelm."
  },
  {
    id: "hd-s06", name: "Monthly Budget Tracker Bundle", category: "Business Tools",
    prices: { gumroad: 19 }, oldPrice: 26, links: { gumroad: "#" },
    rating: 4.7, reviews: 189, tags: ["bundle", "sale"], badge: "sale",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=60",
    desc: "Monthly, weekly, and yearly trackers bundled together for a full household budget system."
  },
  {
    id: "hd-s07", name: "Meal Planning & Grocery List Set", category: "Planners",
    prices: { gumroad: 7 }, links: { gumroad: "#" },
    rating: 4.8, reviews: 121, tags: ["printable"], badge: "",
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&q=80",
    desc: "A weekly meal planner paired with a matching grocery list, sized to fit on the fridge."
  },
  {
    id: "hd-s08", name: "Lesson Plan Template for Teachers", category: "Teacher Resources",
    prices: { gumroad: 11 }, links: { gumroad: "#" },
    rating: 4.9, reviews: 76, tags: ["editable"], badge: "",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    desc: "A weekly lesson plan layout with space for standards, materials, and differentiation notes."
  },
  {
    id: "hd-s09", name: "Kids Coloring Book: Ocean Friends", category: "Coloring Books",
    prices: { gumroad: 0 }, links: { gumroad: "#" },
    rating: 4.9, reviews: 302, tags: ["free", "printable"], badge: "free",
    image: "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?w=600&q=50",
    desc: "20 pages of ocean-themed coloring sheets, free to download and print at home."
  },
  {
    id: "hd-s10", name: "Wedding Budget Spreadsheet", category: "Wedding Planning",
    prices: { gumroad: 9 }, links: { gumroad: "#" },
    rating: 4.8, reviews: 54, tags: ["editable"], badge: "",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    desc: "An editable spreadsheet for tracking every wedding expense against your total budget."
  },
  {
    id: "hd-s11", name: "Habit Tracker Sticker Sheet", category: "Journals",
    prices: { gumroad: 4 }, links: { gumroad: "#" },
    rating: 4.6, reviews: 67, tags: ["printable"], badge: "",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=60",
    desc: "Printable stickers for tracking daily habits on any planner or bullet journal."
  },
  {
    id: "hd-s12", name: "Client Onboarding Packet Template", category: "Business Tools",
    prices: { gumroad: 16 }, links: { gumroad: "#" },
    rating: 4.9, reviews: 41, tags: ["editable", "bundle"], badge: "new",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    desc: "A polished onboarding packet template for freelancers bringing on a new client."
  },
  {
    id: "hd-s13", name: "Daily Planner — Minimalist Edition", category: "Planners",
    prices: { gumroad: 9 }, links: { gumroad: "#" },
    rating: 4.7, reviews: 98, tags: ["printable"], badge: "",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80",
    desc: "A single-page daily planner layout stripped down to the essentials — no clutter, just space to work."
  }
];
