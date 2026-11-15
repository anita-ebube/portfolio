export interface NavItem {
  index: string;
  label: string;
  href: string;
  sectionIndex: number;
  description: string;
}

export const SITE_IDENTITY = {
  name: "Anita",
  monogram: "ANITA",
  discipline: "PRODUCT MANAGEMENT × FRONTEND CRAFT",
  headline: "I plan products and build them in React.",
  supportingCopy:
    "Computer Science graduate from UNN. I work across product discovery, user specifications, and frontend implementation with React, Next.js, and Supabase.",
  statusLabel: "UNN CS GRADUATE // PRODUCT & FRONTEND",
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  {
    index: "01",
    label: "Home",
    href: "#home",
    sectionIndex: 0,
    description: "Overview & interactive 3D stage",
  },
  {
    index: "02",
    label: "About",
    href: "#about",
    sectionIndex: 1,
    description: "Background, approach & CV",
  },
  {
    index: "03",
    label: "Experience",
    href: "#experience",
    sectionIndex: 2,
    description: "Education, leadership & achievements",
  },
  {
    index: "04",
    label: "Work With",
    href: "#work-with",
    sectionIndex: 3,
    description: "Frontend development & product management capabilities",
  },
  {
    index: "05",
    label: "Projects",
    href: "#projects",
    sectionIndex: 4,
    description: "Selected web applications & shipped platforms",
  },
  {
    index: "06",
    label: "Contact",
    href: "#contact",
    sectionIndex: 5,
    description: "Email & professional inquiries",
  },
] as const;
