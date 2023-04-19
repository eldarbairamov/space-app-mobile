import { useEffect } from "react";

import { axiosInstance } from "../axios.service";
import { IPlan, ITask } from "../../interface";
import { useAppDispatch } from "../../hook";
import { tasksRequests } from "../../config";
import { taskAction } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";
import { delay } from "../../constant";

export function getTasksService(planId: IPlan["id"]) {
   const dispatch = useAppDispatch();

   const getTasksFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.post<ITask[]>(tasksRequests.getAllTasks, { planId });
         await pleaseWait(delay);
         dispatch(taskAction.setTasks(data));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   useEffect(() => {
      getTasksFn();
   }, []);

}
