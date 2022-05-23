import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const key: string = process.env.REDIS_KEY_TO_PRODUCTS!;
    let products = await redisCache.recover<Product[]>(key);

    if (!products) {
      products = await productsRepository.find();
      await redisCache.save(key, products);
    }

    return products;
  }
}

export default ListProductService;
