import { MissingParamError } from '../../errors'
import { type Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | null | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
