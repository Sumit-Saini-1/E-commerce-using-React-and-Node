import CartContext from "./cartItemContext";
import { useState } from "react";
import PropTypes from "prop-types"

const CartState=(props)=>{
    const [products, setProducts] = useState([]);
    const [total,setTotal]=useState(0);
    return (
        <CartContext.Provider value={{products,setProducts,total,setTotal}}>
            {
                props.children
            }
        </CartContext.Provider>
    )
}

CartState.propTypes={
    children:PropTypes.any
}
export default CartState;