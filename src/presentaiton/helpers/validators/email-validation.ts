import { InvalidParamError } from '../../errors'
import type { EmailValidator } from '../../protocols/emailValidator'
import type { Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly fieldName
  private readonly emailValidator: EmailValidator
  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null | undefined {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
  }
}
