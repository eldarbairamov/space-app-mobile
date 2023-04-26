import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreateTaskDto } from "./dto";
import { ITaskResponse } from "./interface/task-response.interface";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";

@Controller("tasks")
export class TaskController {

   constructor(private taskService: TaskService) {
   }

   // Get all tasks
   @UseGuards(AccessGuard)
   @HttpCode(200)
   @Get()
   async getTasks(
      @Query("planId") planId: string): Promise<ITaskResponse[]> {

      return this.taskService.getTasks(planId);
   }

   // Add task
   @UseGuards(AccessGuard)
   @Post("add")
   async addTask(
      @User("userId") userId: string,
      @Body() dto: CreateTaskDto): Promise<ITaskResponse> {

      return this.taskService.addTask(dto, userId);
   }

   // Update task status
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Patch(":taskId")
   async updateTaskStatus(
      @Param("taskId") taskId: string,
      @Body("isCompleted") isCompleted: boolean): Promise<ITaskResponse> {

      return this.taskService.updateTaskStatus(taskId, isCompleted);
   }

   // Delete task
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Delete(":taskId")
   async deleteTask(
      @Param("taskId") taskId: string): Promise<{ message: string }> {

      await this.taskService.deleteTask(taskId);
      return { message: "Success" };
   }

}
