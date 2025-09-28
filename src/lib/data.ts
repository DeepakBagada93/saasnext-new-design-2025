

import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) as ImagePlaceholder;

export const services = [
  {
    icon: 'Code',
    title: 'Web Development',
    description: 'Building responsive, high-performance websites and web applications tailored to your business needs.',
    image: getImage('serviceWeb'),
    slug: 'web-development',
    process: 'We follow an agile development process, from discovery and design to deployment and maintenance, ensuring a product that exceeds expectations.',
    benefits: 'A professional online presence, improved user engagement, and a scalable platform for growth.',
    results: 'Increased traffic, higher conversion rates, and a stronger brand identity.'
  },
  {
    icon: 'Search',
    title: 'SEO',
    description: 'Dominating search engine rankings to drive organic traffic and capture high-intent customers.',
    image: getImage('serviceSEO'),
    slug: 'seo',
    process: 'We perform in-depth keyword research, on-page optimization, technical SEO audits, and build high-quality backlinks to establish your authority.',
    benefits: 'Sustainable, long-term organic traffic, increased brand credibility, and a higher conversion rate from organic visitors.',
    results: 'Top-of-page rankings for target keywords and a significant increase in qualified, organic leads.'
  },
  {
    icon: 'Megaphone',
    title: 'Performance Marketing',
    description: 'A data-driven approach to paid advertising, focusing on maximizing your return on investment through PPC, and social media ads.',
    image: getImage('serviceMarketing'),
    slug: 'performance-marketing',
    process: 'We analyze your market, develop a comprehensive strategy, execute targeted campaigns, and continuously optimize for maximum ROI.',
    benefits: 'A consistent flow of qualified leads, increased brand visibility, and a direct impact on your bottom line.',
    results: 'Lower cost-per-acquisition (CPA) and higher return on ad spend (ROAS).'
  },
  {
    icon: 'Feather',
    title: 'Content Writing',
    description: 'Crafting compelling, SEO-optimized content that engages your audience and establishes you as a thought leader in your industry.',
    image: getImage('serviceContent'),
    slug: 'content-writing',
    process: 'We develop a content strategy, create a content calendar, and produce high-quality blog posts, articles, and website copy that speaks to your audience.',
    benefits: 'Improved SEO rankings, stronger brand voice, and valuable resources that attract and nurture leads.',
    results: 'Higher engagement rates, increased organic traffic, and a library of assets that supports sales and marketing efforts.'
  },
  {
    icon: 'Palette',
    title: 'Logo & Branding',
    description: 'Creating a memorable and cohesive brand identity that resonates with your target audience and sets you apart from the competition.',
    image: getImage('serviceBranding'),
    slug: 'logo-branding',
    process: 'Our process involves deep-diving into your brand\'s essence, exploring visual concepts, and delivering a comprehensive brand guide.',
    benefits: 'A strong, recognizable brand that builds trust and loyalty with your customers.',
    results: 'Increased brand recognition and a professional image that attracts high-value clients.'
  },
  {
    icon: 'BrainCircuit',
    title: 'AI Solutions',
    description: 'Integrating artificial intelligence to automate processes, gain insights, and create intelligent products.',
    image: getImage('serviceAI'),
    slug: 'ai-solutions',
    process: 'We analyze your business challenges, develop custom AI models, and integrate them seamlessly into your existing workflows.',
    benefits: 'Increased efficiency, data-driven decision-making, and a competitive edge in your industry.',
    results: 'Measurable improvements in operational efficiency and the creation of innovative, AI-powered features.'
  },
];

