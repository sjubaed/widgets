import React from "react";
import { useState } from "react";


export type ButtonProps{
    onClick?:() => void,
    text: string
}

export const Button1=(props:ButtonProps) => {
    const [buttonPressed, setButtonPressed] = useState(false);

    const toggleButton = () => {
        setButtonPressed(!buttonPressed);
        if (props.onClick){
            props.onClick()
        }
      };
    
    return(
        <button className={`button ${buttonPressed ? "buttonClicked" : ""}`} onClick={toggleButton}>{props.text}</button>
    )
}

// component names MUST start with a capital letter: https://react.dev/learn/your-first-component
export const SmallButton=(props:ButtonProps) => {
    const [buttonPressed, setButtonPressed] = useState(false);

    const toggleButton = () => {
        setButtonPressed(!buttonPressed);
        if (props.onClick){
            props.onClick()
        }
      };
    
    return(
        <button className={`buttonsmall ${buttonPressed ? "buttonClicked" : ""}`} onClick={toggleButton}>{props.text}</button>
    )
}
