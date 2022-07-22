import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerlibroComponent } from './verlibro.component';

describe('VerlibroComponent', () => {
  let component: VerlibroComponent;
  let fixture: ComponentFixture<VerlibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerlibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerlibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
