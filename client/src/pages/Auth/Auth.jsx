import React, { useState, useEffect } from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { Fragment } from 'react';
import axios from "../../Api/Axios.instence"

function Auth() {

    const [state, setstate] = useState(true);

    const navigate = useNavigate()

    function changestate() {
        setstate(!state)
    }
    Auth.changestate = changestate;

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/home")
        }
    })

    return (
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
            toast.success("validaton success", toastoptions)
            const user = await axios.post("/auth/newuser/signup", formdata)
            if (user.data.success) {
                localStorage.setItem("user", user)
                navigate("/home")
            } else if (user.data.message) {
                toast.error(`${user.data.message[0]} is already taken try another one`, toastoptions)
            } else {
                toast.error(user.data.error, toastoptions)
            }
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
        password: "",
        confirmpassword: ""
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
         try{
        const user = await axios.post("/auth/login", formdata)
         if(user.data.success){
            console.log(user.data.user)
            localStorage.setItem("user",JSON.stringify(user.data.user))
            navigate("/home")
         }else{
            toast.error(user.data.error,toastoptions)
         }
         }catch(err){
            toast.error("Network issue Check your internet Connection",toastoptions)
         }
         
        }
    }

    const handlevalidation = () => {
        const { username, password, confirmpassword } = formdata;

        if (username.length === 0) toast.error("User Name required", toastoptions);
        else if (username.length < 6) toast.error("User Name must have at least 6 charaters",toastoptions)
        else if (password.length === 0) toast.error("Password is required", toastoptions)
        else if (password.length < 10) toast.error("Password must have 10 characters",toastoptions)
        else if (password !== confirmpassword) toast.error("Password and ConfirmPassword must be same",toastoptions)
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
