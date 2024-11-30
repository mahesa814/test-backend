import { z } from 'zod';

export const CreateReservationDtoSchema = z.object({
  customer_id: z.string().nonempty('Customer Id Required'),
  table_id: z.string().nonempty('Table Id Required'),
  reservation_time: z.string().nonempty('Reservation Time Required').datetime(),
  number_of_guests: z.number().nonnegative('Number of Guests Required'),
});

export type CreateReservationDto = z.infer<typeof CreateReservationDtoSchema>;
