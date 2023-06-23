import Toast from "react-native-toast-message";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config";
import { errorCatherFn } from "../../helper";

export function emailConfirmationService( next: () => any ) {

   const confirmEmailFn = async ( code: string ) => {
      try {
         Toast.show( { type: "info", text1: "Лоудінг..." } );
         await axiosInstance.patch( userRequests.changeEmailAccept, { code } );
         Toast.hide();

         next();

      }
      catch ( e ) {
         Toast.show( { type: "error", text1: errorCatherFn( e ) } );
      }
   };

   return { confirmEmailFn };
}
