import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Get,
  Delete,
  UsePipes,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod2';
import {
  CreateCustomerDto,
  CreateCustomerDtoSchema,
} from './dto/create-customer.dto';
import { CustomerResponse } from './response/create-customer.response';
import { CustomerService } from './customer.service';

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
  @Put('/:id')
  @ApiResponse({})
  @UsePipes(new ZodValidationPipe(CreateCustomerDtoSchema))
  @ApiBody({ schema: zodToOpenAPI(CreateCustomerDtoSchema) })
  async update(@Param('id') id: string, @Body() request: CreateCustomerDto) {
    try {
      const customer = await this.customersService.update(id, request);
      return new CustomerResponse(customer);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of customers retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getList() {
    try {
      const customers = await this.customersService.findAll();
      return customers.map((customer) => new CustomerResponse(customer));
    } catch (error) {
      throw new HttpException(
        `Could not retrieve customers : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Customer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async delete(@Param('id') id: string) {
    try {
      await this.customersService.remove(id);
      return { message: 'Customer deleted successfully.' };
    } catch (error) {
      throw new HttpException(
        `Customer not found : ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
