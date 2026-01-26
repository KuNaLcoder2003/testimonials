import express from "express"
import cors from "cors"
import sub_router from "./routes/index.js"
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/v1', sub_router)

app.listen(8000, () => {
    console.log('App started at port : 8000')
})