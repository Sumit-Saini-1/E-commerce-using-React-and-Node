import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { useState } from "react";
import { ChangePasswordApi } from "../../../apis/auth";


export default function ChangePassword() {
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    function onChangeNewPass(ev) {
        setNewPass(ev.target.value);
    }

    function onChangeConfirmPass(ev) {
        setConfirmPass(ev.target.value);
    }

    function onClickUpdate() {
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
            ChangePasswordApi({newPass,userId:"userId"}).then(function(response){
                if(response.status==200){
                    alert("Password updated");
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
                {/* <div className="formelement">
                <li id="oneCapLetter">There shoud be atleast one Capital letter[A-Z]</li>
                <li id="oneSmLetter">There shoud be atleast one small letter[a-z]</li>
                <li id="oneDigit">There shoud be atleast one digit[0-9]</li>
                <li id="oneSpecChar">There shoud be atleast one special character[!@#$%^&*]</li>
                <li id="passLength">password length should be more than 7</li>

            </div> */}
                <Input type="password" onChange={onChangeNewPass} value={newPass} placeholder="Enter new password" />
                <Input value={confirmPass} onChange={onChangeConfirmPass} placeholder="Confirm your new password" />
                <Button onClick={onClickUpdate}>Update</Button>
            </div>
        </div>
    );
}