import ActionButton from "components/ActionButton";
import BookInfo from "components/BookInfo";
import Header from "components/Header";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useParams } from "react-router-dom";
import BookInfoStore from "store/BookInfoStore";
import useLocalStore from "utils/useLocalStore";
import style from "./BookInfoPage.module.scss"

const BookInfoPage = () => {
    const bookInfo = useLocalStore(() => new BookInfoStore());
    let url = useParams();
    React.useEffect(() => {
        bookInfo.bookId = url.id;
        bookInfo.getBookInfo();
    }, [])

    return (
        <>
            <Header>
                <Link className={style["dark-btn-link"]} to={"/"}><ActionButton className={style["dark-btn"]} text="back" /></Link>
            </Header>
            {console.log(bookInfo.isLoaded)}
            {bookInfo.result 
            && <BookInfo 
                thumbnail={bookInfo.result.thumbnail}
                categories={bookInfo.result.categories}
                title={bookInfo.result.title}
                authors={bookInfo.result.authors}
                description={bookInfo.result.description}
            />}
            
        </>
    )
}

export default observer(BookInfoPage);