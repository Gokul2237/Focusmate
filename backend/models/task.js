const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    title:{
        type:String,
        required:true
    },

    category:{
        type:String
    },

    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },

    dueDate:{
        type:Date
    },

    completed:{
        type:Boolean,
        default:false
    },

    recurring:{
        type:Boolean,
        default:false
    },

    recurringType:{
        type:String,
        enum:["Daily","Weekly","Monthly"]
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Task", taskSchema);