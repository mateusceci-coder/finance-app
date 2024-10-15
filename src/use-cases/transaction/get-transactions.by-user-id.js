import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionsByUserIdUseCase {
    constuctor(getTransactionByUserIdRepository, getUserByIdRepository) {
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        //validar se o usuário existe
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        //chamar o repository
        const transactions =
            await this.getTransactionByUserIdRepository.execute(params.userId)

        return transactions
    }
}
