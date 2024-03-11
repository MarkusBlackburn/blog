import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/Models/category.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, CommonModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit {

  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectorSubscription?: Subscription;
  private addBlogPostSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService, private router: Router, private categoryService: CategoryService, private imageService: ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      blogPostUrl: '',
      content: '',
      imageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    };
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectorSubscription = this.imageService.onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.model.imageUrl = selectedImage.imageUrl;
          this.closeImageSelector();
        }
      });
  }
  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }
  
  onFormSave(): void {
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
}
