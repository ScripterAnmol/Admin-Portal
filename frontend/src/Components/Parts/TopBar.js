import { Button } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import '../../assets/css/TopBar.css';
import logo from '../../assets/pictures/logo1.png';
// import defaultProfilePhoto from '../../assets/images/profile.jpg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const TopBar = (props) => {

    const handleLogout = () => {
        console.log("logout cliked")
        props.setLoggedIn(false);
        localStorage.setItem('token','');
    }
    const [isHeaderOpen, setisHeaderOpen] = useState(false);
    const [activePage,setActivePage] = useState("home");

    const handlePageChange = (page) => {
        setActivePage(page);
    }

    return (
    <div className='top_bar'>
        <div className='top_nav'>
            <div className="container">
                <div className="d-flex">
                    <a className="header_brand" href="/">
                        <img src={logo} className="header-brand-img" alt="ADMIN PORTAL" />
                    </a>

                    <div className="d-flex order-lg-2 ml-auto text-left" style={{ marginLeft: 'auto'}} >
                        {/* <span className="golden-text" style={{ marginTop: 'auto', marginBottom: 'auto' }}> */}
                        {/* <strong>{Constants.urls.Tenent}</strong> */}
                        {/* <strong>Anmol</strong>
                        </span> */}
                        <div className='logout_button' onClick={handleLogout}>Logout</div>
                    </div>
                </div>
            </div>
        </div>

        <Navbar className="bottom_nav" bg="primary"  expand="lg">
            <Container>
                {/* <Navbar.Brand href="#">Todo-List</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Item><Link className={activePage=='home'?'nav-link active':'nav-link'} to="/" onClick={() => {handlePageChange("home")}}>Home</Link></Nav.Item>
                    <Nav.Item><Link className={activePage=='createcustomer'?'nav-link active':'nav-link'} to="/createcustomer" onClick={() => {handlePageChange("createcustomer")}}>Create Customer</Link></Nav.Item>
                    <Nav.Item><Link className={activePage=='createbooking'?'nav-link active':'nav-link'} to="/createbooking" onClick={() => {handlePageChange("createbooking")}}>Create Booking</Link></Nav.Item>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* <div className={`header collapse d-lg-flex p-0 ${isHeaderOpen ? 'show' : ''}`} id="headerMenuCollapse" style={{ background: 'linear-gradient(90deg,#e3af32 0%,#f4e00f 100%)' }} >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg order-lg-first">
                        <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                            dd
                        </ul>
                    </div>
                </div>
            </div>
        </div> */}

    </div>
    
  );
};

export default TopBar;
