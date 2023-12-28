import Image from "../img/index.jsx";
import PropTypes from "prop-types";
import Style from "./style.module.css";
import Button from "../button/index.jsx";

export default function ApproveSellerCard(props) {
    const { seller, onClickApprove, onClickReject } = props;

    return (
        <div className={Style.productNode}>
            
            <div className={Style.details}>
                <div>Name: {seller.name}</div>
                <div>Mobile: {seller.mobile}</div>
                <div>Email: {seller.username}</div>
                <div>Business Name: {seller.buisness_name}</div>
                <div>Business Type: {seller.buisnesstype}</div>
                <div>Aadhar Number: {seller.aadharno}</div>
                <div className={Style.productAction} >
                    <Button onClick={onClickApprove} classname="blue">Approve</Button>
                    <Button onClick={onClickReject} classname="red">Reject</Button>
                </div>
            </div>
            <div>
                <Image src={"http://localhost:2000/"+seller.aadharimage} />
            </div>
        </div>
    );
}


ApproveSellerCard.propTypes = {
    seller: PropTypes.object,
    onClickApprove: PropTypes.func,
    onClickReject: PropTypes.func
}