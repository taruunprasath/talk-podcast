import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import "../styles/podcast.css"
import Header from '../components/Header/Header';
import EpisodeDetails from '../components/Podcast/EpisodeDetails';
import Audioplayer from '../components/Audioplayer/Audioplayer';

const PodcastDetail = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes]= useState([]);
  const [playing, setPlaying] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.error("Podcast not found.");
        setTimeout(() => navigate("/podcasts"), 3000);
      }
    } catch (error) {
      console.error("Error fetching podcast:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot)=>{
        const episodeData = [];
        querySnapshot.forEach((doc)=>{
          episodeData.push({id: doc.id, ...doc.data()});
        });
        setEpisodes(episodeData);
      },  
      (error) => {
        console.error("Error fetching episodes:", error);
      }
    );
    return () => unsubscribe();
  }, [id]);

  return (
    <div className="podcast-detail-container">
      <Header />
      {loading ? (
        <p className="loading-message">Loading podcast details...</p>
      ) : (
        podcast.id && (
          <>
          {podcast.createdBy == auth.currentUser.uid &&(
          <div className="btn1-container">
           <button className="btn1" onClick={()=>{
                navigate(`/podcast/${id}/create-episode`);
              }}> Create Episodes
              </button>
              </div>
          )}
            <div className="banner-wrapper">
              <img src={podcast.bannerImageUrl} alt={podcast.title} className="banner-image" />
              <h1 className="title-overlay">{podcast.title}</h1>
              <div className="gradient1"></div>
            </div>
            <div className="podcast-content">
              <p className="podcast-description">{podcast.description}</p>
              <h2 className="episodes-heading">Episodes</h2>
              {episodes.length>0?(
                <>{episodes.map((episodes, index)=>{
                  return <EpisodeDetails 
                  key={index}
                  index={index + 1}
                  title={episodes.title} 
                  description={episodes.description} 
                  audioFile={episodes.audioFile}
                   onClick={(file)=> setPlaying(file)}
                   />
                })}
                </>
                ):(
                <p>No Episodes</p>
                )}
                
            </div>
            {playing && (
              <Audioplayer audioSrc={playing} image={podcast.displayImageUrl} />
              )}
          </>
          
        )
      )}
    </div>
    
  );
};

export default PodcastDetail;
