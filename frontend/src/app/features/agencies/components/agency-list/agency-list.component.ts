import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Agency } from '../../../../core/model/agency.model';
import { AgencyService } from '../../../../core/services/agency.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { PageRequest, PageResponse } from '../../../../shared/model/paginator.model';
import { Subscription } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Coordinates } from '../../../../shared/model/coordinates.model';
@Component({
  selector: 'app-agency-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBar
  ],
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent implements OnInit {
  @Input() search: boolean = false;
  @Input() coordinates: Coordinates | undefined;
  @Input() isLoading = true;

  @Output() onClickUpdate = new EventEmitter<Agency>();

  displayedColumns: string[] = ['name', 'code', 'state', 'address', 'actions'];
  dataSource: MatTableDataSource<Agency> = new MatTableDataSource<Agency>();
  private sub = new Subscription();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  readonly dialog = inject(MatDialog);


  pageRequest: PageRequest = {
    page: 0,
    size: 5,
    sort: "id",
    direction: "desc"
  };
  resultsLength: number = 0;

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.load();
    this.sub.add(this.agencyService.reloadTrigger$.subscribe(() => this.load()));
  }


  load(sortState?: Sort, pageEvent?: PageEvent, findNearby?: boolean): void {
    this.isLoading = true;
    let search$;

    if (this.search) {
      const hasSort = sortState || this.sort.active;

      if (hasSort && !findNearby) {
        this.pageRequest.sort = sortState?.active ?? this.pageRequest.sort;
        this.pageRequest.direction = sortState?.direction ?? this.pageRequest.direction;
      }

      if (pageEvent && !findNearby) {
        this.pageRequest.page = pageEvent?.pageIndex ?? this.pageRequest.page;
        this.pageRequest.size = pageEvent?.pageSize ?? this.pageRequest.size;
      }

      if (findNearby) {
        this.clearSortAndTable();
        search$ = this.agencyService.searchAgencies(this.pageRequest, this.coordinates);
        console.log("this.pageRequest nearby", this.pageRequest);
      } else if (event && hasSort) {
        search$ = this.agencyService.searchAgencies(this.pageRequest);
        console.log("this.pageRequest sort+event", this.pageRequest);
      } else if (hasSort) {
        search$ = this.agencyService.searchAgencies(this.pageRequest);
        console.log("this.pageRequest sort", this.pageRequest);
      } else if (event) {
        search$ = this.agencyService.searchAgencies(this.pageRequest, this.coordinates);
        console.log("this.pageRequest event", this.pageRequest);
      } else {
        search$ = this.agencyService.searchAgencies(this.pageRequest);
        console.log("this.pageRequest default", this.pageRequest);
      }

    } else {
      this.pageRequest.sort = sortState?.active ?? this.pageRequest.sort;
      this.pageRequest.direction = sortState?.direction ?? this.pageRequest.direction;
      search$ = this.agencyService.list(this.pageRequest);
    }


    search$?.subscribe({
      next: response => this.updateTable(response),
      error: () => this.isLoading = false
    });
  }

  private clearSortAndTable() {
    this.sort.active = '';
    this.sort.direction = '';
    this.dataSource.data = [];

    this.pageRequest.page = 0;
    this.pageRequest.sort = '';
    this.pageRequest.direction = undefined;
  }

  private updateTable(response: PageResponse<Agency>) {
    this.dataSource.data = response.content;
    this.resultsLength = response.totalElements ?? 0;
    this.isLoading = false;

    if (this.search && this.displayedColumns.includes('actions')) {
      this.displayedColumns = this.displayedColumns.filter(c => c !== 'actions');
    }
  }

  public searchNearby() {
    this.clearSortAndTable();
    this.load();
  }

  sortChange(sortState: Sort) {
    this.load(sortState);
  }

  handlePageEvent(event?: PageEvent): void {
    this.pageRequest.page = event?.pageIndex ?? this.pageRequest.page;
    this.pageRequest.size = event?.pageSize ?? this.pageRequest.size;
    this.load(undefined, event);
  }

  update(id: number) {
    let agencyData;
    this.agencyService.getById(id).subscribe(agency => {
      agencyData = agency;
      this.onClickUpdate.emit(agencyData);
    });

  }

  delete(id: number) {
    this.dialog.open(ConfirmDeleteComponent).afterClosed().subscribe(res => {
      if (res) {
        this.agencyService.delete(id).subscribe(() => this.load());
      }
    });
  }

}
