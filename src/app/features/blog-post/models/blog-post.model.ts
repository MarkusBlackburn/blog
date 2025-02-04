import { Category } from "../../category/Models/category.model";

export interface BlogPost {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    imageUrl: string;
    blogPostUrl: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: Category[];
}