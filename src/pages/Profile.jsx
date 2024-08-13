import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import "../styles/profile.css";
import PodcastCard from "../components/Podcast/PodcastCard";
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [userPodcasts, setUserPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(db, "podcasts")),
        (querySnapshot) => {
          const podcastsData = [];
          querySnapshot.forEach((doc) => {
            const podcast = { id: doc.id, ...doc.data() };
            console.log("Fetched podcast:", podcast); 
            if (podcast.createdBy === user.uid) {
              podcastsData.push(podcast);
            }
          });
          console.log("Filtered podcasts:", podcastsData); 
          setUserPodcasts(podcastsData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching user podcasts:", error);
          setLoading(false);
        }
      );
  
      return () => {
        unsubscribe();
      };
    }
  }, [user]);
  

  if (loading) {
    return (
      <p style={{
        fontSize: 40,
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        Loading...
      </p>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="welcome-container">
          <h1 className="welcome-message">Welcome, {user.name}!</h1>
          <p className="welcome-subtext">We're glad to have you here. Dive into our latest episodes and enjoy your podcast journey!</p>
        </div>
        <h1 style={{textAlign:"center"}}>Your Podcasts</h1>
        <div className="podcast-flex">
          {userPodcasts.length > 0 ? (
            userPodcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                displayImage={podcast.displayImageUrl}
              />
            ))
          ) : (
            <p style={{ fontSize: 24, textAlign: 'center' }}>You haven't created any podcasts yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
