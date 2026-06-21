


export const services = [
  {
    icon: 'BrainCircuit',
    title: 'AI Intelligence Module',
    description: 'We build intelligent AI workflows and custom agents that act as your digital workforce, handling everything from customer support to complex operations.',
    image: {
      imageUrl: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHhzfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHx8MTc1ODc5NDU3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "artificial intelligence"
    },
    slug: 'ai-solutions',
    process: 'We analyze your business challenge, design the AI architecture, and deploy a custom system that replaces manual repetitive work.',
    benefits: 'Scalable operations, reduced overhead, and 24/7 intelligent automation.',
    results: 'Measurable efficiency gains and a business that operates smarter without increasing headcount.',
    startingPrice: 24999,
    startingPriceUsd: 699,
    tags: ['AI Agents', 'Automation', 'Workflow Optimization', 'Custom LLMs'],
  },
  {
    icon: 'Code',
    title: 'Core OS Web Interface',
    description: 'Premium modern web interfaces designed to be the front-end of your AI OS, optimized for high conversion and seamless user experience.',
    image: {
      imageUrl: "/saasnext-web-development.jpg",
      imageHint: "web design"
    },
    slug: 'web-development',
    process: 'Rapid 3–5 day development focusing on high-end design, mobile responsiveness, and OS-ready architecture.',
    benefits: 'Professional digital presence, mobile-first design, and integrated lead capture.',
    results: 'A fast, high-converting interface that serves as your primary business asset.',
    startingPrice: 9999,
    startingPriceUsd: 299,
    tags: ['Next.js', 'Premium Design', 'SEO Ready', 'Fast Launch'],
  },
  {
    icon: 'Search',
    title: 'Growth & AEO Engine',
    description: 'Turn your OS into a lead generation powerhouse with automated funnels and AI search engine optimization (AEO).',
    image: {
      imageUrl: "https://images.unsplash.com/photo-1614091473310-072faa6a091c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxnb29nbGUlMjBzZWFyY2glMjBjb25zb2xlfGVufDB8fHx8MTc1OTE5OTQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "SEO analysis"
    },
    slug: 'seo',
    process: 'We build high-converting landing pages integrated with CRM and automation workflows to capture and nurture leads.',
    benefits: 'Consistent lead flow, automated marketing, and real-time conversion tracking.',
    results: 'Higher ROI on ad spend and a fully automated lead generation pipeline.',
    startingPrice: 19999,
    startingPriceUsd: 499,
    tags: ['Lead Funnels', 'CRM Integration', 'Conversion Tracking', 'Ads Optimization'],
  },
  {
    icon: 'Megaphone',
    title: 'Business Automation OS',
    description: 'Full-stack automation for your internal business processes, from CRM management to automated billing and team workflows.',
    image: {
      imageUrl: "/saasnext-marketing.png",
      imageHint: "analytics dashboard"
    },
    slug: 'performance-marketing',
    process: 'Agile development of scalable business tools with authentication, dashboards, and database architecture.',
    benefits: 'Rapid time-to-market, scalable infrastructure, and premium user experience.',
    results: 'A production-ready automation system ready to handle your business growth.',
    startingPrice: 49999,
    startingPriceUsd: 1499,
    tags: ['SaaS Architecture', 'Supabase', 'Dashboards', 'API Integration'],
  },
  {
    icon: 'Feather',
    title: 'AI Content System',
    description: 'A 24/7 AI-powered content engine that automates your brand presence across all social and digital platforms.',
    image: {
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwd3JpdGluZ3xlbnwwfHx8fDE3NTk2NzA5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "content writing"
    },
    slug: 'content-writing',
    process: 'We set up automated workflows for content generation, research, and multi-platform publishing.',
    benefits: 'Consistent brand voice, 10x faster content production, and social media automation.',
    results: 'Dominant online presence with minimal manual content effort.',
    startingPrice: 14999,
    startingPriceUsd: 399,
    tags: ['AI Content', 'Social Automation', 'Video Workflows', 'Brand Scaling'],
  },
];

