import { TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product-page.component';
import { FindService } from '@app/core/service/find.service';
import { of } from 'rxjs';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  // let findService: FindService;

  beforeEach(async () => {

    const findServiceMock = {
      getAll: jest.fn().mockReturnValue(of([{ title: 'Product 1' }, { title: 'Product 2' }]))
    };

    await TestBed.configureTestingModule({
      declarations: [ProductPageComponent],
      providers: [{ provide: FindService, useValue: findServiceMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    // findService = TestBed.inject(FindService);

  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

});
