import { useAppDispatch, useAppSelector } from "./redux.hook";
import { useEffect } from "react";
import { storageService } from "../service";
import { authActions } from "../redux/slice";

export function useAuth() {
   const dispatch = useAppDispatch();
   const { isLogin } = useAppSelector(state => state.authReducer);

   useEffect(() => {
      storageService.getAccessToken().then(res => dispatch(authActions.setIsLogin(Boolean(res))));
   }, []);

   return { isLogin };
}
