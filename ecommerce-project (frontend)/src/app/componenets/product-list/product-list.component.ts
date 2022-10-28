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
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //pagination property
  thePageNumber: number = 1;
  thePageSize : number = 10;
  theTotalElem: number = 0;

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

    //check if we have a different category than previous
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;}

      this.previousCategoryId = this.currentCategoryId;
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
      

    //now get the products for the given category id
    this.productListService
    .getProductListPagination(this.thePageNumber - 1, 
                              this.thePageSize,
                              this.currentCategoryId)
    .subscribe(this.processResult());
  }

  processResult() {
    return (data:any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElem = data.page.totalElements;
    }
  }






}
