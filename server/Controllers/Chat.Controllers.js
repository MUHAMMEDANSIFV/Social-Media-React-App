import ChatSterSchema from "../model/chatster.modal.js";

export const allchatster = async (req, res) => {
     try {
          console.log("hi")
          const userid = "63aebe2789a9ae9dae9f0c91";
          let chatsteres_list = await ChatSterSchema.findOne({
               user: userid,
          }).populate("chatsters.personid")
          console.log(chatsteres_list)
          if (chatsteres_list) {

                     res.status(200).json({
                          success: true,
                          chatsteres: chatsteres_list,
                     });
          } else {
               res.status(200).json({ status: "You have No message yet" });
          }
     } catch (err) {
          console.log(err)
     }
};

export const addnewchat = async (req, res) => {
     try {

     const userid = req.userinfo._id;

        const chatexist =await  ChatSterSchema.findOne({user:userid})

        if(chatexist){
          const chatster = await ChatSterSchema.findOneAndUpdate(
               { user: userid },
               {
                    $push: {
                         chatsters: {
                              personid: req.body.chatster,
                         },
                    },
               }
          );
        }else{
          const data = {
               user: userid,
               chatsters: {
                    personid: req.body.chatster,
               },
          };
          const chatster = await ChatSterSchema(data)
          chatster.save()
        }
        let chatsteres_list = await ChatSterSchema.findOne({
             user: userid,
        }).populate("chatsters.personid");

        res.status(200).json({success:true,Chatsters:chatsteres_list})

     } catch (err) {
          console.log(err)
     }
};
