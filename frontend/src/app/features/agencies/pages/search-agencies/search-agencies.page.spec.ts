import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAgenciesPage } from './search-agencies.page';

describe('SearchAgenciesPage', () => {
  let component: SearchAgenciesPage;
  let fixture: ComponentFixture<SearchAgenciesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAgenciesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAgenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
