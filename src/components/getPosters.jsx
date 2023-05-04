import axios from "axios";
import { useEffect, useState } from "react";
import "../components/getPostersStyle.css";
import { useNavigate } from "react-router-dom";

const GetMoviePosters = () => {
  // Ernesto: sätter state till den fetchade movieGenre objektet (discover)
  const [dataMovieGenre, setDataMovieGenre] = useState([]);
  // Ernest : ändrar state till den valda genre nummer t.ex. nummer 28 = drama
  const [chosenGenre, setChosenGenre] = useState("");
  // Ernesto: sätter data för fetchade url som har en sök api.
  const [searchtMovieData, setSearchtMovieData] = useState([]);
  //Ernesto: denna state det som sök i searchMovie
  const [searchtMovieName, setSearchtMovieName] = useState("");
  const [hasSearchResults, setHasSearchResults] = useState(false);
  //joel: added navigate/import
  let navigate = useNavigate();
  // Ernesto: visar search bilden om inputen inte är null annars visar den genrebilder

  // gets movie posters from api in a search (name, actors, titels)
  const FetchMovies = () => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=9bf8866aec070a01073c600a88bbefb5&query=${encodeURIComponent(
      searchtMovieName
    )}`;

    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSearchtMovieData(data.results);
      });
  }; //  api with diffrent genre
  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=9bf8866aec070a01073c600a88bbefb5&with_genres=${encodeURIComponent(
      chosenGenre
    )} `;
    axios
      .get(apiUrl)
      .then((response) => {
        setDataMovieGenre(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chosenGenre]);
  const handleMovieNameChange = (event) => {
    //showRightImage !== null
    // const showRightImage = event.target.value;
    setSearchtMovieName(event.target.value);
    if (event.target.value) {
      setHasSearchResults(true);
      console.log("inne i if");
      // setSearchtMovieName(showRightImage);
      setDataMovieGenre([]);
    } else {
      setHasSearchResults(false);
      console.table("finns i else", dataMovieGenre);
      setChosenGenre(28);
    }
  };
  useEffect(() => {
    FetchMovies();
  }, [searchtMovieName]);
  return (
    <div className="placeholder">
      <div className="buttonGenre">
        <button id="genreButtonGroup1" onClick={() => setChosenGenre(878)}>
          Science Fiction
        </button>
        <button id="genreButtonGroup1" onClick={() => setChosenGenre(18)}>
          Drama{" "}
        </button>
        <button id="genreButtonGroup1" onClick={() => setChosenGenre(80)}>
          Crime
        </button>
        <button id="genreButtonGroup2" onClick={() => setChosenGenre(10749)}>
          Romance
        </button>
        <button id="genreButtonGroup2" onClick={() => setChosenGenre(28)}>
          Action
        </button>
        <button id="genreButtonGroup2" onClick={() => setChosenGenre(16)}>
          Animation
        </button>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Sök filmer här"
          value={searchtMovieName}
          onChange={handleMovieNameChange}
        />
      </div>
      <div className="scroll-container">
        <div className="searchImage">
          {hasSearchResults ? (
            searchtMovieData.map((movie, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Movie poster"
                onClick={() => {
                  navigate("/single/" + movie.id);
                }}
              />
            ))
          ) : (
            <div className="genreStyle">
              {dataMovieGenre.map((movie, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Movie poster"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GetMoviePosters;
