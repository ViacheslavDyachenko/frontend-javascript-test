export type BookInfoApi = {
    id: string,
    volumeInfo: {
        thumbnail: string,
        categories: string[],
        title: string,
        authors: string[],
        description: string,
    }
}

export type BookInfoModel = {
    id: string
    thumbnail: string,
    categories: string[],
    title: string, 
    authors: string[],
    description: string,
}

export const normalizeBookInfo = (from: BookInfoApi): BookInfoModel => {
    return {
        id: from.id,
        thumbnail: from.volumeInfo.thumbnail,
        categories: from.volumeInfo.categories,
        title: from.volumeInfo.title,
        authors: from.volumeInfo.authors,
        description: from.volumeInfo.description,
    }
}