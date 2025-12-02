import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, Percent, Gift } from "lucide-react";
import { useMetaTags } from "@/hooks/use-meta-tags";

const Offers = () => {
  useMetaTags({
    title: "Special Offers | Spice Terra",
    description:
      "Discover amazing deals and exclusive offers at Spice Terra. Save on your favorite Indian dishes!",
  });
  const specialOffers = [
    {
      title: "Weekend Family Feast",
      description: "Get 20% off on orders above ₹2000 every Saturday and Sunday",
      discount: "20% OFF",
      validity: "Valid till Dec 31, 2025",
      code: "FAMILY20",
      icon: Gift,
    },
    {
      title: "Lunch Special",
      description: "Exclusive lunch combo at just ₹299 from 12 PM to 3 PM",
      discount: "₹299 ONLY",
      validity: "Monday to Friday",
      code: "LUNCH299",
      icon: Sparkles,
    },
    {
      title: "First Order Bonus",
      description: "New customers get flat ₹200 off on first online order",
      discount: "₹200 OFF",
      validity: "One time use",
      code: "FIRST200",
      icon: Percent,
    },
  ];

  const festivalMenu = [
    {
      name: "Diwali Special Thali",
      description: "Traditional festive platter with 8 delicacies including sweets",
      price: "₹799",
      image: "🪔",
      available: "Nov 1-15",
    },
    {
      name: "Holi Colors Feast",
      description: "Vibrant curries and colorful desserts celebrating the festival",
      price: "₹699",
      image: "🎨",
      available: "March 15-25",
    },
    {
      name: "Eid Biryani Special",
      description: "Royal Hyderabadi Biryani with special raita and dessert",
      price: "₹899",
      image: "🌙",
      available: "Eid celebrations",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Special Offers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover amazing deals and exclusive festive menus crafted just for you
            </p>
          </div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Current Offers
            </h2>
            <p className="text-muted-foreground text-lg">
              Limited time deals you don't want to miss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {specialOffers.map((offer, index) => (
              <Card
                key={offer.code}
                className="hover-lift animate-fade-in-up border-2 border-primary/20 hover:border-primary"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <offer.icon className="w-7 h-7 text-primary" />
                    </div>
                    <Badge className="bg-accent text-accent-foreground font-bold text-lg">
                      {offer.discount}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="bg-muted rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium">Use Code:</p>
                    <p className="text-lg font-bold text-primary tracking-wider">
                      {offer.code}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {offer.validity}
                  </div>

                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="/order" data-scroll-top>Order Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Special Menu */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Festival Special Menu
            </h2>
            <p className="text-muted-foreground text-lg">
              Celebrate India's rich traditions with our curated festive dishes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {festivalMenu.map((item, index) => (
              <Card
                key={item.name}
                className="hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-7xl mb-4">{item.image}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {item.price}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Available: {item.available}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link to="/booking" data-scroll-top>Reserve for Festival</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground border-0 animate-fade-in-up">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl font-bold mb-4">
                Join Our Loyalty Program
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Earn points on every order and unlock exclusive rewards, 
                birthday specials, and priority reservations
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <Link to="/contact" data-scroll-top>Sign Up Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;
