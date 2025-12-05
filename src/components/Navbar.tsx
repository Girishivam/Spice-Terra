import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Gallery", path: "/gallery" },
    { name: "Offers", path: "/offers" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Determine if navbar is over hero (transparent) so text should be light for contrast
  const isTransparent = !isScrolled && location.pathname === "/";

  // Menu animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.05,
      },
    }),
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" data-scroll-top className="flex items-center space-x-2">
            <div className="text-2xl md:text-3xl font-bold text-gradient">
              Spice Terra
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-scroll-top
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? isTransparent
                      ? "text-white"
                      : "text-primary"
                    : isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Booking button: solid but translucent on transparent navbar for contrast */}
            <Button
              asChild
              className={`${isTransparent ? "bg-white/20 text-white backdrop-blur-sm border-white/20" : "bg-primary hover:bg-primary/90 text-white"}`}
            >
              <Link to="/booking" data-scroll-top>Book Table</Link>
            </Button>

            {/* Order button: show solid translucent on transparent navbar, outline on normal */}
            {isTransparent ? (
              <Button
                asChild
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Link to="/order" data-scroll-top>Order Online</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/order" data-scroll-top>Order Online</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground z-[120]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Backdrop rendered in portal to avoid stacking context issues */}
      {typeof document !== "undefined" && isMobileMenuOpen
        ? createPortal(
            <AnimatePresence>
              <>
                {/* Backdrop (clicking it closes the menu) */}
                <motion.div
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40 pointer-events-auto"
                />

                {/* Mobile Menu Slide rendered above navbar */}
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-20 right-0 bottom-0 w-full max-w-xs bg-background shadow-2xl lg:hidden z-[140] overflow-y-auto pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 space-y-4 relative">
                    {/* Internal close button */}
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Close menu"
                      className="absolute top-4 right-4 p-2 rounded-md bg-muted hover:bg-muted/80"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="space-y-1">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.path}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            to={link.path}
                            data-scroll-top
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              isActive(link.path)
                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                : "text-foreground hover:bg-secondary"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      custom={navLinks.length}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="h-px bg-border my-4"
                    />

                    <motion.div
                      custom={navLinks.length + 1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 mb-3">
                        <Link to="/booking" data-scroll-top onClick={() => setIsMobileMenuOpen(false)}>
                          Book Table
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      custom={navLinks.length + 2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Link to="/order" data-scroll-top onClick={() => setIsMobileMenuOpen(false)}>
                          Order Online
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            </AnimatePresence>,
            document.body,
          )
        : null}
    </nav>
  );
};

export default Navbar;
