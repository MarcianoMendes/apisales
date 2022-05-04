import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordControler';

const seguimentBodyForgot = {
  email: Joi.string().email().required(),
};

function validateBody(seguimentBody: object): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
passwordRouter.post(
  '/forgot',
  validateBody(seguimentBodyForgot),
  forgotPasswordController.create,
);

const seguimentBodyReset = {
  token: Joi.string().uuid().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.string().required().valid(Joi.ref('password')),
};

const resetPasswordController = new ResetPasswordController();
passwordRouter.post(
  '/reset',
  validateBody(seguimentBodyReset),
  resetPasswordController.create,
);
export default passwordRouter;
