import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../styles/signup.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; 
import Logo from "../assets/Logo.png";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => { 
    e.preventDefault();
    if (password === confirmPassword && password.length >= 6) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            name: name, 
            email: user.email,
            uid: user.uid,
            // profilePic: fileUrl 
          });
          toast.success('Signup successful!', { position: "top-right" ,autoClose:3000 });
          navigate('/profile');
        }
      } catch (error) {
        toast.error('User already exists or there was an error during signup.', { position: "top-right", autoClose:3000 });
      }
    } else {
      toast.warn('Password does not match or password is less than 6 characters.', { position: "top-right", autoClose:3000 });
    }
  };

  return (
    <>
    <div className="gradient"></div>
    <div className="logo-center"><img src={Logo} alt="Logo"/></div>
      <div className="signup-container">
        <div className="wrapper1">
          <form onSubmit={submit}>
            <h1>SIGN UP</h1>
            <div className="input-box1">
              <input
                type="text"
                placeholder="Enter Your Username"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box1">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className="icon" />
            </div>
            <div className="input-box1">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <IoIosEye
                  className="icon"
                  id="ic"
                  title="Hide Password"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <IoIosEyeOff
                  className="icon"
                  id="ic"
                  title="Show Password"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>
            <div className="input-box1">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {show ? (
                <IoIosEye
                  className="icon"
                  id="ic-confirm"
                  title="Hide Password"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <IoIosEyeOff
                  className="icon"
                  id="ic-confirm"
                  title="Show Password"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>
            <button type="submit">Sign Up</button>

            <div className="register">
              <p>Already have an account? <Link to="/"><span>Login</span></Link></p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
