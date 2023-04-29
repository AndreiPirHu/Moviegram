import axios from "axios";
import { useEffect, useState } from "react";
import "../components/getPostersStyle.css";
import { useNavigate } from "react-router-dom";

const GetMoviePosters = () => {
  const [movieGenre, setMovieGenre] = useState([]);
  const [movie3, setMovie3] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movie_id, setMovie_id] = useState("");

  //joel: added navigate/import
  let navigate = useNavigate();

  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };

  // gets movie posters from api in a search (name, actors, titels)
  const FetchMovies = () => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=9bf8866aec070a01073c600a88bbefb5&query=${encodeURIComponent(
      movieName
    )}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovie3(data.results);
        console.log("visar bild 3", movie3);
      });
  }; //  api with diffrent genre
  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=9bf8866aec070a01073c600a88bbefb5&with_genres=${encodeURIComponent(
      movie_id
    )} `;
    axios
      .get(apiUrl)
      .then((response) => {
        setMovieGenre(response.data.results);
        console.log("visar bild 3", movieGenre[1].backdrop_path);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie_id]);
  useEffect(() => {
    FetchMovies();
  }, [movieName]);

  return (
    <div className="placeholder">
      <div>
        <button id="scinceF" onClick={() => setMovie_id(878)}>
          Science Fiction{" "}
        </button>
        <button id="drama" onClick={() => setMovie_id(18)}>
          Drama{" "}
        </button>
        <button id="crime" onClick={() => setMovie_id(80)}>
          Crime
        </button>
        <button id="romance" onClick={() => setMovie_id(10749)}>
          Romance
        </button>
        <button id="action" onClick={() => setMovie_id(28)}>
          Action
        </button>
        <button id="Animation" onClick={() => setMovie_id(16)}>
          Animation
        </button>
        <button id="Tv show" onClick={() => setMovie_id(16)}>
          Tv show
        </button>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Sök filmer här"
          value={movieName}
          onChange={handleMovieNameChange}
        />
      </div>

      <div className="searchImage">
        {movie3.map((movies, index) => (
          <img
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            alt="Movie poster"
            onClick={() => {
              navigate("/single/" + movie3[index].id);
            }}
          />
        ))}
        <div className="genreStyle">
          {movieGenre.map((movie) => (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Movie poster"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetMoviePosters;
