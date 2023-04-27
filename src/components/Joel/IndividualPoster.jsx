import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Joel/indiv-poster.css"

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
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);

    let selectedItems = [];
    const [selected, setSelected] = useState([]);

    const params = useParams();
    const id = params.id
    const SMALL = "S", MEDIUM ="M", LARGE = "L";

    useEffect(()=>{
        //fetch and changes item to an object
        fetchPoster(id, setItem);
    }, []);

    switch(size){
        case SMALL:
            addToCart(item, size, price);
            break;
        case MEDIUM:
            addToCart(item, size, price);
            break;
        case LARGE:
            addToCart(item, size, price);
            break;
    }
    //with size/price, create an object and adds to selectedItems[]
    function addToCart(poster, size, price){
        let prototype = [];

        const item = { name : poster.title, size : size, price : price }
        prototype.push(item);

        /* useEffect(()=>{
            setSelected([item, ...selected]);
        }, [selected]) */
        //setSelected([item, ...selected]);
        //setSelected([...selectedItems, ...prototype]);
        console.log("items selected", selectedItems.length);
        console.log("total items added ",selected)

        //if not selected dont send
        //if clicked create object and send to cart/array
    }

    return(
        <div className="indivPosterDiv">
            <Link className="buttonLink" to='/'>
                <button >Home</button>
            </Link>
            <div className="posterDiv">
                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} 
                    alt="missing pic" height={600}/>

                <div className="posterDetails">
                    <br />
                    <h2>{item.original_title}</h2>
                    <label>
                        <input type="radio" 
                        onClick={()=> {setSize(SMALL); setPrice(10)}}/>Small size. 10$
                    </label>
                    <br />
                    <label>
                        <input type="radio" 
                        onClick={()=> {setSize(MEDIUM); setPrice(15)}}/>Medium size. 15$
                    </label>
                    <br />
                    <label>
                        <input type="radio" 
                        onClick={()=> {setSize(LARGE); setPrice(20)}}/>Large size. 20$
                    </label>
                </div>

            </div>
            <button id="addtocart">Add to cart</button> 
        </div>
    )
}




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

export default IndividualPoster;