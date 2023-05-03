import { useEffect, useState } from "react";
import "../components/getPostersStyle.css";


const GetMoviePosters = () => {
  const [movie3, setMovie3] = useState([]);
  const [movieName, setMovieName] = useState("");

  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };
  const FetchMovies = () => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=9bf8866aec070a01073c600a88bbefb5&query=${encodeURIComponent(
      movieName
    )}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.table("getMovie data: ", data)
        setMovie3(data.results);
      });
  };
  useEffect(() => {
    FetchMovies();
  }, [movieName]);

  return (
    <div className="placeholder">
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
          <div className="movie-poster" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt="Movie poster"
            />
            <h3 className="movie-name">
              {movies.original_title}
            </h3>
            {/* <li key={movies.id}>
              {movies.original_title} - $10
              <button onClick={() => addToCart(cartObject(movies.original_title))}>Add to Cart</button>
            </li> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default GetMoviePosters;
