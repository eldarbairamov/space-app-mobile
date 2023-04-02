import { useEffect } from "react";
import { IMoments } from "../../interface/moment.interface";
import { axiosInstance } from "../axios.service";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";

export function getMomentsService(searchKey: string) {
   const dispatch = useDispatch();

   const getMomentsFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, {
            params: {
               searchKey: searchKey ? searchKey : null,
            },
         });
         dispatch(momentActions.setMoments(data));

      } catch (e) {
      }
   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey ]);

}
