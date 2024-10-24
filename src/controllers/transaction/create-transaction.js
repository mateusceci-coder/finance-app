import { createTransactionSchema } from '../../schemas/index.js'
import { badRequest, created } from '../helpers/index.js'
import { z } from 'zod'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createTransactionSchema.parseAsync(params)

            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created(transaction)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            console.error(error)
        }
    }
}
