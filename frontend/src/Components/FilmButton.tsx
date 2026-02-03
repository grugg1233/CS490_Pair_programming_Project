type StyledButtonProps = {
  rank: number;
  title: string;
  rentals: number;

};

// rank, title, rentals will be populated by a request to the database -> some sort of GET 

const StyledButton = ({rank, title, rentals} : StyledButtonProps) => {
    return (
        <button 
                className=" relative w-72 rounded-xl border border-white/10
                            bg-gray-800 p-4 text-center h-80 align-text-bottom
                            transition duration-300 ease-in-out
                            hover:border-white hover:bg-red-900
                            focus:outline-none focus-visible:ring focus-visible:ring-white/40
                " 
            >
            <div className="absolute top-3 left-3
                            flex h-10 w-10 items-center justify-center
                            rounded-full bg-red-700 text-white font-bold
                                            ">               
                    {rank}
            </div>

            <div className="  t-2 flex items-center gap-2 text-white/80  ">    
                    {rentals}
            </div>

            <div className="text-white font-extrabold tracking-wide">
                    {title}
            </div>

            </button>
    )
};
export default StyledButton;