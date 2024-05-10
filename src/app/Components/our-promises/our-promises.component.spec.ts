import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPromisesComponent } from './our-promises.component';

describe('OurPromisesComponent', () => {
  let component: OurPromisesComponent;
  let fixture: ComponentFixture<OurPromisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurPromisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurPromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
