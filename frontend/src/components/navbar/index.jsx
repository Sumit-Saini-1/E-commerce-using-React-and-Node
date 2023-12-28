import { Link } from "react-router-dom";
import Style from "./style.module.css";
import Logout from "../../containers/logout/Logout";
export default function Navbar() {
    return (
        <nav className={Style.nav}>
            <div>
                <Link className={Style.link} to="/">Home </Link>
                <Link className={Style.link} to="/gotoCart">Go to Cart</Link>
                <Link className={Style.link} to="/myOrder">My orders</Link>
            </div>
            <div>
                <Link className={Style.link} to="/changePassword">Change Password</Link>
                <Link className={[Style.link, Style.logout].join(' ')} onClick={Logout()}>Logout </Link>
            </div>
        </nav>
    )
}