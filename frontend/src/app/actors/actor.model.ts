export interface ActorModel {
  name: string;
  dateOfBirth: Date;
  biography: string;
  image: File;
}

export interface ActorDto {
  id: number;
  name: string;
  dateOfBirth: Date;
  picture: string;
  biography: string;
}


export interface ActorsMovieDto{
  id:number;
  name:string;
  character:string;
  picture:string;
}
