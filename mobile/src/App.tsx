import { Provider } from "react-redux";
import { store } from "./redux";
import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";
import { RootNavigator } from "./navigation";

export function App() {
   return (
      <Provider store={ store }>
         <NavigationContainer theme={ theme }>
            <RootNavigator/>
         </NavigationContainer>
      </Provider>
   );
}

const theme: Theme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      primary: "#4e4e51",
      background: "whitesmoke",
   }
};


