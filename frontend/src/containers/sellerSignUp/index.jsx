import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { Link,useNavigate } from "react-router-dom";
import { SellerSignupApi } from "../../../apis/sellers";

export default function SellerSignup() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buisnessName,setBuisnessName]=useState("");
    const [businessType,setBusinessType]=useState("");
    const [aadharNo,setAadharNo]=useState("");
    const [aadhar,setAadhar]=useState(null);
    const navigate = useNavigate();
    const [errormsg,setErrormsg]=useState("");
    const allowedtypes=["image/jpeg","image/jpg","image/png"];

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
    function onChangeBuisnessName(ev){
        setBuisnessName(ev.target.value);
    }
    function onChangeBuisnessType(ev){
        setBusinessType(ev.target.value);
    }
    function onChangeAadharNo(ev){
        setAadharNo(ev.target.value);
    }
    function onChangeAadharImage(ev){
        const file=ev.target.files[0];
        if(!allowedtypes.includes(file.type)){
            alert("invalid file type. Please upload a jpeg or png.");
            return;
        }
        if(file.size>250000){
            alert("image size should be less than 250kb");
            return;
        }
        setAadhar(file);
        // setProductImage(URL.createObjectURL(ev.target.files[0]));
    }
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
        if(buisnessName==""){
            alert("Business name must be entered");
            return false;
        }
        if(businessType==""){
            alert("Business type must be entered");
            return false;
        }
        if(aadharNo==""||aadharNo.length!=12){
            alert("Enter a valid aadhar no");
            return false;
        }
        if(!aadhar){
            alert("Aadhar must be uploaded");
            return false;
        }
        SellerSignupApi(name,mobile,username,password,buisnessName,businessType,aadharNo,aadhar).then(res=>{
            if(res){
                navigate("/sellerLogin");
            }
            else{
                setErrormsg("User already exist");
            }
        }).catch(err=>{
            setErrormsg(err);
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
                <Input type="text" value={buisnessName} onChange={onChangeBuisnessName} placeholder="Enter Buisness Name" />
                <Input type="text" value={businessType} onChange={onChangeBuisnessType} placeholder="Enter Buiness type" />
                <Input type="number" value={aadharNo} onChange={onChangeAadharNo} placeholder="Enter Aadhar no" />
                <Input type="file" onChange={onChangeAadharImage} placeholder="Aadhar Image" />
                <Button onClick={onClickSignup}>Sign up</Button>
                <p className={errormsg?Style.error:Style.hidden}>{errormsg}</p>
                <p className={Style.p}>if already registered login <Link to="/login">here</Link></p>
            </div>
        </div>
    )
}