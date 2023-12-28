import Image from "../img/index.jsx";
import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";


export default function OrderCard(props){
    const {product,onClickCancel}=props;
    let orderstatus="";
    if(product.orderstatus=="dispatched"){
        orderstatus="Dispatched to " + product.nextdest;
        if(product.nextdest==product.curloc){
            orderstatus= "Reached " + product.nextdest;
        }
    }
    if(product.orderstatus=="shipped"){
        if(product.nextdest=="Out for Delivery"){
            orderstatus= product.nextdest;
        }
        else{
            orderstatus= "Shipped to " + product.nextdest;
            if(product.nextdest==product.curloc){
                orderstatus= "Reached " + product.nextdest;
            }
        }
    }
    else{
        orderstatus= product.orderstatus;
    }
    
    return (
        <div className={Style.productNode}>
            <Image src={product.image} />
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Quantity: {product.quantity}</div>
            <div>Status:{orderstatus}</div>
            {
                product.orderstatus != "delivered" && product.orderstatus != "cancelled"?
                <div>Expected delivery: {new Date(product.expecteddelivery).toDateString()}</div>:
                product.orderstatus == "delivered"?
                <div>Delivered on:{new Date(product.deliverydate).toDateString()}</div>:<></>
            }
            {
                product.orderstatus != "delivered" && product.orderstatus != "cancelled"?
                <Button classname="red" onClick={onClickCancel}>Cancel</Button>:<></>
            }
        </div>
    );
}

OrderCard.defaultProps={
    image:logo,
    productName:"productName",
    price:0
}

OrderCard.propTypes={
    product:PropTypes.object,
    onClickCancel:PropTypes.func
}