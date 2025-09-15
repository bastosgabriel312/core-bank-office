import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { routes } from '../../app.routes';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, ],
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  cards = [
    { title: 'Agencias', subtitle: 'Listagem de agencias', iconName: 'account_balance', route: '/agencies', active: true},
    { title: 'Clientes', subtitle: 'Listagem de clientes', iconName: 'people', route: '/clients', active: false},
    { title: 'Contas', subtitle: 'Listagem de contas', iconName: 'credit_card', route: '/accounts', active: false},
    { title: 'Transações', subtitle: 'Listagem de transações', iconName: 'swap_horiz', route: '/transactions', active: false},
  ];
  constructor() { }
}
