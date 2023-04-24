import React from 'react'
import "./shop.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setDoc, collection, db, doc } from '../../firebase';
import { actions } from '../../features/cartitems';


export const Shop = () => {
    const [movie, setMovie] = useState([]);

    const user = useSelector( state => state.login.user)
    const cart = useSelector(state => state.cartItems)

    const dispatch = useDispatch();


    const items = [
        { id: uuidv4(), name: 'Item 1', price: 10 },
        { id: uuidv4(), name: 'Item 2', price: 15 },
        { id: uuidv4(), name: 'Item 3', price: 20 },
      ];

    const addToCart = async (item) => {
        //adds item to cart
    dispatch(actions.addItem(item));

    //TODO add so it ONLY adds when user is logged in
    if (!user) {
        console.log('user is not logged in for firestore save');
        
        return;
    }
    try{
        //reference to correct collection
        const cartItemsRef = collection(db, 'users', user, 'cartItems');

        // Set the itemID as the doc name
        const itemDocRef = doc(cartItemsRef, item.id);

        //Add item to firestore
        await setDoc(itemDocRef, item);
        console.log(`Item added to firestore with ID: ${item.id}`);
    } catch (e) {
        console.error('Error adding item to firestore:', e)
    }
    
    };

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
            <div className='testShop'>
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