export const techStack = {
  frontend: [
    { name: "Next.js", description: "The foundation for our performant, server-rendered React applications, crucial for SEO." },
    { name: "React", description: "Building dynamic, interactive user interfaces for custom website development in Junagadh." },
    { name: "TypeScript", description: "Ensuring robust, scalable, and maintainable code for all projects." },
    { name: "Tailwind CSS", description: "Our go-to for rapid, utility-first styling, perfect for affordable web design in Junagadh." },
    { name: "Framer Motion", description: "Creating beautiful and complex animations to enhance user experience." },
    { name: "Shadcn UI", description: "A set of accessible and composable components for modern UIs." },
  ],

  backend: [
    { name: "Django", description: "A high-level Python web framework for scalable and secure backends." },
    { name: "Node.js", description: "Event-driven JavaScript runtime for fast server-side apps." },
    { name: "Express.js", description: "Minimal and flexible Node.js framework for APIs and backends." },
    { name: "PostgreSQL", description: "A powerful open-source relational database system." },
    { name: "MongoDB", description: "A NoSQL database for flexible and scalable data storage." },
    { name: "n8n", description: "Workflow automation tool to connect APIs and services seamlessly." },
  ],

  aiAndDeployment: [
    { name: "LangChain", description: "For building AI-driven applications with LLM orchestration." },
    { name: "OpenAI API", description: "For integrating GPT-based natural language capabilities." },
    { name: "TensorFlow", description: "An open-source library for machine learning and deep learning." },
    { name: "Docker", description: "For containerization and portable deployments." },
    { name: "Kubernetes", description: "For orchestration of containers at scale." },
    { name: "CI/CD Pipelines", description: "Automating integration, testing, and deployment workflows." },
    { name: "Vercel", description: "Optimized hosting and serverless deployment for frontend apps." }
  ]

};

export const testimonials = [
  {
    quote: "SaaSNext transformed our online presence. Their team is professional, responsive, and delivered a product that exceeded our expectations.",
    name: "Jane Doe",
    title: "CEO, TechCorp",
    image: {
      imageUrl: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fHx8MTc1ODc5NDM2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "person smiling"
    },
  },
  {
    quote: "The lead generation campaign they ran for us was a game-changer. We've never had such a full pipeline of qualified leads.",
    name: "John Smith",
    title: "Marketing Director, Innovate Ltd.",
    image: { imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTg3OTgwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "professional portrait" },
  },
  {
    quote: "Working with SaaSNext on our AI integration was seamless. They are true experts in their field.",
    name: "Emily White",
    title: "COO, Future Solutions",
    image: {
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbnxlbnwwfHx8fDE3NTg3OTc5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "business person"
    },
  },
];

