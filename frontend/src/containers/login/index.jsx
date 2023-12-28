import { useState, useContext } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../../../apis/auth";
import AuthContext from "../../context/auth/authContext";
export default function Login() {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const navigate = useNavigate();
    function onChangeUserName(ev) {
        setUsername(ev.target.value);
    }
    function onChangePassword(ev) {
        setPassword(ev.target.value);
    }

    function onClickLogin() {
        if(username==""){
            alert("Enter username");
            return;
        }
        if(password==""){
            alert("Enter password");
            return;
        }
        LoginApi({ username, password }).then(function (response) {
            const status=response.status;
            if (status == 200) {
                console.log("success");
                return response.json();
            }
            else if (status == 402) {
                setErrormsg("verify your email first");
            }
            else if (status == 401) {
                setErrormsg("invalid credential");
            }
            else if (status == 404) {
                setErrormsg("user not found");
            }
            else {
                setErrormsg("Something went wrong");
            }
        }).then(function (data) {
            console.log(data);
            auth.setUser(data);
            window.sessionStorage.setItem("user",JSON.stringify(data));
            auth.setIsLoggedIn(true);
            if(data.role=="customer"){
                navigate("/");
            }
            else if(data.role=="admin"){
                navigate("/admin/adminhome");
            }
        }).catch(function () {
            console.log("Error");
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <h2>Sign in</h2>
                <Input type="text" value={username} onChange={onChangeUserName} placeholder="Enter username" />
                <Input type="password" value={password} onChange={onChangePassword} placeholder="Enter password" />
                <Button onClick={onClickLogin}>Login</Button>
                <p className={errormsg ? Style.error : Style.hidden}>{errormsg}</p>
                <p className={Style.p}>new user can signup <Link to="/signup">here</Link></p>
                <p className={Style.p}>Forgot password <Link to={"/forgotPassword"} >click here</Link></p>
                <p className={Style.p}>Login as Seller <Link to="/sellerLogin">click here</Link></p>
            </div>
        </div>
    )
}