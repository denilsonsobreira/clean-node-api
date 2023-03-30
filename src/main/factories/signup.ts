import { DBAddAccount } from '../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentaiton/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DBAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}