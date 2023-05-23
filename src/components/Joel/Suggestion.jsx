import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

/* css of this component in review.css */

const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`;

async function getPosters(setposts){
    
    await fetch(urlBase)
    .then(res => res.json())
    .then(data => {

        //film 1008005, out of the hero, bad resolution
        const sortedArr = data.results.filter((item) =>item.id != 1008005)
        //randomize and select 10 pics for suggestion comp
        const shuffled = [...sortedArr].sort(()=> Math.random() - 0.1);
        const slicedArray = shuffled.slice(0, 20);

        setposts(slicedArray)
    })
    .catch(err => console.log("sugestion error", err))

    

}


const Suggestion = (props) => {
    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage]= useState(1)
    const [postPerPage, setPostPerPage]= useState(20)

    /* const [width, setwidth] = useState(0);
    const slideRef = useRef(); */
    let navigate = useNavigate();

    useEffect(()=>{
        getPosters(setPosts)
        //console.log("slideref", slideRef.current.scrollWidth, slideRef.current.offsetWidth);
        //setwidth(slideRef.current.scrollWidth - slideRef.current.offsetWidth)
    }, []);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    

  return (
    <div className='suggestions-container'>

    <div className='suggestions-items' >
        {currentPosts.map((post, index) =>{
            return(
                <img src={`https://image.tmdb.org/t/p/w500${post.poster_path}`} 
                    alt="no pic available"
                    key={index}
                    onClick={() => {
                        navigate("/single/" + post.id);
                    }}/>
        )
        })}
    </div>
</div>
/*     <motion.div className='suggestions-container' ref={slideRef} whileTap={{cursor: "grabbing"}}>

        <motion.div className="suggestions-slider" drag='x' dragConstraints={{right:0, left: -2000}}>
            {currentPosts.map((post, index) =>{
                return(
                <motion.div className='suggestions-items' key={index} >
                    <img src={`https://image.tmdb.org/t/p/w500${post.poster_path}`} 
                        alt="no pic available"
                        onClick={() => {
                            navigate("/single/" + currentPosts[index].id);
                        }}/>
                </motion.div>
            )
            })}
        </motion.div>
    </motion.div> */
  )
}

export default Suggestion