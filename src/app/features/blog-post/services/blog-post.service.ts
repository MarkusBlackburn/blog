import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { UpdateBlogPost } from '../models/update-blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/?addAuth=true`, data);
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }
  
  updateBlogPostById(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }
  
  deleteBlogPostById(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }

  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${url}`);
  }
}
