import ApproveProductCard from "../../components/approveProductCard/index.jsx";
import Style from "./style.module.css";
import { ProductsTOApproveApi, ApproveProductApi, RejectProductApi } from "../../../apis/product.js";
import { useState, useEffect, useRef } from "react";
import Button from "../../components/button/index.jsx";



export default function ApproveProduct() {
    const [products, setProducts] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const curPage = useRef(0);
    useEffect(() => {
        ProductsTOApproveApi(curPage.current).then(function (products) {
            setProducts(products.products);
            setIsLastPage(products.isLast);
        }).catch(function (err) {
            console.log(err);
        });
    }, []);

    function onLoadMoreClick() {
        curPage.current++;
        console.log(curPage);
        ProductsTOApproveApi(curPage.current).then(function (products) {
            setProducts(products.products);
            setIsLastPage(products.isLast);
        }).catch(function (err) {
            console.log(err);
        });
    }

    function onClickApprove(product) {
        return function () {
            ApproveProductApi(product).then(function (result) {
                if (result) {
                    setProducts(products.filter(item => {
                        return item.pid != product.pid;
                    }))
                }
            })
        }
    }

    function onClickReject(product) {
        return function () {
            RejectProductApi(product).then(function (result) {
                if (result) {
                    setProducts(products.filter(item => {
                        return item.pid != product.pid;
                    }));
                }
            });
        }
    }


    return (

        <>
            <div className={Style.productsContainer}>
                {
                    products.map((product) => {
                        return <ApproveProductCard key={product.pid} product={product} onClickApprove={onClickApprove(product)} onClickReject={onClickReject(product)} />
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