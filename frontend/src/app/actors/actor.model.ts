export interface ActorModel {
  name: string;
  dateOfBirth: Date;
  image: File;
}

export interface ActorDto {
  name: string;
  dateOfBirth: Date;
  image: string;
  biography: string;
}
