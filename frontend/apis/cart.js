import { SERVER_URL, Token } from "./global";

export function GetCartItemsApi() {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/cart/getAllCartItems", {
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

export function DeleteItemFromCartApi(cartItem) {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/cart/deleteFromCart", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify({ cartItem })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(cartItem);
            }
            else {
                resolve(false)
                console.log("something went wrong");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function IncreaseQuantityApi(cartItem) {
    let token=Token();
    return new Promise((resolve, reject) => {
        let quantity = cartItem.quantity;
        if (quantity == cartItem.stock) {
            alert("we have only " + cartItem.stock + " " + cartItem.name + " in our stock");
            resolve(false)
            return;
        }
        quantity++;
        fetch(SERVER_URL+"/cart/updateCart", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify({ _id: cartItem.cid, quantity: quantity })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(quantity);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function DecreseQuantityApi(cartItem) {
    let token=Token();
    return new Promise((resolve, reject) => {
        let quantity = cartItem.quantity;
        if (quantity == 1) {
            alert("can't be decrease more you can delete item");
            resolve(false)
            return;
        }
        quantity--;
        fetch(SERVER_URL+"/cart/updateCart", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify({ _id: cartItem.cid, quantity: quantity })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(quantity);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function PlaceOrderApi(total, address, country, state, district, pincode) {
    let token=Token();
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/order/placeOrder", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
            },
            body: JSON.stringify({ total, address, country, state, district, pincode })
        }).then(function (response) {
            resolve(response);
        }).catch(function (err) {
            reject(err);
        });
    });

}