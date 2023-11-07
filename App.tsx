import 'react-native-gesture-handler';
import { AuthProvider } from "./context/authContext";
import Navigation from "./Navigation";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
