import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const SignedOutLinks = ({ setLoginModal }) => {
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <Nav>
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                <Nav.Link onClick={() => setLoginModal(true)}>Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    );
}

export default SignedOutLinks;