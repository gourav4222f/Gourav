// src/app/admin/layout.jsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

// This is a server component that protects all child routes
export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to the login page
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul className="space-y-4">
            <li><Link href="/admin" className="hover:text-gray-300">Dashboard</Link></li>
            <li><Link href="/admin/projects" className="hover:text-gray-300">Projects</Link></li>
            <li><Link href="/admin/skills" className="hover:text-gray-300">Skills</Link></li>
            <li><Link href="/admin/experience" className="hover:text-gray-300">Experience</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-800 text-white">
        {children}
        <Toaster />
      </main>
    </div>
  );
}