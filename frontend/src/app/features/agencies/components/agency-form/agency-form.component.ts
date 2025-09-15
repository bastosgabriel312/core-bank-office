import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AgencyService } from '../../../../core/services/agency.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Agency } from '../../../../core/model/agency.model';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { StateService } from '../../../../core/services/state.service';
import { State } from '../../../../shared/model/state.model';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-agency-form',
  imports: [
    MatFormField,
    MatDialogContent,
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatInputModule,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogTitle,
    MatIcon,
    MatCardContent,
    MatCardTitle,
    MatCard],
  templateUrl: './agency-form.component.html',
  styleUrl: './agency-form.component.scss'
})
export class AgencyFormComponent {
  private _snackBar = inject(MatSnackBar);
  agencyForm: FormGroup = new FormGroup({});
  description = 'Criar Agência  ';
  @Output() onSave = new EventEmitter<void>();

  states: State[] = [];


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgencyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Agency,
    private agencyService: AgencyService, private stateService: StateService) {
    this.states = this.stateService.getStates();
    this.buildForm();
  }

  buildForm() {
    this.agencyForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      posX: new FormControl('', [Validators.required]),
      posY: new FormControl('', [Validators.required])
    });

    if (this.data) {
      this.description = 'Editar Agência';
      this.agencyForm?.patchValue({
        name: this.data.name,
        code: this.data.code,
        state: this.data.state,
        address: this.data.address,
        posX: this.data.posX,
        posY: this.data.posY
      });
    }
  }

  clickSave() {
    if (!this.agencyForm?.valid) return;

    if (this.data) {
      this.update();
    } else {
      this.save();
    }


  }

  save() {
    this.agencyService.create(this.agencyForm?.value).subscribe(
      {
        next: (agency) => this.handleSuccess("Agência criada com sucesso!"),
        error: (err: HttpErrorResponse) => this.handleError(err)
      }
    );
  }

  update() {
    this.agencyService.update(this.data.id, this.agencyForm?.value).subscribe(
      {
        next: (agency) => this.handleSuccess("Agência atualizada com sucesso!"),
        error: (err: HttpErrorResponse) => this.handleError(err)
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  handleSuccess(message: string) {
    this.openSnackBar(message, ["snackbar-container", "success"]);
    this.onSave.emit();
    this.dialogRef.close(true);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error.message && HttpStatusCode.BadRequest === error.status) {
      this.openSnackBar(error.error.message, ["snackbar-container", "error"]);
      return;
    }
    this.openSnackBar('Erro ao criar agência', ["snackbar-container", "error"]);
  }


  openSnackBar(message: string, panelClass?: string[]) {
    const config: MatSnackBarConfig = {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: panelClass,
    }
    this._snackBar.open(message, undefined, config);
  }
}
