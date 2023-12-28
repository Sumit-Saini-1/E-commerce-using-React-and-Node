import Image from "../img/index.jsx";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../button/index.jsx";
import Select from "../select/index.jsx";
import { useState } from "react";
import { DispatchOrderApi } from "../../../apis/order.js";

export default function ReceivedOrderCard(props) {
    const { order,afterDispatch} = props;
    const listofstore=["Chandigarh","Delhi","Haryana","Himachal","Punjab","Rajasthan","Uttar Pardesh"];
    const [nearByStore,setNearByStore]=useState("none");
    function onChangeStore(ev){
        setNearByStore(ev.target.value);
    }
    function onClickDispatch(){
        DispatchOrderApi(nearByStore,order.oid).then(function(dispatched){
            if(dispatched){
                // console.log(dispatched);
                afterDispatch();
            }
        }).catch(function(err){
            console.log(err);
        })
    }
    return (
        <div className={Style.productNode}>
            
            <Image src={order.image} />
            <div>{order.name}</div>
            <div>Quantity: {order.quantity}</div>
            <div>Bill status: {order.billstatus}</div>
            <div>Address to deliver : {order.addressLine1} <br/>{order.district},{order.state}<br/>{order.pincode}</div>
            <div>Select Store for dispatch to: </div>
            <div><Select value={nearByStore} onChange={onChangeStore} options={listofstore} /></div>
            <div className={Style.productAction} >
                <Button onClick={onClickDispatch} classname="blue">Dispatch</Button>
            </div>
        </div>
    );
}

ReceivedOrderCard.propTypes={
    order:PropTypes.object,
    afterDispatch:PropTypes.func
}