import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <ul
      className="nav nav-tabs bg-primary"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <li className="nav-item" style={{ marginLeft: "25px" }}>
        <Link to="/">
          <a style={{ fontWeight: "bold" }} className="nav-link ">
            Hero App
          </a>
        </Link>
      </li>

      <li className="nav-item" style={{ marginRight: "35px" }}>
        <a className="nav-link" onClick={logout}>
          Log out
        </a>
      </li>
    </ul>
  );
};

export default Navbar;
