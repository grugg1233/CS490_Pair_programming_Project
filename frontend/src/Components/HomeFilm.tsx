import StyledButton from "./FilmButton";
const HomeFilm = () => {
    return (
        <section className="bg-black">
            <h1 className="text-3xl font-bold leading-tight text-white p-3  ">Top Rented Films</h1>
        <StyledButton rank={1} title="data" rentals={5}> </StyledButton>
         </section>
    );
}

export default HomeFilm; 