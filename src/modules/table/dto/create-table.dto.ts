import { z } from 'zod';

export const CreateTableDtoSchema = z.object({
  number: z.number().min(1, 'Number is required'),
  capacity: z.number().min(1, 'capacity is required'),
});

export type CreateTableDto = z.infer<typeof CreateTableDtoSchema>;
