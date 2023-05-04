import { CompareFieldsValidation } from '../../presentaiton/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentaiton/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../presentaiton/helpers/validators/required-field-validation'
import type { Validation } from '../../presentaiton/helpers/validators/validation'
import { ValidationComposite } from '../../presentaiton/helpers/validators/validation-composite'
import type { EmailValidator } from '../../presentaiton/protocols/emailValidator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentaiton/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
