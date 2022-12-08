import express, { application }  from "express"
import dotenv  from "dotenv"
import cors  from "cors"
import connect from "./Connections/mongoos.connection.js"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express()
dotenv.config()

import  AuthRouter  from "./routes/AuthRouter.js"
import UserRouter from "./routes/user.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser("dsafhaskdfjsdaklfjsklafjsdfgggsffgsdfddfgdgf"))

app.use(cors({credentials:true,origin:"http://localhost:3000"}))
// const oneDay = 1000*60*60*60*24 ;
// app.use(session({
//     secret:"sadfasdfsadfsdfasdfadsf",
//     saveUninitialized:true,
//     cookie:{maxAge:oneDay},
//     resave:false
// }))

app.listen(process.env.PORT,() => {
    connect()
    console.log("Backend connection successfully")
    console.log(`server running in ${process.env.PORT}`)
})



app.use("/auth",AuthRouter)
app.use("/user",UserRouter)

