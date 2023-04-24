import React from 'react'
import "./shop.css";
import { useEffect, useState } from "react";

export const Shop = () => {
    const [movie, setMovie] = useState([]);

    const FetchMovies = () => {
        fetch(
            "https://api.themoviedb.org/3/movie/550?api_key=9bf8866aec070a01073c600a88bbefb5&append_to_response=videos,images"
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setMovie(data.images.posters[0].file_path);
                console.log("här", movie);
            });
    };

    useEffect(() => {
        FetchMovies();
    }, []);

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Moviegram</h1>
            </div>
            <div className="products">
                {" "}
                {movie && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie}`}
                        alt="Movie poster"
                    />
                )}
            </div>
        </div>
    )
}
