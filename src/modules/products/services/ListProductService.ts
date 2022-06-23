import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProductPaginate } from '../domain/models/IProductPaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IProductPaginate> {
    const redisCache = new RedisCache();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const key: string = process.env.REDIS_KEY_TO_PRODUCTS!;
    let products = await redisCache.recover<IProductPaginate>(key);
    if (!products) {
      const take = limit;
      const skip = (Number(page) - 1) * take;
      products = await this.productsRepository.findAll({
        page,
        skip,
        take,
      });

      await redisCache.save(key, products);
    }

    return products;
  }
}

export default ListProductService;
