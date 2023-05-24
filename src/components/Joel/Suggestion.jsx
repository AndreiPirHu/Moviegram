import React, { useEffect, useState } from 'react'
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
        //randomize and select 20 pics for suggestion comp
        const shuffled = [...sortedArr].sort(()=> Math.random() - 0.1);
        const slicedArray = shuffled.slice(0, 20);

        setposts(slicedArray)
    })
    .catch(err => console.log("sugestion error", err))

    

}


const Suggestion = (props) => {
    const [posts, setPosts] = useState([]);

    let navigate = useNavigate();

    useEffect(()=>{
        getPosters(setPosts)
    }, []);

    const currentPosts = posts.slice(1, 20)
    
    function updatePage(){
        props.resetBtns(true);
        console.log("resetBTNS")
        //navigate("/single/"+post.id)
    }

  return (
    <div className='suggestions-container'>
        <h3>Get one of this great posters too!!</h3>
        <div className='suggestions-items' >
            {currentPosts.map((post, index) =>{
                return(
                    <img src={`https://image.tmdb.org/t/p/w500${post.poster_path}`} 
                        alt="no pic available"
                        key={index}
                        onClick={()=>{
                            //updatePage(); 
                            navigate("/single/"+post.id)
                        }}/>
            )
            })}
        </div>
</div>
  )
}

export default Suggestion