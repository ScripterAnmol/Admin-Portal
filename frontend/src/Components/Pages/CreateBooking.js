import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../assets/css/CreateBooking.css'
import { Col,Row} from 'react-bootstrap';
import { Constants } from '../../Constants';

function CreateBooking(props){

    let [cemail,setCemail] = useState("anmol@ab-inbev.com")
    let [locationId,setLocationId] = useState("570")
    let [dShotId,setDShotId] = useState("980")

    const createBookingHandler = () => {
        let reqInstance = axios.create({
            headers: {
              Authorization : `${localStorage.getItem("token")}`
            }
          });
          
          if(localStorage.getItem('token')!==''){
            const creationTimestamp = new Date(Date.now())
            reqInstance.post(Constants.host+'createbooking',{"cemail":cemail,"locationId":locationId,"dShotId":dShotId,"creationTimestamp":creationTimestamp}).then(res => {
                alert(res.data.msg)
                setCemail('')
                setLocationId('')
                setDShotId('')
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
    <div className='create_booking'>
        <div className='create_booking_header'>
            Creating Booking
        </div>
        <div className='create_booking_body'>
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
                            <Form.Label>Location ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location ID" value={locationId} onChange={(e) => {setLocationId(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} ls={6}>
                        <Form.Group className="mb-3" controlId="formControlsText">
                            <Form.Label>Drone Shot ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Drone Shot ID" value={dShotId} onChange={(e) => {setDShotId(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={createBookingHandler} className='login_button'>
                    Create Booking
                </Button>
            </Form>
        </div>
    </div>
  );
}
  
  export default CreateBooking;
