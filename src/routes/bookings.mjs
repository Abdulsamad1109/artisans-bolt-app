import { request, response, Router } from "express";

import { authenticateUser } from "../utils/userAuthentication.mjs";

const router = Router();

router.post("/api/booking", authenticateUser, (request, response) => {
    let {service, user, address, description, price, date, time} = request.body
    // const {id} = request.user
    // console.log(id);
    user = request.user.id
    console.log(price, user);
    response.sendStatus(200);
});



export default router