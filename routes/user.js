const router                                            = require("express").Router()
const User                                              = require("../models/user")
const CryptoJs                                          = require("crypto-js")
const jwt                                               = require("jsonwebtoken")
const {verifyTokenAndAuthorize, verifyTokenAndAdmin}    = require('../utility/verifyAndAuth')

router.put('/:id',verifyTokenAndAuthorize,async(req,res)=>{
    if(req.body.password){
        req.body.password =  CryptoJs.AES.encrypt(
            req.body.password, 
            process.env.KEY
        ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true}
    )
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',verifyTokenAndAuthorize,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user is deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
       const user =  await User.findById(req.params.id)
       const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try {
       const user =  await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router