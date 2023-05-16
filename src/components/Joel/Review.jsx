import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useSelector } from "react-redux";
import Rating from "../Rating.jsx";
import "../Joel/review.css";

const Review = (props) => {
    const userID = useSelector(state => state.login.user); //userid
    const reviewsCollectionRef = collection(db, "reviews", props.filmID, props.filmID);
    const user = useSelector(state => state.login.userInfo); //user name
    const isLoggedIn = useSelector(state => state.login.loggedIn);

    const [reviewsList, setReviewsList] = useState([]); //from firestore
    const [review, setReview] = useState('');//the one user posts
    const [reviewed, setReviewed] = useState(false); //to show the review component

    let localStars = localStorage.getItem("stars");


    //fetch reviews, user or not user
    const fetchReviews = async () => {
        try {
            onSnapshot(reviewsCollectionRef, (snapshot) => {
                setReviewsList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        } catch (err) {
            console.error("jojo err", err);
        }
        console.log("from firebase fetchReview: ", reviewsList)
    }
    //if user is loggedin
    const onSubmitReview = async () => {
        console.log("ReviewStars: ", localStars)
        console.log("Rewiew: ", review)
        const starsReview = localStars + review
        console.log("starsReview: ", starsReview)
        if (isLoggedIn) {
            try {
                await addDoc(reviewsCollectionRef, { userName: user.name, content: starsReview, userID: auth?.currentUser?.uid });
                setReview('')
                localStorage.removeItem("stars")
            } catch (err) {
                console.error(err);
            }

        }
    }

    useEffect(() => {
        fetchReviews();

        console.log("fetchReviews: ", reviewsList)

    }, [])

    //when fetch reviews then need to change the reviwsList from empty to full
    useEffect(() => {
        if (isLoggedIn) {
            //console.log("logged in: " + userID);
            for (const r of reviewsList) {
                //console.log("compare: " + r.userID + " : " + userID );
                if (r.userID === userID) {
                    setReviewed(true);
                    //console.log("reviewed");
                }
            };
        };

    }, [reviewsList])


  return (
    <div className="review">
        {isLoggedIn ? "Tell us what you think:" : "Log in to leave a comment!"}

        {/* read from firebase */}
          {/*   <div className="reviewTitle">
            
            <button type="submit" className="popupBtn">Add a review</button>
            </div> */}
            
    
            <div className='showreview'>
            {reviewsList.map( (review, index)=>(
                <div className='reviewcontent' key={index}>
                    <h2>{review.userName}</h2>
                    <p>{review.content}</p>
                    </div>
                ))}
            </div>
            
                <div className='postreview' style={{ display: isLoggedIn ? "flex" : "none" }}>
                    {/* write to firebase */}

                    <div className="rating" style={{ display: reviewed ? "none" : "flex" }}>
                        {<Rating />}
                    </div>
                    
                    <textarea style={{ display: reviewed ? "none" : "flex" }}
                        placeholder="max 100 char."
                        value={review}
                        onChange={(e) => { setReview(e.target.value) }}>
                    </textarea>
                    <button type='submit' onClick={onSubmitReview} style={{ display: reviewed ? "none" : "flex" }}>Submit a review.</button>

                </div>
        </div>
    )
}

export default Review;