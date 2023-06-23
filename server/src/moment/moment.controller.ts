import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AccessGuard } from "@src/auth/guard";
import { MomentService } from "./moment.service";
import { IMomentResponse, IMomentsResponse } from "./interface/moment-response.interface";
import { UpdateMomentDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { SharpPipe } from "@src/common/pipe/sharp.pipe";
import { FileValidatorFilter } from "@src/common/exception/file-validator.filter";
import { User } from "@src/common/decorator";
import { QueryDto } from "@src/common/dto";

@Controller( "moments" )
export class MomentController {

   constructor( private momentService: MomentService ) {
   }

   // Get all moments
   @UseGuards( AccessGuard )
   @Get()
   async getMoments(
       @Query() queryDto: QueryDto,
       @User( "userId" ) userId: string ): Promise<IMomentsResponse> {

      return this.momentService.getMoments( userId, queryDto );
   }

   // Add moment
   @UseGuards( AccessGuard )
   @Post( "add" )
   @HttpCode( 201 )
   async addMoment(
       @User( "userId" ) userId: string ): Promise<IMomentResponse> {

      return this.momentService.addMoment( userId );
   }

   // Get one moment
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Get( ":momentId" )
   async getOneMoment(
       @Param( "momentId" ) momentId: string ): Promise<IMomentResponse> {

      return this.momentService.getOneMoment( momentId );
   }

   // Update moment
   @UseGuards( AccessGuard )
   @Patch( ":momentId" )
   async updateMoment(
       @Param( "momentId" ) momentId: string,
       @Body() dto: UpdateMomentDto ): Promise<{ message: string }> {

      await this.momentService.updateMoment( momentId, dto );
      return { message: "Success" };
   }

   // Upload photo
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Patch( ":momentId/photo_upload" )
   @UseFilters( FileValidatorFilter )
   @UseInterceptors( FileInterceptor( "photo" ) )
   async uploadPhoto(
       @Param( "momentId" ) momentId: string,
       @UploadedFile( SharpPipe ) fileName: string ): Promise<{ image: string }> {

      await this.momentService.uploadPhoto( momentId, fileName );
      return { image: fileName };
   }

   // Delete moment
   @UseGuards( AccessGuard )
   @Delete( ":momentId" )
   async deleteMoment(
       @Param( "momentId" ) momentId: string,
       @User( "userId" ) userId: string ): Promise<{ message: string }> {

      await this.momentService.deleteMoment( userId, momentId );
      return { message: "Success" };
   }

}
