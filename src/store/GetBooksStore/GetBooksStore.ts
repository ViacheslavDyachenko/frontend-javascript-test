import { action, computed, flow, makeObservable, observable } from "mobx";
import { ILocalStore } from "utils/useLocalStore/useLocalStore";
import  { BooksApiStore }  from "store/BooksApiStore/BooksApiStore";
import React from "react";

type PrivateFileds =  "_value" | "_loaded" | "_loadStatus" | "_result" | "_totalItems" | "_sortValue" | "_categoriesValue";

export default class GetBooksStore implements ILocalStore{
    private _booksApiStore = new BooksApiStore();
    private  _value: string = '';
    private _categoriesValue: string = '';
    private _sortValue: string = '';
    private _totalItems: number = 0;
    private _startIndex: number = 0;
    private _lastIndex: number = 0;
    private _arrSeen: any = [];
    private _seen: Record<string, boolean> = {}; 
    private _result: {
        id: string,
        thumbnail: string,
        categories: string[],
        title: string, 
        authors: string[],
    }[] | null = null;
    private _loaded: boolean = true;
    private _loadStatus: null | 'ok' | 'forbidden' | 'notFound' | 'BAD_STATUS' = null;
    
    constructor() {
        makeObservable<GetBooksStore, PrivateFileds>(this, {
            _result: observable,
            _totalItems: observable,
            _value: observable,
            _sortValue: observable,
            _categoriesValue: observable,
            _loaded: observable,
            _loadStatus: observable,
            onChange: action,
            keydownFunc: action,
            onChangeCategories: action,
            onChangeSort: action,
            onClick: action,
            getBooksList: action,
            loadMore: action,
            destroy: action,
            value: computed,
            loaded: computed,
            loadStatus: computed,
            result: computed,
            totalItems: computed,
            categoriesValue: computed,
            sortValue: computed
        })
    }

    get loadStatus() {
        return this._loadStatus;
    }

    get categoriesValue() {
        return this._categoriesValue;
    }
    
    get sortValue() {
        return this._sortValue;
    }

    get loaded() {
        return this._loaded;
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

    keydownFunc = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            this._startIndex = 0;
            this._lastIndex = 30;
            this._loaded = false;
            this._result = null;
            this._arrSeen = [];
            this._seen = {}; 
            this._loadStatus = null;
            this.getBooksList();
        }
    }

    onFocus = (event: React.FocusEvent): void => {
        document.addEventListener('keydown', this.keydownFunc)
    }

    onBlur = (event: React.FocusEvent): void => {
        document.removeEventListener('keydown', this.keydownFunc)
    }

    onChangeCategories = (event: React.FormEvent): void => {

        let element = event.target as HTMLSelectElement;

        this._categoriesValue = element.value;

    }

    onChangeSort = (event: React.FormEvent): void => {

        let element = event.target as HTMLSelectElement;

        this._sortValue = element.value;

    }

    onClick = (): void => {
        this._startIndex = 0;
        this._lastIndex = 30;
        this._loaded = false;
        this._result = null;
        this._arrSeen = [];
        this._seen = {}; 
        this._loadStatus = null;
        this.getBooksList();
        
    }
    getBooksList = flow(function* (this: GetBooksStore) {
        let response = yield this._booksApiStore.getBooksNextList({
            booksName : this._value, 
            startIndex: this._startIndex, 
            lastIndex: this._lastIndex,
            categories: this._categoriesValue,
            sort: this._sortValue});
        try {
            
            this._totalItems = response.data.totalItems;
            this._loaded = response.success;
    
            let seen: Record<string, boolean> = {}
    
            response.data.items.forEach((item: any) => {                        
                if(!this._seen.hasOwnProperty(JSON.stringify(item))) {
                    this._seen[JSON.stringify(item)] = true;
                    seen[JSON.stringify(item)] = true;
                };
            });
    
            for(let item of Object.keys(seen)) {
                this._arrSeen.push(JSON.parse(item));
            };
            this._result = this._arrSeen;
            if(response.status === 200) this._loadStatus = 'ok';
        } catch (e) {
            this._loadStatus = "BAD_STATUS";
        }
        this._startIndex += 30;
        if(this._totalItems === this._result.length) this._loadStatus = null;
        
    });

    loadMore = () => {
        this._loaded = false;
        this.getBooksList();
    }

    destroy(): void {
        this._result = null;
        this._startIndex = 0;
        this._lastIndex = 0;
        this._value = '';
        this._loaded = true;
    }
}