import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaintingComponent } from './create-painting.component';

describe('CreatePaintingComponent', () => {
  let component: CreatePaintingComponent;
  let fixture: ComponentFixture<CreatePaintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
