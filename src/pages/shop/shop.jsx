import React from 'react'
import "./shop.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export const Shop = () => {
    const [movie, setMovie] = useState([]);
    const baseUrl = " https://api.themoviedb.org/3/movie/popular?api_key=9bf8866aec070a01073c600a88bbefb5&language=en-US&page=1"
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    const FetchMovies = () => {
        fetch(baseUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setMovie(data.results);
                console.log("data.results", movie);
            });
    };

    useEffect(() => {
        FetchMovies();

    }, []);

    return (
        <>
            <div className="shop">
                <div className="shopTitle">
                    <h1>Moviegram</h1>
                </div>
                <div className="products">
                    <section className="shop-sec">
                        <div className="shop-div">
                            {movie.map((poster) => (

                                <Link
                                    to={`/cart`}
                                    key={poster.id}
                                    className="shop-link"
                                >
                                    <article >
                                        <img
                                            src={`${posterBaseUrl}${poster.poster_path}`}
                                            alt={poster.name}
                                            loading="lazy"
                                            className="shop-img" />
                                        <h3 className="movie-name">
                                            {poster.original_title}
                                        </h3>
                                        <p className="movie-vote">vote: {poster.vote_average}</p>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}
