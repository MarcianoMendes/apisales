import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrderController';
import isAuthenticated from '@shared/infra/http/middlewares/authenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();
ordersRouter.use(isAuthenticated);

ordersRouter.get('/', ordersController.index);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
