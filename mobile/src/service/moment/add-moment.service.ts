import { useAppDispatch } from "../../hook";
import { IMoment } from "../../interface/moment.interface";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";

export function addMomentService() {
   const dispatch = useAppDispatch();

   const addMomentFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoment>(momentsRequests.addMoment);
         dispatch(momentActions.addMoment(data));

      } catch (e) {
      }
   };

   return { addMomentFn };
}
