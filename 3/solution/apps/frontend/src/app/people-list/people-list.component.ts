import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PeopleService } from '../services/people.service';
import { PeopleDto, ResponseDto } from '@solution/shared';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, finalize } from 'rxjs';
import { PeopleListItemComponent } from './people-list-item/people-list-item.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [PeopleListItemComponent],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListComponent implements OnInit {
  private readonly peopleService = inject(PeopleService);
  private readonly destroyRef = inject(DestroyRef);

  searchTerm = signal<string>('');
  peopleList = signal<PeopleDto[]>([]);
  hasMoreRecords = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  pagination = {
    page: 1,
    limit: 10,
  };

  peopleCount = computed(() => this.peopleList().length);
  totalPeopleCount = signal<number>(0);

  constructor() {
    toObservable(this.searchTerm)
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.resetState();
        this.getPeoples();
      });
  }

  ngOnInit(): void {
    this.getPeoples();
  }

  loadMore(): void {
    if (!this.hasMoreRecords()) return;
    this.pagination.page++;
    this.getPeoples();
  }

  onSearch(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm.set(inputValue.toLocaleLowerCase());
  }

  private getPeoples(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    const filters =
      this.searchTerm().trim() === '' ? null : { name: this.searchTerm() };
    const params = {
      ...filters,
      page: this.pagination.page,
      limit: this.pagination.limit,
    };
    this.peopleService
      .getPeople(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response: ResponseDto<PeopleDto[]>) => {
          this.peopleList.update((list) => [...list, ...response.data]);
          this.totalPeopleCount.set(response.totalRecords);
          this.hasMoreRecords.set(this.pagination.page < response.totalPages);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  private resetState(): void {
    this.pagination.page = 1;
    this.peopleList.set([]);
  }
}
