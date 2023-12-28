import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { CreateDeliveryPersonApi } from "../../../apis/deliveryPerson";

export default function CreateDeliveryPerson() {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [pincode, setPincode] = useState("");

    function onChangeUserName(ev) {
        setUsername(ev.target.value.trim());
    }
    function onChangePassword(ev) {
        setPassword(ev.target.value);
    }
    function onChangeName(ev) {
        setName(ev.target.value);
    }
    function onChangePincode(ev) {
        setPincode(ev.target.value.trim());
    }
    function onClickCreate() {
        if (username.length < 5) {
            alert("username must be of atleast 5 character");
            return;
        }
        if (!re.test(password)) {
            alert("password must be more than 8 characters and there should be atleast 1 capital letter, 1 special character, 1 digit");
            return false;
        }
        if (name == "") {
            alert("Name must be entered");
            return;
        }
        if (pincode == "") {
            alert("pincode must be entered");
            return;
        }
        CreateDeliveryPersonApi(username,password,name,pincode).then(status=>{
            if(status==200){
                alert("success");
                setUsername("");
                setPassword("");
                setName("");
                setPincode("");
            }
            else if(status==409){
                alert("user already exist");
            }
            else{
                console.log("something went wrong");
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <h2>Create Distributor</h2>
                <Input type="text" value={username} onChange={onChangeUserName} placeholder="Enter username" />
                <Input type="password" value={password} onChange={onChangePassword} placeholder="Enter password" />
                <Input type="text" value={name} onChange={onChangeName} placeholder="Enter Name" />
                <Input type="number" value={pincode} onChange={onChangePincode} placeholder="Pincode" />
                <Button onClick={onClickCreate}>Create</Button>
            </div>
        </div>
    )
}