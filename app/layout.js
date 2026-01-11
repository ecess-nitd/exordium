import { Geist, Geist_Mono, Orbitron, Electrolize } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


const electrolize = Electrolize({
  variable: "--font-electrolize",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "EXORDIUM - Kickstart Your ECE Journey | NIT Durgapur",
  description:
    "EXORDIUM is an exclusive event for first-year students at NIT Durgapur, unlocking the future of Electronics and Communication Engineering (ECE) with AI, IoT, and robotics.",
  keywords:
    "EXORDIUM, NIT Durgapur, ECE, Electronics and Communication Engineering, AI, IoT, Robotics, Digital Systems, Telecommunications, Tech Event, Future Innovations",
  openGraph: {
    title: "EXORDIUM - Kickstart Your ECE Journey",
    description:
      "Step into the world of Electronics and Communication Engineering with EXORDIUM at NIT Durgapur. Explore AI, IoT, robotics, and more.",
    url: "https://exordium-ruby.vercel.app",
    siteName: "ECESS NIT Durgapur",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "EXORDIUM - Kickstart Your ECE Journey",
    description:
      "Discover the limitless possibilities in Electronics and Communication Engineering at EXORDIUM, NIT Durgapur.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${orbitron.variable}
          ${electrolize.variable}
          antialiased
          bg-slate-950
        `}
      >
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
