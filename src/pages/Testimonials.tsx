import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useMetaTags } from "@/hooks/use-meta-tags";

const Testimonials = () => {
  useMetaTags({
    title: "Testimonials | Spice Terra",
    description:
      "Read authentic reviews and testimonials from our satisfied customers about their dining experience at Spice Terra.",
  });
  const allTestimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment:
        "The most authentic Indian food I've had outside of my grandmother's kitchen. The ambiance is warm and welcoming, truly feels like home. Every dish is bursting with flavor!",
      date: "2 weeks ago",
    },
    {
      name: "Rajesh Patel",
      location: "Delhi",
      rating: 5,
      comment:
        "Exceptional flavors and presentation. The butter chicken is absolutely divine, and the service is impeccable. Highly recommended for anyone who loves authentic Indian cuisine!",
      date: "1 month ago",
    },
    {
      name: "Sara Mehta",
      location: "Uttar Pradesh",
      rating: 5,
      comment:
        "As someone who travels extensively, I can say Spice Terra offers one of the finest Indian dining experiences. The spices are perfectly balanced and the portions are generous.",
      date: "3 weeks ago",
    },
    {
      name: "Amit Kumar",
      location: "Bangalore",
      rating: 5,
      comment:
        "The biryani here is incredible! Perfectly cooked rice with tender meat and aromatic spices. The rustic ambiance adds to the whole experience. Will definitely visit again!",
      date: "1 week ago",
    },
    {
      name: "Emily",
      location: "Bangalore",
      rating: 5,
      comment:
        "Found this gem during my trip to India. The staff was incredibly friendly and helped me navigate the menu. Every dish we tried was outstanding. The naan bread was the best I've ever had!",
      date: "2 months ago",
    },
    {
      name: "Vikram Singh",
      location: "Pune",
      rating: 5,
      comment:
        "Celebrated my anniversary here and it was perfect! The team arranged a beautiful table setting and the food was exceptional. The dal makhani is a must-try. Truly memorable evening!",
      date: "3 weeks ago",
    },
    {
      name: "Ayush Gupta",
      location: "Gujarat",
      rating: 5,
      comment:
        "The vegetarian options here are amazing! As a vegetarian, I'm always concerned about variety, but Spice Terra exceeded all expectations. The paneer dishes are exquisite.",
      date: "1 month ago",
    },
    {
      name: "Mohammed Hassan",
      location: "Maharashtra",
      rating: 5,
      comment:
        "Authentic flavors that remind me of home. The tandoori items are perfectly charred and smoky. Great attention to detail in both food and service. Five stars all the way!",
      date: "2 weeks ago",
    },
    {
      name: "Ananya Reddy",
      location: "Hyderabad",
      rating: 5,
      comment:
        "As a Hyderabadi, I'm very particular about biryani. I must say, Spice Terra's biryani is authentic and delicious! The restaurant has a lovely rustic charm that makes you feel at home.",
      date: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-warm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-gradient">
              Guest Reviews
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-2">
              Hear what our valued guests have to say about their dining experience at Spice Terra
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">4.9</div>
              <div className="flex items-center justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-accent"
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">
                Would Recommend
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.name}-${index}`}
                className="hover-lift animate-fade-in-up border-border/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6 relative">
                  <Quote className="w-6 h-6 text-accent/30 absolute top-6 left-6" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed mb-4 pt-8 pl-2">
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {testimonial.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We'd love to hear about your visit to Spice Terra. Your feedback helps us serve you better!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/search?q=spice+terra+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Write a Google Review
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Share on Social Media
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
