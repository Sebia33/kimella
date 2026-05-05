'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@kimella.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-luxury-black px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent mb-4">
            Kimella
          </h1>
          <p className="text-xl opacity-90 font-medium">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-100 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-lg font-semibold mb-4 opacity-90">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg placeholder-opacity-50 font-medium"
              placeholder="admin@kimella.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-4 opacity-90">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg placeholder-opacity-50 font-medium"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-6 bg-gradient-to-r from-gold-500 to-beige-500 text-luxury-black font-bold text-xl rounded-2xl hover:from-gold-400 hover:shadow-2xl hover:shadow-gold-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            {loading ? (
              <div className="flex items-center gap-3 justify-center">
                <div className="w-6 h-6 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center mt-8 opacity-75 text-sm">
          Use default: admin@kimella.com / admin123
          <br />
          Run POST /api/seed after MongoDB setup.
        </p>
      </div>
    </div>
  );
}

