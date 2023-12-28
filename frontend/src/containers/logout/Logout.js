import { LogoutApi } from "../../../apis/auth";
import AuthContext from "../../context/auth/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    return function(){
        console.log("logout clicked");
        LogoutApi().then(function (logout) {
            if (logout) {
                auth.setIsLoggedIn(false);
                if(auth.user.role == "seller"){
                    navigate("/sellerLogin");
                }
                else if(auth.user.role == "distributor"){
                    navigate("/distributorLogin")
                }
                else{
                    navigate("/login")
                }
                window.sessionStorage.removeItem("user");
            }
        }).catch(function () {
            console.log("something went wrong");
        });
    }
}