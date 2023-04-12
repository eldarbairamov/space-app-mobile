import { useAppDispatch, useAppSelector } from "../../hook";
import { IMoment } from "../../interface";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import { momentActions, userActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function deleteMomentService(next: () => void) {
   const dispatch = useAppDispatch();
   const { momentsCount } = useAppSelector(state => state.userReducer)

   const deleteMomentFn = async (momentId: IMoment["id"]) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." })
         await axiosInstance.delete(momentsRequests.deleteMoment + momentId);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));
         dispatch(userActions.setMomentCount(momentsCount - 1))
         Toast.hide()

         next()

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   return { deleteMomentFn };
}
