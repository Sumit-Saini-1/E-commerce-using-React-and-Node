import AdminProductCard from "../../components/productCardAdmin/index.jsx"
import Style from "./style.module.css";
import { LoadProduct } from "../../../apis/product.js";
import { useState, useEffect, useRef } from "react";
import Button from "../../components/button/index.jsx";
import { DeleteProductAPi } from "../../../apis/product.js";


export default function AdminHome() {
    const [products, setProducts] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const itemPerPage = 8;
    const curPage = useRef(0);
    useEffect(() => {
        LoadProduct(curPage.current, itemPerPage).then(function (products) {
            setProducts(products.products)
            
            setIsLastPage(products.isLast);
        }).catch(function (err) {
            console.log(err);
        });
    }, []);

    function onLoadMoreClick() {
        curPage.current++;
        console.log(curPage);
        LoadProduct(curPage.current, itemPerPage).then(function (products) {
            setProducts(products.products);
            setIsLastPage(products.isLast);
            
        }).catch(function (err) {
            console.log(err);
        });
    }

    function onClickDelete(product) {
        return function () {
            console.log(product.name);
            DeleteProductAPi(product).then(function (bool) {
                if (bool) {
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

    return (

        <>
            <div className={Style.productsContainer}>
                {
                    products.map((product) => {
                        return <AdminProductCard key={product.pid} product={product} onClickDelete={onClickDelete(product)} />
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