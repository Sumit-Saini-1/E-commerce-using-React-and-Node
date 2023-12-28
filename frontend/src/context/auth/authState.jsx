import AuthContext from "./authContext";
import { useState } from "react";
import PropTypes from "prop-types"

const AuthState=(props)=>{
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser]=useState({});
    
    return (
        <AuthContext.Provider value={{isloggedIn,setIsLoggedIn,user,setUser}}>
            {
                props.children
            }
        </AuthContext.Provider>
    )
}

AuthState.propTypes={
    children:PropTypes.any
}
export default AuthState;