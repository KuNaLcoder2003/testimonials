import express from "express"
import userRouter from "./users/user.js";
import spaceRouter from "./spaces/space.js";
import testiMonialRouter from "./testimonials/testimonials.js";

const sub_router = express.Router()

sub_router.use('/user', userRouter)
sub_router.use('/space', spaceRouter)
sub_router.use('/testimonial', testiMonialRouter)

export default sub_router;