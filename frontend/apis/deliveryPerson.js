import { SERVER_URL } from "./global";

export function CreateDeliveryPersonApi(username,password,name,pincode){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/distributor/createDeliveryPerson",{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username,password,name,pincode })
        }).then(function(response){
            if(response.status==200){
                resolve(200);
            }
            else if(response.status==409){
                resolve(409);
            }
            else{
                resolve("something wrong");
            }
        }).catch(function(err){
            reject(err);
        });
    })
}

export function DeliveryPersonLoginApi(username,password){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/delivery/login",{
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

export function OrdersToDeliveryApi(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/delivery/ordersToDeliver",{
            credentials:"include",
        }).then(function (response) {
            if(response.status==200){
                resolve(response.json());
            }
            else{
                resolve(false);
            }
        }).catch(function(err){
            reject(err);
        });
    })
}

export function DeliveredApi(order) {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/delivery/delivered",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({oid:order.oid})
        }).then(function(response){
            if(response.status==200){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(function(err){
            reject(err);
        });
    });
}