import React,{Fragment,useState} from 'react'
import {Login as Loginapi} from "../../Api/Auth.Api"
import {useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"

function Otp({setOtpverify,email}) {

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
                <form onSubmit={(event) => handlesubmit(event)} className="infoForm auth-form">

                    <h2>Enter OTP</h2>
                       <img src="https://res.cloudinary.com/dc0agfvze/image/upload/v1672305132/img/images-removebg-preview_igkjhw.png" alt="" />
                     <span>We have sent a OTP on your Email : {email}</span>
                    <div>
                  
                        <input type="password"
                            placeholder='Enter The OTP'
                            className='infoinput'
                            value={formdata.password}
                            onChange={(event) => handlechange(event)}
                            name='password'
                        />

                    </div>

                    <div >
                        <span style={{ fontSize: "12px" }}>If You dont't an account. <span className='link' >Signup</span></span>
                    </div>
                    <button className='button info-Button' type='submit'>Login</button>
                </form>
            <ToastContainer />
        </Fragment>
    )
}
export default Otp
