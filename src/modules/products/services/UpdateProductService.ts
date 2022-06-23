import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.productsRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('Theere is already on product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    const redisCache = new RedisCache();
    await redisCache.invalidate(String(process.env.REDIS_KEY_TO_PRODUCTS));
    await this.productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
