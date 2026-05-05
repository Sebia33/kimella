export default function Services() {
  const services = [
    {
      title: "Interior Design",
      description: "Complete interior design solutions from concept to completion.",
      icon: "🎨"
    },
    {
      title: "Space Planning",
      description: "Optimized layouts that maximize functionality and flow.",
      icon: "📐"
    },
    {
      title: "Renovations",
      description: "Full renovation services with attention to every detail.",
      icon: "🔨"
    },
    {
      title: "3D Visualization",
      description: "Photorealistic renders to bring your vision to life.",
      icon: "🖥️"
    },
    {
      title: "Furniture Styling",
      description: "Curated furniture selection and styling services.",
      icon: "🛋️"
    },
  ];

  return (
    <main className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-500 to-beige-500 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Comprehensive interior design services tailored to your vision and space.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-gold-500 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="opacity-90 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

