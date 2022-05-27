import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RessetPasswordService from '../../../services/RessetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPassword = container.resolve(RessetPasswordService);
    await resetPassword.execute({ password, token });
    return response.status(204).json();
  }
}

export default ResetPasswordController;
