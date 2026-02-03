import FilmInfoCard from "./FilmInfoCard"
import { useState } from "react";
type StyledButtonProps = {
  rank: number;
  title: string;
  rentals: number;
  imageU: string;

};


// rank, title, rentals will be populated by a request to the database -> some sort of GET 

const StyledButton = ({rank, title, rentals, imageU} : StyledButtonProps) => {
        const [open, setOpen] = useState(false);
        return (
                <section>
                <button 
                        tabIndex={0} role="button" 
                        onClick={() => setOpen((v) => !v)}
                        className=" card bg-base-100 w-96 shadow-sm
                                transition duration-300 ease-in-out
                                hover:border-white hover:bg-red-900
                                focus:outline-none focus-visible:ring focus-visible:ring-white/40" >
                        <div className="card-body">
                                <h2 className="card-title text-white font-bold absolute top-3 left-40">{title}</h2>
                        </div>
                        <figure>
                        <img
                        src={imageU}
                        alt="Shoes" />
                        </figure>
                        <div className="absolute top-12 left-3
                                        flex h-10 w-10 items-center justify-center
                                        rounded-full bg-gray-400 text-white font-bold
                                        ">               
                                #{rank}
                        </div>

                        <div className="  t-2 flex items-center gap-2 text-white/80  ">    
                                Number of Rentals: {rentals}
                        </div>
                        <div className="absolute left-0">
                                <FilmInfoCard open={open} />
                        </div>
                
                </button>



        </section>
    );
};
export default StyledButton;