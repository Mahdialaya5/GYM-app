import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { editUser } from '../../Redux/actions/actionsUser'
import Alert from '../Alert/Alert'
import ImgProfile from '../Profile/Image'
import "./editUser.css"



function EditUser() {


  const dispatch = useDispatch()
  const [image, setimage] = useState(null)
  const [newInfo, setnewInfo] = useState("")
  const user = useSelector(state => state.userReducer.currentUser)
  const navigate = useNavigate()
 
 
  useEffect(() => {
    setnewInfo(user)
  }, [user])

const handlesubmit=(e)=>{

    const data = new FormData();
     data.append("name",newInfo.name)
     if (image!==null) {
      data.append("file",image) 
     }
   dispatch(editUser(user._id,data, navigate))
     navigate('/profile')
  }

return (
    <div>
  { user.imgsrc?  <img src={user.imgsrc}  style={{ marginLeft:"30px" ,marginTop:"15px",width:"100px",borderRadius:"20%"}} alt={<ImgProfile />} />:<ImgProfile />}
     <p className='username' >{user.name}</p>
     <div className='edit_user ' >
     
     <input   onChange={(e)=>setnewInfo({...newInfo,name:e.target.value})} type="text" className="form_control "  placeholder="NEW USER NAME"/>
   
     <input type="file"  onChange={(e)=>setimage(e.target.files[0])}   className="form_control"  />
     <label for="floatingInput">change photo </label>
     <br/><Alert/>
     <div id='save' >
     <button type="button" onClick={handlesubmit} className="btn btn_edit btn-primary">save change</button>
     <Link to={"/profile"} > <button type="button" className="btn btn_edit  btn-success">return</button></Link>
     </div>
   </div>
   </div>
  )
}

export default EditUser