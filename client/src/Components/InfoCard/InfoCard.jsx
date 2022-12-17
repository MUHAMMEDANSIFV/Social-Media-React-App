import React ,{useState} from 'react'
import "./InfoCard.css"
import { UilPen } from "@iconscout/react-unicons"
import ProfileModal from '../ProfileModal/ProfileModal';
import {useSelector} from "react-redux"

function InfoCard() {

    const [ModalOpened,setModalOpened] = useState(false);

    const User = useSelector((state) => {
        return state.user;
    })

  return (
    <div className="InfoCard">
        <div className="InfoHead">
            <h4>Your Info</h4>
            <div onClick={()=>setModalOpened(true)}>
            <UilPen width="2rem" height="1.2rem"  />
            </div>
            <ProfileModal ModalOpened={ModalOpened} setModalOpened={setModalOpened} />
        </div>

        <div className='info' >
            <span>
                <b>Status </b>
            </span>
            <span  className='details-notadded'>{User.status} </span>
        </div>

        <div className='info'>
            <span>
                <b>Lives in </b>
            </span>
            <span  className='details-notadded'>{User.livesin} </span>
        </div>

        <div className='info'>
            <span>
                <b>Work at </b>
            </span>
            <span className='details-notadded'>{User.workat} </span>
        </div>

        <button className='button Logout-button'>Logout</button>
    </div>
  )
}

export default InfoCard
