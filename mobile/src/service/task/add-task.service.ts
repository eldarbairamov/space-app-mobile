import Toast from "react-native-toast-message";
import { axiosInstance } from "../axios.service";
import { ITask } from "../../interface";
import { tasksRequests } from "../../config";
import { errorCatherFn } from "../../helper";
import { taskAction } from "../../redux/slice";
import { useAppDispatch } from "../../hook";

export function addTaskService(planId: string, title: string, next: () => void) {
   const dispatch = useAppDispatch();

   const addTaskFn = async () => {
      if (title !== "") {
         const newTask = { planId, title };

         try {
            Toast.show({ type: 'info', text1: 'Лоудінг..' })
            const { data } = await axiosInstance.post<ITask>(tasksRequests.addTask, newTask);
            dispatch(taskAction.addTask(data));
            next()
            Toast.hide()

         } catch (e) {
            Toast.show({ type: 'error', text1: errorCatherFn(e) })
         }
      }

   };

   return { addTaskFn };
}
