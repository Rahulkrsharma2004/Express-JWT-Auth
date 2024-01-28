const express = require("express")
const dotenv = require("dotenv").config()
const { connection } = require("./db")
const jwt = require("jsonwebtoken")
const {auth} = require("./Middlewares/authMiddleware")
const {authRouter} = require("./Routes/authRouter")
const {blacklist} = require("./blacklist")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT  

app.use(express.json())
app.use(cookieParser());
app.use("/users", authRouter)

app.get("/", (req, res) => {
    res.send("Home page")
})


app.get("/blogs",auth,(req, res) => {
    res.status(200).send({ "data": "Blogs Data...." })
})

app.get("/logout",(req,res)=>{
    const token = req.cookies.ACCESS_TOKEN
    const refresh_token = req.cookies.REFRESH_TOKEN
    try {
        blacklist.push(token)
        blacklist.push(refresh_token)
        res.send({"msg":"User has been logout"})
    } catch (error) {
        res.send({"err":error})
    }
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Express server running on port ${PORT} and db is also connected`)

    } catch (error) {
        console.log(error)
    }

})