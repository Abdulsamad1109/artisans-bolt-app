import { Router } from "express";
import { Service } from "../models/services_schema.mjs";

const router = Router();


// route to add new service
router.post("/api/services", async (request, response) => {
    try {
        const {type} = request.body
        console.log({type});
        const newService = new Service({type});
        const savedService = await newService.save();
    
        response.status(201).send(savedService);
    } catch (error) {
        console.log("fail to add service", error);
        response.sendStatus(400);
    }

});

// fetch all the available services
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