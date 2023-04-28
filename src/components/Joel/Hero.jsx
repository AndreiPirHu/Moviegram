import { useEffect, useState } from "react";
import "./hero.css";

const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


async function fetchPosters(api,render){

    const response = await fetch(api)
        .then(res => res.json())
        .then(data => {
            return data.results
        })
    //console.log("jojo",response);
    //response.results[0].backdrop_path

    const shuffled = [...response].sort(()=> Math.random() - 0.1);

    //const slicedArray = response.slice(0, 4);
    const slicedArray = shuffled.slice(0, 4);
    //console.log("size: ", slicedArray.length)

    const heroPictures = [];

    slicedArray.forEach((item, index) =>{
        const size = 'w300';
        const poster = item.poster_path
        const src = `https://image.tmdb.org/t/p/${size}${poster}`
        const img = <img src={src} key={index} alt="no pic" /> 

        heroPictures.push(img);
        //console.log("size: ", heroPictures.length)
    })

    /* const poster = response[0].poster_path
    const size = 'w300'
    const src = `https://image.tmdb.org/t/p/${size}${poster}`
    

    const img = <img src={src} alt="no pic" /> */
    //render(img)
    //an array with 5 img
    render(heroPictures)

}
/* function shuffle(array){
    const random = Math.floor(Math.random() * array.length);
    return [...array].sort(()=> Math.random() - 0.5);
  }; */

const Hero = () => {
    const [posters, setPosters] = useState([]);

    useEffect(()=>{
        fetchPosters(urlBase, setPosters);
    }, []);

    return(
        <div className="heroComponent">
            <section >
                <h1 className="title">Moviegram</h1>
            </section>
            <section className="heroTwo">
                {posters}
            </section>
        </div>
    );

};

export default Hero;