import { Request, Response } from 'express';
import RessetPasswordService from '../../../services/RessetPasswordService';
export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPassword = new RessetPasswordService();
    await resetPassword.execute({ password, token });
    return response.status(204).json();
  }
}
