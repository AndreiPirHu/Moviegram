import { useEffect, useState } from "react";
import "../Joel/footer.css"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Footer = ()=>{
    let content = null;
    const reviewsCollectionRef = collection(db, "reviews")
    const NORMAL = "normal", ABOUT = "about", CONTACT = "contact";
    const [view, setView] = useState(NORMAL);
    const [reviewsList, setReviewsList] = useState([]);
    const [review, setReview] = useState('');

    const fetchReviews = async ()=>{
        try{
            const data = await getDocs(reviewsCollectionRef);
            const filterData = data.docs.map( (doc)=>({...doc.data(), id: doc.id}) )
            console.log("jojo fetchrev: ",filterData);
            setReviewsList(filterData)
        }catch(err){
            console.error("jojo err",err);
        }
    }

    const onSubmitReview = async ()=>{
        try{
            await addDoc(reviewsCollectionRef, {content: review})
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        fetchReviews()
    }, [])

    switch(view){
        case ABOUT :
        content = <div onClick={()=>{setView(NORMAL)}}>About us card</div>;
        break;
        case CONTACT :
        content = <div onClick={()=>{setView(ABOUT)}}>Contact card</div>;
        break;
        default:
        content = <div onClick={()=>{setView(CONTACT)}}>Normal Component</div>;
    };

    return(
        <div className="footercomponent">
            <h2>MovieGram</h2>
            {/* {content} */}
            
            <div className="review">ReviewsComponent <br />
                <input type="text" placeholder="max 100 char." onChange={(e)=>setReview(e.target.value)}/>
                <button onClick={onSubmitReview}>Submit</button>
                {reviewsList.map( (review)=>(
                    <div>
                        <p>{review.content}</p>
                    </div>
                ))}
            
            </div>

            <div className="aboutus">
                About us Section
                <ul>
                    <li><a href="">About Us.</a></li>
                    <li><a href="">Contact Us.</a></li>
                    <li><a href="">Log in.</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;