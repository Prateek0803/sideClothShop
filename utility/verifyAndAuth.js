const jwt = require('jsonwebtoken')


const verify = (req,res,next) =>{
    const authHeaders = req.headers.token

    if(authHeaders){
        const token = authHeaders.split(" ")[1]
        jwt.verify(token, process.env.JWT, (err,user)=>{
            if(err) res.status(403).json("token is not valid")
            req.user = user
            next()
        })
    }
}

const verifyTokenAndAuthorize = (req,res,next)=>{
    verify(req,res,() =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to access")
        }
    })
}


const verifyTokenAndAdmin = (req,res,next)=>{
    verify(req,res,() =>{
        console.log(req.user)
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to access")
        }
    })
}


module.exports = {verify,verifyTokenAndAuthorize,verifyTokenAndAdmin}