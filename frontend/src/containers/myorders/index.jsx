import Style from "./style.module.css";
import OrderCard from "../../components/orderCard/index";
import { useState,useEffect } from "react";
import { GetMyOrdersApi,CancelOrderApi } from "../../../apis/order";

export default function Myorders() {
    const [orders,setOrders]=useState([]);
    useEffect(() => {
        GetMyOrdersApi().then(function(items){
            setOrders(items);
        }).catch(function(err){
            console.log(err);
        });
    }, []);
    function onClickCancel(product){
        return function(){
            CancelOrderApi(product).then(function(cancelled){
                if(cancelled){
                    setOrders(orders.map(value=>{
                        if(value.oid==product.oid){
                            value.orderstatus="cancelled";
                        }
                        return value;
                    }));
                }
            }).catch(function(err){
                console.log(err);
            });
        }
    }
    return (
        <div className={Style.productsContainer}>
            {
                orders.map((product) => {
                    return <OrderCard key={product.oid} onClickCancel={onClickCancel(product)} product={product} />
                })
            }
        </div>
    )
}