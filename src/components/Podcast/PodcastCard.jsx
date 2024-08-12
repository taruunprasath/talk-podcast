import React from 'react';
import "../../styles/podcast.css";
import { Link } from 'react-router-dom';

function PodcastCard({ id, title, displayImage }) {
  console.log(displayImage);
  return (
    <Link to={`/podcast/${id}`} className="podcast-card-link">
      <div className="podcast-card">
        {displayImage ? (
          <img className="display-image-podcast" src={displayImage} alt={title} />
        ) : (
          <div className="display-image-placeholder">
            <p>No Image Available</p>
          </div>
        )}
        <p className="title-podcast">{title}</p>
      </div>
    </Link>
  );
}

export default PodcastCard;
