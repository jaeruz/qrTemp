import React from 'react'
import { Container} from 'react-bootstrap';

const About = () => {
    return ( 
        <Container>
            <div style={{ marginTop: '100px', backgroundColor: 'white', color: 'black', padding: '50px', borderRadius: '20px', textAlign:'center' }}>
                <h1>About</h1>    
                <br/>
                <p>"Some people call this artificial intelligence, but the reality is this technology will enhance us. So instead of artificial intelligence, I think we'll augment our intelligence."</p>
                <p>—Ginni Rometty</p>
            </div>
        </Container>
     );
}
 
export default About;