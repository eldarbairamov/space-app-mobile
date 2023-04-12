import { useAppDispatch, useAppSelector } from "../../hook";
import { axiosInstance } from "../axios.service";
import { IPlan } from "../../interface";
import { planAction, userActions } from "../../redux/slice";
import { plansRequests } from "../../config";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function addPlanService() {
   const dispatch = useAppDispatch();
   const { plansCount } = useAppSelector(state => state.userReducer)

   const addPlanFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." })
         const { data } = await axiosInstance.get<IPlan>(plansRequests.addPlan);
         dispatch(planAction.addPlan(data));
         dispatch(userActions.setPlansCount(plansCount + 1))
         Toast.hide()

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   return { addPlanFn };
}
