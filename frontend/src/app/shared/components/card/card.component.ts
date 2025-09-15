import { I } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title!: string;
  @Input() iconName!: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() route?: string;
  @Input() disabled?: boolean;

  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
