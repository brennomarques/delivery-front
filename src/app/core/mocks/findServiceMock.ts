import { Observable, of } from 'rxjs';

export class MockPlansService {
    getAll(): Observable<any> {
        return of({
            product: [
                { title: 'Product 1' },
                { title: 'Product 2' },
                { title: 'Product 3' },
            ],
        });
    }
}
