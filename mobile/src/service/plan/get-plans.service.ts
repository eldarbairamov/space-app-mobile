import { useEffect } from "react";

import { useAppDispatch, useAppSelector, useDebounce } from "../../hook";
import { planAction } from "../../redux/slice";
import { plansRequests } from "../../config";
import { errorCatherFn, pleaseWait } from "../../helper";
import { axiosInstance } from "../axios.service";
import Toast from "react-native-toast-message";
import { IPlans } from "../../interface";
import { delay } from "../../constant";

export function getPlansService() {
   const { searchKey, total } = useAppSelector(state => state.planReducer);

   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getPlansFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const { data } = await axiosInstance.get<IPlans>(plansRequests.getAllPlans, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });
         await pleaseWait(delay);
         dispatch(planAction.setPlans(data));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }

   };

   useEffect(() => {
      getPlansFn();
   }, [ debounced, total ]);

}
