'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  totalProjects: number;
  featuredProjects: number;
  newInquiries: number;
  totalInquiries: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    featuredProjects: 0,
    newInquiries: 0,
    totalInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, inquiriesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/inquiries'),
      ]);

      const projects = Array.isArray(projectsRes.json()) ? await projectsRes.json() : [];
      const inquiries = Array.isArray(inquiriesRes.json()) ? await inquiriesRes.json() : [];

      setStats({
        totalProjects: projects.length,
        featuredProjects: projects.filter((p: any) => p.featured).length,
        newInquiries: inquiries.filter((i: any) => i.status === 'new').length,
        totalInquiries: inquiries.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-white/10 rounded-xl w-3/4 mx-auto" />
          <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-lg opacity-90 mt-2">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-500/20 group-hover:bg-blue-500/40 border-2 border-blue-500/50 rounded-2xl flex items-center justify-center transition-all">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm opacity-75">Total Projects</p>
              <p className="text-3xl font-bold">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-emerald-500/20 group-hover:bg-emerald-500/40 border-2 border-emerald-500/50 rounded-2xl flex items-center justify-center transition-all">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm opacity-75">Featured</p>
              <p className="text-3xl font-bold">{stats.featuredProjects}</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-orange-500/20 group-hover:bg-orange-500/40 border-2 border-orange-500/50 rounded-2xl flex items-center justify-center transition-all">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 4.82A1.94 1.94 0 0111 13a1.94 1.94 0 01.73-.18 1.93 1.93 0 01.54.1A2 2 0 0113 13a1.93 1.93 0 01.82 1.12 1.87 1.87 0 010 1.76 1.92 1.92 0 01-.54.1 2 2 0 01-.73-.18L3 16zM9 13l-5 3.33V8l5 3.33z" />
              </svg>
            </div>
            <div>
              <p className="text-sm opacity-75">New Inquiries</p>
              <p className="text-3xl font-bold">{stats.newInquiries}</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-500/20 group-hover:bg-purple-500/40 border-2 border-purple-500/50 rounded-2xl flex items-center justify-center transition-all">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm opacity-75">Total Leads</p>
              <p className="text-3xl font-bold">{stats.totalInquiries}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <h3 className="font-serif text-2xl font-bold mb-6 text-gold-500">Recent Projects</h3>
          <div className="space-y-4">
            {/* Quick links */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-beige-500 to-gold-500 rounded-xl flex items-center justify-center">
                <span className="font-bold text-lg text-luxury-black">P1</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">Modern Residence - Lagos</p>
                <p className="opacity-75 text-sm">Residential • Featured</p>
              </div>
              <Link href="/admin/projects" className="text-gold-500 hover:text-white font-medium text-sm">
                Edit →
              </Link>
            </div>
            <div className="text-center py-8 opacity-50">
              No recent projects • <Link href="/admin/projects" className="text-gold-500 hover:text-white underline">Add New</Link>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <h3 className="font-serif text-2xl font-bold mb-6 text-gold-500">Recent Inquiries</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="font-bold text-sm text-white">NEW</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">Sarah Johnson - Luxury Villa</p>
                <p className="opacity-75 text-sm">$250K+</p>
              </div>
              <Link href="/admin/inquiries" className="text-emerald-400 hover:text-emerald-300 font-medium text-sm">
                View →
              </Link>
            </div>
            <div className="text-center py-8 opacity-50">
              {stats.newInquiries === 0 ? 'No new inquiries' : `${stats.newInquiries} new waiting`} • <Link href="/admin/inquiries" className="text-gold-500 hover:text-white underline">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

