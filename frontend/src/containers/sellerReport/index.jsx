import { useState, useEffect } from "react";
import Charts from "../../components/pieChart";
import Style from "./style.module.css";
import ReportTable from "../../components/ReportTable";
import Select from "../../components/select";
import { MonthlyReportApi, YearlyReportApi } from "../../../apis/sellers";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default function SellerReport() {
    const monthList = ["Zentai", "Ichigatsu", "Nigatsu", "Sangatsu", "Shigatsu", "Gogatsu", "Rokugatsu", "Sichigatsu", "Hachigatsu", "Kugatsu", "Juugatsu", "Juuichigatsu", "Juunigatsu"];
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(23), (val, index) => year - index);
    const [reportData, setReportData] = useState([]);
    const [reportMonth, setReportMonth] = useState(monthList[0]);
    const [reportYear, setReportYear] = useState(year);
    const [pieChartData, setPieChartData] = useState([]);
    const [sellerIncome,setSellerIncome]=useState(0);
    useEffect(() => {
        yearlyReport( new Date().getFullYear());
    }, []);

    function monthlyReport(month, year) {
        MonthlyReportApi(month, year).then(function (data) {
            setReportData(data);
            formatPieChartData(data);
        }).catch(function (err) {
            console.log(JSON.stringify(err));
        });
    }
    function yearlyReport(year) {
        YearlyReportApi(year).then(function (data) {
            setReportData(data);
            formatPieChartData(data);
        }).catch(function (err) {
            console.log(err);
        })
    }

    
    function onChangeReportMonth(ev) {
        setReportMonth(ev.target.value);
        if (ev.target.value == "Zentai") {
            yearlyReport(reportYear);
        }
        else {
            monthlyReport(monthList.indexOf(ev.target.value), reportYear);
        }
    }
    function onChangeReportYear(ev) {
        setReportYear(ev.target.value);
        if (reportMonth == "Zentai") {
            yearlyReport(ev.target.value);
        }
        else {
            monthlyReport(monthList.indexOf(reportMonth), ev.target.value);
        }
    }
    function formatPieChartData(data) {
        console.log(data);
        let d = [["product", "order received"]];
        let income=0;
        data.map(value => {
            d.push([value.name, value.received]);
            if(value.orderstatus!='cancelled'){
                income=income+value.sum;
            }
        });
        setSellerIncome(income);
        setPieChartData(d)
    }

    return (
        <div className={Style.outerContainer}>
            <div className={Style.info}>
                <div>
                Select Month: <Select styles={{ width: "120px" }} value={reportMonth} onChange={onChangeReportMonth} options={monthList} />
                Select Year: <Select styles={{ width: "120px" }} value={reportYear} onChange={onChangeReportYear} options={years} />
                <RangePicker/>
                </div>
                <div style={{display:"flex",alignItems:"center",paddingRight:"20px"}}>Seller income: {sellerIncome}</div>
            </div>
            <ReportTable data={reportData} />
            <Charts options={{ title: "Piechart of orders according to product" }} data={pieChartData} />
        </div>
    )
}

