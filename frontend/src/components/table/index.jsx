import Style from "./style.module.css";
import PropTypes from 'prop-types';
import CartContext from "../../context/cartItems/cartItemContext.jsx";
import { useContext } from "react";

export default function Table(props) {
    const { data } = props;
    const cartItems = useContext(CartContext);
    let totalBill=0;
    return (
        <table className={Style.table}>
            <thead>
                <tr>
                    <th className={Style.th}>Product</th>
                    <th className={Style.th}>Quantity</th>
                    <th className={Style.th}>Price($)</th>
                    <th className={Style.th}>Bill Amount($)</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(function(value,index){
                        const subTotal=value.quantity*value.price;
                        totalBill=totalBill+subTotal;
                        return (
                            <tr key={index}>
                                <td className={Style.td}>{value.name}</td>
                                <td className={Style.td}>{value.quantity}</td>
                                <td className={Style.td}>{value.price}</td>
                                <td className={Style.td}>{subTotal}</td>
                            </tr>
                        )
                    })
                }
                {
                    cartItems.setTotal(totalBill)
                }
            </tbody>
            <tfoot>
                <tr>
                    <td className={Style.tf} colSpan={3}>Total Bill</td>
                    <td className={Style.tf}>{totalBill}</td>
                </tr>
            </tfoot>
        </table>
    );
}

Table.defaultProps = {
    data: []
}

Table.propTypes = {
    data: PropTypes.array
}