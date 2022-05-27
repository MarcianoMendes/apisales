import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
// import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.customersRepository.findAll();
    return <ICustomer[]>customers;
  }

  // public async execute(): Promise<ICustomerPaginate> {
  //   const customers = await this.customersRepository.findAllPaginate();

  //   return customers;
  // }
}

export default ListCustomerService;
