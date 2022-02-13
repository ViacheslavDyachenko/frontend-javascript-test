import { ApiResponse, HTTPMethod } from 'store/RootStore/ApiStore/types';
import {ApiResp, ApiRespInfo, GetBookInfoParams, GetBooksListParams, IBooksStore} from "./types";
import { normalizeBooksItem, BooksItemApi, BooksItemModel } from 'store/Models/books/Books';
import rootStore from '../RootStore';
import { BookInfoApi, normalizeBookInfo } from 'store/Models/bookInfo/BookInfo';

export class BooksApiStore implements IBooksStore {
    private readonly apiStore = rootStore.apiStore;

    async getBooksNextList(params: GetBooksListParams): Promise<ApiResp<BooksItemModel>> {
        let response = await this.apiStore.request<ApiResponse<BooksItemApi, BooksItemApi>>({
            method: HTTPMethod.GET, 
            endpoint: `/books/v1/volumes?q=${params.booksName}${params.categories !== 'all' ? '+subject:' + params.categories : ''}${params.sort === 'newest' ? '&orderBy=' + params.sort : ''}&startIndex=${params.startIndex}&maxResults=${params.lastIndex}`, 
            headers: {}});
        try {
            response.data.items = await response.data.items.map((item: any) => {
                return normalizeBooksItem({
                    id: item.id,
                    volumeInfo: {
                        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
                        categories: item.volumeInfo.categories,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                    }
                });
            });
        } catch (e) {
            return {success: response.success, data: response.data, status: response.status};
        }
        
        return {success: response.success, data: response.data, status: response.status};
    }
    
    async getBookInfo(params: GetBookInfoParams): Promise<ApiRespInfo<BooksItemModel>> {
        let response = await this.apiStore.request<ApiResponse<BookInfoApi, BookInfoApi>>({
            method: HTTPMethod.GET, 
            endpoint: `/books/v1/volumes/${params.id}`, 
            headers: {}});
        try {
            response.data = normalizeBookInfo({
                id: response.data.id,
                volumeInfo: {
                    thumbnail: response.data.volumeInfo.imageLinks.thumbnail,
                    categories: response.data.volumeInfo.categories,
                    title: response.data.volumeInfo.title,
                    authors: response.data.volumeInfo.authors,
                    description: response.data.volumeInfo.description,
                }
            })
        } catch (e) {
            return {success: response.success, data: response.data, status: response.status};
        }
        
        return {success: response.success, data: response.data, status: response.status};
    }
}