export interface IRegistration {
   readonly username: string;
   readonly email: string;
   readonly password: string;
}

export interface IOAuth {
   readonly username: string;
   readonly accessToken: string;
   readonly refreshToken: string;
}

export interface IResetPassword {
   readonly code: string,
   readonly newPassword: string,
   readonly repeatPassword: string
}
