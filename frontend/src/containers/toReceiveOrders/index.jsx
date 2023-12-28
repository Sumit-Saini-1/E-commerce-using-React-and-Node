import Style from "./style.module.css";
import { useState,useEffect } from "react";
import { OrdersToReceiveApi,ReceivedAtStoreApi } from "../../../apis/distributor";
import ToReceiveOrderCard from "../../components/toReceiveOrderCard";

export default function ToReceiveOrders() {
    const [orders,setOrders]=useState([]);
    
    useEffect(() => {
        OrdersToReceiveApi().then(function(items){
            setOrders(items);
            // console.log(items);
        }).catch(function(err){
            console.log(err);
        });
    }, []);
    
    function onClickReceive(order){
        return function(){
            console.log(order);
            ReceivedAtStoreApi(order).then(received=>{
                if(received){
                    setOrders(orders.filter(value=>{
                        return value.oid!=order.oid;
                    }));
                }
                else{
                    console.log("something wrong");
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    
    return (
        <div className={Style.productsContainer}>
            {
                orders.map((value,i)=>{
                    return(
                        <ToReceiveOrderCard  key={i} onClickReceive={onClickReceive(value)} order={value}/>
                    )
                })
            }
        </div>
    )
}