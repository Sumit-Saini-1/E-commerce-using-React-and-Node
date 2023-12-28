import ItemCard from "../../components/itemcard/index.jsx";
import Style from "./style.module.css";
import { LoadProduct, AddToCartList } from "../../../apis/product.js";
import { useState, useEffect } from "react";
import Button from "../../components/button/index.jsx";
import CustomPopup from "../../components/productDetailPopup/index.jsx";
import SearchProducts from "../../components/searchProduct/index.jsx";
import { SearchProductApi } from "../../../apis/product.js";
import { Pagination } from 'antd';
import { TotalProductCount } from "../../../apis/product.js";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isSearchItems, setIsSearchItems] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [popupProduct, setPopUpProdct] = useState({});
    const [searchText, setSearchText] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(8);

    useEffect(() => {
        TotalProductCount(searchText).then(count => {
            setTotalItems(count);
        }).catch(err => {
            console.log(err);
        })
    })
    useEffect(() => {
        loadProductFromServer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, itemPerPage, totalItems]);

    function loadProductFromServer() {
        if (isSearchItems) {
            searchProduct(currentPage);
        }
        else {
            LoadProduct(currentPage - 1, itemPerPage).then(function (result) {
                setProducts(result.products);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    function onClickAddToCart(product) {
        return function () {
            // console.log(product);
            AddToCartList(product).then(function (status) {
                if (status == 202) {
                    alert("already in cart");
                }
                else if (status == 200) {
                    alert("added to cart");
                }
                else {
                    alert("item cant be added to cart");
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    function onClickViewDetail(product) {
        return function () {
            setPopUpProdct(product);
            setVisibility(!visibility)

        }
    }

    function onChangeSearchText(ev) {
        setSearchText(ev.target.value);
        if (ev.target.value == "") {
            setIsSearchItems(false);
            setCurrentPage(1);
            // loadProductFromServer();
        }
    }

    function searchProduct(page) {
        SearchProductApi(searchText.trim(), page - 1, itemPerPage).then(data => {
            setProducts(data);
        }).catch(err => {
            console.log(JSON.stringify(err));
        })
    }
    function onSearchClick() {
        if (searchText.trim()) {
            setIsSearchItems(true);
            setCurrentPage(1);
            searchProduct(1);
        }
    }

    return (
        <>
            <div className={Style.searchDiv}>
                <SearchProducts onChange={onChangeSearchText} searchText={searchText} />
                <Button onClick={onSearchClick} >Search</Button>
            </div>
            <div className={Style.productsContainer}>
                <CustomPopup onClose={popupCloseHandler} product={popupProduct} show={visibility} title="Product Detail" >
                    <h1>Hello This is Popup Content Area</h1>
                    <h2>This is my lorem ipsum text here!</h2>
                </CustomPopup>
                {
                    products.map((product) => {
                        return <ItemCard key={product.pid} onClickViewDetail={onClickViewDetail(product)} onClickAddToCart={onClickAddToCart(product)} productName={product.name} image={product.image} price={product.price} />
                    })
                }
            </div>
            <div className={Style.paging}>
                <Pagination defaultCurrent={1} current={currentPage} defaultPageSize={8} pageSize={itemPerPage} pageSizeOptions={[8, 10, 20, 50, 100]} total={totalItems} onChange={function (page, pageSize) {
                    console.log(page, pageSize);
                    setCurrentPage(page);
                    setItemPerPage(pageSize);
                }} />
            </div>
        </>
    )
}