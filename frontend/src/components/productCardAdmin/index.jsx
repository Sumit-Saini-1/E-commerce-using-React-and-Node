import Image from "../img/index.jsx";
import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";

export default function AdminProductCard(props){
    const {product,onClickDelete}=props;
    
    return (
        <div className={Style.productNode}>
            <Image src={product.image} />
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div className={Style.productAction} >
                <Button onClick={onClickDelete} classname="red">Delete</Button>
            </div>
        </div>
    );
}

AdminProductCard.defaultProps={
    image:logo,
    productName:"productName",
}

AdminProductCard.propTypes={
    product:PropTypes.object,
    onClickDelete:PropTypes.func,
}