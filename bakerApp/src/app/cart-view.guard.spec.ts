import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartViewGuard } from './cart-view.guard';

describe('cartViewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cartViewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
