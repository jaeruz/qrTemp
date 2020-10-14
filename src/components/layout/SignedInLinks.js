import React, { useContext, useState,useEffect } from 'react'
import { Navbar, Nav, NavDropdown,Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Avatar from 'react-avatar';
import { FaBarcode } from 'react-icons/fa'

const SignedInLinks = ({profile}) => {
    const { dispatch, userProfile,currentUser } = useContext(AuthContext)
    const [mounted, setMounted] = useState(false)
    let nameTitle = '';
    if (userProfile!=null) {
        
    if (userProfile.isAdmin) {
        nameTitle ='Admin'
    } else {
        nameTitle ='User'
    }
    }
    
    const logOut = () => {
        dispatch({type:'SIGNOUT'})
    }
    return (
         <div style={{ position: "relative" }}>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <Nav>
                {userProfile ? (<Avatar size="40" name={userProfile.fname + ' ' + userProfile.lname} round={true} style={{ margin: '10px' }} />):(null)}
                
                <NavDropdown title={nameTitle} id="collasible-nav-dropdown" style={{marginTop:'10px'}}>
                    <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/users">Employees</NavDropdown.Item>
                    {userProfile ? (
                        userProfile.isAdmin ? (<NavDropdown.Item as={NavLink} to='/signup'>Create Account</NavDropdown.Item>):(null)
                        ):(null)
                    }
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
         <div style={{ position: "fixed", right: 0, bottom: 0 }}>
              <NavLink to="/scan">
                <Button variant="light" style={{ borderRadius: '30px 30px 30px 30px', padding: '15px', margin: '20px' }}>
                  <FaBarcode style={{ fontSize: '30px', color: 'black' }} />
                </Button>
              </NavLink>
            </div>
            </div>
    );
}

export default SignedInLinks;