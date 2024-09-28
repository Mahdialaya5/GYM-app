const  Offer=require('../models/Offers')
const cloudinary = require("../config/cloudinary")


exports.addoffer = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "wmw1fun5",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
    });

    const newOffer = new Offer(req.body);
    newOffer.logo = result.secure_url;
    await newOffer.save();

    return res.status(201).send({ msg: "Offer added successfully", offer: newOffer });
  } catch (error) {
    return   res.status(500).send(error.message)
  }
};

exports.getAllOffers= async (req, res) => {
    try {
     
   const offers = await Offer.find()
     return    res.status(200).send(offers)
    }
    catch (error) {
     return    res.status(500).send(error.message)
    }}

exports.getOneoffer=async (req, res) => {
    try {
     
   const oneOffer = await Offer.findById(req.params.id)
        res.send({offer:oneOffer})
    }
    catch (error) {
       
     return    res.status(500).send(error.message)
    }}

exports.editoffer = async (req, res) => {
    try {
         const result = await Offer.updateOne({ _id: req.params.id }, { ...req.body })
              offerUpdated = await  Offer.findOne({ _id: req.params.id })
             if(req.file)
             { 
              const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: "wmw1fun5",
                allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
              });
        
               offerUpdated.logo = result.secure_url; 
              await offerUpdated.save()
             }
         
         if (result.modifiedCount || req.file) {
            return res.send({ msg: "update suuccess", offer: offerUpdated });
          }
       return   res.status(400).send({ msg: " aleardy update " })
    }
     catch (error) {
      
      return    res.status(500).send(error.message)
    }}

exports.deleteOffer = async (req, res) => {
    try {

        const result = await Offer.deleteOne({ _id: req.params.id })
        if (result.deletedCount) {
            return res.send({ msg: "delete  success" })
        } res.status(400).send({ msg: "aleardy delete" })
    } catch (error) {
     
    return   res.status(500).send(error.message)
    }}