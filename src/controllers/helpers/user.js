import { badRequest, notFound } from './http.js'
import validator from 'validator'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must have at least 6 characters',
    })

export const emailAlreadyInUseResponse = () =>
    badRequest({
        message: 'Email already in use',
    })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const userNotFoundResponse = () =>
    notFound({ message: 'User not found' })
