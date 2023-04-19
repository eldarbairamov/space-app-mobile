import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreatePlanDto } from "./dto";
import { IPlanResponse, IPlansResponse } from "./interface/plan-response.interface";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";
import { DeleteItemDto, QueryDto } from "@src/common/dto";

@Controller("plans")
export class PlanController {

   constructor(private planService: PlanService) {
   }

   // Get all plans
   @UseGuards(AccessGuard)
   @Get()
   async getPlans(
      @Query() queryDto: QueryDto,
      @User("userId") userId: string): Promise<IPlansResponse> {

      return this.planService.getPlans(userId, queryDto);
   }

   // Add plan
   @UseGuards(AccessGuard)
   @Get("add")
   async addPlan(
      @User("userId") userId: string): Promise<IPlanResponse> {

      return this.planService.addPlan(userId);
   }

   // Get one plan
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Get(":planId")
   async getOnePlan(
      @Param("planId") planId: string): Promise<IPlanResponse> {

      return this.planService.getOnePlan(planId);
   }

   // Update plan
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Put(":planId")
   async updatePlan(
      @Param("planId") noteId: string,
      @Body() dto: CreatePlanDto): Promise<IPlanResponse> {

      return this.planService.updatePlan(noteId, dto);
   }

   // Send prev request params and delete plan
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Post(":planId")
   async deletePlan(
      @User("userId") userId: string,
      @Body() dto: DeleteItemDto,
      @Param("planId") noteId: string): Promise<IPlansResponse> {

      return this.planService.deletePlan(noteId, userId, dto.limit, dto.searchKey);
   }

}
