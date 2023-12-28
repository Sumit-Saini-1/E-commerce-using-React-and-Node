import { Link } from "react-router-dom";
import Style from "./style.module.css";
import Logout from "../../containers/logout/Logout";
export default function DeliveryHeader() {
    return (
        <nav className={Style.nav}>
            <div>
                <Link className={Style.link} to="/delivery/home">Home</Link>
            </div>
            <div>
                <Link className={[Style.link, Style.logout].join(' ')} onClick={Logout()} >Logout </Link>
            </div>
        </nav>
    )
}