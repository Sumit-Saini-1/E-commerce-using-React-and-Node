import Style from "./style.module.css";
import { useState,useEffect } from "react";
import {ReceivedOrderApi} from "../../../apis/sellers";
import ReceivedOrderCard from "../../components/receivedOrderCard/index"

export default function SellerHome() {
    const [orders,setOrders]=useState([]);
    
    useEffect(() => {
        ReceivedOrderApi().then(function(items){
            setOrders(items);
            // console.log(items);
        }).catch(function(err){
            console.log(err);
        });
    }, []);
    
    function removeOrderFormOrders(order){
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
                    return(
                        <ReceivedOrderCard  key={i} afterDispatch={removeOrderFormOrders(value)} order={value}/>
                    )
                })
            }
        </div>
    )
}