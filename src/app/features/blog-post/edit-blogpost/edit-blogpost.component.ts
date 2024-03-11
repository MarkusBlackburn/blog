import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/Models/category.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';
import { Router } from '@angular/router';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { response } from 'express';

@Component({
    selector: 'app-edit-blogpost',
    standalone: true,
    templateUrl: './edit-blogpost.component.html',
    styleUrl: './edit-blogpost.component.css',
    imports: [CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent]
})
export class EditBlogpostComponent implements OnInit, OnDestroy{
  
  id?: string | null = null;
  isImageSelectorVisible: boolean = false;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  
  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private categoryService: CategoryService, private router: Router, private imageService: ImageService) {

  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategories = response.categories.map(c => c.id);
              }
            });
        }

        this.imageSelectSubscription = this.imageService.onSelectImage()
          .subscribe({
            next: (response) => {
              if (this.model) {
                this.model.imageUrl = response.imageUrl;
                this.isImageSelectorVisible = false;
              }
            }
          });
      }
    })
  }

  onFormSave(): void {
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        imageUrl: this.model.imageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        blogPostUrl: this.model.blogPostUrl,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPostById(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }
  
  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPostById(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
}
