import React, { useEffect}from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap';
import tenor from '../../img/tenor.gif'
import FocusLock from 'react-focus-lock';

const ScanPanel = () => {
    // const [barcodeInput, setBarcodeInput] = useState(null)
    let barcodeInput = null;
     const handleSearch = (e) => {
        
        
    }
     const handleSubmit = (e) => {
        e.preventDefault();
       
    }
    // useEffect(() => {
    //     barcodeInput.focus()
    // }, [])
    return (
        <Container style={{backgroundColor:'white',padding:'30px'}}>
            <h3 className='grey-text'>Scan Panel</h3>
            <Form id='search' style={{ marginTop: '40px', marginLeft: '10px' }} onSubmit={handleSubmit}>
                
                <Form.Group controlId="idQuery">
                    <FocusLock>
                        <Form.Control type="text" placeholder="Scan Barcode" style={{ width: '100%' }} onChange={handleSearch} ref={(input) => { barcodeInput = input; }} />
                    </FocusLock>
                </Form.Group>
            </Form>

            <Image src={tenor} alt="loading" fluid/>
        </Container>
    );
}

export default ScanPanel;
