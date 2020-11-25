import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaListeComponent } from './ma-liste.component';

describe('MaListeComponent', () => {
  let component: MaListeComponent;
  let fixture: ComponentFixture<MaListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
