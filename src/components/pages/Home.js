import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom'
import { Container, Image,Spinner} from 'react-bootstrap';
import helm from '../../img/helm.png'


const Home = ({setLoginModal,loginModal}) => {
    const { currentUser,userProfile } = useContext(AuthContext)

        if (userProfile != null) {
            if (Object.entries(userProfile).length != 0) { 
                return <Redirect to='/creategroup' />
            } 
        }
        else {
            
            return (
                <Container>
                    
                    <div style={{ marginTop: '100px', backgroundColor: 'white', color: 'black', padding: '50px', borderRadius: '20px',width:'100%' }}>
                        <h1 style={{marginBottom:'30px'}}>Welcome!</h1>    
                        <Image src={helm} width="30%" style={{ float: 'left',margin:'0 30px 30px 0' }} thumbnail />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum saepe at excepturi, quos totam tenetur voluptatum, ullam odio, veniam facere error molestiae aliquam asperiores laborum itaque quisquam iste molestias.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum saepe at excepturi, quos totam tenetur voluptatum, ullam odio, veniam facere error molestiae aliquam asperiores laborum itaque quisquam iste molestias.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, doloremque! Totam provident eaque necessitatibus nobis non dolorem ipsam iusto explicabo tempora? Molestias voluptate incidunt animi vero pariatur hic, eveniet iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis illum saepe at excepturi, quos totam tenetur voluptatum, ullam odio, veniam facere error molestiae aliquam asperiores laborum itaque quisquam iste molestias.</p>
                        <div style={{clear:'both'}}></div>
                        
                    </div>
                </Container>
            )
        }
        return ( 
            <div style={{paddingTop:'30px', width:'100%' }}>
                <Spinner animation="border" role="status" style={{display:"block",margin:'0 auto',color:'#FF652F'}}/>
            </div>
            );
}
 
export default Home;