import { Body, Controller, Get, Patch, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ChangePasswordDto, ProfileUpdateDto } from "./dto";
import { IUserInfoResponse } from "./interface/user-info-response.interface";
import { IUpdateProfileResponse } from "./interface/update-profile-response.interface";
import { SharpPipe } from "@src/common/pipe/sharp.pipe";
import { FileValidatorFilter } from "@src/common/exception/file-validator.filter";
import { User } from "@src/common/decorator";
import { AccessGuard } from "@src/auth/guard";

@Controller( "user" )
export class UserController {

   constructor( private userService: UserService ) {
   }

   // Get user info
   @UseGuards( AccessGuard )
   @Get( "get_user" )
   async getUserInfo(
       @User( "userId" ) userId: string ): Promise<IUserInfoResponse> {

      return this.userService.getUserInfo( userId );
   }

   // Change email: request
   @UseGuards( AccessGuard )
   @Post( "email_change" )
   async changeEmailRequest(
       @User( "userId" ) userId: string,
       @Body( "email" ) email: string ): Promise<{ message: string }> {

      await this.userService.changeEmailRequest( email, userId );
      return { message: "Success" };
   }

   // Update user profile
   @UseGuards( AccessGuard )
   @Patch( "profile_update" )
   async profileUpdate(
       @User( "userId" ) userId: string,
       @Body() dto: ProfileUpdateDto ): Promise<IUpdateProfileResponse> {

      return this.userService.profileUpdate( userId, dto );
   }

   // Accept new email
   @Patch( "email_new" )
   async changeEmail(
       @Body( "code" ) code: string ): Promise<{ message: string }> {

      await this.userService.changeEmail( code );
      return { message: "Success" };
   }

   // Accept new password
   @UseGuards( AccessGuard )
   @Patch( "password_new" )
   async changePassword(
       @User( "userId" ) userId: string,
       @Body() dto: ChangePasswordDto ): Promise<{ message: string }> {

      await this.userService.changePassword( userId, dto );
      return { message: "Success" };
   }

   // Upload avatar
   @UseGuards( AccessGuard )
   @Patch( "avatar_upload" )
   @UseFilters( FileValidatorFilter )
   @UseInterceptors( FileInterceptor( "avatar" ) )
   async uploadAvatar(
       @User( "userId" ) userId: string,
       @UploadedFile( SharpPipe ) fileName: string ): Promise<{ image: string }> {

      await this.userService.uploadAvatar( fileName, userId );
      return { image: fileName };
   }

   // Send image name and delete it
   @UseGuards( AccessGuard )
   @Patch( "avatar_delete" )
   async deleteAvatar(
       @User( "userId" ) userId: string,
       @Body( "fileName" ) fileName: string ) {

      await this.userService.deleteAvatar( fileName, userId );
      return { message: "Success" };
   }
}
