import { Link } from "react-router-dom";
import Style from "./style.module.css";
import Logout from "../../containers/logout/Logout";
export default function AdminHeader() {
    return (
        <nav className={Style.nav}>
            <div>
                <Link className={Style.link} to="/admin/adminHome">Home </Link>
                <Link className={Style.link} to="/admin/aproveProduct">Approve Product</Link>
                <Link className={Style.link} to="/admin/aproveSeller">Approve seller</Link>
                <Link className={Style.link} to="/admin/createDistributor">Create Distributor</Link>
            </div>
            <div>
                <Link className={[Style.link, Style.logout].join(' ')} onClick={Logout()} >Logout </Link>
            </div>
        </nav>
    )
}