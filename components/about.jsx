"use client"

import { Award, Users, Zap, Shield } from "lucide-react"

export default function About() {
  const highlights = [
    {
      icon: Award,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for all demolition and removal services",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "20+ years of combined experience in demolition and removal",
    },
    {
      icon: Zap,
      title: "Fast Service",
      description: "Same-day estimates and quick project turnaround times",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Strict safety protocols and proper waste disposal practices",
    },
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Turner Ventures</h2>
              <p className="text-lg text-muted leading-relaxed mb-4">
                Founded by Nick Turner, Turner Ventures AZ has been serving the Gilbert and Phoenix metro area with
                professional demolition and junk removal services since 2015. We pride ourselves on delivering
                exceptional results with integrity and professionalism.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Whether you need a complete building demolition, concrete removal, or junk hauling, our experienced team
                handles every project with precision and care. We're committed to making your property transformation
                smooth, safe, and stress-free.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="bg-muted-light p-6 rounded-lg">
                    <Icon size={32} className="text-primary mb-3" />
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                )
              })}
            </div>
              <a href="tel:+17609855794">
            <button className="btn-primary">Schedule a Consultation</button>
          </a>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full min-h-96">
            <img
              src="/about-team-photo.jpg"
              alt="Turner Ventures team"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-accent text-foreground p-6 rounded-xl shadow-lg max-w-xs">
              <p className="font-bold text-2xl mb-1">20+ Years</p>
              <p className="text-sm">of combined demolition expertise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
