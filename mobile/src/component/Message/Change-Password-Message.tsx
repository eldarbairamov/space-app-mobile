import { SUCCESS_IMAGE } from "../../constant";
import { logoutService } from "../../service";
import { Message } from "../UI/Message";

export function ChangePasswordMessage() {
   const { logoutFn } = logoutService()

   return (
      <Message nextFn={ logoutFn }
               image={ SUCCESS_IMAGE }
               buttonTitle={ 'Окей' }
               title={ 'Ви успішно оновили свій пароль' }
               message={ 'Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані' }/>
   )
}
