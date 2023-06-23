import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreatePlanDto } from "./dto";
import { IPlanResponse, IPlansResponse } from "./interface/plan-response.interface";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";
import { QueryDto } from "@src/common/dto";

@Controller( "plans" )
export class PlanController {

   constructor( private planService: PlanService ) {
   }

   // Get all plans
   @UseGuards( AccessGuard )
   @Get()
   async getPlans(
       @Query() queryDto: QueryDto,
       @User( "userId" ) userId: string ): Promise<IPlansResponse> {

      return this.planService.getPlans( userId, queryDto );
   }

   // Add plan
   @UseGuards( AccessGuard )
   @Post( "add" )
   async addPlan(
       @User( "userId" ) userId: string ): Promise<IPlanResponse> {

      return this.planService.addPlan( userId );
   }

   // Get one plan
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Get( ":planId" )
   async getOnePlan(
       @Param( "planId" ) planId: string ): Promise<IPlanResponse> {

      return this.planService.getOnePlan( planId );
   }

   // Update plan
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Put( ":planId" )
   async updatePlan(
       @Param( "planId" ) noteId: string,
       @Body() dto: CreatePlanDto ): Promise<IPlanResponse> {

      return this.planService.updatePlan( noteId, dto );
   }

   // Delete plan
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Delete( ":planId" )
   async deletePlan(
       @User( "userId" ) userId: string,
       @Query() queryDto: QueryDto,
       @Param( "planId" ) noteId: string ): Promise<IPlansResponse> {

      return this.planService.deletePlan( noteId, userId, queryDto );
   }

}
