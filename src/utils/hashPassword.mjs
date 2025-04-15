import bcrypt from "bcrypt"

export const hashpassword = (password) => {
    // Generate salt
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export const comparePassword = (plain, hashed) =>{
    return bcrypt.compareSync(plain, hashed)
}