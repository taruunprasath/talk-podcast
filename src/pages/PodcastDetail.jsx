import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, writeBatch, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import "../styles/podcast.css";
import Header from '../components/Header/Header';
import EpisodeDetails from '../components/Podcast/EpisodeDetails';
import Audioplayer from '../components/Audioplayer/Audioplayer';
import { toast } from 'react-toastify';
import ConfirmationModal from '../components/Modal/Modal';
import { useSelector } from 'react-redux';

const PodcastDetail = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [podcast, setPodcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [creatorName, setCreatorName] = useState("");
  const [playing, setPlaying] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        const podcastData = { id: id, ...docSnap.data() };
        setPodcast(podcastData);

        const userRef = doc(db, "users", podcastData.createdBy);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCreatorName(userSnap.data().name);
        } else {
          console.error("User not found.");
        }

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => {
        console.error("Error fetching episodes:", error);
      }
    );
    return () => unsubscribe();
  }, [id]);

  const handleDeleteEpisode = async (episodeId) => {
    try {
      const episodeRef = doc(db, "podcasts", id, "episodes", episodeId);
      await deleteDoc(episodeRef);
      toast.success("Episode deleted successfully!", { position: "top-right", autoClose: 2000 });

      setEpisodes((prevEpisodes) => 
        prevEpisodes.filter((episode) => episode.id !== episodeId)
      );
    } catch (error) {
      console.error('Error deleting episode:', error);
      toast.error("Error deleting episode. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleDeletePodcast = async () => {
    try {
      const batch = writeBatch(db);

      const episodesRef = collection(db, "podcasts", id, "episodes");
      const querySnapshot = await getDocs(episodesRef);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      const podcastRef = doc(db, "podcasts", id);
      batch.delete(podcastRef);

      await batch.commit();

      toast.success("Podcast and all episodes deleted successfully!", { position: "top-right", autoClose: 2000 });
      navigate("/podcasts");
    } catch (error) {
      console.error('Error deleting podcast:', error);
      toast.error("Error deleting podcast. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="podcast-detail-container">
      <Header />
      {loading ? (
        <p className="loading-message">Loading podcast details...</p>
      ) : (
        podcast.id && (
          <>
            {podcast.createdBy === auth.currentUser.uid && (
              <div className="btn1-container">
                <button
                  className="btn1"
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                    toast.success("Episode Created Successfully!", { position: "top-right", autoClose: 2000 });
                  }}
                >
                  Create Episode
                </button>
                <button
                  className="btn1"
                  id="btn1"
                  onClick={() => setIsModalOpen(true)}
                >
                  Delete Podcast
                </button>
              </div>
            )}
            <div className="banner-wrapper">
              <img src={podcast.bannerImageUrl} alt={podcast.title} className="banner-image" />
              <h1 className="title-overlay">{podcast.title} <span style={{fontSize:"20px",color:"rgba(178, 176, 177, 1)"}}>by: {creatorName}</span></h1>
              <div className="gradient1"></div>
            </div>
            <div className="podcast-content">
              <p className="podcast-description">{podcast.description}</p>
              <h2 className="episodes-heading">Episodes</h2>
              {episodes.length > 0 ? (
                episodes.map((episode, index) => (
                  <EpisodeDetails
                    key={episode.id}
                    index={index + 1}
                    title={episode.title}
                    description={episode.description}
                    audioFile={episode.audioFile}
                    onClick={() => setPlaying(episode.audioFile)}
                    onDelete={() => handleDeleteEpisode(episode.id)}
                    createdBy={podcast.createdBy}
                  />
                ))
              ) : (
                <p>No Episodes</p>
              )}
            </div>
            {playing && (
              <Audioplayer audioSrc={playing} image={podcast.displayImageUrl} />
            )}
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDeletePodcast}
              message={"Are you sure you want to delete this podcast and all its episodes?"}
            />
          </>
        )
      )}
    </div>
  );
};

export default PodcastDetail;
