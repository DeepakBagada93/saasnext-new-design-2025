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
    icon: 'Users',
    title: 'Lead Generation',
    description: 'Implementing data-driven strategies to attract and convert high-quality leads for your business.',
    image: getImage('serviceLead'),
    slug: 'lead-generation',
    process: 'Our team identifies your target audience, creates compelling campaigns, and optimizes funnels for maximum conversion.',
    benefits: 'A consistent flow of qualified leads, improved sales pipeline, and measurable ROI.',
    results: 'Significant increase in lead volume and quality, leading to higher revenue.'
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
  {
    icon: 'BarChart',
    title: 'Performance Marketing',
    description: 'Maximizing your ROI with targeted digital marketing campaigns across various channels.',
    image: getImage('serviceMarketing'),
    slug: 'performance-marketing',
    process: 'From PPC and SEO to social media advertising, we manage and optimize your campaigns for peak performance.',
    benefits: 'Efficient ad spend, greater brand visibility, and a direct impact on your bottom line.',
    results: 'Lower cost-per-acquisition (CPA) and higher return on ad spend (ROAS).'
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

export const clients = [
    { id: 'client-1', name: 'TechCorp', contact: 'Jane Doe', email: 'jane.doe@techcorp.com' },
    { id: 'client-2', name: 'Innovate Ltd.', contact: 'John Smith', email: 'john.smith@innovate.com' },
];

export const projects = [
    { id: 'proj-101', clientId: 'client-1', name: 'Corporate Website Redesign', status: 'In Progress', timeline: { start: '2024-04-01', end: '2024-07-30' }, updates: [{ date: '2024-05-20', text: 'Initial wireframes approved. Moving to high-fidelity design.' }] },
    { id: 'proj-102', clientId: 'client-2', name: 'Q2 Lead Gen Campaign', status: 'Completed', timeline: { start: '2024-04-01', end: '2024-06-30' }, updates: [{ date: '2024-06-28', text: 'Final report delivered. Campaign exceeded all KPIs.' }] },
    { id: 'proj-103', clientId: 'client-1', name: 'AI Chatbot Integration', status: 'Planning', timeline: { start: '2024-07-01', end: '2024-09-30' }, updates: [] },
];

export const invoices = [
    {
        id: 'inv-001',
        clientId: 'client-1',
        projectId: 'proj-102',
        date: '2024-07-01',
        dueDate: '2024-07-15',
        status: 'Paid',
        amount: 5000.00,
        items: [
            { description: 'Q2 Lead Generation Campaign Management', quantity: 1, price: 5000.00 }
        ]
    },
    {
        id: 'inv-002',
        clientId: 'client-2',
        projectId: 'proj-101',
        date: '2024-06-01',
        dueDate: '2024-06-15',
        status: 'Paid',
        amount: 7500.00,
        items: [
            { description: 'Corporate Website Redesign - Milestone 1', quantity: 1, price: 7500.00 }
        ]
    },
    {
        id: 'inv-003',
        clientId: 'client-2',
        projectId: 'proj-101',
        date: '2024-07-01',
        dueDate: '2024-07-15',
        status: 'Due',
        amount: 7500.00,
        items: [
            { description: 'Corporate Website Redesign - Milestone 2', quantity: 1, price: 7500.00 }
        ]
    }
];
