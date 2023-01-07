import ChatSterSchema from '../model/chatster.modal.js';

export const allchatster = async (req, res) => {
  try {
    const userid = req.userinfo._id;
    const chatsteres_list = await ChatSterSchema.findOne({
      user: userid,
    }).populate('chatsters.personid');
    console.log(chatsteres_list);
    if (chatsteres_list) {
      res.status(200).json({
        success: true,
        chatsteres: chatsteres_list,
      });
    } else {
      res.status(200).json({ status: 'You have No message yet' });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addnewchatster = async (req, res) => {
  try {
    const userid = req.userinfo._id;

    const chatster = await ChatSterSchema.findOneAndUpdate(
      { user: userid },
      {
        $push: {
          chatsters: {
            personid: req.body.chatster,
          },
        },
      },
      {
        upsert: true,
      },
    );
    const chatsteres_list = await ChatSterSchema.findOne({
      user: userid,
    }).populate('chatsters.personid');

    res.status(200).json({ success: true, Chatsters: chatsteres_list });
  } catch (err) {
    console.log(err);
  }
};

export const getchats = (req,res) => {
  try{

    

  }catch(err){
      console.log(err)
  }
}

export const addNewchat = async (req,res) => {
  try{

      const data = req.body;
  const message = await MessageSchema(data)
  const response = await message.save();
  if(response){
  res.json({success:true})
  }else{
      res.json({error:true})
  }

  }catch(err){
      console.log(err)
      res.json({error:err})
  }
}
