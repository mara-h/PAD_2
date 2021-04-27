import { TestBed } from '@angular/core/testing';

import { AuthentifInterceptor } from './authentif.interceptor';

describe('AuthentifInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthentifInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthentifInterceptor = TestBed.inject(AuthentifInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
