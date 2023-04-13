import { useState } from "react";
import { appActions } from "../redux/slice";
import { useAppDispatch, useAppSelector } from "./redux.hook";

export function useTheme() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const [ isEnabled, setIsEnabled ] = useState<boolean>(false);
   const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
      dispatch(appActions.switchTheme(!isDark));
   };

   return { isEnabled, toggleSwitch };
}
