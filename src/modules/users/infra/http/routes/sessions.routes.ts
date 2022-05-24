import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import SessionController from '../controllers/SessionController';

const seguimentBody = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

function validateBody(): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

const sessionsRouter = Router();
const sessionController = new SessionController();
sessionsRouter.post('/', validateBody(), sessionController.create);
export default sessionsRouter;
