'use client';

import { useState, useEffect } from 'react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  category: string;
  featured: boolean;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'residential', 'commercial', 'luxury'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  }, [filter, projects]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse w-16 h-16 bg-gold-500 rounded-full mx-auto mb-4" />
            <p>Loading projects...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Our latest work showcasing luxury interior design excellence.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === cat
                  ? 'bg-gold-500 text-luxury-black shadow-lg shadow-gold-500/25'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20 text-foreground'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-beige-500 to-gold-500 group-hover:scale-110 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                {project.images[0] && (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-4 py-2 bg-gold-500 text-luxury-black text-sm font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-3 text-gold-500 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="opacity-90 mb-6">{project.location}</p>
                <a href={`/projects/${project.slug}`} className="font-semibold text-gold-500 hover:text-white transition-colors flex items-center gap-2">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-32">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">📂</span>
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4 text-gold-500">
              No projects found
            </h2>
            <p className="opacity-90 max-w-md mx-auto">
              Try changing the filter or check back later for new work.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

