import React from "react";
import style from "./Header.module.scss";

type HeaderProps = {
    children: React.ReactNode;
}

const Header = ({children}: HeaderProps) => {
    return (
        <header className={style.header}>
            <h1 className={style.header__title}>Search for books</h1>
            {children}
        </header>
    )
}

export default Header;