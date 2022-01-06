import modeContext from "./modeContext";
import { useState } from "react";


const ModeState = (props) => {
    const [mode, setMode] = useState("light");

    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "#464343";

        } else {
            setMode("light");
            document.body.style.backgroundColor = "white";

        };
    }

    return (
        <modeContext.Provider value={{ mode, toggleMode }}>
            {props.children}
        </modeContext.Provider>
    )
}


export default ModeState;