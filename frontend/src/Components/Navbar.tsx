import icon from "../assets/icon.png";

const Navbar = () => {
  return (
    <div className="navbar bg-black shadow-sm sticky top-0 z-50 border-b-[0.5px]">
      <div className="flex-1 items-center">
        <img src={icon} alt="Icon description" className="h-16 w-16"></img>
        <a className="btn btn-ghost text-[32px]">R&G.</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-4 space-x-4">
          <li className="text-[16px]">Home</li>
          <li className="text-[16px]">Films</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
