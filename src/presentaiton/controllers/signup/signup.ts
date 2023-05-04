import type { HttpRequest, HttpResponse, Controller, AddAccount, Validation } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, password, email } = httpRequest.body
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
