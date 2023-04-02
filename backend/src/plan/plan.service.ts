import { Injectable } from "@nestjs/common";
import { PlanPresenter } from "./presenter/plan.presenter";
import { PlanRepository } from "./repository/plan.repository";
import { CreatePlanDto } from "./dto";
import { IPlanResponse } from "./interface/plan-response.interface";
import { PlanDocument } from "./model/plan.model";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserDocument } from "@src/user/model/user.model";
import { TaskRepository } from "@src/task/repository/task.repository";

@Injectable()
export class PlanService {

   constructor(
      private planPresenter: PlanPresenter,
      private userRepository: UserRepository,
      private planRepository: PlanRepository,
      private taskRepository: TaskRepository) {
   }

   async addPlan(userId: UserDocument["id"]): Promise<IPlanResponse> {
      // Create plan
      const plan = await this.planRepository.create({ ownerId: userId });

      // Update note
      await this.userRepository.findByIdAndUpdate(userId, { $push: { plansIds: plan.id } });

      // Return presented data to client
      return this.planPresenter.single(plan);
   }

   async updatePlan(planId: PlanDocument["id"], dto: CreatePlanDto): Promise<IPlanResponse> {
      // Update plan
      const plan = await this.planRepository.findByIdAndUpdate(planId, dto);

      // Return presented data to client
      return this.planPresenter.single(plan);
   }

   async getPlans(userId: UserDocument["id"], searchKey: string): Promise<IPlanResponse[]> {
      // Find and count plans
      const plans = await this.planRepository.find({ ownerId: userId }, searchKey)

      // Return presented data to client
      return this.planPresenter.array(plans)
   }

   async getOnePlan(planId: PlanDocument["id"]): Promise<IPlanResponse> {
      // Find plan
      const plan = await this.planRepository.findById(planId);

      // Return presented data to client
      return this.planPresenter.single(plan);
   }

   async deletePlan(planId: PlanDocument["id"], userId: string): Promise<void> {
      // Delete plan and update user
      await Promise.all([
         this.planRepository.findByIdAndDelete(planId),
         this.taskRepository.deleteMany({ planId }),
         this.userRepository.findByIdAndUpdate(userId, { $pull: { plansIds: planId } }),
      ]);

   }

}
