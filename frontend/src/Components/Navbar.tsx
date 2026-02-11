import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const Navbar = () => {
  return (
    <div className="navbar bg-black shadow-md sticky top-0 z-50 border-b-[0.5px]">
      <div className="w-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-1 text-white ml-4">
          <img src={icon} alt="Icon description" className="h-16 w-16"></img>
          <span className="text-[30px] font-semibold pb-1">R&G.</span>
        </Link>

        <ul className="menu menu-horizontal space-x-3">
          <li className="text-[18px]">
            <Link to="/">Home</Link>
          </li>
          <li className="text-[18px]">
            <Link to="/films">Films</Link>
          </li>
          <li className="text-[18px]">
            <Link to="/customers">Customers</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
