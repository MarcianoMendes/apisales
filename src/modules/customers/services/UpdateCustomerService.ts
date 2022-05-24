import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExist = await this.customersRepository.findByEmail(email);
    if (customerExist && customerExist.email == email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;
    await this.customersRepository.save(customer);
    return customer;
  }
}

export default UpdateCustomerService;
