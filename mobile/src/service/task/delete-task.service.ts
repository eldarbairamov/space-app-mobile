import Toast from "react-native-toast-message";
import { axiosInstance } from "../axios.service";
import { ITask } from "../../interface";
import { tasksRequests } from "../../config";
import { useAppDispatch } from "../../hook";
import { taskAction } from "../../redux/slice";
import { errorCatherFn } from "../../helper";

export function deleteTaskService() {
   const dispatch = useAppDispatch();

   const deleteTaskFn = async (taskId: ITask["id"]) => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         await axiosInstance.delete(tasksRequests.deleteTask + taskId);
         dispatch(taskAction.deleteTask(taskId));
         Toast.hide()

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { deleteTaskFn };
}
