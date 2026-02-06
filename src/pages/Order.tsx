import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, Trash2, Check, AlertCircle } from "lucide-react";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useCart } from "@/contexts/CartContext";
import toastNotifications from "@/lib/toast-notifications";
import butterChicken from "@/assets/dish-butter-chicken.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import naan from "@/assets/dish-naan.jpg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Order = () => {
  useMetaTags({
    title: "Order Online | Spice terra",
    description:
      "Order your favorite authentic Indian dishes online for delivery to your doorstep.",
  });

  const { cart: contextCart, addToCart: addToContextCart, removeFromCart: removeFromContextCart, updateQuantity: updateContextQuantity, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<CartItem[]>(contextCart);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { formData, errors, touched, handleChange, handleBlur, isValid, resetForm } = useFormValidation(
    {
      name: "",
      phone: "",
      address: "",
      instructions: "",
    },
    {
      name: { required: true, minLength: 2 },
      phone: { required: true, pattern: "phone" },
      address: { required: true, minLength: 5 },
      instructions: {},
    }
  );

  const categories = ["All", "Starters", "Main Course", "Breads", "Desserts"];

  const menuItems = [
    {
      id: 1,
      category: "Main Course",
      name: "Butter Chicken",
      price: 450,
      image: butterChicken,
    },
    {
      id: 2,
      category: "Main Course",
      name: "Chicken Biryani",
      price: 480,
      image: biryani,
    },
    { id: 3, category: "Breads", name: "Garlic Naan", price: 120, image: naan },
    { id: 4, category: "Main Course", name: "Dal Makhani", price: 320, image: butterChicken },
    { id: 5, category: "Starters", name: "Paneer Tikka", price: 280, image: naan },
    { id: 6, category: "Desserts", name: "Gulab Jamun", price: 150, image: biryani },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (item: typeof menuItems[0]) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      const newQuantity = existing.quantity + 1;
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        )
      );
      addToContextCart({ ...item, quantity: newQuantity });
      toastNotifications.cartUpdated(item.name, newQuantity);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      addToContextCart({ ...item, quantity: 1 });
      toastNotifications.cartAdded(item.name, 1);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    
    const newQuantity = Math.max(0, item.quantity + delta);
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((i) =>
          i.id === id ? { ...i, quantity: newQuantity } : i
        )
      );
      updateContextQuantity(id, newQuantity);
    }
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    setCart(cart.filter((item) => item.id !== id));
    removeFromContextCart(id);
    if (item) {
      toastNotifications.cartRemoved(item.name);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!isValid) {
      toastNotifications.error("Validation Error", "Please correct the errors in your form.");
      return;
    }
    toastNotifications.orderConfirmed(`SPT-${Math.floor(Math.random() * 10000)}`);
    setStep(4);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
                Order Online
              </h1>
              <p className="text-xl text-muted-foreground">
                Enjoy authentic flavors delivered to your doorstep
              </p>
            </div>

            {/* Step 1: Browse Menu */}
            {step === 1 && (
              <>
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-primary hover:bg-primary/90"
                          : ""
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="hover-lift">
                      <CardContent className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">
                            ₹{item.price}
                          </span>
                          <Button
                            onClick={() => addToCart(item)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Cart Summary Bar */}
                {cart.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 shadow-lg z-40">
                    <div className="container mx-auto flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                          items in cart
                        </p>
                        <p className="text-sm opacity-90">Total: ₹{total}</p>
                      </div>
                      <Button
                        onClick={() => setStep(2)}
                        variant="secondary"
                        size="lg"
                        className="font-semibold"
                      >
                        View Cart <ShoppingCart className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Cart Review */}
            {step === 2 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Your cart is empty
                      </p>
                      <Button onClick={() => setStep(1)} variant="outline">
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-8">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 p-4 bg-muted rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-primary font-semibold">
                                ₹{item.price}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="font-bold w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-6 mb-6">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total:</span>
                          <span className="text-primary">₹{total}</span>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setStep(1)}
                          size="lg"
                          className="flex-1"
                        >
                          Continue Shopping
                        </Button>
                        <Button
                          onClick={() => setStep(3)}
                          size="lg"
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Checkout */}
            {step === 3 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Delivery Details</h2>

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.name && touched.name ? "border-red-500" : ""}
                      />
                      {errors.name && touched.name && (
                        <div className="flex items-center mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phone && touched.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && touched.phone && (
                        <div className="flex items-center mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Delivery Address *
                      </label>
                      <Input
                        name="address"
                        placeholder="Full address with landmark"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.address && touched.address ? "border-red-500" : ""}
                      />
                      {errors.address && touched.address && (
                        <div className="flex items-center mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.address}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Delivery Instructions (Optional)
                      </label>
                      <Input
                        name="instructions"
                        placeholder="E.g., Ring the doorbell twice"
                        value={formData.instructions}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      size="lg"
                      className="flex-1"
                    >
                      Back to Cart
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <Card className="animate-fade-in-up border-primary">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Your delicious meal is on its way!
                  </p>

                  <div className="bg-muted rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-bold text-lg mb-4">Order Details:</h3>
                    <div className="space-y-3">
                      <p>
                        <span className="font-medium">Order ID:</span> #
                        {Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </p>
                      <p>
                        <span className="font-medium">Delivery to:</span>{" "}
                        {formData.name}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {formData.address}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {formData.phone}
                      </p>
                      <p>
                        <span className="font-medium">Total Amount:</span> ₹
                        {total}
                      </p>
                      <p>
                        <span className="font-medium">Est. Delivery:</span> 30-40
                        minutes
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setStep(1);
                      setCart([]);
                      clearCart();
                      resetForm();
                    }}
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Order Again
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Order;
