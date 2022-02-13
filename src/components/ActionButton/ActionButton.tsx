import React from "react";
import style from "./ActionButton.module.scss";

type ActionButtonProps = {
    onClick?: (event: React.MouseEvent) => void,
    text: string,
    className?: string
}

const ActionButton = ({onClick, text, className}: ActionButtonProps) => {
    return (
        <button className={`${style['action-btn']} ${className}`} onClick={onClick}>{text}</button>
    )
}

export default ActionButton;