import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D12Component } from './d12.component';

describe('D12Component', () => {
  let component: D12Component;
  let fixture: ComponentFixture<D12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
