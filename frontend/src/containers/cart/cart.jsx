import { useState, useEffect, useContext } from "react";
import CustomPopup from "../../components/productDetailPopup/index.jsx";
import Style from "./cart.module.css";
import CartItemCard from "../../components/cartItemCard/index.jsx";
import { GetCartItemsApi, DeleteItemFromCartApi,PlaceOrderApi } from "../../../apis/cart.js";
import { GetAddressApi } from "../../../apis/auth.js";
import Table from "../../components/table/index.jsx";
import CartContext from "../../context/cartItems/cartItemContext.jsx";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    // const [products, setProducts] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [popupProduct, setPopUpProdct] = useState({});
    const [addressLine1, setAddressLine1] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [pincode, setPincode] = useState();
    const cartItems = useContext(CartContext);
    const navigate=useNavigate();

    useEffect(() => {
        GetCartItemsApi().then(function (items) {
            cartItems.setProducts(items);
        }).catch(function (err) {
            console.log(JSON.stringify(err));
        });
        GetAddressApi().then(address => {
            if (address) {
                setAddressLine1(address.addressLine1);
                setCountry(address.country);
                setState(address.state);
                setDistrict(address.district)
                setPincode(address.pincode)
            }
        }).catch(function () {
            console.log("Something wrong");
        })
    }, []);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    function onClickDelete(product) {
        return function () {
            DeleteItemFromCartApi(product).then(function (item) {
                cartItems.setProducts(cartItems.products.filter(product => { return product.cid !== item.cid }));
            }).catch(function () {
                console.log("something went wrong");
            })
        }
    }

    function onClickViewDetail(product) {
        return function () {
            setPopUpProdct(product);
            setVisibility(!visibility)

        }
    }

    function onChangeAddressLine1(ev) {
        setAddressLine1(ev.target.value);
    }

    function onChangeCountry(ev) {
        setCountry(ev.target.value);
    }
    function onChangeState(ev) {
        setState(ev.target.value);
    }
    function onChangeDistrict(ev) {
        setDistrict(ev.target.value);
    }
    function onChangePincode(ev) {
        setPincode(ev.target.value);
    }

    function onClickBuy(){
        if(addressLine1.trim()==""||country.trim()==""||state.trim()==""||district.trim()==""||pincode.trim()==""){
            alert("Enter complete address");
            return;
        }
        else{
            PlaceOrderApi(cartItems.total,addressLine1,country,state,district,pincode).then(function(response){
                if(response.status==200){
                    navigate("/");
                }
                else{
                    console.log("something went wrong");
                }
            });
        }
    }
    return (
        <div className={Style.outerContainer}>
            <div className={Style.productsContainer}>
                <CustomPopup onClose={popupCloseHandler} product={popupProduct} show={visibility} title="Product Detail" >
                </CustomPopup>
                {
                    cartItems.products.map((product) => {
                        return <CartItemCard key={product.pid} onClickDelete={onClickDelete(product)} onClickViewDetail={onClickViewDetail(product)} product={product} />
                    })
                }
            </div>
            <div>
                <Table data={cartItems.products} />
                <div className={Style.addressContainer}>
                    <h2>Deivery Address</h2>
                    <Input onChange={onChangeAddressLine1} value={addressLine1} placeholder="Address Line 1" />
                    <Input onChange={onChangeCountry} value={country} placeholder="Country" />
                    <Input onChange={onChangeState} value={state} placeholder="State" />
                    <Input onChange={onChangeDistrict} value={district} placeholder="District" />
                    <Input onChange={onChangePincode} value={pincode} type="number" placeholder="Pincode" />
                    <Button onClick={onClickBuy}>Save address and Buy</Button>
                </div>
            </div>
        </div>
    )
}