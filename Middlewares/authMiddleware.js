const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()
const { blacklist } = require("../blacklist");
const cookieParser = require("cookie-parser")

const access_secretKey = process.env.ACCESS_SECRET_KEY
const refresh_secretKey = process.env.REFRESH_SECRET_KEY

const auth = (req,res,next)=>{
    const token = req.cookies.ACCESS_TOKEN
    const refresh_token = req.cookies.REFRESH_TOKEN
    
    if(token || refresh_token){
        if(blacklist.includes(token,refresh_token)){
            res.send({"msg":"Please login again"})
        }
    }
    jwt.verify(token , access_secretKey , (err, decode) => {
        if (decode) {
            next()

        } else {
            jwt.verify(refresh_token , refresh_secretKey ,(err , decode) =>{
                if(decode){
                    const token = jwt.sign({name:"ironman"} , access_secretKey ,{expiresIn:"1h"} )
                    res.cookie("ACCESS_TOKEN",token)
                    next()
                }else{
                    res.status(400).send({"msg":"Now you need to login again"})
                }
            })
            res.status(400).send({ "error": err })
        }
    });
}

module.exports={
   auth
}