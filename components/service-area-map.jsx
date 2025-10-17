"use client"

export default function ServiceAreaMap() {
  const serviceAreas = [
  "Apache Junction",
  "Avondale",
  "Buckeye",
  "Casa Grande",
  "Cave Creek",
  "Chandler",
  "Coolidge",
  "Flagstaff",
  "Florence",
  "Gilbert",
  "Goodyear",
  "Laveen",
  "Maricopa",
  "Mesa",
  "Payson",
  "Peoria",
  "Phoenix",
  "Prescott",
  "Queen Creek",
  "San Tan Valley",
  "Scottsdale",
  "Show Low",
  "Surprise",
  "Tempe"
];



  return (
    <section className="section-padding bg-muted-light">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative h-96 md:h-[1000px] rounded-xl overflow-hidden shadow-2xl bg-gray-200">
            <img
              src="/service-area-map.jpg"
              alt="Service area map for Phoenix metro"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
          </div>

          {/* Service Areas */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Service Areas</h2>
              <p className="text-lg text-muted leading-relaxed">
                We proudly serve the greater Phoenix metropolitan area, including Gilbert, Phoenix, Chandler, Tempe,
                Mesa, Scottsdale, and surrounding communities. If your area isn't listed, contact us—we may still be
                able to help!
              </p>
            </div>

            {/* Service Area Grid */}
            <div className="grid grid-cols-3 gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="bg-white p-4 rounded-lg border-2 border-border hover:border-primary transition-colors text-center font-semibold text-foreground"
                >
                  {area}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-primary text-white p-6 rounded-lg">
              <p className="font-semibold mb-3">Don't see your area?</p>
              <p className="text-sm mb-4">
                Contact us to discuss your project. We may be able to accommodate requests outside our typical service
                area.
              </p>
              <a
                href="tel:+17609855794"
                className="inline-block bg-accent text-foreground px-6 py-2 rounded-lg font-bold hover:bg-accent-dark transition-colors"
              >
                Call Us Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
