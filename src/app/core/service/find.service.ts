import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MAGIC_ENUM, PRODUCT_TYPE } from '../enums/enums';
import { product } from '../models/products-model';

@Injectable({
  providedIn: 'root',
})
export class FindService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<product[]> {
    return this.http.get('https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json').pipe(
      map((response) => {
        return this.prepare(response);
      })
    );
  }

  private prepare(response: any): product[] {
    let products: product[] = [];

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
