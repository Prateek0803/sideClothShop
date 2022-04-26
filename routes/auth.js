const User      = require("../models/user")
const router    = require("express").Router()
const CryptoJs  = require("crypto-js")
const jwt       = require("jsonwebtoken")

router.post('/register' , async(req,res) =>{
        let body = req.body
        const newUser = new User({
            username : body.username,
            email    : body.email,
            password : CryptoJs.AES.encrypt(req.body.password, process.env.KEY).toString()
        })
        try {
           const savedUser = await newUser.save()
            res.status(201).send({savedUser})
        
    } catch (err) {
        res.status(500).send(err)
    }
})


router.post('/login', async(req,res)=>{
    try {
        const user          = await User.findOne({username : req.body.username})
        !user && res.status(401).json('User does not exist please register')
        const hashedPass    = CryptoJs.AES.decrypt(user.password,process.env.KEY)
        const pass      = hashedPass.toString(CryptoJs.enc.Utf8)

        pass !== req.body.password && res.status(401).json('Wrong Credentials')

        const accessToken = jwt.sign({
            id      : user._id,
            isAdmin : user.isAdmin
        },
            process.env.JWT,
            {
                expiresIn : "3d"
            }
        )
        const {password, ...others} = user._doc
        res.status(200).json({...others,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router