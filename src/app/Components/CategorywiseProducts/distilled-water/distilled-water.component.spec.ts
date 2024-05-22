import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistilledWaterComponent } from './distilled-water.component';

describe('DistilledWaterComponent', () => {
  let component: DistilledWaterComponent;
  let fixture: ComponentFixture<DistilledWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistilledWaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistilledWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
