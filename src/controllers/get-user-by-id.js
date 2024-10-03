import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, notFound, ok, serverError } from './helper.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(htttpRequest) {
        try {
            const isIdValid = validator.isUUID(htttpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({ message: 'Invalid id' })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                htttpRequest.params.userId,
            )

            if (!user) {
                return notFound({ message: 'User not found' })
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
