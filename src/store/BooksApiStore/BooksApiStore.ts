import { ApiResponse, HTTPMethod } from 'store/RootStore/ApiStore/types';
import {ApiResp, GetBooksListParams, IBooksStore} from "./types";
import { normalizeBooksItem, BooksItemApi, BooksItemModel } from 'store/Models/books/Books';
import rootStore from '../RootStore';

export class BooksApiStore implements IBooksStore {
    private readonly apiStore = rootStore.apiStore;

    async getBooksNextList(params: GetBooksListParams): Promise<ApiResp<BooksItemModel>> {
        let response = await this.apiStore.request<ApiResponse<BooksItemApi, BooksItemApi>>({method: HTTPMethod.GET, endpoint: `/books/v1/volumes?q=${params.booksName}&startIndex=${params.startIndex}&maxResults=${params.lastIndex}`, headers: {}});
        console.log(response.data);
        
        try {
            response.data.items = await response.data.items.map((item: any) => {
                return normalizeBooksItem({
                    volumeInfo: {
                        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
                        categories: item.volumeInfo.categories,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                    }
                });
            });
        } catch (e) {
            console.log(e);
            
            return {success: response.success, data: response.data, status: response.status};
        }
        
        return {success: response.success, data: response.data, status: response.status};
    }
}