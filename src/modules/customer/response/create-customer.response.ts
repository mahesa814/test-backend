import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetaSwagger } from 'src/common/swagger/response-meta.swagger';

export class CustomerResponse {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  constructor(init?: Partial<CustomerResponse>) {
    Object.assign(this, init);
  }
}

export class AuthResponseDtoSchemaSwagger {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;

  @ApiProperty({ type: CustomerResponse })
  data: CustomerResponse;
}
