import { EmailAlreadyInUseError } from '../../errors/user.js'
import { createUserSchema } from '../../schemas/index.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import { z } from 'zod'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            // retornar a resposta para o usuário (status code)
            return created(createdUser)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
