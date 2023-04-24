import { useEffect, useState } from "react";

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
        setMovie3(data.results);
        console.log("visar bild 3", movie3);
      });
  };
  useEffect(() => {
    FetchMovies();
  }, [movieName]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Skriv in en filmtitel"
        value={movieName}
        onChange={handleMovieNameChange}
      />
      {movie3.map((movies) => (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            alt="Movie poster"
          />
        </div>
      ))}
    </div>
  );
};
export default GetMoviePosters;
