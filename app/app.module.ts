import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoresComponent } from './stores/stores.component';
import { FilterStoresByLetterPipe } from './filter-stores-by-letter.pipe';
import { CategoriesComponent } from './categories/categories.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterCategoriesByLetterPipe } from './filter-categories-by-letter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoresComponent,
    FilterStoresByLetterPipe,
    CategoriesComponent,
    FilterCategoriesByLetterPipe,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    ClipboardModule,
    MatSnackBarModule,
    MatButtonModule, 
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ScrollingModule     
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
