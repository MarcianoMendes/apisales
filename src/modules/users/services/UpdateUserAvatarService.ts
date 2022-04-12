import AppError from '@shared/errors/AppError';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload';

interface IRequest {
  id: string;
  avatar: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({ id, avatar }: IRequest): Promise<User> {
    const UsersRepository = getCustomRepository(UserRepository);
    const user = await UsersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    if (avatar != undefined) {
      user.avatar = avatar;
    }

    await UsersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
