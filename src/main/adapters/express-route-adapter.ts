import type { Request, Response } from 'express'
import type { Controller, HttpRequest } from '../../presentaiton/protocols'

export const adaptRoute = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const { statusCode, body } = await controller.handle(httpRequest)
    res.status(statusCode).json(body)
  }
}
