import { useState } from "react";
import { appActions } from "../redux/slice";
import { useAppDispatch, useAppSelector } from "./redux.hook";
import { storageService } from "../service";

export function useSwitch() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const [ isEnabled, setIsEnabled ] = useState<boolean>(false);
   const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState);
      dispatch(appActions.switchTheme(!isDark));
      await storageService.setTheme(!isDark);
   };

   return { isEnabled, toggleSwitch };
}
