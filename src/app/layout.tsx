import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SectionTransitionProvider } from "@/components/portfolio/SectionTransitionContext";
import { Navbar } from "@/components/layout/Navbar";
import { InitialPreloader } from "@/components/ui/InitialPreloader";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-three-inky-29.vercel.app"),
  title: {
    default: "Anita Ugoebillah — Product Manager & Frontend Developer",
    template: "%s | Anita Ugoebillah",
  },
  description:
    "Computer Science graduate from UNN. Product Manager and Frontend Developer building web applications with React, Next.js, and Supabase.",
  openGraph: {
    title: "Anita Ugoebillah — Product Manager & Frontend Developer",
    description:
      "Computer Science graduate from UNN. Product Manager and Frontend Developer building web applications with React, Next.js, and Supabase.",
    url: "https://portfolio-three-inky-29.vercel.app",
    siteName: "Anita Ugoebillah Portfolio",
    images: [
      {
        url: "/images/potrait.jpeg",
        width: 718,
        height: 1080,
        alt: "Anita Ugoebillah — Product Manager & Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anita Ugoebillah — Product Manager & Frontend Developer",
    description:
      "Computer Science graduate from UNN. Product Manager and Frontend Developer building web applications with React, Next.js, and Supabase.",
    images: ["/images/potrait.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070809",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-md focus:bg-lime focus:px-4 focus:py-2 focus:text-canvas focus:font-mono focus:text-xs focus:font-bold shadow-lg"
        >
          Skip to content
        </a>
        <InitialPreloader />
        <SmoothScrollProvider>
          <SectionTransitionProvider>
            <Navbar />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
          </SectionTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
