'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  message: string;
  status: 'new' | 'in-progress' | 'completed';
  createdAt: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchInquiries();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (!confirm(`Delete ${ids.length} selected inquiries?`)) return;

    setDeleting(ids);
    try {
      await fetch('/api/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      fetchInquiries();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting([]);
    }
  };

  const newInquiries = inquiries.filter(i => i.status === 'new');
  const inProgress = inquiries.filter(i => i.status === 'in-progress');
  const completed = inquiries.filter(i => i.status === 'completed');

  if (loading) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Inquiries & Leads
          </h1>
          <p className="opacity-90 mt-2">
            {newInquiries.length} new, {inquiries.length} total
          </p>
        </div>
        {inquiries.length > 0 && (
          <button
            onClick={() => handleDelete(inquiries.map(i => i._id))}
            className="px-8 py-4 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all font-semibold"
          >
            Delete All
          </button>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gold-500 flex items-center gap-3">
            New <span className="text-sm bg-emerald-500/20 px-3 py-1 rounded-full font-medium">Priority</span>
          </h2>
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-6 text-left">Client</th>
                    <th className="p-6 text-left">Budget</th>
                    <th className="p-6 text-left">Phone</th>
                    <th className="p-6 text-left">Type</th>
                    <th className="p-6 text-left">Date</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newInquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                      <td className="p-6 font-semibold">{inquiry.name}</td>
                      <td className="p-6 opacity-90">{inquiry.budget}</td>
                      <td className="p-6">
                        <a href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`} className="text-emerald-400 hover:text-emerald-300 font-medium" target="_blank" rel="noopener">
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="p-6 opacity-90">{inquiry.projectType}</td>
                      <td className="p-6 opacity-75 text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(inquiry._id, 'in-progress')}
                            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 rounded-xl transition-all font-medium"
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => updateStatus(inquiry._id, 'completed')}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-xl transition-all font-medium"
                          >
                            Completed
                          </button>
                          <button
                            onClick={() => handleDelete([inquiry._id])}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl transition-all font-medium"
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
          {newInquiries.length === 0 && (
            <div className="text-center py-20 opacity-50">
              No new inquiries 🎉
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gold-500">All Inquiries</h2>
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-6 text-left">Client</th>
                    <th className="p-6 text-left">Status</th>
                    <th className="p-6 text-left">Budget</th>
                    <th className="p-6 text-left">Date</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(inProgress.concat(completed)).map((inquiry) => (
                    <tr key={inquiry._id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                      <td className="p-6 font-semibold">{inquiry.name}</td>
                      <td className="p-6">
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                          inquiry.status === 'in-progress' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                        }`}>
                          {inquiry.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="p-6 opacity-90">{inquiry.budget}</td>
                      <td className="p-6 opacity-75 text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          {inquiry.status === 'in-progress' && (
                            <button
                              onClick={() => updateStatus(inquiry._id, 'completed')}
                              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-xl transition-all font-medium"
                            >
                              Mark Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete([inquiry._id])}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl transition-all font-medium"
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
          {(inProgress.length + completed.length) === 0 && (
            <div className="text-center py-20 opacity-50">
              No processed inquiries
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

