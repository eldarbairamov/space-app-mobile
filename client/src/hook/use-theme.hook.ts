import { useAppDispatch, useAppSelector } from "./redux.hook";
import { useEffect } from "react";
import { storageService } from "../service";
import { appActions } from "../redux/slice";

export function useTheme() {
   const dispatch = useAppDispatch();

   const { isDark } = useAppSelector( state => state.appReducer );

   const setTheme = async () => {
      const theme = await storageService.getTheme();
      dispatch( appActions.switchTheme( theme === "true" ) );
   };

   useEffect( () => {
      setTheme();
   }, [] );

   return { isDark };
}
