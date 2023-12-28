import { SERVER_URL, Token } from "./global";

export function GetMyOrdersApi() {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/order/getMyOrder", {
            credentials: "include",
            headers:{
                'Authorization':token
            }
        }).then(function (response) {
            if (response.status == 200) {
                resolve(response.json());
            }
            else {
                resolve([]);
                console.log("something went wrong ");
            }
        }).catch(function (err) {
            reject(err);
        });
    });

}

export function CancelOrderApi(order) {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/order/cancelOrder", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify({ oid: order.oid, pid: order.pid })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function OrdersOutFromSellerApi(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/order/orderOut",{
            credentials:"include",
        }).then(function (response) {
            if (response.status == 200) {
                return response.json();
            }
            else {
                console.log("something went wrong");
            }
        }).then(function (orders) {
            resolve(orders);
        }).catch(function (err) {
            reject(err);
        });
    });
    
}

export function DispatchOrderApi(dispatchedTo, oid) {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/order/dispatched", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dispatchedTo: dispatchedTo, order: oid })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}