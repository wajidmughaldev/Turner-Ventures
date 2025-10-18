"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  const beforeAfterPairs = [
    {
      id: 1,
      title: "Complete Demolition",
      before: "/gallery-before-5.jpg",
      after: "/gallery-after-5.jpg",
      description: "Full structure removal and site cleanup",
    },
    {
      id: 2,
      title: "Concrete Removal",
      before: "/gallery-before-6.jpg",
      after: "/gallery-after-6.jpg",
      description: "Driveway and foundation removal",
    },
     {
      id: 3,
      title: "Concrete Removal",
      before: "/gallery-before-7.jpg",
      after: "/gallery-after-7.jpg",
      description: "Driveway and foundation removal",
    },
    {
      id: 4,
      title: "Concrete Removal",
      before: "/gallery-before-8.jpg",
      after: "/gallery-after-8.jpg",
      description: "Driveway and foundation removal",
    },
    // {
    //   id: 3,
    //   title: "Junk Removal",
    //   before: "/gallery-before-3.jpg",
    //   after: "/gallery-after-3.jpg",
    //   description: "Complete property cleanup",
    // },
    // {
    //   id: 4,
    //   title: "Landscape Removal",
    //   before: "/gallery-before-4.jpg",
    //   after: "/gallery-after-4.jpg",
    //   description: "Tree and debris removal",
    // },
  ]

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? beforeAfterPairs.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === beforeAfterPairs.length - 1 ? 0 : prev + 1))
  }

  const current = beforeAfterPairs[activeIndex]

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Work</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            See the transformation we bring to properties across Gilbert, Arizona.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Before/After Slider */}
          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-gray-200">
              {/* Before Image */}
              <img
                src={current.before || "/placeholder.svg"}
                alt={`Before: ${current.title}`}
                className="w-full h-full object-cover"
              />

              {/* After Image Overlay */}
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="w-1/2 h-full overflow-hidden">
                  <img
                    src={current.after || "/placeholder.svg"}
                    alt={`After: ${current.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Divider Line */}
              <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg"></div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">Before</div>
              <div className="absolute top-4 right-4 bg-accent text-foreground px-4 py-2 rounded-lg font-bold">
                After
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={goToPrevious}
                className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 justify-center mt-4">
              {beforeAfterPairs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "bg-primary w-8" : "bg-border w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold text-foreground mb-2">{current.title}</h3>
              <p className="text-xl text-muted">{current.description}</p>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted-light p-6 rounded-lg">
                <p className="text-sm text-muted font-semibold mb-1">Project Type</p>
                <p className="text-2xl font-bold text-foreground">{current.title}</p>
              </div>
              <div className="bg-muted-light p-6 rounded-lg">
                <p className="text-sm text-muted font-semibold mb-1">Completion</p>
                <p className="text-2xl font-bold text-foreground">2-5 Days</p>
              </div>
            </div>

            {/* CTA */}
            <a href="#freeEstimate" className="block ">
            <button className="btn-primary w-full text-lg cursor-pointer">Get Similar Results</button>
            </a>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {beforeAfterPairs.map((pair, index) => (
                <button
                  key={pair.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === activeIndex ? "border-primary scale-105" : "border-border"
                  }`}
                >
                  <img
                    src={pair.before || "/placeholder.svg"}
                    alt={pair.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
