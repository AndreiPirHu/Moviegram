import "../Joel/footer.css"

const Footer = ()=>{
    return(
        <div className="footercomponent">
            <h2>MovieGram</h2>
            <hr />
            <div className="review">ReviewsComponent</div>

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