import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { empty, login } from '../../Redux/actions/actionsUser';
import Alert from '../Alert/Alert';
import "./login.css"
function Login() {
  const dispatch=useDispatch()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()

  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(empty())
    dispatch(login({email,password}, navigate))
     
      };

return (
  <div className='login_page'>
    <form className="login_form"  onSubmit={handleSubmit} >
    <label for="floatingInput">Email </label>
     <input  onChange={(e)=>setemail(e.target.value)} type="email" className="form-control" placeholder='EMAIL' />
    <br/>
      <label >Password</label>
     <input onChange={(e)=>setpassword(e.target.value)} type="password" className="form-control" placeholder="PASSWORD"  autocomplete="on" />
     <br/>
    <Alert/>
    <div  className='btns_login' >
      <button type="submit"  className="btn btn_l btn-success">login</button>
  <Link  to={"/"}><button type="button" onClick={dispatch(empty())}  className="btn btn_l btn-success">return</button></Link>
   </div>
   </form>
      </div>
)
}

export default Login