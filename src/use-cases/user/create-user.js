import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
    }

    async execute(createUserParams) {
        const postgresGetUserByEmailRepository = this.getUserByEmailRepository

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        // gerar ID do usuário
        const userId = uuidv4()

        // hash da senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // inserir usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = this.createUserRepository

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
