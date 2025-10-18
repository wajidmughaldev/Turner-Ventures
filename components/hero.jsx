"use client"

import { ArrowRight, CheckCircle } from "lucide-react"

export default function Hero() {
  const benefits = ["Free Estimates", "Licensed & Insured", "Same-Day Service Available"]

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10 section-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                Professional Demolition & Junk Removal
              </h1>
              <p className="text-xl text-blue-100 text-balance">
                Serving Gilbert, Arizona with expert demolition, concrete removal, and junk hauling services. Fast,
                reliable, and fully licensed.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-accent flex-shrink-0" />
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#freeEstimate">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold hover:opacity-90 transition-opacity text-lg">
                Get Free Estimate
                <ArrowRight size={20} />
              </button>
              </a>
              <a
                href="tel:+17609855794"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-primary transition-colors text-lg"
              >
                
                Call Now: (760) 985-5794
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full min-h-96">
            <img
              src="/professional-demolition-equipment-and-crew-working.jpg"
              alt="Professional demolition crew at work"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent rounded-xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
