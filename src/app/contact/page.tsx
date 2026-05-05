'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
<main className="min-h-screen py-20 flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl w-full mx-auto text-center">
        <div className="mb-20">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Let's Create Something
            <br />
            <span className="text-gold-500">Extraordinary Together</span>
          </h1>
          <p className="text-xl opacity-90 mx-auto max-w-2xl">
            Ready to transform your space? Get in touch for a free consultation.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-32 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-500/20 border-4 border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4 text-gold-500">
              Thank You!
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Your inquiry has been sent. We'll get back to you within 24 hours.
            </p>
            <a href="/portfolio" className="inline-block px-8 py-4 bg-gold-500 text-luxury-black font-semibold rounded-full hover:bg-gold-400 transition-all shadow-xl">
              View Our Work
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mx-auto">
            <div className="md:col-span-1">
              <label className="block text-lg font-semibold mb-3">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full p-5 border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 focus:outline-none transition-all text-lg placeholder-opacity-50"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-400 mt-2">{errors.name.message}</p>}
            </div>

            <div className="md:col-span-1">
              <label className="block text-lg font-semibold mb-3">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full p-5 border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 focus:outline-none transition-all text-lg placeholder-opacity-50"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 mt-2">{errors.email.message}</p>}
            </div>

            <div className="md:col-span-1">
              <label className="block text-lg font-semibold mb-3">Phone / WhatsApp</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                className="w-full p-5 border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 focus:outline-none transition-all text-lg placeholder-opacity-50"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-red-400 mt-2">{errors.phone.message}</p>}
            </div>

            <div className="md:col-span-1">
              <label className="block text-lg font-semibold mb-3">Budget Range</label>
              <select
                {...register('budget', { required: 'Budget is required' })}
                className="w-full p-5 border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 focus:outline-none transition-all text-lg"
              >
                <option value="">Select budget</option>
                <option value="$50K - $100K">$50K - $100K</option>
                <option value="$100K - $250K">$100K - $250K</option>
                <option value="$250K+">$250K+</option>
              </select>
              {errors.budget && <p className="text-red-400 mt-2">{errors.budget.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-lg font-semibold mb-3">Project Type</label>
              <select
                {...register('projectType', { required: 'Project type is required' })}
                className="w-full p-5 border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 focus:outline-none transition-all text-lg"
              >
                <option value="">Select type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="renovation">Renovation</option>
                <option value="other">Other</option>
              </select>
              {errors.projectType && <p className="text-red-400 mt-2">{errors.projectType.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-lg font-semibold mb-3">Message</label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={6}
                className="w-full p-5 border-2 border-white/20 bg-white/5 backdrop-blur-md rounded-xl focus:border-gold-500 focus:outline-none transition-all text-lg placeholder-opacity-50 resize-vertical"
                placeholder="Tell us about your project vision, timeline, and any specific requirements..."
              />
              {errors.message && <p className="text-red-400 mt-2">{errors.message.message}</p>}
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-8 justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 max-w-md px-12 py-5 bg-gold-500 text-luxury-black font-bold text-lg rounded-xl hover:bg-gold-400 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              <a
                href="https://wa.me/1234567890?text=Hi%20Kimella%20Interior%2C%20I'm%20interested%20in%20your%20services."
                className="flex-1 max-w-md px-12 py-5 border-2 border-gold-500 text-gold-500 font-bold text-lg rounded-xl hover:bg-gold-500 hover:text-luxury-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center"
              >
                WhatsApp Chat
              </a>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

