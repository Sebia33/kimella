 'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    text: 'Kimella transformed our home into a masterpiece. Absolutely stunning!',
    author: 'Sarah M.',
    role: 'Villa Owner',
  },
  {
    text: 'Professional team, incredible vision. Highly recommend for luxury interiors.',
    author: 'David K.',
    role: 'Office Director',
  },
  {
    text: 'Perfect blend of modern and African luxury. Dream space created!',
    author: 'Aisha L.',
    role: 'Apartment Resident',
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="py-24 bg-neutral-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent"
        >
          What Our Clients Say
        </motion.h2>
        <div className="flex overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="min-w-full flex-shrink-0 px-8"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center hover:bg-white/10 transition-all group">
                <p className="text-xl leading-relaxed mb-8 italic opacity-95 group-hover:opacity-100">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-lg text-gold-500">{testimonial.author}</p>
                  <p className="opacity-75">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4 justify-center mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                backgroundColor: index === 0 ? '#D4AF37' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

