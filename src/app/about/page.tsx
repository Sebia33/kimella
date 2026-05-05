'use client';

export default function About() {
  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            About Kimella
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Designing spaces that feel like home with premium modern African luxury.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-6 text-gold-500">
              Our Story
            </h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              Kimella Interior blends clean luxury minimalism with modern African aesthetics. From Cape Town villas to Nairobi offices, we craft timeless spaces.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-beige-500 rounded-2xl flex items-center justify-center">
                <span className="font-serif text-xl">👑</span>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Design Philosophy</h3>
                <p className="opacity-90">Less is more. Every detail intentional.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold mb-12 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Creating African luxury interiors that resonate globally while celebrating local heritage.
          </p>
        </div>
      </div>
    </main>
  );
}
