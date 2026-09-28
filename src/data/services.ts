export interface Service {
  name: string;
  description: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    name: 'Web Platforms',
    description:
      'High-performance websites and web apps that load fast, rank well and turn visitors into customers.',
    tags: ['React', 'Next.js', 'SEO'],
  },
  {
    name: 'Business Systems',
    description:
      'Custom CRM, ERP, HR and time-tracking systems shaped around how your team actually works — not the other way round.',
    tags: ['Dashboards', 'Roles & permissions', 'Reporting'],
  },
  {
    name: 'E-commerce',
    description:
      'Online stores and marketplaces with payments, inventory and admin tools that scale with your catalogue.',
    tags: ['Payments', 'Inventory', 'Analytics'],
  },
  {
    name: 'Mobile Apps',
    description:
      'Cross-platform iOS and Android apps that share one codebase and one reliable backend.',
    tags: ['iOS', 'Android', 'Push notifications'],
  },
  {
    name: 'Automation & AI',
    description:
      'Automate the chaos — APIs, integrations, workflows and AI assistants that take repetitive work off your team.',
    tags: ['APIs', 'Workflows', 'AI assistants'],
  },
  {
    name: 'Fix & Maintain',
    description:
      'The “Fix” in SoftFix. Code audits, bug fixing, performance tuning and ongoing support for software you already run.',
    tags: ['Audits', 'Performance', 'Monthly support'],
  },
];
