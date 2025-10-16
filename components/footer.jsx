"use client"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold">TV</span>
                </div>
                <div>
                  <p className="font-bold">Turner Ventures</p>
                  <p className="text-xs text-gray-400">Demolition & Removal</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Professional demolition and junk removal services serving Gilbert and the Phoenix metro area.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-accent transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-gray-400 hover:text-accent transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="text-gray-400 hover:text-accent transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-accent transition-colors">
                    Demolition
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-accent transition-colors">
                    Concrete Removal
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-accent transition-colors">
                    Junk Removal
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-accent transition-colors">
                    Flooring Removal
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-accent transition-colors">
                    Landscape Removal
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-accent transition-colors">
                    (480) 555-0123
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:turnerventuresaz@gmail.com"
                    className="text-gray-400 hover:text-accent transition-colors break-all"
                  >
                    turnerventuresaz@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Gilbert, Arizona</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black/30 py-6">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} Turner Ventures AZ. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
