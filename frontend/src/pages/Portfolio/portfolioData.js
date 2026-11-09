export const heroImage = "/assets/images/portfolio/hero.webp";

export const categories = [
  { id: "erp", label: "Cloud ERP" },
  { id: "crm", label: "CRM" },
  { id: "ai", label: "AI & Automation" },
  { id: "mrp", label: "MRP" },
  { id: "pos", label: "POS" },
  { id: "mobile", label: "Mobile Apps" },
];

export const projects = [
  {
    id: "crm-panels",
    category: "crm",
    categoryLabel: "CRM",
    title: "CRM System Panels",
    short:
      "Smart customer management system for tracking leads, relationships, sales activities, and business interactions.",
    image: "/assets/images/portfolio/crm.webp",
    industry: "Sales & Services",
    timeline: "6–8 weeks",
    stack: ["React", "Node.js", "PostgreSQL", "REST API"],
    approach:
      "We designed the CRM around the way sales teams manage customers in their daily work. The focus was to keep lead information, communication history, and follow-up activities organised in one place, making it easier for teams to understand each customer's journey.",
    solution: [
      "Lead pipeline with clear sales stages and owner assignment",
      "Customer profiles with contact details, notes, and activity history",
      "Follow-up reminders to help teams manage pending leads",
      "Role-based dashboards for sales agents and managers",
      "Reports for tracking lead progress and team performance",
    ],
    outcomes: [
      "A central place for customer and lead information",
      "Better visibility into sales activities and pending follow-ups",
      "More organised customer communication",
      "Flexible workflows that can grow with the business",
    ],
  },
  {
    id: "erp-panels",
    category: "erp",
    categoryLabel: "Cloud ERP",
    title: "ERP System Panels",
    short:
      "Connected enterprise software for managing inventory, purchasing, accounts, sales, and daily business operations.",
    image: "/assets/images/portfolio/erp.webp",
    industry: "Manufacturing & Trading",
    timeline: "10–14 weeks",
    stack: ["React", "Node.js", "MySQL", "Cloud Hosting"],
    approach:
      "The goal was to bring separate business processes into a connected system. We structured the platform so departments could work with shared information instead of maintaining disconnected spreadsheets and records.",
    solution: [
      "Inventory, purchasing, and sales modules connected through shared data",
      "Accounts, expense tracking, and financial reporting",
      "Purchase and expense approval workflows",
      "Multi-user access with configurable permissions",
      "Centralised reports for monitoring business operations",
    ],
    outcomes: [
      "A more consistent view of business information",
      "Less repetitive data entry across departments",
      "Improved visibility into stock, sales, and expenses",
      "A central platform that can support business expansion",
    ],
  },
  {
    id: "ai-automation",
    category: "ai",
    categoryLabel: "AI & Automation",
    title: "AI Automation",
    short:
      "Intelligent workflows that automate repetitive tasks, streamline customer communication, and support faster business decisions.",
    image: "/assets/images/portfolio/ai.webp",
    industry: "Operations & Support",
    timeline: "3–5 weeks",
    stack: ["n8n", "OpenAI", "WhatsApp API", "Webhooks"],
    approach:
      "We identified repetitive tasks that take time away from important work, such as sorting enquiries, sending routine updates, and transferring information between tools. The solution connects these steps into practical workflows while keeping human involvement available when needed.",
    solution: [
      "Lead capture from website forms and supported messaging channels",
      "AI-assisted responses for common customer enquiries",
      "Automated notifications and scheduled reports",
      "Connected workflows between business tools and databases",
      "Human handover for complex or sensitive customer requests",
    ],
    outcomes: [
      "Less time spent on repetitive administrative tasks",
      "More consistent handling of routine enquiries",
      "Fewer manual steps when moving information between systems",
      "Workflows that can be adjusted as business needs change",
    ],
  },
  {
    id: "sales-point-system",
    category: "pos",
    categoryLabel: "POS",
    title: "Sales Point System",
    short:
      "A smart point-of-sale solution for managing billing, transactions, product sales, and real-time inventory control.",
    image: "/assets/images/portfolio/pos.webp",
    industry: "Retail & Restaurants",
    timeline: "4–6 weeks",
    stack: ["React", "Node.js", "MySQL", "Receipt Printing"],
    approach:
      "We focused on making everyday sales straightforward for cashiers and easy to monitor for business owners. The system brings checkout, product records, stock updates, and sales summaries together in a clear interface designed for busy retail environments.",
    solution: [
      "Fast checkout with searchable products and barcode support",
      "Invoice generation and configurable receipt printing",
      "Automatic stock updates after completed transactions",
      "Product management with pricing and low-stock alerts",
      "Daily sales summaries and cashier performance reports",
    ],
    outcomes: [
      "A smoother and more organised checkout process",
      "Better visibility into stock levels and product movement",
      "Easier review of daily transactions and sales totals",
      "A practical foundation for managing multiple sales counters",
    ],
  },
  {
    id: "mobile-application",
    category: "mobile",
    categoryLabel: "Mobile Apps",
    title: "Mobile Application",
    short:
      "Custom mobile solutions built for smooth navigation, reliable performance, and convenient access to digital services on the go.",
    image: "/assets/images/portfolio/mobile.webp",
    industry: "Business & Consumer Apps",
    timeline: "6–10 weeks",
    stack: ["React Native", "REST API", "Node.js", "Firebase"],
    approach:
      "We planned the application around the tasks users need to complete on their phones. The interface prioritises clear navigation, accessible actions, and consistent behaviour across screen sizes, while the application connects to the relevant backend services.",
    solution: [
      "Custom mobile interfaces aligned with the product's requirements",
      "User registration, login, and profile management",
      "API integration for retrieving and updating application data",
      "Push notifications for relevant updates and reminders",
      "Responsive screens with clear loading, error, and success states",
    ],
    outcomes: [
      "More convenient access to services from mobile devices",
      "A consistent and easy-to-follow user experience",
      "A maintainable structure for future features",
      "A connected experience between the mobile app and backend",
    ],
  },
  {
    id: "mrp-system-panels",
    category: "mrp",
    categoryLabel: "MRP",
    title: "MRP System Panels",
    short:
      "Manufacturing resource planning software for coordinating raw materials, production schedules, inventory, and order requirements.",
    image: "/assets/images/portfolio/mrp.webp",
    industry: "Manufacturing & Production",
    timeline: "8–12 weeks",
    stack: ["React", "Node.js", "MySQL", "REST API"],
    approach:
      "We structured the system around the relationship between customer orders, material availability, and production activities. The objective was to give production and inventory teams a shared view of requirements so they could plan work more clearly and identify shortages earlier.",
    solution: [
      "Raw material records with stock levels and reorder thresholds",
      "Material requirement planning based on production needs",
      "Production orders with status and schedule tracking",
      "Bill of materials for defining components required per product",
      "Reports for material usage, order progress, and inventory status",
    ],
    outcomes: [
      "Clearer visibility into material availability and production needs",
      "Improved coordination between inventory and production teams",
      "Earlier identification of potential material shortages",
      "More organised production planning and order tracking",
    ],
  }
];