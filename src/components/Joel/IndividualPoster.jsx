import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Joel/indiv-poster.css"
import CounterButton from "./CounterButton";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/cartitems";
import { setDoc, collection, db, doc } from '../../firebase';
import Review from "./Review";
import Suggestion from "./Suggestion";

const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

async function fetchPoster(id, setItem, setError, resetSelected, resetBtns){
    const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
    const idEndPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    await fetch(idEndPoint)
        .then(res => res.json())
        .then(data => {
            //console.log("data",data)
            if(data.success == false){
                console.log("there was an error")
                setError(true);
            }else if(data.id){
                console.log("item is set")
                setItem(data);
                resetSelected([]);
                /* resetBtns(true);
                resetBtns(false); */
            }
        })
        .catch(error => {
            console.log(error)
        })
}

const IndividualPoster = () => {
    const [error, setError] = useState(false)
    const [item, setItem] = useState([]);
    const [selected, setSelected] = useState([]);
    const [reset, setReset] = useState(false)

    const params = useParams();
    const id = params.id;
    const user = useSelector(state => state.login.user)
    const isLoggedIn = useSelector(state => state.login.loggedIn)

    const dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(()=>{
        //fetch and changes item to an object when id changes
        fetchPoster(id, setItem, setError, setSelected, setReset);
    }, [id]);
    
    /* useEffect(()=>{
        if(params.id != item.id){
            setReset(true)
        }
    }, []) */

    function addToSelected(poster, size, price){
        const item = {
            id: uuidv4(),
            name: poster.title,
            price: price,
            size: size,
            img: `https://image.tmdb.org/t/p/w500${poster.poster_path}`
        }

        setSelected([...selected, item]);
        
    }
    function remove(size) {
        if (selected.length != 0) {
            //index of first element with that size
            let index = selected.findIndex((item) => item.size == size);
            //create new array not including element with index
            if (selected[index].id != null) {
                const newArr = selected.filter((item) => item.id != selected[index].id);
                //update cart
                setSelected(newArr);
            }
        }
    }
    async function addToCart() { //async
        selected.forEach((item) => {
            dispatch(actions.addItem(item))

            if (!isLoggedIn) {
                console.log('user is not logged in for firestore save');
                return;
            }
            //if user is signed in it adds items to firestore
            try { //reference to correct collection
                const cartItemsRef = collection(db, 'users', user, 'cartItems');
                // Set the itemID as the doc name
                const itemDocRef = doc(cartItemsRef, item.id);
                //Add item to firestore
                setDoc(itemDocRef, item);
                console.log(`Item added to firestore with ID: ${item.id}`);
            } catch (e) {
                console.error("Error adding item to firestore:", e);
            }
        })

        if(selected.length > 0){
            navigate("/")
        }
    }

    const container = (
        <div className="posterDiv">

            <div className="posterDiv2">
                <h2>Poster: {item.original_title}.</h2>
                <img src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} 
                    alt="no pic available" height={600}/>
            </div>
                
            <div className="posterDetails">
                <p>{item.overview}</p>
                <CounterButton item={item} 
                    handleAdd={addToSelected} 
                    handleRemove={remove} 
                    reset={reset} 
                    handleReset={setReset}/>

                <div className="downmenu">
                    <Link to='/'>
                        <button className="buttonLink">Home</button>
                    </Link>
                    <button id="addtocart" onClick={addToCart}>Add to cart</button>
                </div>
            </div>

        </div> 
    )
    const errorContainer = (
        <div>
            <p>"No info available"</p> 

        </div>
    )

    return (
        <div className="indivPosterDiv">
            {error ? errorContainer : container}
            <Review filmID={id}/>
            <Suggestion resetBtns={setReset}/>
        </div>
    )
}

export default IndividualPoster;