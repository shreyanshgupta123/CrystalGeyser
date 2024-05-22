import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkalineWaterComponent } from './alkaline-water.component';

describe('AlkalineWaterComponent', () => {
  let component: AlkalineWaterComponent;
  let fixture: ComponentFixture<AlkalineWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlkalineWaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlkalineWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
