import React from 'react'
import {useNavigate} from "react-router-dom"
import "./SideBar.css"
import axios from '../../Api/Axios.instence'

function SideBar() {

  const navigate = useNavigate()

  const Logout = async () => {
     const response = await axios.get("/auth/Logout",{withCredentials:true})
     if(response.success){
      navigate("/")
     }else{
       alert(response.error)
     }

  }
  return (
    <div className='SideBar'>

                <div className="option">
                    <div>
                    <i className="fa-solid fa-user-group"></i>
                    </div>
                    <div>
                    <span>Find Frends</span>
                    </div>
                </div>

                <div className="option">
                    <div>
                    <i className="fa-solid fa-message"></i>
                    </div>
                    <div>
                    <span>Massegas</span>
                    </div>
                </div>

                <div className="option" onClick={Logout}>
                    <div>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                    <div>
                    <span>Logout</span>
                    </div>
                </div>

    </div>
  )
}

export default SideBar
