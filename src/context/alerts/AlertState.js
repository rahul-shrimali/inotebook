import alertContext from "./alertContext";
import { useState } from "react";

const AlertState = (props)=>{
    const [alert, setAlert] = useState("here");
    const showAlert = (message, type)=>{
        setAlert({
            msg : message,
            type : type
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return(
        <alertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;