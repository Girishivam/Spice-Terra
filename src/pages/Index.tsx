import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import BookingCTA from "@/components/BookingCTA";
import TestimonialsPreview from "@/components/TestimonialsPreview";
import { useMetaTags } from "@/hooks/use-meta-tags";

const Index = () => {
  useMetaTags({
    title: "Spice terra | Authentic Indian Restaurant",
    description:
      "Experience authentic Indian cuisine at Spice Terra. Dine in, book a table, or order online for delivery.",
  });
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <BookingCTA />
      <TestimonialsPreview />
      <Footer />
    </div>
  );
};

export default Index;
