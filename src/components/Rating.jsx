
import React from "react"
import "./rating.css"

const Rating = () => {

    const starClick = (starId) => {

        let starLevel = "";

        if (localStorage.stars) {
            localStorage.removeItem("stars")
        }
        if (starId == 1) {
            starLevel = " ⭐ "
        } else if (starId == 2) {
            starLevel = " ⭐⭐ "
        } else if (starId == 3) {
            starLevel = " ⭐⭐⭐ "
        } else if (starId == 4) {
            starLevel = " ⭐⭐⭐⭐ "
        } else if (starId == 5) {
            starLevel = " ⭐⭐⭐⭐⭐ "
        }
        localStorage.setItem("stars", starLevel)
        console.log("Rating localStars: ", localStorage.stars)
    }

    return (

        <div className="starContainer">
            <div className="stars">
                <input type="radio" name="rate" id="rate-5" />
                <label htmlFor="rate-5" className="fa fa-star" onClick={() =>starClick(5)}></label>
                <input type="radio" name="rate" id="rate-4" />
                <label htmlFor="rate-4" className="fa fa-star" onClick={() =>starClick(4)}></label>
                <input type="radio" name="rate" id="rate-3" />
                <label htmlFor="rate-3" className="fa fa-star" onClick={() =>starClick(3)}></label>
                <input type="radio" name="rate" id="rate-2" />
                <label htmlFor="rate-2" className="fa fa-star" onClick={() =>starClick(2)}></label>
                <input type="radio" name="rate" id="rate-1" />
                <label htmlFor="rate-1" className="fa fa-star" onClick={() =>starClick(1)}></label>
                <form className="form-text" action="#">
                    <header></header>
                    {/*  <div className="textarea">
                        <textarea cols="30" placeholder="Describe your experience..."></textarea>
                    </div>
                    <div className="submitButton">
                        <button type="submit">Post</button>
                    </div> */}
                </form>
            </div>


        </div>
    )
}

export default Rating;