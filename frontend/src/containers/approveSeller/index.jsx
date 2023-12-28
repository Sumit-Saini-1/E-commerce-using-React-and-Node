import ApproveSellerCard from "../../components/approveSellerCard/index.jsx";
import Style from "./style.module.css";
import { SellersToApproveApi,ApproveSellerApi,RejectSellerApi } from "../../../apis/sellers.js";
import { useState, useEffect, useRef } from "react";
import Button from "../../components/button/index.jsx";



export default function ApproveSeller() {
    const [sellers, setSellers] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const curPage = useRef(0);
    useEffect(() => {
        SellersToApproveApi(curPage.current).then(function (sellers) {
            console.log(sellers.sellers);
            setSellers(sellers.sellers);
            setIsLastPage(sellers.isLast);
        }).catch(function (err) {
            console.log(err);
        });
    }, []);

    function onLoadMoreClick() {
        curPage.current++;
        console.log(curPage);
        SellersToApproveApi(curPage.current).then(function (sellers) {
            setSellers(sellers.sellers);
            setIsLastPage(sellers.isLast);
        }).catch(function (err) {
            console.log(err);
        });
    }

    function onClickApprove(seller) {
        return function () {
            ApproveSellerApi(seller.sid).then(function (result) {
                if (result) {
                    setSellers(sellers.filter(item => {
                        return item.sid != seller.sid;
                    }));
                }
            });
        }
    }

    function onClickReject(seller) {
        return function () {
            RejectSellerApi(seller.sid).then(function (result) {
                if (result) {
                    setSellers(sellers.filter(item => {
                        return item.sid != seller.sid;
                    }));
                }
            });
        }
    }


    return (

        <>
            <div className={Style.productsContainer}>
                {
                    sellers.map((seller) => {
                        return <ApproveSellerCard key={seller.sid} seller={seller} onClickApprove={onClickApprove(seller)} onClickReject={onClickReject(seller)} />
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