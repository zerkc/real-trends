import { css } from "@emotion/css";
import { ButtonHTMLAttributes } from "react";

const ButtonCss = css`
    font-size: 1.1em;
    border-radius: 5px;
    border: 1px solid;
    outline: none;
    padding: 8px;
`

export function Button({className,children,...props}:ButtonHTMLAttributes<HTMLButtonElement>){
    return (<button className={`${className} ${ButtonCss}`} {...props}>{children}</button>)
}