export class DistanceResponseDataPathNodeDto {
  CityID: number;
  City: string;
  CountryID: number;
  DistanceToFirst: number;
  DistanceToNext: number;
  WayType: number;
  TimeToNext: string;
  WayName: string;
  TimeToFirst: string;
}

export class DistanceResponseDataDto {
  distance: number;
  pointsCount: number;
  path: DistanceResponseDataPathNodeDto[];
}
