import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler, Router } from 'express';
import UserController from '../controllers/UserController';
import authenticated from '@shared/http/middlewares/authenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const seguimentBody = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

function validateBody(): RequestHandler {
  return celebrate({ [Segments.BODY]: seguimentBody });
}

const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
usersRouter.get('/', authenticated, userController.index);
usersRouter.post('/', validateBody(), userController.create);
const upload = multer(uploadConfig);
usersRouter.patch(
  '/avatar',
  authenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
