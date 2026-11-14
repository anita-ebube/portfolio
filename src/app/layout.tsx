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
  title: {
    default: "Anita — Product Manager & Frontend Developer",
    template: "%s | Anita",
  },
  description:
    "Bringing product thinking, technology and creativity together to build meaningful digital experiences.",
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
        <InitialPreloader />
        <SmoothScrollProvider>
          <SectionTransitionProvider>
            <Navbar />
            <div className="flex-1 flex flex-col">{children}</div>
          </SectionTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
