import { Router } from "express";
import { Service } from "../models/services_schema.mjs";

const router = Router();

// route to add new service
router.post("/api/services", async (request, response) => {
    try {
        const {type} = request.body

        // checking if the service type already exit in the DB 
        const findService = await Service.find({type});
        if(findService) return response.send("Service already exist");
        
        // adds new service type if it doesn't already exist
        const newService = new Service({type});
        const savedService = await newService.save();
    
        response.status(201).send("service added succesfully");
    } catch (error) {
        console.log("fail to add service", error);
        response.sendStatus(400);
    }

});

// fetch all the available services in the DB
router.get("/api/services", async (request, response) => {
    try {
        // telling mongoose to include the type field and exclude the id
        const services = await Service.find().select("type -_id")

        // map all the services into an array
        const servicesTypes = services.map((service) => service.type);
        response.status(200).send(servicesTypes);

    } catch (error) {
        console.log("fail to fetch all service types", error);
        response.sendStatus(500)
    }
});

export default router;