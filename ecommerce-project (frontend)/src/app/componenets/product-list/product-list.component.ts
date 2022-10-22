import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/Product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(
    private productListService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const searchedWord:string =  this.route.snapshot.paramMap.get('keyword');
    this.productListService.searchProducts(searchedWord).subscribe
    (data => {
      this.products = data;
    });
  }
  

  handleListProducts() {
    /*check if "id" parametre is available */
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      //no category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //now get the products for the given category id
    this.productListService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
