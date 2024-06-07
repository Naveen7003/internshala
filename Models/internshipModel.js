const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema({
    student: [{type:mongoose.Schema.Types.ObjectId, ref:"student"}],
    employe: {type:mongoose.Schema.Types.ObjectId, ref:"employe"},
    profile: String,
    skill: String,
    internshiptype: {type:String, enum:["In office", "Remote"]},
    openings:Number,
    from : String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
        status:{
            type:String,
            enum:["Fixed", "Negotiable", "Performance Based", "Unpaid"]
        },
        amount:String
    },
    perks:String,
    assesments:String
},
    {timestamps: true}
);



module.exports = mongoose.model("Internship", internshipModel);