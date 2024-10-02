import "./App.css";
import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Pay from "./components/Pay/Pay";
import Admin from "./components/Admin/Admin";
import Reception from "./components/Reception/Reception";
import AddOffer from "./components/AddOffer/AddOffer";
import EditOffer from "./components/EditOffer/EditOffer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOffers } from "./Redux/actions/actionsOffer";
import { getCurrent } from "./Redux/actions/actionsUser";
import PrivateRoute from "./components/routes/PrivateRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import EditUser from "./components/EditUser/EditUser";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllOffers())
  
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getCurrent());
    }
  }, [dispatch,token]);
  
  return (
       <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path={'/edituser/:id'} element={<PrivateRoute><EditUser/></PrivateRoute>}/>
        <Route path='/pay' element={<PrivateRoute><Pay/></PrivateRoute>}/>
        <Route path='/admin' element={<AdminRoutes><Admin/></AdminRoutes>}  />
        <Route path='/add' element={<AdminRoutes><AddOffer/></AdminRoutes>}/>
        <Route path={'/edit/:id'} element={<AdminRoutes><EditOffer/></AdminRoutes>}/>
        <Route path='/reception' element={<Reception/>}/>
        <Route path='*' element={<Home />}/>
      </Routes>
 
  );
}

export default App;
