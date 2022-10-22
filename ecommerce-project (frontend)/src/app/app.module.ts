import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './componenets/product-list/product-list.component';
import {ProductCategoryMenuComponent } from './componenets/product-category-menu/product-category-menu.component';
import { SearchComponent } from './componenets/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/Product.service';
import { Routes, RouterModule } from '@angular/router';


/*define routes from most spesific to generic */
const routes: Routes = [
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },

];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
