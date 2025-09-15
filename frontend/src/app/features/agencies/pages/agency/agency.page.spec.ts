import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyPage } from './agency.page';

describe('AgencyPage', () => {
  let component: AgencyPage;
  let fixture: ComponentFixture<AgencyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
