import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">Spice Terra</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Experience the authentic flavors of India in a warm, rustic ambiance. 
              Where tradition meets taste.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" data-scroll-top className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" data-scroll-top className="hover:text-accent transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/gallery" data-scroll-top className="hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials" data-scroll-top className="hover:text-accent transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" data-scroll-top className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/order" data-scroll-top className="hover:text-accent transition-colors">
                  Online Ordering
                </Link>
              </li>
              <li>
                <Link to="/booking" data-scroll-top className="hover:text-accent transition-colors">
                  Table Reservation
                </Link>
              </li>
              <li>
                <Link to="/offers" data-scroll-top className="hover:text-accent transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Catering Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Private Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                <span>123 Heritage Lane, Old Town District, Mumbai 400001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-accent" />
                <span>hello@spiceterra.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                <div>
                  <div>Mon - Fri: 11:00 AM - 11:00 PM</div>
                  <div>Sat - Sun: 10:00 AM - 12:00 AM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Spice Terra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
