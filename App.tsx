import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";
import { AuthProvider } from "./context/authContext";
import Navigation from "./Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

// Désactive le warning "Reading from value during component render" émis par
// @gorhom/bottom-sheet (lecture de shared values pendant le rendu).
configureReanimatedLogger({ strict: false });

// Masque le warning de dépréciation InteractionManager (provenant d'une dépendance).
LogBox.ignoreLogs(["InteractionManager has been deprecated"]);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </BottomSheetModalProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
