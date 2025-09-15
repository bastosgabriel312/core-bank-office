import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AgencyPage } from "../../pages/agency/agency.page";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgencyFormComponent } from '../agency-form/agency-form.component';
import { Agency } from '../../../../core/model/agency.model';

@Component({
  selector: 'app-agency-modal',
  imports: [MatButtonModule],
  templateUrl: './agency-modal.component.html',
  styleUrl: './agency-modal.component.scss'
})
export class AgencyModalComponent {
  readonly dialog = inject(MatDialog);


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '720px';
    dialogConfig.panelClass = 'custom-dialog-container';

    this.dialog.open(AgencyFormComponent, dialogConfig);
  }

  @Output() onSave = new EventEmitter<void>();

  updateList() {
    this.onSave.emit();
  }


  openDialogUpdate(agency: Agency) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '720px';
    dialogConfig.panelClass = 'custom-dialog-container';
  
    dialogConfig.data = agency;
  
    this.dialog.open(AgencyFormComponent, dialogConfig);
  }
}
