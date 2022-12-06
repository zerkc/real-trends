import { css } from "@emotion/css";
import { InputHTMLAttributes } from "react";

const InputCss = css`
    font-size: 1.1em;
    border-radius: 5px;
    border: 1px solid;
    outline: none;
    padding: 8px;
`

export function Input({className,...props}:InputHTMLAttributes<HTMLInputElement>){
    return (<input className={`${className} ${InputCss}`} {...props}/>)
}