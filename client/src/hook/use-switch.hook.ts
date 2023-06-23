import { appActions } from "../redux/slice";
import { useAppDispatch, useAppSelector } from "./redux.hook";
import { storageService } from "../service";

export function useSwitch() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const dispatch = useAppDispatch();

   const toggleSwitch = async () => {
      dispatch( appActions.switchTheme( !isDark ) );
      await storageService.setTheme( !isDark );
   };

   return { isDark, toggleSwitch };
}
