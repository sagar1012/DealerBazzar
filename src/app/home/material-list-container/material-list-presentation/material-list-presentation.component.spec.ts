import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialListPresentationComponent } from './material-list-presentation.component';

describe('MaterialListPresentationComponent', () => {
  let component: MaterialListPresentationComponent;
  let fixture: ComponentFixture<MaterialListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialListPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
