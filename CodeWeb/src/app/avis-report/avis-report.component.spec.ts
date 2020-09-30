import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisReportComponent } from './avis-report.component';

describe('AvisReportComponent', () => {
  let component: AvisReportComponent;
  let fixture: ComponentFixture<AvisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
