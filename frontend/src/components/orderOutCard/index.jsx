import Image from "../img/index.jsx";
import PropTypes from "prop-types";
import Style from "./style.module.css";


export default function OrderOutCard(props) {
    const { order} = props;
    
    return (
        <div className={Style.productNode}>
            
            <Image src={order.image} />
            <div>{order.name}</div>
            <div>Quantity: {order.quantity}</div>
            <div>Bill status: {order.billstatus}</div>
            <div>Order status: {order.orderstatus}</div>
        </div>
    );
}

OrderOutCard.propTypes={
    order:PropTypes.object,
}