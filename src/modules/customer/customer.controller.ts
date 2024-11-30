import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  CreateCustomerDtoSchema,
} from './dto/create-customer.dto';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod2';
import { CustomerResponse } from './response/create-customer.response';

@Controller('api/customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Post('/')
  @ApiResponse({})
  @UsePipes(new ZodValidationPipe(CreateCustomerDtoSchema))
  @ApiBody({ schema: zodToOpenAPI(CreateCustomerDtoSchema) })
  async create(@Body() request: CreateCustomerDto) {
    try {
      const customer = await this.customersService.create(request);
      return new CustomerResponse(customer);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
