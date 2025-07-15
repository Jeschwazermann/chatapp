import "./App.css";
import Login from "./pages/login/login";
import Signup from "./pages/signup/SignUp";
function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Login />
      <Signup />
    </div>
  );
}

export default App;
