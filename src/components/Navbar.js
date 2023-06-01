import SignIn from "./SignIn";
import "../css/Navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ setFavorites }) => {
  return (
    <nav className="navbar">
      <div className="left-section">
        <img src={logo} alt="logo" className="logo" />
        <div className="navbar-brand">StockTrace</div>
      </div>
      <SignIn setFavorites={setFavorites} />
    </nav>
  );
};

export default Navbar;
