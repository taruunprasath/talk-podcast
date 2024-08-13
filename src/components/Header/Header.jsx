import React, { useState } from 'react'
import '../Header/header.css';
import Logo from "../../assets/Logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  
import { toast, ToastContainer} from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import ConfirmationModal from '../Modal/Modal';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          toast.success("User Logged Out!", { position: "top-right", autoClose: 1000 });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        });
    };
    

  return (
    <>
    <div className="navbar">
        <div className="gradient"></div>
        <div className="logo"><img src={Logo} alt="Logo"/></div>
        <div className='links'>
        <Link to="/podcasts" className={currentPath === "/podcasts" ? "active" : ""}>Podcasts</Link>
        <Link to="/create" className={currentPath === "/create" ? "active" : ""}>Create</Link>
        <Link to="/profile" className={currentPath === "/profile" ? "active" : ""}>Profile</Link>
        <button className="logout-button" onClick={() => setIsModalOpen(true)}>Logout</button>
        </div>
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </div>
    <ToastContainer/>
    </>
  )
}

export default Header
