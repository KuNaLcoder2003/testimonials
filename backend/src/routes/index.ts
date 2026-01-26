import express from "express"
import userRouter from "./users/user.js";

const sub_router = express.Router()

sub_router.use('/user', userRouter)
export default sub_router;