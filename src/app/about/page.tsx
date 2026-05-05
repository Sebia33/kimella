
  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-center grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
              Our Story
            </h1>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Kimella Interior blends premium interior design with modern African luxury. Inspired by Giava Interiors' clean minimalism, we create spaces that exude sophistication and warmth.
            </p>
            <p className="text-lg leading-relaxed mb-12">
              From residential havens to commercial masterpieces, our design philosophy centers on timeless elegance, thoughtful space planning, and materials that tell a story.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="font-serif text-luxury-black font-bold text-lg">K</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Design Philosophy</h3>
                  <p>Less is more. Every space is crafted with intention, balancing luxury with livability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="font-serif text-luxury-black font-bold text-lg">V</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Vision</h3>
                  <p>Redefining luxury interiors for the modern African home and workspace.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-beige-500 via-gold-500 to-beige-500 animate-pulse" />
          </div>
        </div>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8">
            <div className="text-4xl font-bold text-gold-500 mb-4">100+</div>
            <div className="text-lg opacity-90">Projects Completed</div>
          </div>
          <div className="text-center p-8">
            <div className="text-4xl font-bold text-gold-500 mb-4">50+</div>
            <div className="text-lg opacity-90">Happy Clients</div>
          </div>
          <div className="text-center p-8">
            <div className="text-4xl font-bold text-gold-500 mb-4">5+</div>
            <div className="text-lg opacity-90">Years Experience</div>
          </div>
        </section>
      </div>
    </main>
  );
}

