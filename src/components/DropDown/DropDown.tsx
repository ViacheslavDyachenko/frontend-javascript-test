import React from "react";
import style from "./DropDown.module.scss"

type DropDownProps = {
    className: string
    label: string
    value: string;  
    onChange: (event: React.FormEvent) => void;
    list: string[]
}

const DropDown = ({className, list, label, value, onChange}: DropDownProps) => {
    return (
        <>
            <label className={`${style["dropdown-label"]}  ${className}`} htmlFor={label}>{label}</label>
            <select id={label} className={`${style.dropdown} ${className}`} value={value} onChange={onChange}>
                {list.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </>
    )
}
export default DropDown;