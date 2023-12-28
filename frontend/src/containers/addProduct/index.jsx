import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { AddNewProduct } from "../../../apis/product";

export default function AddProduct() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productImage, setProductImage] = useState(null);
    const allowedtypes=["image/jpeg","image/jpg","image/png"];
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
    function onChangeProductImage(ev){
        const file=ev.target.files[0];
        // console.log(file.type);
        // console.log(file.size);
        if(!allowedtypes.includes(file.type)){
            alert("invalid file type. Please upload a jpeg or png.");
            return;
        }
        if(file.size>250000){
            alert("image size should be less than 250kb");
            return;
        }
        setProductImage(file);
        // setProductImage(URL.createObjectURL(ev.target.files[0]));
    }
    function onClickAdd() {
        if(!productName.trim()){
            alert("Please Enter Product Name");
            return;
        }
        if(!productDescription.trim()){
            alert("Please Enter Product Description");
            return;
        }
        if(productPrice==0||productPrice==""){
            alert("Please Enter Product Price");
            return;
        }
        if(productQuantity==0||productQuantity==""){
            alert("Please Enter Product Quantity");
            return;
        }
        if(!productBrand.trim()){
            alert("Please Enter Product Brand");
            return;
        }
        if(!productCategory.trim()){
            alert("Please Enter Product Category");
            return;
        }
        if(!productImage){
            alert("Please select a product image");
            return;
        }
        if(productImage.size>250000){
            alert("image size should be less than 250kb");
            return;
        }
        if(!allowedtypes.includes(productImage.type)){
            alert("invalid file type. Please upload a jpeg or png.");
            return;
        }
        AddNewProduct(productImage,productName,productDescription,productPrice,productQuantity,productBrand,productCategory).then(function(added){
            // console.log(added);
            if(added){
                setProductBrand("");
                setProductCategory("");
                setProductDescription("");
                setProductName("");
                setProductPrice("");
                setProductQuantity("");
                setProductImage(null);
            }
        }).catch(function(err){
            console.log(err);
        })
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <Input type="text" value={productName} onChange={onChangeProductName} placeholder="Product name" />
                <Input type="text" value={productDescription} onChange={onChangeProductDescrption} placeholder="Product Description" />
                <Input type="number" value={productPrice} onChange={onChangeProductPrice} placeholder="Product Price" />
                <Input type="number" value={productQuantity} onChange={onChangeProductQuantity} placeholder="Product Quantity" />
                <Input type="text" value={productBrand} onChange={onChangeProductBrand} placeholder="Product Brand" />
                <Input type="text" value={productCategory} onChange={onChangeProductCategory} placeholder="Product Category" />
                <Input type="file" onChange={onChangeProductImage} placeholder="Product Image" />
                
                <Button onClick={onClickAdd}>Add</Button>

            </div>
        </div>
    )
}