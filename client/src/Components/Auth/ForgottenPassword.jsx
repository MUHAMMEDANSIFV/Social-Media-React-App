import React, { Fragment , useState } from "react";
import { Link } from "react-router-dom";
import {ToastContainer , toast} from "react-toastify"

function ForgottenPassword(){

    const [email,setEmail] = useState(null)

    const handlesubmit = () => {

    }

    const handlechange = () => {

    }

   return (
        <Fragment>
             <div className='a-right'>
                  <form
                       onSubmit={(event) => handlesubmit(event)}
                       className='infoForm auth-form'
                  >
                       <h2>Login</h2>

                       <div>
                            <input
                                 type='password'
                                 placeholder='Password'
                                 className='infoinput'
                                 value={email}
                                 onChange={(event) => handlechange(event)}
                                 name='password'
                            />
                       </div>

                       <div>
                            <span style={{ fontSize: "12px" }}>
                                 I don't want to fogotte my password.{" "}
                                 <Link to="/"
                                      className='link'
                                      
                                 >
                                      Go Back
                                 </Link>
                            </span>
                       </div>
                       <button className='button info-Button' type='submit'>
                            Login
                       </button>
                  </form>
             </div>
             <ToastContainer />
        </Fragment>
   );
}

export default ForgottenPassword