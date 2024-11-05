import { Controller, Get, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleDto, ResponseDto } from '@solution/shared';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getPeoples(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query() filter: Partial<Pick<PeopleDto, 'name'>>,
  ): Promise<ResponseDto<PeopleDto[]>> {
    // the URL with dynamic filters (api doesn't support depth search, so you can only filter by person name)
    const params = { ...filter, page: String(page), limit: String(limit) };
    return this.peopleService.getPeople(params);
  }
}
