export type BooksItemApi = {
    id: string,
    volumeInfo: {
        thumbnail: string,
        categories: string[],
        title: string,
        authors: string[],
    }
}

export type BooksItemModel = {
    id: string
    thumbnail: string,
    categories: string[],
    title: string, 
    authors: string[],
}

export const normalizeBooksItem = (from: BooksItemApi): BooksItemModel => {
    return {
        id: from.id,
        thumbnail: from.volumeInfo.thumbnail,
        categories: from.volumeInfo.categories,
        title: from.volumeInfo.title,
        authors: from.volumeInfo.authors
    }
}