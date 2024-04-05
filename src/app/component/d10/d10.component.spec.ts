import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D10Component } from './d10.component';

describe('D10Component', () => {
  let component: D10Component;
  let fixture: ComponentFixture<D10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
