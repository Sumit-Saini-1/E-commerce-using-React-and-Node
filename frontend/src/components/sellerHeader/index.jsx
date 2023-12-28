import { Link } from "react-router-dom";
import Style from "./style.module.css";
import Logout from "../../containers/logout/Logout";
export default function SellerHeader() {
    return (
        <nav className={Style.nav}>
            <div>
                <Link className={Style.link} to="/seller/home">Order Received </Link>
                <Link className={Style.link} to="/seller/orderOut">Order Out </Link>
                <Link className={Style.link} to="/seller/addProduct">Add Product </Link>
                <Link className={Style.link} to="/seller/myProduct">My Product </Link>
                <Link className={Style.link} to="/seller/report">Analysis</Link>
            </div>
            <div>
                
                <Link className={[Style.link, Style.logout].join(' ')} onClick={Logout()}>Logout </Link>
            </div>
        </nav>
    )
}