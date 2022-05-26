import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomerRepository implements ICustomersRepository {
  private customers: Customer[];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const custumer = new Customer();
    custumer.id = uuidv4();
    custumer.name = name;
    custumer.email = email;
    return custumer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id == customer.id,
    );

    this.customers[findIndex] = customer;
    return customer;
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(customer: Customer): Promise<void> {}

  public async findAllPaginate(): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.name == name);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.id == id);
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers?.find(customer => customer.email == email);
  }
}

export default FakeCustomerRepository;
