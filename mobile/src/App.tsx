import { Provider } from "react-redux";
import { store } from "./redux";
import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";
import { RootNavigator } from "./navigation";
import { Dimensions } from "react-native";

export function App() {
   const windowWidth = Dimensions.get('window').width;
   console.log(windowWidth);

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


