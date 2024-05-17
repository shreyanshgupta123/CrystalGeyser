import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryDetailsComponent } from './edit-delivery-details.component';

describe('EditDeliveryDetailsComponent', () => {
  let component: EditDeliveryDetailsComponent;
  let fixture: ComponentFixture<EditDeliveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDeliveryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeliveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
