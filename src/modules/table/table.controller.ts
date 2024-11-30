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
import { TableService } from './table.service';
import { CreateTableDto, CreateTableDtoSchema } from './dto/create-table.dto';
import { TableResponse } from './response/create-table.response';

@Controller('api/table')
@ApiTags('Table')
export class TableController {
  constructor(private readonly tablesService: TableService) {}

  @Post('/')
  @ApiResponse({})
  @UsePipes(new ZodValidationPipe(CreateTableDtoSchema))
  @ApiBody({ schema: zodToOpenAPI(CreateTableDtoSchema) })
  async create(@Body() request: CreateTableDto) {
    try {
      const table = await this.tablesService.create(request);
      return new TableResponse(table);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('/:id')
  @ApiResponse({})
  @UsePipes(new ZodValidationPipe(CreateTableDtoSchema))
  @ApiBody({ schema: zodToOpenAPI(CreateTableDtoSchema) })
  async update(@Param('id') id: string, @Body() request: CreateTableDto) {
    try {
      const table = await this.tablesService.update(id, request);
      return new TableResponse(table);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of tables retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getList() {
    try {
      const tables = await this.tablesService.findAll();
      return tables.map((table) => new TableResponse(table));
    } catch (error) {
      throw new HttpException(
        `Could not retrieve tables : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Customer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async delete(@Param('id') id: string) {
    try {
      await this.tablesService.remove(id);
      return { message: 'Customer deleted successfully.' };
    } catch (error) {
      throw new HttpException(
        `Customer not found : ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
