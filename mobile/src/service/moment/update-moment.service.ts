import { IMoment, TypedSetState } from "../../interface";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import { errorCatherFn } from "../../helper";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../hook";
import { momentActions } from "../../redux/slice";

export function updateMomentService(setPrevState: TypedSetState<IMoment>) {
   const dispatch = useAppDispatch();

   const updateMomentFn = async (activeMoment: IMoment) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const clone = Object.assign({}, activeMoment) as Partial<IMoment>;
         delete clone.id;
         delete clone.photo;
         delete clone.createdAt;
         await axiosInstance.patch(momentsRequests.updateMoment + activeMoment.id, clone);
         setPrevState(activeMoment as IMoment);
         dispatch(momentActions.updateMoment(activeMoment));
         Toast.show({ type: "success", text1: "Збережено" });

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { updateMomentFn };
}
