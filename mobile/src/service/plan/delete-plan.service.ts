import { useAppDispatch, useAppSelector } from "../../hook";
import { axiosInstance } from "../axios.service";
import { IPlan } from "../../interface";
import { planAction, userActions } from "../../redux/slice";
import { plansRequests } from "../../config";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function deletePlanService() {
   const dispatch = useAppDispatch();
   const { plansCount } = useAppSelector(state => state.userReducer);

   const deletePlanFn = async (targetId: IPlan["id"]) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." });
         await axiosInstance.delete(plansRequests.deletePlan + targetId);
         dispatch(planAction.deletePlan(targetId));
         dispatch(userActions.setPlansCount(plansCount - 1));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { deletePlanFn };
}
