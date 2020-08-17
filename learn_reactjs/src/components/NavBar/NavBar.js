import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        function collapse() {  
            let listMenu = document.getElementsByClassName('collapse');
            for (let i = 0; i < listMenu.length; i++) {
                if (listMenu[i].style.display === "initial") {
                    listMenu[i].style.display = "none";
                } else {
                    listMenu[i].style.display = "initial";
                }
            }
        }
        function revokeToken() {
            localStorage.removeItem("Authorization");
            window.location.href = "/"
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">HRS</Link>

                <button className="navbar-toggler" type="button" onClick={collapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <Link to="/lists/employees" className="text-decoration-none">
                            <li className="nav-item nav-link">Lists</li>
                        </Link>
                        <Link to="/create" className="text-decoration-none">
                            <li className="nav-item nav-link">Create</li>
                        </Link>
                    </ul>
                    <button className="btn btn-outline-danger btn-sm my-2" type="submit" onClick={revokeToken}>Log Out</button>
                </div>
            </nav>
        );
    }
}

export default NavBar;