import React, { useState ,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter,Switch, Route } from 'react-router-dom';

import MyNavbar from './components/layout/MyNavbar';
import { Container,Modal } from 'react-bootstrap';

import SignIn from './components/auth/SignIn';
import Dashboard from './components/pages/Dashboard';
// import Modal from 'react-modal'
import UserPage from './components/pages/UserPage';
import UserContextProvider from './context/UserContext';
import Home from './components/pages/Home';
import AuthContextProvider from './context/AuthContext';
import HelmetContextProvider from './context/HelmetContext'
import SignUp from './components/auth/SignUp';
import About from './components/pages/About';
import { createBrowserHistory } from 'history';
import UserAdd from './components/pages/UserAdd';
import CreateGroup from './components/procedure/CreateGroup'
import Train from './components/procedure/Train'
import UserProfile from './components/pages/UserProfile';

const history = createBrowserHistory();

function App() {
  const [loginModal, setLoginModal] = useState(false)
 
    
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <HelmetContextProvider>
        <div className="App">
          <Modal show={loginModal} onHide={() => setLoginModal(false)} dialogClassName="login-modal">
            <SignIn setLoginModal={setLoginModal} history={history}/>
          </Modal>
          <MyNavbar setLoginModal={setLoginModal} />
          <Container fluid className='main' style={{ position: "relative" }}>



            <Switch>
              <Route exact path="/" component={() => (<Home setLoginModal={setLoginModal} loginModal={loginModal}/>)}></Route>
                {/* <Route path="/home" component={Home}></Route> */}
              <Route path="/about" component={About}></Route>
              {/* <Route path="/scan" component={ScanPage}></Route> */}
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/users" component={UserPage}></Route>
              <Route path="/signup" component={SignUp}></Route>
                  <Route path="/useradd" component={UserAdd}></Route>
                  <Route path="/profile/:id" component={UserProfile}></Route>
              <Route path="/creategroup" component={CreateGroup}></Route>
              <Route path="/train" component={Train}></Route>
            </Switch>
             
              
           
            
          </Container>

            </div>
            </HelmetContextProvider>
        </UserContextProvider>
        </AuthContextProvider>
    </BrowserRouter >
  );
}

export default App;
