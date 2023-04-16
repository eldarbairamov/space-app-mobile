import { useAppDispatch, useAppSelector, useDebounce } from "../../hook";
import { planAction } from "../../redux/slice";
import { plansRequests } from "../../config";
import { errorCatherFn, pleaseWait } from "../../helper";
import { axiosInstance } from "../axios.service";
import { useEffect, useState } from "react";
import { IPlan } from "../../interface";
import Toast from "react-native-toast-message";
import { delay } from "../../constant";

export function getPlansService() {
   const { searchKey } = useAppSelector(state => state.planReducer);
   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const [ isLoading, setIsLoading ] = useState(false);

   const getPlansFn = async () => {
      try {
         setIsLoading(true);
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.get<IPlan[]>(plansRequests.getAllPlans, {
            params: {
               searchKey: searchKey ? debounced : null,
            },
         });
         dispatch(planAction.setPlans(data));
         await pleaseWait(delay);
         Toast.hide();

      } catch (e) {
         setIsLoading(false);
         Toast.show({ type: "error", text1: errorCatherFn(e) });

      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getPlansFn();
   }, [ debounced ]);

   return { isLoading };

}
