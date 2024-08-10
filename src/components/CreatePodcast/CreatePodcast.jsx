import React, { useState } from 'react'
import "../../styles/create.css"
import FileInput from '../Input/FileInput';

const CreatePodcast = () => {
    const[title, setTitle] = useState("");
    const[desc, setDesc] = useState("");
    const[displayImage, setDisplayImage] = useState("");
    const[bannerImage, setBannerImage] = useState("");
    

    const handleSubmit = () => {
     if(title && desc && displayImage && bannerImage){

     } else{
      console.log(error);
     }
     }

    const displayImageHandle = (file) =>{
      setDisplayImage(file);
      console.log(file);
    };

    const bannerImageHandle = (file) => {
      setBannerImage(file);
    }

  return (
    <>
      <div className='custom-form-container'>
      <form className="custom-form" onSubmit={handleSubmit}>
      <center><h1>Create A Podcast</h1></center>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="desc">Description:</label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter the description"
          
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="displayImage">Display Image URL:</label>

        <FileInput accept={"image/*"} 
        id="display-image-input" 
        fileHandle={displayImageHandle}
        text={"Upload Display Image"}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bannerImage">Banner Image URL:</label>

        <FileInput accept={"image/*"} 
        id="banner-image-input" 
        fileHandle={bannerImageHandle}
        text={"Upload Banner Image"}
        />
      </div>
      <button type="submit" className="submit-button">Create Podcast</button>
    </form>
    </div>
    </>
  );
};

export default CreatePodcast
