const mongoose = require('mongoose')

const connection = () =>{
    mongoose.connect(process.env.MONGO)
        .then(()=>{
            console.log('db connection successful')
        })
        .catch((err)=>{
            console.log(err)
        })

}


module.exports = connection