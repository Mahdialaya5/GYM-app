const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User')
const cloudinary = require("../config/cloudinary")

exports.register = async (req, res) => {
    const { email, password, role } = req.body
    try {
        if (role) {
            return res.status(401).send({msg:'access denied'})
        }
     
        const existName = await User.findOne({ email})
           if (existName) {
            return res.status(400).send({ msg:"email exist,please change email"})
        }
        const newUser = new User(req.body)

        if (req.file){
          const result = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: "wmw1fun5",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        })
            newUser.imgsrc=result.secure_url; 
         }
        const hashedPassword = await bcrypt.hash(password, 10)
          newUser.password = hashedPassword
            await newUser.save()
         
          const payload = { _id: newUser._id }
          const token = jwt.sign(payload, process.env.secretKey)
          return res.status(201).send({ user: newUser, token })

    } catch (error) {
        return   res.status(500).send(error.message)
    }}
   
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        const isMatched = await bcrypt.compare(password, existUser.password)

        if (!isMatched) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        existUser.password = undefined
        const payload = { _id: existUser._id }
        const token = jwt.sign(payload, process.env.secretKey)
      return   res.send({ user: existUser, token })
    } catch (error) {
     return   res.status(500).send({ msg: error.message })
    }}   

exports.getcurrent =( req, res) => {
    return  res.send({ user: req.user });
}

exports.edituser = async (req, res) => {
    const {name} = req.body
    try {
        const existName = await User.findOne({ name })
           if (existName &&existName._id==!req.params.id) {
            return res.status(400).send({ msg:"name exist,please change user name"})
        }
           const result = await User.updateOne({ _id: req.params.id }, { ...req.body })
        const UserUpdated = await  User.findOne({ _id: req.params.id })
       
         if(req.file)
             {   const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: "wmw1fun5",
                allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
              });
        
             UserUpdated.logo = result.secure_url; 
              await UserUpdated.save()
                }
            

         if ((result.modifiedCount) || (req.file)) {
            
            return res.send({ msg: "update suuccess", user: UserUpdated });
          }
        return res.status(400).send({ msg: " aleardy update " })
       
    }
     catch (error) {
        
       return res.status(500).send(error.message)
    }
}

exports.payonline = async(req, res) => {
    try{
       
    const result = await User.updateOne({ _id: req.params.id },{ ...req.body })
    const updatedUser = await User.findOne({ _id: req.params.id })

    if (result.modifiedCount) {
        let myDate = new Date(req.body.subscribe.slice(0,10));
        myDate.setDate(myDate.getDate() + 30);
        updatedUser.subscribeDeadline=myDate
        await updatedUser.save()
        return res.send({ msg: "update success", user: updatedUser });
      }
      else {
        return res.status(500).send("already updated")
      }
    }
  catch(error){
  return   res.status(400).send(error.message)
}}

exports.getAllUsers =  async (req, res) => {
    try {
        const users = await User.find().sort({name:1})
         return   res.send( users )
    } catch (error) {
        return  res.status(500).send({ msg: error.message });
 }}

exports.paybyreception =  async(req, res) => {
    try{
        
    const result = await User.updateOne({ _id: req.params.id },{ ...req.body })
    const updatedUser = await User.findOne({ _id: req.params.id })

    if (result.modifiedCount) {
        let myDate = new Date(req.body.subscribe.slice(0,10));
            myDate.setDate(myDate.getDate() + 30);
            updatedUser.subscribeDeadline=myDate
            await updatedUser.save()
        return res.send({ msg: "update success", user: updatedUser });
      }
      else {
        return res.status(400).send("already updated")
      }
    }
      catch(error){
       return   res.status(500).send(error.message)
    }} 

exports.deleteuser =  async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id })
        if (result.deletedCount) {
            return res.send({ msg: "delete  success" })
        } 
        return res.status(400).send({ msg: "aleardy delete" })
    } catch (error) {
   
     return   res.status(500).send(error.message)
    }}