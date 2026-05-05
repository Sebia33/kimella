'use client';

import { useState, useEffect } from 'react';

interface ContentData {
  homeTagline: string;
  homeCTA1: string;
  homeCTA2: string;
  aboutStory: string;
  designPhilosophy: string;
  services: string[];
}

export default function AdminContent() {
  const [content, setContent] = useState<ContentData>({
    homeTagline: 'Designing spaces that feel like home',
    homeCTA1: 'View Projects',
    homeCTA2: 'Request Quote',
    aboutStory: 'Kimella Interior blends premium interior design with modern African luxury.',
    designPhilosophy: 'Less is more. Every space is crafted with intention.',
    services: [
      'Interior Design',
      'Space Planning',
      'Renovations',
      '3D Visualization',
      'Furniture Styling',
    ],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState<'home' | 'about' | 'services' | 'contact'>('home');

  const pages = [
    { key: 'home' as const, title: 'Homepage Content' },
    { key: 'about' as const, title: 'About Page' },
    { key: 'services' as const, title: 'Services Page' },
    { key: 'contact' as const, title: 'Contact Page' },
  ];

  useEffect(() => {
    fetchContent();
  }, [page]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content?page=${page}`);
      const data = await res.json();
      setContent(data ? data.data || defaultContent : defaultContent);
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  const defaultContent = {
    homeTagline: 'Designing spaces that feel like home',
    homeCTA1: 'View Projects',
    homeCTA2: 'Request Quote',
    aboutStory: '',
    designPhilosophy: '',
    services: [],
  } as ContentData;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, data: content }),
      });
      if (res.ok) {
        alert('Content saved successfully!');
      }
    } catch (error) {
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const pageConfigs = {
    home: {
      title: 'Homepage Content',
      fields: [
        {
          label: 'Hero Tagline',
          type: 'text',
          value: content.homeTagline,
          onChange: (v: string) => setContent({...content, homeTagline: v}),
        },
        {
          label: 'CTA Button 1',
          type: 'text',
          value: content.homeCTA1,
          onChange: (v: string) => setContent({...content, homeCTA1: v}),
        },
        {
          label: 'CTA Button 2',
          type: 'text',
          value: content.homeCTA2,
          onChange: (v: string) => setContent({...content, homeCTA2: v}),
        },
      ],
    },
    about: {
      title: 'About Page Content',
      fields: [
        {
          label: 'Story',
          type: 'textarea',
          value: content.aboutStory,
          onChange: (v: string) => setContent({...content, aboutStory: v}),
        },
        {
          label: 'Design Philosophy',
          type: 'textarea',
          value: content.designPhilosophy,
          onChange: (v: string) => setContent({...content, designPhilosophy: v}),
        },
      ],
    },
    services: {
      title: 'Services Content',
      fields: [
        {
          label: 'Services List',
          type: 'services',
          value: content.services,
          onChange: (v: string[]) => setContent({...content, services: v}),
        },
      ],
    },
    contact: {
      title: 'Contact Content',
      fields: [],
    },
  };

  const config = pageConfigs[page];

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Content Editor
          </h1>
          <p className="opacity-90 mt-2">No-code content management</p>
        </div>
      </div>

      <div className="flex gap-6 mb-12">
        {pages.map(({ key, title }) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
              page === key
                ? 'bg-gradient-to-r from-gold-500 to-beige-500 text-luxury-black shadow-lg shadow-gold-500/25'
                : 'bg-white/10 hover:bg-white/20 border border-white/20 text-foreground'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-10">
        <h2 className="text-3xl font-bold font-serif mb-8 text-gold-500">{config.title}</h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p>Loading content...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {config.fields.map((field, index) => (
              <div key={index}>
                <label className="block text-lg font-semibold mb-4">{field.label}</label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full p-5 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg font-medium"
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
                    rows={6}
                    className="w-full p-5 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg font-medium resize-vertical"
                  />
                )}
                {field.type === 'services' && (
                  <div className="space-y-3">
                    {(field.value as string[] || []).map((service, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <input
                          value={service}
                          onChange={(e) => {
                            const newServices = [...(field.value as string[])];
                            newServices[i] = e.target.value;
                            field.onChange(newServices);
                          }}
                          className="flex-1 p-3 border border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 outline-none text-lg"
                        />
                        <button
                          type="button"
                          onClick={() => field.onChange((field.value as string[]).filter((_, idx) => idx !== i))}
                          className="p-3 text-red-400 hover:text-red-300 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => field.onChange([...(field.value as string[] || []), ''])}
                      className="text-gold-500 hover:text-gold-400 font-medium text-lg transition-colors"
                    >
                      + Add Service
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-12 py-5 bg-gradient-to-r from-gold-500 to-beige-500 text-luxury-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-gold-500/25 transition-all hover:-translate-y-1 shadow-xl disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

