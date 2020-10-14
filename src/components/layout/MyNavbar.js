import React, { useContext, useState } from 'react'
import { Navbar, Container,Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { FaTemperatureHigh,FaBarcode } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext';
import { withRouter } from "react-router-dom";



const MyNavbar = ({ setLoginModal}) => {
    const { currentUser } = useContext(AuthContext);
    
    // console.log(currentUser.uid)
    let links = null;
    if (currentUser) {
        links = currentUser.uid ? (<SignedInLinks />) : (<SignedOutLinks setLoginModal={setLoginModal} />)
        
    }
     
    return (
       
            <Navbar sticky="top" className="MyNav" collapseOnSelect expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="nav-brand" as={NavLink} to="/"><FaTemperatureHigh style={{ color: "#FF652F" }} /> Temperature.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {links}
                {/* <SignedInLinks />
                <SignedOutLinks setLoginModal={setLoginModal} /> */}
            </Container>
            </Navbar>
            
          
            
    
        
    );
}

export default withRouter(MyNavbar);