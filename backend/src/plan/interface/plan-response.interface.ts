import { PlanDocument } from "@src/plan/model/plan.model";

export interface IPlanResponse {
   readonly id: PlanDocument["id"];
   readonly title: string;
   readonly lastModified: number;
}
