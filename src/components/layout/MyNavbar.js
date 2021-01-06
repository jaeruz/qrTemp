import React, { useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { FaTemperatureHigh } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext';
import { withRouter } from "react-router-dom";


const MyNavbar = ({ setLoginModal}) => {
    const { currentUser } = useContext(AuthContext);
    
    let links = null;
    if (currentUser) {
        links = currentUser.uid ? (<SignedInLinks />) : (<SignedOutLinks setLoginModal={setLoginModal} />)
        
    }

    return (
       
            <Navbar sticky="top" className="MyNav" collapseOnSelect expand="sm" variant="dark">
            <Container>
                <Navbar.Brand className="nav-brand" as={NavLink} to="/"><FaTemperatureHigh style={{ color: "#FF652F",fontSize:'20px' }} /> C19 Monitoring</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                {links}
            </Container>
            </Navbar>
 
    );
}

export default withRouter(MyNavbar);