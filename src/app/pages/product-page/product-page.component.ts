import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MAGIC_ENUM } from '@app/core/enums/enums';
import { Product } from '@app/core/models/products-model';
import { FindService } from '@app/core/service/find.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  products: any;

  constructor(private findService: FindService) { }

  public ngOnInit(): void {
    this.findAll();
  }

  private findAll(): void {
    this.findService.getAll().subscribe({
      next: (response: any) => {
        console.log('Vamos imprimir aqui products');
        console.log(response);
        this.products = response;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getProductByName($event: Event): void {
    const searchTerm = ($event.target as HTMLInputElement).value;

    if (!this.isEmpty(searchTerm)) {
      const resultSearch = this.searchProductByTitle(searchTerm);
      this.products = resultSearch;
      return;
    }

    this.findAll();

  }

  private isEmpty(value: string): boolean {
    return value.trim().length === MAGIC_ENUM.ZERO;
  }

  private searchProductByTitle(title: string): Product.product[] {
    return this.products.filter((product: Product.product) => product.title.toLowerCase().includes(title.toLowerCase()));
  }


}
