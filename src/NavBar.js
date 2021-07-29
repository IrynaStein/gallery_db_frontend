import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="ui inverted segment">
      <div className="ui inverted secondary menu">
        <NavLink exact to="/artworks" className="item">
          Artworks
        </NavLink>
        <NavLink to="/collectors" className="item">
          Collectors
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;