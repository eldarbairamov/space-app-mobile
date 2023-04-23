import { useAppDispatch, useAppSelector } from "../../hook";
import { IMoment } from "../../interface";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import { momentActions, userActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function addMomentService() {
   const dispatch = useAppDispatch();
   const { momentsCount } = useAppSelector(state => state.userReducer);

   const addMomentFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const { data } = await axiosInstance.post<IMoment>(momentsRequests.addMoment);
         dispatch(momentActions.addMoment(data));
         dispatch(userActions.setMomentCount(momentsCount + 1));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { addMomentFn };
}