export const techStack = {
    frontend: [
        { name: "Next.js", description: "For performant, server-rendered React applications.", image: getImage('techNext') },
        { name: "React", description: "To build dynamic and interactive user interfaces.", image: getImage('techReact') },
        { name: "TypeScript", description: "For robust, scalable, and maintainable code.", image: getImage('techTypeScript') },
        { name: "Tailwind CSS", description: "For rapid, utility-first styling and design.", image: getImage('techTailwind') },
        { name: "Framer Motion", description: "For creating beautiful and complex animations.", image: getImage('techFramer') },
        { name: "Shadcn UI", description: "For a set of accessible and composable components.", image: getImage('techShadcn') },
    ],
    backend: [
        { name: "Node.js", description: "For building fast and scalable server-side applications.", image: getImage('techNode') },
        { name: "Firebase", description: "For backend services like auth, database, and storage.", image: getImage('techFirebase') },
        { name: "Firestore", description: "A flexible, scalable NoSQL cloud database.", image: getImage('techFirestore') },
        { name: "Server Actions", description: "For seamless data mutations from the client.", image: getImage('techNext') },
        { name: "REST APIs", description: "Designing and consuming RESTful services.", image: getImage('techAPI') },
        { name: "GraphQL", description: "For more efficient and flexible data fetching.", image: getImage('techGraphQL') },
    ],
    aiAndDeployment: [
        { name: "Genkit", description: "For integrating powerful generative AI features.", image: getImage('techGenkit') },
        { name: "Google AI", description: "Leveraging state-of-the-art models like Gemini.", image: getImage('techGoogleAI') },
        { name: "Vercel", description: "For optimized hosting and serverless functions.", image: getImage('techVercel') },
        { name: "Docker", description: "For containerizing applications for consistency.", image: getImage('techDocker') },
        { name: "CI/CD", description: "Automating build, test, and deployment pipelines.", image: getImage('techCICD') },
        { name: "GitHub", description: "For version control and collaborative development.", image: getImage('techGitHub') },
    ]
  };

export const testimonials = [
  {
    quote: "SaaSNext transformed our online presence. Their team is professional, responsive, and delivered a product that exceeded our expectations.",
    name: "Jane Doe",
    title: "CEO, TechCorp",
    image: getImage('testimonial1'),
  },
  {
    quote: "The lead generation campaign they ran for us was a game-changer. We've never had such a full pipeline of qualified leads.",
    name: "John Smith",
    title: "Marketing Director, Innovate Ltd.",
    image: getImage('testimonial2'),
  },
  {
    quote: "Working with SaaSNext on our AI integration was seamless. They are true experts in their field.",
    name: "Emily White",
    title: "COO, Future Solutions",
    image: getImage('testimonial3'),
  },
];

