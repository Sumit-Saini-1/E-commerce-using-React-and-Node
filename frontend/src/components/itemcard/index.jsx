import Image from "../img/index.jsx";
import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";

export default function ItemCard(props){
    const {image,productName,price,onClickAddToCart,onClickViewDetail}=props;
    
    return (
        <div className={Style.productNode}>
            <Image src={image} />
            <div>{productName}</div>
            <div>Price: ${price}</div>
            <div className={Style.productAction} >
                <Button onClick={onClickAddToCart} classname="blue">Add to Cart</Button>
                <Button onClick={onClickViewDetail} classname="red">View Detail</Button>
            </div>
        </div>
    );
}

ItemCard.defaultProps={
    image:logo,
    productName:"productName",
    price:0
}

ItemCard.propTypes={
    image:PropTypes.string,
    productName:PropTypes.string,
    price:PropTypes.number,
    onClickAddToCart:PropTypes.func,
    onClickViewDetail:PropTypes.func
}