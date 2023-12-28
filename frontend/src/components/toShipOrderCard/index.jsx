import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import { useState } from "react";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";
import Select from "../select/index.jsx";
import { ShippedFromStore } from "../../../apis/distributor.js";

export default function ToShipOrderCard(props) {
    const { order, afterShip } = props;
    const [shipto, setShipTo] = useState("");

    function onClickShip() {
        console.log(order, shipto);
        ShippedFromStore(order,shipto).then(shiped=>{
            if(shiped){
                afterShip();
            }
            else{
                console.log("something wrong");
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    function onChangeShipTo(ev) {
        setShipTo(ev.target.value);
    }

    return (
        <div className={Style.productNode}>
            <div>Orderid: {order.oid}</div>
            <div>Quantity: {order.quantity}</div>
            <div>Bill status: {order.billStatus}</div>
            <div>Address to deliver: {order.addressLine1}<br />{order.district},{order.state}<br />{order.pincode}</div>
            <div>Select store for ship to</div>
            <Select value={shipto} onChange={onChangeShipTo} options={[order.district, order.state, "Out for Delivery"]} />
            <div className={Style.productAction} >
                <Button onClick={onClickShip} classname="blue">Ship</Button>
            </div>
        </div>
    );
}

ToShipOrderCard.defaultProps = {
    image: logo,
    productName: "productName",
    price: 0
}

ToShipOrderCard.propTypes = {
    order: PropTypes.object,
    onClickShip: PropTypes.func,
    afterShip: PropTypes.func
}