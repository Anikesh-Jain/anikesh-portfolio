/**
 * Central Portfolio Data Configuration - Anikesh Jain
 */

export const siteConfig = {
  name: 'Anikesh Jain',
  logoMark: '<A/J>',
  role: 'Developer · Designer · Creative Lead',
  eyebrow: 'FULL-STACK DEVELOPER & CREATIVE DESIGNER',
  tagline: 'Computer Science Engineering student building real-world full-stack applications with the MERN stack — while bringing a strong creative and design background to every project.',
  college: 'Acropolis Institute of Technology and Research, Indore',
  university: 'RGPV, Bhopal',
  degree: 'B.Tech in Computer Science Engineering',
  location: 'Indore, Madhya Pradesh, India',
  email: 'anikeshjainxtech@gmail.com',
  github: 'https://github.com/Anikesh-Jain',
  linkedin: 'https://www.linkedin.com/in/anikeshjain/',
  profilePhoto: '/assets/profile/anikesh-jain.png',
  availableForHire: true,
  currentFocus: 'BUILD · LEARN · CREATE'
}

/* Home page anchor nav — matches old portfolio's 8-link nav */
export const homeNavItems = [
  { label: 'Home', hash: '#home' },
  { label: 'About', hash: '#about' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Journey', hash: '#journey' },
  { label: 'Achievements', hash: '#achievements' },
  { label: 'Creative', hash: '#creative' },
  { label: 'Connect', hash: '#contact' },
]

/* Sub-page nav — matches old portfolio's sub-page header */
export const subPageNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Creative', path: '/creative' },
]

/* Route-based nav items for React Router */
export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Creative', path: '/creative' },
]

export const aboutData = {
  headline: 'Built around ',
  headlineAccent: 'code, creativity & curiosity.',
  paragraphs: [
    "I’m Anikesh Jain, a B.Tech Computer Science Engineering student at Acropolis Institute of Technology and Research, Indore, building my skills in full-stack web development. I enjoy turning ideas into practical, responsive web applications and learning how the pieces work together behind the interface.",
    "Alongside development, I have a strong interest in visual design and creative work. I work with tools like Canva and Figma and have contributed to creative teams and technical-event branding, bringing together my technical and creative sides in the work I build."
  ],
  statements: [
    {
      title: 'Understand before using.',
      description: 'Concepts and problem solving matter more to me than blindly following tutorials.',
      borderColor: 'rgba(255, 95, 162, .28)' // pink
    },
    {
      title: 'Build real things.',
      description: 'I focus on responsive, scalable applications and project-based learning.',
      borderColor: 'rgba(73, 199, 255, .28)' // cyan
    },
    {
      title: 'Keep improving.',
      description: 'Architecture, debugging, maintainability and professional development practices are part of the journey.',
      borderColor: 'rgba(244, 190, 87, .28)' // gold
    }
  ],
  identityCore: {
    title: 'FULL-STACK',
    highlight: 'MERN',
    subtitle: 'DEVELOPER',
    caption: 'Development × Creativity\nBuilding • Learning • Creating'
  }
}

