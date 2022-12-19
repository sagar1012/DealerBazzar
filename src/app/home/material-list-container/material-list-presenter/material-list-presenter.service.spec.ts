import { TestBed } from '@angular/core/testing';

import { MaterialListPresenterService } from './material-list-presenter.service';

describe('MaterialListPresenterService', () => {
  let service: MaterialListPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialListPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
