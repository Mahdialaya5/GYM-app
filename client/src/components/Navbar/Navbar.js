import React from 'react'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/actions/actionsUser'

function Navbar() {
    const user = useSelector(state => state.userReducer.currentUser)
    const naviagte=useNavigate()
    const disptach=useDispatch()
    const token = localStorage.getItem("token")
  return (
    <nav  className='nh'>
    <span className='logo' >GYM</span>
  <div className='btns'>
  
  {token? null:<><Link to={"/login"}> <button type="button"  className="btn-gym ">signin</button> </Link>
 <Link to={"/signup"}><button type="button"  className="btn-gym">subscribe</button></Link></>}
 </div>
 {!token || user.role=="admin"|| user.role=="reception" ?null:<Link to={"/profile"}><button type="button"  className="btn btn-primary">profile</button></Link>}
 {token && user.role=="admin" ? <Link to={"/admin"}><button type="button"  className="btn btn-primary">admin profile</button></Link>:null}
 {token && user.role=="reception" ? <Link to={"/reception"}><button type="button"  className="btn btn-primary">reception profile</button></Link>:null}
 {token?<button onClick={() => disptach(logout(),naviagte("/"))}  type="button"  className="sig  btn btn-success logout">logout</button>:null}
</nav>
  )
}

export default Navbar