import mongoose, { Schema } from "mongoose";

const chatsterSchema = mongoose.Schema({
     user: String,
     chatsters: [
          {
               personid: {
                    type: Schema.Types.ObjectId,
                    ref: "user",
               }
          },
     ],
});

export default mongoose.model("chatster", chatsterSchema);
