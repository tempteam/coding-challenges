import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PlanetService } from '../planet/planet.service';
import {
  PeopleDto,
  peopleSchema,
  QueryParams,
  ResponseDto,
} from '@solution/shared';
import { lastValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

type SwapiPeopleResponse = {
  results?: PeopleDto[];
  result?: [{ properties: PeopleDto }];
  total_records?: number;
  total_pages?: number;
};

@Injectable()
export class PeopleService {
  private apiUrl = process.env.SWAPI_URL;

  constructor(
    private readonly httpService: HttpService,
    private readonly planetService: PlanetService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getPeople(params: QueryParams): Promise<ResponseDto<PeopleDto[]>> {
    const cacheKey = this.generateCacheKey('people_list', params);
    const cachedPeople = await this.cacheManager.get<ResponseDto<PeopleDto[]>>(
      cacheKey,
    );

    if (cachedPeople) {
      return cachedPeople;
    }

    const { data, totalPages, totalRecords } = await this.fetchPeopleData(
      params,
    );

    const detailedPeople = await Promise.all(
      data.map((people) => this.fetchPeopleDetailsAndPlanet(people)),
    );

    const response: ResponseDto<PeopleDto[]> = {
      data: detailedPeople,
      totalPages,
      totalRecords,
    };

    await this.cacheManager.set(cacheKey, response, 300);

    return response;
  }

  private async fetchPeopleData(
    params: QueryParams,
  ): Promise<ResponseDto<PeopleDto[]>> {
    const requestUrl = `${this.apiUrl}/people`;
    const response = await this.fetchFromApi<SwapiPeopleResponse>(
      requestUrl,
      params,
    );

    const data = (response.results ?? response.result) as PeopleDto[];
    return {
      data,
      totalPages: response.total_pages || 1,
      totalRecords: response.total_records || data.length,
    };
  }

  private async fetchPeopleDetailsAndPlanet(people: any): Promise<PeopleDto> {
    const personDetails =
      people.properties || (await this.fetchPersonDetails(people.url));
    const homeworldData = await this.planetService.getPlanet(
      personDetails.homeworld,
    );

    const personDTO: PeopleDto = {
      name: personDetails.name,
      birth_year: personDetails.birth_year,
      homeworld: {
        name: homeworldData.name,
        terrain: homeworldData.terrain,
      },
    };

    return peopleSchema.parse(personDTO);
  }

  private async fetchPersonDetails(
    url: string,
    params: QueryParams = {},
  ): Promise<PeopleDto> {
    const response = await this.fetchFromApi<{
      result: { properties: PeopleDto };
    }>(url, params);
    return response.result.properties;
  }

  private async fetchFromApi<T>(
    url: string,
    params: QueryParams = {},
  ): Promise<T> {
    try {
      return await lastValueFrom(
        this.httpService.get<T>(url, { params }).pipe(
          map((res) => res.data),
          catchError((error) => {
            throw new HttpException(
              `Failed to fetch data from SWAPI: ${error.message}`,
              HttpStatus.BAD_GATEWAY,
            );
          }),
        ),
      );
    } catch (error) {
      throw new HttpException(
        `Error fetching SWAPI data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateCacheKey(prefix: string, params: QueryParams): string {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('_');
    return `${prefix}_${queryString}`;
  }
}
