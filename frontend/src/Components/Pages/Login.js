import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../assets/css/Login.css'
import logo from '../../assets/pictures/logo.png'
import { Constants } from '../../Constants';

function Login(props){
    let [email,setEmail] = useState('anmoldhall1221@gmail.com');
    let [pswd,setPswd] = useState('Anmol');

    const loginHandler = () => {
        axios.post(Constants.host+'login',{"email":email,"pswd":pswd}).then(res => {
            alert(res.data.msg)
            localStorage.setItem('token',res.data.token)
            setEmail('')
            setPswd('')
            props.setLoggedIn(true)
          }).catch(err => alert(err.response.data.msg))
    }

    return(
    <div className='login'>
        <div className='login_frame'>
            <div className='login_header'>
                <div className='login_logo'>
                    <img src={logo} alt='ADMIN PORTAL'/>
                </div>
            </div>
            <div className='login_body'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pswd} onChange={(e) => {setPswd(e.target.value)}} />
                    </Form.Group>
                    <Button variant="primary" onClick={loginHandler} className='login_button'>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  );
}
  
  export default Login;
