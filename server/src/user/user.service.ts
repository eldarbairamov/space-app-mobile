import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { ChangePasswordDto, ProfileUpdateDto } from "./dto";
import { UserDocument } from "./model/user.model";
import { IUpdateProfileResponse } from "./interface/update-profile-response.interface";
import { IUserInfoResponse } from "./interface/user-info-response.interface";
import path from "node:path";
import { passComparer, passHasher } from "@src/auth/helper";
import { ActionTokenRepository } from "@src/auth/repository";
import { NoteRepository } from "@src/note/repository/note.repository";
import { PlanRepository } from "@src/plan/repository/plan.repository";
import { CHANGE_EMAIL, EMAIL_CONFIRMATION_TOKEN_TYPE, STATIC_PATH } from "@src/common/constants";
import { exists, unlinker } from "@src/common/helper";
import { EmailService } from "@src/common/email.service";
import { MomentRepository } from "@src/moment/repository/moment.repository";
import { TokenService } from "@src/common/token.service";
import crypto from "crypto";

@Injectable()
export class UserService {

   constructor(
       private userRepository: UserRepository,
       private actionTokenRepository: ActionTokenRepository,
       private tokenService: TokenService,
       private emailService: EmailService,
       private noteRepository: NoteRepository,
       private planRepository: PlanRepository,
       private momentRepository: MomentRepository,
   ) {
   }

   async getUserInfo( userId: UserDocument["id"] ): Promise<IUserInfoResponse> {
      // Find user in DB and count holding
      const user = await this.userRepository.findById( userId );

      const [ notesCount, plansCount, momentsCount ] = await Promise.all( [
         this.noteRepository.count( { ownerId: userId } ),
         this.planRepository.count( { ownerId: userId } ),
         this.momentRepository.count( { ownerId: userId } ),
      ] );

      // Return presented date to client
      return {
         name: user.name,
         surname: user.surname,
         username: user.username,
         avatar: user.avatar,
         momentsCount,
         plansCount,
         notesCount,
      };

   }

   async changeEmailRequest( email: string, userId: UserDocument["id"] ): Promise<void> {
      // Check is new email unique
      const [ isEmailDoesNotUnique, user ] = await Promise.all( [
         this.userRepository.findOne( { email } ),
         this.userRepository.findById( userId )
      ] );
      if ( isEmailDoesNotUnique ) throw new HttpException( "This email is already in use", HttpStatus.CONFLICT );

      // Generate link
      const changeEmailCode = crypto.randomBytes( 3 ).toString( "hex" ).toUpperCase();

      // Save action token to DB
      await this.actionTokenRepository.create( {
         token: changeEmailCode,
         tokenType: EMAIL_CONFIRMATION_TOKEN_TYPE,
         ownerId: userId,
         email
      } );

      // Send email
      await this.emailService.send( email, CHANGE_EMAIL, { changeEmailCode, username: user.username } );
   }

   async changeEmail( code: string ): Promise<void> {
      // Delete action token
      const actionTokenInfo = await this.actionTokenRepository.findOneAndDelete( { token: code } );
      if ( !actionTokenInfo ) throw new HttpException( "Invalid code", HttpStatus.UNAUTHORIZED );

      // Update email
      await this.userRepository.findByIdAndUpdate( actionTokenInfo.ownerId, { email: actionTokenInfo.email } );
   }

   async changePassword( userId: UserDocument["id"], dto: ChangePasswordDto ): Promise<void> {
      // Find user in DB
      const user = await this.userRepository.findOne( { _id: userId } );

      // Check is current password correct
      const isCurrentPassCorrect = await passComparer( dto.currentPassword, user.password );
      if ( !isCurrentPassCorrect ) throw new HttpException( "Current password is not valid", HttpStatus.BAD_REQUEST );

      // Check is new password does not same with old
      const isNewPasswordSame = await passComparer( dto.newPassword, user.password );
      if ( isNewPasswordSame ) throw new HttpException( "Password is already in use", HttpStatus.BAD_REQUEST );

      // Hash password
      user.password = await passHasher( dto.newPassword );

      // Update user
      await user.save();
   }

   async profileUpdate( userId: UserDocument["id"], dto: ProfileUpdateDto ): Promise<IUpdateProfileResponse> {
      // Define variables
      const [ userFromDb, username ] = await Promise.all( [
         this.userRepository.findOne( { id: userId } ),
         this.userRepository.findOne( { username: dto.username } )
      ] );

      // Check if there is nothing to change
      const objToCompare = {
         username: userFromDb!.username,
         name: userFromDb!.name,
         surname: userFromDb!.surname,
      };

      if ( JSON.stringify( dto ) === JSON.stringify( objToCompare ) ) throw new HttpException( "There is nothing to change", HttpStatus.BAD_REQUEST );

      // Check is username is unique
      if ( username && username.username !== dto.username ) throw new HttpException( "This username is already in use", HttpStatus.CONFLICT );

      // Update user
      await userFromDb.updateOne( dto );

      return {
         username: dto.username,
         name: dto.name,
         surname: dto.surname,
      };
   }

   async uploadAvatar( fileName: string, userId: string ): Promise<void> {
      // Delete prev image from hard drive if exists
      const { avatar } = await this.userRepository.findById( userId );
      const imagePath = path.join( STATIC_PATH, (avatar ? avatar : "nothing") );
      const isImageExists = await exists( imagePath );

      if ( isImageExists ) await unlinker( imagePath );

      // Save avatar to DB
      await this.userRepository.findByIdAndUpdate( userId, { avatar: fileName } );
   }

   async deleteAvatar( fileName: string, userId: string ): Promise<void> {
      // Delete avatar from DB
      await this.userRepository.findByIdAndUpdate( userId, { avatar: "" } );

      // Delete image from hard drive
      const filePath = path.resolve( STATIC_PATH, fileName );
      await unlinker( filePath );
   }

}
