import {
    Outlet,
    Link,
} from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="main">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <h1 style={{
                            color: "#777",
                            fontSize: "40px",
                        }}>Pokedex</h1>
                    </Link>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;
