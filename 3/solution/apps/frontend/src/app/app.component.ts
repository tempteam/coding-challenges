import { Component } from '@angular/core';
import { PeopleListComponent } from './people-list/people-list.component';

@Component({
  standalone: true,
  imports: [PeopleListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
