const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username : {
            type        : String, 
            required    : true
        },

        email : {
            type        : String,
            required    : true,
            unique      : true
        },
        
        password : {
            type        : String,
            required    : true,
            unique      : true,
        },

        isAdmin : {
            default     : false,
            type        : Boolean
        }

    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("User", userSchema)

