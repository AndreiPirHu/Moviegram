import { useEffect, useState } from "react";
import "../Joel/footer.css"
import { useNavigate } from "react-router-dom";


const Footer = () => {
    let content = null;

    const NORMAL = "normal", ABOUT = "about", CONTACT = "contact";
    const [view, setView] = useState(NORMAL);
    const navigate = useNavigate();


    switch (view) {
        case CONTACT:
            content = <div className="aboutus">
                <h3>mail: moviegram@iths.se</h3>
                <h3>tel: xxx-xxx-xxxx</h3>
            </div>;
            break;
        default:
            content = (<div className="aboutus">

                <p>We are a start-up that sells your favorite movie posters</p>
                {/* <div className="aboutuspics">
                    <img src="src/assets/delivery.png" alt="no pic" />
                    <img src="src/assets/shipping.png" alt="no pic" />
                    <img src="src/assets/payement.png" alt="no pic" />
                </div> */}
            </div>);

    };

    return (
        <div className="footercomponent">
            <h2>MovieGram</h2>

            <div className="footerlinks">
                <ul>
                    <li onClick={() => { setView(ABOUT) }}>About Us.</li>
                    <li onClick={() => { setView(CONTACT) }}>Contact Us.</li>
                    <li onClick={() => { navigate("/login") }}>Log in.</li>
                </ul>
            </div>
            {content}
        </div>
    );
};

export default Footer;