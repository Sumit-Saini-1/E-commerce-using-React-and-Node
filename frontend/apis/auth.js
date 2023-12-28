import { SERVER_URL, Token } from "./global";

export async function LoginApi(data) {
    const payload = {
        username: data.username,
        password: data.password
    };
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(function (response) {
            resolve(response);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function SignupApi(data) {
    const payload = {
        name: data.name,
        mobile: data.mobile,
        username: data.username,
        password: data.password
    }
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(function (response) {
            resolve(response);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function ForgotPasswordApi(email){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/forgotPasswordEmail",{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({username:email})
        }).then(function(response){
            if(response.status==200){
                resolve(true);
            }else if(response.status==404){
                resolve(false)
            }
            else{
                reject("Something went wrong");
            }
        }).catch(function(err){
            reject(err)
        })
    });
}

export function UserEmailVerfyApi(token){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/verify/"+token,{
            credentials:"include"
        }).then(response=>{
            console.log(response);
            if(response.status==200){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        })
    });
}

export function CheckAutentication() {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/checkAuthentication", {
            credentials: "include",
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            console.log(err);
            reject(false);
        });
    });
}

export function LogoutApi() {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/logout", {
            credentials: "include",
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            console.log(err);
            reject(false);
        });
    });
}

export function ChangePasswordApi(data) {
    let token=Token();
    const payload = {
        npass: data.newPass,
        userId: data.userId.userId
    };
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/changePassword", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify(payload)
        }).then(function (response) {
            resolve(response);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function GetAddressApi() {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/getAddress", {
            credentials: "include",
            headers:{
                'Authorization':token
            }
        }).then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
            else {
                resolve(false);
            }
        }).then(address=>{
            resolve(address);
        }).catch(function (err) {
            reject(err);
        });
    });

}