import { type Validation } from './validation'

export class ValidationComposite implements Validation {
  private readonly validations
  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error | null | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
