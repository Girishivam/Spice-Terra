import { toast } from "sonner";

export const toastNotifications = {
  // Success notifications
  success: (message: string, description?: string) => {
    toast.success(message, {
      description: description,
      duration: 4000,
    });
  },

  // Error notifications
  error: (message: string, description?: string) => {
    toast.error(message, {
      description: description,
      duration: 4000,
    });
  },

  // Info notifications
  info: (message: string, description?: string) => {
    toast.info(message, {
      description: description,
      duration: 3000,
    });
  },

  // Cart specific notifications
  cartAdded: (itemName: string, quantity: number = 1) => {
    toast.success(`Added to cart`, {
      description: `${quantity}x ${itemName} added successfully`,
      duration: 3000,
    });
  },

  cartRemoved: (itemName: string) => {
    toast.error(`Removed from cart`, {
      description: `${itemName} has been removed`,
      duration: 3000,
    });
  },

  cartUpdated: (itemName: string, quantity: number) => {
    toast.info(`Updated cart`, {
      description: `${itemName} quantity updated to ${quantity}`,
      duration: 2000,
    });
  },

  // Form specific notifications
  formValidationError: (fieldName: string) => {
    toast.error(`Invalid ${fieldName}`, {
      description: `Please check your ${fieldName} and try again`,
      duration: 3000,
    });
  },

  // Order specific notifications
  orderConfirmed: (orderNumber?: string) => {
    toast.success(`Order Confirmed!`, {
      description: orderNumber
        ? `Order #${orderNumber} has been placed successfully`
        : `Your order has been placed successfully`,
      duration: 5000,
    });
  },

  orderPending: (estimatedTime?: string) => {
    toast.info(`Order Received`, {
      description: estimatedTime
        ? `Estimated delivery: ${estimatedTime}`
        : `Your order is being prepared`,
      duration: 4000,
    });
  },

  bookingConfirmed: (date?: string, time?: string) => {
    toast.success(`Booking Confirmed!`, {
      description: date && time ? `Reservation for ${date} at ${time}` : `Your booking has been confirmed`,
      duration: 4000,
    });
  },

  // Generic notifications
  loading: (message: string) => {
    return toast.loading(message, { duration: Infinity });
  },

  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  },

  promise: (
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },
};

export default toastNotifications;
