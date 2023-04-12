export interface IUpdateProfileForm {
   username: string;
   name: string | undefined;
   surname: string | undefined;
}

export interface IChangePasswordForm {
   currentPassword: string;
   newPassword: string;
   repeatPassword: string;
}

export interface IRegistrationForm {
   username: string;
   email: string;
   password: string;
}

export interface ILoginForm {
   email: string;
   password: string;
}

export interface IResetPasswordForm {
   code: string;
   newPassword: string;
   repeatPassword: string;
}
