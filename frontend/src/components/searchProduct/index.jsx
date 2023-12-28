import PropType from "prop-types";
import Style from "./style.module.css";

export default function SearchProducts(props) {
    const {searchText, onChange}=props;
    return (
        <input className={Style.search} type="search" value={searchText} onChange={onChange} placeholder="Type here..."/>
    );
}

SearchProducts.propTypes={
    searchText:PropType.string,
    onChange:PropType.func
}