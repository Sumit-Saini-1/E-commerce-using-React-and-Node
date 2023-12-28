import Style from "./style.module.css";
import PropTypes from 'prop-types';

export default function ReportTable(props) {
    const { data } = props;
    let total=0;
    let cancelled=0;
    let delivered=0;
    let earning=0;
    return (
        <table className={Style.table}>
            <thead>
                <tr>
                    <th className={Style.th}>Product ID</th>
                    <th className={Style.th}>Name</th>
                    <th className={Style.th}>No of Order received</th>
                    <th className={Style.th}>No of Order Cancelled</th>
                    <th className={Style.th}>No of Order Delivered</th>
                    <th className={Style.th}>Earning</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(function(value,index){
                        total=total+value.received;
                        cancelled=cancelled+value.canceled;
                        delivered=delivered+value.delivered;
                        earning=earning+value.sum;
                        return (
                            <tr key={index}>
                                <td className={Style.td}>{value.pid}</td>
                                <td className={Style.td}>{value.name}</td>
                                <td className={Style.td}>{value.received}</td>
                                <td className={Style.td}>{value.canceled}</td>
                                <td className={Style.td}>{value.delivered}</td>
                                <td className={Style.td}>{value.sum}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td className={Style.tf} colSpan={2}>Total</td>
                    <td className={Style.tf}>{total}</td>
                    <td className={Style.tf}>{cancelled}</td>
                    <td className={Style.tf}>{delivered}</td>
                    <td className={Style.tf}>{earning}</td>
                </tr>
            </tfoot>
        </table>
    );
}

ReportTable.defaultProps = {
    data: []
}

ReportTable.propTypes = {
    data: PropTypes.array
}