export const portfolioItems = [
    {
      id: 'proj-1',
      title: 'E-commerce Platform for Innovate Ltd.',
      problem: 'Innovate Ltd. needed a scalable e-commerce solution to handle their growing product line and customer base.',
      solution: 'We built a custom web application using Next.js and integrated a headless CMS for easy content management.',
      results: 'Achieved a 50% increase in online sales and a 30% improvement in page load times.',
      image: getImage('portfolio1'),
      service: 'Web Development',
      niche: 'E-commerce',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-2',
      title: 'AI-Powered Chatbot for Future Solutions',
      problem: 'Future Solutions wanted to improve customer support efficiency and provide 24/7 assistance.',
      solution: 'We developed and trained a custom AI chatbot that could handle 80% of common customer queries.',
      results: 'Reduced customer support tickets by 60% and increased customer satisfaction scores by 25%.',
      image: getImage('portfolio2'),
      service: 'AI Solutions',
      niche: 'AI',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-3',
      title: 'Lead Generation Campaign for TechCorp',
      problem: 'TechCorp aimed to increase their B2B leads and penetrate a new market segment.',
      solution: 'We launched a multi-channel performance marketing campaign targeting key decision-makers on LinkedIn and Google Ads.',
      results: 'Generated over 500 qualified leads in the first quarter, resulting in a 200% ROI.',
      image: getImage('portfolio3'),
      service: 'Lead Generation',
      niche: 'Corporate',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-4',
      title: 'Corporate Website for Junagadh Finance',
      problem: 'A local finance company needed a professional and trustworthy online presence to attract new clients.',
      solution: 'We designed and developed a secure, informative corporate website that highlights their services and expertise.',
      results: 'Increased client inquiries by 40% and established a strong local online brand.',
      image: getImage('portfolio4'),
      service: 'Web Development',
      niche: 'Corporate',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-5',
      title: 'Booking System for Local Tourism',
      problem: 'A Junagadh-based tour operator had no online booking capabilities, relying on phone calls and manual tracking.',
      solution: 'We built a custom booking and reservation system integrated directly into their new website.',
      results: 'Automated 90% of bookings and increased yearly revenue by 35%.',
      image: getImage('portfolio5'),
      service: 'Web Development',
      niche: 'E-commerce',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-6',
      title: 'Brand Identity for a Startup',
      problem: 'A new tech startup needed a strong, memorable brand identity to stand out in a crowded market.',
      solution: 'We developed a complete brand package, including a modern logo, color palette, and comprehensive style guide.',
      results: 'Successfully launched with a professional brand that resonated with their target audience and attracted initial investors.',
      image: getImage('portfolio6'),
      service: 'Logo & Branding',
      niche: 'Branding',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-7',
      title: 'Social Media Campaign for a Cafe',
      problem: 'A local cafe wanted to increase foot traffic and engagement with younger customers.',
      solution: 'We designed and executed a visually striking social media campaign with engaging posts and targeted ads.',
      results: 'Increased Instagram followers by 300% in two months and saw a 25% rise in weekday foot traffic.',
      image: getImage('portfolio8'),
      service: 'Performance Marketing',
      niche: 'Social Media',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-8',
      title: 'Rebranding for a Real Estate Agency',
      problem: 'An established real estate agency felt their brand was outdated and not appealing to luxury clients.',
      solution: 'We conducted a full rebrand, including a new sophisticated logo, and high-end marketing materials.',
      results: 'The agency successfully repositioned itself in the luxury market, attracting higher-value listings.',
      image: getImage('portfolio7'),
      service: 'Logo & Branding',
      niche: 'Branding',
      url: 'https://www.deepakbagada.in/'
    },
    {
      id: 'proj-9',
      title: 'Ad Creatives for Fashion Brand',
      problem: 'An online fashion brand needed compelling ad creatives for their new collection launch.',
      solution: 'We produced a series of dynamic and stylish ad graphics and short videos for Facebook and Instagram.',
      results: 'The ad campaign achieved a 4x return on ad spend (ROAS) and sold out the new collection.',
      image: getImage('portfolio9'),
      service: 'Performance Marketing',
      niche: 'Social Media',
      url: 'https://www.deepakbagada.in/'
    }
  ];

export const teamMembers = [
    { name: 'Alex Johnson', role: 'Founder & CEO', image: getImage('team1') },
    { name: 'Maria Garcia', role: 'Head of Development', image: getImage('team2') },
    { name: 'Sam Chen', role: 'Lead AI Engineer', image: getImage('team3') },
];

export const faqs = [
    {
      question: 'What types of businesses do you work with?',
      answer: 'We work with a wide range of businesses, from early-stage startups to established enterprise companies. Our core expertise lies in helping technology, SaaS, and e-commerce businesses scale, but our strategies are adaptable to any industry.'
    },
    {
      question: 'How much does a typical project cost?',
      answer: "Project costs vary greatly depending on the scope and complexity. We provide custom quotes after an initial discovery call. For a rough estimate, a standard website redesign starts around $10,000, while ongoing marketing retainers begin at $2,500/month."
    },
    {
      question: 'How long does a project usually take?',
      answer: "A typical website project takes 8-12 weeks from kick-off to launch. Smaller projects can be faster, and more complex builds may take longer. We establish a clear timeline at the beginning of every project."
    },
    {
      question: "What's your process for working with new clients?",
      answer: "Our process begins with a free discovery call to understand your goals. From there, we move to a detailed proposal, project kick-off, and then into our agile design and development sprints, with regular check-ins to ensure we're aligned every step of the way."
    },
    {
      question: 'Do you offer ongoing support and maintenance?',
      answer: "Yes, we offer a variety of ongoing support and maintenance packages to ensure your website or application remains secure, updated, and performing optimally post-launch. We can also provide retainers for ongoing feature development or marketing."
    }
  ];

    
