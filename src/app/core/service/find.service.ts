import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../models/products-model';
import { MAGIC_ENUM, PRODUCT_TYPE } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class FindService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    console.log('vamos buscas os dados');
    return this.http.get<any>('https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json').pipe(
      map((response: any) => {
        return this.prepare(response);
      })
    );
  }

  private prepare(response: any): Product.product[] {
    let products: Product.product[] = [];

    if (response.length > MAGIC_ENUM.ZERO) {
      products = response.map((item: any) => {
        const typeId: keyof typeof PRODUCT_TYPE = item.type;

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          img: item.img,
          type: {
            id: parseInt(item.type, 10),
            text: PRODUCT_TYPE[typeId].text
          }

        }
      });
    }

    return products;
  }

}
