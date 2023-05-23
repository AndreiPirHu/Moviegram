import React from "react";
import "./shop.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import GetMoviePosters from "../../components/getPosters";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setDoc, collection, db, doc } from "../../firebase";
import { actions } from "../../features/cartitems";
import Hero from "../../components/Joel/Hero";
import Footer from "../../components/Joel/Footer";
import { useNavigate } from "react-router-dom";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";


export const Shop = () => {
    const [movie, setMovie] = useState([]);
    const [poster, setPoster] = useState([]);
    const user = useSelector((state) => state.login.user);
    const isLoggedIn = useSelector((state) => state.login.loggedIn);
    const cart = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();
    //joel: added navigate/import
    let navigate = useNavigate();

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    const FetchMovies = () => {
        fetch(
            "https://api.themoviedb.org/3/trending/all/week?api_key=9bf8866aec070a01073c600a88bbefb5"
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                /* console.log(data); */
                setMovie(data.results);
                /* console.log("här", movie); */
            });
    };

    useEffect(() => {
        FetchMovies();
    }, []);

    return (
        <div className="shop">
            <Hero />
            <GetMoviePosters />
            <div className="productcontainer">
                <CaretLeft className="chevron" onClick={slideLeft} size={150} />
                <div id="slider" className="products">

                    {/* joel: added index&onClick to navigate to individualPoster */}
                    {movie.map((movies, index) => (
                        <div className="" key={index}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                                alt="Movie poster"
                                onClick={() => { navigate("/single/" + movie[index].id) }}
                            />
                        </div>
                    ))}
                </div>
                <CaretRight className="chevron" onClick={slideRight} size={150} />
            </div>
            <Footer />

        </div>
    );
};
