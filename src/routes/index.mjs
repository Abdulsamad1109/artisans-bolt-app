import { Router } from "express";
import usersRouter from "./users.mjs";
import serviceRouter from "./services.mjs";
// import authRouter from "./auth.mjs";

const router = Router();

router.use(usersRouter);
router.use(serviceRouter);
// router.use(authRouter);


export default router;