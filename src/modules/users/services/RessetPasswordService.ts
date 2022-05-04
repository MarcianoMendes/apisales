import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class RessetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User Token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.updated_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token is expired');
    }

    user.password = await hash(password, 8);
  }
}

export default RessetPasswordService;
