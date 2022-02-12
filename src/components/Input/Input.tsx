import React from "react";
import style from "./Input.module.scss";

type InputProps = {
    value: string;
    onChange: (event: React.FormEvent) => void
}

const Input = ({value, onChange}: InputProps) => {
    return (
        <input className={style.input} type="text" value={value} onChange={onChange} />
    )
}
export default Input;