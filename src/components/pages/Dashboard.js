import React, { useContext,useState,useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
// import QrCode from 'react.qrcode.generator'



const Dashboard = () => {
    const { currentUser, userProfile } = useContext(AuthContext)
    const [flag, setFlag] = useState(0)
    console.log(currentUser)
    console.log(userProfile)
    useEffect(() => {
        setFlag(flag+1)
    }, [userProfile])
    console.log(flag)
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) { 
            return (
            <Container>
                <div style={{ marginTop: '100px', backgroundColor: 'white', color: 'black', padding: '50px', borderRadius: '20px' }}>
                    <h1>Dashboard</h1>    
                    <h3>Loading...</h3>
                </div>
            </Container>)
        }
        
    }
    else {
            return <Redirect to='/' />
        }
    
    return <div></div>
}

export default Dashboard;