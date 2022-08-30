import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCircleComponent } from './new-circle.component';

describe('NewCircleComponent', () => {
  let component: NewCircleComponent;
  let fixture: ComponentFixture<NewCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
