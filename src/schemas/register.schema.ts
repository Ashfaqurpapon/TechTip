import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  role: z.string(),
  password: z.string().min(6, "Must be at least 6 characters."),
  phone: z.string().regex(/^\d{11}$/, "Please enter a valid mobile number!"),
  address: z.string(),
});

export default registerValidationSchema;
