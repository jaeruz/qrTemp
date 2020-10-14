import React, { useContext,useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap';


const Home = ({setLoginModal,loginModal}) => {
    const { currentUser,userProfile } = useContext(AuthContext)
   
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) { 
            return <Redirect to='/dashboard' />
        } else {
            
        }
    }
    else {
        
        return (
            <Container>
                <div style={{ marginTop: '100px', backgroundColor: 'white', color: 'black', padding: '50px', borderRadius: '20px' }}>
                    <h1>Home</h1>    
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia tenetur laudantium reiciendis, dolore doloremque dolorum sapiente voluptate nihil accusantium voluptates. At cupiditate deserunt quam asperiores ab, possimus incidunt aspernatur fuga?</p>
                </div>
            </Container>
        )
           
    }
    return ( 
            <div>Loading</div>
            );
    
}
 
export default Home;