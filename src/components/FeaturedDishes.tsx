import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Flame } from "lucide-react";
import butterChicken from "@/assets/dish-butter-chicken.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import naan from "@/assets/dish-naan.jpg";

const dishes = [
  {
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
    price: "₹450",
    image: butterChicken,
    spiceLevel: 2,
  },
  {
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice layered with succulent meat and saffron",
    price: "₹550",
    image: biryani,
    spiceLevel: 3,
  },
  {
    name: "Garlic Naan",
    description: "Freshly baked bread with garlic butter and cilantro",
    price: "₹80",
    image: naan,
    spiceLevel: 1,
  },
];

const FeaturedDishes = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Signature Dishes
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our most beloved creations, crafted with authentic recipes 
            passed down through generations
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {dishes.map((dish, index) => (
            <Card
              key={dish.name}
              className="overflow-hidden hover-lift cursor-pointer group animate-fade-in-up border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {dish.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                <p className="text-muted-foreground mb-4">{dish.description}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium mr-2">Spice Level:</span>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-4 h-4 ${
                        i < dish.spiceLevel
                          ? "text-primary fill-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 font-semibold"
          >
            <Link to="/menu" data-scroll-top>
              View Full Menu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