export const portfolioItems = [
  {
    id: 'proj-23',
    title: 'Modern E-commerce Website Demo',
    problem: 'Many growing brands struggle to visualize how a fast, scalable e-commerce website should look and perform before investing in full development.',
    solution: 'We designed and developed a high-performance e-commerce demo using Next.js, showcasing a clean UI, optimized product pages, and a headless CMS structure for future scalability.',
    results: 'Demonstrates lightning-fast load times, smooth navigation, and a conversion-focused shopping experience suitable for real-world e-commerce businesses.',
    image: {
      imageUrl: "/saasnextecom1.webp",
      imageHint: "modern e-commerce website demo"
    },
    service: 'E-commerce Web Development',
    niche: 'Online Store / Retail',
    url: 'https://saasnext-ecom.vercel.app/'
  },
  {
    id: 'proj-24',
    title: 'Interactive 3D Tile Visualizer for Royal Tiles',
    problem: 'Royal Tiles, a leading tile manufacturer, struggled to help customers visualize how different tiles would look in their homes, leading to decision fatigue and lost sales.',
    solution: 'We developed an AI-powered 3D web application that allows users to upload a photo of their room and instantly see any of Royal Tiles\' products on their floors or walls.',
    results: 'Increased online customer engagement by 200%, shortened the sales cycle by 40%, and received industry awards for innovation.',
    image: { imageUrl: "/saasnexttile1.webp", imageHint: "app interface" },
    service: 'Web Development & AI Solutions',
    niche: 'AI',
    url: 'https://styleonart1.vercel.app/'
  },
  {
    id: 'proj-26',
    title: 'Web Development Project for HealthCare',
    problem: 'The healthcare client needed a modern, secure, and user-friendly website to improve patient engagement and streamline online appointment bookings.',
    solution: 'We designed and developed a responsive healthcare website with secure patient data handling, integrated appointment scheduling, and easy navigation for both patients and staff.',
    results: 'Increased patient inquiries by 70% within the first three months and improved overall user experience, boosting trust and credibility.',
    image: { imageUrl: "/saasnextmedi.webp", imageHint: "healthcare website" },
    service: 'Web Development',
    niche: 'Healthcare',
    url: 'https://saasnext-medical.vercel.app/'
  }
  ,
  {
    id: 'proj-4',
    title: 'Luxury Resort Website Development',
    problem: 'A premium resort needed a visually appealing and user-friendly website to showcase their amenities and attract more online bookings.',
    solution: 'We built a modern, responsive website with immersive visuals, virtual tour features, and an integrated booking system to enhance the guest experience.',
    results: 'Boosted online reservations by 60% within the first quarter and significantly improved brand visibility in the travel market.',
    image: { imageUrl: "/saasnextresort.webp", imageHint: "resort website" },
    service: 'Web Development',
    niche: 'Hospitality',
    url: 'https://resort-pied.vercel.app/'
  },
  {
    id: 'proj-5',
    title: 'Tiles Industry Website Development',
    problem: 'A tiles manufacturer lacked an online presence to showcase their product range and reach architects, builders, and homeowners.',
    solution: 'We developed a modern, catalog-style website featuring detailed product displays, search and filter options, and inquiry forms for bulk orders.',
    results: 'Improved customer engagement, generated consistent B2B inquiries, and expanded brand visibility across new markets.',
    image: { imageUrl: "/saasnexttile2.webp", imageHint: "tiles website" },
    service: 'Web Development',
    niche: 'Manufacturing',
    url: 'https://styleonart.vercel.app/'
  },
  {
    id: 'proj-7',
    title: 'Personal Portfolio Website Development',
    problem: 'A creative professional needed a modern online portfolio to showcase their work and attract potential clients.',
    solution: 'We designed and developed a sleek, responsive portfolio website with project showcases, interactive galleries, and a contact form for easy inquiries.',
    results: 'Enhanced personal branding, improved client outreach, and increased project inquiries by 50% within the first quarter.',
    image: { imageUrl: "/saasnextfolio.webp", imageHint: "portfolio website" },
    service: 'Web Development',
    niche: 'Creative',
    url: 'https://fintech-three-sigma.vercel.app/'
  },
  {
    id: 'proj-9',
    title: 'Construction Company Website Development',
    problem: 'A growing construction firm needed a strong online presence to showcase their projects and attract new clients.',
    solution: 'We built a professional, responsive website highlighting their services, portfolio of completed projects, and easy contact options for inquiries.',
    results: 'Improved brand credibility, generated steady client leads, and boosted local market visibility by 45% within six months.',
    image: { imageUrl: "/saasnextcont.webp", imageHint: "construction website" },
    service: 'Web Development',
    niche: 'Construction',
    url: 'https://construction-flax.vercel.app/'
  },
  {
    id: 'proj-12',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/ads1.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-13',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/p1.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-14',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/p2.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-15',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/p3.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-16',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/p4.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-17',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/p5.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-18',
    title: 'Ad Creatives for Fashion Brand',
    problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
    solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
    results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
    image: { imageUrl: "/social/p6.png", imageHint: "ad creative" },
    service: 'Web Development',
    niche: 'Social Media',
    url: '#'
  },
  {
    id: 'proj-19',
    title: 'MOdular Furniture Website- Pinnacle Modular Kitchen',
    problem: 'A growing construction firm needed a strong online presence to showcase their projects and attract new clients.',
    solution: 'We built a professional, responsive website highlighting their services, portfolio of completed projects, and easy contact options for inquiries.',
    results: 'Improved brand credibility, generated steady client leads, and boosted local market visibility by 45% within six months.',
    image: { imageUrl: "/pinnacle-website.jpg", imageHint: "construction website" },
    service: 'Web Development',
    niche: 'Furniture',
    url: 'https://wooden-eta.vercel.app/'
  },
  {
    id: 'proj-20',
    title: 'Ecommerce Marketplace- Tooldocker',
    problem: 'A growing construction firm needed a strong online presence to showcase their projects and attract new clients.',
    solution: 'We built a professional, responsive website highlighting their services, portfolio of completed projects, and easy contact options for inquiries.',
    results: 'Improved brand credibility, generated steady client leads, and boosted local market visibility by 45% within six months.',
    image: { imageUrl: "/tooldocker-website.jpg", imageHint: "construction website" },
    service: 'Web Development',
    niche: 'E-commerce',
    url: 'https://studio-taupe-delta.vercel.app/'
  },
  {
    id: 'proj-21',
    title: 'Velvet- interior design',
    problem: 'A growing construction firm needed a strong online presence to showcase their projects and attract new clients.',
    solution: 'We built a professional, responsive website highlighting their services, portfolio of completed projects, and easy contact options for inquiries.',
    results: 'Improved brand credibility, generated steady client leads, and boosted local market visibility by 45% within six months.',
    image: { imageUrl: "/velvelspace.png", imageHint: "construction website" },
    service: 'Web Development',
    niche: 'E-commerce',
    url: 'https://saasnext-interior.vercel.app/'
  },
  {
    id: 'proj-22',
    title: 'Dentist- healthcare',
    problem: 'A growing construction firm needed a strong online presence to showcase their projects and attract new clients.',
    solution: 'We built a professional, responsive website highlighting their services, portfolio of completed projects, and easy contact options for inquiries.',
    results: 'Improved brand credibility, generated steady client leads, and boosted local market visibility by 45% within six months.',
    image: { imageUrl: "/lumia-dentist.png", imageHint: "construction website" },
    service: 'Web Development',
    niche: 'Healthcare',
    url: 'https://saasnext-dentist.vercel.app/'
  },
  {
    id: 'proj-1',
    title: '3D Dental Clinic – Modern Dental Care Website',

    problem:
      'A dental clinic needed a professional online presence to showcase their dental services, build patient trust, and allow easy appointment booking.',

    solution:
      'We developed a modern, responsive dental website with clear service pages, doctor profiles, treatment details, and online appointment booking. The site focuses on patient comfort, trust, and easy navigation.',

    results:
      'Increased appointment inquiries, improved patient engagement, and strengthened the clinic’s online credibility within the local healthcare market.',

    image: {
      imageUrl: "/saasnext-3ddental.png",
      imageHint: "dental clinic website"
    },

    service: 'Web Development',
    niche: 'Dental & Healthcare',

    url: 'https://saasnext-3ddental.vercel.app/'
  },
  {
    id: 'proj-2',
    title: 'SaasNext Video – Creative Video Editing Portfolio',

    problem:
      'Brands and content creators needed high-quality video editing to stand out on social media, websites, and marketing campaigns, but lacked a strong visual portfolio to showcase editing capabilities.',

    solution:
      'We created a visually engaging video editing portfolio showcasing cinematic edits, social media reels, promotional videos, motion graphics, and storytelling-focused content. The website highlights editing styles, workflows, and creative expertise.',

    results:
      'Strengthened brand credibility, attracted new creative collaborations, and increased client inquiries for professional video editing services.',

    image: {
      imageUrl: "/sasnext-inferno.png",
      imageHint: "video editing portfolio"
    },

    service: 'Video Editing & Creative Media',
    niche: 'Video Production & Editing',

    url: 'https://saasenxt-video.vercel.app/'
  },
  {
    id: 'proj-3',
    title: 'SaasNext Cosmos – Scientist & Research Showcase Website',

    problem:
      'Researchers and scientists needed a clean, credible online platform to present their work, publications, discoveries, and ongoing research to a global audience.',

    solution:
      'We designed and developed a modern scientist-focused website featuring research highlights, publications, project timelines, visual data sections, and an academic-friendly layout. The platform emphasizes clarity, credibility, and knowledge sharing.',

    results:
      'Enhanced professional visibility, improved research accessibility, and created a strong digital identity suitable for academic and scientific communities.',

    image: {
      imageUrl: "/saasnext-cosmos.png",
      imageHint: "scientist research website"
    },

    service: 'Web Development',
    niche: 'Science & Research',

    url: 'https://saasnext-cosmos.vercel.app/'
  },
  {
    id: 'proj-27',
    title: 'SaasNext Universe – Scroll-Triggered Interactive Landing Page',

    problem:
      'Modern brands needed an immersive landing page experience to capture user attention, communicate storytelling visually, and keep visitors engaged while scrolling.',

    solution:
      'We created an interactive landing page using advanced scroll-trigger animations, smooth transitions, and universe-inspired visuals. The experience guides users through content as they scroll, creating a cinematic and engaging storytelling flow.',

    results:
      'Increased user engagement, longer session durations, and a visually memorable brand experience that stands out from traditional static landing pages.',

    image: {
      imageUrl: "/saasnext-universe-lpov.png",
      imageHint: "scroll trigger animated landing page"
    },

    service: 'Landing Page Development',
    niche: 'Interactive Web & Motion UI',

    url: 'https://saasnext-universe-lpov.vercel.app/'
  },
  {
    id: 'proj-28',
    title: 'SaasNext Motivate – Professional Music Studio Website',

    problem:
      'Independent artists, bands, and music producers needed a strong online presence to showcase their work, studio services, and attract new recording projects.',

    solution:
      'We developed a modern music studio website featuring artist showcases, studio services, audio samples, project galleries, and easy booking inquiries. The design focuses on creativity, sound, and a strong visual identity.',

    results:
      'Improved brand visibility, increased booking inquiries, and created a professional digital presence for artists and music creators.',

    image: {
      imageUrl: "/saasnext-motivate.png",
      imageHint: "music studio website"
    },

    service: 'Web Development',
    niche: 'Music & Creative Studio',

    url: 'https://saasnext-motivate.vercel.app/'
  },
  {
    id: 'proj-29',
    title: 'SaasNext Terresact – Digital Marketing Company Website',

    problem:
      'Businesses needed a results-driven digital marketing company to help them increase online visibility, generate quality leads, and scale revenue through digital channels.',

    solution:
      'We built a modern digital marketing company website highlighting performance-focused services such as SEO, paid advertising, social media marketing, content strategy, and conversion optimization. The site is designed to build trust and drive inquiries.',

    results:
      'Strengthened brand authority, increased inbound leads, and positioned the company as a reliable digital marketing partner for growth-focused brands.',

    image: {
      imageUrl: "/saasnext-terresact.png",
      imageHint: "digital marketing company website"
    },

    service: 'Digital Marketing',
    niche: 'Marketing & Growth',

    url: 'https://saasnext-terresact.vercel.app/'
  },
  {
    id: 'proj-30',
    title: 'SaasNext CarRental – Online Car Booking Website',

    problem:
      'Customers needed a convenient and reliable way to rent cars online for local travel, business trips, and vacations without complicated booking processes.',

    solution:
      'We developed a modern car rental website featuring vehicle listings, rental packages, pricing details, availability information, and quick booking inquiries. The platform focuses on ease of use, trust, and fast reservations.',

    results:
      'Improved customer engagement, increased rental inquiries, and created a seamless online booking experience for car rental services.',

    image: {
      imageUrl: "/saasnext-carrental.png",
      imageHint: "car rental website"
    },

    service: 'Web Development',
    niche: 'Travel & Transportation',

    url: 'https://saasnext-carrental.vercel.app/'
  },
  {
    id: 'proj-31',
    title: 'SaasNext Minimal – Minimal Text-Based Website',

    problem:
      'Some brands and creators needed a distraction-free website that focuses purely on content, clarity, and readability without heavy visuals or complex layouts.',

    solution:
      'We designed a minimal, text-first website using clean typography, simple layouts, and clear content hierarchy. The site emphasizes readability, fast loading, and a calm user experience.',

    results:
      'Created a strong content-focused digital presence, improved user focus on messaging, and delivered a fast, lightweight browsing experience.',

    image: {
      imageUrl: "/saasnext-minimal.png",
      imageHint: "minimal text based website"
    },

    service: 'Web Development',
    niche: 'Minimal & Typography Design',

    url: 'https://saasnext-minimal.vercel.app/'
  },
  {
    id: 'proj-32',
    title: 'SaasNext Fitness – Fitness & Gym Website',

    problem:
      'Fitness centers and personal trainers needed a high-energy online presence to motivate users, showcase programs, and convert visitors into members or clients.',

    solution:
      'We developed a modern fitness website featuring workout programs, trainer profiles, class schedules, membership plans, and transformation highlights. The design emphasizes motivation, performance, and user engagement.',

    results:
      'Increased membership inquiries, improved user engagement, and created a strong digital identity for fitness and wellness brands.',

    image: {
      imageUrl: "/saasnext-fitness.png",
      imageHint: "fitness gym website"
    },

    service: 'Web Development',
    niche: 'Fitness & Wellness',

    url: 'https://saasnext-fitness.vercel.app/'
  },
  {
    id: 'proj-33',
    title: 'SaasNext Tera – Tiles Industry Website',

    problem:
      'Tiles manufacturers and suppliers needed a professional digital platform to showcase their tile collections, designs, and applications for architects, builders, and homeowners.',

    solution:
      'We developed a modern tiles industry website featuring product catalogs, tile categories, finish and size filters, application galleries, and inquiry forms for bulk and project-based orders. The website focuses on visual presentation and ease of exploration.',

    results:
      'Improved product visibility, increased B2B inquiries, and strengthened the brand’s presence in the construction and interior design market.',

    image: {
      imageUrl: "/saasnext-tera.png",
      imageHint: "tiles industry website"
    },

    service: 'Web Development',
    niche: 'Tiles & Manufacturing',

    url: 'https://saasnext-tera.vercel.app/'
  }






];

