const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">SAKILA.</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-4 space-x-4">
          <li>
            Home
          </li>
          <li>
            Films
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
