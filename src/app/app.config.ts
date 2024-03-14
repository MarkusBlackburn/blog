import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideMarkdown(),
    importProvidersFrom(NgxWebstorageModule.forRoot())
  ]
};
