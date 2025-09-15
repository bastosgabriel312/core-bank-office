import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogActions,
    MatButton
],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteComponent>);

  close() {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }

}
