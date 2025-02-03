import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", '500', '600', "700", '800'],
  style: "normal",
  display: "swap"
});

export const metadata = {
  title: "FINCO",
  description: "financial management app , income and expenses",
  icons: {
    icon: "/images/logo-no-text.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
