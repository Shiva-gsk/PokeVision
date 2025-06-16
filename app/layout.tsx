
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { SessionProvider } from "next-auth/react"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PokéVision - AI-Powered Pokédex",
  description: "Capture real-world images and let AI identify Pokémon",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class"  enableSystem disableTransitionOnChange>
          <SessionProvider>
          <div className="overflow-hidden flex flex-col min-h-screen">
            
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
