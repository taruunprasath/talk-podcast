import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header/Header';

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    console.log("My user",user);

    if(!user){
      return <p style={{
        fontSize: 40,
        textAlign: 'center',
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
      }}>Loading...</p>
    }
  return (
    <div>
      <Header />
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
    </div>
  )
}

export default Profile
