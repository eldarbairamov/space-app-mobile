import { Message } from "../UI/Message";
import { SUCCESS_IMAGE } from "../../constant";
import { logoutService } from "../../service";

export function ChangeEmailMessage() {
   const { logoutFn } = logoutService()

   return (
      <Message nextFn={ logoutFn }
               image={ SUCCESS_IMAGE }
               buttonTitle={ "Увійти" }
               title={ "Ви успішно оновили адресу електронної пошти" }
               message={ "Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані" }/>

   )
}
