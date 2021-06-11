import { AxiosInstance } from "axios";
import { CityResponseDto } from "./Dtos/CityResponseDto";
import { CountryResponseDto } from "./Dtos/CountriesResponseDto";
import { DefaultResponseDto } from "./Dtos/DefaultResponseDto";
import { DistanceResponseDataDto } from "./Dtos/DistanceResponseDataDto";
import { RegionResponeDto } from "./Dtos/RegionResponeDto";

export class NetDistanceClient {
  constructor(protected axiosInstance: AxiosInstance) {}
  /**
   * Return path distance and path nodes
   * @param points - Cities ids joined by ";"
   */
  async getDistance(points: string) {
    if (!points.includes(";")) {
      throw new Error("Poitns is not valid");
    }
    if (points.split(";").filter((p) => Number(p) > 0).length === 0) {
      throw new Error("Poitns is not valid");
    }
    return (
      await this.axiosInstance.get<DefaultResponseDto<DistanceResponseDataDto>>(
        "/distance",
        {
          params: { points },
        }
      )
    ).data;
  }
  /**
   * Return array of countries
   */
  async getCountries() {
    return (
      await this.axiosInstance.get<DefaultResponseDto<CountryResponseDto[]>>(
        "/countries", { }
      )
    ).data;
  }
  /**
   * Return array of regions
   * @param countries - countries ids joined by ";" or undefined for get all
   */
  async getRegions(countries?: string ) {
    if (
      countries != undefined &&
      countries.includes(";") &&
      countries.split(";").filter((p) => Number(p) > 0).length === 0
    ) {
      throw new Error("Countries is not valid");
    }
    return (
      await this.axiosInstance.get<DefaultResponseDto<RegionResponeDto[]>>(
        "/regions",
        {
          params: {
            countries,
          },
        }
      )
    ).data;
  }
  /**
   * @param countries - countries ids joined by ";"
   */
  async getCitiesByCountries(countries: string) {
    // if (!countries.includes(";")) {
    //   throw new Error("Countries is not valid");
    // }
    if (
      countries.includes(";") &&
      countries.split(";").filter((p) => Number(p) > 0).length === 0
    ) {
      throw new Error("Countries is not valid");
    }
    return (
      await this.axiosInstance.get<DefaultResponseDto<CityResponseDto[]>>(
        "/cities",
        {
          params: {
            countries,
          },
        }
      )
    ).data;
  }
  /**
   * @param regions - regions ids joined by ";"
   */
  async getCitiesByRegions(regions: string) {
    // if (!regions.includes(";")) {
    //   throw new Error("Regions is not valid");
    // }
    if (
      regions.includes(";") &&
      regions.split(";").filter((p) => Number(p) > 0).length === 0
    ) {
      throw new Error("Regions is not valid");
    }
    return (
      await this.axiosInstance.get<DefaultResponseDto<CityResponseDto[]>>(
        "/cities",
        {
          params: {
            regions,
          },
        }
      )
    ).data;
  }
}
