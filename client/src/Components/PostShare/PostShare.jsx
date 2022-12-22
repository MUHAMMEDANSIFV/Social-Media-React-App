import React, { Fragment,useState,useRef} from 'react'
import ProfileImage from "../../img/profileImg.jpg"
import {toast,ToastContainer} from "react-toastify"
import "./PostShare.css"
import {useDispatch} from "react-redux"
import {UilScenery,UilPlayCircle,UilLocationPoint,UilSchedule,UilTimes} from "@iconscout/react-unicons"
import swal from "sweetalert"
import Formdata from "form-data"
import axios from "../../Api/Axios.instence"
import CropEasy from '../Crop/CropEasy'
import LinearBuffer from '../Loder/LinearLoader/LinearBuffer'


function PostShare() {

    const dispatch = useDispatch()

    const [Image,setImage] = useState(null)
    const [photoURL,setPhotoURL] = useState(null)
    const [openCrop,setOpenCrop] = useState(false) 
    const [Loader,setLoader] = useState(false)
    const [postdata,setpostdata] = useState({description: "Description Not Added"}) 
    const ImageRef = useRef()
    const formdata =new Formdata()

    const onImagechange = (event) => {
        if(event.target.files && event.target.files[0]){
            console.log(event.target.files[0].size)
            let image = event.target.files[0]
            setPhotoURL(URL.createObjectURL(image))
            setOpenCrop(true)

    }}

    const toastoptions = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
          }

    const handleChange = (event) => {
       setpostdata({...formdata,[event.target.name]:event.target.value})
    }

    const recall = () => {
        handlesubmit()
    }

    const handlesubmit = async () => { 
        try{
        if(!Image.file){
            swal("Please add a Content ", {
                buttons:  "Ok",
              });
        }else{
            setLoader(true)
            formdata.append("post",Image.file)
            formdata.append("description",postdata.description ? postdata.description : {description:"Description Not Added"})
        const response = await axios.post("/user/sharepost",formdata,{headers: {
            'x-device-id': 'stuff',
            'Content-Type': 'multipart/form-data'
          }})
          if(response.success){
            toast.success(response.success,toastoptions)
            setImage(null)
            setPhotoURL(null)
            setpostdata(null)
            dispatch({
                type:"posts",
                payload:response.posts
               })
            setLoader("success")
        }else if(response.error === "file not found"){
        recall()
        }else{
          toast.error(response.error,toastoptions)
        }}
    }catch (err){
        console.log(err)
        toast.error("Your network is not working proper please check",toastoptions)
    }
    }

    return (
        <Fragment>
            <div className='PostShare'>
                <img src={ProfileImage} alt="" />
            <div>
                <input type="text" 
                 placeholder="What's happening"
                 name='description'
                 onChange={(e) => handleChange(e)}  />
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
            {
             Loader ?
             <LinearBuffer Loader={Loader} setLoader={setLoader} />
             : ""
            }
            </div>
            </div> 
            <CropEasy photoURL={photoURL} openCrop={openCrop} setOpenCrop={setOpenCrop} setImage={setImage} />
            <ToastContainer />
        </Fragment>
    )
}

export default PostShare
