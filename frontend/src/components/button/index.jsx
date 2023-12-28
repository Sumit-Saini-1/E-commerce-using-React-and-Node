import PropTypes from 'prop-types';
import Style from "./style.module.css";

export default function Button(props){
    const {children,onClick,classname}=props

    return (
        <button className={classname=="blue"?Style.blue:Style.red} onClick={onClick}>{children}</button>
    )
}

Button.defaultProps={
    children:"Click me",
    classname:"blue"
}

Button.propTypes={
   children:PropTypes.string,
   onClick:PropTypes.func,
   classname:PropTypes.string
}