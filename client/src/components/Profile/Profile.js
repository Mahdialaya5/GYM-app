import React, { useEffect } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { getCurrent } from '../../Redux/actions/actionsUser'
import ImgProfile from './Image'
import Navbar from '../Navbar/Navbar'

function Profile() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.currentUser)
  
  useEffect(() => {
    dispatch(getCurrent())
  }, [dispatch])

  return (
    
    <div  className='profile' >
        <Navbar/>
       <div className='user_info' >
      {user.imgsrc ?  <img src={user.imgsrc}  style={{  width:"150px",borderRadius:"20%"}} alt={<ImgProfile />} />:<ImgProfile />}
      <div  className='info' >
   <div className='editdiv' > <button className='editp'  ><Link to={`/edituser/${user._id}`}  ><i className="fa-solid fa-pencil"></i></Link></button>   </div>
<div className='flxuser' >
 <div  className='user' > <span className='name ' >{user.name&&user.name.toUpperCase()}</span>
   <h3 className='userinscri p' > {user.inscription&&user.inscription.slice(0,10)}</h3></div>
 <div> 
  <h3 className="p">sport:{user.specialty}</h3>
  <h3 className="p">subscribe: {user.subscribe&&user.subscribe.slice(0,10)}</h3>
  <h3 className="p">deadline subscribe:{user.subscribeDeadline&&user.subscribeDeadline.slice(0,10)}</h3>
</div>
</div>
</div>
</div>

<Link  to={"/pay"} ><button type="button"  className="btn btn-primary  payb" >pay online</button></Link>

    </div>
  )
}

export default Profile