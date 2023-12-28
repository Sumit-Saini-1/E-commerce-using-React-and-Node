import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Select from "../../components/select";
import Style from "./style.module.css";
import { CreateDistributorApi } from "../../../apis/distributor";

export default function CreateDistributor() {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const [level, setLevel] = useState("none");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [pincode, setPincode] = useState("");


    function onChangeLevel(ev) {
        setLevel(ev.target.value);
    }
    function onChangeUserName(ev) {
        setUsername(ev.target.value.trim());
    }
    function onChangePassword(ev) {
        setPassword(ev.target.value);
    }
    function onChangeAddressLine1(ev) {
        setAddressLine1(ev.target.value.trim());
    }
    function onChangeState(ev) {
        setState(ev.target.value.trim());
    }
    function onChangeDistrict(ev) {
        setDistrict(ev.target.value.trim());
    }
    function onChangePincode(ev) {
        setPincode(ev.target.value.trim());
    }

    function onClickCreate() {
        if (level == "none") {
            alert("Select level of distributor");
            return;
        }
        if (username.length < 5) {
            alert("username must be of atleast 5 character");
            return;
        }
        if (!re.test(password)) {
            alert("password must be more than 8 characters and there should be atleast 1 capital letter, 1 special character, 1 digit");
            return false;
        }
        if (addressLine1 == "") {
            alert("address must be entered");
            return;
        }
        if (state == "") {
            alert("state must be entered");
            return;
        }
        if (district == "") {
            alert("district must be entered");
            return;
        }
        if (pincode == "") {
            alert("pincode must be entered");
            return;
        }
        CreateDistributorApi(username,password,addressLine1,state,district,pincode,level).then(status=>{
            if(status==200){
                alert("success");
                setUsername("");
                setPassword("");
                setAddressLine1("");
                setState("");
                setDistrict("");
                setPincode("");
                setLevel("");
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
                <Select options={["State", "District"]} value={level} onChange={onChangeLevel} />
                <Input type="text" value={username} onChange={onChangeUserName} placeholder="Enter username" />
                <Input type="password" value={password} onChange={onChangePassword} placeholder="Enter password" />
                <Input type="text" value={addressLine1} onChange={onChangeAddressLine1} placeholder="Address Line1" />
                <Input type="text" value={state} onChange={onChangeState} placeholder="State" />
                <Input type="text" value={district} onChange={onChangeDistrict} placeholder="District" />
                <Input type="number" value={pincode} onChange={onChangePincode} placeholder="Pincode" />

                <Button onClick={onClickCreate}>Create</Button>

            </div>
        </div>
    )
}