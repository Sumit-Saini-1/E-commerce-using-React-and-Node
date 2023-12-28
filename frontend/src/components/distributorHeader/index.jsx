import { Link } from "react-router-dom";
import Style from "./style.module.css";
import Logout from "../../containers/logout/Logout";
export default function DistributorHeader() {
    return (
        <nav className={Style.nav}>
            <div>
                <Link className={Style.link} to="/distributor/toShip">To Ship </Link>
                <Link className={Style.link} to="/distributor/toReceive">To Receive</Link>
                <Link className={Style.link} to="/distributor/createDeliveryPerson">Create Delivery Person</Link>
            </div>
            <div>
                <Link className={[Style.link, Style.logout].join(' ')} onClick={Logout()} >Logout </Link>
            </div>
        </nav>
    )
}