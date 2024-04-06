import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D6Component } from './d6.component';

describe('D6Component', () => {
  let component: D6Component;
  let fixture: ComponentFixture<D6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
