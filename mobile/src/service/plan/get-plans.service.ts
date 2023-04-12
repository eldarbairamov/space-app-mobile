import { useAppDispatch, useAppSelector, useDebounce } from "../../hook";
import { planAction } from "../../redux/slice";
import { plansRequests } from "../../config";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { useEffect } from "react";
import { IPlan } from "../../interface";
import Toast from "react-native-toast-message";

export function getPlansService() {
   const { searchKey } = useAppSelector(state => state.planReducer);
   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getPlansFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." })
         const { data } = await axiosInstance.get<IPlan[]>(plansRequests.getAllPlans, {
            params: {
               searchKey: searchKey ? debounced : null,
            },
         });
         dispatch(planAction.setPlans(data));
         Toast.hide()

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   useEffect(() => {
      getPlansFn();
   }, [ debounced ]);

}
