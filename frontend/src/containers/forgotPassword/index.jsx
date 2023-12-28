import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { useState } from "react";
import { ForgotPasswordApi } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
const mailre = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate=useNavigate();

    function onChangeEmail(ev) {
        setEmail(ev.target.value);
    }

    function onClickSendLink() {
        if (!mailre.test(email)) {
            alert("Enter a valid email");
            return;
        }
        ForgotPasswordApi(email).then(res => {
            if (res) {
                alert("check your email");
                setEmail("");
                navigate("/login");
                return;
            }
            else {
                alert("this email is not registered");
                return;
            }
        })
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <Input type="text" onChange={onChangeEmail} value={email} placeholder="Enter registered Email" />
                <Button onClick={onClickSendLink}>Send Link</Button>
            </div>
        </div>
    );
}