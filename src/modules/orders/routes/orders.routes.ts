import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import OrderController from '../controllers/OrderController';

const seguimentParams = {
  id: Joi.string().uuid().required(),
};

const seguimentBody = {
  customer_id: Joi.string().uuid().required(),
  products: Joi.required(),
};

function validateParams(): RequestHandler {
  return celebrate({ [Segments.PARAMS]: seguimentParams });
}

function validateBody(): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

const ordersRouter = Router();
const orderController = new OrderController();
ordersRouter.get('/:id', validateParams(), orderController.show);
ordersRouter.post('/', validateBody(), orderController.create);

export default ordersRouter;
