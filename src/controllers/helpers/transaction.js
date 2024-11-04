import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== 'number') {
        return false
    }
    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkIfTypeIsValid = (type) =>
    ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)

export const invalidAmountResponse = () =>
    badRequest({ message: 'Amount is invalid' })

export const invalidTypeResponse = () =>
    badRequest({
        message: `Type must be EARNING, EXPENSE or INVESTMENT`,
    })

export const invalidTransactionResponse = () =>
    badRequest({
        message: 'Transaction not found',
    })
