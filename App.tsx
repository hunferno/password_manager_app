import "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";
import { AuthProvider } from "./context/authContext";
import Navigation from "./Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

// Désactive le warning "Reading from value during component render" émis par
// @gorhom/bottom-sheet (lecture de shared values pendant le rendu).
configureReanimatedLogger({ strict: false });

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
