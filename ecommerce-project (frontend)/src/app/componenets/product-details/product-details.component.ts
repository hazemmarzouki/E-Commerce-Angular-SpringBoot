import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/Product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : Product;
  

  constructor(private productService : ProductService , 
              private route:ActivatedRoute , 
              private catrtService : CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.catrtService.addToCart(theCartItem);
  }



  handleProductDetails() {
    //get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
