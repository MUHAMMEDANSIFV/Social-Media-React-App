import express  from "express"
import dotenv  from "dotenv"
import cors  from "cors"
import session from "express-session"
import connect from "./Connections/mongoos.connection.js"

dotenv.config();

const app = express()
dotenv.config()

import  AuthRouter  from "./routes/AuthRouter.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const oneDay = 1000*60*60*60*24 ;
app.use(session({
    secret:"sadfasdfsadfsdfasdfadsf",
    saveUninitialized:true,
    cookie:{maxAge:oneDay},
    resave:false
}))

app.listen(process.env.PORT,() => {
    connect()
    console.log("Backend connection successfully")
    console.log(`server running in ${process.env.PORT}`)
})


app.use(cors())

app.use("/auth",AuthRouter)

