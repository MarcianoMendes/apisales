import { celebrate, Joi, Segments } from 'celebrate';
import { Router, RequestHandler } from 'express';
import authenticated from '@shared/http/middlewares/authenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(authenticated);

const seguimentBody = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  old_password: Joi.string(),
  password: Joi.string().optional(),
  password_confirmation: Joi.string()
    .valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
};

function validateBody(): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

profileRouter.get('/', profileController.show);
profileRouter.put('/', validateBody(), profileController.update);

export default profileRouter;
