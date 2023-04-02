export interface IUpdateProfileForm {
   username: string;
   name: string | undefined;
   surname: string | undefined;
}

export interface IChangePasswordForm {
   current_password: string;
   password: string;
   repeat_password: string;
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
   password: string;
   repeat_password: string;
}
