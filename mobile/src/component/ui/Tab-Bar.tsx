import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { HOME_ICON } from "../../constant";
import { gStyle } from "../../asset";

export function MyTabBar({ state, descriptors, navigation }: any) {
   return (
      <View style={ [ styles.tabBarStyle, gStyle.border ] }>
         { state.routes.map((route: any, index: any) => {
            const { options } = descriptors[route.key];
            const label =
               options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                     ? options.title
                     : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
               const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
               });

               if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate({ name: route.name, merge: true });
               }
            };

            const onLongPress = () => {
               navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
               });
            };

            return (
               <TouchableOpacity
                  key={ index }
                  accessibilityRole="button"
                  accessibilityState={ isFocused ? { selected: true } : {} }
                  accessibilityLabel={ options.tabBarAccessibilityLabel }
                  testID={ options.tabBarTestID }
                  onPress={ onPress }
                  onLongPress={ onLongPress }
                  style={ { flex: 1 } }
               >
                  <Text style={ { color: isFocused ? '#673ab7' : '#222' } }>
                     { label }
                  </Text>
                  <Image source={ HOME_ICON } style={ styles.image }/>
               </TouchableOpacity>
            );
         }) }
      </View>
   );
}

const styles = StyleSheet.create({
   tabBarStyle: {
      backgroundColor: "whitesmoke",
      height: 90,
      marginHorizontal: 100,
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: {
         width: 1,
         height: 5
      }
   },
   image: {
      width: 30,
      height: 30,
      position: "absolute",
      top: 15
   }
});

