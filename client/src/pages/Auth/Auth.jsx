import React, { useState, Fragment, useEffect } from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import Loder from '../../Components/Loder/Loder'
import {jwtverifycation , Login as Loginapi , Signup as Signupapi} from "../../Api/Auth.Api.js"

function Auth() {

    

    const [state, setstate] = useState(true);

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

    function changestate() {
        setstate(!state)
    }
    Auth.changestate = changestate;


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
                {state ? <Login /> : <Signup />}
            </div>
            }
        </Fragment>
    )
}

function Signup() {


    const [formdata, setformdata] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const toastoptions = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
    }

    const navigate = useNavigate()


    const handlesubmit = async (event) => {
        event.preventDefault()
        if (handlevalidation()) {
            Signupapi(formdata,(status) => {
                if (status.success) {
                    navigate("/")
                } else if (status.message) {
                    toast.error(`${status.message[0]} is already taken try another one`, toastoptions)
                } else {
                    toast.error(status.error, toastoptions)
                }
            })
        }
    }

    const handlevalidation = () => {
        const { firstname, lastname, username, email, password, confirmpassword } = formdata
        if (firstname.length === 0) toast.error("First Name is required", toastoptions)
        else if (firstname.length < 6) toast.error("First Name must have at least 6 characters", toastoptions)
        else if (lastname.length === 0) toast.error("Last Name is required", toastoptions)
        else if (lastname.length < 6) toast.error("Last Name must have at least 6 characters", toastoptions)
        else if (username.length === 0) toast.error("User Name is required", toastoptions)
        else if (username.length < 8) toast.error("User Name must have at least 8 characters", toastoptions)
        else if (email.length === 0) toast.error("Email Name is required", toastoptions)
        else if (!/\S+@\S+\.\S+/.test(email)) toast.error("please enter the correct email", toastoptions);
        else if (password.length === 0) toast.error("Password is required", toastoptions)
        else if (password.length < 10) toast.error("Password must have at least 10 characters", toastoptions)
        else if (confirmpassword !== password) toast.error("Password and ConfirmPassword must be same", toastoptions)
        else return true
        return false
    }

    const handlechange = (event) => {
        setformdata({ ...formdata, [event.target.name]: event.target.value })
    }

    return (
        <Fragment>

            <div className="a-right">
                <form onSubmit={(event) => handlesubmit(event)} className="infoForm auth-form">

                    <h2>Signup Up</h2>

                    <div>
                        <input type="text"
                            placeholder='First Name'
                            className='infoinput'
                            value={formdata.firstname}
                            onChange={(event) => handlechange(event)}
                            name='firstname'
                        />

                        <input type="text"
                            placeholder='Last Name'
                            className='infoinput'
                            value={formdata.lastname}
                            onChange={(event) => handlechange(event)}
                            name='lastname'
                        />
                    </div>

                    <div>
                        <input type="text"
                            placeholder='User Name'
                            className='infoinput'
                            value={formdata.username}
                            onChange={(event) => handlechange(event)}
                            name='username'
                        />
                    </div>

                    <div>
                        <input type="email"
                            placeholder='Email'
                            className='infoinput'
                            value={formdata.email}
                            onChange={(event) => handlechange(event)}
                            name='email'
                        />
                    </div>

                    <div>
                        <input type="password"
                            placeholder='Password'
                            className='infoinput'
                            value={formdata.password}
                            onChange={(event) => handlechange(event)}
                            name='password'
                        />

                        <input type="password"
                            placeholder='Confirm Password'
                            className='infoinput'
                            value={formdata.confirmpassword}
                            onChange={(event) => handlechange(event)}
                            name="confirmpassword"
                        />
                    </div>

                    <div >
                        <span style={{ fontSize: "12px" }}>Already have an account.<span className='link' onClick={Auth.changestate}>Login</span></span>
                    </div>
                    <button className='button info-Button' type='submit'>SignUp</button>
                </form>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

function Login() {

    const [formdata, setformdata] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    const toastoptions = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
          }
 
    const handlesubmit = async (event) => {
        event.preventDefault()
        if (handlevalidation()) {
             Loginapi(formdata,(status) => {
                 if(status.success){
                     navigate("/home")
                    }else{
                        toast.error(status.error,toastoptions)
                    }
                })
        }
    }

    const handlevalidation = () => {
        const { username, password } = formdata;

        if (username.length === 0) toast.error("User Name required", toastoptions);
        else if (username.length < 6) toast.error("User Name must have at least 6 charaters",toastoptions)
        else if (password.length === 0) toast.error("Password is required", toastoptions)
        else if (password.length < 10) toast.error("Password must have 10 characters",toastoptions)
        else return true
        return false

    }

    const handlechange = (event) => {
        setformdata({ ...formdata, [event.target.name]: event.target.value })
    }
    return (
        <Fragment>

            <div className="a-right">
                <form onSubmit={(event) => handlesubmit(event)} className="infoForm auth-form">

                    <h2>Login</h2>

                    <div>
                        <input type="text"
                            placeholder='User Name'
                            className='infoinput'
                            value={formdata.username}
                            onChange={(event) => handlechange(event)}
                            name='username'
                        />
                  
                        <input type="password"
                            placeholder='Password'
                            className='infoinput'
                            value={formdata.password}
                            onChange={(event) => handlechange(event)}
                            name='password'
                        />

                    </div>

                    <div >
                        <span style={{ fontSize: "12px" }}>If You dont't an account. <span className='link' onClick={Auth.changestate}>Signup</span></span>
                    </div>
                    <button className='button info-Button' type='submit'>Login</button>
                </form>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default Auth
