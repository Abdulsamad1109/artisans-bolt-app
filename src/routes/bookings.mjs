import { request, response, Router } from "express";

import { authenticateUser } from "../utils/userAuthentication.mjs";
import { Service } from "../models/services_schema.mjs";
import { Booking } from "../models/booking_schema.mjs";

const router = Router();

// route to create service request
router.post("/api/booking", authenticateUser, async (request, response) => {
    try {
        
        let {service, user, address, summary, price, date, time, status} = request.body
        const {id} = request.user
        user = request.user.id
        console.log(price, user, service);
    
        // find the service ID
        let findServiceId = await Service.findOne({ type: service });
        if(!findServiceId) return response.status(404).send("service not available");
        service = findServiceId._id
    
        // save the services request to the DB
        const newBooking = new Booking({service, user, address, summary, price, date, time, status})
        const savedBooking = await newBooking.save()
    
        response.status(200).send(savedBooking) 

    } catch (error) {
        console.log("failed to book request", error)
        response.sendStatus(400)
    }
    
});



export default router