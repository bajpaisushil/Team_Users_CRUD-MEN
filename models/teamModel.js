import { Schema, model } from "mongoose";


const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Team = model("Team", teamSchema);

export default Team;
