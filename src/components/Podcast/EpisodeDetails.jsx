import React from 'react'
import "../../styles/episode.css";
import "../../styles/podcast.css";

const EpisodeDetails = ({index,title, description, audioFile, onClick}) => {
  return (
    <div className="episode-container">
      <h1 style={{textAlign:"left"}}>{index}. {title}</h1>
      <p style={{marginLeft:"1.5rem"}} className="podcast-description">{description}</p>
      <button className="play-button" onClick={()=>onClick(audioFile)} style={{marginLeft:"1.5rem"}}></button>
    </div>
  )
}

export default EpisodeDetails
