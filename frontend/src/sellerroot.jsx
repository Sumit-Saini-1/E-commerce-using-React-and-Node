import SellerHeader from "./components/sellerHeader";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from './context/auth/authContext';
import { CheckAutentication } from '../apis/auth';
import { useEffect, useState, useContext } from 'react';

function SellerRoot() {
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
                authChecking ?
                    <div>loading..</div> :
                    auth.isloggedIn ?
                        auth.user.role == "seller" ?
                            <>
                                <div>
                                    <SellerHeader />
                                </div>
                                <Outlet />
                            </> :
                            <h2>not authorise</h2> :
                        <Navigate to={"/sellerLogin"}/>
            }

        </>
    )
}

export default SellerRoot
