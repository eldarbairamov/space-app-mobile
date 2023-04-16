import { useAppDispatch, useAppSelector } from "./redux.hook";
import { useEffect } from "react";
import { storageService } from "../service";
import { appActions } from "../redux/slice";

export function useTheme() {
   const dispatch = useAppDispatch();

   const { isDark } = useAppSelector(state => state.appReducer);

   useEffect(() => {
      storageService.getTheme().then(res => dispatch(appActions.switchTheme(Boolean(res))));
   }, []);

   return { isDark };
}
