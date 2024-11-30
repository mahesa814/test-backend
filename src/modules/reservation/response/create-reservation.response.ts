import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetaSwagger } from 'src/common/swagger/response-meta.swagger';
import { Customers } from 'src/database/entities/customer.entity';
import { Tables } from 'src/database/entities/table.entity';

export class ReservationResponse {
  id: string;
  reservation_time: Date;
  number_of_guests: number;
  customer: Customers;
  table: Tables;
  constructor(init?: Partial<ReservationResponse>) {
    Object.assign(this, init);
  }
}

export class AuthResponseDtoSchemaSwagger {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;

  @ApiProperty({ type: ReservationResponse })
  data: ReservationResponse;
}
