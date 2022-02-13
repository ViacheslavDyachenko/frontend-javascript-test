import React from "react";
import style from "./Input.module.scss";

type InputProps = {
    value: string;
    onChange: (event: React.FormEvent) => void,
    onFocus: (event: React.FocusEvent) => void,
    onBlur: (event: React.FocusEvent) => void
}

const Input = ({value, onChange, onFocus, onBlur}: InputProps) => {
    return (
        <input onBlur={onBlur} onFocus={onFocus} className={style.input} type="text" value={value} onChange={onChange} />
    )
}
export default Input;