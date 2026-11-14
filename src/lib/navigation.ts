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
  discipline: "PRODUCT THINKING × FRONTEND ENGINEERING",
  headline: "I turn ideas into digital experiences.",
  supportingCopy:
    "Bringing product thinking, technology and creativity together to build meaningful digital experiences.",
  statusLabel: "EDITION 2026 // PRODUCT & FRONTEND",
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  {
    index: "01",
    label: "Home",
    href: "#home",
    sectionIndex: 0,
    description: "Hero stage & interactive sculpture",
  },
  {
    index: "02",
    label: "About",
    href: "#about",
    sectionIndex: 1,
    description: "Perspective, craft & approach",
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
    description: "Selected products & verified case studies",
  },
  {
    index: "06",
    label: "Contact",
    href: "#contact",
    sectionIndex: 5,
    description: "Initiate dialogue & connect",
  },
] as const;
