import { request, response, Router } from "express";

import { authenticateUser } from "../utils/userAuthentication.mjs";

const router = Router();

router.post("/api/booking", authenticateUser, (request, response) => {
    const {id} = request.user.id
    const {name} = request.body
    console.log(request.user.id);
    console.log(name);
    response.sendStatus(200)
})



export default router