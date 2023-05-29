import SignIn from "./SignIn";
import '../css/Navbar.css'

const Navbar = ({setFavorites}) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">StockTrace</div>
            <SignIn setFavorites={setFavorites}/>
        </nav>
    );
}

export default Navbar;