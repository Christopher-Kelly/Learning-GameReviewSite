import {Router} from "./routes/Routes";
import {BrowserRouter} from "react-router";
import {AuthProvider} from "./components/AuthContext";

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
