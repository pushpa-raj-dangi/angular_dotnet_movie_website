export interface Coordinate{
  longitude:number;
  lattitude:number;
}


export interface CoordinateWithMessage extends Coordinate{
  message: string;
  
}
