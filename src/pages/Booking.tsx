import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Check, Users, Calendar as CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useMetaTags } from "@/hooks/use-meta-tags";

const Booking = () => {
  useMetaTags({
    title: "Book a Table | Spice Terra",
    description:
      "Reserve your table at Spice Terra. Quick and easy booking in just a few steps.",
  });

  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  
  const { formData, errors, touched, handleChange, handleBlur, isValid, resetForm } = useFormValidation(
    {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
    {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: "email" },
      phone: { required: true, pattern: "phone" },
      specialRequests: {},
    }
  );

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "6:00 PM",
    "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
    "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
  ];

  const handleSubmit = () => {
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in your form.",
        variant: "destructive",
      });
      return;
    }

    setStep(5);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-12">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              step >= s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > s ? <Check className="w-5 h-5" /> : s}
          </div>
          {s < 4 && (
            <div
              className={`w-16 h-1 transition-colors ${
                step > s ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
                Reserve Your Table
              </h1>
              <p className="text-xl text-muted-foreground">
                Book your dining experience in just a few steps
              </p>
            </div>

            {step < 5 && <StepIndicator />}

            {/* Step 1: Guest Count */}
            {step === 1 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Number of Guests</h2>
                    <p className="text-muted-foreground">
                      How many people will be joining?
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-6 mb-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-12 h-12 text-2xl"
                    >
                      -
                    </Button>
                    <div className="text-5xl font-bold text-primary w-24 text-center">
                      {guests}
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      className="w-12 h-12 text-2xl"
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Date Selection */}
            {step === 2 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <CalendarIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Select Date</h2>
                    <p className="text-muted-foreground">
                      Choose your preferred dining date
                    </p>
                  </div>

                  <div className="flex justify-center mb-8">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      size="lg"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => date && setStep(3)}
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={!date}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Time Selection */}
            {step === 3 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Select Time</h2>
                    <p className="text-muted-foreground">
                      Pick your preferred dining time
                    </p>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={time === slot ? "default" : "outline"}
                        onClick={() => setTime(slot)}
                        className={
                          time === slot
                            ? "bg-primary hover:bg-primary/90"
                            : "hover:border-primary"
                        }
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      size="lg"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => time && setStep(4)}
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={!time}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Contact Details */}
            {step === 4 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Your Details</h2>
                    <p className="text-muted-foreground">
                      Please provide your contact information
                    </p>
                  </div>

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
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? "border-red-500" : ""}
                      />
                      {errors.email && touched.email && (
                        <div className="flex items-center mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
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
                        Special Requests (Optional)
                      </label>
                      <Input
                        name="specialRequests"
                        placeholder="Dietary restrictions, celebrations, etc."
                        value={formData.specialRequests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(3)}
                      size="lg"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!isValid}
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Reservation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <Card className="animate-fade-in-up border-primary">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Reservation Confirmed!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for choosing Spice Terra. We look forward to
                    serving you!
                  </p>

                  <div className="bg-muted rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-bold text-lg mb-4">
                      Booking Summary:
                    </h3>
                    <div className="space-y-3">
                      <p>
                        <span className="font-medium">Guests:</span> {guests}{" "}
                        people
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {date?.toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span> {time}
                      </p>
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {formData.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {formData.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {formData.phone}
                      </p>
                      {formData.specialRequests && (
                        <p>
                          <span className="font-medium">Special Requests:</span>{" "}
                          {formData.specialRequests}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    A confirmation email has been sent to {formData.email}
                  </p>

                  <Button
                    onClick={() => {
                      setStep(1);
                      setGuests(2);
                      setDate(undefined);
                      setTime("");
                      resetForm();
                    }}
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Make Another Reservation
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

export default Booking;
