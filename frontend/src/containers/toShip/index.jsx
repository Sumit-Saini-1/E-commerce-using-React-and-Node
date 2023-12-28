import Style from "./style.module.css";
import { useState,useEffect } from "react";
import { OrdersToShipApi } from "../../../apis/distributor";
import ToShipOrderCard from "../../components/toShipOrderCard";

export default function ToShipOrders() {
    const [orders,setOrders]=useState([]);
    
    useEffect(() => {
        OrdersToShipApi().then(function(items){
            if(items){
                setOrders(items);
            }
        }).catch(function(err){
            console.log(err);
        });
    }, []);

    function afterShip(order){
        return function(){
            setOrders(orders.filter(value=>{
                return value.oid!=order.oid;
            }));
        }
    }
    return (
        <div className={Style.productsContainer}>
            {
                orders.map((value,i)=>{
                    if (value.orderstatus != "cancelled"){
                        return(
                            <ToShipOrderCard afterShip={afterShip(value)}  key={i}  order={value}/>
                        )
                    }
                })
            }
        </div>
    )
}