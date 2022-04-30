const router                                            = require("express").Router()
const Order                                             = require("../models/order")
const CryptoJs                                          = require("crypto-js")
const jwt                                               = require("jsonwebtoken")
const {verifyTokenAndAuthorize, verifyTokenAndAdmin}    = require('../utility/verifyAndAuth')



router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})



router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true}
    )
        res.status(200).json(updatedOrder)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("cart product is deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/:id',verifyTokenAndAuthorize,async(req,res)=>{
    try {
       const order =  await Order.findOne({userId : req.params.id})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try {
       const order =  await Order.find()
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router