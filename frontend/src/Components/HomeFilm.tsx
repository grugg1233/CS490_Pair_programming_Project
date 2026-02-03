import StyledButton from "./FilmButton";
const HomeFilm = () => {
    return (
        <section className="bg-black">
            <h1 className="text-3xl font-bold leading-tight text-white p-3  ">Top Rented Films</h1>
        <StyledButton rank={1} title="Movie Name" rentals={500} imageU="https://static.vecteezy.com/system/resources/thumbnails/072/460/715/small/film-strip-capturing-city-street-at-nightgraphy-concept-photo.jpg" />
         </section>
    );
}

export default HomeFilm; 