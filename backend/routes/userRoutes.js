const express = require('express')
const router = express.Router()
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const upload=require('../utils/multer')
const isReception = require('../middlewares/isReception')
const { registerCheck, loginCheck, validator } = require('../middlewares/validator')
const usercontrollers = require('../controllers/user')


router.post("/register",upload("user").single("file"), registerCheck(),validator,usercontrollers.register)
router.post('/login', loginCheck(), validator,usercontrollers.login)
router.get("/current", isAuth(),usercontrollers.getcurrent)
router.put("/:id",upload("user").single("file"),isAuth(),usercontrollers.edituser)
router.put("/payonline/:id",isAuth(),usercontrollers.payonline)
router.get("/admin",isAuth(),isAdmin,usercontrollers.getAllUsers)
router.get("/reception",isAuth(),isReception,usercontrollers.getAllUsers)
router.put("/reception/:id", isAuth(),isReception,usercontrollers.paybyreception)
router.delete("/reception/:id",isAuth(),isReception,usercontrollers.deleteuser)

module.exports = router