import express  from "express"
import dotenv  from "dotenv"
import cors  from "cors"
import mongoose  from "mongoose"


dotenv.config();

const app = express()
dotenv.config()

import  AuthRouter  from "./routes/AuthRouter.js"

app.use(express.json())

const connect = async ()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URL)
      console.log("mongodb connection successfully");
    } catch (err){
        console.log(err);
        throw(err)
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected");
})


app.listen(process.env.PORT,() => {
    connect()
    console.log("Backend connection successfully")
    console.log(`server running in ${process.env.PORT}`)
})

app.use(cors())

app.use("/auth",AuthRouter)

