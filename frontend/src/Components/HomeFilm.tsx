import { useEffect, useState } from "react";
import StyledButton from "./FilmButton";
import axios from "axios";

interface FilmInterface {
  film_id: number;
  title: string;
  category: string;
  count: number;
}

const fetchFilm = async (): Promise<FilmInterface[]> => {
  const response = await axios.get<FilmInterface[]>("http://localhost:8080");
  console.log(response.data);
  return response.data;
};

const HomeFilm = () => {
  const [filmArray, setFilmArray] = useState<FilmInterface[]>([]);

  useEffect(() => {
    fetchFilm().then(setFilmArray).catch(console.error);
    console.log(filmArray);
  }, []);

  return (
    <section className="bg-black">
      <h1 className="text-3xl font-bold leading-tight text-white p-3  ">
        Top Rented Films
      </h1>
      <div className="carousel carousel-end rounded-box">
        <div id="slide1" className="carousel-item ">
          <StyledButton
            rank={1}
            title={filmArray[0]?.title}
            rentals={filmArray[0]?.count}
            imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide5" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item ">
          <StyledButton
            rank={2}
            title="Movie Name"
            rentals={500}
            imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item ">
          <StyledButton
            rank={3}
            title="Movie Name"
            rentals={500}
            imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item ">
          <StyledButton
            rank={4}
            title="Movie Name"
            rentals={500}
            imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide5" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide5" className="carousel-item ">
          <StyledButton
            rank={5}
            title="Movie Name"
            rentals={500}
            imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFilm;
