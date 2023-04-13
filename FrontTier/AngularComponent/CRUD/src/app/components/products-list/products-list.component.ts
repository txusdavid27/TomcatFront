import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products?: Product[];
  listaProductosSeleccionados: Product[] = [];
  currentProduct: Product = {};
  currentIndex = -1;
  nombre = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }



  seleccionarProduct(product: Product): void {
    if (product.seleccionado) {
      this.listaProductosSeleccionados.push(product);
    } else {
      const index = this.listaProductosSeleccionados.findIndex(p => p.id === product.id);
      if (index >= 0) {
        this.listaProductosSeleccionados.splice(index, 1);
      }
    }
  }

  enviarSeleccion(): void {
    this.productService.postSeleccion(this.listaProductosSeleccionados)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listaProductosSeleccionados = [];
          alert('Compra solicitada correctamente');
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }


}
