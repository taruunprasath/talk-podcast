import React from 'react'
import '../Header/header.css';
import Logo from "../../assets/Logo.png";
import { Link, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  
import { toast, ToastContainer } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () =>{
    signOut(auth).then(()=>{
      toast.success("User Logged Out!",{position:"top-right",autoClose:3000});
    })
    .catch((error) => {
      toast.error(error.message);
    });
    }

  return (
    <div className="navbar">
        <div className="gradient"></div>
        <div className="logo"><img src={Logo} alt="Logo"/></div>
        <div className='links'>
        <Link to="/podcasts" className={currentPath === "/podcasts" ? "active" : ""}>Podcasts</Link>
        <Link to="/create" className={currentPath === "/create" ? "active" : ""}>Create</Link>
        <Link to="/profile" className={currentPath === "/profile" ? "active" : ""}>Profile</Link>
        <Link to="/" onClick={handleLogout}>Logout</Link>
        <ToastContainer />
        </div>
    </div>
  )
}

export default Header
