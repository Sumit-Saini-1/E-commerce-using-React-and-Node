import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../button/index";


export default function OutForDeliveryCard(props) {
    const { order,onClickDeliver} = props;
    
    return (
        <div className={Style.productNode}>
            <div>{order.oid}</div>
            <div>{order.addressLine1}</div>
            <div>{order.district}</div>
            <div>{order.state}</div>
            <div>{order.pincode}</div>
            <div className={Style.productAction} >
                <Button onClick={onClickDeliver} classname="blue">Deliver</Button>
            </div>
        </div>
    );
}

OutForDeliveryCard.propTypes={
    order:PropTypes.object,
    onClickDeliver:PropTypes.func
}