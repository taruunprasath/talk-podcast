import React, { useState } from 'react';
import "../../styles/create.css";
import FileInput from '../Input/FileInput';
import { db, storage, auth } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

const CreatePodcast = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState(""); 
    const [bannerImage, setBannerImage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);

        if (title && desc && displayImage && bannerImage) {  
            try {
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}-banner`);
                await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef);

                const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}-display`);
                await uploadBytes(displayImageRef, displayImage);
                const displayImageUrl = await getDownloadURL(displayImageRef);

                

                
                const podcastDocRef = doc(db, "podcasts", `${auth.currentUser.uid}-${Date.now()}`);

                await setDoc(podcastDocRef, {
                    title: title,
                    description: desc,
                    bannerImageUrl: bannerImageUrl,
                    displayImageUrl: displayImageUrl,
                    createdBy:auth.currentUser.uid
                    
                });

                setTitle("");
                setDesc("");
                setDisplayImage("");
                setBannerImage("");

                toast.success("Podcast created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                });

            } catch (error) {
                toast.error("Failed to upload file.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setLoading(false);
                console.error(error);
            }
        } else {
            toast.error("Please fill out all fields and upload images.", {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
        }
    }

    const displayImageHandle = (file) => {
        setDisplayImage(file);
        console.log(file);
    };

    const bannerImageHandle = (file) => {
        setBannerImage(file);
    };

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
                        <label htmlFor="displayImage">Display Image:</label>
                        <FileInput
                            accept={"image/*"}
                            id="display-image-input"
                            fileHandle={displayImageHandle}
                            text={"Upload Display Image"}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bannerImage">Banner Image:</label>
                        <FileInput
                            accept={"image/*"}
                            id="banner-image-input"
                            fileHandle={bannerImageHandle}
                            text={"Upload Banner Image"}
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading} >
                        {loading?"Creating Podcast...":"Create Podcast"}</button>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default CreatePodcast;
