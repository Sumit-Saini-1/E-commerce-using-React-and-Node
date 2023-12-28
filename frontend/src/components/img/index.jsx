import PropTypes from 'prop-types';
import Style from "./style.module.css";

export default function Image(props){
    const {src}=props;
    return(
        <img className={Style.img} src={src} />
    );
}


Image.propTypes={
    src:PropTypes.string.isRequired
}