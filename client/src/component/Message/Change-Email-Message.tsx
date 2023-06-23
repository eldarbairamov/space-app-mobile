import { Message } from "../UI/Message";
import { SUCCESS_IMAGE, SUCCESS_IMAGE_DARK } from "../../constant";
import { logoutService } from "../../service";
import { useAppSelector } from "../../hook";

export function ChangeEmailMessage() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { logoutFn } = logoutService();

   return (
       <Message nextFn={ logoutFn }
                image={ isDark ? SUCCESS_IMAGE_DARK : SUCCESS_IMAGE }
                buttonTitle={ "Увійти" }
                title={ "Ви успішно оновили адресу електронної пошти" }
                message={ "Будь ласка, виконайте вхід до аккаунту використовуючи оновлені дані" }/>
   );
}
