import React, { useState ,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter,Router, Switch, Route, NavLink } from 'react-router-dom';

import MyNavbar from './components/layout/MyNavbar';
import { Container, Button } from 'react-bootstrap';
import { FaBarcode } from 'react-icons/fa'
import ScanPage from './components/pages/ScanPage';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/pages/Dashboard';
import Modal from 'react-modal'
import UserPage from './components/pages/UserPage';
import UserContextProvider from './context/UserContext';
import Home from './components/pages/Home';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import SignUp from './components/auth/SignUp';
import About from './components/pages/About';
import { createBrowserHistory } from 'history';

// import firebase from './config/fbConfig'


// // firebase.firestore().collection('employees').add({
// //   fname: 'jaeruz',
// //   lname: 'datiles'
// // })

Modal.setAppElement('#root');
const history = createBrowserHistory();

function App() {
  const [loginModal, setLoginModal] = useState(false)
 
    
  return (
    <BrowserRouter>
      <AuthContextProvider>
      <UserContextProvider>
        <div className="App">

          <Modal isOpen={loginModal} onRequestClose={() => setLoginModal(false)} shouldCloseOnOverlayClick={true}
            style={
              {
                overlay: {
                  backgroundColor: 'rgb(0,0,0,0.5)',
                },
                content: {
                  backgroundColor: 'white',
                  color: 'black',
                  border: '0',
                  borderRadius: '4px',
                  bottom: 'auto',
                  minHeight: '30rem',
                  left: '50%',
                  padding: '50px',
                  position: 'fixed',
                  right: 'auto',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  minWidth: '20rem',
                  width: '80%',
                  maxWidth: '40rem'
                }
              }
            }>
              <SignIn setLoginModal={setLoginModal} history={history}/>
          </Modal>
            {/* <Route path='/' component={() => <MyNavbar setLoginModal={setLoginModal} /> }/> */}
          <MyNavbar setLoginModal={setLoginModal} />
          <Container fluid className='main' style={{ position: "relative" }}>



            <Switch>
                <Route exact path="/" component={() => (<Home setLoginModal={setLoginModal} loginModal={loginModal}/>)}></Route>
                {/* <Route path="/home" component={Home}></Route> */}
              <Route path="/about" component={About}></Route>
              <Route path="/scan" component={ScanPage}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/users" component={UserPage}></Route>
                <Route path="/signup" component={SignUp}></Route>
            </Switch>
             
              
           
            
          </Container>

        </div>
        </UserContextProvider>
        </AuthContextProvider>
    </BrowserRouter >
  );
}

export default App;
