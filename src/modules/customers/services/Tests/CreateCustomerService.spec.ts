import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomerRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepositories';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new custumer', async () => {
    const customer = await createCustomer.execute({
      name: 'marciano mendes',
      email: 'marciano.mendes@hotmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'marciano mendes',
      email: 'marciano@hotmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'marciano mendes',
        email: 'marciano@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
