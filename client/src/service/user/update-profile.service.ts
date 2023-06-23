import { useAppDispatch } from "../../hook";
import { IUpdateProfile, IUser } from "../../interface";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config";
import { userActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function updateProfileService() {
   const dispatch = useAppDispatch();

   const updateProfileFn = async ( body: IUpdateProfile ) => {
      try {
         Toast.show( { type: "info", text1: "Лоудінг..." } );
         const { data } = await axiosInstance.patch<IUser>( userRequests.profileUpdate, body );
         dispatch( userActions.updateProfile( data ) );
         Toast.show( { type: "success", text1: "Ви успішно оновили профіль" } );

      }
      catch ( e ) {
         Toast.show( { type: "error", text1: errorCatherFn( e ) } );
      }
   };

   return { updateProfileFn };

}
