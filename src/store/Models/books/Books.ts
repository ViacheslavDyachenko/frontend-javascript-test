export type BooksItemApi = {
    volumeInfo: {
        thumbnail: string,
        categories: string[],
        title: string,
        authors: string[],
    }
}

export type BooksItemModel = {
    thumbnail: string,
    categories: string[],
    title: string, 
    authors: string[],
}

export const normalizeBooksItem = (from: BooksItemApi): BooksItemModel => {
    return {
        thumbnail: from.volumeInfo.thumbnail,
        categories: from.volumeInfo.categories,
        title: from.volumeInfo.title,
        authors: from.volumeInfo.authors
    }
}