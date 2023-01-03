import express, { application }  from "express"
import dotenv  from "dotenv"
import cors  from "cors"
import connect from "./Connections/mongoos.connection.js"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary" 
import bodyParser from "body-parser"
import "./Connections/Cloudinary.connection.js"


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})


const app = express()
dotenv.config()


import  AuthRouter  from "./routes/AuthRouter.js"
import UserRouter from "./routes/user.js"
import PostRouter from "./routes/PostRouter.js"
import ChatRouter from "./routes/Chat.Router.js"

app.use(express.json())
app.use(bodyParser({extends:true}))

app.use(cookieParser("dsafhaskdfjsdaklfjsklafjsdfgggsffgsdfddfgdgf"))

app.use(cors({credentials:true,origin:"http://localhost:3000"}))


app.listen(process.env.PORT,() => {
    connect()
    console.log("Backend connection successfully")
    console.log(`server running in ${process.env.PORT}`)
})



app.use("/auth",AuthRouter)
app.use("/user",UserRouter)
app.use("/post",PostRouter)
app.use("/chat",ChatRouter)
