const User      = require("../models/user")
const router    = require("express").Router()


router.post('/register' , async(req,res) =>{
        let body = req.body
        const newUser = new User({
            username : body.username,
            email    : body.email,
            password : body.password
        })
        try {
           const savedUser = await newUser.save()
            res.status(201).send({savedUser})
        
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router