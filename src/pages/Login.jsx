import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; 
import { toast, ToastContainer } from 'react-toastify';
import { setUser } from '../slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';  
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import Logo from "../assets/Logo.png";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      dispatch(
        setUser({
          name:userData.name,
          email:user.email,
          uid:user.id,
          profilePic:userData.profilePic
        })
      );

      if (user) {
        toast.success("Login Successful",{ position: "top-right", autoClose:3000 });
        navigate('/profile');
      }
    } catch (error) {
      toast.error("Invalid Login", { position: "top-right", autoClose:3000 });
    }
  };

  return (
    <>
    <div className="gradient"></div>
    <div className="logo-center"><img src={Logo} alt="Logo"/></div>
      <div className="login-container">
        <div className='wrapper'>
          <form onSubmit={submit}>
            <h1>LOGIN</h1>
            <div className='input-box'>
              <input
                type='email' 
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdEmail className='icon' />
            </div>
            <div className='input-box'>
              <input
                type={show ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {show ? (
                <IoIosEye
                  className='icon'
                  id="ic"
                  title="Hide Password"
                  onClick={() => setShow(prev => !prev)}
                />
              ) : (
                <IoIosEyeOff
                  className='icon'
                  id="ic"
                  title="Show Password"
                  onClick={() => setShow(prev => !prev)}
                />
              )}
            </div>

            <button type="submit">Login</button>

            <div className="register">
              <p>Don't have an account? <Link to="/signup"><span>Signup</span></Link></p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer /> 
    </>
  );
}

export default Login;
