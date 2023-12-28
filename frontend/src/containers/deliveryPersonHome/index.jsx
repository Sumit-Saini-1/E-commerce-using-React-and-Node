import Style from "./style.module.css";
import { useState, useEffect } from "react";
import { OrdersToDeliveryApi, DeliveredApi } from "../../../apis/deliveryPerson";
import OutForDeliveryCard from "../../components/outForDeliveryCard";

export default function DeliveryPersonHome() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrdersToDeliveryApi().then(function (items) {
            if (items) {
                setOrders(items.orders);
            }
        }).catch(function (err) {
            console.log(err);
        });
    }, []);

    function onClickDeliver(order) {
        return function () {
            // console.log(order);
            DeliveredApi(order).then(delivered => {
                if (delivered) {
                    setOrders(orders.filter(value => {
                        return value.oid != order.oid;
                    }));
                }
            }).catch(err => {
                console.log("Something wrong", err);
            })

        }
    }
    return (
        <div className={Style.productsContainer}>
            {
                orders.map((value, i) => {
                    if (value.orderstatus != "cancelled") {
                        return (
                            <OutForDeliveryCard onClickDeliver={onClickDeliver(value)} key={i} order={value} />
                        )
                    }
                })
            }
        </div>
    )
}