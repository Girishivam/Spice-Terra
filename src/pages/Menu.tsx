import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSearch from "@/components/MenuSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Leaf } from "lucide-react";
import { useMetaTags } from "@/hooks/use-meta-tags";

const menuItems = [
  {
    category: "Starters",
    name: "Paneer Tikka",
    description: "Cottage cheese marinated in spices and grilled in tandoor",
    price: 200,
    vegetarian: true,
    spiceLevel: 2,
  },
  {
    category: "Starters",
    name: "Chicken Seekh Kabab",
    description: "Minced chicken mixed with herbs and spices, grilled on skewers",
    price: 320,
    vegetarian: false,
    spiceLevel: 3,
  },
  {
    category: "Starters",
    name: "Samosa Chaat",
    description: "Crispy samosas topped with chickpeas, yogurt, and chutneys",
    price: 180,
    vegetarian: true,
    spiceLevel: 2,
  },
  {
    category: "Main Course",
    name: "Butter Chicken",
    description: "Tender chicken in creamy tomato gravy with butter and spices",
    price: 350,
    vegetarian: false,
    spiceLevel: 2,
  },
  {
    category: "Main Course",
    name: "Dal Makhani",
    description: "Black lentils slow-cooked with cream and aromatic spices",
    price: 220,
    vegetarian: true,
    spiceLevel: 1,
  },
  {
    category: "Main Course",
    name: "Lamb Rogan Josh",
    description: "Kashmiri specialty with tender lamb in rich aromatic gravy",
    price: 580,
    vegetarian: false,
    spiceLevel: 3,
  },
  {
    category: "Main Course",
    name: "Palak Paneer",
    description: "Cottage cheese in creamy spinach gravy with spices",
    price: 280,
    vegetarian: true,
    spiceLevel: 2,
  },
  {
    category: "Breads",
    name: "Butter Naan",
    description: "Soft leavened bread brushed with butter",
    price: 80,
    vegetarian: true,
    spiceLevel: 0,
  },
  {
    category: "Breads",
    name: "Garlic Naan",
    description: "Naan topped with fresh garlic and cilantro",
    price: 120,
    vegetarian: true,
    spiceLevel: 1,
  },
  {
    category: "Rice & Biryani",
    name: "Hyderabadi Chicken Biryani",
    description: "Aromatic basmati rice layered with marinated chicken and spices",
    price: 450,
    vegetarian: false,
    spiceLevel: 3,
  },
  {
    category: "Rice & Biryani",
    name: "Vegetable Biryani",
    description: "Fragrant rice with seasonal vegetables and saffron",
    price: 380,
    vegetarian: true,
    spiceLevel: 2,
  },
  {
    category: "Desserts",
    name: "Gulab Jamun",
    description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
    price: 50,
    vegetarian: true,
    spiceLevel: 0,
  },
  {
    category: "Desserts",
    name: "Rasmalai",
    description: "Cottage cheese patties in sweet saffron-flavored milk",
    price: 80,
    vegetarian: true,
    spiceLevel: 0,
  },
  {
    category: "Beverages",
    name: "Masala Chai",
    description: "Traditional Indian tea with aromatic spices",
    price: 50,
    vegetarian: true,
    spiceLevel: 1,
  },
  {
    category: "Beverages",
    name: "Mango Lassi",
    description: "Sweet yogurt drink blended with fresh mango",
    price: 100,
    vegetarian: true,
    spiceLevel: 0,
  },
];

const Menu = () => {
  useMetaTags({
    title: "Menu | Spice Terra",
    description:
      "Explore our authentic Indian menu with vegetarian and non-vegetarian options. From starters to desserts.",
  });

  const [filteredItems, setFilteredItems] = useState(menuItems);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-warm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-gradient">
              Our Menu
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-2">
              Explore our carefully curated selection of authentic Indian dishes, 
              each prepared with love and traditional recipes
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-4 sm:py-6 bg-background sticky top-20 z-30 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <MenuSearch items={menuItems} onFilter={setFilteredItems} />
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="pt-2 sm:pt-4" />
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-base sm:text-lg">
                No items match your search. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredItems.map((item, index) => (
                <Card
                  key={`${item.name}-${index}`}
                  className="hover-lift animate-fade-in-up border-border/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      {item.vegetarian && (
                        <Leaf className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ₹{item.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Flame
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.spiceLevel
                                ? "text-primary fill-primary"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
