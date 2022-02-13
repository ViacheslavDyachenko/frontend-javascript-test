import React from "react";
import style from "./BookInfo.module.scss"

type bookInfoProps = {
    thumbnail: string,
    categories: string[],
    title: string, 
    authors: string[],
    description: string,
}

const BookInfo = ({thumbnail, categories, title, authors, description}: bookInfoProps) => {
    return (
        <div className={style["book-info-block"]}>
            <img className={style["book-info-block__img"]} src={thumbnail} alt="" />
            <p className={style["book-info-block__categories"]}>{categories ? categories.join(', ') : ''}</p>
            <p className={style["book-info-block__title"]}>{title}</p>
            <p className={style["book-info-block__authors"]}>{authors ? authors.join(', ') : ''}</p>
            <p className={style["book-info-block__description"]}>{description}</p>
        </div>
    )
}

export default BookInfo;