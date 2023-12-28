import { SERVER_URL } from "./global";

export function SellerSignupApi(name,mobile,username,password,businessname,businesstype,aadharno,aadhar){
    const formData=new FormData();
    formData.append("name",name);
    formData.append("mobile",mobile);
    formData.append("username",username);
    formData.append("password",password);
    formData.append("businessname",businessname);
    formData.append("businesstype",businesstype);
    formData.append("aadharno",aadharno);
    formData.append("aadhar",aadhar);
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/seller/signup", {
            method: "POST",
            credentials:"include",
            body: formData
        }).then(function (response) {
            
            if (response.status === 200) {
                resolve(true);
            }
            else if(response.status===409){
                resolve(false)
            }
            else {
                reject("something wrong");
            }
        });
    })
}

export function SellersToApproveApi(page) {

    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/seller/getSellersToApprove/" + page, {
            credentials: "include",
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                console.log("something went wrong");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function ApproveSellerApi(sid) {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/seller/approveseller/" + sid).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}

export function RejectSellerApi(sid) {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/seller/rejectseller/" + sid).then(function (response) {
            if (response.status == 200) {
                resolve(true)
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}

export function SelleLoginApi(username, password) {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/seller/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        }).then(function (response) {
            resolve(response);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function ReceivedOrderApi() {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/order/receivedOrders", {
            credentials: "include",
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err)
        });
    });
}

export function MyProductsApi(page, perpage = 8) {

    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/product/myPostedProducts/" + page + "/" + perpage, {
            credentials: "include"
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                resolve[50];
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function MonthlyReportApi(month,year){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/seller/monthlyReport", {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ month, year })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                console.log("something went wrong");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function YearlyReportApi(year){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/seller/yearlyReport", {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ year })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                console.log("something went wrong");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}