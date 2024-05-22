import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineralWaterComponent } from './mineral-water.component';

describe('MineralWaterComponent', () => {
  let component: MineralWaterComponent;
  let fixture: ComponentFixture<MineralWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MineralWaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MineralWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
