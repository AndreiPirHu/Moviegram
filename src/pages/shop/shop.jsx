import React from "react";
import "./shop.css";
import { useEffect, useState } from "react";
import GetMoviePosters from "../../components/getPosters";

export const Shop = () => {
  const [movie, setMovie] = useState([]);

  const FetchMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/week?api_key=9bf8866aec070a01073c600a88bbefb5"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMovie(data.results);
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
        <GetMoviePosters />
      </div>

      <div className="products">
        {movie.map((movies) => (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt="Movie poster"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
