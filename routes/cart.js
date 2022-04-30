const router                                            = require("express").Router()
const Cart                                              = require("../models/cart")
const CryptoJs                                          = require("crypto-js")
const jwt                                               = require("jsonwebtoken")
const {verifyTokenAndAuthorize, verifyTokenAndAdmin}    = require('../utility/verifyAndAuth')



router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})



router.put('/:id',verifyTokenAndAuthorize,async(req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true}
    )
        res.status(200).json(updatedCart)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',verifyTokenAndAuthorize,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart product is deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/:id',verifyTokenAndAuthorize,async(req,res)=>{
    try {
       const cart =  await Cart.findOne({userId : req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try {
       const cart =  await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router