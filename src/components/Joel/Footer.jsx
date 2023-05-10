import { useEffect, useState } from "react";
import "../Joel/footer.css"

const Footer = ()=>{
    let content = null;

    const NORMAL = "normal", ABOUT = "about", CONTACT = "contact";
    const [view, setView] = useState(NORMAL);
    

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