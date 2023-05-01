import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Joel/indiv-poster.css"
import CounterButton from "./CounterButton";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { actions } from "../../features/cartitems";

async function fetchPoster(id, setItem){
    
    const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
    const idEndPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    const response = await fetch(idEndPoint)
        .then(res => res.json())
        .then(data => {
            setItem(data)
            return data
        })
    //console.log("jojo data in func",response);
    //console.log("jojo movieId",id);
}

const IndividualPoster = () => {

    const [item, setItem] = useState([]);
    const [selected, setSelected] = useState([]);

    const params = useParams();
    const id = params.id
    //const SMALL = "S", MEDIUM ="M", LARGE = "L";
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        //fetch and changes item to an object
        fetchPoster(id, setItem);
    }, []);

    function addToSelected(poster, size, price){

        const item = { id: uuidv4(), name : poster.title, size : size, price : price }
        setSelected([...selected, item]);
        console.log("total items added ", selected.length + 1)

        //if not selected dont send
        //if clicked create object and send to cart/array
    }
    function remove(size){
        if(selected.length != 0){
            //index of first element with that size
            let index = selected.findIndex((item)=> item.size == size);
            //create new array not including element with index
            if(selected[index].id != null){
                const newArr = selected.filter((item) => item.id != selected[index].id);
                //update cart
                setSelected(newArr)
                console.log("newArr:", newArr.length)
            }
            
        }
    }
    function addToCart(){
        //dispatch(actions.addItem(selected))
        selected.forEach((item)=>{
            dispatch(actions.addItem(item))
        })
        navigate("/cart")
        //so far
    }

    return(
        <div className="indivPosterDiv">
            <Link className="buttonLink" to='/'>
                <button >Home</button>
            </Link>
            <div className="posterDiv">
                {/* `https://image.tmdb.org/t/p/w500${movies.poster_path}` */}
                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} 
                    alt="missing pic" height={600}/>
                
                <div className="posterDetails">
                    <h2>{item.original_title}</h2>
                    <p>{item.overview}</p>
                    <CounterButton item={item} handleAdd={addToSelected} handleRemove={remove}/>
                </div>
                
            </div>
            <button id="addtocart" onClick={addToCart}>Add to cart</button> 
        </div>
    )
}


/* <label>
                        <input type="radio" 
                        onClick={()=> {setSize(SMALL); setPrice(10)}}/>Small size. 10$
                        
                        <input type="radio" 
                        onClick={() => addToCart(item, SMALL, 10)}/>
                        Small size. 10$ {selected.length}
                    </label> */


/* const arr1 = [1, 2, 3]
const arr2 = [...arr1]
arr2[2] = 4
console.log(arr1) // [1, 2, 3]
console.log(arr2) // [1, 2, 4]

const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [...arr1, ...arr2]
console.log(arr3) // [1, 2, 3, 4, 5, 6]

const arr1 = [1, 2, 3]
const arr2 = [0, ...arr1]
const arr3 = [...arr1, 4]
console.log(arr2) // [0, 1, 2, 3]
console.log(arr3) // [1, 2, 3, 4] */

// switch(size){
    //     case SMALL:
    //         addToCart(item, size, price);
    //         break;
    //     case MEDIUM:
    //         addToCart(item, size, price);
    //         break;
    //     case LARGE:
    //         addToCart(item, size, price);
    //         break;
    // }
    //with size/price, create an object and adds to selectedItems[]

export default IndividualPoster;