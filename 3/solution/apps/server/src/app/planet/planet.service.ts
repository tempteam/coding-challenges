import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PlanetDto, planetSchema } from '@solution/shared';
import { lastValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PlanetService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getPlanet(url: string): Promise<PlanetDto> {
    const cacheKey = `planet_${url}`;
    const cachedPlanet = await this.cacheManager.get<PlanetDto>(cacheKey);
    if (cachedPlanet) {
      return cachedPlanet;
    }

    const planetData = await this.fetchPlanetDetails(url);
    const validatedPlanet = planetSchema.parse({
      name: planetData.name,
      terrain: planetData.terrain,
    });

    await this.cacheManager.set(cacheKey, validatedPlanet, 300);

    return validatedPlanet;
  }

  private async fetchPlanetDetails(url: string): Promise<PlanetDto> {
    const {
      result: { properties },
    } = await this.fetchFromApi<{ result: { properties: PlanetDto } }>(url);
    return properties;
  }

  private async fetchFromApi<T>(url: string): Promise<T> {
    try {
      return await lastValueFrom(
        this.httpService.get<T>(url).pipe(
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
}
