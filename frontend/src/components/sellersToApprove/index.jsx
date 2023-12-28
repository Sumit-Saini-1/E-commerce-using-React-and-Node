import Image from "../img/index.jsx";
import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../button/index.jsx";

export default function ApproveProductCard(props){
    const {product,onClickApprove,onClickReject}=props;
    
    return (
        <div className={Style.productNode}>
            <Image src={product.image} />
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div className={Style.productAction} >
                <Button onClick={onClickApprove} classname="blue">Approve</Button>
                <Button onClick={onClickReject} classname="red">Reject</Button>
            </div>
        </div>
    );
}

ApproveProductCard.defaultProps={
    image:logo,
    productName:"productName",
    price:0
}

ApproveProductCard.propTypes={
    product:PropTypes.object,
    onClickApprove:PropTypes.func,
    onClickReject:PropTypes.func
}