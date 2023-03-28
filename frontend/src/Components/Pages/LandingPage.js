import React, { useEffect, useState } from 'react';
import '../../assets/css/LandingPage.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, CardDeck, Col, Container, Row, Spinner, Modal, FormControl } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Constants } from '../../Constants';

function LandingPage(props){
  const [bookingSearchTerm, setBookingsearchTerm] = useState('');
  const [bookingRequestsLoading,setBookingRequestsLoading] = useState(false)
  const [bookingRequests,setBookingRequests] = useState({ results: [] })
  const [bookingFilteredRequests, setBookingFilteredRequests] = useState({ results: [] });

  const [customerSearchTerm, setCustomersearchTerm] = useState('');
  const [customerRequestsLoading,setCustomerRequestsLoading] = useState(false)
  const [customerRequests,setCustomerRequests] = useState({ results: [] })
  const [customerFilteredRequests, setCustomerFilteredRequests] = useState({ results: [] });
  
  // const getBookingFilteredRequests = (num) => {
  //   console.log(num)
  // }
  // const [showDeleteBookingModal, setShowDeleteBookingModal] = useState(false);
  const getBookingRequests = async (num) => {
    // console.log(num)
    setBookingRequestsLoading(true)
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });
    
    if(localStorage.getItem('token')!==''){
      await reqInstance.post(Constants.host+'bookings',{"cur_num":num}).then(res => {
          console.log(res.data)
          setBookingRequests(res.data)
          // bookingFilteredRequests
          setBookingRequestsLoading(false)
      }).catch(err => {
        console.log(err)
        localStorage.setItem('token','');
        props.setLoggedIn(false);
        setBookingRequestsLoading(false)
      })
    }else{
      localStorage.setItem('token','');
      props.setLoggedIn(false);
      setBookingRequestsLoading(false)
    }
  }
  // getFilteredBookingRequests
  const getBookingFilteredRequests = async (num,bookingSearchTerm) => {
    // console.log(num)
    setBookingRequestsLoading(true)
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });
    
    if(localStorage.getItem('token')!==''){
      // console.log(bookingSearchTerm)
      await reqInstance.post(Constants.host+'filterbookings',{"cur_num":num,"email":bookingSearchTerm}).then(res => {
          // console.log(res.data)
          setBookingFilteredRequests(res.data)
          setBookingRequestsLoading(false)
      }).catch(err => {
        localStorage.setItem('token','');
        props.setLoggedIn(false);
        setBookingRequestsLoading(false)
      })
    }else{
      localStorage.setItem('token','');
      props.setLoggedIn(false);
      setBookingRequestsLoading(false)
    }
  }

  const deleteBookingRequests = async (booking_id) => {
    // console.log(num)
    setBookingRequestsLoading(true)
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });
    
    if(localStorage.getItem('token')!==''){
      await reqInstance.post(Constants.host+'deletebooking',{"booking_id":booking_id}).then(async res => {
          console.log(res.data)
          await getBookingRequests(bookingRequests.cur_num)
          setBookingRequestsLoading(false)
      }).catch(err => {
        localStorage.setItem('token','');
        props.setLoggedIn(false);
        setBookingRequestsLoading(false)
      })
    }else{
      localStorage.setItem('token','');
      props.setLoggedIn(false);
      setBookingRequestsLoading(false)
    }
  }

  const getCustomerRequests = async (num) => {
    // console.log(num)
    setCustomerRequestsLoading(true)
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });
    
    if(localStorage.getItem('token')!==''){
      await reqInstance.post(Constants.host+'customers',{"cur_num":num}).then(res => {
          console.log(res.data)
          setCustomerRequests(res.data)
          // bookingFilteredRequests
          setCustomerRequestsLoading(false)
      }).catch(err => {
        console.log(err)
        localStorage.setItem('token','');
        props.setLoggedIn(false);
        setCustomerRequestsLoading(false)
      })
    }else{
      localStorage.setItem('token','');
      props.setLoggedIn(false);
      setCustomerRequestsLoading(false)
    }
  }
  // getFilteredBookingRequests
  const getCustomerFilteredRequests = async (num,customerSearchTerm) => {
    // console.log(num)
    setCustomerRequestsLoading(true)
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });
    
    if(localStorage.getItem('token')!==''){
      console.log(customerSearchTerm)
      await reqInstance.post(Constants.host+'filtercustomers',{"cur_num":num,"email":customerSearchTerm}).then(res => {
          console.log(res.data)
          setCustomerFilteredRequests(res.data)
          setCustomerRequestsLoading(false)
      }).catch(err => {
        console.log(err)
        localStorage.setItem('token','');
        props.setLoggedIn(false);
        setCustomerRequestsLoading(false)
      })
    }else{
      localStorage.setItem('token','');
      props.setLoggedIn(false);
      setCustomerRequestsLoading(false)
    }
  }

  const deleteCustomerRequests = async (customer_id) => {
    // console.log(num)
    setCustomerRequestsLoading(true)
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });
    
    if(localStorage.getItem('token')!==''){
      await reqInstance.post(Constants.host+'deletecustomer',{"c_id":customer_id}).then(async res => {
          console.log(res.data)
          await getCustomerRequests(customerRequests.cur_num)
          setCustomerRequestsLoading(false)
      }).catch(err => {
        localStorage.setItem('token','');
        props.setLoggedIn(false);
        setCustomerRequestsLoading(false)
      })
    }else{
      localStorage.setItem('token','');
      props.setLoggedIn(false);
      setCustomerRequestsLoading(false)
    }
  }

  useEffect(()=>{
    getBookingRequests(1);
    getCustomerRequests(1);
  },[])

  return(
    <div className='landing_page'>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col xs={6} md={7} className="d-flex">
                  <h3 className="card-title text-left text-dark">
                    <strong>Bookings</strong>
                  </h3>
                </Col>

                <Col xs={6} md={5}>
                  <div
                    className="wrapper mt-2 "
                    style={{
                      background: 'white',
                      borderRadius: '48px',
                      position: 'relative',
                      float: 'right',
                    }}
                  >
                    <div className="input-group">
                      <input
                        className="form-control py-2 border-0"
                        type="search"
                        placeholder="Customer Email"
                        // style={style}
                        style={{ borderRadius: '48px' }}
                        // getFilteredBookingRequests(1)
                        onChange={(event) => {setBookingsearchTerm(event.target.value); getBookingFilteredRequests(1,event.target.value)} }
                      />
                      <span className="input-group-append">
                        <button
                          className="btn border-0 border bg-white"
                          type="button"
                          style={{ borderRadius: '48px' }}
                          // style={style}
                          onClick={() => { }}
                        >
                          <FeatherIcon icon="search" size={22} stroke-width={3} />
                        </button>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Header>

          {bookingRequestsLoading && bookingRequests.results?.length === 0 && (
            <Card.Body>
              <Row>
                <Col xs={12} className="text-center">
                  <Spinner animation="grow" variant="warning" />
                </Col>
              </Row>
            </Card.Body>
          )}
          {!bookingRequestsLoading && bookingRequests.results?.length === 0 && (
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <p>
                    You do not have any bookings. Head to the{' '}
                    <strong>Create Booking Section</strong> to begin creating a booking.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          )}

          {!bookingRequestsLoading && bookingRequests.results?.length > 0 && (
              <>
                <div className="table-responsive">
                  <table className="table card-table table-hover table-outline text-nowrap table-vcenter card-table">
                    <thead>
                      <tr className="text-center">
                        <th>Booking ID</th>
                        <th>Customer Email</th>
                        <th>Location ID</th>
                        <th>Drone Shot ID</th>
                        <th>Created Time</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {bookingSearchTerm.length === 0 &&
                        bookingRequests.results.map((booking) => (
                          <tr key={booking.booking_id}>
                            <td>
                              <Link onClick={() => { }} >
                                {booking.booking_id}
                              </Link>
                            </td>
                            <td>{booking.c_email}</td>
                            <td>{booking.location_id}</td>
                            <td>{booking.drone_shot_id} </td>
                            <td>{booking.creation_timestamp} </td>
                            <td>
                              <Link
                                to="#"
                                onClick={() => {deleteBookingRequests(booking.booking_id) }}
                              >
                                <FeatherIcon icon="trash-2" size={14} />
                              </Link>
                            </td>
                          </tr>
                        ))}

                      {bookingSearchTerm.length > 0 &&
                        bookingFilteredRequests.results.map((booking) => (
                          <tr key={booking.booking_id}>
                            <td>
                              <Link onClick={() => {deleteBookingRequests(booking.booking_id) }} >
                                {booking.booking_id}
                              </Link>
                            </td>
                            <td>{booking.c_email}</td>
                            <td>{booking.location_id}</td>
                            <td>{booking.drone_shot_id} </td>
                            <td>{booking.creation_timestamp} </td>
                            <td>
                              <Link
                                to="#"
                                onClick={() => { deleteBookingRequests(booking.booking_id)}}
                              >
                                <FeatherIcon icon="trash-2" size={14} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <Card.Footer>
                  <Container>
                    <Row>
                      {bookingSearchTerm.length === 0 && (
                        <>
                          <div className="col col-md text-left">
                            {bookingRequests.page_list ? (
                              <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                Page {bookingRequests.page} of{' '}
                                {bookingRequests.page_list[bookingRequests.page_list.length - 1]}
                              </p>
                            ) : null}
                          </div>

                          <div className="col-auto col-md-auto text-right">
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={bookingRequests.has_prev ? false : true}
                                onClick={() => getBookingRequests(bookingRequests.prev_num)}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={bookingRequests.has_next ? false : true}
                                onClick={() => getBookingRequests(bookingRequests.next_num)}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {bookingSearchTerm.length > 0 && (
                        <>
                          <div className="col col-md text-left">
                            {bookingFilteredRequests.page_list ? (
                              <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                Page {bookingFilteredRequests.page} of{' '}
                                {
                                  bookingFilteredRequests.page_list[
                                    bookingFilteredRequests.page_list.length - 1
                                  ]
                                }
                              </p>
                            ) : null}
                          </div>

                          <div className="col-auto col-md-auto text-right">
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={bookingFilteredRequests.has_prev ? false : true}
                                onClick={() =>
                                  getBookingFilteredRequests(bookingFilteredRequests.prev_num,bookingSearchTerm)
                                }
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={bookingFilteredRequests.has_next ? false : true}
                                onClick={() =>
                                  getBookingFilteredRequests(bookingFilteredRequests.next_num,bookingSearchTerm)
                                }
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </Row>
                  </Container>
                </Card.Footer>
              </>
            )}
          
        </Card>
      </Col>

                            <br/><br />
      <Col xs={12}>
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col xs={6} md={7} className="d-flex">
                  <h3 className="card-title text-left text-dark">
                    <strong>Customers</strong>
                  </h3>
                </Col>

                <Col xs={6} md={5}>
                  <div
                    className="wrapper mt-2 "
                    style={{
                      background: 'white',
                      borderRadius: '48px',
                      position: 'relative',
                      float: 'right',
                    }}
                  >
                    <div className="input-group">
                      <input
                        className="form-control py-2 border-0"
                        type="search"
                        placeholder="Customer Email"
                        // style={style}
                        style={{ borderRadius: '48px' }}
                        // getFilteredBookingRequests(1)
                        onChange={(event) => {setCustomersearchTerm(event.target.value); getCustomerFilteredRequests(1,event.target.value)} }
                      />
                      <span className="input-group-append">
                        <button
                          className="btn border-0 border bg-white"
                          type="button"
                          style={{ borderRadius: '48px' }}
                          // style={style}
                          onClick={() => { }}
                        >
                          <FeatherIcon icon="search" size={22} stroke-width={3} />
                        </button>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Header>

          {customerRequestsLoading && customerRequests.results?.length === 0 && (
            <Card.Body>
              <Row>
                <Col xs={12} className="text-center">
                  <Spinner animation="grow" variant="warning" />
                </Col>
              </Row>
            </Card.Body>
          )}
          {!customerRequestsLoading && customerRequests.results?.length === 0 && (
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <p>
                    You do not have any bookings. Head to the{' '}
                    <strong>Create Customer Section</strong> to begin creating a booking.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          )}

          {!customerRequestsLoading && customerRequests.results?.length > 0 && (
              <>
                <div className="table-responsive">
                  <table className="table card-table table-hover table-outline text-nowrap table-vcenter card-table">
                    <thead>
                      <tr className="text-center">
                        <th>Customer ID</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {customerSearchTerm.length === 0 &&
                        customerRequests.results.map((customer) => (
                          <tr key={customer.c_id}>
                            <td>
                              <Link onClick={() => { }} >
                                {customer.c_id}
                              </Link>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.ph_no}</td>
                            <td>
                              <Link
                                to="#"
                                onClick={() => {deleteCustomerRequests(customer.c_id) }}
                              >
                                <FeatherIcon icon="trash-2" size={14} />
                              </Link>
                            </td>
                          </tr>
                        ))}

                      {customerSearchTerm.length > 0 &&
                        customerFilteredRequests.results.map((customer) => (
                          <tr key={customer.c_id}>
                            <td>
                              <Link onClick={() => {deleteCustomerRequests(customer.booking_id) }} >
                                {customer.c_id}
                              </Link>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.ph_no}</td>
                            <td>
                              <Link
                                to="#"
                                onClick={() => {deleteCustomerRequests(customer.c_id) }}
                              >
                                <FeatherIcon icon="trash-2" size={14} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <Card.Footer>
                  <Container>
                    <Row>
                      {customerSearchTerm.length === 0 && (
                        <>
                          <div className="col col-md text-left">
                            {customerRequests.page_list ? (
                              <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                Page {customerRequests.page} of{' '}
                                {customerRequests.page_list[customerRequests.page_list.length - 1]}
                              </p>
                            ) : null}
                          </div>

                          <div className="col-auto col-md-auto text-right">
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={customerRequests.has_prev ? false : true}
                                onClick={() => getBookingRequests(customerRequests.prev_num)}
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={customerRequests.has_next ? false : true}
                                onClick={() => getBookingRequests(customerRequests.next_num)}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {customerSearchTerm.length > 0 && (
                        <>
                          <div className="col col-md text-left">
                            {customerFilteredRequests.page_list ? (
                              <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                Page {customerFilteredRequests.page} of{' '}
                                {
                                  customerFilteredRequests.page_list[
                                    customerFilteredRequests.page_list.length - 1
                                  ]
                                }
                              </p>
                            ) : null}
                          </div>

                          <div className="col-auto col-md-auto text-right">
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={customerFilteredRequests.has_prev ? false : true}
                                onClick={() =>
                                  getBookingFilteredRequests(customerFilteredRequests.prev_num,bookingSearchTerm)
                                }
                              >
                                Previous
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning"
                                style={{ color: 'black' }}
                                disabled={customerFilteredRequests.has_next ? false : true}
                                onClick={() =>
                                  getBookingFilteredRequests(customerFilteredRequests.next_num,bookingSearchTerm)
                                }
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </Row>
                  </Container>
                </Card.Footer>
              </>
            )}
          
        </Card>
      </Col>


    </div>
  );
}
  
  export default LandingPage;
