
import { RequiredFieldValidation } from '../../presentaiton/helpers/validators/required-field-validation'
import type { Validation } from '../../presentaiton/helpers/validators/validation'
import { ValidationComposite } from '../../presentaiton/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
