import { IPlanResponse } from "@src/plan/interface/plan-response.interface";
import { PlanDocument } from "@src/plan/model/plan.model";
import { ApiProperty } from "@nestjs/swagger";

export class PlanResponse implements IPlanResponse {
   @ApiProperty({ example: "63dfe16eda233c96fc6e2604", type: String })
   readonly id: PlanDocument["id"];

   @ApiProperty({ example: "Training", type: String })
   readonly title: string;

   @ApiProperty({ example: 1677765747660, type: String })
   readonly lastModified: number;
}
