import Toast from "react-native-toast-message";
import { userActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config";
import { IUser } from "../../interface";

export function deletePhotoService() {
   const dispatch = useAppDispatch();

   const deletePhotoFn = async ( avatar: IUser["avatar"] ) => {
      try {
         Toast.show( { type: "info", text1: "Лоудінг..." } );
         await axiosInstance.patch( userRequests.deleteAvatar, { fileName: avatar } );
         dispatch( userActions.unsetAvatar() );
         Toast.hide();

      }
      catch ( e ) {
         Toast.show( { type: "error", text1: errorCatherFn( e ) } );
      }
   };

   return { deletePhotoFn };

}
