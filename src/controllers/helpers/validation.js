import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () => badRequest({ message: 'Invalid ID' })

export const checkIfIsString = (value) => typeof value === 'string'

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field]
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], { ignore_whitespace: true })
        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }

    return {
        ok: true,
        missingField: undefined,
    }
}

export const requiredFieldIsMissingResponse = (field) =>
    badRequest({ message: `${field} is required` })
