import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  product: Product = {
    nombre: '',
    descripcion: '',
    precio: 0
  };
  submitted = false;

  constructor(private productService: ProductService) { }

  saveProduct(): void {
    const data = {
      title: this.product.nombre,
      description: this.product.precio
    };
/*
    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      */
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      nombre: '',
      descripcion: '',
      precio: 0
    };
  }

}
