import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gourav Thakur - Full Stack Developer",
  description: "Full Stack Developer with 1.5+ years of experience building MERN and LAMP stack applications. Engineered a Laravel Filament CMS and integrated Razorpay, reducing page load times by 60% and cutting database response times by 25%. Delivered real-time features with Socket.io and dynamic UIs using Framer Motion and GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
