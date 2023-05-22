import { useEffect, useState } from "react";
import "./hero.css";

const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


async function fetchPosters(render){
    
    const response = await fetch(urlBase)
        .then(res => res.json())
        .then(data => data.results)
    //console.log("jojo",response);
    //response.results[0].backdrop_path

    //film 1008005, out of the hero, bad resolution
    const sortedArr = response.filter((item) =>item.id != 1008005)
    //randomize and select 7 pics for hero
    const shuffled = [...sortedArr].sort(()=> Math.random() - 0.1);
    const slicedArray = shuffled.slice(0, 7);

    const heroPictures = [];

    slicedArray.forEach((item, index) =>{
        const size = 'w300';
        const poster = item.poster_path
        const src = `https://image.tmdb.org/t/p/${size}${poster}`
        const img = <img src={src} key={index} alt="no pic" />

        heroPictures.push(img);
        //console.log("size: ", heroPictures.length)
    })

    render(heroPictures)

}
/* function shuffle(array){
    const random = Math.floor(Math.random() * array.length);
    return [...array].sort(()=> Math.random() - 0.5);
  }; */

const Hero = () => {
    const [posters, setPosters] = useState([]);

    useEffect(()=>{
        fetchPosters(setPosters);
    }, []);

    return(
        <div className="heroComponent">
            <section className="sectiontitle" >
                <h1 className="title">Moviegram</h1>
            </section>
            <h2>Find your favorite poster here!</h2>
            {/* <section className="sectionpictures">
                {posters}
            </section> */}
        </div>
    );

};

export default Hero;