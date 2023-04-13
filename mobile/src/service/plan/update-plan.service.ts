import { IPlan } from "../../interface";
import { axiosInstance } from "../axios.service";
import { plansRequests } from "../../config";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";
import { useAppDispatch } from "../../hook";
import { planAction } from "../../redux/slice";

export function updatePlanService(next: () => void) {
   const dispatch = useAppDispatch();

   const updatePlanFn = async (planId: IPlan["id"], title: IPlan["title"]): Promise<void> => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." });
         await axiosInstance.put(plansRequests.updatePlan + planId, { title });
         dispatch(planAction.updateTitle({ planId, title }));
         Toast.show({ type: "success", text1: "Збережено" });
         Toast.hide();
         next();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { updatePlanFn };

}
