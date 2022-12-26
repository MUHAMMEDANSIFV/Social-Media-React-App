import ChatSterSchema from "../model/chatster.modal.js"

export const allchatster = async (req,res) => {
    try{
       
      const chatsteres = await ChatSterSchema.findById(req.userinfo)
      
      if(chatsteres){
        console.log(chatsteres)
        res.status(200).json({success:true,chatsteres:chatsteres})
      }else{
        res.status(200).json({status:"You have No message yet"})
      }
    }catch(err){

    }
}