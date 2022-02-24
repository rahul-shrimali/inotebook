import React, { useContext } from "react";
import alertContext from "../context/alerts/alertContext";


function Alert() {
  const context = useContext(alertContext)
  const {alert} = context
  const capital = (word)=>{
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
  }  
  return (
    <div style = {{height : '50px'}}>

        {alert && 
        <div className={`alert alert-${alert.type} alert-dismissible fade show text-center`} role="alert" style = {{height : '40px'}}>
        <strong>{capital(alert.message)} </strong>
        </div>}
    </div> 
  );
}

export default Alert;
