import StyledButton from "./FilmButton";
import axios from 'axios';



const HomeFilm = () => {

    axios.get('http://localhost:8080')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    return (
        <section className="bg-black">
            <h1 className="text-3xl font-bold leading-tight text-white p-3  ">Top Rented Films</h1>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <StyledButton rank={1} title="Movie Name" rentals={500} imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide5" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <StyledButton rank={2} title="Movie Name" rentals={500} imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <StyledButton rank={3} title="Movie Name" rentals={500} imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <StyledButton rank={4} title="Movie Name" rentals={500} imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide5" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide5" className="carousel-item relative w-full">
                    <StyledButton rank={5} title="Movie Name" rentals={500} imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
        </div>
         </section>
    );
}

export default HomeFilm; 