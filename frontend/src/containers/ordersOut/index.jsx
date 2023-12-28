import Style from "./style.module.css";
import { useState,useEffect } from "react";
import { OrdersOutFromSellerApi } from "../../../apis/order";
import OrderOutCard from "../../components/orderOutCard";

export default function OrdersOut() {
    const [orders,setOrders]=useState([]);

    
    useEffect(() => {
        OrdersOutFromSellerApi().then(function(items){
            setOrders(items);
        }).catch(function(err){
            console.log(err);
        });
    }, []);
    
    
    return (
        <div className={Style.productsContainer}>
            {
                orders.map((value,i)=>{
                    return(
                        <OrderOutCard  key={i} order={value}/>
                    )
                })
            }
        </div>
    )
}