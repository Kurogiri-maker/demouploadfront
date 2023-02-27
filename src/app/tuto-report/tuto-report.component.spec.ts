import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoReportComponent } from './tuto-report.component';

describe('TutoReportComponent', () => {
  let component: TutoReportComponent;
  let fixture: ComponentFixture<TutoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
