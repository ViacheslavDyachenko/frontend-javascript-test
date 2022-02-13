/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

import { StatusHTTP } from "../RootStore/ApiStore/types";
import { BooksItemModel } from "../Models/books/Books";

export type GetBooksListParams = {
    booksName: string,
    startIndex: number,
    lastIndex: number,
    categories: string,
    sort: string
}

export type GetBookInfoParams = {
    id: string
}

export type ApiResp<BooksItemApi> =  {
    success: boolean,
    data: {
        totalItems: number,
        items: BooksItemApi[]
    },
    status: number | StatusHTTP.BAD_STATUS
}

export type ApiRespInfo<BooksItemApi> =  {
    success: boolean,
    data: {
        totalItems: number,
        items: BooksItemApi
    },
    status: number | StatusHTTP.BAD_STATUS
}

export interface IBooksStore {
    getBooksNextList(params: GetBooksListParams): Promise<ApiResp<BooksItemModel>>;
    getBookInfo(params: GetBookInfoParams): Promise<ApiRespInfo<BooksItemModel>>;
}