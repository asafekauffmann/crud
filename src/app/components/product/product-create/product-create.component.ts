import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
  
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
    this.productService.showMessage('Operação salva com sucesso!');
    this.router.navigate(['/products']);
    })// neste create que receberemos o Observable(do service) de produtos
      // method subscribe nos notifica quando a resposta chegar.
      // quando chegar ai sim mostraremos a mensagem 
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
