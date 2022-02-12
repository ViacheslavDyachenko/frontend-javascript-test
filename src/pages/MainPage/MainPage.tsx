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

const MainPage = () => {
    const getBooksList = useLocalStore(() => new GetBooksStore());
    
    return (
        <>
            <Header>
                <Input value={getBooksList.value} onChange={getBooksList.onChange} />
                <SearchButton onClick={getBooksList.onClick} />
                <DropDown 
                    className={style.categories}
                    label="Categories" 
                    value="all" 
                    onChange={() => {}} 
                    list={["all", "art", "biography", "computers", "history", "medical", "poetry"]} 
                />
                <DropDown 
                    className={style.sorting}
                    label="Sorting by" 
                    value="relevance" 
                    onChange={() => {}} 
                    list={["relevance", "newest"]} 
                />
            </Header>
            <div className={style['books-block']}>
                <h2 className={style['books-block__counter']}>{Boolean(getBooksList.totalItems) && `Found ${getBooksList.totalItems} results`}</h2>
                {getBooksList.result 
                && getBooksList.result.map((item) => {
                        return <BookTile
                            key={item.thumbnail}
                            img={item.thumbnail}
                            categories={item.categories}
                            name={item.title.length > 50 ? item.title.slice(0, 51) + '...' : item.title}
                            authors={item.authors} 
                        />
                    })
                }
            </div>
        </>
    )
}

export default observer(MainPage);