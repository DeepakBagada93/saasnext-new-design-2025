
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
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'A holistic approach to online growth, combining data-driven SEO, PPC, and content strategies to attract and convert high-quality leads.',
    image: getImage('serviceMarketing'),
    slug: 'digital-marketing',
    process: 'We analyze your market, develop a comprehensive strategy, execute targeted campaigns, and continuously optimize for maximum ROI.',
    benefits: 'A consistent flow of qualified leads, increased brand visibility, and a direct impact on your bottom line.',
    results: 'Lower cost-per-acquisition (CPA) and higher return on ad spend (ROAS).'
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
      service: 'Web Development'
    },
    {
      id: 'proj-2',
      title: 'AI-Powered Chatbot for Future Solutions',
      problem: 'Future Solutions wanted to improve customer support efficiency and provide 24/7 assistance.',
      solution: 'We developed and trained a custom AI chatbot that could handle 80% of common customer queries.',
      results: 'Reduced customer support tickets by 60% and increased customer satisfaction scores by 25%.',
      image: getImage('portfolio2'),
      service: 'AI Solutions'
    },
    {
      id: 'proj-3',
      title: 'Lead Generation Campaign for TechCorp',
      problem: 'TechCorp aimed to increase their B2B leads and penetrate a new market segment.',
      solution: 'We launched a multi-channel performance marketing campaign targeting key decision-makers on LinkedIn and Google Ads.',
      results: 'Generated over 500 qualified leads in the first quarter, resulting in a 200% ROI.',
      image: getImage('portfolio3'),
      service: 'Lead Generation'
    },
  ];

export const teamMembers = [
    { name: 'Alex Johnson', role: 'Founder & CEO', image: getImage('team1') },
    { name: 'Maria Garcia', role: 'Head of Development', image: getImage('team2') },
    { name: 'Sam Chen', role: 'Lead AI Engineer', image: getImage('team3') },
];

export const blogPosts = [
    {
        slug: 'the-future-of-web-development',
        title: 'The Future of Web Development: Trends to Watch in 2024',
        author: 'Maria Garcia',
        date: '2024-05-15',
        image: getImage('blog1'),
        excerpt: 'From AI-driven development to the rise of meta-frameworks, we explore the key trends shaping the future of the web...',
        content: '<p>The web development landscape is in a constant state of flux. In this post, we delve into the most impactful trends that developers and businesses should be paying attention to in 2024 and beyond.</p><h3>1. The Rise of AI</h3><p>AI is not just a buzzword; it\'s revolutionizing how we build for the web...</p>'
    },
    {
        slug: 'mastering-lead-generation',
        title: 'Mastering Lead Generation: A 5-Step Guide',
        author: 'John Smith',
        date: '2024-05-10',
        image: getImage('blog2'),
        excerpt: 'Struggling to fill your sales pipeline? This comprehensive guide breaks down lead generation into 5 actionable steps...',
        content: '<p>A steady stream of qualified leads is the lifeblood of any successful business. This guide provides a repeatable framework for attracting and converting your ideal customers.</p><h3>Step 1: Define Your Ideal Customer Profile (ICP)</h3><p>Before you can find your customers, you need to know who you\'re looking for...</p>'
    },
    {
        slug: 'is-your-business-ready-for-ai',
        title: 'Is Your Business Ready for AI? A Checklist',
        author: 'Sam Chen',
        date: '2024-05-05',
        image: getImage('blog3'),
        excerpt: 'AI can be a powerful tool, but implementation requires preparation. Use this checklist to see if your business is ready to take the leap...',
        content: '<p>Integrating AI can unlock immense value, but it\'s not a magic bullet. Success depends on having the right data, processes, and goals in place. Here\'s what you need to consider.</p><h3>1. Data Infrastructure</h3><p>Is your data clean, accessible, and sufficient for training a model?...</p>'
    }
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

    
