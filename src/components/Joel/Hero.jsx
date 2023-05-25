import "./hero.css";

const apiKey = 'b5f72212d28ab0fe02704865f4b72213';
const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

const Hero = () => {

    return(
        <div className="heroComponent">
            <section className="sectiontitle" >
                <h1 className="title">Moviegram</h1>
            </section>
            <h2>Find your favorite poster here!</h2>
        </div>
    );

};

export default Hero;