export interface IUser {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
   readonly email: string;
   readonly avatar: string;
   readonly notesCount: number;
   readonly plansCount: number;
   readonly momentsCount: number;
}

export interface IUpdateProfile {
   readonly username: string;
   readonly name?: string;
   readonly surname?: string;
}
