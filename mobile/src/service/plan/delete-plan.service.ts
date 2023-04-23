import { useAppDispatch, useAppSelector } from "../../hook";
import { axiosInstance } from "../axios.service";
import { IPlan, IPlans } from "../../interface";
import { planAction, userActions } from "../../redux/slice";
import { plansRequests } from "../../config";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function deletePlanService() {
   const { plansCount } = useAppSelector(state => state.userReducer);

   const dispatch = useAppDispatch();

   const deletePlanFn = async (targetId: IPlan["id"], total = 30, searchKey = "") => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const { data } = await axiosInstance.delete<IPlans>(plansRequests.deletePlan + targetId, {
            params: {
               searchKey,
               limit: total,
            },
         });
         dispatch(planAction.deletePlan(targetId));
         dispatch(userActions.setPlansCount(plansCount - 1));
         dispatch(planAction.setPlans(data));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { deletePlanFn };
}
