import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { useState } from "react";
import { ChangePasswordApi } from "../../../apis/auth";
import { useParams,useNavigate } from "react-router-dom";


export default function ResetPassword() {
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const userId=useParams();
    const navigate=useNavigate();

    function onChangeNewPass(ev) {
        setNewPass(ev.target.value);
    }

    function onChangeConfirmPass(ev) {
        setConfirmPass(ev.target.value);
    }

    function onClickUpdate() {
        console.log(userId);
        const npass = newPass.trim();
        const cpass = confirmPass.trim();
        if (!re.test(npass)) {
            alert("password must be more than 8 characters and there should be atleast 1 capital letter, 1 special character, 1 digit");
            return false;
        }
        else if (npass != cpass) {
            alert("new password and confirm password should be shame");
            return;
        }
        else{
            ChangePasswordApi({newPass,userId:userId}).then(function(response){
                if(response.status==200){
                    alert("Password updated");
                    navigate("/");
                }
                else{
                    alert("password didn't update");
                }
            }).catch(function(){
                console.log("Error");
            });
        }

    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <Input type="password" onChange={onChangeNewPass} value={newPass} placeholder="Enter new password" />
                <Input value={confirmPass} onChange={onChangeConfirmPass} placeholder="Confirm your new password" />
                <Button onClick={onClickUpdate}>Update</Button>
            </div>
        </div>
    );
}