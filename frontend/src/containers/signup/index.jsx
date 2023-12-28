import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { Link,useNavigate } from "react-router-dom";
import {SignupApi} from "../../../apis/auth";

export default function Signup() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg,setErrormsg]=useState("");
    function onChangeName(ev) {
        setName(ev.target.value);
    }
    function onChangeMobile(ev) {
        setMobile(ev.target.value);
    }
    function onChangeUserName(ev) {
        setUsername(ev.target.value);
    }

    function onChangePassword(ev) {
        setPassword(ev.target.value);
    }

    const navigate = useNavigate();

    function onClickSignup() {
        const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const mbre = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        const mailre = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        //const mailre = /^[\w+\.]+@[a-z]+([\.-]?\w+)*\.[a-z]{2,3}$/

        if (name.trim() == "") {
            alert("name must be entered");
            return false;
        }
        if (!mbre.test(mobile)) {
            alert("Enter a valid mobile number");
            return false;
        }
        if(!mailre.test(username)){
            alert("Enter a valid email");
            return;
        }
        if (!re.test(password)) {
            alert("password must be more than 8 characters and there should be atleast 1 capital letter, 1 special character, 1 digit");
            return false;
        }
        

        SignupApi({name,mobile,username,password}).then(function(response){
            if(response.status==200){
                navigate("/login");
            }
            else if(response.status==409){
                setErrormsg("User already exist");
            }
            else{
                setErrormsg("Something went wrong");
            }
        }).catch(function(err){
            console.log(err);
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <h2>Sign Up</h2>
                <Input type="text" value={name} onChange={onChangeName} placeholder="Enter your full Name" />
                <Input type="number" value={mobile} onChange={onChangeMobile} placeholder="Enter mobile number" />
                <Input type="text" value={username} onChange={onChangeUserName} placeholder="Enter username" />
                <Input type="password" value={password} onChange={onChangePassword} placeholder="Enter password" />
                <Button onClick={onClickSignup}>Sign up</Button>
                <p className={errormsg?Style.error:Style.hidden}>{errormsg}</p>
                <p className={Style.p}>if already registered login <Link to="/login">here</Link></p>
            </div>
        </div>
    )
}