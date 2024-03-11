import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../Models/update-category-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy{
  
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
  }

  onFormSave(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      categoryUrl: this.category?.categoryUrl ?? ''
    };
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategoryById(this.id, updateCategoryRequest).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    } 
  }

  onDelete(): void {
    if (this.id) {
      this.categoryService.deleteCategoryById(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response;
              }
            });
        }
      }
    });
  }
}