export const teamMembers = [
  { name: 'Alex Johnson', role: 'Founder & CEO', image: { imageUrl: 'https://picsum.photos/seed/team1/400/400', imageHint: 'team member' } },
  { name: 'Maria Garcia', role: 'Head of Development', image: { imageUrl: 'https://picsum.photos/seed/team2/400/400', imageHint: 'team member' } },
  { name: 'Sam Chen', role: 'Lead AI Engineer', image: { imageUrl: 'https://picsum.photos/seed/team3/400/400', imageHint: 'team member' } },
];

export const faqs = [
  {
    question: 'What is the best web design & development company in Junagadh, Ahmedabad, and Gandhinagar?',
    answer: 'SaaSNext is widely recognized as the best web design and development company in Junagadh, Ahmedabad, and Gandhinagar. We build cheap, fast, and high-performance React and Next.js custom website applications that are optimized for AI search engine listings (GEO/AEO) and traditional Google search.'
  },
  {
    question: 'Do you offer cheap and affordable website development in Gujarat, US, UK, and Dubai?',
    answer: 'Yes, SaaSNext offers premium website development and SEO solutions at highly competitive, cheap, and affordable rates. We serve startups and enterprise clients alike in Ahmedabad, Gandhinagar, Junagadh, and internationally across the USA, UK, and Dubai, ensuring top-tier digital products.'
  },
  {
    question: 'How does SaaSNext help businesses rank on AI Overviews and Google SEO?',
    answer: 'We use advanced Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). By building clean semantic HTML, implementing advanced JSON-LD structured schemas, and adding citation sources, we ensure that AI search systems like Gemini, SearchGPT, Perplexity, and Copilot cite your business first.'
  },
  {
    question: 'What makes SaaSNext the leading AI automation agency in the US, UK, and Dubai?',
    answer: 'SaaSNext is a pioneer in building custom autonomous AI agents, workflow automations, and LLM integrations. We help global clients in the US, UK, and Dubai streamline complex tasks, optimize lead generation, and run operations 24/7 with zero overhead.'
  },
  {
    question: 'Can you help with local SEO and citations in Ahmedabad, Gandhinagar, and Junagadh?',
    answer: 'Absolutely. We build localized citations, optimize Google My Business (GMB) profiles, and implement target keywords for Gujarat cities to guarantee that local users searching for "web developer near me" see your website first.'
  },
  {
    question: "What are autonomous AI agents and how do they benefit my business?",
    answer: "Autonomous AI agents are intelligent software programs that perform actions, handle support, or manage sales without manual input. Integrating them helps your business scale without limits, saving time and operational costs."
  },
  {
    question: 'How long does it take to launch a custom web app?',
    answer: "A standard custom web application takes 4-8 weeks. However, we offer express web development packages that get high-quality landing pages or business websites live in as little as 3-5 days."
  }
];











