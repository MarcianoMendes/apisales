import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeUserRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepositories';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'marciano mendes',
      email: 'marciano.mendes@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
