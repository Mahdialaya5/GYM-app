import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { empty, login } from '../../Redux/actions/actionsUser';
import Alert from '../Alert/Alert';
import "./login.css"
function Login() {
  const disptach=useDispatch()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()

  
  const handleSubmit = (e) => {
    disptach(empty())
    disptach(login({email,password}, navigate))
     
      };

return (
  <div className='login_page'>
    <div className="login_form"  >
    <label for="floatingInput">Email </label>
     <input  onChange={(e)=>setemail(e.target.value)} type="email" className="form-control" placeholder='EMAIL' />
    <br/>
      <label >Password</label>
     <input onChange={(e)=>setpassword(e.target.value)} type="password" className="form-control" placeholder="PASSWORD"/>
     <br/>
    <Alert/>
    <div  className='btns_login' >
      <button type="button" onClick={(e)=>handleSubmit()}  className="btn btn_l btn-success">login</button>
  <Link  to={"/"}><button type="button" onClick={disptach(empty())}  className="btn btn_l btn-success">return</button></Link>
   </div>
   </div>
      </div>
)
}

export default Login