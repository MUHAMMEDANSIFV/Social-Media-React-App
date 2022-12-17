import React, { Fragment,useState,useRef} from 'react'
import ProfileImage from "../../img/profileImg.jpg"
import "./PostShare.css"
import {UilScenery,UilPlayCircle,UilLocationPoint,UilSchedule,UilTimes} from "@iconscout/react-unicons"
import swal from "sweetalert"
import Formdata from "form-data"
import axios from "../../Api/Axios.instence"
import CropEasy from '../Crop/CropEasy'


function PostShare() {
    const [Image,setImage] = useState(null)
    const [photoURL,setPhotoURL] = useState(null)
    const [openCrop,setOpenCrop] = useState(false) 
    const ImageRef = useRef()
    const formdata =new Formdata()

    const onImagechange = (event) => {
        if(event.target.files && event.target.files[0]){
            let image = event.target.files[0]
            setPhotoURL(URL.createObjectURL(image))
            setOpenCrop(true)

    }
        
    }

    const handlesubmit = async () => { 
        try{
        if(!Image){
            swal("Please add a Content ", {
                buttons:  "Ok",
              });
        }else{
            formdata.append("post",Image.file)
            console.log(Image.file)
            axios.defaults.withCredentials = true
         await axios.post("/user/sharepost",formdata,{headers: {
            'x-device-id': 'stuff',
            'Content-Type': 'multipart/form-data'
          }})
        }
    }catch (err){
        console.log(err)
    }
    }

    return (
        <Fragment>
            <div className='PostShare'>
                <img src={ProfileImage} alt="" />
            <div>
                <input type="text" placeholder="What's happening"  />
            <div className='PostOptions'>
                <div className="option" onClick={()=>ImageRef.current.click()}>
                    <UilScenery />
                    Photo
                </div>
                <div className="option">
                    <UilPlayCircle />
                    Video
                </div>
                <div className="option">
                    <UilLocationPoint />
                    Location
                </div>
                <div className="option">
                    <UilSchedule />
                    Shedule
                </div>
                <button onClick={handlesubmit} className='button post-button'>Post</button>
                <div style={{display:"none"}}>
                    <input type="file" name='post' ref={ImageRef} onChange={onImagechange} />
                </div>
            </div>
            {
                Image && 
                <div className="PreviewImage">
                   <UilTimes onClick={()=>setImage(null)} />
                   <img src={Image.image} alt="" />
                </div>
            }
            </div>
            </div> 
            <CropEasy photoURL={photoURL} openCrop={openCrop} setOpenCrop={setOpenCrop} setImage={setImage} />
        </Fragment>
    )
}

export default PostShare
