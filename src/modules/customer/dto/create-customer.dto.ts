import { z } from 'zod';

export const CreateCustomerDtoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .nonempty('Name is required'),
  email: z.string().email().nonempty('Email is required'),
  phone_number: z.string().nonempty('Phone number is required'),
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerDtoSchema>;
