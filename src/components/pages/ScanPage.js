import React, { useContext } from 'react'
import ScanPanel from './ScanPanel'
import ScanInfo from './ScanInfo'
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


const ScanPage = () => {
    const { currentUser, userProfile } = useContext(AuthContext)
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return (
                <Container style={{ padding: '30px' }}>
                    <Row>
                        <Col lg={5}>
                            <ScanPanel />
                        </Col>
                        <Col lg={7}>
                            <ScanInfo />
                        </Col>
                    </Row>
                </Container>
            );
        }
    } else {
        return <Redirect to='/' />
    }
    return <div></div>
}

export default ScanPage;