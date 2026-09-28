export const SITE = {
  name: 'SoftFix',
  tagline: 'Build. Fix. Scale.',
  descriptor: 'Software solutions studio',
  description:
    'SoftFix is a software solutions studio. We turn business ideas into reliable digital products — web platforms, business systems, e-commerce, mobile apps and automation.',
  // TODO: replace with the real SoftFix inbox before launch.
  email: 'hello@softfix.dev',
  /** Leave href empty to hide a network until the account exists. */
  socials: [
    { label: 'Facebook', href: '' },
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Upwork', href: '' },
    { label: 'Fiverr', href: '' },
    { label: 'GitHub', href: '' },
  ],
  year: 2026,
} as const;

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Brand statements used on poster tiles (from the brand identity deck). */
export const STATEMENTS = [
  { lines: ['Build.', 'Fix.', 'Scale.'], tone: 'blue' },
  { lines: ['Automate', 'the chaos.'], tone: 'cyan' },
  { lines: ['More than', 'a contract.'], tone: 'navy' },
  { lines: ['We build', 'growth', 'engines.'], tone: 'white' },
  { lines: ['Run your', 'business', 'smarter.'], tone: 'ink' },
] as const;
