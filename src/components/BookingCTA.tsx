import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, UtensilsCrossed } from "lucide-react";

const BookingCTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 mandala-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-4">
            <UtensilsCrossed className="w-10 h-10 text-accent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Reserve Your Table for an
            <span className="block text-accent">Unforgettable Experience</span>
          </h2>
          
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Join us for an authentic journey through Indian cuisine. 
            Whether it's a family gathering or a special celebration, 
            we'll make every moment memorable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-glow"
            >
              <Link to="/booking" data-scroll-top>
                <Calendar className="mr-2 w-5 h-5" />
                Book a Table Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-6 text-lg"
            >
              <Link to="/order" data-scroll-top>Order for Delivery</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Open 7 Days a Week</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Private Events Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Vegetarian & Vegan Options</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