export const skillCategories = [
  {
    category: 'Languages',
    description: 'Programming, markup and styling foundations.',
    skills: [
      { name: 'C', badge: 'PROGRAMMING', icon: 'devicon-c-plain colored' },
      { name: 'C++', badge: 'PROGRAMMING', icon: 'devicon-cplusplus-plain colored' },
      { name: 'Python', badge: 'PROGRAMMING', icon: 'devicon-python-plain colored' },
      { name: 'Java', badge: 'PROGRAMMING', icon: 'devicon-java-plain colored' },
      { name: 'JavaScript', badge: 'ES6+', icon: 'devicon-javascript-plain colored' },
      { name: 'HTML5', badge: 'MARKUP', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', badge: 'STYLING', icon: 'devicon-css3-plain colored' }
    ]
  },
  {
    category: 'Frontend',
    description: 'Modern interfaces, components and state management.',
    skills: [
      { name: 'React.js', badge: 'UI LIBRARY', icon: 'devicon-react-original colored' },
      { name: 'Redux Toolkit', badge: 'STATE', icon: 'devicon-redux-original colored' },
      { name: 'Tailwind CSS', badge: 'UTILITY CSS', icon: 'devicon-tailwindcss-original colored' },
      { name: 'Bootstrap', badge: 'UI FRAMEWORK', icon: 'devicon-bootstrap-plain colored' }
    ]
  },
  {
    category: 'Backend',
    description: 'Server-side logic and web application architecture.',
    skills: [
      { name: 'Node.js', badge: 'RUNTIME', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express.js', badge: 'FRAMEWORK', icon: 'devicon-express-original colored' },
      { name: 'EJS', badge: 'TEMPLATING', icon: null, customIcon: '/assets/ejs-logo.svg' }
    ]
  },
  {
    category: 'Database & Tools',
    description: 'Data, APIs, version control and engineering practices.',
    skills: [
      { name: 'MongoDB', badge: 'DATABASE', icon: 'devicon-mongodb-plain colored' },
      { name: 'Mongoose', badge: 'ODM', icon: 'devicon-mongodb-plain colored' },
      { name: 'Git', badge: 'VERSION CONTROL', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', badge: 'CODE HOSTING', icon: 'devicon-github-original colored' },
      { name: 'REST APIs', badge: 'API DEVELOPMENT', icon: 'devicon-postman-plain colored' },
      { name: 'OOP', badge: 'PROGRAMMING', icon: 'devicon-cplusplus-plain colored' }
    ]
  }
]

export const projectsData = [
  {
    id: 'aurastore',
    slug: 'aurastore',
    aliases: ['full-stack-ecommerce-platform', 'aura-store'],
    title: 'Aura Store',
    subtitle: 'Modern Full-Stack E-Commerce Platform',
    headline: 'An immersive full-stack e-commerce platform built for modern online shopping.',
    description: 'An immersive full-stack e-commerce platform built for modern online shopping, from product discovery and wishlist management to secure checkout, order tracking, and personalized shopping experiences.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'Shadcn UI', 'NextAuth.js', 'Razorpay', 'Cloudinary', 'Resend', 'Zustand', 'Recharts'],
    year: '2025',
    featured: true,
    previewStyle: 'browser',
    coverImage: '/assets/projects/aurastore/01-homepage.png',
    links: {
      repo: 'https://github.com/Anikesh-Jain/aurastore',
      demo: 'https://aurastore-nu.vercel.app',
      linkedin: 'https://www.linkedin.com/posts/anikeshjain_aurastore-webdevelopment-fullstackdevelopment-activity-7503463290354909184-Zis6'
    },
    video: {
      available: true,
      title: 'Aura Store Walkthrough & Demo',
      contentUrl: 'https://dms.licdn.com/playlist/vid/v2/D5605AQGLFMF4kq9uDA/mp4-720p-30fp-crf28/B56aCGoDjgIMB4-/0/1788965050558?e=2147483647&v=beta&t=r3_VMadNzNyutMrmPqkuuNUJ-AC0z0sEM4y7L0PTlws',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7503463290354909184?compact=true',
      thumbnailUrl: 'https://media.licdn.com/dms/image/v2/D5605AQGLFMF4kq9uDA/videocover-high/B56aCGoDjgIMBI-/0/1788965046793?e=2147483647&v=beta&t=4Mn6zZm2HkfIYzopILZOWnijc7XxVunS2ejrUml8Jl4',
      postUrl: 'https://www.linkedin.com/posts/anikeshjain_aurastore-webdevelopment-fullstackdevelopment-activity-7503463290354909184-Zis6',
      duration: '1m 24s'
    },
    overview: 'A production-grade, full-stack modern e-commerce marketplace engineered with Next.js 15 (App Router, TypeScript, React 19), PostgreSQL exclusively with Prisma ORM, Tailwind CSS + Shadcn UI, Auth.js / NextAuth (Role-Based Access Control), Razorpay (Orders API + Cryptographic HMAC Webhook), Cloudinary media storage, and Resend transactional emails.',
    developmentRole: 'Developed with the assistance of AI tools (ChatGPT and Antigravity), focusing on overseeing the end-to-end development process: defining architecture and feature requirements, reviewing code implementations, testing workflows, diagnosing and resolving issues, and ensuring seamless integration across services.',
    techStackCategorized: [
      { category: 'Framework & Core', items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Node.js'] },
      { category: 'Database & ORM', items: ['PostgreSQL', 'Prisma ORM', 'Relational Schema', 'prisma.$transaction'] },
      { category: 'Styling & UI', items: ['Tailwind CSS', 'Shadcn UI', 'Radix UI Primitives', 'Lucide Icons', 'next-themes'] },
      { category: 'Authentication & Security', items: ['NextAuth.js v4 (Credentials)', 'bcryptjs', 'Role-Based Access Control (Admin / Customer)', 'Middleware Guards'] },
      { category: 'Payments & Transactions', items: ['Razorpay SDK', 'Cryptographic HMAC-SHA256 Webhook Verification', 'Orders API'] },
      { category: 'Storage & Email Delivery', items: ['Cloudinary SDK (Product & Review Images)', 'Resend SDK (Automated HTML Transactional Emails)'] },
      { category: 'State & Validation', items: ['Zustand (LocalStorage Persistence)', 'Recharts (KPI Analytics)', 'Zod Schema Validation', 'React Hook Form'] }
    ],
    features: [
      {
        title: 'Storefront & Discovery',
        description: 'Dynamic Hero spotlight, Category cards, Deals banner, and multi-faceted product catalog with instant search, category filters, price range slider, stock availability toggles, and star rating filters.'
      },
      {
        title: 'Product Details & Reviews',
        description: 'Multi-image showcase gallery, live stock status indicators, related product recommendations, and customer review system with verified purchase photo uploads via Cloudinary.'
      },
      {
        title: 'Persistent Cart & Wishlist',
        description: 'Client-side state management powered by Zustand with LocalStorage persistence, item quantities, and real-time coupon validation (WELCOME20, MEGA500, FESTIVE10).'
      },
      {
        title: 'Multi-Step Checkout & Razorpay Payments',
        description: 'Interactive checkout with address management, Razorpay payment modal supporting UPI, Cards, NetBanking, and Wallets, verified via cryptographic SHA-256 HMAC.'
      },
      {
        title: 'Order Tracking & Resend Email Delivery',
        description: 'Visual milestone tracking (PROCESSING → SHIPPED → DELIVERED) paired with automated HTML email notifications dispatched via the Resend API.'
      },
      {
        title: 'Role-Protected Admin Portal',
        description: 'Dedicated /admin portal with real-time KPI revenue calculations, Recharts sales analytics, product & category CRUD, 1-click order fulfillment updater, and customer lifetime spend directory.'
      }
    ],
    highlights: [
      '⚡ Full-Stack Next.js 15 App Router with React 19 Server Components, Server Actions, and Route Handlers',
      '🐘 Pure PostgreSQL relational database schema modeled and migrated exclusively through Prisma ORM',
      '🔐 Multi-tier Role-Based Access Control (RBAC) via NextAuth protecting customer accounts and admin portals',
      '💳 Razorpay Orders API paired with dedicated HMAC-SHA256 webhook listener (/api/webhooks/razorpay)',
      '📸 Cloudinary media storage pipeline for multi-image uploads on products, categories, and customer reviews',
      '📧 Automated customer order confirmation and status dispatch using the Resend email engine'
    ],
    screenshots: [
      {
        src: '/assets/projects/aurastore/01-homepage.png',
        title: 'AuraStore Homepage',
        category: 'Storefront',
        description: 'Modern storefront featuring dynamic hero banner, featured categories, curated gear, and responsive navigation.'
      },
      {
        src: '/assets/projects/aurastore/02-category-showcase.png',
        title: 'Category Showcase',
        category: 'Storefront',
        description: 'Curated category cards with clean iconography, product counts, and smooth visual hover micro-interactions.'
      },
      {
        src: '/assets/projects/aurastore/03-offers-footer.png',
        title: 'Offers & Benefits',
        category: 'Storefront',
        description: 'Promotional benefit highlights, newsletter subscription form, and comprehensive footer site links.'
      },
      {
        src: '/assets/projects/aurastore/04-product-catalog.png',
        title: 'Product Catalog & Faceted Filters',
        category: 'Shopping Experience',
        description: 'Faceted sidebar filtering by category, price range slider, in-stock availability, sorting, and live search.'
      },
      {
        src: '/assets/projects/aurastore/05-wishlist.png',
        title: 'Saved Items Wishlist',
        category: 'Shopping Experience',
        description: 'Customer wishlist with Zustand persistence, item removal, and one-click add to cart capabilities.'
      },
      {
        src: '/assets/projects/aurastore/06-shopping-cart.png',
        title: 'Shopping Cart & Promo Validator',
        category: 'Shopping Experience',
        description: 'Slide-over cart drawer and dedicated cart page with real-time coupon code discount calculations.'
      },
      {
        src: '/assets/projects/aurastore/07-checkout.png',
        title: 'Multi-Step Secure Checkout',
        category: 'Checkout',
        description: 'Delivery address selection, order summary breakdown, and integrated Razorpay payment gateway modal.'
      },
      {
        src: '/assets/projects/aurastore/08-order-confirmation.png',
        title: 'Order Confirmation',
        category: 'Orders',
        description: 'Instant post-payment order confirmation screen with order reference, item details, and receipt summary.'
      },
      {
        src: '/assets/projects/aurastore/09-order-tracking.png',
        title: 'Order Milestone Tracking',
        category: 'Orders',
        description: 'Customer order history and visual status milestone tracker from processing to dispatch and delivery.'
      },
      {
        src: '/assets/projects/aurastore/10-admin-dashboard.png',
        title: 'Admin Management Portal',
        category: 'Admin Portal',
        description: 'Role-protected administration dashboard featuring live revenue KPI metrics, Recharts trends, and CRUD controls.'
      }
    ]
  },
  {
    id: 'smartexpense',
    slug: 'smartexpense',
    aliases: ['expense-tracker', 'smart-expense'],
    title: 'SmartExpense',
    subtitle: 'Full-Stack Personal Finance Platform (Student Edition)',
    headline: 'A student-focused personal finance platform for tracking income and expenses.',
    description: 'A student-focused personal finance platform for tracking income and expenses, managing budgets and savings goals, understanding spending patterns, and planning smarter financial decisions.',
    tags: ['React 19', 'Vite', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'Redux Toolkit', 'Tailwind CSS', 'Recharts', 'JWT', 'Bcrypt', 'Brevo SMTP'],
    year: '2024',
    featured: true,
    previewStyle: 'dashboard',
    coverImage: '/assets/projects/smartexpense/03-dashboard.png',
    links: {
      repo: 'https://github.com/Anikesh-Jain/smart-expense',
      demo: 'https://smart-expense-blond.vercel.app',
      linkedin: 'https://www.linkedin.com/posts/anikeshjain_smartexpense-webdevelopment-fullstackdevelopment-activity-7506980682972233728-SWxg'
    },
    video: {
      available: true,
      title: 'SmartExpense Walkthrough & Feature Demo',
      contentUrl: 'https://dms.licdn.com/playlist/vid/v2/D4D05AQFDW8h7NoGe0A/mp4-640p-30fp-crf28/B4DaC4nGQzIABk-/0/1789803660205?e=2147483647&v=beta&t=z29OQ3vTXviC3K8WEVXjNx1xpynUurVLSpkrxgcOtHQ',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7506980682972233728?compact=true',
      thumbnailUrl: 'https://media.licdn.com/dms/image/v2/D4D05AQFDW8h7NoGe0A/videocover-high/B4DaC4nGQzIABM-/0/1789803654755?e=2147483647&v=beta&t=W0_hoC3KpgxArsKm30PtzsRx0bD5VcEtDO2OsYglcCo',
      postUrl: 'https://www.linkedin.com/posts/anikeshjain_smartexpense-webdevelopment-fullstackdevelopment-activity-7506980682972233728-SWxg',
      duration: '2m 23s'
    },
    overview: 'SmartExpense is a full-stack personal finance web application for tracking expenses, managing budgets, planning savings goals, and analyzing financial activity across multiple currencies. The application uses USD as the canonical base currency while preserving original financial records and historical exchange-rate information.',
    developmentRole: 'Developed with the assistance of ChatGPT and Antigravity. Focused on defining requirements, guiding the full-stack development process, reviewing implementation quality, conducting end-to-end testing across 29 test suites, identifying edge-case bugs, and verifying production deployment.',
    techStackCategorized: [
      { category: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'React Router', 'Recharts', 'Axios', 'oxlint'] },
      { category: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose ODM'] },
      { category: 'Authentication & Security', items: ['JWT (JSON Web Tokens)', 'bcrypt Password Hashing', 'Helmet', 'express-rate-limit', 'CORS'] },
      { category: 'Email & Recovery', items: ['Nodemailer', 'Brevo SMTP (Password Reset Delivery)'] },
      { category: 'Verification & Testing', items: ['Node.js Built-In Test Runner (187/187 Tests Passing across 29 Suites)', 'oxlint (0 Warnings, 0 Errors)'] }
    ],
    features: [
      {
        title: 'Multi-Currency Architecture',
        description: 'USD serves as the canonical base currency while preserving original amount, original currency, baseAmountUSD, and historical exchange rates. Supports INR, USD, EUR, GBP, CAD, AUD, and JPY with 1-hour rate caching.'
      },
      {
        title: 'Income & Expense Tracking',
        description: 'Granular recording of income streams and daily expenses with categories, descriptions, date filters, searching, and sorting with immutable ledger storage.'
      },
      {
        title: 'Monthly Category Budgets',
        description: 'Custom threshold budgets per category with real-time health indicator alerts, visual percentage gauges, and native currency preservation.'
      },
      {
        title: 'Savings Goals & Incremental Contributions',
        description: 'Target-date savings goals with step-by-step progress tracking, converted contribution snapshots, and progress visualizations.'
      },
      {
        title: 'Spending Pace & Cash Runway Analysis',
        description: 'Deterministic financial intelligence calculating daily safe spending limits, burn rate pace against remaining days in the month, and cash runway projections.'
      },
      {
        title: 'Smart Saving Planner',
        description: 'Deterministic mathematical calculation engine offering personalized saving suggestions based on income, fixed commitments, and user savings targets.'
      },
      {
        title: 'RFC 4180 CSV Export',
        description: 'Dedicated GET /api/transactions/export endpoint delivering full transaction exports matching active user filters with proper character escaping and zero database mutation.'
      },
      {
        title: 'Admin RBAC & Account Data Isolation',
        description: 'Role-based administrative oversight, user management, feedback processing, and secure account deletion with cascading cleanup of user-owned financial records.'
      }
    ],
    highlights: [
      '🌐 Canonical USD multi-currency ledger preserving original amounts, currencies, and historical exchange rates',
      '✅ 187/187 backend tests passing across 29 test suites with zero failures',
      '🔍 oxlint static analysis passed across 64 frontend files with 0 warnings and 0 errors',
      '📊 Deterministic financial calculation engines for Spending Pace, Safe Daily Spend, and Cash Runway',
      '📥 RFC 4180 compliant CSV export engine for transaction history with active filter persistence',
      '🛡️ Multi-tenant user data isolation with server-side ownership authorization and cascading cleanup'
    ],
    screenshots: [
      {
        src: '/assets/projects/smartexpense/03-dashboard.png',
        title: 'Financial Dashboard Overview',
        category: 'Dashboard',
        description: 'Executive financial summary displaying net balance, total income, expenses, savings rate, and recent transactions.'
      },
      {
        src: '/assets/projects/smartexpense/04-dashboard-details.png',
        title: 'Dashboard Details & Breakdown',
        category: 'Dashboard',
        description: 'In-depth breakdown of current month burn rate, quick action shortcuts, and category allocation.'
      },
      {
        src: '/assets/projects/smartexpense/05-transactions.png',
        title: 'Multi-Currency Transactions & History',
        category: 'Core Finance',
        description: 'Searchable and filterable transaction ledger with multi-currency conversion, category tagging, and CSV export action.'
      },
      {
        src: '/assets/projects/smartexpense/06-budgets.png',
        title: 'Monthly Category Budgets',
        category: 'Core Finance',
        description: 'Category budget limit thresholds with visual progress gauges and real-time overspending alerts.'
      },
      {
        src: '/assets/projects/smartexpense/07-savings-goals.png',
        title: 'Savings Goals & Contributions',
        category: 'Core Finance',
        description: 'Target-date savings goals with incremental contribution tracking and completion progress bars.'
      },
      {
        src: '/assets/projects/smartexpense/08-analytics.png',
        title: 'Financial Analytics & Spending Trends',
        category: 'Analytics',
        description: 'Visual cash flow analytics with Recharts displaying income vs expense trajectories and category distribution.'
      },
      {
        src: '/assets/projects/smartexpense/09-analytics-trajectory.png',
        title: 'Savings Trajectory Analytics',
        category: 'Analytics',
        description: 'Longitudinal savings accumulation charts and predictive milestone completion timelines.'
      },
      {
        src: '/assets/projects/smartexpense/10-spending-pace.png',
        title: 'Spending Pace & Cash Runway Analysis',
        category: 'Analytics',
        description: 'Deterministic pace analysis calculating safe daily spending limit and projected month-end surplus/deficit.'
      },
      {
        src: '/assets/projects/smartexpense/11-settings.png',
        title: 'Settings & Financial Preferences',
        category: 'Settings',
        description: 'User profile preferences, base display currency selector, monthly payday configuration, and account controls.'
      },
      {
        src: '/assets/projects/smartexpense/12-admin-dashboard.png',
        title: 'Admin RBAC & Feedback Management',
        category: 'Administration',
        description: 'Role-based admin console for user management, system activity monitoring, and user feedback resolution.'
      },
      {
        src: '/assets/projects/smartexpense/01-login.png',
        title: 'Secure Authentication & Login',
        category: 'Authentication',
        description: 'JWT-backed login screen with rate limiting protection and password recovery integration.'
      },
      {
        src: '/assets/projects/smartexpense/02-register.png',
        title: 'User Registration & Onboarding',
        category: 'Authentication',
        description: 'Account registration flow with input validation and automated onboarding setup.'
      }
    ]
  }
]

export const journeyMilestones = [
  {
    step: '01',
    phase: 'LEARNING',
    title: 'Learning',
    description: 'Building a strong foundation',
    iconKey: 'book'
  },
  {
    step: '02',
    phase: 'PRACTICING',
    title: 'Practicing',
    description: 'Hands-on projects and real-world practice',
    iconKey: 'code'
  },
  {
    step: '03',
    phase: 'CREATING',
    title: 'Creating',
    description: 'Designing, developing and experimenting',
    iconKey: 'palette'
  },
  {
    step: '04',
    phase: 'EVOLVING',
    title: 'Evolving',
    description: 'Becoming a better developer every day.',
    iconKey: 'trending'
  }
]

export const exploreCards = [
  {
    label: 'Achievements',
    description: 'Milestones that motivate me to keep going.',
    path: '/achievements',
    borderColor: 'rgba(244, 190, 87, .35)',
    bgGradient: 'linear-gradient(145deg, rgba(244, 190, 87, .09), #0b0d17)',
    titleColor: '#ffd27a'
  },
  {
    label: 'Certificates',
    description: 'Proof of learning and continuous growth.',
    path: '/certificates',
    borderColor: 'rgba(73, 199, 255, .35)',
    bgGradient: 'linear-gradient(145deg, rgba(73, 199, 255, .08), #0b0d17)',
    titleColor: '#8fddff'
  },
  {
    label: 'Creative Work',
    description: 'Designs, posters and visual projects.',
    path: '/creative',
    borderColor: 'rgba(255, 95, 162, .35)',
    bgGradient: 'linear-gradient(145deg, rgba(255, 95, 162, .08), #0b0d17)',
    titleColor: '#ffb3d3'
  },
  {
    label: 'Involvement',
    description: 'Communities, events and contributions.',
    path: '/involvement',
    borderColor: 'rgba(87, 211, 155, .35)',
    bgGradient: 'linear-gradient(145deg, rgba(87, 211, 155, .08), #0b0d17)',
    titleColor: '#9cf0c8'
  }
]
