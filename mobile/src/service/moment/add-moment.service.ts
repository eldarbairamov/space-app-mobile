import { useAppDispatch } from "../../hook";
import { IMoment } from "../../interface";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function addMomentService() {
   const dispatch = useAppDispatch();

   const addMomentFn = async () => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.addMoment);
         dispatch(momentActions.addMoment(data));
         Toast.hide()

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { addMomentFn };
}
