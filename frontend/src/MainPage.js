import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './Components/Pages/LandingPage';
import CreateBooking from './Components/Pages/CreateBooking';
import CreateCustomer from './Components/Pages/CreateCustomer';

const TopBar = (props) => {
    return (
        <>
        <Switch>
        {/* <Route exact default path="/" element={<LandingPage setLoggedIn={props.setLoggedIn}/>} />
            <Route exact path="/createcustomer" element={<CreateCustomer setLoggedIn={props.setLoggedIn} />} />
            <Route exact path="/createbooking" element={<CreateBooking setLoggedIn={props.setLoggedIn} />} /> */}
            <Route exact default path="/" component={(props) => <LandingPage {...props} />} />
            <Route exact path="/createcustomer" component={(props) => <CreateCustomer {...props} />} />
            <Route exact path="/createbooking" component={(props) => <CreateBooking {...props} />} />
        </Switch>
      </>
    );
}

export default TopBar;
