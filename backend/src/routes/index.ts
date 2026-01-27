import express from "express"
import userRouter from "./users/user.js";
import spaceRouter from "./spaces/space.js";

const sub_router = express.Router()

sub_router.use('/user', userRouter)
sub_router.use('/space', spaceRouter)

export default sub_router;