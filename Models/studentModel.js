const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

studentModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

module.exports = mongoose.model("Student", studentModel);