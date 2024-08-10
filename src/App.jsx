import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Create from './pages/Create';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.error(error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      authUnsubscribe();
    };
  }, [auth, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create" element={<Create />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
