import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { dark } from '@clerk/ui/themes'
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Spott - Delightful Events Start Here",
  description: "Discover and create amazing events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* We added the publishableKey prop directly here to kick Clerk out of Keyless Mode */}
          <ClerkProvider 
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} 
            appearance={{ baseTheme: dark }}
          >
            <ConvexClientProvider>
              <Header />
              <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 min-h-[70vh]"> {children}</div>
                <Footer />
              </main>
              <Toaster position="top-center" richColors />
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}