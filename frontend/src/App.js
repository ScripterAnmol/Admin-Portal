import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import Login from './Components/Pages/Login';
import TopBar from './Components/Parts/TopBar';
import MainPage from './MainPage';
import { Constants } from './Constants';
import { BrowserRouter} from 'react-router-dom';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setLoggedIn(true)
  }, []);
 
  useEffect(()=>{
    let reqInstance = axios.create({
      headers: {
        Authorization : `${localStorage.getItem("token")}`
      }
    });

    if(localStorage.getItem('token')!=='' && reqInstance.post(Constants.host+'verifyToken')){
      setLoggedIn(true);
    }else{
      localStorage.setItem('token','');
      setLoggedIn(false);
    }
  },[])

  return (
    <div className="App"> 
      {!loggedIn?<Login setLoggedIn={setLoggedIn}/>: 
        <>
        <BrowserRouter>
          <TopBar setLoggedIn={setLoggedIn}/>
          <MainPage setLoggedIn={setLoggedIn} />
          </BrowserRouter>
        </>
      }
    </div>
  );
}

export default App;
