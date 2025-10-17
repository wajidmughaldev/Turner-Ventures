"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Upload, Check } from "lucide-react"

export default function EstimateForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    services: [],
    timeline: "",
    budget: "",
    description: "",
    images: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
  }

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("Form submitted:", formData)
  //   alert("Thank you! We'll contact you soon with your estimate.")
  //   setStep(1)
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     city: "",
  //     services: [],
  //     timeline: "",
  //     budget: "",
  //     description: "",
  //     images: [],
  //   })
  // }


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Build FormData (multipart)
  const fd = new FormData();
  fd.append("name", formData.name);
  fd.append("email", formData.email);
  fd.append("phone", formData.phone);
  fd.append("address", formData.address);
  fd.append("city", formData.city);
  fd.append("timeline", formData.timeline);
  fd.append("budget", formData.budget);
  fd.append("description", formData.description || "");

  // services[] as multiple fields
  formData.services.forEach((s) => fd.append("services", s));

  // files (field name must match "images" in the function)
  formData.images.forEach((file) => fd.append("images", file, file.name));

  try {
    const res = await fetch("/.netlify/functions/send-estimate", {
      method: "POST",
      body: fd, // IMPORTANT: no Content-Type header here; browser sets it
    });

    if (!res.ok) throw new Error("Failed to send");

    alert("Thank you! We'll contact you soon with your estimate.");
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      services: [],
      timeline: "",
      budget: "",
      description: "",
      images: [],
    });
  } catch (err) {
    console.error(err);
    alert("Sorry, something went wrong sending your request.");
  }
};


  const services = [
    "Demolition",
    "Concrete Removal",
    "Flooring Removal",
    "Small Buildings",
    "Landscape Removal",
    "Junk Removal",
    "Mold Removal",
  ]

  const isStep1Valid = formData.name && formData.email && formData.phone
  const isStep2Valid = formData.address && formData.city && formData.services.length > 0
  const isStep3Valid = formData.timeline && formData.budget

  return (
    <section className="section-padding bg-white" id="freeEstimate">
      <div className="section-container max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get Your Free Estimate</h2>
          <p className="text-xl text-muted">Fill out this quick form and we'll contact you with a detailed estimate.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                    s <= step ? "bg-primary text-white" : "bg-border text-muted"
                  }`}
                >
                  {s < step ? <Check size={20} /> : s}
                </div>
                <span className="text-xs text-muted text-center">
                  {s === 1 && "Contact"}
                  {s === 2 && "Services"}
                  {s === 3 && "Details"}
                  {s === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(480) 555-0123"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Services & Location */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-foreground">Services & Location</h3>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Gilbert"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Services Needed *</label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold ${
                        formData.services.includes(service)
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-foreground border-border hover:border-primary"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-foreground">Project Details</h3>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Timeline *</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select timeline...</option>
                  <option value="asap">ASAP</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="1-month">1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Budget Range *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select budget...</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-plus">$10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your project..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Upload Photos (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto mb-2 text-muted" />
                    <p className="text-sm font-semibold text-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Upload ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-foreground">Review Your Information</h3>

              <div className="bg-muted-light p-6 rounded-lg space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted font-semibold">Name</p>
                    <p className="text-foreground">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Email</p>
                    <p className="text-foreground">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Phone</p>
                    <p className="text-foreground">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Location</p>
                    <p className="text-foreground">
                      {formData.address}, {formData.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Services</p>
                    <p className="text-foreground">{formData.services.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Timeline</p>
                    <p className="text-foreground">{formData.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Budget</p>
                    <p className="text-foreground">{formData.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted font-semibold">Photos</p>
                    <p className="text-foreground">{formData.images.length} uploaded</p>
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <p className="text-sm text-muted font-semibold mb-1">Description</p>
                    <p className="text-foreground">{formData.description}</p>
                  </div>
                )}
              </div>

              <div className="bg-primary text-white p-4 rounded-lg">
                <p className="text-sm">
                  By submitting this form, you agree to be contacted by Turner Ventures AZ regarding your estimate.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between pt-8">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && isStep1Valid) setStep(2)
                  else if (step === 2 && isStep2Valid) setStep(3)
                  else if (step === 3 && isStep3Valid) setStep(4)
                }}
                disabled={
                  (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)
                }
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-accent text-foreground rounded-lg font-bold hover:bg-accent-dark transition-colors"
              >
                Submit Estimate Request
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
