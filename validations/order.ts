import { z } from "zod";

const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        book: z.string().min(1, "Book ID is required"),
        quantity: z.coerce
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
        price: z.coerce.number().positive("Price must be positive"),
      })
    )
    .min(1, "At least one item is required"),
  status: z.enum(["Processing", "Shipped", "Delivered", "Cancelled"]),
  paymentStatus: z.enum(["Pending", "Paid", "Refunded"]),
  paymentMethod: z.string().min(1, "Payment method is required"),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  timeline: z
    .array(
      z.object({
        status: z.string().min(1, "Status is required"),
        date: z.string().min(1, "Date is required"),
        description: z.string().min(1, "Description is required"),
      })
    )
    .optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
