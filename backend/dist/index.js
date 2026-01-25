import express from "express";
import cors from "cors";
const app = express();
import prisma from "./prisma.js";
app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
    const response = await prisma.space.findMany({});
    res.status(200).json({
        response
    });
});
app.listen(8000, () => {
    console.log('App started at port : 8000');
});
//# sourceMappingURL=index.js.map