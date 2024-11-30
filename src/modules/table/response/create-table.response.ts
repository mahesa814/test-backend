import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetaSwagger } from 'src/common/swagger/response-meta.swagger';

export class TableResponse {
  id: string;
  number: number;
  capacity: number;
  status: string;
  constructor(init?: Partial<TableResponse>) {
    Object.assign(this, init);
  }
}

export class AuthResponseDtoSchemaSwagger {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;

  @ApiProperty({ type: TableResponse })
  data: TableResponse;
}
