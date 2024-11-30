import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/database/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}
  create(customer: CreateCustomerDto): Promise<Customers> {
    const newCustomer = this.customersRepository.create(customer);
    return this.customersRepository.save(newCustomer);
  }
  findAll(): Promise<Customers[]> {
    return this.customersRepository.find();
  }

  findOne(id: string): Promise<Customers> {
    return this.customersRepository.findOneBy({ id: id });
  }
  async update(id: string, customer: CreateCustomerDto): Promise<Customers> {
    await this.customersRepository.update(id, customer);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
