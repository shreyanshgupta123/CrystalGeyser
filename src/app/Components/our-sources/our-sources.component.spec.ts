import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSourcesComponent } from './our-sources.component';

describe('OurSourcesComponent', () => {
  let component: OurSourcesComponent;
  let fixture: ComponentFixture<OurSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurSourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
