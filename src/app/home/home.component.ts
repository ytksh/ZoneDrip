import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }

  totalRecords: number = 0;
  rows: number = 5;

  products: Product[] =  []; 
  onProductOutput(product: Product) {
    console.log(product, "Product");
  }

  fetchProducts(page: number, perPage: number){
    this.productsService
    .getProducts('http://localhost:3000/clothes', {page: page, perPage: perPage})
    .subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    });
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }
  ngOnInit() {
    this.fetchProducts(0, this.rows);

  }
}
