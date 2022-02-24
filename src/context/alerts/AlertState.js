import alertContext from "./alertContext";
import { useState } from "react";
import Alert from "../../components/Alert";

const AlertState = (props)=>{
    const [alert, setAlert] = useState({message :"", type : ""});
    const showAlert = (message, type)=>{
        setAlert({
            message : message,
            type : type
        });
       
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }

    return(
        <alertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;