import React, { Fragment,useState,useRef} from 'react'
import ProfileImage from "../../img/profileImg.jpg"
import {toast,ToastContainer} from "react-toastify"
import "./PostShare.css"
import {UilScenery,UilPlayCircle,UilLocationPoint,UilSchedule,UilTimes} from "@iconscout/react-unicons"
import swal from "sweetalert"
import Formdata from "form-data"
import axios from "../../Api/Axios.instence"
import CropEasy from '../Crop/CropEasy'
import LinearBuffer from '../Loder/LinearLoader/LinearBuffer'
import CircularIndeterminate from '../Loder/CircularIndeterminate/CircularIndeterminate'


function PostShare() {

    const [image,setImage] = useState(null)
    const [photoURL,setPhotoURL] = useState(null)
    const [openCrop,setOpenCrop] = useState(false) 
    const [Loader,setLoader] = useState(false)
    const [postdata,setPostdata] = useState({description: "Description Not Added"}) 
    const imageRef = useRef()
    const formdata =new Formdata()

    const onImagechange = (event) => {
        if(event.target.files && event.target.files[0]){
            console.log(event.target.files[0].size)
            let imageurl = event.target.files[0]
            setPhotoURL(URL.createObjectURL(imageurl))
            setOpenCrop(true)

    }}

    const toastoptions = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
          }

    const handleChange = (event) => {
       setPostdata({...formdata,[event.target.name]:event.target.value})
    }

    const recall = () => {
        handlesubmit()
    }

    const handlesubmit = async () => { 
        try{
        if(!image.file){
            swal("Please add a Content ", {
                buttons:  "Ok",
              });
        }else{
            setLoader(true)
            formdata.append("post",image.file)
            formdata.append("description",postdata.description ? postdata.description : {description:"Description Not Added"})
            setImage(null)
        const response = await axios.post("/post/sharepost",formdata,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
          if(response.success){
            setImage(null)
            setPhotoURL(null)
            setPostdata(null)
            setLoader({status:"success",response:response})
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
                <div className="option" onClick={()=>imageRef.current.click()}>
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
                    <input type="file" name='post' ref={imageRef} onChange={onImagechange} />
                </div>
            </div>
            {
                image ?
                <div className="PreviewImage">
                   <UilTimes onClick={()=>setImage(null)} />
                   <img src={image.image} alt="" />
                </div> :
                ""
            }
            </div>
            </div> 
            <CropEasy photoURL={photoURL} openCrop={openCrop} setOpenCrop={setOpenCrop} setImage={setImage} />
             <div>
             {
             Loader ?
             <div className='PostShareing'>
             <div><b>Post Sharing Please Wait......</b></div>
             <div><LinearBuffer Loader={Loader} setLoader={setLoader} /></div>
             <div><div style={{display:"flex",fontSize:"1rem",}}>Pending  <CircularIndeterminate  style={{size:"2rem"}} /></div></div>
             </div>
             : ""
             }
             </div>
            <ToastContainer />
        </Fragment>
    )
}

export default PostShare
