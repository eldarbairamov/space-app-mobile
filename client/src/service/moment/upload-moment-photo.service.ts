import { Alert } from "react-native";
import { ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { axiosInstance } from "../axios.service";
import { momentsRequests } from "../../config";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";
import { momentActions } from "../../redux/slice";
import { useAppDispatch } from "../../hook";
import { IMoment } from "../../interface";

export function uploadMomentPhotoService( momentId: IMoment["id"] ) {
   const dispatch = useAppDispatch();

   const pickImageHandler = () => {
      Alert.alert( "Змініти фото", undefined, [
             { text: "Галерея", onPress: () => pickImageFromGallery() },
             { text: "Камера", onPress: () => pickImageFromCamera() },
             { text: "Закрити", style: "destructive" }
          ],
          { cancelable: true } );
   };

   const pickImageFromGallery = async () => {
      const result: ImagePickerResponse = await launchImageLibrary( { mediaType: "photo" } );
      if ( result.assets ) {
         const file = result.assets[0];
         const formData = new FormData();
         formData.append( "photo", { uri: file.uri, type: file.type, name: file.fileName } );

         try {
            Toast.show( { type: "info", text1: "Лоудінг..." } );
            const { data } = await axiosInstance.patch<{ image: string }>( momentsRequests.uploadPhoto + momentId + "/photo_upload", formData );
            dispatch( momentActions.setPhoto( { photo: data.image } ) );
            Toast.show( { type: "success", text1: "Готово!" } );

         }
         catch ( e ) {
            Toast.show( { type: "error", text1: errorCatherFn( e ) } );
         }
      }
   };

   const pickImageFromCamera = async () => {
      const result: ImagePickerResponse = await launchCamera( { mediaType: "photo", saveToPhotos: false } );
      if ( result.errorMessage ) console.log( "error" );
   };

   return { pickImageHandler };

}
