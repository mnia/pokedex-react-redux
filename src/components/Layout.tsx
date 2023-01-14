import {
    Outlet,
    Link,
} from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="main">
            <nav className="navbar">
                <Link to="/">
                    <h1 style={{ margin: 0 }}>Pokedex</h1>
                </Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;
