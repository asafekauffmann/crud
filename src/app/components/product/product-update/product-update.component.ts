import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

import { ProductService } from './../product.service';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  product: Product = {
    name: '',
    price: 0,
    id: 0
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')??''
    console.log(id)
    this.productService.readById(id).subscribe(product => {
      this.product = product
    });
  }

  updateProduct(): void {
   this.productService.update(this.product).subscribe(() => {
     this.productService.showMessage('Produto atualizado!')
     this.router.navigate(['/products']);
   })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }


}
