import { EmailValidation } from '../../../presentaiton/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentaiton/helpers/validators/required-field-validation'
import type { Validation } from '../../../presentaiton/helpers/validators/validation'
import { ValidationComposite } from '../../../presentaiton/helpers/validators/validation-composite'
import type { EmailValidator } from '../../../presentaiton/protocols/emailValidator'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentaiton/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Login Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
