import React from "react";
import { Link } from "react-router-dom";
import style from "./BookTile.module.scss"

type bookTileProps = {
    id: string,
    img: string;
    categories: string[];
    name: string;
    authors: string[];
}

const BookTile = ({id, img, categories, name, authors}: bookTileProps) => {
    return (
        <Link style={{textDecoration: "none"}} to={`/book/${id}`} className={style['book-tile']}>
            <img className={style['book-tile__img']} src={img} alt="" />
            <p className={style['book-tile__categories']}>{categories ? categories[0] : ''}</p>
            <p className={style['book-tile__name']}>{name}</p>
            <p className={style['book-tile__authors']}>{authors ? authors.join(', ') : ''}</p>
        </Link>
    )
}
export default BookTile;