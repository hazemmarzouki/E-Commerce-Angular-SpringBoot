import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/ProductCategory';

@Injectable()
export class ProductService {
  private baseUrl = 'http://localhost:8081/api/products';
  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductList(theCartegoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCartegoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(searchedWord: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchedWord}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
