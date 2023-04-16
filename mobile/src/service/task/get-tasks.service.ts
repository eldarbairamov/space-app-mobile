import { axiosInstance } from "../axios.service";
import { IPlan, ITask } from "../../interface";
import { useAppDispatch } from "../../hook";
import { tasksRequests } from "../../config";
import { taskAction } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";
import { useEffect, useState } from "react";
import { delay } from "../../constant";

export function getTasksService(planId: IPlan["id"]) {
   const dispatch = useAppDispatch();

   const [ isLoading, setIsLoading ] = useState(false);

   const getTasksFn = async () => {
      try {
         setIsLoading(true);
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
         dispatch(taskAction.setTasks(data));
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
      getTasksFn();
   }, []);

   return { isLoading };

}
