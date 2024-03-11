import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  
  model: AddCategoryRequest;

  private addCategorySubcscription?: Subscription;

  constructor(private categoryService: CategoryService, private router: Router){
    this.model = {
      name: '',
      categoryUrl: ''
    };
  }

  onFormSubmit(){
    this.addCategorySubcscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/categories');
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubcscription?.unsubscribe();
  }
}
