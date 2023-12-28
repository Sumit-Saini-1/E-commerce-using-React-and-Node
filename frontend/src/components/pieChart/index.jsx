import { Chart } from "react-google-charts";
import PropTypes from "prop-types"

const Charts = (props) => {
    const {options,data}=props;
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
export default Charts;
Charts.propTypes={
    options:PropTypes.object,
    data:PropTypes.array
}