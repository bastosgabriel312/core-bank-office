import { Component, ViewChild } from '@angular/core';
import { AgencyListComponent } from '../../components/agency-list/agency-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Coordinates } from '../../../../shared/model/coordinates.model';


@Component({
  selector: 'app-search-agencies',
  imports: [
    AgencyListComponent,
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatInputModule],
  templateUrl: './search-agencies.page.html',
  styleUrl: './search-agencies.page.scss'
})
export class SearchAgenciesPage {
  @ViewChild(AgencyListComponent) agencyList?: AgencyListComponent;
  coordinates: Coordinates | undefined = { posX: 0, posY: 0 }; 

  loadingLocation = false;
  locationError: string | null = null;

  useMyLocation(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        this.locationError = 'Geolocalização não suportada pelo navegador.';
        reject();
        return;
      }

      this.loadingLocation = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (this.coordinates) {
            this.coordinates.posX = position.coords.latitude;
            this.coordinates.posY = position.coords.longitude;
          }
          this.loadingLocation = false;
          this.locationError = null;
          resolve();
        },
        (error) => {
          this.loadingLocation = false;
          this.locationError = 'Não foi possível obter a localização.';
          console.error(error);
          reject();
        }
      );
    });
  }

  submitSearch() {
    this.useMyLocation().then(() => this.agencyList?.load(undefined,undefined,true));

  }

}
