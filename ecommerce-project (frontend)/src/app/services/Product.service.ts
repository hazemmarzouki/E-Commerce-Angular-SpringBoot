import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable()
export class ProductService {

    private baseUrl = 'http://localhost:8081/api/products?size=100';

    constructor(private httpClient: HttpClient) { }

    getProductList(theCartegoryId : number): Observable<Product[]> {

        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCartegoryId}`;

        return this.httpClient.get<GetResponse>(searchUrl).pipe(
            map(response => response._embedded.products)
        );
    }
}

interface GetResponse {
    _embedded: {
        products: Product[];

    }
}
