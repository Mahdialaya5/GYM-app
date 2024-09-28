import React, { useState } from 'react'
import "./signup.css"
import {Link,  useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addUser, empty } from '../../Redux/actions/actionsUser'
import Alert from '../Alert/Alert'

function Signup() {
  
  const list = useSelector(state => state.offerReducer.offers)
  const [newEmail, setEmail] = useState("")
 const [newPassword, setpassword] = useState("")
 const [newName, setname] = useState("")
 const [newSport, setsport] = useState("musculation")

 const [image, setimage] = useState(null)
 const navigate = useNavigate()
  const disptach=useDispatch()
 
 const handleSubmit = (e) => {
      disptach(empty())
   const data = new FormData();
    data.append("specialty", newSport)
    data.append("password", newPassword)
    data.append("email", newEmail)
    data.append("name",newName)
   if(image!==null) 
   {  data.append("file",image)}
   disptach(addUser(data, navigate))
 };
    

  

 return (
 <div  className='ba'>
    <div className="fr" >
    <h2 className='tit'>signup</h2>
     <div className="form-floating">
      <input onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email </label>
      <br/>
    </div>
    <div className="form-floating">
      <input onChange={(e)=>setname(e.target.value)}  type="text" className="form-control" id="floatingPassword" placeholder="Name"/>
      <label for="floatingPassword">Name</label>
      <br/>
    </div>
    <div className="form-floating">
      <input onChange={(e)=>setpassword(e.target.value)}   type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
      <br/>
    </div>
    <div className="checkbox mb-3">
    <select className="form-select" id="floatingSelectGrid" defaultValue={"musculation"}   onChange={(e)=>setsport(e.target.value)} >
        {list&&list.map((el)=><option key={el._id} value={el.specialty}>{el.specialty}</option>)}
      
      </select>
      <br/>
      <br/>
    <span className='sp_opt' >*optional</span>
      <div className="form-floating">
      <input type="file" onChange={(e)=>setimage(e.target.files[0])}   className="form-control file" id="floatingPassword"  />
      <label   for="floatingPassword">photo</label>
    </div><Alert/>
    <br/>
    </div>
    <button   onClick={(e)=>handleSubmit()}  className=" btn  btn-primary btn_subscribe" type="submit">Sign up and subscribe</button>
    <br/>
    <br/>
    <div className='b'>
    <Link  to={"/login"} ><button type="button" onClick={disptach(empty())} className="btn_l btn btn-success log ">login</button></Link>
    <Link to={"/"} ><button type="button"  onClick={disptach(empty())}  className="btn_l btn btn-success  ret">return</button></Link>
   </div>
    </div >
    </div>
  )
}

export default Signup