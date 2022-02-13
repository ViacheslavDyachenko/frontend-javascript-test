import BookTile from "components/BookTile";
import DropDown from "components/DropDown";
import Header from "components/Header";
import Input from "components/Input";
import { observer } from "mobx-react-lite";
import React from "react";
import GetBooksStore from "store/GetBooksStore";
import useLocalStore from "utils/useLocalStore";
import style from "./MainPage.module.scss";
import SearchButton from "components/SearchButton";
import Loader from "components/Loader";
import ActionButton from "components/ActionButton";

const MainPage = () => {
    const getBooksList = useLocalStore(() => new GetBooksStore());
    
    return (
        <>
            <Header>
                <Input onBlur={getBooksList.onBlur} onFocus={getBooksList.onFocus} value={getBooksList.value} onChange={getBooksList.onChange} />
                <SearchButton onClick={getBooksList.onClick} />
                <DropDown 
                    className={style.categories}
                    label="Categories" 
                    value={getBooksList.categoriesValue} 
                    onChange={getBooksList.onChangeCategories} 
                    list={["all", "art", "biography", "computers", "history", "medical", "poetry"]} 
                />
                <DropDown 
                    className={style.sorting}
                    label="Sorting by" 
                    value={getBooksList.sortValue}
                    onChange={getBooksList.onChangeSort} 
                    list={["relevance", "newest"]} 
                />
            </Header>
            <div className={style['books-block']}>
                <h2 className={style['books-block__counter']}>{
                    Boolean(getBooksList.totalItems) 
                    ? `Found ${getBooksList.totalItems} results`
                    : getBooksList.loadStatus === "BAD_STATUS" && 'Nothing found'}</h2>
                {getBooksList.result 
                && getBooksList.result.map((item) => {
                        return <BookTile
                            key={item.id}
                            id={item.id}
                            img={item.thumbnail}
                            categories={item.categories}
                            name={item.title.length > 50 ? item.title.slice(0, 51) + '...' : item.title}
                            authors={item.authors} 
                        />
                    })
                }
            </div>
            {!getBooksList.loaded && <Loader />}
            {getBooksList.loadStatus === 'ok' && <ActionButton text="Load more" onClick={getBooksList.loadMore} />}
        </>
    )
}

export default observer(MainPage);