import { useAppDispatch } from "../../hook";
import { IMoment } from "../../interface/moment.interface";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";

export function deleteMomentService() {
   const dispatch = useAppDispatch();

   const deleteMomentFn = async (momentId: IMoment["id"]) => {
      try {
         await axiosInstance.delete(momentsRequests.deleteMoment + momentId);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));

      } catch (e) {
      }
   };

   return { deleteMomentFn };
}
