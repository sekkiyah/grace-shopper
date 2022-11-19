import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Occult Outlet</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active"><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {
                        token ? (
                            <>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/" onClick={() => logout()}><button class="btn btn-danger navbar-btn">Logout</button></Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/register">New Account</Link></li>
                                <li><Link to="/login"><button class="btn btn-danger navbar-btn">Login</button></Link></li>
                            </>
                        )
                    }
                </ul>
                <form class="navbar-form navbar-left" action="/action_page.php">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search"/>
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </nav>
    )
};

export default Navbar;