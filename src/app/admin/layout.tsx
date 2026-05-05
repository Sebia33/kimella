import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-900 border-t border-neutral-800">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col">
          <div className="mb-12">
            <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
              Kimella CMS
            </h1>
          </div>
          <nav className="flex-1 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Dashboard
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              Projects
            </Link>
            <Link
              href="/admin/content"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              Content
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              Inquiries
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

