import "react-native-gesture-handler";
import { AuthProvider } from "./context/authContext";
import Navigation from "./Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <Toast/>
    </GestureHandlerRootView>
  );
}
