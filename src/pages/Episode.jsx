import React, { useState } from 'react';
import Header from '../components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "../styles/create.css";
import FileInput from '../components/Input/FileInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const Episode = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const audioFileHandle = (file) => {
        setAudioFile(file);
        console.log(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        if (title && desc && audioFile && id) {
            try {
                const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(audioRef, audioFile);

                const audioUrl = await getDownloadURL(audioRef);

                const episodeData = {
                    title: title,
                    description: desc,
                    audioFile: audioUrl,
                };

                await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);

                toast.success("Episode Created Successfully",{position:"top-right"});
                setLoading(false);
                navigate(`/podcast/${id}`);

                setTitle("");
                setDesc("");
                setAudioFile("");

            } catch (error) {
                toast.error(error.message,{position:"top-right"});
                setLoading(false);
            }
        } else {
            toast.error("Please fill out all fields and upload an audio file.",{position:"top-right"});
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className='custom-form-container'>
                <form className="custom-form" style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
                    <center><h1>Create An Episode</h1></center>
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
                        <label htmlFor="displayImage">Podcast Audio:</label>
                        <FileInput
                            accept={"audio/*"}
                            id="audio-file-input"
                            fileHandle={audioFileHandle}
                            text={"Upload Audiofile"}
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Creating Episode..." : "Create Episode"}
                    </button>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default Episode;
