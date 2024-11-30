import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tables } from 'src/database/entities/table.entity';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Tables)
    private readonly tablesRepository: Repository<Tables>,
  ) {}
  create(table: CreateTableDto): Promise<Tables> {
    const newTable = this.tablesRepository.create(table);
    return this.tablesRepository.save(newTable);
  }
  findAll(): Promise<Tables[]> {
    return this.tablesRepository.find();
  }

  findOne(id: string): Promise<Tables> {
    return this.tablesRepository.findOneBy({ id: id });
  }
  async update(id: string, table: CreateTableDto): Promise<Tables> {
    await this.tablesRepository.update(id, table);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.tablesRepository.delete(id);
  }
}
