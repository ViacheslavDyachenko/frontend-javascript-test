import { action, computed, flow, makeObservable, observable } from "mobx";
import { ILocalStore } from "utils/useLocalStore/useLocalStore";
import  { BooksApiStore }  from "store/BooksApiStore/BooksApiStore";

type PrivateFileds =  "_value" | "_hasMore" | "_loadStatus" | "_result" | "_totalItems";

export default class GetBooksStore implements ILocalStore{
    private _booksApiStore = new BooksApiStore();
    private  _value: string = '';
    private _totalItems: number = 0;
    private _startIndex: number = 0;
    private _lastIndex: number = 0;
    private _result: {
        thumbnail: string,
        categories: string[],
        title: string, 
        authors: string[],
    }[] | null = null;
    private _hasMore: boolean = true;
    private _loadStatus: null | 'ok' | 'forbidden' | 'notFound' | 'BAD_STATUS' = null;
    
    constructor() {
        makeObservable<GetBooksStore, PrivateFileds>(this, {
            _result: observable,
            _totalItems: observable,
            _value: observable,
            _hasMore: observable,
            _loadStatus: observable,
            onChange: action,
            onClick: action,
            getBooksList: action,
            destroy: action,
            value: computed,
            hasMore: computed,
            loadStatusError: computed,
            result: computed,
            totalItems: computed
        })
    }

    get loadStatusError() {
        return this._loadStatus;
    }

    get hasMore() {
        return this._hasMore;
    };

    get value() {
        return this._value;
    };

    get startIndex() {
        return this._startIndex;
    }

    get lastIndex() {
        return this._lastIndex;
    }

    get result() {
        return this._result;
    }

    get totalItems() {
        return this._totalItems;
    }

    onChange = (event: React.FormEvent): void => {        
        let element = event.target as HTMLInputElement;
        this._value = element.value;
        
    }

    onClick = (): void => {
        this._startIndex = 0;
        this._lastIndex = 30;
        this._hasMore = true;
        this.getBooksList();
        
    }
    getBooksList = flow(function* (this: GetBooksStore) {
        let response = yield this._booksApiStore.getBooksNextList({
            booksName : this._value, 
            startIndex: this._startIndex, 
            lastIndex: this._lastIndex });
        
        this._totalItems = response.data.totalItems;
        this._result = response.data.items;

        if(response.status === 404) this._loadStatus = 'notFound';
        if(response.status === 403) {
            this._result = null;
            this._loadStatus = 'forbidden';
        };
        if(response.status === 'BAD_STATUS') this._loadStatus = 'BAD_STATUS';
        if(response.status === 200) this._loadStatus = 'ok';
    });

    destroy(): void {
        this._result = null;
        this._startIndex = 0;
        this._lastIndex = 0;
        this._value = '';
        this._hasMore = true;
    }
}