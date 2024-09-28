const express = require("express")
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router()
const isAuth = require('../middlewares/isAuth')
const offercontrollers=require('../controllers/offers')
const upload=require('../utils/multer')

router.get("/",offercontrollers.getAllOffers)
router.get("/:id",offercontrollers.getOneoffer)
router.post("/",upload("offers").single("file"),isAuth(),isAdmin,offercontrollers.addoffer)
router.put("/:id",upload("offers").single("file"),isAuth(),isAdmin,offercontrollers.editoffer)
router.delete("/:id",isAuth(),isAdmin,offercontrollers.deleteOffer)

module.exports = router