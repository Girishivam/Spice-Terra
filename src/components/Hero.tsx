import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-spice-terra.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Authentic Indian Cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight break-words">
            Where Tradition Meets
            <span className="block text-accent">Authentic Flavors</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed px-2">
            Experience the rich heritage of Indian cuisine in a warm, rustic ambiance. 
            Every dish tells a story of tradition, passion, and authentic spices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 px-2">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-glow"
            >
              <Link to="/menu" data-scroll-top>
                Explore Our Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-brown-deep font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
            >
              <Link to="/booking" data-scroll-top>Reserve a Table</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto pt-8 sm:pt-12 px-2">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">5+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Years<br/>Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">100+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Authentic<br/>Dishes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">15k+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Happy<br/>Guests</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
