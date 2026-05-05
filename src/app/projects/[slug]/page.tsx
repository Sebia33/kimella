'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  beforeAfter?: { before: string[]; after: string[] };
  materials?: string[];
  featured: boolean;
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects?category=all`);
      const projects = await res.json();
      const found = projects.find((p: Project) => p.slug === slug);
      setProject(found);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p>Loading project...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4 text-gold-500">Project Not Found</h1>
          <a href="/portfolio" className="text-gold-500 hover:text-white underline">Back to Portfolio</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-8 inline-flex items-center gap-2 text-gold-500 hover:text-white font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </button>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gold-500">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 mb-8 text-lg opacity-90">
              <span className="px-4 py-2 bg-white/10 rounded-full">{project.category}</span>
              <span>📍 {project.location}</span>
            </div>
            <p className="text-xl leading-relaxed opacity-90 mb-12">
              {project.description}
            </p>
            {project.materials && (
              <div className="mb-12">
                <h3 className="font-serif text-2xl font-bold mb-4 text-gold-500">Materials Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.materials.map((material, index) => (
                    <span key={index} className="px-4 py-2 bg-white/10 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl mb-8">
              {project.images[0] && (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-8 text-gold-500">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {project.images.slice(1).map((img, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  <img src={img} alt={`${project.title} ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>

          {project.beforeAfter && (
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8 text-gold-500">Before / After</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 opacity-90">Before</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.beforeAfter.before.map((img, index) => (
                      <div key={`before-${index}`} className="aspect-square rounded-xl overflow-hidden bg-gray-800">
                        <img src={img} alt="Before" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 opacity-90">After</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.beforeAfter.after.map((img, index) => (
                      <div key={`after-${index}`} className="aspect-square rounded-xl overflow-hidden shadow-2xl">
                        <img src={img} alt="After" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <a
            href="/contact"
            className="inline-block px-12 py-5 bg-gold-500 text-luxury-black font-bold text-lg rounded-xl hover:bg-gold-400 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </main>
  );
}

