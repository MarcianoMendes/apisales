import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import ProductController from '../controllers/ProductController';
import authenticated from '@shared/http/middlewares/authenticated';

const seguimentParams = {
  id: Joi.string().uuid().required(),
};

const seguimentBody = {
  name: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  quantity: Joi.number().required(),
};

function validateParams(): RequestHandler {
  return celebrate({ [Segments.PARAMS]: seguimentParams });
}

function validateBody(): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

function validateParamsAndBody(): RequestHandler {
  return celebrate({
    [Segments.PARAMS]: seguimentParams,
    [Segments.BODY]: seguimentBody,
  });
}

const productsRouter = Router();
productsRouter.use(authenticated);
const productController = new ProductController();
productsRouter.get('/', productController.index);
productsRouter.get('/:id', validateParams(), productController.show);
productsRouter.post('/', validateBody(), productController.create);
productsRouter.put('/:id', validateParamsAndBody(), productController.update);
productsRouter.delete('/:id', validateParams(), productController.delete);

export default productsRouter;
