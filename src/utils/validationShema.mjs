export const userValidationShema = {
    firstName: {
        trim: true,
        isString: {
            errorMessage: "First name must be a string"
        },
        notEmpty: {
            errorMessage: "First name cannot be empty"
        }
    },

    lastName: {
        trim: true,
        isString: {
            errorMessage: "Last name must be a string"
        },
        notEmpty: {
            errorMessage: "Last name cannot be empty"
        }
    },

    email: {
        trim: true,
        isEmail: {
            errorMessage: "Must be a valid email"
        },
        notEmpty: {
            errorMessage: "Email cannot be empty"
        }
    },

    phoneNumber: {
        isNumeric: {errorMessage: "phone number can only be numbers"},
        notEmpty: {errorMessage: "phone number cannot be empty"},
        isLength: {
            options: { min: 11, max:11 },
            errorMessage: "phone number should be 11 digit"
        },
        // this checks for the nigerian network prefix
        custom: {
            options: (value) =>{
                const validPrefixes = ['070', '080', '081', '090', '091']
                const prefix = value.substring(0, 3)
                if(!validPrefixes.includes(prefix)) {
                    throw new Error('invalid nigerian number')
                }
                return true
            }
        }
    },

    password: {
        trim: true,
        isString: {
            errorMessage: "Password must be a string"
        },
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Password must be at least 5 characters" // Fixed typo: errormessage -> errorMessage
        }
    }
}



export const bookingValidationSchema = {
    
}