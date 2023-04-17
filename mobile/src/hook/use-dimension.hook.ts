import { useWindowDimensions } from "react-native";

export function useDimension() {
   const { width } = useWindowDimensions();

   const maxPhoneDimension = 500;
   const maxTabletDimension = 1024;

   const isTablet = width > maxPhoneDimension && width <= maxTabletDimension;

   const isPhoneSmall = width < 400;

   return { width, isTablet, isPhoneSmall };
}
