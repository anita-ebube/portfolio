export interface ExperienceItem {
  id: string;
  role: string;
  organisation: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  responsibilities: string[];
  contributions: string[];
  skills: string[];
  highlight: string;
}

export interface EducationData {
  field: string;
  institution: string;
  degree: string;
  period: string;
  summary: string;
}

export interface LeadershipPosition {
  id: string;
  role: string;
  organization: string;
  subtitle: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  track: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  fullName?: string;
  category: string;
  summary: string;
  shortDescription: string;
  accentColor: string;
  technologies: string[];
  features?: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export const SITE_IDENTITY = {
  name: "Anita",
  fullName: "Anita Ugoebillah",
  monogram: "ANITA",
  discipline: "PRODUCT MANAGEMENT × FRONTEND CRAFT",
  heroHeadline: "I turn ideas into digital experiences.",
  heroSupporting:
    "Bringing product thinking, technology and creativity together to build meaningful digital experiences.",
  aboutHeadline:
    "More than a job title. A mind that connects ideas, people and technology.",
  aboutIntro: [
    "Hi, I'm Anita.",
    "I'm a Computer Science graduate, Product Management enthusiast and Frontend Developer who enjoys being at the intersection of technology, creativity and problem-solving.",
    "I love understanding how things work, identifying opportunities to make them better and turning ideas into meaningful digital experiences.",
    "My journey in technology has taught me that building great products goes beyond writing code. It requires understanding people, asking the right questions, making thoughtful decisions and bringing the right people together to make things happen.",
  ],
  philosophy:
    "I don't just want to build things that work. I want to build things that matter.",
  contactHeadline: "Have an idea? Let's make it happen.",
  contactSupporting:
    "I'm always interested in meaningful conversations, interesting ideas and opportunities to build something impactful.",
  email: "Oluebubechukwuanita@gmail.com",
  socials: {
    github: "https://github.com/anita-ebube",
    linkedin: "https://www.linkedin.com/in/oluebubechukwu-ugoebillah-9220133a6?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    twitter: "https://x.com/nita_script?s=11",
  },
  statusLabel: "EDITION 2026 // PM × FE",
} as const;

export const EDUCATION_DATA: EducationData = {
  field: "Computer Science",
  institution: "University of Nigeria, Nsukka (UNN)",
  degree: "B.Sc. Computer Science",
  period: "2020 — 2024",
  summary: "Graduated with a Bachelor of Science degree in Computer Science.",
};

export const LEADERSHIP_DATA: LeadershipPosition[] = [
  {
    id: "nacos-vp",
    role: "Vice President",
    organization: "NACOS UNN",
    subtitle: "University of Nigeria, Nsukka Chapter",
  },
  {
    id: "nacos-zonal",
    role: "Assistant Zonal Coordinator",
    organization: "NACOS",
    subtitle: "Regional Directorate",
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "hng-pm",
    title: "HNG Finalist",
    track: "Product Management I16",
    badge: "Finalist Standing",
  },
  {
    id: "web3-bridge",
    title: "Web3 Bridge",
    track: "Frontend Track Finalist",
    badge: "Finalist Standing",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "nacos-coordinator",
    role: "Southeast Regional Coordinator",
    organisation: "Nigeria Association of Computing Students (NACOS)",
    location: "Southeast Region, Nigeria",
    period: "Leadership Term",
    type: "Elected Leadership & Community",
    summary:
      "Spearheaded regional student developer initiatives, uniting collegiate computing associations across Southeast Nigeria. Led cross-institution committees, organized regional conferences, and facilitated developer empowerment programs.",
    responsibilities: [
      "Coordinated executive bodies and student leadership across tertiary institutions in 5 southeastern states.",
      "Liaised between university academic departments, tech industry partners, and student developers.",
      "Directed planning and execution for regional technical symposiums, hackathons, and career workshops.",
    ],
    contributions: [
      "Expanded regional chapter participation and student engagement in modern computing practices.",
      "Established structured communication channels connecting student builders with industry mentors.",
      "Championed initiatives for female student developer inclusion and product management awareness.",
    ],
    skills: ["Stakeholder Alignment", "Team Leadership", "Public Speaking", "Community Operations", "Strategic Planning"],
    highlight: "Mobilized thousands of student technologists behind a shared standard of collaborative digital excellence.",
  },
  {
    id: "hng-finalist",
    role: "Product Management & Frontend Contender (Finalist)",
    organisation: "HNG Internship",
    location: "Remote",
    period: "Intensive Cohort",
    type: "Product & Engineering Crucible",
    summary:
      "Selected as an HNG Finalist after navigating demanding weekly sprint deadlines, rigorous product teardowns, UX friction diagnostics, and fast-paced frontend feature delivery.",
    responsibilities: [
      "Authored product critiques and teardowns on platforms (e.g., Zedu learning communication and onboarding workflows).",
      "Diagnosed critical onboarding friction, missing email verification loops, and lack of real-time password feedback.",
      "Collaborated in multidisciplinary pods composed of UI/UX designers, backend engineers, and product peers.",
    ],
    contributions: [
      "Delivered structured user journey maps and actionable product improvement specifications under 48-hour turnarounds.",
      "Iterated rapidly on frontend interfaces adhering to strict accessibility and responsive criteria.",
      "Maintained top-tier performance rankings across successive elimination stages to achieve finalist standing.",
    ],
    skills: ["Product Teardowns", "UX Audit", "Rapid Prototyping", "Cross-Functional Collaboration", "Sprint Delivery"],
    highlight: "Validated decisive problem-solving and delivery under high-pressure real-world constraints.",
  },
  {
    id: "unn-academics",
    role: "Computer Science Scholar & Graduate",
    organisation: "University of Nigeria, Nsukka (UNN)",
    location: "Enugu State, Nigeria",
    period: "Academic Career",
    type: "B.Sc Degree & Research",
    summary:
      "Completed foundational computer science education at one of Nigeria's foremost federal universities, mastering computational theory, data structures, algorithms, and software engineering methodologies.",
    responsibilities: [
      "Studied core computing disciplines: algorithmic analysis, database management systems, and web architectures.",
      "Conducted software engineering project research focusing on distributed, user-facing digital systems.",
      "Collaborated in collegiate engineering teams to build software prototypes and interface applications.",
    ],
    contributions: [
      "Synthesized technical academic rigor with practical human-centered product management thinking.",
      "Mentored junior computing students in foundational programming, algorithms, and web development.",
      "Graduated with deep technical appreciation for system architecture, scalability, and frontend engineering.",
    ],
    skills: ["Algorithms & Data Structures", "Software Architecture", "Systems Analysis", "Database Design", "Technical Writing"],
    highlight: "Where deep computational intuition was married to an enduring empathy for human software users.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "silentkrowd",
    number: "01",
    title: "SilentKrowd",
    category: "Lounge Website",
    summary:
      "A lounge website that allows customers to order online, track their orders, make reservations and view the menu.",
    shortDescription:
      "A lounge website that allows customers to order online, track their orders, make reservations and view the menu.",
    accentColor: "#c8ff00",
    technologies: ["React", "Tailwind CSS", "Supabase"],
    features: [
      "Online ordering",
      "Order tracking",
      "Reservation functionality",
      "Menu upload functionality",
      "Admin dashboard",
    ],
    links: {
      demo: "https://silentkrowd.com/",
    },
  },
  {
    id: "nihsa",
    number: "02",
    title: "NIHSA",
    fullName: "Nigeria Hydrological Services Agency",
    category: "Informational Website",
    summary:
      "An informative website for the Nigeria Hydrological Services Agency.",
    shortDescription:
      "An informative website for the Nigeria Hydrological Services Agency.",
    accentColor: "#6ee7b7",
    technologies: ["React", "Tailwind CSS"],
    features: [
      "National hydrological data",
      "Flood outlook advisories",
      "Agency mandate & publications",
    ],
    links: {
      demo: "https://nihsa-ten.vercel.app/",
    },
  },
  {
    id: "nacos-dues",
    number: "03",
    title: "NACOS Dues",
    category: "Student Payment Platform",
    summary:
      "A platform that allows students to pay their dues online and access their receipts.",
    shortDescription:
      "A platform that allows students to pay their dues online and access their receipts.",
    accentColor: "#c8ff00",
    technologies: ["React", "Tailwind CSS", "Firebase"],
    features: [
      "Online dues payment",
      "Temporary receipt generation",
      "Admin verification of payments",
      "Permanent receipt access after admin verification",
      "Permanent receipts used for clearance",
    ],
    links: {
      demo: "https://university-dues-portal.vercel.app/",
    },
  },
  {
    id: "system-vet",
    number: "04",
    title: "System Vet",
    category: "Professional Portfolio Website",
    summary:
      "A portfolio website for a veterinary professional with a blog upload feature.",
    shortDescription:
      "A portfolio website for a veterinary professional with a blog upload feature.",
    accentColor: "#93c5fd",
    technologies: ["React", "Tailwind CSS", "Firebase"],
    features: [
      "Veterinary professional portfolio",
      "Clinical blog upload feature",
    ],
    links: {
      demo: "https://thesystemvet.com/",
    },
  },
];

export interface SkillCategory {
  id: "frontend" | "product";
  title: string;
  categoryNumber: string;
  tagline: string;
  badge: string;
  accent: string;
  subgroups: {
    title: string;
    description: string;
    skills: string[];
  }[];
}

export const WHAT_I_WORK_WITH: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    categoryNumber: "01",
    tagline: "High-performance interfaces, component architectures & robust client-side state.",
    badge: "ENGINEERING STACK",
    accent: "#c8ff00",
    subgroups: [
      {
        title: "Languages & Frontend Technologies",
        description: "Modern declarative interfaces and modular styling systems",
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Bootstrap",
          "Tailwind CSS",
          "React",
          "Vue.js",
          "Next.js",
        ],
      },
      {
        title: "Backend, Databases & Dev Tools",
        description: "Cloud datastores, API backends & continuous version workflow",
        skills: [
          "Supabase",
          "Firebase",
          "Laravel",
          "MySQL",
          "Git",
          "GitHub",
        ],
      },
    ],
  },
  {
    id: "product",
    title: "Product Management",
    categoryNumber: "02",
    tagline: "User discovery, cross-functional execution & strategic product roadmaps.",
    badge: "STRATEGIC CRAFT",
    accent: "#6ee7b7",
    subgroups: [
      {
        title: "Product Management Capabilities",
        description: "Hypothesis validation, requirements framing & agile execution",
        skills: [
          "Product Strategy",
          "Product Discovery",
          "Requirements Gathering",
          "User Stories",
          "Product Roadmapping",
          "Prioritisation",
          "Agile and Scrum",
          "Backlog Management",
          "Sprint Planning",
          "Stakeholder Management",
          "Product Documentation",
        ],
      },
      {
        title: "Product Management Tools",
        description: "Workflow orchestration, roadmapping & interface design collaboration",
        skills: [
          "ClickUp",
          "Figma",
        ],
      },
    ],
  },
];

