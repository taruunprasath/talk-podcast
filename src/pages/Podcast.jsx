import React, { useEffect, useState } from 'react'
import Header from "../components/Header/Header";
import { collection,onSnapshot, query} from 'firebase/firestore';
import { db } from '../../firebase';
import { setPodcasts } from '../slices/podcastSlice';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/podcast.css";
import PodcastCard from '../components/Podcast/PodcastCard';

const Podcast = () => {

    const dispatch = useDispatch();
    const podcasts = useSelector((state)=>state.podcasts.podcasts)
    const [search, setSearch] = useState("");
    
    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts")),
            (querySnapshot)=>{
                const podcastsData = [];
                querySnapshot.forEach((doc)=>{
                    podcastsData.push({id: doc.id, ...doc.data()});
            });
            dispatch(setPodcasts(podcastsData));
            },
            (error) => {
                console.error("Error fetching podcasts:", error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    const filteredPodcast = podcasts.filter((item) =>
      item.title.toLowerCase().trim().includes(search.trim().toLowerCase())
    );
    

  return (
    <>
      <Header/>
      <div>
      <h1 style={{textAlign:"center"}}>Discover Podcasts</h1>
      <input className="search-box"
      state={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search By Title"
      type="text"
      />
      {filteredPodcast.length>0?(
        <div className="podcast-flex">
            {filteredPodcast.map((item)=>{  
            return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImageUrl}/>
        })}
        </div>
        ):(
        <p style={{textAlign:"center", fontSize:"24px"}}>{ search ? "Podcast Not Found":"No podcasts on the platform"}</p>
        )}
      </div>
    </>
  )
}

export default Podcast
