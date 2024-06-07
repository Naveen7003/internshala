const mongoose = require("mongoose");

const jobModel = new mongoose.Schema({
    student: [{type:mongoose.Schema.Types.ObjectId, ref:"student"}],
    employe: {type:mongoose.Schema.Types.ObjectId, ref:"employe"},
    profile: String,
    skill: String,
    jobtype: {type:String, enum:["In office", "Remote"]},
    openings:Number,
    description:String,
    preference:String,
    salary:Number,
    perks:String,
    assesments:String
},
    {timestamps: true}
);



module.exports = mongoose.model("Job", jobModel);