const mongoose = require("mongoose");

const studentModel = new mongoose.Schema({
   email:{
    type:String,
    required:[true,"Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique:true
   },
   password: {
    type:String,
    select:false,
    maxLength:[15,"Password should not exceed more than 15 characters"],
    minLength:[3,"Password should have atleast 3 characters"],
    //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
   }
},
    {timestamps: true}
);

module.exports = mongoose.model("Student", studentModel);