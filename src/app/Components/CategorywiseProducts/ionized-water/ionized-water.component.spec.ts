import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonizedWaterComponent } from './ionized-water.component';

describe('IonizedWaterComponent', () => {
  let component: IonizedWaterComponent;
  let fixture: ComponentFixture<IonizedWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IonizedWaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IonizedWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
