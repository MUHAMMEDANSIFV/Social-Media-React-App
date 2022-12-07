import React from 'react'
import {useNavigate} from "react-router-dom"
import "./SideBar.css"


function SideBar() {

  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem("user")
    navigate("/")
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
