import type { Metadata } from "next";
import { InitialLoadingScreen } from "@/components/initial-loading-screen";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness Challenge",
  description: "A fitness challenge web app.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const themeScript = `
(() => {
  try {
    const key = "fitness-challenge-theme";
    const storedTheme = window.localStorage.getItem(key);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : prefersDark
        ? "dark"
        : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {
  }
})();
`;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <InitialLoadingScreen />
      </body>
    </html>
  );
}
