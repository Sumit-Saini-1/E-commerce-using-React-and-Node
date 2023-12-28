import { useEffect, useState } from "react";
import popupStyles from "./style.module.css";
import PropTypes from "prop-types";
const CustomPopup = (props) => {
    const [show, setShow] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const closeHandler = (e) => {
        setShow(false);
        props.onClose(false);
    };

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);
    const {product}=props
    return (
        <div
            style={{
                visibility: show ? "visible" : "hidden",
                opacity: show ? "1" : "0"
            }}
            className={popupStyles.overlay}
        >
            <div className={popupStyles.popup}>
                <h2>{props.title}</h2>
                <span className={popupStyles.close} onClick={closeHandler}>
                    &times;
                </span>
                <div className={popupStyles.content}>

                    <img src={product.image} alt="" />
                    <div className="popupdesc">{product.description}</div>
                    <div className="popupdesc">Stock: {product.stock}</div>
                    <div className="popupdesc">Price: ${product.price}</div>
                </div>
            </div>
        </div>
    );
};

CustomPopup.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object
};
export default CustomPopup;