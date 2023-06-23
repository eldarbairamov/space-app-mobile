import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN, IS_DARK, REFRESH_TOKEN } from "../constant";

const storeData = async ( key: string, value: any ) => {
   try {
      await AsyncStorage.setItem( key, value );
   }
   catch ( e ) {
      console.log( "Error saving data", e );
   }
};

const getData = async ( key: string ) => {
   try {
      return await AsyncStorage.getItem( key );
   }
   catch ( e ) {
      console.log( "Error reading data", e );
   }
};

const removeData = async ( key: string ) => {
   try {
      await AsyncStorage.removeItem( key );
   }
   catch ( e ) {
      console.log( "Error removing data", e );
   }
};


export const storageService = {
   getAccessToken: async () => await getData( ACCESS_TOKEN ),
   getRefreshToken: async () => await getData( REFRESH_TOKEN ),

   setTokens: async ( accessToken: string, refreshToken: string ) => {
      await Promise.all( [
         storeData( ACCESS_TOKEN, accessToken ),
         storeData( REFRESH_TOKEN, refreshToken )
      ] );
   },

   deleteTokens: async () => {
      await Promise.all( [
         removeData( ACCESS_TOKEN ),
         removeData( REFRESH_TOKEN )
      ] );
   },

   getTheme: async () => await getData( IS_DARK ),
   setTheme: async ( isDark: boolean ) => await storeData( IS_DARK, String( isDark ) )

};
