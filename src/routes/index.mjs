import { Router } from "express";
import usersRouter from "./users.mjs";
import serviceRouter from "./services.mjs";
import bookingRouter from "./bookings.mjs";
import changePasswordRouter from "./changePassword.mjs";
import resetPassswordRouter from "./resetPassword.mjs";
// import authRouter from "./auth.mjs";

const router = Router();

router.use(usersRouter);
router.use(serviceRouter);
router.use(bookingRouter);
router.use(changePasswordRouter);
router.use(resetPassswordRouter);
// router.use(authRouter);


export default router;