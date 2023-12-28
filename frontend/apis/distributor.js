import { SERVER_URL, Token } from "./global";

export function CreateDistributorApi(username, password, address, state, district, pincode, level) {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/admin/createDistributor", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify({ username, password, address, state, district, pincode, level })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(200);
            }
            else if (response.status == 409) {
                resolve(409);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function DistributorLoginApi(username,password){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/distributor/login",{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({username,password})
        }).then(function (response) {
            resolve(response);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function OrdersToReceiveApi() {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/distributor/toReceive",{
            credentials:"include"
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                resolve([]);
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}

export function ReceivedAtStoreApi(order){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/distributor/received", {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order})
        }).then(function(response){
            if(response.status==200){
                resolve(true);
            }
            else{
                resolve(false)
            }
        }).catch(function(err){
            reject(err);
        });
    });
}

export function OrdersToShipApi(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/distributor/toShip",{
            credentials:"include"
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function ShippedFromStore(order,shipto){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/distributor/shipped", {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ order: order, shipto: shipto })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err)
        });
    });
}