import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Heart, Users, Leaf } from "lucide-react";
import { useMetaTags } from "@/hooks/use-meta-tags";
import ambienceImage from "@/assets/ambience-interior.jpg";

const About = () => {
  useMetaTags({
    title: "About Us | Spice Terra",
    description:
      "Learn about Spice Terra's rich heritage, culinary philosophy, and commitment to authentic Indian cuisine.",
  });
  const values = [
    {
      icon: Heart,
      title: "Passion for Authenticity",
      description: "Every recipe is crafted with traditional methods passed through generations",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We source the finest ingredients and premium spices from across India",
    },
    {
      icon: Users,
      title: "Family Heritage",
      description: "Three generations of culinary expertise bringing you home-cooked flavors",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Committed to organic sourcing and environmentally conscious operations",
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
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A journey of flavors, tradition, and the timeless art of Indian cooking
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src={ambienceImage}
                alt="Restaurant Interior"
                className="rounded-lg shadow-medium hover-lift"
              />
            </div>
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-4xl font-bold">
                Where Tradition Meets <span className="text-primary">Modern Comfort</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Spice Terra was born from a simple dream: to recreate the warmth and authenticity 
                of traditional Indian home cooking in a welcoming, contemporary setting. Founded 
                in 2008 by the Mehta family, our restaurant has become a beloved destination for 
                those seeking genuine Indian flavors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our master chefs bring decades of experience, having trained under renowned 
                culinary experts across India. Each dish is prepared using time-honored techniques, 
                premium ingredients, and the perfect blend of aromatic spices that define authentic 
                Indian cuisine.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From our signature butter chicken to our fragrant biryanis, every meal at Spice 
                Terra tells a story of heritage, passion, and the joy of sharing good food with 
                good company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-lg p-6 text-center hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Meet Our Culinary Team
            </h2>
            <p className="text-muted-foreground text-lg">
              Expert chefs dedicated to bringing you authentic flavors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Chef Rajesh Mehta",
                role: "Head Chef",
                description: "30+ years of experience in traditional North Indian cuisine",
              },
              {
                name: "Chef Lakshmi Iyer",
                role: "Pastry Chef",
                description: "Specializes in authentic South Indian sweets and desserts",
              },
              {
                name: "Chef Arjun Singh",
                role: "Tandoor Master",
                description: "Expert in tandoori preparations and bread making",
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="bg-card rounded-lg p-6 text-center hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-32 h-32 bg-gradient-hero rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
