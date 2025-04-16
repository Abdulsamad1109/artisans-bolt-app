export const authenticateUser = (request, response, next) => {

    if(!request.user) return response.status(401).send("please log in to your account")
        next()
    
}