export interface IBook {
    id: string;
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate?: string;
    thumbnailUrl?: string;
    longDescription?: string;
    status: string;
    authors: Array<string>;
}