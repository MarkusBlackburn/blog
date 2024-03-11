export interface AddBlogPost {
    title: string;
    shortDescription: string;
    content: string;
    imageUrl: string;
    blogPostUrl: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: string[];
}