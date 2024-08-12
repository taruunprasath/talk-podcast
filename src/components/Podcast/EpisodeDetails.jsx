import React, { useState } from 'react'
import "../../styles/episode.css";
import "../../styles/podcast.css";
import ConfirmationModal from "../Modal/Modal";
import { auth } from '../../../firebase';

const EpisodeDetails = ({index,title, description, audioFile, onClick, onDelete,createdBy}) => {
  const currentUserId = auth.currentUser.uid;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsModalOpen(false);
  };
  
  return (
    <div className="episode-container" style={{position: "relative"}}>
      <h1 style={{textAlign:"left"}}>{index}. {title}</h1>
      <p style={{marginLeft:"1.5rem"}} className="podcast-description">{description}</p>
      <button className="play-button" onClick={()=>onClick(audioFile)} style={{marginLeft:"1.5rem"}}></button>
      {createdBy === currentUserId && (
        <>
        <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
        <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
          </>
      )}
    </div>
  )
};

export default EpisodeDetails
