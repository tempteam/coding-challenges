import { Component, input } from '@angular/core';
import { PeopleDto } from '@solution/shared';

@Component({
  selector: 'app-people-list-item',
  standalone: true,
  imports: [],
  templateUrl: './people-list-item.component.html',
  styleUrl: './people-list-item.component.css',
})
export class PeopleListItemComponent {
  item = input.required<PeopleDto>();
}
