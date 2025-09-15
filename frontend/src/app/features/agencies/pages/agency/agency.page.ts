import { Component, ViewChild } from '@angular/core';
import { AgencyListComponent } from "../../components/agency-list/agency-list.component";
import { AgencyModalComponent } from "../../components/agency-modal/agency-modal.component";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Agency } from '../../../../core/model/agency.model';

@Component({
  selector: 'app-agency',
  imports: [AgencyListComponent, AgencyModalComponent],
  templateUrl: './agency.page.html',
  styleUrl: './agency.page.scss'
})
export class AgencyPage {
  @ViewChild('list') listComponent!: AgencyListComponent;
  @ViewChild('modal') modalComponent!: AgencyModalComponent;

  updateList() {
    this.listComponent.load();
  }

  openUpdateDialog(agency: Agency) {
    this.modalComponent.openDialogUpdate(agency);
  }

}
