import { CompareFieldsValidation } from '../../presentaiton/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentaiton/helpers/validators/required-field-validation'
import type { Validation } from '../../presentaiton/helpers/validators/validation'
import { ValidationComposite } from '../../presentaiton/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentaiton/helpers/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
