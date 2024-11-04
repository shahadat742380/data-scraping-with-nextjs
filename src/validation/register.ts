import * as z from "zod";

// Define the registration form schema
export const userRegistrationSchema = z.object({
  user_name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  phone_number: z.string().min(10).max(16),
});
