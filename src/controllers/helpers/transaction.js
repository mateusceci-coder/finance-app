import validator from 'validator'
import { badRequest } from './http'

export const checkIfAmountIsValid = (amount) =>
    validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })

export const checkIfTypeIsValid = (type) =>
    ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)

export const invalidAmountResponse = () =>
    badRequest({ message: 'Amount is invalid' })

export const invalidTypeResponse = () =>
    badRequest({
        message: `Type must be EARNING, EXPENSE or INVESTMENT`,
    })
