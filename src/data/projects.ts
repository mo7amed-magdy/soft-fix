/**
 * Portfolio data. To add a project:
 *  1. drop raw screenshots in /Assets and add an entry (with blur boxes) to
 *     scripts/prepare-assets.py, then run `npm run assets`;
 *  2. add a Project below — it appears in the marquee, the stacked project
 *     cards and (if `caseStudy` is set) gets its own case-study section.
 */

export interface Shot {
  /** file stem in /public/projects/<slug>/ — exported as <name>-800.webp and <name>-1600.webp */
  name: string;
  alt: string;
  /** size of the 1600w export */
  width: number;
  height: number;
  /** host shown in the browser-frame address bar (defaults to the last project link) */
  url?: string;
}

export interface Chapter {
  title: string;
  text: string;
  shots: string[];
}

export interface CaseStudy {
  meta: { label: string; value: string }[];
  problem: string;
  solution: string;
  outcome: string;
  facts: { value: string; label: string }[];
  chapters: Chapter[];
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  tags: string[];
  links: { label: string; href: string }[];
  shots: Shot[];
  /** stacked-card layout: two images on the left, one tall image on the right */
  card: { left: [string, string]; right: string };
  caseStudy?: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    slug: 'virtual-tracker',
    name: 'My Virtual Tracker',
    category: 'SaaS · Workforce productivity',
    summary:
      'A time-tracking and workforce-productivity suite for remote teams: task-linked timers, desktop activity capture, projects, people and payroll-ready reports in one platform.',
    tags: ['Next.js', 'React', 'Firebase', 'Desktop agent'],
    links: [
      { label: 'Live site', href: 'https://myvirtualtracker.com/' },
      { label: 'Open app', href: 'https://app.myvirtualtracker.com' },
    ],
    card: { left: ['landing', 'activity-screenshots'], right: 'dashboard' },
    shots: [
      { name: 'dashboard', width: 1600, height: 742, alt: 'Virtual Tracker command center with time worked, active members, budget and project health' },
      { name: 'landing', width: 1600, height: 699, url: 'myvirtualtracker.com', alt: 'Virtual Tracker marketing site hero: work tracking for the remote team' },
      { name: 'timesheets', width: 1600, height: 785, alt: 'Timesheets with total time, average activity and spend charted per day' },
      { name: 'activity-screenshots', width: 1600, height: 775, alt: 'Activity capture grid with work-time classification, focus time and screenshot activity scores (people blurred)' },
      { name: 'apps', width: 1600, height: 778, alt: 'Application usage table with time, share, sessions and productivity category' },
      { name: 'urls', width: 1600, height: 782, alt: 'Website tracking with productive, neutral and blocked site counts (client URLs blurred)' },
      { name: 'projects', width: 1600, height: 774, alt: 'Project management overview with health, progress, budget and members per project' },
      { name: 'members', width: 1600, height: 760, alt: 'Members table with status, role, limits and date added (names and emails blurred)' },
      { name: 'daily-report', width: 1600, height: 785, alt: 'Daily totals report with hours, amount and a total-amount-per-day chart' },
      { name: 'reports', width: 1600, height: 747, alt: 'Reports hub: time and activity, amounts owed, daily totals and general reports' },
    ],
    caseStudy: {
      meta: [
        { label: 'Industry', value: 'Remote work · Workforce management' },
        { label: 'Platforms', value: 'Web dashboard + Windows, macOS & Linux agent' },
        { label: 'Stack', value: 'Next.js · React · Firebase' },
        { label: 'Scope', value: 'Product design · Full-stack development' },
      ],
      problem:
        'Remote teams juggle separate tools for time tracking, screenshots, projects and payroll — so managers never get one trustworthy view of who worked on what, and for how long.',
      solution:
        'One platform: a timer tied to real tasks, a desktop agent that captures screenshots, apps and URLs while the timer runs, project and budget tracking, an org hierarchy with role-based visibility, and reports that turn hours into amounts owed.',
      outcome:
        'Managers work from a single dashboard where activity, delivery and spend all trace back to real tasks — with permissions enforced by the backend on every request.',
      facts: [
        { value: '3', label: 'activity feeds — screenshots, apps & URLs' },
        { value: '3', label: 'desktop agents — Windows, macOS & Linux' },
        { value: '6+', label: 'dashboard workspaces' },
        { value: '1', label: 'Firebase-backed source of truth' },
      ],
      chapters: [
        {
          title: 'Command center',
          text: 'Live KPIs for time worked, active members, budget and team activity, with every project’s health at a glance.',
          shots: ['dashboard'],
        },
        {
          title: 'Time & timesheets',
          text: 'Timers tied to real tasks. Timesheets group hours, activity, idle time and spend by day, member or project.',
          shots: ['timesheets', 'daily-report'],
        },
        {
          title: 'Activity capture',
          text: 'The desktop agent records screenshots, apps and URLs while the timer runs — auto-classified as productive, neutral or unproductive.',
          shots: ['activity-screenshots', 'apps', 'urls'],
        },
        {
          title: 'Projects & people',
          text: 'Clients, projects and budgets on one board; members, roles, invites and an org tree that controls who sees what.',
          shots: ['projects', 'members'],
        },
        {
          title: 'Reports',
          text: 'Time & activity, amounts owed, daily totals, work sessions and audit logs — ready to export or schedule.',
          shots: ['reports'],
        },
      ],
    },
  },
];

export function shotSrc(slug: string, name: string) {
  const base = `/projects/${slug}/${name}`;
  return {
    src: `${base}-1600.webp`,
    srcSet: `${base}-800.webp 800w, ${base}-1600.webp 1600w`,
  };
}

export function getShot(project: Project, name: string): Shot {
  const shot = project.shots.find((s) => s.name === name);
  if (!shot) throw new Error(`Unknown shot "${name}" in project "${project.slug}"`);
  return shot;
}
