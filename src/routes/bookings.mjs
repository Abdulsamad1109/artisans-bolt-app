import { request, response, Router } from "express";

import { authenticateUser } from "../utils/userAuthentication.mjs";
import { Service } from "../models/services_schema.mjs";
import { Booking } from "../models/booking_schema.mjs";

const router = Router();

// route to create service request
router.post("/api/booking", authenticateUser, async (request, response) => {
    try {
        
        let {service, user, address, summary, price, date, time, status} = request.body
        user = request.user.id

    
        // checking if the service is available 
        let findService = await Service.findOne({ type: service });
        if(!findService) return response.status(404).send("service not available");
    
        // save the services request to the DB
        const newBooking = new Booking({service, user, address, summary, price, date, time, status});
        const savedBooking = await newBooking.save();
    
        response.status(200).send(savedBooking);

    } catch (error) {
        console.log("failed to book request", error);
        response.sendStatus(400);
    }
    
});


// route to get all user's bookings
router.get("/api/booking", authenticateUser, async (request, response) => {
    const userId = request.user.id
    try {
        
        const findAllUserBookings = await Booking.find({ user: userId });
        if(!findAllUserBookings || findAllUserBookings.length === 0)
            return response.status(404).send("no bookings found")
        response.status(200).send(findAllUserBookings)

    } catch (error) {
        console.log("failed to get all user's bookings", error);
        response.sendStatus(400)
    }
});



export default router