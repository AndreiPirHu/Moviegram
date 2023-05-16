import React, { useEffect, useState } from 'react'

const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

async function getPosters(setposts){
    
    await fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            console.log("sugestion data", data.results)
            setposts(data.results)
        })
        .catch(err => console.log("sugestion error", err))

    //console.log("jojo",response);
    //response.results[0].backdrop_path

    //film 1008005, out of the hero, bad resolution
    //const sortedArr = response.filter((item) =>item.id != 1008005)
    //randomize and select 7 pics for hero
    /* const shuffled = [...sortedArr].sort(()=> Math.random() - 0.1);
    const slicedArray = shuffled.slice(0, 7);

    const heroPictures = [];

    slicedArray.forEach((item, index) =>{
        const size = 'w300';
        const poster = item.poster_path
        const src = `https://image.tmdb.org/t/p/${size}${poster}`
        const img = <img src={src} key={index} alt="no pic" />

        heroPictures.push(img);
        //console.log("size: ", heroPictures.length)
    }) */

    //render(heroPictures)

}


const Suggestion = () => {
    const [posts, setPosts] = useState(null);

    const [currentPage, setCurrentPage]= useState(1)
    const [postPerPage, setPostPerPage]= useState(10)

    useEffect(()=>{
        //getPosters(setPosts)
        /* const response = fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            console.log("sugestion data", data.results)
            setPosts(data.results)})
        .catch(err => console.log("sugestion error", err)) */
        fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            setPosts(data.results)
        })
        .catch(err => console.log("sugestion error", err))

    }, []);


  return (
    <div className='suggestions'>
        Suggestions
        {/* {posts.map((post) =>(
            <div>{post.original_title}</div>
        ))} */}
    </div>
  )
}

export default Suggestion