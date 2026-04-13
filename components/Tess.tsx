"use client";
import { useState } from "react";

// ============================================
// TYPES
// ============================================

interface SeedResult {
  done: number;
  failed: number;
  errors: string[];
  total: number;
}

interface CategoryMeta {
  key: string;
  label: string;
  color: string;
}

interface CategoryData {
  endpoint: string;
  projects: Record<string, unknown>[];
}

type SeedDataMap = Record<string, CategoryData>;
type ResultsMap = Record<string, SeedResult>;
type LoadingMap = Record<string, boolean>;

// ============================================
// SEED DATA
// ============================================

const SEED_DATA: SeedDataMap = {
  "web-development": {
    endpoint: "/api/services/web-development",
    projects: [
      {
        slug: "ecommerce-fashion-store",
        name: "Fashion E-Commerce Platform",
        description:
          "Full-featured online store with cart, checkout, and inventory management for a luxury fashion brand.",
        image:
          "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
        badge: "Featured",
        popular: true,
        featured: true,
        clientName: "LuxeWear Co.",
        completionDate: "2024-11-01",
        projectUrl: "https://luxewear.com",
        techStack: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Stripe",
          "Supabase",
        ],
        features: [
          "Product filtering",
          "Wishlist",
          "Order tracking",
          "Admin dashboard",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "saas-dashboard-analytics",
        name: "SaaS Analytics Dashboard",
        description:
          "Real-time analytics platform with customizable widgets, data visualizations, and team collaboration.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        badge: "Popular",
        popular: true,
        featured: true,
        clientName: "DataPulse Inc.",
        completionDate: "2024-10-15",
        projectUrl: "https://datapulse.io",
        techStack: [
          "Next.js",
          "Recharts",
          "Prisma",
          "PostgreSQL",
          "TailwindCSS",
        ],
        features: ["Real-time charts", "Team roles", "CSV export", "Dark mode"],
        status: "PUBLISHED",
      },
      {
        slug: "hospital-management-system",
        name: "Hospital Management System",
        description:
          "Comprehensive web app for managing patient records, appointments, billing, and staff scheduling.",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "MedCore Health",
        completionDate: "2024-09-20",
        techStack: ["Next.js", "TypeScript", "Supabase", "Zod", "ShadCN UI"],
        features: [
          "Patient records",
          "Appointment booking",
          "Billing system",
          "Staff dashboard",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "real-estate-listing-platform",
        name: "Real Estate Listing Platform",
        description:
          "Property listing site with map integration, advanced filters, virtual tours, and agent portals.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "PropFinder NG",
        completionDate: "2024-08-10",
        projectUrl: "https://propfinder.ng",
        techStack: ["Next.js", "Mapbox", "Prisma", "MongoDB", "Cloudinary"],
        features: [
          "Map view",
          "Virtual tours",
          "Agent portal",
          "Property alerts",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "learning-management-system",
        name: "Learning Management System",
        description:
          "Feature-rich LMS with course creation, video lessons, quizzes, and student progress tracking.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        badge: "Bestseller",
        popular: true,
        featured: false,
        clientName: "EduTrack Academy",
        completionDate: "2024-07-05",
        techStack: ["Next.js", "Mux Video", "Stripe", "Prisma", "MySQL"],
        features: [
          "Video streaming",
          "Quiz engine",
          "Certificates",
          "Progress tracking",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "restaurant-ordering-system",
        name: "Restaurant Online Ordering",
        description:
          "Digital menu and ordering platform with real-time order tracking and kitchen display system.",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
        popular: false,
        featured: false,
        clientName: "Bistro Lagos",
        completionDate: "2024-06-18",
        projectUrl: "https://bistrolagos.com",
        techStack: ["Next.js", "Socket.io", "Prisma", "PostgreSQL", "Paystack"],
        features: [
          "Digital menu",
          "Order tracking",
          "KDS display",
          "Table management",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "crm-platform",
        name: "CRM & Sales Pipeline Tool",
        description:
          "Customer relationship management platform with deal tracking, email integration, and sales reporting.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "SalesPro Africa",
        completionDate: "2024-05-30",
        techStack: ["Next.js", "TypeScript", "Supabase", "Resend", "Recharts"],
        features: [
          "Pipeline view",
          "Email sync",
          "Contact management",
          "Sales reports",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "event-ticketing-platform",
        name: "Event Ticketing Platform",
        description:
          "End-to-end event management and ticketing with QR code scanning and attendee analytics.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "EventHub NG",
        completionDate: "2024-04-12",
        projectUrl: "https://eventhub.ng",
        techStack: ["Next.js", "QR Code", "Stripe", "Prisma", "Tailwind CSS"],
        features: [
          "QR ticketing",
          "Seat selection",
          "Attendee check-in",
          "Revenue dashboard",
        ],
        status: "PUBLISHED",
      },
    ],
  },
  "graphic-design": {
    endpoint: "/api/services/graphics-design",
    projects: [
      {
        slug: "luxe-brand-identity",
        name: "LuxeWear Brand Identity",
        description:
          "Complete brand identity system including logo, typography, color palette, and brand guidelines for a luxury fashion label.",
        image:
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
        badge: "Featured",
        popular: true,
        featured: true,
        clientName: "LuxeWear Co.",
        completionDate: "2024-10-01",
        designTools: ["Figma", "Illustrator", "Photoshop"],
        projectType: "Brand Identity",
        colorPalette: ["#1A1A2E", "#C9A96E", "#F5F5F5"],
        features: [
          "Logo suite",
          "Brand guidelines",
          "Stationery design",
          "Social media kit",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "fintech-app-ui",
        name: "Fintech Mobile App UI",
        description:
          "Modern and intuitive UI design for a digital banking app with dark mode, accessibility, and micro-interactions.",
        image:
          "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=600&h=400&fit=crop",
        badge: "Popular",
        popular: true,
        featured: true,
        clientName: "PocketBank",
        completionDate: "2024-09-15",
        designTools: ["Figma", "Principle"],
        projectType: "UI/UX Design",
        colorPalette: ["#0D1B2A", "#1B4332", "#52B788"],
        features: ["Design system", "40+ screens", "Dark mode", "Prototype"],
        status: "PUBLISHED",
      },
      {
        slug: "restaurant-menu-design",
        name: "Upscale Restaurant Menu & Branding",
        description:
          "Elegant print and digital menu design with full brand identity for a high-end Lagos restaurant.",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "Bistro Lagos",
        completionDate: "2024-08-20",
        designTools: ["InDesign", "Illustrator", "Photoshop"],
        projectType: "Print & Brand Design",
        colorPalette: ["#2C1810", "#D4AF37", "#F9F6EE"],
        features: ["Menu design", "Logo", "Table cards", "Packaging"],
        status: "PUBLISHED",
      },
      {
        slug: "tech-startup-pitch-deck",
        name: "Tech Startup Pitch Deck",
        description:
          "Investor-ready pitch deck with data visualization, infographics, and on-brand storytelling for a SaaS startup.",
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "DataPulse Inc.",
        completionDate: "2024-07-10",
        designTools: ["Figma", "PowerPoint", "Illustrator"],
        projectType: "Presentation Design",
        colorPalette: ["#0F172A", "#6366F1", "#E2E8F0"],
        features: ["30 slides", "Infographics", "Icon set", "Data charts"],
        status: "PUBLISHED",
      },
      {
        slug: "social-media-content-pack",
        name: "Social Media Content Pack",
        description:
          "100+ branded social media templates for Instagram, Twitter, and LinkedIn covering announcements, promos, and stories.",
        image:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
        badge: "Bestseller",
        popular: true,
        featured: false,
        clientName: "EventHub NG",
        completionDate: "2024-06-25",
        designTools: ["Figma", "Canva Pro", "Photoshop"],
        projectType: "Social Media Design",
        colorPalette: ["#FF6B6B", "#4ECDC4", "#2C3E50"],
        features: [
          "100+ templates",
          "Story formats",
          "Editable source files",
          "Brand consistency",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "ngo-annual-report",
        name: "NGO Annual Report Design",
        description:
          "Visually compelling 60-page annual report for a non-profit showcasing impact metrics, stories, and financials.",
        image:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
        popular: false,
        featured: false,
        clientName: "GreenAfrica Foundation",
        completionDate: "2024-05-15",
        designTools: ["InDesign", "Illustrator", "Photoshop"],
        projectType: "Publication Design",
        colorPalette: ["#1B4332", "#52B788", "#F8F9FA"],
        features: [
          "60-page layout",
          "Infographics",
          "Photography editing",
          "Print-ready PDF",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "ecommerce-product-photography",
        name: "E-Commerce Product Visual Pack",
        description:
          "Professional product photography editing and graphic composites for an online fashion store's catalog.",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "LuxeWear Co.",
        completionDate: "2024-04-28",
        designTools: ["Photoshop", "Lightroom", "Capture One"],
        projectType: "Photo Editing & Retouching",
        colorPalette: ["#FFFFFF", "#F0EDE8", "#2D2D2D"],
        features: [
          "200+ edited images",
          "Background removal",
          "Color grading",
          "Web & print formats",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "mobile-game-ui-design",
        name: "Mobile Game UI & Icon Design",
        description:
          "Game UI kit including HUDs, menus, icons, and character selection screens for a casual mobile game.",
        image:
          "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "PlayZone Studios",
        completionDate: "2024-03-14",
        designTools: ["Figma", "Illustrator", "Spine"],
        projectType: "Game UI Design",
        colorPalette: ["#6A0DAD", "#FF6F00", "#FFD700"],
        features: [
          "HUD design",
          "Icon set",
          "Animated elements",
          "Asset export",
        ],
        status: "PUBLISHED",
      },
    ],
  },
  "ai-automation": {
    endpoint: "/api/services/ai-automation",
    projects: [
      {
        slug: "customer-support-ai-bot",
        name: "AI Customer Support Bot",
        description:
          "Intelligent chatbot handling 10K+ conversations monthly with 95% accuracy across email, chat, and WhatsApp.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        badge: "Featured",
        popular: true,
        featured: true,
        clientName: "MedCore Health",
        completionDate: "2024-11-05",
        projectUrl: "https://medcore.health/support",
        aiTechnologies: ["GPT-4", "LangChain", "OpenAI API", "Twilio"],
        automationType: "Customer Support Automation",
        integrations: ["WhatsApp", "Gmail", "Zendesk"],
        features: [
          "Multi-channel support",
          "Escalation routing",
          "Sentiment detection",
          "Analytics dashboard",
        ],
        results: "85% reduction in support tickets",
        status: "PUBLISHED",
      },
      {
        slug: "ai-content-generation-pipeline",
        name: "AI Content Generation Pipeline",
        description:
          "Automated content creation system producing 500+ SEO-optimized blog posts and social captions monthly.",
        image:
          "https://images.unsplash.com/photo-1676277791608-ac52e8e5be2e?w=600&h=400&fit=crop",
        badge: "Popular",
        popular: true,
        featured: true,
        clientName: "ContentScale Agency",
        completionDate: "2024-10-20",
        aiTechnologies: ["Claude AI", "GPT-4", "DALL-E 3"],
        automationType: "Content Automation",
        integrations: ["WordPress", "Buffer", "Airtable"],
        features: [
          "Keyword research",
          "Auto-publishing",
          "Image generation",
          "SEO scoring",
        ],
        results: "500+ pieces generated monthly",
        status: "PUBLISHED",
      },
      {
        slug: "lead-qualification-automation",
        name: "Lead Qualification & CRM Automation",
        description:
          "AI pipeline that scores, qualifies, and routes inbound leads automatically into the sales CRM.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "SalesPro Africa",
        completionDate: "2024-09-30",
        aiTechnologies: ["GPT-4", "OpenAI API", "LangChain"],
        automationType: "Sales Automation",
        integrations: ["HubSpot", "Gmail", "Slack", "Zapier"],
        features: [
          "Lead scoring",
          "Auto-response",
          "CRM sync",
          "Slack notifications",
        ],
        results: "3x faster lead response time",
        status: "PUBLISHED",
      },
      {
        slug: "invoice-processing-automation",
        name: "AI Invoice Processing System",
        description:
          "Automated document parsing and invoice processing system reducing manual data entry by 90%.",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "FinEdge Accounting",
        completionDate: "2024-08-15",
        aiTechnologies: ["GPT-4 Vision", "Python", "Tesseract OCR"],
        automationType: "Document Processing",
        integrations: ["QuickBooks", "Google Drive", "Slack"],
        features: [
          "OCR extraction",
          "Auto-categorization",
          "Approval workflow",
          "Audit trail",
        ],
        results: "90% reduction in manual data entry",
        status: "PUBLISHED",
      },
      {
        slug: "social-media-scheduler-ai",
        name: "AI Social Media Scheduler",
        description:
          "Smart social media management tool that generates, schedules, and analyzes posts across multiple platforms.",
        image:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
        badge: "Bestseller",
        popular: true,
        featured: false,
        clientName: "BrandBoost Agency",
        completionDate: "2024-07-22",
        aiTechnologies: ["GPT-4", "DALL-E 3", "Claude AI"],
        automationType: "Marketing Automation",
        integrations: ["Instagram", "Twitter", "LinkedIn", "Buffer"],
        features: [
          "Content generation",
          "Smart scheduling",
          "Hashtag research",
          "Performance analytics",
        ],
        results: "40% increase in engagement",
        status: "PUBLISHED",
      },
      {
        slug: "recruitment-screening-ai",
        name: "AI Recruitment Screening System",
        description:
          "Automated CV screening, candidate ranking, and interview scheduling system for high-volume hiring.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
        popular: false,
        featured: false,
        clientName: "TalentHub Nigeria",
        completionDate: "2024-06-10",
        aiTechnologies: ["GPT-4", "LangChain", "OpenAI Embeddings"],
        automationType: "HR Automation",
        integrations: ["Gmail", "Calendly", "Notion", "Slack"],
        features: [
          "CV parsing",
          "Skill matching",
          "Auto-scheduling",
          "Bias detection",
        ],
        results: "60% faster time-to-hire",
        status: "PUBLISHED",
      },
      {
        slug: "ecommerce-price-monitor",
        name: "E-Commerce Price Monitoring Bot",
        description:
          "Automated competitor price tracking and dynamic repricing bot for online retailers.",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "ShopSmart NG",
        completionDate: "2024-05-20",
        aiTechnologies: ["Python", "GPT-4", "Playwright"],
        automationType: "Data Automation",
        integrations: ["WooCommerce", "Slack", "Google Sheets"],
        features: [
          "Price scraping",
          "Competitor alerts",
          "Auto-repricing",
          "Market reports",
        ],
        results: "22% revenue increase via dynamic pricing",
        status: "PUBLISHED",
      },
      {
        slug: "ai-email-campaign-optimizer",
        name: "AI Email Campaign Optimizer",
        description:
          "Smart email marketing system with AI-generated copy, A/B testing, and send-time optimization.",
        image:
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "GrowthMail",
        completionDate: "2024-04-05",
        aiTechnologies: ["GPT-4", "Mailchimp API", "Python"],
        automationType: "Email Marketing Automation",
        integrations: ["Mailchimp", "HubSpot", "Zapier"],
        features: [
          "AI copywriting",
          "A/B testing",
          "Send-time AI",
          "Segmentation",
        ],
        results: "40% increase in open rates",
        status: "PUBLISHED",
      },
    ],
  },
  "mobile-app-development": {
    endpoint: "/api/services/mobile-app-development",
    projects: [
      {
        slug: "food-delivery-app",
        name: "Food Delivery App",
        description:
          "Full-stack food delivery platform with real-time tracking, multi-restaurant ordering, and driver management.",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
        badge: "Featured",
        popular: true,
        featured: true,
        clientName: "QuickBite Nigeria",
        completionDate: "2024-11-10",
        appStoreUrl: "https://apps.apple.com",
        playStoreUrl: "https://play.google.com",
        platforms: ["iOS", "Android"],
        techStack: ["React Native", "Node.js", "Socket.io", "PostgreSQL"],
        appType: "Food & Delivery",
        features: [
          "Real-time tracking",
          "In-app payment",
          "Driver app",
          "Restaurant dashboard",
        ],
        downloads: "50K+",
        rating: "4.7/5",
        status: "PUBLISHED",
      },
      {
        slug: "fintech-wallet-app",
        name: "Digital Wallet & Transfers App",
        description:
          "Secure mobile fintech app for peer-to-peer transfers, bill payments, and savings goals with biometric auth.",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
        badge: "Popular",
        popular: true,
        featured: true,
        clientName: "PocketBank",
        completionDate: "2024-10-08",
        appStoreUrl: "https://apps.apple.com",
        playStoreUrl: "https://play.google.com",
        platforms: ["iOS", "Android"],
        techStack: ["Flutter", "Dart", "Firebase", "Paystack"],
        appType: "Fintech",
        features: [
          "P2P transfers",
          "Bill payments",
          "Savings vaults",
          "Biometric login",
        ],
        downloads: "100K+",
        rating: "4.8/5",
        status: "PUBLISHED",
      },
      {
        slug: "fitness-tracking-app",
        name: "AI Fitness & Workout Tracker",
        description:
          "Personalized fitness app with AI workout plans, progress tracking, nutrition logging, and community challenges.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "FitLife Africa",
        completionDate: "2024-09-14",
        playStoreUrl: "https://play.google.com",
        platforms: ["Android", "iOS"],
        techStack: ["React Native", "TensorFlow Lite", "Supabase", "Expo"],
        appType: "Health & Fitness",
        features: [
          "AI workout plans",
          "Calorie tracking",
          "Progress photos",
          "Social challenges",
        ],
        downloads: "20K+",
        rating: "4.6/5",
        status: "PUBLISHED",
      },
      {
        slug: "property-finder-app",
        name: "Property Finder Mobile App",
        description:
          "Mobile-first real estate app with map search, virtual tours, agent chat, and mortgage calculator.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "PropFinder NG",
        completionDate: "2024-08-28",
        appStoreUrl: "https://apps.apple.com",
        platforms: ["iOS", "Android", "Cross-platform"],
        techStack: ["Flutter", "Google Maps SDK", "Firebase", "Node.js"],
        appType: "Real Estate",
        features: [
          "Map search",
          "Virtual tours",
          "Agent chat",
          "Mortgage calculator",
        ],
        downloads: "15K+",
        rating: "4.5/5",
        status: "PUBLISHED",
      },
      {
        slug: "event-discovery-app",
        name: "Event Discovery & Ticketing App",
        description:
          "Hyperlocal event discovery app with QR ticketing, social sharing, and personalized recommendations.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
        badge: "Bestseller",
        popular: true,
        featured: false,
        clientName: "EventHub NG",
        completionDate: "2024-07-17",
        appStoreUrl: "https://apps.apple.com",
        playStoreUrl: "https://play.google.com",
        platforms: ["iOS", "Android"],
        techStack: ["React Native", "Stripe", "Mapbox", "Supabase"],
        appType: "Entertainment",
        features: [
          "QR ticketing",
          "Map discovery",
          "Social sharing",
          "Personalized feed",
        ],
        downloads: "30K+",
        rating: "4.7/5",
        status: "PUBLISHED",
      },
      {
        slug: "telemedicine-app",
        name: "Telemedicine & Doctor Booking App",
        description:
          "Healthcare mobile app enabling patients to book appointments, consult doctors via video, and manage prescriptions.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        popular: false,
        featured: false,
        clientName: "MedCore Health",
        completionDate: "2024-06-05",
        playStoreUrl: "https://play.google.com",
        platforms: ["Android", "iOS"],
        techStack: ["Flutter", "WebRTC", "Firebase", "Django"],
        appType: "Healthcare",
        features: [
          "Video consultations",
          "Prescription management",
          "Lab results",
          "Health records",
        ],
        downloads: "10K+",
        rating: "4.9/5",
        status: "PUBLISHED",
      },
      {
        slug: "school-parent-app",
        name: "School-Parent Communication App",
        description:
          "Mobile app bridging schools and parents with attendance alerts, grade tracking, fee payment, and messaging.",
        image:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "EduTrack Academy",
        completionDate: "2024-05-10",
        appStoreUrl: "https://apps.apple.com",
        playStoreUrl: "https://play.google.com",
        platforms: ["iOS", "Android", "Cross-platform"],
        techStack: ["React Native", "Firebase", "Paystack", "Node.js"],
        appType: "Education",
        features: [
          "Attendance alerts",
          "Grade reports",
          "Fee payment",
          "In-app messaging",
        ],
        downloads: "8K+",
        rating: "4.5/5",
        status: "PUBLISHED",
      },
      {
        slug: "logistics-driver-app",
        name: "Logistics & Driver Management App",
        description:
          "Fleet management app for drivers with route optimization, delivery confirmation, earnings tracking, and dispatch.",
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "SwiftMove Logistics",
        completionDate: "2024-04-20",
        playStoreUrl: "https://play.google.com",
        platforms: ["Android"],
        techStack: ["React Native", "Google Maps", "Socket.io", "PostgreSQL"],
        appType: "Logistics",
        features: [
          "Route optimization",
          "Proof of delivery",
          "Earnings dashboard",
          "Live dispatch",
        ],
        downloads: "5K+",
        rating: "4.4/5",
        status: "PUBLISHED",
      },
    ],
  },
  "vibe-coding": {
    endpoint: "/api/services/vibe-coding",
    projects: [
      {
        slug: "saas-landing-page-vibe",
        name: "SaaS Landing Page in 2 Hours",
        description:
          "Fully responsive, animated SaaS landing page built from prompt to deployment using AI-assisted coding tools.",
        image:
          "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
        badge: "Featured",
        popular: true,
        featured: true,
        clientName: "DataPulse Inc.",
        completionDate: "2024-11-12",
        projectUrl: "https://datapulse.io",
        githubUrl: "https://github.com",
        aiTools: ["v0", "Cursor", "Claude", "GitHub Copilot"],
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        features: [
          "Hero section",
          "Pricing table",
          "Testimonials",
          "CTA animations",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "ecommerce-store-vibe",
        name: "E-Commerce Store — Zero to Live in a Day",
        description:
          "Full e-commerce storefront with cart, checkout, and product pages built entirely via AI-pair programming.",
        image:
          "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
        badge: "Popular",
        popular: true,
        featured: true,
        clientName: "LuxeWear Co.",
        completionDate: "2024-10-25",
        projectUrl: "https://luxewear.com",
        aiTools: ["Bolt.new", "Cursor", "Claude", "v0"],
        techStack: ["Next.js", "Stripe", "Supabase", "Tailwind CSS"],
        features: [
          "Product catalog",
          "Cart & checkout",
          "Admin panel",
          "Mobile-first design",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "ai-dashboard-vibe",
        name: "AI-Powered Admin Dashboard",
        description:
          "Clean admin dashboard with charts, data tables, and user management built with AI tools in under 6 hours.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "SalesPro Africa",
        completionDate: "2024-09-18",
        githubUrl: "https://github.com",
        aiTools: ["Cursor", "Claude", "GitHub Copilot"],
        techStack: ["Next.js", "ShadCN UI", "Recharts", "Prisma"],
        features: [
          "Dashboard widgets",
          "Data tables",
          "User roles",
          "Dark mode",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "portfolio-site-vibe",
        name: "Portfolio Website — Prompt to Deploy",
        description:
          "Stunning developer portfolio with scroll animations and glassmorphic design built using AI-assisted workflows.",
        image:
          "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        aiTools: ["v0", "Claude", "Bolt.new"],
        techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
        features: [
          "Animated hero",
          "Project gallery",
          "Contact form",
          "CMS blog",
        ],
        completionDate: "2024-08-30",
        status: "PUBLISHED",
      },
      {
        slug: "chatbot-ui-vibe",
        name: "Custom ChatGPT-Style Interface",
        description:
          "Polished chat UI with streaming responses, conversation history, and model switching — built AI-to-AI.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        badge: "Bestseller",
        popular: true,
        featured: false,
        completionDate: "2024-07-14",
        projectUrl: "https://demo.com",
        aiTools: ["Cursor", "Claude", "GitHub Copilot"],
        techStack: ["Next.js", "Vercel AI SDK", "OpenAI", "Tailwind CSS"],
        features: [
          "Streaming chat",
          "Model switcher",
          "Chat history",
          "Markdown rendering",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "job-board-vibe",
        name: "Job Board Platform — 1 Day Build",
        description:
          "Full job listing platform with filters, applications, and employer dashboard built via AI pair programming.",
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        popular: false,
        featured: false,
        clientName: "TalentHub Nigeria",
        completionDate: "2024-06-22",
        aiTools: ["Bolt.new", "Claude", "v0"],
        techStack: ["Next.js", "Prisma", "PostgreSQL", "Resend"],
        features: [
          "Job listings",
          "Application flow",
          "Employer portal",
          "Email notifications",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "event-landing-vibe",
        name: "Conference Landing Page",
        description:
          "High-converting event landing page with speaker profiles, schedule, and ticket checkout built in hours.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "EventHub NG",
        completionDate: "2024-05-08",
        projectUrl: "https://eventhub.ng",
        aiTools: ["v0", "Cursor", "Claude"],
        techStack: ["Next.js", "Framer Motion", "Stripe", "Tailwind CSS"],
        features: [
          "Speaker grid",
          "Schedule timeline",
          "Countdown timer",
          "Ticket purchase",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "crm-mvp-vibe",
        name: "CRM MVP — Shipped in 3 Days",
        description:
          "Minimal viable CRM with contact management, deal pipeline, and activity logging built entirely with AI coding tools.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "SalesPro Africa",
        completionDate: "2024-04-01",
        githubUrl: "https://github.com",
        aiTools: ["Cursor", "Claude", "GitHub Copilot", "v0"],
        techStack: ["Next.js", "Supabase", "TypeScript", "ShadCN UI"],
        features: [
          "Contact management",
          "Deal pipeline",
          "Activity log",
          "CSV import",
        ],
        status: "PUBLISHED",
      },
    ],
  },
  "ai-agent-building": {
    endpoint: "/api/services/ai-agent-building",
    projects: [
      {
        slug: "research-agent-pro",
        name: "AI Research & Summarization Agent",
        description:
          "Autonomous research agent that scours the web, synthesizes findings, and delivers structured reports on any topic.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        badge: "Featured",
        popular: true,
        featured: true,
        clientName: "ContentScale Agency",
        completionDate: "2024-11-08",
        demoUrl: "https://demo.com",
        githubUrl: "https://github.com",
        aiModels: ["GPT-4", "Claude 3.5 Sonnet", "Perplexity API"],
        agentType: "Research Agent",
        frameworks: ["LangChain", "LangGraph", "Custom"],
        integrations: ["Slack", "Notion", "Google Docs"],
        capabilities: [
          "Web browsing",
          "PDF parsing",
          "Report generation",
          "Citation tracking",
        ],
        techStack: ["Python", "FastAPI", "Redis", "PostgreSQL"],
        features: [
          "Multi-source research",
          "Auto-summarization",
          "Slack delivery",
          "Scheduled reports",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "code-review-agent",
        name: "Automated Code Review Agent",
        description:
          "AI agent that reviews pull requests, detects bugs, suggests improvements, and enforces code standards automatically.",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        badge: "Popular",
        popular: true,
        featured: true,
        clientName: "DevOps Studio",
        completionDate: "2024-10-18",
        githubUrl: "https://github.com",
        aiModels: ["Claude 3.5 Sonnet", "GPT-4"],
        agentType: "Code Agent",
        frameworks: ["LangChain", "AutoGen", "Custom"],
        integrations: ["GitHub", "GitLab", "Slack", "Jira"],
        capabilities: [
          "PR review",
          "Bug detection",
          "Style enforcement",
          "Security scanning",
        ],
        techStack: ["Python", "FastAPI", "GitHub API", "Redis"],
        features: [
          "Auto PR comments",
          "Security checks",
          "Test suggestions",
          "Team reports",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "sales-outreach-agent",
        name: "Autonomous Sales Outreach Agent",
        description:
          "AI agent that researches prospects, crafts personalized outreach emails, and follows up automatically.",
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "SalesPro Africa",
        completionDate: "2024-09-25",
        demoUrl: "https://demo.com",
        aiModels: ["GPT-4", "Claude 3.5 Sonnet"],
        agentType: "Automation Agent",
        frameworks: ["LangChain", "CrewAI"],
        integrations: ["Gmail", "LinkedIn", "HubSpot", "Slack"],
        capabilities: [
          "Prospect research",
          "Personalized emails",
          "Follow-up sequences",
          "CRM logging",
        ],
        techStack: ["Python", "FastAPI", "Celery", "PostgreSQL"],
        features: [
          "Lead enrichment",
          "AI email writing",
          "Auto follow-ups",
          "Reply detection",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "data-analyst-agent",
        name: "AI Data Analyst Agent",
        description:
          "Conversational agent that connects to databases, runs queries, generates charts, and explains insights in plain English.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "DataPulse Inc.",
        completionDate: "2024-08-20",
        demoUrl: "https://demo.com",
        aiModels: ["GPT-4", "Claude 3.5 Sonnet", "Gemini Pro"],
        agentType: "Research Agent",
        frameworks: ["LangChain", "Custom"],
        integrations: ["PostgreSQL", "Supabase", "Slack", "Google Sheets"],
        capabilities: [
          "SQL generation",
          "Chart creation",
          "Trend analysis",
          "Natural language queries",
        ],
        techStack: ["Python", "FastAPI", "Plotly", "LangChain"],
        features: [
          "NL-to-SQL",
          "Auto charts",
          "Anomaly detection",
          "Scheduled reports",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "customer-onboarding-agent",
        name: "Customer Onboarding Automation Agent",
        description:
          "Multi-step onboarding agent that guides new users, answers questions, and completes setup tasks autonomously.",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
        badge: "Bestseller",
        popular: true,
        featured: false,
        clientName: "PocketBank",
        completionDate: "2024-07-30",
        aiModels: ["GPT-4", "Claude 3.5 Sonnet"],
        agentType: "Chatbot",
        frameworks: ["LangChain", "LangGraph"],
        integrations: ["Intercom", "Slack", "Email", "CRM"],
        capabilities: [
          "Multi-step onboarding",
          "FAQ answering",
          "KYC guidance",
          "Task completion",
        ],
        techStack: ["Node.js", "LangChain", "Supabase", "Resend"],
        features: [
          "Guided onboarding",
          "Progress tracking",
          "Human handoff",
          "Multilingual",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "social-listening-agent",
        name: "Brand Social Listening Agent",
        description:
          "AI agent that monitors social media for brand mentions, sentiment shifts, and competitor activity in real time.",
        image:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
        popular: false,
        featured: false,
        clientName: "BrandBoost Agency",
        completionDate: "2024-06-28",
        aiModels: ["GPT-4", "Claude 3.5 Sonnet"],
        agentType: "Automation Agent",
        frameworks: ["LangChain", "Custom"],
        integrations: ["Twitter API", "Reddit API", "Slack", "Notion"],
        capabilities: [
          "Mention tracking",
          "Sentiment analysis",
          "Competitor monitoring",
          "Crisis alerts",
        ],
        techStack: ["Python", "FastAPI", "Redis", "PostgreSQL"],
        features: [
          "Real-time monitoring",
          "Sentiment dashboard",
          "Weekly digests",
          "Alert system",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "document-processing-agent",
        name: "Intelligent Document Processing Agent",
        description:
          "Agent that extracts, classifies, and routes information from contracts, invoices, and forms with high accuracy.",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
        badge: "New",
        popular: false,
        featured: true,
        clientName: "FinEdge Accounting",
        completionDate: "2024-05-25",
        aiModels: ["GPT-4 Vision", "Claude 3.5 Sonnet"],
        agentType: "Automation Agent",
        frameworks: ["LangChain", "Custom"],
        integrations: ["Google Drive", "Dropbox", "QuickBooks", "Slack"],
        capabilities: [
          "OCR extraction",
          "Document classification",
          "Data validation",
          "Auto-routing",
        ],
        techStack: ["Python", "FastAPI", "Tesseract", "PostgreSQL"],
        features: [
          "Multi-format support",
          "Accuracy scoring",
          "Human review queue",
          "Audit trail",
        ],
        status: "PUBLISHED",
      },
      {
        slug: "meeting-intelligence-agent",
        name: "Meeting Intelligence Agent",
        description:
          "AI agent that joins meetings, transcribes conversations, extracts action items, and sends follow-up summaries.",
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
        popular: true,
        featured: false,
        clientName: "DevOps Studio",
        completionDate: "2024-04-15",
        demoUrl: "https://demo.com",
        aiModels: ["Whisper", "GPT-4", "Claude 3.5 Sonnet"],
        agentType: "Automation Agent",
        frameworks: ["LangChain", "Custom"],
        integrations: ["Zoom", "Google Meet", "Slack", "Notion"],
        capabilities: [
          "Live transcription",
          "Action item extraction",
          "Speaker identification",
          "Summary generation",
        ],
        techStack: ["Python", "FastAPI", "Whisper API", "Redis"],
        features: [
          "Auto-join meetings",
          "Real-time transcription",
          "Action items",
          "Email summaries",
        ],
        status: "PUBLISHED",
      },
    ],
  },
};

const PORTFOLIO_DATA: Record<string, unknown>[] = [
  {
    slug: "portfolio-food-delivery",
    name: "QuickBite — Food Delivery Platform",
    description:
      "End-to-end food delivery ecosystem: consumer app, driver app, restaurant dashboard, and admin panel.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: "Featured",
    popular: true,
    featured: true,
    clientName: "QuickBite Nigeria",
    completionDate: "2024-11-10",
    projectUrl: "https://quickbite.ng",
    githubUrl: null,
    demoUrl: null,
    category: "Mobile App Development",
    categorySlug: "mobile-app-development",
    techStack: ["React Native", "Node.js", "Socket.io", "PostgreSQL"],
    features: ["Real-time tracking", "In-app payment", "Driver app"],
    tools: [],
    platforms: ["iOS", "Android"],
    projectType: "Mobile App",
    results: "50K+ downloads, 4.7/5 rating",
    duration: "4 months",
    metrics: "50K downloads · 4.7/5 rating · 3 apps shipped",
    order: 1,
    showcaseText: "A complete mobility solution for the food economy.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-fintech-wallet",
    name: "PocketBank — Digital Wallet App",
    description:
      "Secure and elegant mobile fintech app for transfers, savings, and bill payments with biometric login.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: "Popular",
    popular: true,
    featured: true,
    clientName: "PocketBank",
    completionDate: "2024-10-08",
    projectUrl: null,
    githubUrl: null,
    demoUrl: null,
    category: "Mobile App Development",
    categorySlug: "mobile-app-development",
    techStack: ["Flutter", "Firebase", "Paystack"],
    features: ["P2P transfers", "Savings vaults", "Biometric login"],
    tools: [],
    platforms: ["iOS", "Android"],
    projectType: "Fintech App",
    results: "100K+ downloads, 4.8/5 rating",
    duration: "5 months",
    metrics: "100K+ downloads · 4.8/5 rating · Top finance app",
    order: 2,
    showcaseText: "Banking reimagined for the smartphone generation.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-brand-luxewear",
    name: "LuxeWear — Full Brand Identity",
    description:
      "Complete visual identity system covering logo, brand guidelines, packaging, and digital assets for a luxury fashion label.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: "Featured",
    popular: true,
    featured: true,
    clientName: "LuxeWear Co.",
    completionDate: "2024-10-01",
    projectUrl: null,
    githubUrl: null,
    demoUrl: null,
    category: "Graphic Design",
    categorySlug: "graphic-design",
    techStack: [],
    features: [
      "Logo suite",
      "Brand guidelines",
      "Packaging",
      "Social media kit",
    ],
    tools: ["Figma", "Illustrator", "Photoshop"],
    platforms: [],
    projectType: "Brand Identity",
    results: "Brand launched across 3 markets",
    duration: "6 weeks",
    metrics: "3 markets · 200+ brand assets delivered",
    order: 3,
    showcaseText: "A brand as premium as the products it represents.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-datapulse-saas",
    name: "DataPulse — SaaS Analytics Platform",
    description:
      "Real-time analytics SaaS with customizable dashboards, team collaboration, and white-label capabilities.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: "New",
    popular: false,
    featured: true,
    clientName: "DataPulse Inc.",
    completionDate: "2024-10-15",
    projectUrl: "https://datapulse.io",
    githubUrl: null,
    demoUrl: null,
    category: "Web Development",
    categorySlug: "web-development",
    techStack: ["Next.js", "Recharts", "Prisma", "PostgreSQL"],
    features: ["Real-time charts", "Team roles", "CSV export", "Dark mode"],
    tools: [],
    platforms: [],
    projectType: "SaaS Platform",
    results: "Used by 200+ companies",
    duration: "3 months",
    metrics: "200+ companies · 99.9% uptime · $0 to MRR",
    order: 4,
    showcaseText: "Turn data chaos into actionable insight.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-ai-support-bot",
    name: "MedCore — AI Customer Support Bot",
    description:
      "Intelligent multi-channel support bot deployed across WhatsApp, web chat, and email for a healthcare brand.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: "Bestseller",
    popular: true,
    featured: true,
    clientName: "MedCore Health",
    completionDate: "2024-11-05",
    projectUrl: null,
    githubUrl: null,
    demoUrl: null,
    category: "AI Automation",
    categorySlug: "ai-automation",
    techStack: ["Python", "LangChain", "GPT-4", "Twilio"],
    features: [
      "Multi-channel support",
      "Sentiment detection",
      "Escalation routing",
    ],
    tools: [],
    platforms: [],
    projectType: "AI Automation",
    results: "85% ticket reduction",
    duration: "2 months",
    metrics: "85% fewer tickets · 10K+ conversations/month · 95% accuracy",
    order: 5,
    showcaseText: "AI that doesn't just respond — it understands.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-research-agent",
    name: "ContentScale — AI Research Agent",
    description:
      "Autonomous agent that researches, synthesizes, and delivers structured reports for a content marketing agency.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: null,
    popular: false,
    featured: true,
    clientName: "ContentScale Agency",
    completionDate: "2024-11-08",
    projectUrl: null,
    githubUrl: null,
    demoUrl: "https://demo.com",
    category: "AI Agent Building",
    categorySlug: "ai-agent-building",
    techStack: ["Python", "LangGraph", "GPT-4", "Claude"],
    features: ["Web research", "Report generation", "Slack delivery"],
    tools: [],
    platforms: [],
    projectType: "AI Agent",
    results: "10x faster research cycle",
    duration: "6 weeks",
    metrics: "10x faster research · 500+ reports generated",
    order: 6,
    showcaseText: "Your smartest team member never sleeps.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-ecommerce-vibe",
    name: "LuxeWear Store — AI-Built in One Day",
    description:
      "Complete e-commerce storefront with cart, checkout, and admin panel built via AI-pair programming in under 24 hours.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: "New",
    popular: true,
    featured: false,
    clientName: "LuxeWear Co.",
    completionDate: "2024-10-25",
    projectUrl: "https://luxewear.com",
    githubUrl: null,
    demoUrl: null,
    category: "Vibe Coding",
    categorySlug: "vibe-coding",
    techStack: ["Next.js", "Stripe", "Supabase", "Tailwind CSS"],
    features: ["Product catalog", "Cart & checkout", "Admin panel"],
    tools: ["Bolt.new", "Cursor", "Claude", "v0"],
    platforms: [],
    projectType: "E-Commerce",
    results: "Launched in 24 hours",
    duration: "1 day",
    metrics: "24hr build · 0 bugs in production · Full checkout flow",
    order: 7,
    showcaseText: "Speed without sacrificing quality.",
    status: "PUBLISHED",
  },
  {
    slug: "portfolio-hospital-system",
    name: "MedCore — Hospital Management System",
    description:
      "Comprehensive web platform for patient records, appointments, billing, and staff scheduling across multiple clinic branches.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    images: [],
    videoUrl: null,
    badge: null,
    popular: false,
    featured: false,
    clientName: "MedCore Health",
    completionDate: "2024-09-20",
    projectUrl: null,
    githubUrl: null,
    demoUrl: null,
    category: "Web Development",
    categorySlug: "web-development",
    techStack: ["Next.js", "TypeScript", "Supabase", "Zod"],
    features: [
      "Patient records",
      "Appointment booking",
      "Billing system",
      "Staff dashboard",
    ],
    tools: [],
    platforms: [],
    projectType: "Enterprise Web App",
    results: "Serving 3 clinic branches",
    duration: "4 months",
    metrics: "3 branches · 500+ patients managed · 100% paperless",
    order: 8,
    showcaseText: "Healthcare infrastructure, modernized.",
    status: "PUBLISHED",
  },
];

const CATEGORIES: CategoryMeta[] = [
  { key: "web-development", label: "Web Development", color: "#6366F1" },
  { key: "graphic-design", label: "Graphic Design", color: "#EC4899" },
  { key: "ai-automation", label: "AI Automation", color: "#10B981" },
  { key: "mobile-app-development", label: "Mobile App Dev", color: "#F59E0B" },
  { key: "vibe-coding", label: "Vibe Coding", color: "#8B5CF6" },
  { key: "ai-agent-building", label: "AI Agent Building", color: "#06B6D4" },
  { key: "portfolio", label: "Portfolio", color: "#F97316" },
];

const delay = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

// ============================================
// COMPONENT
// ============================================

export default function Seeder() {
  const [results, setResults] = useState<ResultsMap>({});
  const [loading, setLoading] = useState<LoadingMap>({});
  const [baseUrl, setBaseUrl] = useState<string>("http://localhost:3000");

  const seedCategory = async (key: string): Promise<void> => {
    setLoading((p) => ({ ...p, [key]: true }));
    setResults((p) => ({
      ...p,
      [key]: { done: 0, failed: 0, errors: [], total: 0 },
    }));

    let projects: Record<string, unknown>[];
    let endpoint: string;

    if (key === "portfolio") {
      projects = PORTFOLIO_DATA;
      endpoint = "/api/portfolio";
    } else {
      const cat = SEED_DATA[key];
      projects = cat.projects;
      endpoint = cat.endpoint;
    }

    let done = 0;
    let failed = 0;
    const errors: string[] = [];
    const total = projects.length;

    setResults((p) => ({ ...p, [key]: { done, failed, errors, total } }));

    for (const project of projects) {
      try {
        const res = await fetch(`${baseUrl}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        });
        if (res.ok) {
          done++;
        } else {
          const err = await res.json().catch(() => ({ error: res.statusText }));
          failed++;
          errors.push(
            `${project.slug}: ${
              (err as { error?: string }).error ?? res.statusText
            }`
          );
        }
      } catch (e) {
        failed++;
        errors.push(`${project.slug}: ${(e as Error).message}`);
      }
      setResults((p) => ({
        ...p,
        [key]: { done, failed, errors: [...errors], total },
      }));
      await delay(120);
    }

    setLoading((p) => ({ ...p, [key]: false }));
  };

  const seedAll = async (): Promise<void> => {
    const keys = [...Object.keys(SEED_DATA), "portfolio"];
    for (const key of keys) {
      await seedCategory(key);
    }
  };

  const anyLoading = Object.values(loading).some(Boolean);
  const totalSeeded = Object.values(results).reduce(
    (a, r) => a + (r.done ?? 0),
    0
  );
  const totalFailed = Object.values(results).reduce(
    (a, r) => a + (r.failed ?? 0),
    0
  );

  return (
    <div
      style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        color: "#e2e8f0",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              margin: 0,
              background: "linear-gradient(135deg,#6366f1,#06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Seeder
          </h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>
            Seed your Next.js API with realistic dummy data
          </p>
        </div>

        <div
          style={{
            marginBottom: 20,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <label
            style={{ fontSize: 13, color: "#94a3b8", whiteSpace: "nowrap" }}
          >
            Base URL
          </label>
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            style={{
              flex: 1,
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "8px 12px",
              color: "#e2e8f0",
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={seedAll}
          disabled={anyLoading}
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 10,
            border: "none",
            background: anyLoading
              ? "#1e293b"
              : "linear-gradient(135deg,#6366f1,#06b6d4)",
            color: anyLoading ? "#475569" : "#fff",
            fontWeight: 700,
            fontSize: 15,
            cursor: anyLoading ? "not-allowed" : "pointer",
            marginBottom: 24,
          }}
        >
          {anyLoading ? "Seeding..." : "🚀 Seed All Categories"}
        </button>

        {(totalSeeded > 0 || totalFailed > 0) && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div
              style={{
                flex: 1,
                background: "#0f2d1f",
                border: "1px solid #10b981",
                borderRadius: 10,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700, color: "#10b981" }}>
                {totalSeeded}
              </div>
              <div style={{ fontSize: 12, color: "#6ee7b7" }}>Seeded</div>
            </div>
            <div
              style={{
                flex: 1,
                background: "#2d0f0f",
                border: "1px solid #ef4444",
                borderRadius: 10,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700, color: "#ef4444" }}>
                {totalFailed}
              </div>
              <div style={{ fontSize: 12, color: "#fca5a5" }}>Failed</div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CATEGORIES.map(({ key, label, color }: CategoryMeta) => {
            const r: SeedResult | undefined = results[key];
            const isLoading: boolean = loading[key] ?? false;
            const pct: number =
              r && r.total
                ? Math.round(((r.done + r.failed) / r.total) * 100)
                : 0;
            const count: number =
              key === "portfolio"
                ? PORTFOLIO_DATA.length
                : SEED_DATA[key]?.projects.length ?? 0;

            return (
              <div
                key={key}
                style={{
                  background: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 12, color: "#475569" }}>
                      {count} projects
                    </span>
                  </div>
                  <button
                    onClick={() => seedCategory(key)}
                    disabled={isLoading || anyLoading}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 7,
                      border: `1px solid ${color}`,
                      background: "transparent",
                      color: isLoading ? "#475569" : color,
                      fontWeight: 600,
                      fontSize: 13,
                      cursor:
                        isLoading || anyLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading ? "Seeding..." : "Seed"}
                  </button>
                </div>

                {r && (
                  <div style={{ marginTop: 12 }}>
                    <div
                      style={{
                        background: "#1f2937",
                        borderRadius: 4,
                        height: 6,
                        overflow: "hidden",
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: r.failed > 0 ? "#ef4444" : color,
                          borderRadius: 4,
                          transition: "width .3s",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                      <span style={{ color: "#10b981" }}>✓ {r.done} done</span>
                      {r.failed > 0 && (
                        <span style={{ color: "#ef4444" }}>
                          ✗ {r.failed} failed
                        </span>
                      )}
                      <span style={{ color: "#475569" }}>{pct}%</span>
                    </div>
                    {r.errors.length > 0 && (
                      <div
                        style={{
                          marginTop: 8,
                          background: "#1a0a0a",
                          border: "1px solid #7f1d1d",
                          borderRadius: 6,
                          padding: "8px 10px",
                          maxHeight: 80,
                          overflowY: "auto",
                        }}
                      >
                        {r.errors.map((e: string, i: number) => (
                          <div
                            key={i}
                            style={{
                              fontSize: 11,
                              color: "#fca5a5",
                              marginBottom: 2,
                            }}
                          >
                            {e}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#1f2937",
            fontSize: 11,
            marginTop: 24,
          }}
        >
          Make sure your Next.js dev server is running at the base URL above.
        </p>
      </div>
    </div>
  );
}
