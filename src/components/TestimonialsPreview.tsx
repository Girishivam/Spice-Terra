import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "The most authentic Indian food I've had outside of my grandmother's kitchen. The ambiance is warm and welcoming, truly feels like home.",
  },
  {
    name: "Rajesh Patel",
    location: "Delhi",
    rating: 5,
    comment: "Exceptional flavors and presentation. The butter chicken is absolutely divine, and the service is impeccable. Highly recommended!",
  },
  {
    name: "Sara Mehta",
    location: "Uttar Pradesh",
    rating: 5,
    comment: "As someone who travels extensively, I can say Spice Terra offers one of the finest Indian dining experiences. The spices are perfectly balanced.",
  },
];

const TestimonialsPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Hear from our valued guests 
            about their memorable experiences at Spice Terra
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="hover-lift animate-fade-in-up border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="w-10 h-10 text-accent/30" />
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-accent fill-accent"
                    />
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
          >
            <Link to="/testimonials">Read More Reviews</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
