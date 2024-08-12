export type ApiResponse<T> = T & {
  error: string;
}

export enum CleaningPointField {
  ID = '_id',
  AREA = 'AREA',
  ROUTE_ID = 'ROUTEID',
  ROUTE_ORDER = 'ROUTEORDER',
  VILLAGE = 'VILLAGE',
  POINT_NAME = 'POINTNAME',
  TIME = 'TIME',
  LONGITUDE = 'LONGITUDE',
  LATITUDE = 'LATITUDE',
  WORK_DAY = 'WORDDAY',
  RECYCLE_DAY = 'RECYCLEDAY'
}

export type CleaningPoint = {
  [CleaningPointField.ID]: number;
  [CleaningPointField.AREA]: string;
  [CleaningPointField.ROUTE_ID]: string;
  [CleaningPointField.ROUTE_ORDER]: number;
  [CleaningPointField.VILLAGE]: string;
  [CleaningPointField.POINT_NAME]: string;
  [CleaningPointField.TIME]: string;
  [CleaningPointField.LONGITUDE]: number;
  [CleaningPointField.LATITUDE]: number;
  [CleaningPointField.WORK_DAY]: string;
  [CleaningPointField.RECYCLE_DAY]: string;
};