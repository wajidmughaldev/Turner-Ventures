import Header from "@/components/header"
import Hero from "@/components/hero"
import ServicesGrid from "@/components/services-grid"
import Gallery from "@/components/gallery"
import About from "@/components/about"
import ServiceAreaMap from "@/components/service-area-map"
import Reviews from "@/components/reviews"
import FAQ from "@/components/faq"
import EstimateForm from "@/components/estimate-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ServicesGrid />
      <Gallery />
      <About />
      <ServiceAreaMap />
      <Reviews />
      <FAQ />
      <EstimateForm />
      <Footer />
    </main>
  )
}
