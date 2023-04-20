import { ITask } from "../../interface";
import Toast from "react-native-toast-message";
import { axiosInstance } from "../axios.service";
import { tasksRequests } from "../../config";
import { errorCatherFn } from "../../helper";
import { useAppDispatch } from "../../hook";
import { taskAction } from "../../redux/slice";

export function updateTaskService() {
   const dispatch = useAppDispatch();

   const updateTaskFn = async (taskId: ITask["id"], status: boolean) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         await axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });
         Toast.hide();
         dispatch(taskAction.updateTask(taskId));

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { updateTaskFn };
}
