const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next()
        return;
    }
    return  res.status(401).send({msg: "access denied"})
}
module.exports=isAdmin