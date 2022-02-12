import React from "react";
import style from "./BookTile.module.scss"

type bookTileProps = {
    img: string;
    categories: string[];
    name: string;
    authors: string[];
}

const BookTile = ({img, categories, name, authors}: bookTileProps) => {
    return (
        <div className={style['book-tile']}>
            <img className={style['book-tile__img']} src={img} alt="" />
            <p className={style['book-tile__categories']}>{categories ? categories.join(', ') : ''}</p>
            <p className={style['book-tile__name']}>{name}</p>
            <p className={style['book-tile__authors']}>{authors ? authors.join(', ') : ''}</p>
        </div>
    )
}
export default BookTile;