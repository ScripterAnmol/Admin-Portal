import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../assets/css/CreateCustomer.css'
import { Col,Row} from 'react-bootstrap';
import { Constants } from '../../Constants';

function CreateCustomer(props){

    let [cemail,setCemail] = useState("")
    let [cphno,setCPhno] = useState("9876543210")

    const createBookingHandler = () => {
        let reqInstance = axios.create({
            headers: {
              Authorization : `${localStorage.getItem("token")}`
            }
          });
          
          if(localStorage.getItem('token')!==''){
            reqInstance.post(Constants.host+'createcustomer',{"cemail":cemail,"cphno":cphno}).then(res => {
                alert(res.data.msg)
                setCemail('')
                setCPhno('')
            }).catch(err => {
              localStorage.setItem('token','');
              props.setLoggedIn(false);
            })
          }else{
            localStorage.setItem('token','');
            props.setLoggedIn(false);
          }
    }
    return(
    <div className='create_customer'>
        <div className='create_customer_header'>
            Creating Customer
        </div>
        <div className='create_customer_body'>
            <Form>
                <Row>
                    <Col xs={12} md={6} ls={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Customer Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={cemail} onChange={(e) => {setCemail(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} ls={6}>
                        <Form.Group className="mb-3" controlId="formControlsText">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Phone Number" value={cphno} onChange={(e) => {setCPhno(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={createBookingHandler} className='login_button'>
                    Create Customer
                </Button>
            </Form>
        </div>
    </div>
  );
}
  
  export default CreateCustomer;
