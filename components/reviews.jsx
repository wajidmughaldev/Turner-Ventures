"use client"

import { Star } from "lucide-react"

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "John Martinez",
      location: "Gilbert, AZ",
      rating: 5,
      text: "Turner Ventures did an amazing job removing our old concrete patio. Professional, efficient, and the price was fair. Highly recommend!",
      service: "Concrete Removal",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "Phoenix, AZ",
      rating: 5,
      text: "We hired them for a complete junk removal project. They were on time, courteous, and left the property spotless. Excellent service!",
      service: "Junk Removal",
    },
    {
      id: 3,
      name: "Mike Chen",
      location: "Chandler, AZ",
      rating: 5,
      text: "Best demolition company in the area. They handled our small building removal with precision and safety. Will definitely use again.",
      service: "Small Building Removal",
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      location: "Tempe, AZ",
      rating: 5,
      text: "Quick free estimate, fair pricing, and professional crew. They completed our flooring removal faster than expected. Great experience!",
      service: "Flooring Removal",
    },
  ]

  return (
    <section id="reviews" className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Customer Reviews</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            See what our satisfied customers have to say about Turner Ventures AZ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-muted-light p-8 rounded-xl border-l-4 border-accent">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-6 leading-relaxed italic">"{review.text}"</p>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted">{review.location}</p>
                </div>
                <span className="text-xs bg-primary text-white px-3 py-1 rounded-full font-semibold">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-muted-light rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">4.9/5</p>
            <p className="text-muted">Average Rating</p>
          </div>
          <div className="p-6 bg-muted-light rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-muted">Projects Completed</p>
          </div>
          <div className="p-6 bg-muted-light rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">100%</p>
            <p className="text-muted">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
