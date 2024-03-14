import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      RouterOutlet, 
      RouterLink, 
      NavbarComponent, 
      FormsModule, 
      HttpClientModule,
      MarkdownModule,
    ]
})
export class AppComponent {
  title = 'blog';
}
