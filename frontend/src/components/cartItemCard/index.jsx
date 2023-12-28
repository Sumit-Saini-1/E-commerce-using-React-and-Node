import Image from "../img/index.jsx";
import logo from "../../assets/react.svg";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../../components/button/index.jsx";
import { IncreaseQuantityApi,DecreseQuantityApi } from "../../../apis/cart.js";
import { useContext, useState } from "react";
import CartContext from "../../context/cartItems/cartItemContext.jsx";

export default function CartItemCard(props){
    const {product,onClickDelete,onClickViewDetail}=props;
    const [quantity,setQuantity]=useState(product.quantity);
    const cartItems=useContext(CartContext);
    function onClickIncreaseQuantity(){
        IncreaseQuantityApi(product).then(function(quantity){
            if(quantity==false){
                return;
            }
            setQuantity(quantity);
            product.quantity=quantity;
            const items=cartItems.products.map(value=>{
                if(value.cid==product.cid){
                    value.quantity=quantity;
                }
                return value;
            });
            cartItems.setProducts(items);
        }).catch(function(err){
            console.log("something went wrong",err);
        })
    }

    function onClickDecreaseQuantity(){
        DecreseQuantityApi(product).then(function(quantity){
            if(quantity==false){
                return;
            }
            setQuantity(quantity);
            product.quantity=quantity;
            const items=cartItems.products.map(value=>{
                if(value.cid==product.cid){
                    value.quantity=quantity;
                }
                return value;
            });
            cartItems.setProducts(items);
        }).catch(function(err){
            console.log("something went wrong",err);
        })
    }
    
    return (
        <div className={Style.productNode}>
            <Image src={product.image} />
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Quantity: {quantity}</div>
            <div className={Style.productAction} >
                <div onClick={onClickDecreaseQuantity} className={Style.incdecqt}>-</div>
                <div onClick={onClickIncreaseQuantity} className={Style.incdecqt}>+</div>
            </div>
            <div className={Style.productAction} >
                <Button onClick={onClickDelete} classname="blue">Delete</Button>
                <Button onClick={onClickViewDetail} classname="red">View Detail</Button>
            </div>
        </div>
    );
}

CartItemCard.defaultProps={
    image:logo,
    productName:"productName",
    price:0
}

CartItemCard.propTypes={
    product:PropTypes.object,
    onClickDelete:PropTypes.func,
    onClickViewDetail:PropTypes.func
}