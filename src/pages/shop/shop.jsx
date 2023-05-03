import React from "react";
import "./shop.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import GetMoviePosters from "../../components/getPosters";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setDoc, collection, db, doc } from '../../firebase';
import { actions } from '../../features/cartitems';
import Hero from "../../components/Joel/Hero";
import { useNavigate } from "react-router-dom";


export const Shop = () => {
  const [movie, setMovie] = useState([]);
  
  const [poster, setPoster ] = useState([]);

    const user = useSelector( state => state.login.user)
    const isLoggedIn = useSelector( state => state.login.loggedIn)
    const cart = useSelector(state => state.cartItems)

    const dispatch = useDispatch();



  //joel: added navigate/import
  let navigate = useNavigate();

  const items = [
    { id: uuidv4(), name: "Item 1", price: 10 },
    { id: uuidv4(), name: "Item 2", price: 15 },
    { id: uuidv4(), name: "Item 3", price: 20 },
  ];


  const addToCart = async (item) => {
    //adds item to cart
    dispatch(actions.addItem(item));

    //Stops here if user is not signed in
    if (!isLoggedIn) {
        console.log('user is not logged in for firestore save');
        
        return;
    }
    //if user is signed in it adds items to firestore
    try{
        //reference to correct collection
        const cartItemsRef = collection(db, 'users', user, 'cartItems');

      // Set the itemID as the doc name
      const itemDocRef = doc(cartItemsRef, item.id);

      //Add item to firestore
      await setDoc(itemDocRef, item);
      console.log(`Item added to firestore with ID: ${item.id}`);
    } catch (e) {
      console.error("Error adding item to firestore:", e);
    }
  };


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
      <Hero />
        <GetMoviePosters />
      </div>

      <div className="products">
        {/* joel: added index&onClick to navigate to individualPoster */}
        {movie.map((movies, index) => (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt="Movie poster"
              onClick={()=>{navigate("/single/"+ movie[index].id)}}
            />
          <div className="testShop">
              <h1>Items for Sale</h1>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price}
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  </li>

                ))}
              </ul>
            </div>


          </div>
      ))}
    </div>
    </div>
  );
};

