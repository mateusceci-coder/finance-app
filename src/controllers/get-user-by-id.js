import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { notFound, ok, serverError } from './helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(htttpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(htttpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
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
