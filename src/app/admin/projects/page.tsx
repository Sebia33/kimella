'use client';

import { useState, useEffect } from 'react';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  featured: boolean;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'residential' as const,
    location: '',
    images: [] as string[],
    featured: false,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      const urls = result.urls || [];
      setUploadUrls(prev => [...prev, ...urls]);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] })); 
    } catch (error) {
      console.error('Upload error', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `/api/projects${editingId ? `/${editingId}` : ''}`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setShowAddModal(false);
      setEditingId(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        category: 'residential',
        location: '',
        images: [],
        featured: false,
      });
      setUploadUrls([]);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category as any,
      location: project.location,
      images: project.images,
      featured: project.featured,
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Projects Management
          </h1>
          <p className="opacity-90 mt-2">{projects.length} projects</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: '',
              slug: '',
              description: '',
              category: 'residential',
              location: '',
              images: [],
              featured: false,
            });
            setUploadUrls([]);
            setShowAddModal(true);
          }}
          className="px-8 py-4 bg-gradient-to-r from-gold-500 to-beige-500 text-luxury-black font-bold rounded-xl hover:shadow-2xl hover:shadow-gold-500/25 transition-all hover:-translate-y-1 shadow-xl"
        >
          + New Project
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-6 text-left text-lg font-semibold opacity-90">Title</th>
                <th className="p-6 text-left text-lg font-semibold opacity-90">Category</th>
                <th className="p-6 text-left text-lg font-semibold opacity-90">Location</th>
                <th className="p-6 text-left text-lg font-semibold opacity-90">Images</th>
                <th className="p-6 text-left text-lg font-semibold opacity-90">Featured</th>
                <th className="p-6 text-right text-lg font-semibold opacity-90">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                  <td className="p-6 font-semibold">{project.title}</td>
                  <td className="p-6">
                    <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-6 opacity-90">{project.location}</td>
                  <td className="p-6">{project.images.length}</td>
                  <td className="p-6">
                    {project.featured ? (
                      <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        Yes
                      </span>
                    ) : (
                      <span className="px-4 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-medium">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-gold-400 hover:text-gold-300 rounded-xl transition-all font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="px-6 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 rounded-xl transition-all font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/20 rounded-3xl p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-serif text-gold-500">
                {editingId ? 'Edit Project' : 'New Project'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold mb-3">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full p-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full p-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full p-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 focus:outline-none transition-all text-lg resize-vertical"
                  placeholder="Project description..."
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Images</label>
                <div className="flex gap-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleUpload}
                    accept="image/*"
                    className="flex-1 p-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl focus:border-gold-500 transition-all file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-lg file:font-semibold file:bg-gold-500 file:text-luxury-black hover:file:bg-gold-400 transition-all cursor-pointer"
                    disabled={uploading}
                  />
                  <button
                    type="button"
                    onClick={() => setUploadUrls([])}
                    disabled={uploadUrls.length === 0}
                    className="px-6 py-4 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all font-medium disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
                {uploading && <p className="text-gold-500 mt-2">Uploading...</p>}
                {uploadUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {uploadUrls.map((url, index) => (
                      <img key={index} src={url} alt="Upload" className="w-full h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                  />
                  <span className="text-lg font-semibold">Featured on Homepage</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-8 py-5 bg-gradient-to-r from-gold-500 to-beige-500 text-luxury-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-gold-500/25 transition-all hover:-translate-y-1 shadow-xl"
                >
                  {editingId ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-8 py-5 border-2 border-white/20 text-white font-bold text-xl rounded-2xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {projects.length === 0 && !loading && (
        <div className="text-center py-32">
          <div className="w-32 h-32 mx-auto mb-8 p-8 bg-white/5 rounded-3xl">
            <svg className="w-20 h-20 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4 text-gold-500">
            No Projects Yet
          </h2>
          <p className="opacity-90 mb-8 max-w-md mx-auto">
            Get started by creating your first project.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-12 py-5 bg-gradient-to-r from-gold-500 to-beige-500 text-luxury-black font-bold rounded-xl hover:shadow-2xl transition-all"
          >
            Create First Project
          </button>
        </div>
      )}
    </div>
  );
}

