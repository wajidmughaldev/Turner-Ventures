"use client"

import { Hammer, Pickaxe, Trash2, Building2, Leaf, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function ServicesGrid() {
  const [selectedServices, setSelectedServices] = useState([])

  const services = [
    {
      id: "demolition",
      name: "Demolition",
      description: "Complete building and structure demolition with proper permits and safety protocols.",
      icon: Hammer,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "concrete",
      name: "Concrete Removal",
      description: "Expert concrete cutting, removal, and disposal for driveways, patios, and foundations.",
      icon: Pickaxe,
      color: "from-gray-500 to-gray-600",
    },
    {
      id: "flooring",
      name: "Flooring Removal",
      description: "Professional removal of tile, hardwood, carpet, and other flooring materials.",
      icon: Trash2,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "small-buildings",
      name: "Small Buildings",
      description: "Removal of sheds, garages, and small structures with complete site cleanup.",
      icon: Building2,
      color: "from-red-500 to-red-600",
    },
    {
      id: "landscape",
      name: "Landscape Removal",
      description: "Tree removal, stump grinding, and complete landscape debris hauling.",
      icon: Leaf,
      color: "from-green-500 to-green-600",
    },
    {
      id: "junk",
      name: "Junk Removal",
      description: "Fast and efficient removal of household junk, appliances, and unwanted items.",
      icon: Trash2,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "mold",
      name: "Mold Removal",
      description: "Professional mold assessment, removal, and remediation services.",
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
    },
  ]

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  return (
    <section id="services" className="section-padding bg-muted-light">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Comprehensive demolition and removal services for residential and commercial properties across Gilbert,
            Arizona.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selectedServices.includes(service.id)

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-8 rounded-xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-white shadow-lg border-2 border-primary scale-105"
                    : "bg-white shadow-md border-2 border-transparent hover:shadow-lg hover:border-primary"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}
                >
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{service.name}</h3>
                <p className="text-muted mb-4">{service.description}</p>
                <button
                  className={`text-sm font-semibold transition-colors ${
                    isSelected ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  {isSelected ? "✓ Selected" : "Add to Estimate"}
                </button>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-xl p-8 border-2 border-primary">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Ready to get started?</h3>
              <p className="text-muted">
                {selectedServices.length > 0
                  ? `You've selected ${selectedServices.length} service(s). Proceed to get your free estimate.`
                  : "Select services above and get a free estimate tailored to your needs."}
              </p>
            </div>
             <a
              href="#freeEstimate"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-semibold"
            >
            <button className="btn-primary whitespace-nowrap cursor-pointer">Get Free Estimate</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
