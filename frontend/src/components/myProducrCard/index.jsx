import Image from "../img/index.jsx";
import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";

export default function MyProductCard(props){
    const {product,onClickUpdate,onClickDelete}=props;
    
    return (
        <div className={Style.productNode}>
            <Image src={product.image} />
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Stock: {product.stock}</div>
            <div>Approved: {product.approved}</div>
            <div className={Style.productAction} >
                <Button onClick={onClickUpdate} classname="blue">Update</Button>
                <Button onClick={onClickDelete} classname="red">Delete</Button>
            </div>
        </div>
    );
}

MyProductCard.defaultProps={
    image:logo,
    productName:"productName",
    price:0
}

MyProductCard.propTypes={
    product:PropTypes.object,
    onClickUpdate:PropTypes.func,
    onClickDelete:PropTypes.func
}