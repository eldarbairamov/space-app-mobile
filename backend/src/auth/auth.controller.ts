import { Body, Controller, Get, HttpCode, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccessGuard, LoginGuard, RefreshGuard, RegistrationGuard } from "./guard";
import { RegistrationDto, ResetPasswordDto } from "./dto";
import { User } from "@src/common/decorator";
import { IAccessTokenPair, ILoginResponse } from "./interface";
import { RequestWithUser } from "@src/common/interface/express.interface";

@Controller("auth")
export class AuthController {

   constructor(private authService: AuthService) {
   }

   // Registration
   @UseGuards(RegistrationGuard)
   @Post("registration")
   async registration(
      @Body() dto: RegistrationDto): Promise<{ message: string }> {

      await this.authService.registration(dto);
      return { message: "Success" };
   }

   // Login
   @UseGuards(LoginGuard)
   @Post("login")
   async login(
      @Req() req: RequestWithUser): Promise<ILoginResponse> {
      return this.authService.login(req.user);
   }

   // Forgot password
   @HttpCode(200)
   @Post("password_forgot")
   async forgotPassword(
      @Body("email") email: string): Promise<{ message: string }> {

      await this.authService.forgotPassword(email);
      return { message: "Success" };
   }

   // Account activation
   @HttpCode(200)
   @Post("activation")
   async activation(
      @Body("activationCode") activationCode: string): Promise<{ message: string }> {

      await this.authService.activation(activationCode);
      return { message: "Success" };
   }

   // Refresh
   @UseGuards(RefreshGuard)
   @Post("refresh")
   async refresh(
      @User() user: { userId: string, refreshToken: string }): Promise<IAccessTokenPair> {

      return this.authService.refresh(user.userId, user.refreshToken);
   }

   // Reset password
   @Patch("password_reset")
   async resetPassword(
      @Body() dto: ResetPasswordDto): Promise<{ message: string }> {

      await this.authService.resetPassword(dto);
      return { message: "Success" };
   }

   // Logout
   @UseGuards(AccessGuard)
   @Get("logout")
   async logout(
      @User("token") token: string): Promise<{ message: string }> {

      await this.authService.logout(token);
      return { message: "Success" };
   }

}
