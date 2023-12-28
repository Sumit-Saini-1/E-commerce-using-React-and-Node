import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { UpdateProductApi } from "../../../apis/product";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const location = useLocation();
    const product=location.state;

    useEffect(() => {
        setProductName(product.name);
        setProductDescription(product.description);
        setProductPrice(product.price);
        setProductQuantity(product.stock);
        setProductBrand(product.brand);
        setProductCategory(product.category);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onChangeProductName(ev) {
        setProductName(ev.target.value);
    }
    function onChangeProductDescrption(ev) {
        setProductDescription(ev.target.value);
    }
    function onChangeProductQuantity(ev) {
        setProductQuantity(ev.target.value);
    }
    function onChangeProductPrice(ev) {
        setProductPrice(ev.target.value);
    }
    function onChangeProductBrand(ev) {
        setProductBrand(ev.target.value);
    }
    function onChangeProductCategory(ev) {
        setProductCategory(ev.target.value);
    }

    function onClickUpdate() {
        if (!productName.trim()) {
            alert("Please Enter Product Name");
            return;
        }
        if (!productDescription.trim()) {
            alert("Please Enter Product Description");
            return;
        }
        if (productPrice == 0 || productPrice == "") {
            alert("Please Enter Product Price");
            return;
        }
        if (productQuantity == 0 || productQuantity == "") {
            alert("Please Enter Product Quantity");
            return;
        }
        if (!productBrand.trim()) {
            alert("Please Enter Product Brand");
            return;
        }
        if (!productCategory.trim()) {
            alert("Please Enter Product Category");
            return;
        }

        UpdateProductApi(product.pid,productName,productDescription,productPrice,productQuantity,productBrand,productCategory).then(function(updated){
            if(updated){
                // console.log(updated);
                navigate("/seller/myProduct");
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <label>Product Name</label>
                <Input type="text" value={productName} onChange={onChangeProductName} placeholder="Product name" />
                <label >Product Discription</label>
                <Input type="text" value={productDescription} onChange={onChangeProductDescrption} placeholder="Product Description" />
                <label>Product Price</label>
                <Input type="number" value={productPrice} onChange={onChangeProductPrice} placeholder="Product Price" />
                <label>Product Stock</label>
                <Input type="number" value={productQuantity} onChange={onChangeProductQuantity} placeholder="Product Quantity" />
                <label>Product Brand</label>
                <Input type="text" value={productBrand} onChange={onChangeProductBrand} placeholder="Product Brand" />
                <label>Product Category</label>
                <Input type="text" value={productCategory} onChange={onChangeProductCategory} placeholder="Product Category" />

                <Button onClick={onClickUpdate}>Update</Button>

            </div>
        </div>
    )
}
