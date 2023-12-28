import { useEffect, useState, useContext } from 'react';
import './App.css';
import Navbar from './components/navbar';
import { Navigate, Outlet } from "react-router-dom";
import { CheckAutentication } from '../apis/auth';
import AuthContext from './context/auth/authContext';

function App() {
  const [authChecking, setAuthChecking] = useState(true);
  const auth = useContext(AuthContext);
  useEffect(function () {
    if (auth.isloggedIn) {
      setAuthChecking(false);
    }
    else {
      checkIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function checkIsLoggedIn() {
    try {
      const result = await CheckAutentication();
      if (result) {
        // console.log(25, window.sessionStorage.getItem("user"));
        auth.setUser(JSON.parse(window.sessionStorage.getItem("user")));
      }
      auth.setIsLoggedIn(result);

      setAuthChecking(false);
    }
    catch {
      auth.setIsLoggedIn(false);
    }
  }

  return (
    <>
      {
        authChecking ? <div>loading..</div> :
        auth.isloggedIn ?
        auth?.user?.role=="customer"?
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </>:
        <Navigate to={"/login"}/>: 
        <Navigate to={"/login"}/>
      }

    </>
  )
}

export default App
