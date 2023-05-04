import { MissingParamError } from '../../errors'
import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidaiton = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null | undefined {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidaiton()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  it('Should return an error if any validations fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError(('field')))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError(('field')))
  })
})
