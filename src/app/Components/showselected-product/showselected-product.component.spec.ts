import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowselectedProductComponent } from './showselected-product.component';

describe('ShowselectedProductComponent', () => {
  let component: ShowselectedProductComponent;
  let fixture: ComponentFixture<ShowselectedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowselectedProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowselectedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
