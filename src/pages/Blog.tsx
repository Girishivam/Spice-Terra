import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMetaTags } from "@/hooks/use-meta-tags";

const Blog = () => {
  useMetaTags({
    title: "Blog | Spice Terra",
    description:
      "Read articles about Indian cuisine, cooking tips, recipes, and the rich culinary heritage of Spice Terra.",
  });
  const blogPosts = [
    {
      title: "The Art of Making Perfect Biryani: A Step-by-Step Guide",
      excerpt:
        "Discover the secrets behind creating the perfect layered biryani with aromatic spices and tender meat. Learn traditional techniques passed down through generations.",
      author: "Chef Rajesh Mehta",
      date: "December 15, 2024",
      category: "Recipes",
      readTime: "8 min read",
    },
    {
      title: "10 Lesser-Known Indian Spices That Will Transform Your Cooking",
      excerpt:
        "Beyond the common turmeric and cumin, explore exotic spices that add depth and complexity to Indian cuisine. From kalpasi to dagad phool, unlock new flavors.",
      author: "Chef Lakshmi Iyer",
      date: "December 10, 2024",
      category: "Cooking Tips",
      readTime: "6 min read",
    },
    {
      title: "The History of Indian Cuisine: A Journey Through Time",
      excerpt:
        "Travel through centuries of culinary evolution from ancient Vedic cooking to modern fusion. Understand how trade routes and cultural exchanges shaped Indian food.",
      author: "Ananya Reddy",
      date: "December 5, 2024",
      category: "Culture",
      readTime: "10 min read",
    },
    {
      title: "Vegetarian Protein Sources in Traditional Indian Cooking",
      excerpt:
        "Learn about the rich variety of plant-based proteins that have sustained Indian vegetarian cuisine for millennia. From lentils to paneer, discover nutritional treasures.",
      author: "Dr. Priya Sharma",
      date: "November 28, 2024",
      category: "Health & Nutrition",
      readTime: "7 min read",
    },
    {
      title: "Celebrating Diwali: Traditional Sweets and Their Significance",
      excerpt:
        "Explore the cultural importance of traditional Indian sweets during Diwali. From gulab jamun to jalebi, understand the stories and rituals behind festive desserts.",
      author: "Chef Arjun Singh",
      date: "November 20, 2024",
      category: "Festivals",
      readTime: "5 min read",
    },
    {
      title: "Mastering the Tandoor: Ancient Cooking Technique Explained",
      excerpt:
        "Dive deep into the world of tandoor cooking. Learn about temperature control, marination secrets, and how to achieve that perfect char on your kebabs and naan.",
      author: "Chef Rajesh Mehta",
      date: "November 15, 2024",
      category: "Techniques",
      readTime: "9 min read",
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
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stories, recipes, and insights from the heart of Indian cuisine
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden hover-lift animate-fade-in-up border-2 border-primary/20">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-hero h-64 lg:h-auto"></div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-accent text-accent-foreground">
                  Featured Post
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {blogPosts[0].date}
                  </div>
                  <Badge variant="outline">{blogPosts[0].readTime}</Badge>
                </div>
                <Button className="w-fit bg-primary hover:bg-primary/90">
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card
                key={post.title}
                className="hover-lift animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-hero h-48"></div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <Badge
                    variant="outline"
                    className="w-fit mb-3 border-primary text-primary"
                  >
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-fit p-0 h-auto font-semibold text-primary hover:text-primary/80"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get the latest recipes, cooking tips, and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
