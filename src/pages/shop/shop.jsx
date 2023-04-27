import React from "react";
import "./shop.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import GetMoviePosters from "../../components/getPosters";

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setDoc, collection, db, doc } from '../../firebase';
import { actions } from '../../features/cartitems';



export const Shop = () => {
    const [movie, setMovie] = useState([]);
    const trendingUrl = "https://api.themoviedb.org/3/trending/all/week?api_key=9bf8866aec070a01073c600a88bbefb5"
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    const user = useSelector(state => state.login.user)
    const cart = useSelector(state => state.cartItems)

    const dispatch = useDispatch();


    /* const items = [
        { id: uuidv4(), name: 'small', price: 10 },
        { id: uuidv4(), name: 'medium', price: 15 },
        { id: uuidv4(), name: 'large', price: 20 },
    ]; */

    // temp data for posters 
    const cartObject = (movieName) => {
        const item = { id: uuidv4(), name: movieName, price: 10 };
        return item;
    }

    const addToCart = async (item) => {
        //adds item to cart
        dispatch(actions.addItem(item));
        console.log("data to localStorage", item)
        console.log("itemId: ", item.id)
        console.log("cartObject: ", cart)

        if (!user) {
            console.log('user is not logged in for firestore save');

            return;
        }
        try {
            //reference to correct collection
            const cartItemsRef = collection(db, 'users', user, 'cartItems');

            // Set the itemID as the doc name
            const itemDocRef = doc(cartItemsRef, item.id);
            console.log("itemId: ", item.id)
            //Add item to firestore
            await setDoc(itemDocRef, item);
            console.log(`Item added to firestore with ID: ${item.id}`);
        } catch (e) {
            console.error('Error adding item to firestore:', e)
        }

    };

    const FetchMovies = () => {
        fetch(trendingUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                /* console.log("fetchdata", data); */
                setMovie(data.results);
            });
    };
    useEffect(() => {
        FetchMovies();

    }, []);

    return (

        <div className="shop">
            <div className="shopTitle">
                <GetMoviePosters />
            </div>
            <h3 className="trending">Trending</h3>
            <div className="products">
                {movie.map((movies) => (
                    <div key={movies.id}>
                        <div className="movie-poster">
                            <img
                                src={`${posterBaseUrl}${movies.poster_path}`}
                                alt="Movie poster"
                            />
                            <h3 className="movie-name">
                                {movies.original_title}
                            </h3>
                            <li key={movies.id}>
                                {movies.original_title} - $10
                                <button onClick={() => addToCart(cartObject(movies.original_title))}>Add to Cart</button>
                            </li>
                        </div>
                    </div>
                ))}
            </div>
      </div>
    )
}

