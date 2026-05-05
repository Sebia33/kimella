import Image from "next/image";

import TestimonialCarousel from '@/components/ui/TestimonialCarousel';

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-royal-video-11521-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-beige-500 via-gold-500 to-beige-500 opacity-20 animate-pulse" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-luxury-white">
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8 drop-shadow-2xl">
            Designing spaces
            <br />
            <span className="text-gold-500">that feel like home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Modern African luxury aesthetic with clean minimalism. Transform your vision into extraordinary reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/portfolio"
              className="px-12 py-4 bg-gold-500 text-luxury-black font-semibold rounded-full hover:bg-gold-400 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-12 py-4 border-2 border-luxury-white text-luxury-white font-semibold rounded-full hover:bg-luxury-white hover:text-luxury-black transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Request Quote
            </a>
          </div>
        </div>
      </section>

      <TestimonialCarousel />
    </>
  );
}
