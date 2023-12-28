import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";

export default function ToReceiveOrderCard(props){
    const {order,onClickReceive}=props;
    
    return (
        <div className={Style.productNode}>
            <div>Orderid: {order.oid}</div>
            <div>Quantity: {order.quantity}</div>
            <div>Bill status: {order.billStatus}</div>
            <div>Address to deliver: {order.addressLine1}<br/>{order.district},{order.state}<br/>{order.pincode}</div>
            <div className={Style.productAction} >
                <Button onClick={onClickReceive} classname="blue">Receive</Button>
            </div>
        </div>
    );
}

ToReceiveOrderCard.defaultProps={
    image:logo,
    productName:"productName",
    price:0
}

ToReceiveOrderCard.propTypes={
    order:PropTypes.object,
    onClickReceive:PropTypes.func
}