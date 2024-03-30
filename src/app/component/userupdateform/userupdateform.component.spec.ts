import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserupdateformComponent } from './userupdateform.component';

describe('UserupdateformComponent', () => {
  let component: UserupdateformComponent;
  let fixture: ComponentFixture<UserupdateformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserupdateformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserupdateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
