import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import type { HttpRequest, HttpResponse, Controller, Authentication, Validation } from './login-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation
  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) return unauthorized()

      return ok({
        accessToken
      })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
