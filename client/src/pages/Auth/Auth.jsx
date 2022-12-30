import React, { useState, Fragment, useEffect } from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import Loder from '../../Components/Loder/Loder'
import {jwtverifycation} from "../../Api/Auth.Api.js"
import Login from '../../Components/Auth/Login'
import Signup from '../../Components/Auth/Signup'

function Auth() {

    

    const [state, setState] = useState(true);

    const [Loderworking,setLoderworking] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
         jwtverifycation((status)=>{
            console.log(status)
            if(status.success){
                navigate("/home")
            }else{
                setLoderworking(false)
            }
         })
    })


    return (
        <Fragment >
            {
                Loderworking ? 
                <Loder /> :
                <div className="Auth">
                <div className="a-left">
                    <img src={Logo} alt="" />
                    <div className="Webname">
                        <h1>Social Media</h1>
                        <h6>Explore the ideas throughout the world</h6>
                    </div>
                </div>
                {state ? <Login state={state} setState={setState} /> : <Signup state={state} setState={setState} />}
            </div>
            }
        </Fragment>
    )
}


export default Auth
