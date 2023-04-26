import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {

    const location = useLocation();
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand mb-0 h1" to="/">TODO App</Link>
                <div className="collapse navbar-collapse" id="">
                    <div className="navbar-nav">
                        <Link className={"nav-link " + (location.pathname == "/" ? "active" : "")} to="/">Home</Link>
                        <Link className={"nav-link " + (location.pathname == "/history" ? "active" : "")} to="/history">History</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}