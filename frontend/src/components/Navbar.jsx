import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: "15px", background: "#f0f0f0", display: "flex", gap: "15px" }}>
            <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>Home</Link>
            <Link to="/jobs" style={{ textDecoration: "none", fontWeight: "bold" }}>Jobs</Link>
            <Link to="/signup" style={{ textDecoration: "none", fontWeight: "bold" }}>Signup</Link>
            <Link to="/login" style={{ textDecoration: "none", fontWeight: "bold" }}>Login</Link>
        </nav>
    );
};

export default Navbar;