import PropTypes from 'prop-types';
import Style from "./style.module.css";
export default function Select(props) {
    const { value, options,onChange,styles } = props;
    return (
        <select style={styles||{}} onChange={onChange} className={Style.select} id="level" value={value} name="level" >
            <option value="none" disabled hidden>--select--</option>
            {
                options.map((value,index)=>{
                    return <option key={index} value={value}>{value}</option>
                })
            }
        </select>
    )
}

Select.defaultProps = {
    value: "none",
    options: ["select an item"]
}

Select.propTypes = {
    value: PropTypes.any,
    options: PropTypes.array,
    onChange:PropTypes.func,
    styles:PropTypes.object
}