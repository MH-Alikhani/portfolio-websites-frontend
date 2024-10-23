import type { Metadata } from "next"
import "./globals.css"
import { Footer, Navbar } from "@/components"

export const metadata: Metadata = {
  title: "Car Hub Portfolio | Next.js & Typescript & Tailwind CSS",
  description: "Next.js & Typescript & Tailwind CSS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
