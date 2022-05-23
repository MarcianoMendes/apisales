import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    const redisCache = new RedisCache();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await redisCache.invalidate(process.env.REDIS_KEY_TO_PRODUCTS!);
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
