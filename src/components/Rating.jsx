
import React from "react"
import "./rating.css"

const Rating = () => {



    return (

        <div className="container">
            <div className="stars">
                <input type="radio" name="rate" id="rate-5" />
                <label htmlFor="rate-5" class="fa fa-star"></label>
                <input type="radio" name="rate" id="rate-4" />
                <label htmlFor="rate-4" class="fa fa-star"></label>
                <input type="radio" name="rate" id="rate-3" />
                <label htmlFor="rate-3" class="fa fa-star"></label>
                <input type="radio" name="rate" id="rate-2" />
                <label htmlFor="rate-2" class="fa fa-star"></label>
                <input type="radio" name="rate" id="rate-1" />
                <label htmlFor="rate-1" class="fa fa-star"></label>
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