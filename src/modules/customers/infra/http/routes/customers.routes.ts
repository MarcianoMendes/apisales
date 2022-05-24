import authenticated from '@shared/infra/http/middlewares/authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import CustomerController from '../controllers/CustomerController';

const seguimentParams = {
  id: Joi.string().uuid().required(),
};

const seguimentBody = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
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

const customersRouter = Router();
const customerController = new CustomerController();
customersRouter.use(authenticated);
customersRouter.get('/', customerController.index);
customersRouter.get('/:id', validateParams(), customerController.show);
customersRouter.post('/', validateBody(), customerController.create);
customersRouter.put('/:id', validateParamsAndBody(), customerController.update);
customersRouter.delete('/:id', validateParams(), customerController.delete);

export default customersRouter;
