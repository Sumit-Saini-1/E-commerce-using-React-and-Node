import Style from "./style.module.css";
import MyProductCard from "../../components/myProducrCard";
import Button from "../../components/button/index";
import { DeleteProductAPi } from "../../../apis/product";
import { useState, useEffect, useRef } from "react";
import { MyProductsApi } from "../../../apis/sellers";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const itemPerPage = 8;
    const curPage = useRef(0);
    function loadProducts(){
        MyProductsApi(curPage.current, itemPerPage).then(function (items) {
            setProducts(items.products);
            setIsLastPage(items.isLast);
        }).catch(function (err) {
            console.log(err);
        });
    }
    useEffect(() => {
        loadProducts();
    }, []);

    function onLoadMoreClick() {
        curPage.current++;
        loadProducts();
    }
    function onClickDelete(product) {
        
        return function () {
            DeleteProductAPi(product).then(function (bool) {
                if (bool) {
                    console.log(product);
                    setProducts(products.filter(value => { return value.pid != product.pid }));
                }
                else {
                    console.log("Something went wrong");
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    function onClickUpdate(product){
        return function(){
            // console.log(product);
            navigate("/seller/updateProduct",{state:product})
           
        }
    }
    return (
        <>
            <div className={Style.productsContainer}>
                {
                    products.map(product => {
                        return <MyProductCard onClickUpdate={onClickUpdate(product)} onClickDelete={onClickDelete(product)} key={product.pid} product={product} />
                    })
                }
            </div>
            <div>
                {
                    !isLastPage ? <Button onClick={onLoadMoreClick}>Load More</Button> : <></>
                }
            </div>
        </>
    )
}