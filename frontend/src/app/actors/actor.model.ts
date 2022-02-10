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
