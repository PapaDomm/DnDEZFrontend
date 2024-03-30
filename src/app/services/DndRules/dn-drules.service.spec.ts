import { TestBed } from '@angular/core/testing';

import { DnDRulesService } from './dn-drules.service';

describe('DnDRulesService', () => {
  let service: DnDRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DnDRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
