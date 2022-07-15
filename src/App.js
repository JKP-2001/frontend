

import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Navbar from './Navbarx';
import Register from './Register';
import Alert from "./Alert"
import Login from './Login';
import Home from './Home';
import ResetPassword from './ResetPassword';

function App() {


  const [alert, setAlert] = useState(null);
  const [isTrue,setIsTrue] = useState(false);

  const setVal = (ans)=>{
    setIsTrue(ans);
  }
  const showAlert = (type, message, time) =>
    setAlert({
      msg: message,
      type: type
    },
      setTimeout(() => {
        setAlert(null);
      }, time));


  return (
    <Router>
      <Navbar />
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} setIsTrue={setVal} isTrue={isTrue} />} />
        <Route path="/register" element={<Register showAlert={showAlert} setIsTrue={setVal}/>} />
        <Route path="/login" element={<Login showAlert={showAlert} setIsTrue={setVal} />}/>
        <Route path="/resetpassword" element={<ResetPassword showAlert={showAlert} setIsTrue={setVal}/>} />
      </Routes>
    </Router>
  )

}

export default App;
