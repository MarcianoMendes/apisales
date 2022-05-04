import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const seguimentBody = {
  email: Joi.string().email().required(),
};

function validateBody(): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
passwordRouter.post('/forgot', validateBody(), forgotPasswordController.create);
export default passwordRouter;
