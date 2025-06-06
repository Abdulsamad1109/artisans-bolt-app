export const userValidationShema = {
    firstName: {
        isString: true,
        notEmpty: { errorMessage: "firstname cannot be empty" }
    },
    lastName: {
        isString: true,
        notEmpty: { errorMessage: "lastname cannot be empty" }
    },
    email: {
        isEmail: true,
        notEmpty: { errorMessage: "email cannot be empty" }
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
        isString: true,
        isLength: {
            options: { min: 5 },
            errormessage: "password must be at least 5 characters"
        }
    }
}



export const bookingValidationSchema = {
    
}