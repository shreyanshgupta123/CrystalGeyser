import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringWaterComponent } from './spring-water.component';

describe('SpringWaterComponent', () => {
  let component: SpringWaterComponent;
  let fixture: ComponentFixture<SpringWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpringWaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpringWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
